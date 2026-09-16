"use client";

import { useState } from "react";
import { Plus, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

const faqs = [
  {
    question: "Do I need a website already?",
    answer:
      "No. We'll help you set up your online storefront from scratch. The Starter and Pro kits guide you through Myshoplet, while our Done-For-You packages handle everything technical.",
  },
  {
    question: "Do I need to stop selling on WhatsApp?",
    answer:
      "Absolutely not. The goal is to make WhatsApp a key part of your sales system, not replace it. You'll have a store link to share, and WhatsApp stays your primary customer channel.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. The Starter and Pro kits are designed for beginners — step-by-step guides with screenshots. Our Done-For-You packages handle all the technical setup for you.",
  },
  {
    question: "Is Myshoplet included in the price?",
    answer:
      "The setup service includes assistance setting up your store on Myshoplet. Any third-party platform subscriptions, payment processing fees, domain costs or delivery charges are paid separately.",
  },
  {
    question: "How quickly can my store go live?",
    answer:
      "Most Launch setups are completed within 3–5 business days once we have your business information and product materials. Growth and Premium may take slightly longer.",
  },
  {
    question: "Can you help me upload my products?",
    answer:
      "Yes. Product upload is included in all Done-For-You packages, up to the limits of your selected plan (20 for Launch, 50 for Growth, 100 for Premium).",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper-warm">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="grid items-start gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">FAQ</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Common questions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Still wondering if this is right for you? Here are the questions we hear most often.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4" />
              Have another question? Email us
            </a>
          </div>

          <div className="space-y-3 lg:col-span-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                    isOpen ? "border-ink/30 shadow-md" : "border-sand hover:border-ink/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-sm font-semibold leading-snug text-ink">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sand transition-transform duration-200 ${
                        isOpen ? "rotate-45 border-ink bg-ink text-paper" : "text-ink"
                      }`}
                    >
                      <Plus className="h-3 w-3" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
