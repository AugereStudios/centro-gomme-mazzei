// PLACEHOLDER DEMO — sessione B2B simulata.
// Nessuna autenticazione reale: il login accetta qualsiasi credenziale e
// restituisce l'account dimostrativo. Da sostituire con auth server-side.
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoB2BSession } from "@/lib/data/b2b";
import type { B2BSession } from "@/types";

interface B2BState {
  session: B2BSession | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useB2BStore = create<B2BState>()(
  persist(
    (set) => ({
      session: null,
      login: (email) => set({ session: { ...demoB2BSession, email: email || demoB2BSession.email } }),
      logout: () => set({ session: null }),
    }),
    { name: "mazzei-b2b" },
  ),
);
