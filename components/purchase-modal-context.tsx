"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type PurchaseMode = "audit" | "checkout";

type PurchaseModalState = {
  isOpen: boolean;
  mode: PurchaseMode;
  /** Package id from lib/packages.ts, only relevant when mode === 'checkout'. */
  packageId: string | null;
  /** Increments every time open() is called; used as a React key to reset form state on reopen. */
  sessionId: number;
  openAudit: () => void;
  openCheckout: (packageId: string) => void;
  close: () => void;
};

const PurchaseModalContext = createContext<PurchaseModalState | null>(null);

export function PurchaseModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PurchaseMode>("audit");
  const [packageId, setPackageId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState(0);

  const openAudit = useCallback(() => {
    setMode("audit");
    setPackageId(null);
    setIsOpen(true);
    setSessionId((id) => id + 1);
  }, []);

  const openCheckout = useCallback((id: string) => {
    setMode("checkout");
    setPackageId(id);
    setIsOpen(true);
    setSessionId((id2) => id2 + 1);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, mode, packageId, sessionId, openAudit, openCheckout, close }),
    [isOpen, mode, packageId, sessionId, openAudit, openCheckout, close]
  );

  return (
    <PurchaseModalContext.Provider value={value}>{children}</PurchaseModalContext.Provider>
  );
}

export function usePurchaseModal() {
  const ctx = useContext(PurchaseModalContext);
  if (!ctx) throw new Error("usePurchaseModal must be used within PurchaseModalProvider");
  return ctx;
}
