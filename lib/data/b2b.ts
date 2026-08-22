import type { B2BOrder, B2BSession, FleetAgreement } from "@/types";

/*
 * Canale B2B: prezzi netti, fido, condizioni di pagamento.
 * "B2B" e' il nome del canale commerciale; "area enterprise" e' il nome che
 * quell'area ha nell'interfaccia. I due termini non vanno confusi.
 */

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

/** DATI MOCK — convenzione flotta attiva sull'account dimostrativo. */
export const demoFleetAgreement: FleetAgreement = {
  codice: "CONV-2026-014",
  mezzi: 18,
  tipiMezzo: "Furgoni e autocarri leggeri",
  scontoConcordato: 22,
  validaDal: "01/03/2026",
  validaAl: "28/02/2027",
  referenteOfficina: "Accettazione diretta, priorita' sui fermi macchina",
};

/*
 * PLACEHOLDER — condizioni commerciali da confermare con il cliente.
 * Servono alla landing pubblica dell'area enterprise.
 */
export const enterpriseOffers = [
  {
    slug: "flotte",
    eyebrow: "Per chi gestisce mezzi",
    title: "Convenzioni flotte",
    lead: "Un accordo annuale per aziende con piu' mezzi: prezzo concordato, interventi programmati, un solo interlocutore.",
    points: [
      "Sconto concordato sul listino, fisso per tutta la durata",
      "Fermi macchina programmati fuori dalle ore di punta",
      "Deposito degli pneumatici stagionali per l'intera flotta",
      "Riepilogo periodico degli interventi per mezzo",
    ],
    audience: "Imprese di trasporto, aziende agricole, cantieri, enti con parco mezzi",
  },
  {
    slug: "rivenditori",
    eyebrow: "Per chi rivende",
    title: "Condizioni rivenditori",
    lead: "Accesso al listino netto per officine e gommisti, con fido concordato e richieste d'ordine dal portale.",
    points: [
      "Prezzi netti riservati, sconto medio del 27% sul listino",
      "Ricerca per EAN o codice articolo",
      "Fido concordato e situazione contabile sempre visibile",
      "Richiesta d'ordine dal portale, evasione in 24/48 ore",
    ],
    audience: "Officine, gommisti, concessionarie, autonoleggi",
  },
] as const;

/** PLACEHOLDER — iter di attivazione da confermare. */
export const enterpriseSteps = [
  {
    index: "01",
    title: "Ci mandi la richiesta",
    text: "Ragione sociale, partita IVA e due righe su mezzi o volumi: bastano per capire di cosa hai bisogno.",
  },
  {
    index: "02",
    title: "Concordiamo le condizioni",
    text: "Ti richiamiamo per definire sconto, fido e modalita' di pagamento. Per le flotte si fissa anche il calendario degli interventi.",
  },
  {
    index: "03",
    title: "Attiviamo l'accesso",
    text: "L'utenza viene abilitata a mano dopo la verifica: da quel momento vedi i netti e puoi inviare richieste d'ordine.",
  },
] as const;
