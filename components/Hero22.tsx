"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePurchaseModal } from "./purchase-modal-context";
import HeroVisual from "./HeroVisual";
import { diyPackages } from "@/lib/packages";

const people = [
  { src: "/people/a.jpeg", name: "Business owner" },
  { src: "/people/b.jpeg", name: "Business owner" },
  { src: "/people/c.jpeg", name: "Business owner" },
  { src: "/people/d.jpeg", name: "Business owner" },
];

export default function Hero() {
  const { openCheckout } = usePurchaseModal();
  const starter = diyPackages[0];

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1b4332 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:pb-28 lg:pt-12">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-jade-pale px-3 py-1.5 text-xs font-semibold text-jade-deep">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jade" />
            Built for Nigerian small businesses
          </div>

          <h1 className="text-balance font-display text-5xl leading-[1.05] text-ink sm:text-6xl xl:text-[4.5rem]">
            Turn your WhatsApp <em className="not-italic text-gold">business</em> into a real
            online store
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
            You already have products. You already have customers. Now give your business a
            proper system for turning conversations into orders — professionally.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => openCheckout(starter.id)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-paper transition-all hover:bg-jade-deep hover:shadow-lg hover:shadow-ink/20"
            >
              Get the Starter Kit — {starter.price}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-7 py-4 text-base font-semibold text-ink transition-all hover:bg-ink hover:text-paper"
            >
              Set up my store
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {people.map((p) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-paper object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-ink-muted">
              <span className="font-semibold text-ink">200+ businesses</span> already selling more
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
