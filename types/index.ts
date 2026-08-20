export type Season = "estive" | "invernali" | "quattro-stagioni";

export type VehicleClass = "auto" | "autocarri" | "agricoli" | "industriali";

/**
 * "online"     -> acquistabile dallo store B2C
 * "preventivo" -> misura fuori standard (agricolo/industriale): si richiede un preventivo
 */
export type SaleMode = "online" | "preventivo";

export interface EuLabel {
  /** Classe efficienza carburante: A..E */
  fuel: string;
  /** Classe aderenza sul bagnato: A..E */
  wet: string;
  /** Rumorosita' esterna in dB */
  noise: number;
}

export interface Tyre {
  id: string;
  ean: string;
  /** Codice articolo interno / fornitore */
  code: string;
  brand: string;
  model: string;
  /** Larghezza nominale in mm (es. 205) */
  width: number;
  /** Spallamento / serie in % (es. 55) */
  profile: number;
  /** Raggio / diametro cerchio in pollici (es. 16) */
  radius: number;
  loadIndex: string;
  speedRating: string;
  season: Season;
  vehicleClass: VehicleClass;
  saleMode: SaleMode;
  runflat: boolean;
  /** Prezzo al pubblico IVA inclusa, per pneumatico */
  price: number;
  /** Prezzo netto riservato ai clienti B2B, per pneumatico */
  netPrice: number;
  stock: number;
  label: EuLabel;
  notes?: string;
}

export type DeliveryMethod = "spedizione" | "officina";

export interface CartLine {
  tyreId: string;
  qty: number;
  /**
   * Preferenza espressa nella scheda prodotto: usata solo per pre-selezionare
   * il metodo di consegna in checkout. Il calcolo del sovrapprezzo resta
   * centralizzato in lib/cart/totals.ts.
   */
  wantsWorkshop: boolean;
}

export interface B2BSession {
  ragioneSociale: string;
  referente: string;
  partitaIva: string;
  email: string;
  /** Fido totale concesso in euro */
  plafond: number;
  /** Fido gia' impegnato in euro */
  used: number;
  /** Sconto medio a listino applicato al canale ingrosso */
  scontoMedio: number;
}

export interface B2BOrder {
  id: string;
  date: string;
  articoli: number;
  imponibile: number;
  stato: "Evaso" | "In preparazione" | "In attesa di pagamento";
}
