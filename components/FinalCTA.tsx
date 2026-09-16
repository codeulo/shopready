"use client";

import { usePurchaseModal } from "./purchase-modal-context";
import { diyPackages } from "@/lib/packages";

const stats = [
  { value: "₦15,000", label: "to get started with the Starter Kit" },
  { value: "3–5 days", label: "for Done-For-You store setup" },
  { value: "200+", label: "businesses already selling professionally" },
];

export default function FinalCTA() {
  const { openCheckout, openAudit } = usePurchaseModal();
  const starter = diyPackages[0];

  return (
    <section className="relative overflow-hidden bg-ink py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10" />

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold-bright">
          Get started
        </span>
        <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-paper sm:text-5xl">
          Ready to stop selling from scattered WhatsApp messages?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-paper/70">
          Your customers are already online. Give them a better way to buy from you.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openCheckout(starter.id)}
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition hover:bg-gold-deep"
          >
            Get the Starter Kit — {starter.price}
          </button>
          <button
            type="button"
            onClick={openAudit}
            className="rounded-full border border-jade/50 px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-white/10"
          >
            Get my free audit
          </button>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.value} className="rounded-2xl border border-jade-deep p-5">
              <p className="font-display text-3xl font-semibold text-gold-bright">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-paper/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
