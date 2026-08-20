import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/store/AddToCartPanel";
import { TyreCard } from "@/components/store/TyreCard";
import { TyreVisual } from "@/components/store/TyreVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Eyebrow, Panel, Rule, SpecRow } from "@/components/ui/Primitives";
import { site } from "@/lib/config/site";
import { getTyreById, tyres } from "@/lib/data/tyres";
import { vehicleLabels } from "@/lib/data/vehicles";
import { formatEUR, formatSize, formatSizeShort, seasonLabels } from "@/lib/utils/format";

export function generateStaticParams() {
  return tyres.map((t) => ({ id: t.id }));
}

export async function generateMetadata(props: PageProps<"/store/pneu/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const tyre = getTyreById(id);
  if (!tyre) return { title: "Articolo non trovato" };
  return {
    title: `${tyre.brand} ${tyre.model} ${formatSizeShort(tyre)}`,
    description: `${tyre.brand} ${tyre.model} ${formatSize(tyre)} — ${seasonLabels[tyre.season]}. Disponibile con montaggio e bilanciatura elettronica in officina.`,
  };
}

export default async function TyreDetailPage(props: PageProps<"/store/pneu/[id]">) {
  const { id } = await props.params;
  const tyre = getTyreById(id);
  if (!tyre) notFound();

  const online = tyre.saleMode === "online";
  const correlati = tyres
    .filter((t) => t.id !== tyre.id && t.vehicleClass === tyre.vehicleClass)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line">
        <nav className="container-page flex flex-wrap items-center gap-2 py-4 text-[11px] uppercase tracking-[0.15em] text-fg-3">
          <Link href="/store/catalogo" className="hover:text-accent">
            Catalogo
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/store/catalogo?veicolo=${tyre.vehicleClass}`} className="hover:text-accent">
            {vehicleLabels[tyre.vehicleClass]}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-2">
            {tyre.brand} {tyre.model}
          </span>
        </nav>
      </div>

      <section className="border-b border-line py-10 lg:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Colonna sinistra: visual + specifiche */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{seasonLabels[tyre.season]}</Badge>
                <Badge>{vehicleLabels[tyre.vehicleClass]}</Badge>
                {tyre.runflat ? <Badge>Run-flat</Badge> : null}
                {!online ? <Badge tone="muted">Su preventivo</Badge> : null}
              </div>
              <Eyebrow>{tyre.brand}</Eyebrow>
              <h1 className="headline text-3xl leading-tight sm:text-4xl">{tyre.model}</h1>
              <p className="text-lg text-fg-2">{formatSize(tyre)}</p>
              {tyre.notes ? <p className="max-w-xl text-sm leading-relaxed text-fg-3">{tyre.notes}</p> : null}
            </div>

            <TyreVisual size={formatSizeShort(tyre)} className="aspect-video border border-line" />

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <Eyebrow>Scheda tecnica</Eyebrow>
                <Rule />
                <div className="flex flex-col">
                  <SpecRow label="Larghezza" value={`${tyre.width} mm`} />
                  <SpecRow label="Spallamento" value={tyre.profile > 0 ? `${tyre.profile} %` : "—"} />
                  <SpecRow label="Raggio" value={`R${tyre.radius}`} strong />
                  <SpecRow label="Indice di carico" value={tyre.loadIndex} />
                  <SpecRow label="Codice velocita'" value={tyre.speedRating} />
                  <SpecRow label="Run-flat" value={tyre.runflat ? "Si" : "No"} />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Eyebrow>Etichetta UE e logistica</Eyebrow>
                <Rule />
                <div className="flex flex-col">
                  <SpecRow label="Efficienza carburante" value={tyre.label.fuel} />
                  <SpecRow label="Aderenza sul bagnato" value={tyre.label.wet} />
                  <SpecRow
                    label="Rumorosita'"
                    value={tyre.label.noise > 0 ? `${tyre.label.noise} dB` : "—"}
                  />
                  <SpecRow label="EAN" value={tyre.ean} />
                  <SpecRow label="Codice articolo" value={tyre.code} />
                  <SpecRow
                    label="Disponibilita'"
                    value={`${tyre.stock} pz a magazzino`}
                    accent={tyre.stock <= 8}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colonna destra: acquisto */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="flex flex-col gap-2 border-l-2 border-accent pl-4">
                {online ? (
                  <>
                    <span className="headline text-3xl">{formatEUR(tyre.price)}</span>
                    <span className="text-xs text-fg-3">IVA inclusa, per singolo pneumatico</span>
                  </>
                ) : (
                  <>
                    <span className="headline text-2xl">Su preventivo</span>
                    <span className="text-xs text-fg-3">Misura fuori standard: prezzo su richiesta</span>
                  </>
                )}
              </div>

              {online ? (
                <AddToCartPanel tyre={tyre} />
              ) : (
                <Panel className="flex flex-col gap-5 p-6 lg:p-8">
                  <Eyebrow>Articolo non acquistabile online</Eyebrow>
                  <Rule />
                  <p className="text-sm leading-relaxed text-fg-2">
                    Le misure per mezzi agricoli e industriali richiedono verifica di disponibilita&apos; e un
                    intervento programmato in officina. Contattaci per un preventivo con montaggio.
                  </p>
                  <div className="flex flex-col gap-3">
                    <ButtonLink href="/contatti" size="lg" className="w-full">
                      Richiedi preventivo
                    </ButtonLink>
                    <a
                      href={site.phone.href}
                      className="w-full border border-line px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
                    >
                      {site.phone.label}
                    </a>
                  </div>
                </Panel>
              )}
            </div>
          </div>
        </div>
      </section>

      {correlati.length > 0 ? (
        <section className="py-14 lg:py-20">
          <div className="container-page flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Eyebrow>Alternative</Eyebrow>
              <Rule />
              <h2 className="headline text-2xl">Altri articoli per {vehicleLabels[tyre.vehicleClass].toLowerCase()}</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {correlati.map((t) => (
                <TyreCard key={t.id} tyre={t} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
