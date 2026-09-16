export type Package = {
  id: string;
  name: string;
  price: string;
  amountNaira: number;
  tagline: string;
  popular: boolean;
  intro?: string;
  features: string[];
  subscriptionNote?: string;
};

export const diyPackages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦15,000",
    amountNaira: 15000,
    tagline: "For businesses that want to do it themselves.",
    popular: false,
    features: [
      "WhatsApp sales playbook",
      "Product catalogue template",
      "Pricing calculator",
      "30-day content calendar",
      "30 Canva templates",
      "40+ AI prompts",
      "Store launch checklist",
      "WhatsApp optimisation guide",
      "Myshoplet setup guide",
      "First-10-orders action plan",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₦25,000",
    amountNaira: 25000,
    tagline: "For businesses that want more tools and guidance.",
    popular: true,
    intro: "Everything in Starter, plus:",
    features: [
      "60 Canva templates",
      "90-day content calendar",
      "100+ AI prompts",
      "Advanced sales scripts",
      "Business dashboard",
      "Store copy templates",
      "Myshoplet video setup guide",
      "30-minute store review",
    ],
  },
];

export const dfyPackages: Package[] = [
  {
    id: "launch",
    name: "Launch",
    price: "₦100,000",
    amountNaira: 100000,
    tagline: "3–5 business days",
    popular: false,
    features: [
      "Store setup & branding",
      "Up to 20 products",
      "Categories & variants",
      "Product descriptions",
      "Payment setup assistance",
      "WhatsApp setup",
      "Delivery setup",
      "Store policies",
      "5 promotional designs",
      "Testing & launch",
    ],
    subscriptionNote: "Myshoplet subscription: ₦15,000/month applies after the first month.",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₦150,000",
    amountNaira: 150000,
    tagline: "Most popular done-for-you plan",
    popular: true,
    intro: "Everything in Launch, plus:",
    features: [
      "Up to 50 products",
      "Product copy optimisation",
      "20 Canva designs",
      "30-day content calendar",
      "50 AI marketing prompts",
      "WhatsApp sales system",
      "Instagram bio optimisation",
      "Store SEO basics",
      "Promotional campaign setup",
      "30-minute training",
      "14 days support",
    ],
    subscriptionNote: "Myshoplet subscription: ₦35,000/month applies after the first month.",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₦250,000",
    amountNaira: 250000,
    tagline: "For businesses ready to take this seriously.",
    popular: false,
    intro: "Everything in Growth, plus:",
    features: [
      "Up to 100 products",
      "Advanced storefront customisation",
      "Custom domain setup assistance",
      "60 Canva designs",
      "90-day content calendar",
      "100+ AI prompts",
      "Complete WhatsApp sales system",
      "Pricing & offer review",
      "Analytics setup",
      "Conversion optimisation",
      "60-minute training",
      "30 days support",
    ],
    subscriptionNote: "Myshoplet subscription: ₦70,000/month applies after the first month.",
  },
];

export const allPackages: Package[] = [...diyPackages, ...dfyPackages];

export function findPackage(id: string): Package | undefined {
  return allPackages.find((p) => p.id === id);
}
