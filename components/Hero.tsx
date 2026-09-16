"use client";

import { diyPackages } from "@/lib/packages";
import { usePurchaseModal } from "./purchase-modal-context";

export default function Hero() {
  const people = [
    { src: "/people/a.jpeg", name: "Customer A" },
    { src: "/people/b.jpeg", name: "Customer B" },
    { src: "/people/c.jpeg", name: "Customer C" },
    { src: "/people/d.jpeg", name: "Customer D" },
  ];

  const { openCheckout } = usePurchaseModal();
  const starter = diyPackages[0];

  return (
    <section className="min-h-screen bg-[#fffbf5] relative overflow-hidden pt-20">
      {/* subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1B4332 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-[#d8f3dc] text-[#1B4332] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#40916c] rounded-full animate-pulse" />
              Built for Nigerian small businesses
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-[#1B4332]">
              Turn Your WhatsApp{" "}
              <em className="not-italic text-[#d97706]">Business</em> Into a
              Real Online Store
            </h1>

            <p className="text-lg text-[#4a5568] leading-relaxed max-w-lg">
              You already have products. You already have customers. Now give
              your business a proper system for turning conversations into
              orders — professionally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                onClick={() => openCheckout(starter.id)}
                className="inline-flex items-center justify-center gap-2 bg-[#1B4332] text-[#fffbf5] font-semibold px-7 py-4 rounded-full hover:bg-[#2d6a4f] transition-all hover:shadow-lg hover:shadow-[#1B4332]/20 text-base"
              >
                Get the Starter Kit — ₦15,000
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1B4332] text-[#1B4332] font-semibold px-7 py-4 rounded-full hover:bg-[#1B4332] hover:text-[#fffbf5] transition-all text-base"
              >
                Set Up My Store
              </a>
            </div>

            {/* social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {people.map((c, i) => (
                  <img
                    src={c.src}
                    alt={c.name}
                    key={i}
                    className="w-8 h-8 rounded-full border-2 object-cover border-[#fffbf5]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#6b7280]">
                <span className="font-semibold text-[#1B4332]">
                  200+ businesses
                </span>{" "}
                already selling more
              </p>
            </div>
          </div>

          {/* Right: Image + floating stats */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#1B4332] aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1739271933163-8dcc7c8e8a3e?w=800&h=900&fit=crop&auto=format"
                alt="Nigerian entrepreneur using phone for business"
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-transparent to-transparent" />

              {/* bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#fffbf5] text-sm font-medium opacity-80">
                  From scattered DMs to
                </p>
                <p
                  className="text-[#fbbf24] text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  A proper online store
                </p>
              </div>
            </div>

            {/* Floating stat card 1 */}
            <div className="absolute -left-6 top-1/3 bg-[#fffbf5] rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#ece3d4]">
              <div className="w-10 h-10 bg-[#d8f3dc] rounded-xl flex items-center justify-center text-lg">
                📦
              </div>
              <div>
                <p className="text-xs text-[#6b7280] font-medium">New order</p>
                <p className="text-sm font-bold text-[#1B4332]">
                  Size 40 Sneakers
                </p>
              </div>
            </div>

            {/* Floating stat card 2 */}
            <div className="absolute -right-4 top-16 bg-[#1B4332] rounded-2xl shadow-xl p-4 text-[#fffbf5]">
              <p className="text-xs opacity-70 font-medium">This week</p>
              <p className="text-2xl font-bold text-[#fbbf24]">₦142k</p>
              <p className="text-xs opacity-70">in orders</p>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 right-8 bg-[#d97706] text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-xs font-medium opacity-90">Setup in</p>
                <p className="text-sm font-bold">3–5 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <div className="w-px h-8 bg-[#1B4332]" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path
            d="M1 1l5 5 5-5"
            stroke="#1B4332"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
