import { NextResponse } from "next/server";
import { getResendClient, getResendConfig, escapeHtml, isValidEmail } from "@/lib/resend";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  businessName?: string;
  whatsapp?: string;
  email?: string;
  packageName?: string;
  message?: string;
  // honeypot field — real users never fill this in
  company_website?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, businessName, whatsapp, email, packageName, message, company_website } = body;

  // Bot honeypot: silently accept without sending anything.
  if (company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !whatsapp?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name, WhatsApp number and email are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const { apiKey, toEmail, fromEmail } = getResendConfig();

  if (!apiKey || !toEmail) {
    console.error("Resend is not configured: missing RESEND_API_KEY or LEAD_TO_EMAIL.");
    return NextResponse.json(
      { error: "Requests aren't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const resend = getResendClient(apiKey);
  const safe = escapeHtml;

  try {
    await resend.emails.send({
      from: `New store enquiry <${fromEmail}>`,
      to: toEmail,
      replyTo: email.trim(),
      subject: `New enquiry: ${packageName ?? "Free store audit"} — ${name.trim()}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
          <h2 style="margin-bottom: 4px;">New store enquiry</h2>
          <p style="margin-top:0; color:#6b7280;">Submitted from the landing page &quot;Get Started&quot; form.</p>
          <table style="border-collapse: collapse; margin-top: 12px;">
            <tbody>
              <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Name</td><td><strong>${safe(name.trim())}</strong></td></tr>
              <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Business</td><td>${safe(businessName?.trim() || "—")}</td></tr>
              <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">WhatsApp</td><td>${safe(whatsapp.trim())}</td></tr>
              <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Email</td><td>${safe(email.trim())}</td></tr>
              <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Interested in</td><td>${safe(packageName || "Free store audit / not sure yet")}</td></tr>
            </tbody>
          </table>
          ${message?.trim() ? `<p style="margin-top:16px;"><strong>Message:</strong><br/>${safe(message.trim())}</p>` : ""}
        </div>
      `,
    });

    // Best-effort confirmation email to the customer. Failure here shouldn't fail the request.
    try {
      await resend.emails.send({
        from: `StoreReady <${fromEmail}>`,
        to: email.trim(),
        subject: "We've got your request — here's what happens next",
        html: `
          <div style="font-family: sans-serif; font-size: 15px; color: #1b4332; line-height: 1.6;">
            <p>Hi ${safe(name.trim().split(" ")[0] || name.trim())},</p>
            <p>Thanks for reaching out about <strong>${safe(packageName || "your free store audit")}</strong>. We've received your details and will follow up on WhatsApp or email within one business day.</p>
            <p>In the meantime, feel free to reply to this email with any questions or extra detail about your business.</p>
            <p style="margin-top: 24px;">Talk soon,<br/>The StoreReady team</p>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error("Lead confirmation email failed:", confirmationError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send lead email via Resend:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 502 }
    );
  }
}
