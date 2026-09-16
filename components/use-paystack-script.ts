"use client";

import { useEffect, useState } from "react";

const PAYSTACK_SRC = "https://js.paystack.co/v1/inline.js";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

/** Lazily injects the Paystack inline script and reports whether window.PaystackPop is ready. */
export function usePaystackScript() {
  const [isReady, setIsReady] = useState(
    typeof window !== "undefined" && Boolean(window.PaystackPop)
  );

  useEffect(() => {
    if (isReady) return;
    if (typeof window === "undefined") return;

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => setIsReady(true));
      if (window.PaystackPop) queueMicrotask(() => setIsReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = PAYSTACK_SRC;
    script.async = true;
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);
  }, [isReady]);

  return isReady;
}
