"use client";

import Image from "next/image";

export default function Hero() {
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
            {/* Agency positioning */}
            <div className="inline-flex items-center gap-2 bg-[#d8f3dc] text-[#1B4332] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-[#40916c] rounded-full animate-pulse" />
              E-commerce setup & growth for Nigerian businesses
            </div>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-[#1B4332]">
              Turn Your Business
              <br />
              Into a{" "}
              <em className="not-italic text-[#d97706]">Store That Sells</em>
            </h1>

            {/* Supporting copy */}
            <p className="text-lg text-[#4a5568] leading-relaxed max-w-lg">
              We help Nigerian small businesses turn their WhatsApp, Instagram,
              TikTok and other social traffic into professional online stores
              where customers can discover products, place orders and pay.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#done-for-you"
                className="inline-flex items-center justify-center gap-2 bg-[#1B4332] text-[#fffbf5] font-semibold px-7 py-4 rounded-full hover:bg-[#2d6a4f] transition-all hover:shadow-lg hover:shadow-[#1B4332]/20 text-base"
              >
                Set Up My Store
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
                href="#do-it-yourself"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1B4332] text-[#1B4332] font-semibold px-7 py-4 rounded-full hover:bg-[#1B4332] hover:text-[#fffbf5] transition-all text-base"
              >
                Do It Yourself
              </a>
            </div>

            {/* Service highlights */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-[#6b7280]">
              <span className="flex items-center gap-2">
                <span className="text-[#40916c]">✓</span>
                Store setup
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#40916c]">✓</span>
                Payments
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#40916c]">✓</span>
                WhatsApp
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#40916c]">✓</span>
                Delivery
              </span>
            </div>
          </div>

          {/* Right: Store transformation visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#1B4332] aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1739271933163-8dcc7c8e8a3e?w=800&h=900&fit=crop&auto=format"
                alt="Nigerian entrepreneur running an online business"
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                width={800}
                height={900}
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#1B4332]/90 via-[#1B4332]/20 to-transparent" />

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#fffbf5] text-sm font-medium opacity-80">
                  From social media selling to
                </p>

                <p
                  className="text-[#fbbf24] text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  A complete online store
                </p>
              </div>
            </div>

            {/* Floating card 1 */}
            <div className="absolute -left-6 top-1/3 bg-[#fffbf5] rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#ece3d4]">
              <div className="w-10 h-10 bg-[#d8f3dc] rounded-xl flex items-center justify-center text-lg">
                🛍️
              </div>

              <div>
                <p className="text-xs text-[#6b7280] font-medium">
                  Your storefront
                </p>

                <p className="text-sm font-bold text-[#1B4332]">
                  Products + Checkout
                </p>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -right-4 top-16 bg-[#1B4332] rounded-2xl shadow-xl p-4 text-[#fffbf5]">
              <p className="text-xs opacity-70 font-medium">Customers can</p>

              <p className="text-xl font-bold text-[#fbbf24]">Browse & Buy</p>

              <p className="text-xs opacity-70">without sending a DM</p>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 right-8 bg-[#d97706] text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
              <span className="text-lg">⚡</span>

              <div>
                <p className="text-xs font-medium opacity-90">Launch-ready</p>

                <p className="text-sm font-bold">3–5 business days</p>
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
