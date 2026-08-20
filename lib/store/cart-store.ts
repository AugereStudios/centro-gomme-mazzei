// PLACEHOLDER DEMO — store dimostrativo del carrello.
// La logica definitiva (persistenza server, disponibilita' reale, prezzi da API
// fornitore) verra' completata in seguito: qui interessa solo mostrare il flusso.
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, DeliveryMethod } from "@/types";

interface CartState {
  lines: CartLine[];
  deliveryMethod: DeliveryMethod;
  /** Numero d'ordine fittizio generato dalla conferma in checkout. */
  lastOrderId: string | null;
  add: (tyreId: string, qty: number, wantsWorkshop: boolean) => void;
  setQty: (tyreId: string, qty: number) => void;
  remove: (tyreId: string) => void;
  clear: () => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setLastOrderId: (id: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      deliveryMethod: "spedizione",
      lastOrderId: null,

      add: (tyreId, qty, wantsWorkshop) =>
        set((state) => {
          const existing = state.lines.find((l) => l.tyreId === tyreId);
          const lines = existing
            ? state.lines.map((l) =>
                l.tyreId === tyreId
                  ? { ...l, qty: l.qty + qty, wantsWorkshop: l.wantsWorkshop || wantsWorkshop }
                  : l,
              )
            : [...state.lines, { tyreId, qty, wantsWorkshop }];
          // La preferenza espressa in scheda prodotto pre-seleziona il montaggio.
          return {
            lines,
            deliveryMethod: wantsWorkshop ? "officina" : state.deliveryMethod,
          };
        }),

      setQty: (tyreId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.tyreId !== tyreId)
              : state.lines.map((l) => (l.tyreId === tyreId ? { ...l, qty } : l)),
        })),

      remove: (tyreId) => set((state) => ({ lines: state.lines.filter((l) => l.tyreId !== tyreId) })),

      clear: () => set({ lines: [] }),

      setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),

      setLastOrderId: (lastOrderId) => set({ lastOrderId }),
    }),
    { name: "mazzei-cart" },
  ),
);
