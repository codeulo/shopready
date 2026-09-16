import { Resend } from "resend";

export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev";
  return { apiKey, toEmail, fromEmail };
}

export function getResendClient(apiKey: string) {
  return new Resend(apiKey);
}

/** Escape a string for safe interpolation into an HTML email body. */
export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
