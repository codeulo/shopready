import {
  MessageCircleMore,
  LayoutGrid,
  Palette,
  CalendarDays,
  Sparkles,
  Calculator,
  ListChecks,
  Store,
} from "lucide-react";

const features = [
  {
    icon: MessageCircleMore,
    title: "WhatsApp Sales Scripts",
    description:
      "Copy-and-paste responses for enquiries, follow-ups, payments, delivery, objections, reviews and repeat customers.",
    tag: "Saves hours daily",
  },
  {
    icon: LayoutGrid,
    title: "Product Catalogue Templates",
    description:
      "Organise your products, prices, stock, variants and descriptions properly — no more scattered screenshots.",
    tag: "Professional look",
  },
  {
    icon: Palette,
    title: "Canva Marketing Templates",
    description:
      "Ready-to-customise designs for new products, sales, reviews, restocks, offers and more.",
    tag: "30–60 templates",
  },
  {
    icon: CalendarDays,
    title: "30-Day Content Calendar",
    description: "Know what to post every day without wondering what to say.",
    tag: "Post every day",
  },
  {
    icon: Sparkles,
    title: "AI Sales & Marketing Prompts",
    description:
      "Use AI to create product descriptions, captions, offers, customer responses and content faster.",
    tag: "40–100+ prompts",
  },
  {
    icon: Calculator,
    title: "Pricing Calculator",
    description:
      "Calculate your selling price based on costs, fees, marketing and your desired profit margin.",
    tag: "Price confidently",
  },
  {
    icon: ListChecks,
    title: "Online Store Launch Checklist",
    description: "Everything you need to prepare before sending your store link to customers.",
    tag: "Launch ready",
  },
  {
    icon: Store,
    title: "Myshoplet Setup Guide",
    description: "Step-by-step guidance for turning your catalogue into a functioning online store.",
    tag: "Step-by-step",
  },
];

export default function Features() {
  return (
    <section id="what-you-get" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">
          What&apos;s inside
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          A complete starter system for selling online
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Everything in one place, designed for Nigerian businesses selling through WhatsApp and
          Instagram.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group flex flex-col gap-4 rounded-2xl border border-sand bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-ink/5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-jade-pale text-jade-deep">
              <feature.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </div>
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-pale px-2.5 py-1 text-xs font-semibold text-gold-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {feature.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
