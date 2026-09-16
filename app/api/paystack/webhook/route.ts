import { NextResponse } from "next/server";
import crypto from "crypto";
import { getResendClient, getResendConfig, escapeHtml } from "@/lib/resend";
import { findPackage } from "@/lib/packages";
import { claimReference } from "@/lib/order-store";

export const runtime = "nodejs";

type PaystackChargeSuccessEvent = {
  event: string;
  data?: {
    reference?: string;
    amount?: number;
    currency?: string;
    status?: string;
    customer?: { email?: string; first_name?: string };
    metadata?: {
      name?: string;
      whatsapp?: string;
      packageId?: string;
      [key: string]: unknown;
    };
  };
};

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error("Paystack webhook: missing PAYSTACK_SECRET_KEY.");
    // Respond 200 anyway — a 5xx here just makes Paystack retry a request
    // we can never fulfil until the env var is set. Log loudly instead.
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  // Must read the RAW body — signature is computed over the exact bytes
  // Paystack sent, before any JSON parsing/formatting.
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!signature || !isValidSignature(rawBody, signature, secretKey)) {
    console.warn("Paystack webhook: invalid or missing signature.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: PaystackChargeSuccessEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // Acknowledge everything we don't care about so Paystack stops retrying it.
  if (event.event !== "charge.success" || event.data?.status !== "success") {
    return NextResponse.json({ ok: true, ignored: event.event ?? "unknown" });
  }

  const data = event.data;
  const reference = data.reference;
  if (!reference) {
    return NextResponse.json({ ok: true });
  }

  // Claim the reference atomically so a near-simultaneous client-side
  // /verify call and this webhook can't both send confirmation emails.
  const claimed = await claimReference(reference);
  if (!claimed) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const metadata = data.metadata ?? {};
  const packageId =
    typeof metadata.packageId === "string" ? metadata.packageId : undefined;
  const pkg = packageId ? findPackage(packageId) : undefined;

  if (pkg) {
    const expectedKobo = Math.round(pkg.amountNaira * 100);
    if (data.amount !== expectedKobo || data.currency !== "NGN") {
      console.error(
        `Paystack webhook: amount mismatch for ${reference}. Expected ${expectedKobo} NGN kobo, got ${data.amount} ${data.currency}.`,
      );
      // Reference is claimed so it can't be replayed, but we deliberately
      // do NOT send a "payment received" email for a tampered amount.
      return NextResponse.json({ ok: true, flagged: "amount_mismatch" });
    }
  } else if (packageId) {
    console.warn(
      `Paystack webhook: unknown packageId "${packageId}" for reference ${reference}.`,
    );
  }

  const email = data.customer?.email?.trim() || "";
  const name =
    (typeof metadata.name === "string" && metadata.name.trim()) ||
    data.customer?.first_name ||
    "Customer";
  const whatsapp =
    typeof metadata.whatsapp === "string" ? metadata.whatsapp.trim() : "";
  const amountNaira = (data.amount ?? 0) / 100;
  const packageLabel = pkg
    ? `${pkg.name} — ${pkg.price}`
    : `₦${amountNaira.toLocaleString()}`;

  const { apiKey, toEmail, fromEmail } = getResendConfig();
  if (apiKey && toEmail) {
    const resend = getResendClient(apiKey);
    const safe = escapeHtml;

    try {
      await resend.emails.send({
        from: `New paid order <${fromEmail}>`,
        to: toEmail,
        replyTo: email || undefined,
        subject: `Payment received: ${packageLabel} — ${safe(name)}`,
        html: `
          <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
            <h2 style="margin-bottom: 4px;">New paid order</h2>
            <p style="margin-top:0; color:#6b7280;">Confirmed via Paystack webhook.</p>
            <table style="border-collapse: collapse; margin-top: 12px;">
              <tbody>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Name</td><td><strong>${safe(name)}</strong></td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">WhatsApp</td><td>${safe(whatsapp || "—")}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Email</td><td>${safe(email || "—")}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Package</td><td>${safe(packageLabel)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Amount paid</td><td>₦${amountNaira.toLocaleString()}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Reference</td><td>${safe(reference)}</td></tr>
              </tbody>
            </table>
          </div>
        `,
      });
    } catch (error) {
      console.error("Webhook: order notification email failed:", error);
    }

    if (email) {
      try {
        await resend.emails.send({
          from: `StoreReady <${fromEmail}>`,
          to: email,
          subject: `Payment received — ${packageLabel}`,
          html: `
            <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
              <p>Hi ${safe(name.split(" ")[0] || name)},</p>
              <p>We've received your payment of <strong>₦${amountNaira.toLocaleString()}</strong> for <strong>${safe(packageLabel)}</strong>. Thank you!</p>
              <p>Reference: <code>${safe(reference)}</code></p>
              <p>We'll be in touch on WhatsApp or email within one business day to get things moving.</p>
              <p style="margin-top: 24px;">Talk soon,<br/>The StoreReady team</p>
            </div>
          `,
        });
      } catch (error) {
        console.error("Webhook: receipt email failed:", error);
      }
    }
  } else {
    console.warn(
      "Webhook: Resend not configured — skipping order confirmation emails.",
    );
  }

  return NextResponse.json({ ok: true });
}

function isValidSignature(
  rawBody: string,
  signature: string,
  secretKey: string,
): boolean {
  const expected = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
