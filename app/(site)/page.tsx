import Link from "next/link";
import { OpenStatus } from "@/components/site/OpenStatus";
import { TyreSizeSearch } from "@/components/site/TyreSizeSearch";
import { ButtonLink } from "@/components/ui/Button";
import { BulletList, Eyebrow, Rule, SectionHeading } from "@/components/ui/Primitives";
import { site } from "@/lib/config/site";
import { services } from "@/lib/data/services";
import { vehicleCategories } from "@/lib/data/vehicles";

const numbers = [
  { value: "R15 — R22", label: "Misure a magazzino" },
  { value: "3D", label: "Assetto computerizzato" },
  { value: "24h", label: "Tempi di consegna" },
  { value: "1998", label: "Anno di fondazione" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow>
              Centro gomme — {site.address.city} ({site.address.province})
            </Eyebrow>
            <Rule />
            <h1 className="headline text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Pneumatici, assetto e assistenza tecnica per ogni mezzo che lavora.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-fg-2">
              Auto, autocarri, mezzi agricoli e industriali. Vendita, montaggio e servizi di officina con
              attrezzatura professionale, in un unico punto a {site.address.street}.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/store/catalogo" size="lg">
                Vai allo store
              </ButtonLink>
              <ButtonLink href="/servizi" variant="outline" size="lg">
                Servizi di officina
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between border border-line bg-surface p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>Officina</Eyebrow>
                <p className="text-sm leading-relaxed text-fg-2">
                  Interventi su appuntamento e accettazione diretta. Per flotte e mezzi da lavoro concordiamo
                  fermo macchina e orario.
                </p>
              </div>
              {/* Orari e recapiti stanno nella scheda officina del footer: qui basta lo stato corrente. */}
              <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6">
                <OpenStatus />
                <ButtonLink href="/contatti" variant="outline" className="self-start">
                  Orari e contatti
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ricerca per misura */}
      <section className="border-b border-line py-16 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="Ricerca per misura"
            title="Trova la gomma giusta partendo dal fianco del pneumatico"
            lead="La misura si legge sul fianco: larghezza, spallamento e raggio. Esempio: 205/55 R16."
          />
          <TyreSizeSearch />
        </div>
      </section>

      {/* Griglia veicoli */}
      <section className="border-b border-line py-16 lg:py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading
            eyebrow="Settori"
            title="Quattro linee di prodotto, una sola officina"
            lead="Dalla citycar al trattore: gestiamo misure, disponibilita' e montaggio con la stessa attrezzatura professionale."
          />

          <div className="hairline-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group flex flex-col gap-5 bg-surface p-6 transition-colors hover:bg-elevated lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{cat.index}</span>
                  <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
                </div>
                <Rule />
                <h3 className="headline text-xl">{cat.title}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{cat.description}</p>
                <BulletList items={cat.points} className="mt-auto pt-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Numeri */}
      <section className="border-b border-line bg-surface py-12">
        <div className="container-page grid grid-cols-2 gap-8 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} className="flex flex-col gap-2 border-l-2 border-accent pl-4">
              <span className="headline text-2xl lg:text-3xl">{n.value}</span>
              <span className="eyebrow">{n.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Servizi */}
      <section className="border-b border-line py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Servizi"
              title="Il lavoro che si vede dopo mille chilometri"
              lead="Assetto, equilibratura e conservazione: le lavorazioni che allungano la vita del battistrada."
            />
            <ButtonLink href="/servizi" variant="outline" className="mt-8">
              Tutti i servizi
            </ButtonLink>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col border-t border-line">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/servizi"
                    className="group flex flex-col gap-3 border-b border-line py-6 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="eyebrow w-10 shrink-0">{s.index}</span>
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="text-lg font-bold tracking-[-0.02em] group-hover:text-accent">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-fg-2">{s.lead}</p>
                    </div>
                    <span className="eyebrow shrink-0 text-fg-3">{s.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA prenotazione — sede, orari e mappa vivono nel footer: qui solo le azioni. */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 border border-line bg-surface p-8 lg:flex-row lg:items-center lg:p-12">
            <div className="flex max-w-xl flex-col gap-4">
              <Eyebrow>Prenota</Eyebrow>
              <Rule />
              <h2 className="headline text-2xl sm:text-3xl">
                Fissa l&apos;intervento e trova il lavoro gia&apos; pronto.
              </h2>
              <p className="text-sm leading-relaxed text-fg-2">
                Concordiamo orario e fermo macchina, prepariamo in anticipo le gomme della misura richiesta.
                Per flotte e mezzi da lavoro organizziamo l&apos;intervento fuori dalle ore di punta.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.phone.href}
                className="bg-accent px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:bg-accent-strong"
              >
                Chiama {site.phone.label}
              </a>
              <ButtonLink href="/contatti" variant="outline" size="lg">
                Scrivici
              </ButtonLink>
              <ButtonLink href="/store/catalogo" variant="outline" size="lg">
                Apri il catalogo
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
