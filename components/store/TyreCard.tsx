import Link from "next/link";
import { TyreVisual } from "@/components/store/TyreVisual";
import { Badge } from "@/components/ui/Primitives";
import { getMountingFee } from "@/lib/config/pricing";
import { formatEUR, formatSize, formatSizeShort, seasonLabels } from "@/lib/utils/format";
import type { Tyre } from "@/types";

export function TyreCard({ tyre }: { tyre: Tyre }) {
  const online = tyre.saleMode === "online";

  return (
    <article className="group flex flex-col border border-line bg-surface transition-colors hover:border-fg-3">
      <TyreVisual size={formatSizeShort(tyre)} className="aspect-4/3 border-b border-line" />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{seasonLabels[tyre.season]}</Badge>
          {tyre.runflat ? <Badge>Run-flat</Badge> : null}
          {!online ? <Badge tone="muted">Su preventivo</Badge> : null}
        </div>

        <div className="flex flex-col gap-1">
          <p className="eyebrow">{tyre.brand}</p>
          <h3 className="headline text-lg leading-tight">{tyre.model}</h3>
          <p className="text-sm text-fg-2">{formatSize(tyre)}</p>
        </div>

        <dl className="flex flex-col border-t border-line pt-3 text-xs text-fg-3">
          <div className="flex justify-between py-1">
            <dt>Etichetta UE</dt>
            <dd className="text-fg-2">
              {tyre.label.fuel} / {tyre.label.wet} {tyre.label.noise > 0 ? `/ ${tyre.label.noise} dB` : ""}
            </dd>
          </div>
          <div className="flex justify-between py-1">
            <dt>Disponibilita&apos;</dt>
            <dd className={tyre.stock > 8 ? "text-fg-2" : "text-accent"}>{tyre.stock} pz</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div className="flex flex-col">
            {online ? (
              <>
                <span className="headline text-xl">{formatEUR(tyre.price)}</span>
                <span className="text-[11px] text-fg-3">
                  + {formatEUR(getMountingFee(tyre.radius))} montaggio
                </span>
              </>
            ) : (
              <>
                <span className="headline text-lg">Su preventivo</span>
                <span className="text-[11px] text-fg-3">Misura fuori standard</span>
              </>
            )}
          </div>
          <Link
            href={`/store/pneu/${tyre.id}`}
            className="bg-accent px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:bg-accent-strong"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </article>
  );
}
