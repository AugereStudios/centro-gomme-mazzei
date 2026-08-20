import type { Metadata } from "next";
import { TyreSizeSearch } from "@/components/site/TyreSizeSearch";
import { TyreCard } from "@/components/store/TyreCard";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Rule, SectionHeading } from "@/components/ui/Primitives";
import { MOUNTING_FEE_BY_RADIUS } from "@/lib/config/pricing";
import { tyres } from "@/lib/data/tyres";
import { formatEUR } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Store online",
  description:
    "Acquista pneumatici online e scegli tra spedizione a domicilio e montaggio in officina con bilanciatura elettronica.",
};

const steps = [
  {
    index: "01",
    title: "Cerca la misura",
    text: "Filtra per larghezza, spallamento e raggio, oppure per marca e stagione.",
  },
  {
    index: "02",
    title: "Scegli la consegna",
    text: "Spedizione a domicilio oppure ritiro in officina con montaggio e bilanciatura.",
  },
  {
    index: "03",
    title: "Fissa l'appuntamento",
    text: "Con il montaggio in officina scegli data e fascia oraria in fase di checkout.",
  },
];

export default function StorePage() {
  const evidenza = tyres.filter((t) => t.saleMode === "online").slice(0, 3);
  const feeEntries = Object.entries(MOUNTING_FEE_BY_RADIUS);

  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative flex flex-col gap-8 py-16 lg:py-20">
          <div className="flex flex-col gap-5">
            <Eyebrow>Store online</Eyebrow>
            <Rule />
            <h1 className="headline max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              Compra le gomme online, montale dove sai chi le monta.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-fg-2">
              Lo stesso catalogo che trovi in officina, con la possibilita&apos; di prenotare montaggio e
              bilanciatura elettronica direttamente in fase di acquisto.
            </p>
          </div>
          <TyreSizeSearch />
        </div>
      </section>

      <section className="border-b border-line py-14">
        <div className="container-page hairline-grid grid grid-cols-1 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.index} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
              <span className="eyebrow">{s.index}</span>
              <Rule />
              <h2 className="headline text-lg">{s.title}</h2>
              <p className="text-sm leading-relaxed text-fg-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="In evidenza"
            title="Misure piu' richieste questa settimana"
            lead="Disponibilita' aggiornata sul magazzino di Montella."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evidenza.map((t) => (
              <TyreCard key={t.id} tyre={t} />
            ))}
          </div>
          <ButtonLink href="/store/catalogo" size="lg" className="self-start">
            Vedi tutto il catalogo
          </ButtonLink>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Eyebrow>Listino montaggio</Eyebrow>
            <Rule />
            <h2 className="headline text-2xl sm:text-3xl">
              Il sovrapprezzo dipende solo dal raggio del cerchio
            </h2>
            <p className="text-sm leading-relaxed text-fg-2">
              Prezzo per singolo pneumatico, comprensivo di smontaggio, montaggio, bilanciatura elettronica e
              smaltimento del vecchio pneumatico. Si applica soltanto scegliendo il ritiro in officina.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="hairline-grid grid grid-cols-2 sm:grid-cols-4">
              {feeEntries.map(([radius, fee]) => (
                <div key={radius} className="flex flex-col gap-2 bg-surface p-5">
                  <span className="eyebrow">R{radius}</span>
                  <span className="headline text-xl text-accent">{formatEUR(fee)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-fg-3">
              Valori indicativi del prototipo: verranno sostituiti dal listino definitivo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
