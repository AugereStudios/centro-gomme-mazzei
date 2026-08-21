import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Rule, SectionHeading, SpecRow } from "@/components/ui/Primitives";
import { brands, getBrandStats, getCatalogOverview, segmentLabels } from "@/lib/data/brands";
import { vehicleLabels } from "@/lib/data/vehicles";
import { formatEUR, seasonLabels } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Marchi trattati",
  description:
    "I marchi di pneumatici trattati dal Centro Gomme Mazzei: premium, qualita' e specialisti dell'agricolo e dell'industriale, con misure e disponibilita'.",
};

export default function ProdottiPage() {
  const overview = getCatalogOverview();

  const numeri = [
    { value: String(overview.marchi), label: "Marchi trattati" },
    { value: `R${overview.radiusMin} — R${overview.radiusMax}`, label: "Raggi a catalogo" },
    { value: String(overview.classi), label: "Classi di veicolo" },
    { value: String(overview.articoli), label: "Articoli disponibili" },
  ];

  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative flex flex-col gap-10 py-16 lg:py-20">
          <SectionHeading
            gap={6}
            level={1}
            eyebrow="Prodotti"
            title="I marchi che passano dalla nostra officina."
            titleClassName="max-w-3xl text-4xl leading-[1.08] sm:text-5xl"
            lead="Dalle premium per l'uso quotidiano agli specialisti dell'agricolo e dell'industriale. Ogni scheda riporta misure, stagioni e disponibilita' aggiornate sul magazzino di Montella."
            leadClassName="max-w-2xl text-base leading-relaxed text-fg-2"
          />

          <dl className="hairline-grid grid grid-cols-2 lg:grid-cols-4">
            {numeri.map((n) => (
              <div key={n.label} className="flex flex-col gap-2 bg-surface p-5 lg:p-6">
                <dt className="eyebrow">{n.label}</dt>
                <dd className="headline text-2xl">{n.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading
            eyebrow="Catalogo marchi"
            title="Quattordici marchi, quattro settori"
            titleClassName="text-2xl sm:text-3xl"
            lead="I dati di ogni scheda sono ricavati dal catalogo: cambiano quando cambia il magazzino."
            leadClassName="max-w-2xl text-sm leading-relaxed text-fg-2"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => {
              const stats = getBrandStats(brand.name);
              return (
                <article
                  key={brand.slug}
                  className="group flex flex-col gap-5 border border-line bg-surface p-6 transition-colors hover:border-fg-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-3">
                      <Rule />
                      <h3 className="headline text-2xl">{brand.name}</h3>
                    </div>
                    <Badge tone={brand.segment === "premium" ? "accent" : "neutral"}>
                      {segmentLabels[brand.segment]}
                    </Badge>
                  </div>

                  <p className="text-sm leading-relaxed text-fg-2">{brand.positioning}</p>

                  <div className="mt-auto flex flex-col">
                    <SpecRow label="Articoli" value={`${stats.articoli} a catalogo`} />
                    <SpecRow label="Raggi" value={`R${stats.radiusMin} — R${stats.radiusMax}`} />
                    <SpecRow
                      label="Settori"
                      value={stats.vehicleClasses.map((c) => vehicleLabels[c].split(" ")[0]).join(", ")}
                    />
                    <SpecRow
                      label="Da"
                      value={stats.prezzoDa !== null ? formatEUR(stats.prezzoDa) : "Su preventivo"}
                      accent
                      strong
                    />
                  </div>

                  <Link
                    href={`/prodotti/${brand.slug}`}
                    className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors group-hover:text-accent"
                  >
                    Scheda {brand.name}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-page flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Non trovi il tuo marchio?"
            title="Ordiniamo anche fuori catalogo"
            titleClassName="text-2xl sm:text-3xl"
            lead={`A magazzino teniamo le misure piu' richieste, dalle ${seasonLabels.estive.toLowerCase()} alle ${seasonLabels.invernali.toLowerCase()}. Per tutto il resto si ordina: dicci misura e mezzo, verifichiamo tempi e prezzo.`}
            leadClassName="max-w-2xl text-sm leading-relaxed text-fg-2"
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/store/catalogo" size="lg">
              Sfoglia il catalogo
            </ButtonLink>
            <ButtonLink href="/contatti" variant="outline" size="lg">
              Chiedi un preventivo
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
