/**
 * PLACEHOLDER — listino provvisorio.
 *
 * I valori qui sotto verranno sostituiti dal listino reale, applicato agli
 * articoli restituiti dalla API del fornitore. Nessun altro file del progetto
 * conosce questi numeri: la UI passa sempre da `getMountingFee`, `getShipping`
 * e dalle costanti esportate da questo modulo.
 */

/** Sovrapprezzo per pneumatico di montaggio + bilanciatura elettronica, per raggio. */
export const MOUNTING_FEE_BY_RADIUS: Record<number, number> = {
  15: 12,
  16: 14,
  17: 16,
  18: 18,
  19: 20,
  20: 22,
  21: 24,
  22: 26,
};

export const MIN_RADIUS = 15;
export const MAX_RADIUS = 22;

/** Cosa e' compreso nel sovrapprezzo, mostrato in scheda prodotto e in checkout. */
export const MOUNTING_INCLUDES = [
  "Smontaggio del vecchio pneumatico e smaltimento",
  "Montaggio su cerchio e gonfiaggio",
  "Bilanciatura elettronica di precisione",
  "Controllo valvola e serraggio a coppia",
] as const;

/** Spese di spedizione forfettarie e soglia di gratuita'. */
export const SHIPPING_FLAT = 9.9;
export const FREE_SHIPPING_THRESHOLD = 250;

/** IVA usata per lo scorporo mostrato in checkout. */
export const VAT_RATE = 0.22;

/**
 * Sovrapprezzo per un singolo pneumatico del raggio indicato.
 * Fuori dall'intervallo R15-R22 il valore viene limitato agli estremi.
 */
export function getMountingFee(radius: number): number {
  const clamped = Math.min(Math.max(Math.round(radius), MIN_RADIUS), MAX_RADIUS);
  return MOUNTING_FEE_BY_RADIUS[clamped] ?? MOUNTING_FEE_BY_RADIUS[MIN_RADIUS];
}

/** Spedizione a domicilio: gratuita oltre la soglia. */
export function getShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
