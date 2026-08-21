import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TyreCard } from "@/components/store/TyreCard";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, BulletList, Eyebrow, Panel, Rule, SectionHeading, SpecRow } from "@/components/ui/Primitives";
import { brands, getBrandBySlug, getBrandStats, getBrandTyres, segmentLabels } from "@/lib/data/brands";
import { vehicleLabels } from "@/lib/data/vehicles";
import { site } from "@/lib/config/site";
import { formatEUR, formatSizeShort, seasonLabels } from "@/lib/utils/format";

export function generateStaticParams() {
  return brands.map((b) => ({ marca: b.slug }));
}

export async function generateMetadata(props: PageProps<"/prodotti/[marca]">): Promise<Metadata> {
  const { marca } = await props.params;
  const brand = getBrandBySlug(marca);
  if (!brand) return { title: "Marchio non trovato" };
  return {
    title: `Pneumatici ${brand.name}`,
    description: `${brand.name} al Centro Gomme Mazzei di ${site.address.city}: misure a catalogo, disponibilita' e montaggio in officina.`,
  };
}

export default async function BrandPage(props: PageProps<"/prodotti/[marca]">) {
  const { marca } = await props.params;
  const brand = getBrandBySlug(marca);
  if (!brand) notFound();

  const stats = getBrandStats(brand.name);
  const items = getBrandTyres(brand.name);
  const misure = Array.from(new Set(items.map((t) => formatSizeShort(t)))).sort();

  return (
    <>
      <div className="border-b border-line">
        <nav className="container-page flex flex-wrap items-center gap-2 py-4 text-[11px] uppercase tracking-[0.15em] text-fg-3">
          <Link href="/prodotti" className="hover:text-accent">
            Prodotti
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-2">{brand.name}</span>
        </nav>
      </div>

      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={brand.segment === "premium" ? "accent" : "neutral"}>
                {segmentLabels[brand.segment]}
              </Badge>
              <Badge>{brand.origin}</Badge>
            </div>
            <SectionHeading
              gap={5}
              level={1}
              title={`Pneumatici ${brand.name}`}
              titleClassName="text-4xl leading-[1.08] sm:text-5xl"
              lead={brand.positioning}
              leadClassName="max-w-xl text-base leading-relaxed text-fg-2"
            />
            <BulletList items={brand.specialties} className="max-w-lg" />
          </div>

          <div className="lg:col-span-5">
            <Panel className="flex h-full flex-col gap-5 p-6 lg:p-8">
              <Eyebrow>Cosa teniamo di {brand.name}</Eyebrow>
              <Rule />
              <div className="flex flex-col">
                <SpecRow label="Articoli a catalogo" value={String(stats.articoli)} strong />
                <SpecRow label="Acquistabili online" value={String(stats.online)} />
                <SpecRow label="Su preventivo" value={String(stats.suPreventivo)} />
                <SpecRow label="Raggi" value={`R${stats.radiusMin} — R${stats.radiusMax}`} />
                <SpecRow
                  label="Settori"
                  value={stats.vehicleClasses.map((c) => vehicleLabels[c]).join(", ")}
                />
                <SpecRow label="Stagioni" value={stats.seasons.map((s) => seasonLabels[s]).join(", ")} />
                <SpecRow label="Pezzi a magazzino" value={String(stats.disponibilita)} />
                <SpecRow
                  label="Prezzo da"
                  value={stats.prezzoDa !== null ? formatEUR(stats.prezzoDa) : "Su preventivo"}
                  accent
                  strong
                />
              </div>
              <ButtonLink
                href={`/store/catalogo?marca=${encodeURIComponent(brand.name)}`}
                size="lg"
                className="mt-auto w-full"
              >
                Vedi nel catalogo
              </ButtonLink>
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="Misure trattate"
            title={`Le misure ${brand.name} che passano dall'officina`}
            titleClassName="text-2xl sm:text-3xl"
          />
          <ul className="flex flex-wrap gap-2">
            {misure.map((m) => (
              <li
                key={m}
                className="rounded-sq border border-line bg-surface px-3 py-2 text-sm text-fg-2"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="A catalogo"
            title={`${items.length} articoli ${brand.name}`}
            titleClassName="text-2xl sm:text-3xl"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <TyreCard key={t.id} tyre={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="Altri marchi"
            title="Continua a sfogliare"
            titleClassName="text-2xl"
          />
          <ul className="flex flex-wrap gap-2">
            {brands
              .filter((b) => b.slug !== brand.slug)
              .map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/prodotti/${b.slug}`}
                    className="inline-block border border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
