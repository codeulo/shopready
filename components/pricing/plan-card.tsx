"use client";

import { Check } from "lucide-react";

import { usePurchaseModal } from "../purchase-modal-context";
import type { Package } from "@/lib/packages";

interface PlanCardProps {
  plan: Package;
  dark?: boolean;
}

export default function PlanCard({ plan, dark = false }: PlanCardProps) {
  const { openCheckout } = usePurchaseModal();

  const isPopular = plan.popular;

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        isPopular
          ? "border-ink bg-ink shadow-2xl shadow-ink/30"
          : dark
            ? "border-jade-deep/40 bg-ink-deep hover:border-jade/60"
            : "border-sand bg-white hover:border-ink/30 hover:shadow-lg hover:shadow-ink/5"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-white">
          Most popular
        </span>
      )}

      {/* Plan heading */}
      <div className="mb-6">
        <h3
          className={`text-lg font-bold ${
            isPopular
              ? "text-gold-bright"
              : dark
                ? "text-jade-pale"
                : "text-ink"
          }`}
        >
          {plan.name}
        </h3>

        <p
          className={`mt-1 text-sm ${
            isPopular
              ? "text-paper/70"
              : dark
                ? "text-paper/50"
                : "text-ink-muted"
          }`}
        >
          {plan.tagline}
        </p>

        <p
          className={`mt-4 font-display text-4xl font-semibold ${
            isPopular || dark ? "text-paper" : "text-ink"
          }`}
        >
          {plan.price}
        </p>
      </div>

      {/* Intro */}
      {plan.intro && (
        <p
          className={`mb-3 text-xs font-semibold ${
            isPopular
              ? "text-paper/70"
              : dark
                ? "text-paper/50"
                : "text-ink-muted"
          }`}
        >
          {plan.intro}
        </p>
      )}

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isPopular
                  ? "text-gold-bright"
                  : dark
                    ? "text-jade"
                    : "text-jade-deep"
              }`}
              strokeWidth={2}
            />

            <span
              className={`text-sm ${
                isPopular
                  ? "text-paper/90"
                  : dark
                    ? "text-paper/70"
                    : "text-ink-soft"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type="button"
        onClick={() => openCheckout(plan.id)}
        className={`w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all ${
          isPopular
            ? "bg-gold text-white shadow-lg shadow-gold/30 hover:bg-gold-deep"
            : dark
              ? "bg-jade-deep text-paper hover:bg-jade"
              : "bg-ink text-paper hover:bg-jade-deep"
        }`}
      >
        {plan.id === "launch" ? "Get my store set up" : `Choose ${plan.name}`}
      </button>

      {/* Subscription note */}
      {plan.subscriptionNote && (
        <span
          className={`mt-4 block text-xs ${
            dark || isPopular ? "text-paper/50" : "text-ink-muted"
          }`}
        >
          {plan.subscriptionNote}
        </span>
      )}
    </div>
  );
}
