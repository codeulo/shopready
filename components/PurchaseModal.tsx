"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { usePurchaseModal } from "./purchase-modal-context";
import AuditForm from "./AuditForm";
import CheckoutForm from "./CheckoutForm";
import { findPackage } from "@/lib/packages";

export default function PurchaseModal() {
  const { isOpen, close, mode, packageId, sessionId } = usePurchaseModal();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const pkg = packageId ? findPackage(packageId) : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-deep/70 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-modal-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-sand bg-paper p-7 shadow-2xl animate-fade-up sm:rounded-3xl sm:p-9"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-paper-deep hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Keyed by sessionId so form/status state resets fresh every time the modal reopens. */}
        {mode === "checkout" && pkg ? (
          <CheckoutForm key={sessionId} pkg={pkg} onDone={close} />
        ) : (
          <AuditForm key={sessionId} onDone={close} />
        )}
      </div>
    </div>
  );
}
