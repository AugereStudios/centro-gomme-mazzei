"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Rule, SpecRow } from "@/components/ui/Primitives";
import { Stepper } from "@/components/ui/Stepper";
import { getMountingFee, MOUNTING_INCLUDES } from "@/lib/config/pricing";
import { useCartStore } from "@/lib/store/cart-store";
import { formatEUR } from "@/lib/utils/format";
import type { Tyre } from "@/types";

export function AddToCartPanel({ tyre }: { tyre: Tyre }) {
  const router = useRouter();
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(tyre.vehicleClass === "auto" ? 4 : 2);
  const [workshop, setWorkshop] = useState(true);

  const fee = getMountingFee(tyre.radius);
  const tyresTotal = tyre.price * qty;
  const mountingTotal = workshop ? fee * qty : 0;

  function handleAdd() {
    add(tyre.id, qty, workshop);
    router.push("/store/carrello");
  }

  return (
    <div className="flex flex-col gap-6 border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-col gap-3">
        <Eyebrow>Configura l&apos;acquisto</Eyebrow>
        <Rule />
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">Quantita&apos;</span>
        <Stepper value={qty} onChange={setQty} min={1} max={tyre.stock} />
      </div>

      {/* Opzione servizio: montaggio + bilanciatura elettronica, prezzo per raggio */}
      <label className="flex cursor-pointer gap-3 border border-line bg-ink p-4 transition-colors hover:border-fg-3">
        <input
          type="checkbox"
          checked={workshop}
          onChange={(e) => setWorkshop(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
        />
        <span className="flex flex-col gap-2">
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold">Montaggio in officina + bilanciatura elettronica</span>
            <span className="text-sm font-bold text-accent">
              +{formatEUR(fee)} <span className="text-fg-3">a pneumatico</span>
            </span>
          </span>
          <span className="text-xs leading-relaxed text-fg-2">
            Sovrapprezzo calcolato sul raggio R{tyre.radius}. Comprende:
          </span>
          <span className="flex flex-col gap-1.5">
            {MOUNTING_INCLUDES.map((item) => (
              <span key={item} className="bullet-accent text-xs text-fg-3">
                {item}
              </span>
            ))}
          </span>
        </span>
      </label>

      <div className="flex flex-col">
        <SpecRow label={`Pneumatici x ${qty}`} value={formatEUR(tyresTotal)} />
        <SpecRow
          label="Montaggio + bilanciatura"
          value={workshop ? formatEUR(mountingTotal) : "Non incluso"}
          accent={workshop}
        />
        <SpecRow label="Totale" value={formatEUR(tyresTotal + mountingTotal)} strong />
      </div>

      <Button size="lg" className="w-full" onClick={handleAdd}>
        Aggiungi al carrello
      </Button>

      <p className="text-xs leading-relaxed text-fg-3">
        Potrai cambiare modalita&apos; di consegna in fase di checkout: scegliendo la spedizione a domicilio il
        sovrapprezzo di montaggio non viene applicato.
      </p>
    </div>
  );
}
