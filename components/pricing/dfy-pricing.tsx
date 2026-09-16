import { dfyPackages } from "@/lib/packages";

import PlanCard from "./plan-card";

export default function DfyPricing() {
  return (
    <section
      id="done-for-you"
      aria-labelledby="dfy-pricing-heading"
      className="bg-ink-deep/5"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-ink-muted">
            Don&apos;t want to set it up yourself?
          </p>

          <h2
            id="dfy-pricing-heading"
            className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl"
          >
            We&apos;ll build your store for you.
          </h2>

          <p className="mt-4 text-lg text-ink-soft">
            You focus on your business. We handle the setup — branding,
            products, payments, and your WhatsApp sales system, done properly
            from the start.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dfyPackages.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          Any third-party platform subscription, payment processing, domain or
          delivery charges are paid separately by you, the business owner.
        </p>
      </div>
    </section>
  );
}
