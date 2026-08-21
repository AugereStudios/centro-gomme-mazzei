import type { Metadata } from "next";
import Image from "next/image";
import lockup from "@/public/brand/mazzei-lockup.png";
import { ButtonLink } from "@/components/ui/Button";
import { BulletList, Panel, Rule, SectionHeading, SpecRow } from "@/components/ui/Primitives";
import { addressLine, site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: `Centro Gomme Mazzei: officina specializzata in pneumatici e assetto a ${site.address.city} (${site.address.province}).`,
};

/*
 * PLACEHOLDER — profilo aziendale da confermare con il cliente.
 * Storia, numeri, attrezzatura e certificazioni qui sotto sono plausibili ma
 * inventati: l'unico dato reale e' l'anno 1998, gia' presente in site.claim.
 */
const profilo = {
  lead: "Un'officina di paese che lavora come una struttura di citta': attrezzatura elettronica, procedure documentate e un magazzino tenuto sulle misure che servono davvero da queste parti.",
  body: "Il Centro Gomme Mazzei nasce come gommista di quartiere e negli anni si e' attrezzato per seguire chi lavora: furgoni delle imprese locali, trattrici delle aziende agricole dell'Alta Irpinia, mezzi di cantiere. Oggi affianca al banco tradizionale un catalogo online, senza cambiare il modo di lavorare: si guarda il mezzo, si ascolta come viene usato, poi si sceglie la gomma.",
};

const percorso = [
  {
    index: "01",
    anno: "1998",
    title: "L'apertura",
    text: "L'attivita' parte come gommista di paese, con lavorazioni su auto e piccoli commerciali.",
  },
  {
    index: "02",
    anno: "Anni 2000",
    title: "I mezzi da lavoro",
    text: "Arrivano le prime attrezzature per agricolo e industriale, per seguire le aziende del territorio.",
  },
  {
    index: "03",
    anno: "Anni 2010",
    title: "L'assetto elettronico",
    text: "Con il banco di convergenza tridimensionale l'officina passa dalla regolazione a occhio alla misura documentata.",
  },
  {
    index: "04",
    anno: "Oggi",
    title: "Il catalogo online",
    text: "Lo stesso magazzino diventa consultabile da casa, con montaggio prenotabile in fase di acquisto.",
  },
];

const attrezzatura = [
  { title: "Banco convergenza 3D", text: "Otto telecamere, confronto con la scheda tecnica del costruttore." },
  { title: "Equilibratrice elettronica", text: "Precisione al grammo, pesi adesivi interni per i cerchi in lega." },
  { title: "Smontagomme automatico", text: "Senza leva: non intacca il canale, gestisce ribassati e run-flat." },
  { title: "Attrezzatura agricola", text: "Per ruote di trattrici e mezzi da cantiere, su appuntamento." },
];

const modoDiLavorare = [
  "Si parte dal mezzo e dall'uso reale, non dal prezzo piu' basso",
  "Ogni intervento viene misurato e, su richiesta, documentato",
  "Il preventivo si fa prima, senza sorprese alla consegna",
  "Per le flotte si concorda il fermo macchina in anticipo",
];

export default function ChiSiamoPage() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <SectionHeading
            className="lg:col-span-7"
            gap={6}
            level={1}
            eyebrow="Chi siamo"
            title="Dal 1998 mettiamo le mani sulle gomme di chi lavora in Alta Irpinia."
            titleClassName="text-4xl leading-[1.08] sm:text-5xl"
            lead={profilo.lead}
            leadClassName="max-w-xl text-base leading-relaxed text-fg-2"
          />

          <div className="lg:col-span-5">
            <Panel className="flex h-full flex-col justify-between gap-8 p-6 lg:p-8">
              <Image src={lockup} alt={site.name} className="h-16 w-auto object-contain" />
              <div className="flex flex-col">
                <SpecRow label="Sede" value={addressLine} />
                <SpecRow label="Attivita' dal" value="1998" strong />
                <SpecRow label="Settori seguiti" value="Auto, autocarri, agricolo, industriale" />
                <SpecRow label="Officina" value="Su appuntamento e accettazione diretta" />
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Il profilo"
            title="Un'officina, quattro settori"
            titleClassName="text-2xl sm:text-3xl"
          />
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="text-base leading-relaxed text-fg">{profilo.body}</p>
            <BulletList items={modoDiLavorare} />
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading
            eyebrow="Il percorso"
            title="Come siamo arrivati fin qui"
            titleClassName="text-2xl sm:text-3xl"
          />
          <ol className="hairline-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {percorso.map((tappa) => (
              <li key={tappa.index} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="eyebrow">{tappa.index}</span>
                  <span className="text-xs font-semibold text-accent">{tappa.anno}</span>
                </div>
                <Rule />
                <h3 className="headline text-lg">{tappa.title}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{tappa.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Attrezzatura"
            title="Gli strumenti con cui lavoriamo"
            titleClassName="text-2xl sm:text-3xl"
            lead="Le lavorazioni che promettiamo sono quelle che possiamo misurare."
            leadClassName="text-sm leading-relaxed text-fg-2"
          />
          <ul className="flex flex-col border-t border-line lg:col-span-7">
            {attrezzatura.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-2 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <h3 className="w-56 shrink-0 text-sm font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 border border-line bg-surface p-8 lg:flex-row lg:items-center lg:p-12">
            <SectionHeading
              className="max-w-xl"
              eyebrow="Parliamone"
              title="Raccontaci come usi il mezzo, alla gomma pensiamo noi."
              titleClassName="text-2xl sm:text-3xl"
              lead="Per preventivi su misure agricole e industriali conviene sentirsi prima: verifichiamo disponibilita' e tempi."
              leadClassName="text-sm leading-relaxed text-fg-2"
            />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
