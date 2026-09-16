import { NextResponse } from "next/server";
import { getResendClient, getResendConfig, escapeHtml, isValidEmail } from "@/lib/resend";
import { findPackage } from "@/lib/packages";

export const runtime = "nodejs";

type VerifyPayload = {
  reference?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  packageId?: string;
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    customer?: { email?: string };
    paid_at?: string;
  };
};

export async function POST(request: Request) {
  let body: VerifyPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { reference, name, email, whatsapp, packageId } = body;

  if (!reference?.trim()) {
    return NextResponse.json({ error: "Missing transaction reference." }, { status: 400 });
  }
  if (!name?.trim() || !email?.trim() || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Missing or invalid customer details." }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error("Paystack is not configured: missing PAYSTACK_SECRET_KEY.");
    return NextResponse.json(
      { error: "Payments aren't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  // Verify the transaction directly with Paystack — never trust the client-side callback alone.
  let verifyData: PaystackVerifyResponse;
  try {
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference.trim())}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      }
    );
    verifyData = await verifyRes.json();
  } catch (error) {
    console.error("Failed to reach Paystack verify endpoint:", error);
    return NextResponse.json(
      { error: "Couldn't confirm payment with Paystack. Please contact support." },
      { status: 502 }
    );
  }

  if (!verifyData.status || verifyData.data?.status !== "success") {
    return NextResponse.json(
      { error: verifyData.message || "Payment was not successful." },
      { status: 402 }
    );
  }

  const pkg = packageId ? findPackage(packageId) : undefined;
  const amountNaira = verifyData.data.amount / 100;
  const packageLabel = pkg ? `${pkg.name} — ${pkg.price}` : `₦${amountNaira.toLocaleString()}`;

  // Best-effort notification emails — payment already succeeded, so failures here don't fail the request.
  const { apiKey, toEmail, fromEmail } = getResendConfig();
  if (apiKey && toEmail) {
    const resend = getResendClient(apiKey);
    const safe = escapeHtml;

    try {
      await resend.emails.send({
        from: `New paid order <${fromEmail}>`,
        to: toEmail,
        replyTo: email.trim(),
        subject: `Payment received: ${packageLabel} — ${name.trim()}`,
        html: `
          <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
            <h2 style="margin-bottom: 4px;">New paid order</h2>
            <p style="margin-top:0; color:#6b7280;">Confirmed via Paystack.</p>
            <table style="border-collapse: collapse; margin-top: 12px;">
              <tbody>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Name</td><td><strong>${safe(name.trim())}</strong></td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">WhatsApp</td><td>${safe(whatsapp?.trim() || "—")}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Email</td><td>${safe(email.trim())}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Package</td><td>${safe(packageLabel)}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Amount paid</td><td>₦${amountNaira.toLocaleString()}</td></tr>
                <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Reference</td><td>${safe(reference.trim())}</td></tr>
              </tbody>
            </table>
          </div>
        `,
      });
    } catch (error) {
      console.error("Order notification email failed:", error);
    }

    try {
      await resend.emails.send({
        from: `StoreReady <${fromEmail}>`,
        to: email.trim(),
        subject: `Payment received — ${packageLabel}`,
        html: `
          <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
            <p>Hi ${safe(name.trim().split(" ")[0] || name.trim())},</p>
            <p>We've received your payment of <strong>₦${amountNaira.toLocaleString()}</strong> for <strong>${safe(packageLabel)}</strong>. Thank you!</p>
            <p>Reference: <code>${safe(reference.trim())}</code></p>
            <p>We'll be in touch on WhatsApp or email within one business day to get things moving.</p>
            <p style="margin-top: 24px;">Talk soon,<br/>The StoreReady team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Receipt email failed:", error);
    }
  } else {
    console.warn("Resend not configured — skipping order confirmation emails.");
  }

  return NextResponse.json({ ok: true, amountNaira, reference: reference.trim() });
}
