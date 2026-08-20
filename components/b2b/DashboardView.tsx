"use client";

import { useMemo, useState } from "react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Badge, Eyebrow, Input, Panel, Rule } from "@/components/ui/Primitives";
import { Table, TableWrap, Td, Th } from "@/components/ui/Table";
import { demoB2BOrders } from "@/lib/data/b2b";
import { tyres } from "@/lib/data/tyres";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useB2BStore } from "@/lib/store/b2b-store";
import { formatEUR, formatSizeShort, seasonLabels } from "@/lib/utils/format";

export function DashboardView() {
  const hydrated = useHydrated();
  const session = useB2BStore((s) => s.session);
  const logout = useB2BStore((s) => s.logout);
  const [query, setQuery] = useState("");

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
        <div className="flex max-w-xl flex-col items-start gap-5 border-l-2 border-accent bg-surface p-8">
          <Eyebrow>Sessione non attiva</Eyebrow>
          <h1 className="headline text-2xl">Effettua l&apos;accesso al portale</h1>
          <p className="text-sm leading-relaxed text-fg-2">
            L&apos;area rivenditori e&apos; riservata ai clienti abilitati. L&apos;accesso richiede
            approvazione manuale dell&apos;amministratore.
          </p>
          <ButtonLink href="/b2b/login" size="lg">
            Vai al login
          </ButtonLink>
        </div>
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

      {/* Ricerca rapida */}
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

        <TableWrap>
          <Table>
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
                  </tr>
                );
              })}
              {results.length === 0 ? (
                <tr>
                  <Td colSpan={9} className="py-8 text-center text-fg-3">
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
