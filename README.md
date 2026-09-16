# StoreReady — Landing Page

A Next.js (App Router) + Tailwind CSS landing page for a service that helps
Nigerian WhatsApp/Instagram sellers set up a proper online store — with DIY
kits, done-for-you setup, and a free audit lead form.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — forest green / cream / amber palette
- **Paystack Inline** for package checkout (`components/CheckoutForm.tsx`, `app/api/paystack/verify/route.ts`)
- **Resend** for the free-audit lead form and order confirmation emails
- **Vercel Analytics**
- Self-hosted fonts (DM Serif Display + Plus Jakarta Sans via Fontsource — no external font requests)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Resend + Paystack values
npm run dev
```

Open http://localhost:3000.

## How the two CTAs work

There are two distinct flows in this site, both opened from a shared modal
(`components/PurchaseModal.tsx`) via `components/purchase-modal-context.tsx`:

1. **"Get Started" / "Request my free audit"** (header, Audit section, final
   CTA secondary button) → opens `AuditForm.tsx`, a plain lead-capture form
   that posts to `/api/lead`. No payment — just an email to you and a
   confirmation to the lead, both via Resend.
2. **Pricing card buttons / "Get the Starter Kit"** → opens `CheckoutForm.tsx`
   with the selected package (see `lib/packages.ts`). It collects
   name/email/WhatsApp, then launches the **Paystack Inline** popup for that
   package's exact Naira amount. On successful payment, the client sends the
   Paystack transaction `reference` to `/api/paystack/verify`, which
   re-verifies the transaction server-side with your secret key (never trust
   the client-side callback alone) and emails both you and the buyer via
   Resend.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from resend.com |
| `LEAD_TO_EMAIL` | Yes | Inbox that should receive audit requests and paid orders |
| `LEAD_FROM_EMAIL` | No | Verified sender address; falls back to Resend's shared test sender |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes (for checkout) | Paystack public key — exposed to the browser by design |
| `PAYSTACK_SECRET_KEY` | Yes (for checkout) | Paystack secret key — server-side only, used to verify payments |

Without `RESEND_API_KEY` / `LEAD_TO_EMAIL`, the audit form returns a friendly
error instead of failing silently. Without the Paystack keys, checkout shows
a clear "payments aren't configured yet" message instead of crashing.

**Test mode:** use your Paystack **test** keys (`pk_test_...` / `sk_test_...`)
while building — no real money moves, and Paystack's test cards work as
normal. Swap in live keys only once you're ready to accept real payments.

**Production note:** this implementation verifies payment via the client
callback → server verify round trip, which is solid for most small
businesses. For extra resilience against a closed tab mid-payment, consider
also adding a [Paystack webhook](https://paystack.com/docs/payments/webhooks/)
that hits `/api/paystack/verify`-style logic independently of the browser.

## Structure

- `app/page.tsx` — assembles all landing page sections
- `components/` — one component per section, plus:
  - `purchase-modal-context.tsx` / `PurchaseModal.tsx` — shared modal shell
  - `AuditForm.tsx` — free-audit lead form (Resend)
  - `CheckoutForm.tsx` — Paystack checkout form
  - `use-paystack-script.ts` — lazy-loads the Paystack Inline script
- `lib/packages.ts` — single source of truth for pricing tiers (including
  numeric Naira amounts for Paystack), shared by the pricing section and
  checkout form
- `lib/resend.ts` — shared Resend client/config/email-escaping helpers
- `lib/site.ts` — brand name, contact email, description
- `app/api/lead/route.ts` — Resend integration for the audit form
- `app/api/paystack/verify/route.ts` — server-side Paystack verification +
  order confirmation emails
- `public/people/` — social-proof avatar photos used in the hero

## Deploying

Push to GitHub and import into Vercel, then add the environment variables
above in Project Settings. Vercel Analytics activates automatically once
deployed on Vercel. Remember to switch Paystack keys from test to live mode
before launch.
