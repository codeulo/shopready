import { Store, Send, Camera, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

const productLinks = [
  { label: "What You Get", href: "#what-you-get" },
  { label: "Pricing", href: "#pricing" },
  { label: "Starter Kit", href: "#pricing" },
  { label: "Pro Kit", href: "#pricing" },
  { label: "Done For You", href: "#pricing" },
];

const companyLinks = [
  { label: "Who it's for", href: "#perfect-for" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: `mailto:${siteConfig.contactEmail}` },
];

const socials = [
  { icon: Send, label: "Twitter" },
  { icon: Camera, label: "Instagram" },
  { icon: MessageCircle, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-deep py-16 text-paper/70">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 border-b border-ink pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-gold-bright">
                <Store className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-lg font-bold text-paper">
                Store<span className="text-gold">Ready</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">{siteConfig.description}</p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink transition-colors hover:bg-jade-deep"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-paper">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-gold-bright">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-paper">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-gold-bright">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-jade sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Built for
            Nigerian businesses.
          </p>
          <p>Made with care for small business owners 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}
