"use client";

import { useMemo, useState } from "react";
import { OrderRequestPanel, type RequestLine } from "@/components/enterprise/OrderRequestPanel";
import { ButtonLink, Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge, Eyebrow, Input, Panel, Rule } from "@/components/ui/Primitives";
import { Table, TableWrap, Td, Th } from "@/components/ui/Table";
import { demoB2BOrders, demoFleetAgreement } from "@/lib/data/b2b";
import { getTyreById, tyres } from "@/lib/data/tyres";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useB2BStore } from "@/lib/store/b2b-store";
import { formatEUR, formatSizeShort, seasonLabels } from "@/lib/utils/format";

export function DashboardView() {
  const hydrated = useHydrated();
  const session = useB2BStore((s) => s.session);
  const logout = useB2BStore((s) => s.logout);
  const [query, setQuery] = useState("");
  /** Selezione della richiesta d'ordine: vive finche' la pagina resta aperta. */
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [requestId, setRequestId] = useState<string | null>(null);

  const requestLines: RequestLine[] = Object.entries(selection)
    .map(([tyreId, qty]) => {
      const tyre = getTyreById(tyreId);
      return tyre ? { tyre, qty } : null;
    })
    .filter((l): l is RequestLine => l !== null);

  function addToRequest(tyreId: string, qty: number) {
    setSelection((current) => ({ ...current, [tyreId]: (current[tyreId] ?? 0) + qty }));
  }

  function setRequestQty(tyreId: string, qty: number) {
    if (qty <= 0) {
      removeFromRequest(tyreId);
      return;
    }
    setSelection((current) => ({ ...current, [tyreId]: qty }));
  }

  function removeFromRequest(tyreId: string) {
    setSelection((current) => {
      const next = { ...current };
      delete next[tyreId];
      return next;
    });
  }

  function submitRequest() {
    setRequestId(`RIC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setSelection({});
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tyres;
    return tyres.filter((t) =>
      [t.ean, t.code, t.brand, t.model, formatSizeShort(t)].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  if (!hydrated) {
    return <div className="container-page py-16 text-sm text-fg-3">Caricamento portale...</div>;
  }

  // Rotta non protetta lato server: nel prototipo la sessione vive solo nel browser.
  if (!session) {
    return (
      <div className="container-page py-16 lg:py-24">
        <EmptyState
          className="max-w-xl border-transparent"
          eyebrow="Sessione non attiva"
          title="Effettua l'accesso al portale"
          description="L'area enterprise e' riservata ai clienti abilitati, flotte e rivenditori. L'accesso richiede approvazione manuale dell'amministratore."
          action={
            <ButtonLink href="/area-enterprise/login" size="lg">
              Vai al login
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const residuo = session.plafond - session.used;
  const usedPct = Math.min(100, Math.round((session.used / session.plafond) * 100));

  return (
    <div className="container-page flex flex-col gap-10 py-10 lg:py-14">
      {/* Sessione attiva */}
      <section className="flex flex-col gap-6 border border-line bg-surface p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-accent" aria-hidden="true" />
            <Eyebrow>Sessione attiva</Eyebrow>
          </div>
          <h1 className="headline text-2xl sm:text-3xl">{session.ragioneSociale}</h1>
          <p className="text-sm text-fg-2">
            {session.referente} — P. IVA {session.partitaIva} — {session.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="accent">Sconto medio {session.scontoMedio}%</Badge>
          <Button variant="outline" onClick={logout}>
            Esci
          </Button>
        </div>
      </section>

      {/* Fido e indicatori */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Panel className="flex flex-col gap-5 p-6 lg:col-span-2 lg:p-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Fido residuo</Eyebrow>
            <Rule />
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="headline text-3xl text-accent">{formatEUR(residuo)}</span>
            <span className="text-sm text-fg-2">
              su un plafond di <span className="font-semibold text-fg">{formatEUR(session.plafond)}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-elevated" role="img" aria-label={`Fido utilizzato ${usedPct}%`}>
            <div className="h-full bg-accent" style={{ width: `${usedPct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-fg-3">
            <span>Utilizzato {formatEUR(session.used)} ({usedPct}%)</span>
            <span>Aggiornato a oggi</span>
          </div>
        </Panel>

        <Panel className="flex flex-col gap-4 p-6 lg:p-8">
          <Eyebrow>Condizioni</Eyebrow>
          <Rule />
          <dl className="flex flex-col">
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-sm text-fg-2">Pagamento</dt>
              <dd className="text-sm font-semibold">RiBa 60 gg</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
              <dt className="text-sm text-fg-2">Trasporto</dt>
              <dd className="text-sm font-semibold">Franco sopra 500 EUR</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="text-sm text-fg-2">Evasione</dt>
              <dd className="text-sm font-semibold">24 / 48 ore</dd>
            </div>
          </dl>
        </Panel>
      </section>

      {/* Convenzione flotta */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 border-b border-line pb-4">
          <Eyebrow>Convenzione attiva</Eyebrow>
          <h2 className="headline text-xl">Accordo flotta {demoFleetAgreement.codice}</h2>
        </div>
        <div className="hairline-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2 bg-surface p-5">
            <span className="eyebrow">Mezzi coperti</span>
            <span className="headline text-2xl">{demoFleetAgreement.mezzi}</span>
            <span className="text-xs text-fg-3">{demoFleetAgreement.tipiMezzo}</span>
          </div>
          <div className="flex flex-col gap-2 bg-surface p-5">
            <span className="eyebrow">Sconto concordato</span>
            <span className="headline text-2xl text-accent">{demoFleetAgreement.scontoConcordato}%</span>
            <span className="text-xs text-fg-3">Fisso per tutta la durata</span>
          </div>
          <div className="flex flex-col gap-2 bg-surface p-5">
            <span className="eyebrow">Validita&apos;</span>
            <span className="headline text-lg">{demoFleetAgreement.validaAl}</span>
            <span className="text-xs text-fg-3">Dal {demoFleetAgreement.validaDal}</span>
          </div>
          <div className="flex flex-col gap-2 bg-surface p-5">
            <span className="eyebrow">In officina</span>
            <span className="text-sm leading-relaxed text-fg-2">
              {demoFleetAgreement.referenteOfficina}
            </span>
          </div>
        </div>
      </section>

      {/* Listino e richiesta d'ordine */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>Ricerca rapida</Eyebrow>
            <h2 className="headline text-xl">Listino netto per EAN, codice o misura</h2>
          </div>
          <div className="w-full sm:max-w-sm">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Es. 3528709876543, MI-PR4, 205/55 R16"
              aria-label="Cerca per EAN, codice o misura"
            />
          </div>
        </div>

        <p className="text-sm text-fg-2">
          <span className="font-semibold text-fg">{results.length}</span> articoli
          {query ? ` per "${query}"` : " a listino"}
        </p>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* min-w-0: senza, la colonna si allarga con la tabella invece di lasciarla scorrere */}
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-8">
        <TableWrap>
          <Table className="min-w-[52rem]">
            <thead>
              <tr>
                <Th>EAN</Th>
                <Th>Codice</Th>
                <Th>Articolo</Th>
                <Th>Misura</Th>
                <Th>Stagione</Th>
                <Th className="text-right">Disp.</Th>
                <Th className="text-right">Listino</Th>
                <Th className="text-right">Netto</Th>
                <Th className="text-right">Sconto</Th>
                <Th className="text-right">Ordina</Th>
              </tr>
            </thead>
            <tbody>
              {results.map((t) => {
                const sconto = t.price > 0 ? Math.round((1 - t.netPrice / t.price) * 100) : null;
                return (
                  <tr key={t.id} className="transition-colors hover:bg-elevated">
                    <Td className="font-mono text-xs text-fg-3">{t.ean}</Td>
                    <Td className="font-mono text-xs text-fg-3">{t.code}</Td>
                    <Td className="text-fg">
                      <span className="font-semibold">{t.brand}</span> {t.model}
                    </Td>
                    <Td>{formatSizeShort(t)}</Td>
                    <Td>{seasonLabels[t.season]}</Td>
                    <Td className={`text-right ${t.stock <= 8 ? "text-accent" : ""}`}>{t.stock}</Td>
                    <Td className="text-right text-fg-3 line-through">
                      {t.price > 0 ? formatEUR(t.price) : "—"}
                    </Td>
                    <Td className="text-right font-semibold text-fg">{formatEUR(t.netPrice)}</Td>
                    <Td className="text-right text-accent">{sconto !== null ? `-${sconto}%` : "—"}</Td>
                    <Td className="text-right">
                      <AddToRequest
                        max={t.stock}
                        onAdd={(qty) => addToRequest(t.id, qty)}
                        label={`${t.brand} ${t.model}`}
                      />
                    </Td>
                  </tr>
                );
              })}
              {results.length === 0 ? (
                <tr>
                  <Td colSpan={10} className="py-8 text-center text-fg-3">
                    Nessun articolo corrisponde alla ricerca.
                  </Td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </TableWrap>
        <p className="text-xs text-fg-3">
          Prezzi netti indicativi, IVA esclusa. Il listino definitivo sara&apos; allineato alla API fornitore.
        </p>
        </div>

          <div className="lg:col-span-4">
            <OrderRequestPanel
              lines={requestLines}
              residuoAttuale={residuo}
              onSetQty={setRequestQty}
              onRemove={removeFromRequest}
              onSubmit={submitRequest}
              requestId={requestId}
              onReset={() => setRequestId(null)}
            />
          </div>
        </div>
      </section>

      {/* Ultimi ordini */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 border-b border-line pb-4">
          <Eyebrow>Ultimi ordini</Eyebrow>
          <h2 className="headline text-xl">Movimenti recenti</h2>
        </div>
        <TableWrap>
          <Table className="min-w-[36rem]">
            <thead>
              <tr>
                <Th>Ordine</Th>
                <Th>Data</Th>
                <Th className="text-right">Articoli</Th>
                <Th className="text-right">Imponibile</Th>
                <Th>Stato</Th>
              </tr>
            </thead>
            <tbody>
              {demoB2BOrders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-elevated">
                  <Td className="font-mono text-xs text-fg">{o.id}</Td>
                  <Td>{o.date}</Td>
                  <Td className="text-right">{o.articoli}</Td>
                  <Td className="text-right font-semibold text-fg">{formatEUR(o.imponibile)}</Td>
                  <Td>
                    <Badge tone={o.stato === "Evaso" ? "neutral" : "accent"}>{o.stato}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </section>
    </div>
  );
}

/**
 * Controllo di riga del listino: quantita' e aggiunta alla richiesta.
 * Parte da 4 perche' nel canale si ragiona a treno di gomme.
 */
function AddToRequest({
  max,
  onAdd,
  label,
}: {
  max: number;
  onAdd: (qty: number) => void;
  label: string;
}) {
  const [qty, setQty] = useState(4);

  return (
    <span className="flex items-center justify-end gap-2">
      <input
        type="number"
        min={1}
        max={max}
        value={qty}
        aria-label={`Quantita' ${label}`}
        onChange={(e) => setQty(Math.min(Math.max(Number(e.target.value) || 1, 1), max))}
        className="w-14 border border-line bg-ink px-2 py-1.5 text-center text-sm text-fg [appearance:textfield] focus:border-accent focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => onAdd(qty)}
        aria-label={`Aggiungi ${label} alla richiesta`}
        className="border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
      >
        Aggiungi
      </button>
    </span>
  );
}
