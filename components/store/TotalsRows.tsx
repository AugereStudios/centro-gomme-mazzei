import { SpecRow } from "@/components/ui/Primitives";
import type { CartTotals } from "@/lib/cart/totals";
import { formatEUR } from "@/lib/utils/format";
import type { DeliveryMethod } from "@/types";

/**
 * Righe comuni ai riepiloghi di carrello e checkout: imponibile, sovrapprezzo di
 * montaggio e spedizione. Le etichette restano a carico della pagina, perche' i
 * due contesti chiamano le stesse voci in modo diverso; la regola su quando il
 * montaggio si applica e su come si mostra la spedizione vive solo qui.
 * Le righe aggiuntive (totale nel carrello, IVA in checkout) le aggiunge la pagina.
 */
export function TotalsRows({
  totals,
  method,
  labels,
}: {
  totals: CartTotals;
  method: DeliveryMethod;
  labels: { subtotal: string; mounting: string; mountingOff: string };
}) {
  return (
    <>
      <SpecRow label={labels.subtotal} value={formatEUR(totals.subtotal)} />
      <SpecRow
        label={labels.mounting}
        value={method === "officina" ? formatEUR(totals.mountingTotal) : labels.mountingOff}
        accent={method === "officina"}
      />
      <SpecRow
        label="Spedizione"
        value={
          method === "spedizione"
            ? totals.shipping === 0
              ? "Gratuita"
              : formatEUR(totals.shipping)
            : "Ritiro in officina"
        }
      />
    </>
  );
}
