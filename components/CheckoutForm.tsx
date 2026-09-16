"use client";

import { useState } from "react";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { usePaystackScript } from "./use-paystack-script";
import type { Package } from "@/lib/packages";
import Link from "next/link";

type Status = "idle" | "opening" | "verifying" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm text-ink-soft placeholder:text-ink-muted/70 outline-none transition focus:border-jade focus:ring-2 focus:ring-jade/20";

function generateReference() {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().split("-")[0]
      : Math.random().toString(36).slice(2, 10);
  return `SR-${Date.now()}-${random}`;
}

export default function CheckoutForm({
  pkg,
  onDone,
}: {
  pkg: Package;
  onDone: () => void;
}) {
  const paystackReady = usePaystackScript();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const honeypot = String(formData.get("company_website") || "");

    if (honeypot) return; // bot

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setStatus("error");
      setErrorMessage(
        "Payments aren't configured yet. Please contact us on WhatsApp instead.",
      );
      return;
    }
    if (!window.PaystackPop) {
      setStatus("error");
      setErrorMessage(
        "Payment couldn't load. Please check your connection and try again.",
      );
      return;
    }

    setStatus("opening");
    setErrorMessage("");

    const reference = generateReference();

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: Math.round(pkg.amountNaira * 100), // kobo
      currency: "NGN",
      ref: reference,
      metadata: {
        name,
        whatsapp,
        packageId: pkg.id,
        packageName: pkg.name,
        custom_fields: [
          {
            display_name: "Business owner",
            variable_name: "name",
            value: name,
          },
          {
            display_name: "WhatsApp",
            variable_name: "whatsapp",
            value: whatsapp,
          },
          {
            display_name: "Package",
            variable_name: "package",
            value: pkg.name,
          },
        ],
      },
      callback: (response: { reference: string }) => {
        void verifyPayment(response.reference, { name, email, whatsapp });
      },
      onClose: () => {
        setStatus((current) => (current === "opening" ? "idle" : current));
      },
    });

    handler.openIframe();
  }

  async function verifyPayment(
    reference: string,
    details: { name: string; email: string; whatsapp: string },
  ) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, packageId: pkg.id, ...details }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.error || "We couldn't confirm your payment. Please contact us.",
        );
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "We couldn't confirm your payment. Please contact us with your reference.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-jade-pale text-jade-deep">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
          Payment received
        </h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          Thanks for choosing the <strong>{pkg.name}</strong> package. A receipt
          is on its way to your email, and we&apos;ll be in touch on WhatsApp
          within one business day.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-7 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-jade-deep"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-jade-deep">
        Checkout
      </p>
      <h3
        id="purchase-modal-title"
        className="mt-2 font-display text-2xl font-semibold text-ink sm:text-[28px]"
      >
        {pkg.name} package
      </h3>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-sand bg-paper-warm px-4 py-3">
        <span className="text-sm text-ink-soft">{pkg.tagline}</span>
        <span className="font-display text-xl font-semibold text-ink">
          {pkg.price}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Honeypot field, hidden from real users */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <Field label="Your name" htmlFor="co-name">
          <input
            id="co-name"
            name="name"
            type="text"
            required
            placeholder="Chiamaka Okafor"
            className={inputClasses}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp number" htmlFor="co-whatsapp">
            <input
              id="co-whatsapp"
              name="whatsapp"
              type="tel"
              required
              placeholder="0803 123 4567"
              className={inputClasses}
            />
          </Field>
          <Field label="Email address" htmlFor="co-email">
            <input
              id="co-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </Field>
        </div>

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-clay/20 bg-clay/10 px-4 py-3 text-sm text-clay"
          >
            {/* icon */}
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 6v5M10 14h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* message */}
            <div className="flex-1">
              <p>{errorMessage}</p>
              <Link
                href="https://wa.me/+2347038689224"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-clay/80 transition-colors"
              >
                Contact us on WhatsApp
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9l6-6M4 3h5v5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={
            status === "opening" || status === "verifying" || !paystackReady
          }
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {(status === "opening" || status === "verifying") && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {status === "verifying"
            ? "Confirming payment…"
            : status === "opening"
              ? "Opening secure checkout…"
              : `Pay ${pkg.price} with Paystack`}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-jade" />
          Payment is handled securely by Paystack — we never see your card
          details.
        </p>
      </form>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
