import { diyPackages } from "@/lib/packages";

import PlanCard from "./plan-card";

export default function DiyPricing() {
  return (
    <section
      id="do-it-yourself"
      aria-labelledby="diy-pricing-heading"
      className="bg-paper-warm"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="max-w-xl">
          <h2
            id="diy-pricing-heading"
            className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl"
          >
            Build your own sales system
          </h2>

          <p className="mt-4 text-lg text-ink-soft">
            Get the tools and features you need to set up your store, connect
            your sales channels, and start selling on your own.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {diyPackages.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
