"use client";

import Link from "next/link";
import { TyreVisual } from "@/components/store/TyreVisual";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge, Eyebrow, Panel, Rule, SpecRow } from "@/components/ui/Primitives";
import { Stepper } from "@/components/ui/Stepper";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/config/pricing";
import { computeTotals } from "@/lib/cart/totals";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartStore } from "@/lib/store/cart-store";
import { formatEUR, formatSize, formatSizeShort, seasonLabels } from "@/lib/utils/format";

export function CartView() {
  const hydrated = useHydrated();
  const lines = useCartStore((s) => s.lines);
  const deliveryMethod = useCartStore((s) => s.deliveryMethod);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  if (!hydrated) {
    return <div className="container-page py-16 text-sm text-fg-3">Caricamento carrello...</div>;
  }

  const totals = computeTotals(lines, deliveryMethod);

  if (totals.items.length === 0) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="flex max-w-xl flex-col items-start gap-5 border border-line bg-surface p-8 lg:p-10">
          <Rule />
          <h1 className="headline text-2xl">Il carrello e&apos; vuoto</h1>
          <p className="text-sm leading-relaxed text-fg-2">
            Cerca la misura sul fianco del pneumatico e aggiungi gli articoli al carrello: potrai scegliere tra
            spedizione a domicilio e montaggio in officina.
          </p>
          <ButtonLink href="/store/catalogo" size="lg">
            Vai al catalogo
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
      <section className="flex flex-col gap-6 lg:col-span-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h1 className="headline text-2xl">
            Carrello <span className="text-fg-3">({totals.itemCount} pz)</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={clear}>
            Svuota
          </Button>
        </div>

        <ul className="flex flex-col gap-4">
          {totals.items.map(({ tyre, qty, lineTotal, mountingFee }) => (
            <li key={tyre.id} className="flex flex-col gap-5 border border-line bg-surface p-4 sm:flex-row sm:p-5">
              <TyreVisual size={formatSizeShort(tyre)} className="h-32 w-full border border-line sm:w-40" />

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <Eyebrow>{tyre.brand}</Eyebrow>
                    <Link href={`/store/pneu/${tyre.id}`} className="text-lg font-bold tracking-[-0.02em] hover:text-accent">
                      {tyre.model}
                    </Link>
                    <p className="text-sm text-fg-2">{formatSize(tyre)}</p>
                  </div>
                  <Badge tone="accent">{seasonLabels[tyre.season]}</Badge>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-line pt-3">
                  <div className="flex items-center gap-4">
                    <Stepper value={qty} onChange={(next) => setQty(tyre.id, next)} max={tyre.stock} />
                    <button
                      type="button"
                      onClick={() => remove(tyre.id)}
                      className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 transition-colors hover:text-accent"
                    >
                      Rimuovi
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="headline text-lg">{formatEUR(lineTotal)}</p>
                    <p className="text-[11px] text-fg-3">
                      {formatEUR(tyre.price)} x {qty} — montaggio {formatEUR(mountingFee)}/pz
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ButtonLink href="/store/catalogo" variant="outline" className="self-start">
          Continua lo shopping
        </ButtonLink>
      </section>

      <aside className="lg:col-span-4">
        <Panel className="flex flex-col gap-6 p-6 lg:sticky lg:top-24 lg:p-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Riepilogo</Eyebrow>
            <Rule />
          </div>

          <div className="flex flex-col">
            <SpecRow label="Pneumatici" value={formatEUR(totals.subtotal)} />
            <SpecRow
              label="Montaggio"
              value={deliveryMethod === "officina" ? formatEUR(totals.mountingTotal) : "Da definire"}
              accent={deliveryMethod === "officina"}
            />
            <SpecRow
              label="Spedizione"
              value={
                deliveryMethod === "spedizione"
                  ? totals.shipping === 0
                    ? "Gratuita"
                    : formatEUR(totals.shipping)
                  : "Ritiro in officina"
              }
            />
            <SpecRow label="Totale" value={formatEUR(totals.total)} strong />
          </div>

          <p className="text-xs leading-relaxed text-fg-3">
            {deliveryMethod === "spedizione" && totals.shipping > 0
              ? `Spedizione gratuita oltre ${formatEUR(FREE_SHIPPING_THRESHOLD)} di pneumatici.`
              : "La modalita' di consegna e il relativo costo si confermano in checkout."}
          </p>

          <ButtonLink href="/store/checkout" size="lg" className="w-full">
            Vai al checkout
          </ButtonLink>
        </Panel>
      </aside>
    </div>
  );
}
