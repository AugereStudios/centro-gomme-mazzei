import { getMountingFee, getShipping, VAT_RATE } from "@/lib/config/pricing";
import { getTyreById } from "@/lib/data/tyres";
import type { CartLine, DeliveryMethod, Tyre } from "@/types";

export interface ResolvedLine {
  tyre: Tyre;
  qty: number;
  wantsWorkshop: boolean;
  /** Sovrapprezzo unitario di montaggio + bilanciatura per il raggio dell'articolo. */
  mountingFee: number;
  /** Solo pneumatici: prezzo x quantita'. */
  lineTotal: number;
  /** Sovrapprezzo di riga, valorizzato solo con consegna "officina". */
  lineMounting: number;
}

export interface CartTotals {
  items: ResolvedLine[];
  itemCount: number;
  subtotal: number;
  mountingTotal: number;
  shipping: number;
  total: number;
  /** Scorporo IVA sul totale, indicativo. */
  vat: number;
  taxable: number;
}

/**
 * Unico punto in cui il carrello diventa un totale.
 * Il sovrapprezzo di montaggio e' calcolato qui, riga per riga, e vale solo
 * quando il cliente sceglie il ritiro in officina.
 */
export function computeTotals(lines: CartLine[], method: DeliveryMethod): CartTotals {
  const items: ResolvedLine[] = [];

  for (const line of lines) {
    const tyre = getTyreById(line.tyreId);
    if (!tyre) continue;
    const mountingFee = getMountingFee(tyre.radius);
    items.push({
      tyre,
      qty: line.qty,
      wantsWorkshop: line.wantsWorkshop,
      mountingFee,
      lineTotal: tyre.price * line.qty,
      lineMounting: method === "officina" ? mountingFee * line.qty : 0,
    });
  }

  const subtotal = round2(items.reduce((sum, i) => sum + i.lineTotal, 0));
  const mountingTotal = round2(items.reduce((sum, i) => sum + i.lineMounting, 0));
  const shipping = method === "spedizione" ? getShipping(subtotal) : 0;
  const total = round2(subtotal + mountingTotal + shipping);
  const taxable = round2(total / (1 + VAT_RATE));

  return {
    items,
    itemCount: items.reduce((sum, i) => sum + i.qty, 0),
    subtotal,
    mountingTotal,
    shipping,
    total,
    taxable,
    vat: round2(total - taxable),
  };
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
