"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Package, CheckCircle2, Zap } from "lucide-react";

const questions = ["How much is this?", "Still available?", "Size 40?", "Acct number?"];

const products = [
  { label: "Ankara Set", price: "₦18,000", tone: "bg-gold-bright/20" },
  { label: "Beaded Clutch", price: "₦9,500", tone: "bg-jade-pale/70" },
  { label: "Suede Heels", price: "₦22,000", tone: "bg-gold-bright/20" },
  { label: "Silk Scarf", price: "₦6,000", tone: "bg-jade-pale/70" },
];

const slides = [
  {
    key: "dms",
    eyebrow: "Your DMs, right now",
    caption: "From scattered DMs to",
    captionAccent: "endless repeat questions",
  },
  {
    key: "store",
    eyebrow: "Your store, always open",
    caption: "Turns into",
    captionAccent: "a proper online store",
  },
];

export default function HeroVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => setActive((i + slides.length) % slides.length);

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0">
      <div
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink shadow-2xl shadow-ink/30"
        onMouseEnter={() => {}}
      >
        {/* subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Slide 1: WhatsApp-style DM thread */}
        <div
          className={`absolute inset-0 flex flex-col p-6 transition-opacity duration-500 ${
            active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-paper/70">
              {slides[0].eyebrow}
            </span>
            <span className="h-2 w-2 rounded-full bg-gold-bright" />
          </div>
          <div className="mt-5 flex-1 space-y-2.5">
            {questions.map((q, i) => (
              <div
                key={q}
                className={`w-fit max-w-[78%] rounded-2xl rounded-bl-sm bg-white/8 px-3.5 py-2 text-sm text-paper ${
                  i % 2 === 1 ? "ml-auto rounded-bl-2xl rounded-br-sm bg-jade/40" : ""
                }`}
              >
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* Slide 2: organised storefront grid */}
        <div
          className={`absolute inset-0 flex flex-col p-6 transition-opacity duration-500 ${
            active === 1 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-paper/70">
              {slides[1].eyebrow}
            </span>
            <span className="h-2 w-2 rounded-full bg-jade" />
          </div>
          <div className="mt-5 grid flex-1 grid-cols-2 gap-2.5">
            {products.map((p) => (
              <div key={p.label} className="rounded-xl bg-white/8 p-3">
                <div className={`mb-2 h-14 w-full rounded-lg ${p.tone}`} />
                <p className="text-xs font-medium text-paper">{p.label}</p>
                <p className="text-xs text-gold-bright">{p.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-jade/25 px-3 py-2 text-xs font-medium text-jade-pale">
            <CheckCircle2 className="h-4 w-4" />
            Order confirmed automatically
          </div>
        </div>

        {/* caption + gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-6 bottom-5">
          <p className="text-sm font-medium text-paper/80">{slides[active].caption}</p>
          <p className="font-display text-xl font-semibold italic text-gold-bright">
            {slides[active].captionAccent}
          </p>
        </div>

        {/* prev/next arrows */}
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-paper opacity-0 backdrop-blur-sm transition hover:bg-white/20 group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-paper opacity-0 backdrop-blur-sm transition hover:bg-white/20 group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* dot navigation */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              active === i ? "w-6 bg-ink" : "w-1.5 bg-sand"
            }`}
          />
        ))}
      </div>

      {/* Floating stat card 1 */}
      <div className="absolute -left-5 top-[28%] hidden items-center gap-3 rounded-2xl border border-sand bg-paper p-3.5 shadow-xl sm:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jade-pale text-jade-deep">
          <Package className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-ink-muted">New order</p>
          <p className="text-sm font-bold text-ink">Size 40 sneakers</p>
        </div>
      </div>

      {/* Floating stat card 2 */}
      <div className="absolute -right-4 top-14 hidden rounded-2xl bg-ink p-4 text-paper shadow-xl sm:block">
        <p className="text-xs font-medium opacity-70">This week</p>
        <p className="font-display text-2xl font-semibold text-gold-bright">₦142k</p>
        <p className="text-xs opacity-70">in orders</p>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 right-6 hidden items-center gap-2 rounded-2xl bg-gold px-4 py-3 text-white shadow-xl sm:flex">
        <Zap className="h-4 w-4" />
        <div>
          <p className="text-xs font-medium opacity-90">Setup in</p>
          <p className="text-sm font-bold">3–5 days</p>
        </div>
      </div>
    </div>
  );
}
