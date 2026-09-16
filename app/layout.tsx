import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource/dm-serif-display";
import "@fontsource/dm-serif-display/400-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import { PurchaseModalProvider } from "@/components/purchase-modal-context";
import PurchaseModal from "@/components/PurchaseModal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "StoreReady — Turn Your WhatsApp Business Into a Real Online Store",
  description:
    "We help Nigerian small businesses set up a professional online store, organise their products, accept payments and build a better sales system around WhatsApp and Instagram.",
  openGraph: {
    title: "Turn Your WhatsApp Business Into a Real Online Store",
    description:
      "A proper system for turning WhatsApp and Instagram conversations into orders — DIY kits, done-for-you setup, or a free store audit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink-soft antialiased">
        <PurchaseModalProvider>
          {children}
          <PurchaseModal />
        </PurchaseModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
