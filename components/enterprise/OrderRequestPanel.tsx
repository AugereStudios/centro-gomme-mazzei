"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Eyebrow, Panel, Rule, SpecRow } from "@/components/ui/Primitives";
import { Stepper } from "@/components/ui/Stepper";
import { formatEUR, formatSizeShort } from "@/lib/utils/format";
import type { Tyre } from "@/types";

export interface RequestLine {
  tyre: Tyre;
  qty: number;
}

/**
 * Richiesta d'ordine del canale B2B: non e' un carrello.
 * Nessun pagamento e nessuna persistenza — la selezione vive finche' la pagina
 * resta aperta, poi si invia la richiesta e l'officina conferma.
 */
export function OrderRequestPanel({
  lines,
  residuoAttuale,
  onSetQty,
  onRemove,
  onSubmit,
  requestId,
  onReset,
}: {
  lines: RequestLine[];
  /** Fido ancora disponibile prima di questa richiesta. */
  residuoAttuale: number;
  onSetQty: (tyreId: string, qty: number) => void;
  onRemove: (tyreId: string) => void;
  onSubmit: () => void;
  requestId: string | null;
  onReset: () => void;
}) {
  if (requestId) {
    return (
      <Panel className="flex flex-col gap-5 p-6 lg:p-8">
        <Eyebrow>Richiesta inviata</Eyebrow>
        <Rule />
        <p className="headline text-2xl">{requestId}</p>
        <p className="text-sm leading-relaxed text-fg-2">
          Nel prototipo non parte nessuna comunicazione. Nella versione definitiva la richiesta arriva in
          officina, che risponde con la conferma d&apos;ordine e i tempi di evasione.
        </p>
        <Button variant="outline" onClick={onReset} className="self-start">
          Nuova richiesta
        </Button>
      </Panel>
    );
  }

  const pezzi = lines.reduce((sum, l) => sum + l.qty, 0);
  const imponibile = lines.reduce((sum, l) => sum + l.tyre.netPrice * l.qty, 0);
  const residuoDopo = residuoAttuale - imponibile;
  const oltreFido = residuoDopo < 0;

  return (
    <Panel className="flex flex-col gap-6 p-6 lg:sticky lg:top-24 lg:p-8">
      <div className="flex flex-col gap-3">
        <Eyebrow>Richiesta d&apos;ordine</Eyebrow>
        <Rule />
      </div>

      {lines.length === 0 ? (
        <EmptyState
          level={2}
          className="border-none bg-transparent p-0"
          title="Nessun articolo selezionato"
          description="Aggiungi articoli dal listino: qui vedi imponibile netto e impatto sul fido prima di inviare."
        />
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {lines.map(({ tyre, qty }) => (
              <li key={tyre.id} className="flex flex-col gap-2 border-b border-line pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-fg">
                      {tyre.brand} {tyre.model}
                    </span>
                    <span className="text-xs text-fg-3">
                      {formatSizeShort(tyre)} — {formatEUR(tyre.netPrice)} netti
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold">
                    {formatEUR(tyre.netPrice * qty)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Stepper value={qty} onChange={(next) => onSetQty(tyre.id, next)} max={tyre.stock} />
                  <button
                    type="button"
                    onClick={() => onRemove(tyre.id)}
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 transition-colors hover:text-accent"
                  >
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col">
            <SpecRow label="Pezzi" value={String(pezzi)} />
            <SpecRow label="Imponibile netto" value={formatEUR(imponibile)} strong />
            <SpecRow label="Fido disponibile" value={formatEUR(residuoAttuale)} />
            <SpecRow
              label="Fido dopo la richiesta"
              value={formatEUR(residuoDopo)}
              accent={oltreFido}
              strong
            />
          </div>

          {oltreFido ? (
            <p className="border-l-2 border-accent bg-ink p-4 text-xs leading-relaxed text-fg-2">
              La richiesta supera il fido residuo di {formatEUR(Math.abs(residuoDopo))}. Puoi inviarla lo
              stesso: l&apos;officina valutera&apos; un&apos;estensione o una consegna parziale.
            </p>
          ) : null}

          <p className="text-xs leading-relaxed text-fg-3">
            Importi IVA esclusa. L&apos;invio non impegna il fido: la conferma d&apos;ordine arriva
            dall&apos;officina.
          </p>

          <Button size="lg" className="w-full" onClick={onSubmit}>
            Invia richiesta d&apos;ordine
          </Button>
        </>
      )}
    </Panel>
  );
}
