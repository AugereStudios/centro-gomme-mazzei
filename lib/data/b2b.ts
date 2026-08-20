import type { B2BOrder, B2BSession } from "@/types";

/** DATI MOCK — sessione dimostrativa restituita dal login placeholder. */
export const demoB2BSession: B2BSession = {
  ragioneSociale: "Autofficina Ricci S.r.l.",
  referente: "Gianni Ricci",
  partitaIva: "02845610643",
  email: "ordini@autofficinaricci.it",
  plafond: 15000,
  used: 8420.5,
  scontoMedio: 27,
};

/** DATI MOCK — ultimi ordini mostrati in dashboard. */
export const demoB2BOrders: B2BOrder[] = [
  { id: "ORD-2026-0418", date: "12/08/2026", articoli: 16, imponibile: 1284.6, stato: "Evaso" },
  { id: "ORD-2026-0402", date: "29/07/2026", articoli: 8, imponibile: 742.0, stato: "Evaso" },
  { id: "ORD-2026-0391", date: "18/07/2026", articoli: 24, imponibile: 2136.8, stato: "In preparazione" },
  { id: "ORD-2026-0377", date: "03/07/2026", articoli: 4, imponibile: 412.4, stato: "In attesa di pagamento" },
];
