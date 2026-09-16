"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-sand bg-white px-4 py-2.5 text-sm text-ink-soft placeholder:text-ink-muted/70 outline-none transition focus:border-jade focus:ring-2 focus:ring-jade/20";

export default function AuditForm({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      businessName: String(formData.get("businessName") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      email: String(formData.get("email") || ""),
      packageName: "Free store audit",
      message: String(formData.get("message") || ""),
      company_website: String(formData.get("company_website") || ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-jade-pale text-jade-deep">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Request received</h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          We&apos;ll reach out on WhatsApp or email within one business day to talk through your
          store.
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
        Free store audit
      </p>
      <h3
        id="purchase-modal-title"
        className="mt-2 font-display text-2xl font-semibold text-ink sm:text-[28px]"
      >
        Tell us about your business
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Share a few details and we&apos;ll follow up with a free look at your WhatsApp sales setup
        — no strings attached.
      </p>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Chiamaka Okafor"
              className={inputClasses}
            />
          </Field>
          <Field label="Business name" htmlFor="businessName" optional>
            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Chiamaka's Closet"
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp number" htmlFor="whatsapp">
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              placeholder="0803 123 4567"
              className={inputClasses}
            />
          </Field>
          <Field label="Email address" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </Field>
        </div>

        <Field label="Anything we should know?" htmlFor="message" optional>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="What do you sell, and what's slowing you down right now?"
            className={`${inputClasses} resize-none`}
          />
        </Field>

        {status === "error" && (
          <p className="rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "submitting" ? "Sending…" : "Request my free audit"}
        </button>
        <p className="text-center text-xs text-ink-muted">
          No payment needed — we&apos;ll just get in touch to help you get started.
        </p>
      </form>
    </>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        {optional && <span className="text-xs text-ink-muted">Optional</span>}
      </label>
      {children}
    </div>
  );
}
