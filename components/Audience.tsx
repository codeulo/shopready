import { ArrowRight, Handshake } from "lucide-react";

const categories = [
  { emoji: "👗", label: "Fashion businesses" },
  { emoji: "💄", label: "Beauty & skincare" },
  { emoji: "👟", label: "Shoes & accessories" },
  { emoji: "🍰", label: "Bakers & food vendors" },
  { emoji: "💍", label: "Jewelry businesses" },
  { emoji: "📱", label: "Gadget sellers" },
  { emoji: "🌸", label: "Perfume businesses" },
  { emoji: "👜", label: "Bag vendors" },
  { emoji: "🏠", label: "Home & lifestyle" },
];

export default function Audience() {
  return (
    <section id="perfect-for" className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">
            Perfect for
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-ink sm:text-5xl">
            Built for how <em className="not-italic text-gold">Nigerian businesses</em> actually
            sell
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Whether you sell on WhatsApp, Instagram, or both — we&apos;ll help you build a system
            around how you already work.
          </p>

          <div className="mt-8 rounded-2xl border-l-4 border-ink bg-paper-warm p-6">
            <p className="font-display text-base italic leading-relaxed text-ink">
              &ldquo;You don&apos;t need to build a website from scratch. You need a system that
              makes it easy for customers to see your products, choose what they want, place an
              order, pay, and receive confirmation.&rdquo;
            </p>
          </div>

          <a
            href="#pricing"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all hover:gap-3 hover:text-gold"
          >
            Find the right option for your business
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-sand bg-white p-4 text-center transition-all duration-200 hover:border-ink/30 hover:bg-jade-pale/40 hover:shadow-md"
              >
                <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                  {cat.emoji}
                </span>
                <p className="text-xs font-medium leading-tight text-ink-soft">{cat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-ink p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-bright">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-jade-pale">And many more</p>
              <p className="text-sm font-semibold text-paper">
                Any Nigerian business selling through WhatsApp & Instagram
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
