"use client";

import { ClipboardCheck, ArrowRight } from "lucide-react";
import { usePurchaseModal } from "./purchase-modal-context";

const checks = [
  "Where you're losing orders to slow replies",
  "What your catalogue is missing",
  "The fastest package for your business",
];

export default function Audit() {
  const { openAudit } = usePurchaseModal();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-8 lg:pb-28">
      <div className="flex flex-col items-start gap-8 rounded-[32px] border border-sand bg-paper-warm p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold-bright">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Not sure where to start? Get a free store audit.
            </h2>
            <p className="mt-2 max-w-lg text-ink-soft">
              A quick, no-pressure look at how you sell today — we&apos;ll tell you:
            </p>
            <ul className="mt-3 space-y-1.5">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-jade" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={openAudit}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-jade-deep lg:w-auto"
        >
          Request my free audit
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
