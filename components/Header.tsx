"use client";

import { useEffect, useState } from "react";
import { Menu, X, Store } from "lucide-react";
import { usePurchaseModal } from "./purchase-modal-context";
import Image from "next/image";

const navItems = [
  { label: "What you get", href: "#what-you-get" },
  { label: "Pricing", href: "#pricing" },
  { label: "Who it's for", href: "#perfect-for" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const { openAudit } = usePurchaseModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-sand bg-paper/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#top" className="">
          {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-gold-bright">
            <Store className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="font-sans text-lg font-bold tracking-tight text-ink">
            Store<span className="text-gold">Ready</span>
          </span> */}
          <Image
            src="/logo/s-logo.png"
            alt="StoreReady Logo"
            width={500}
            height={500}
            className="h-16 w-full -ml-6 object-contain"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-jade-deep md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openAudit}
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-jade-deep md:inline-flex"
        >
          Get started
        </button>

        <button
          type="button"
          className="p-2 text-ink md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-sand bg-paper px-6 py-5 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-jade-deep"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openAudit();
            }}
            className="rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-paper"
          >
            Get started
          </button>
        </div>
      )}
    </header>
  );
}
