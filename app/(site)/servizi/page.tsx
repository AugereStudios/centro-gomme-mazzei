import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { BulletList, Eyebrow, Panel, Rule, SectionHeading, SpecRow } from "@/components/ui/Primitives";
import { getServicePriceLabel } from "@/lib/config/pricing";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Servizi di officina",
  description:
    "Convergenza 3D, bilanciatura elettronica, deposito pneumatici, montaggio e riparazione presso il Centro Gomme Mazzei di Montella (AV).",
};

export default function ServiziPage() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-x-0 h-64 opacity-30" aria-hidden="true" />
        <SectionHeading
          className="container-page relative py-16 lg:py-20"
          gap={6}
          level={1}
          eyebrow="Officina"
          title="Quattro lavorazioni che decidono la durata di un treno di gomme."
          titleClassName="max-w-3xl text-4xl leading-[1.08] sm:text-5xl"
          lead="Ogni intervento viene eseguito con attrezzatura elettronica e documentato. Su richiesta consegniamo il rapporto di misura prima e dopo la regolazione."
          leadClassName="max-w-2xl text-base leading-relaxed text-fg-2"
        />
      </section>

      {services.map((service, index) => (
        <section key={service.slug} className="border-b border-line py-14 lg:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <div className={`flex flex-col gap-6 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="flex items-baseline gap-4">
                <span className="headline text-5xl text-fg-3">{service.index}</span>
                <div className="flex flex-col gap-2">
                  <Eyebrow>{service.eyebrow}</Eyebrow>
                  <h2 className="headline text-2xl sm:text-3xl">{service.title}</h2>
                </div>
              </div>
              <Rule />
              <p className="max-w-2xl text-base leading-relaxed text-fg">{service.lead}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-fg-2">{service.body}</p>
              <BulletList items={service.points} className="max-w-xl" />
            </div>

            <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <Panel className="flex h-full flex-col justify-between p-6 lg:p-8">
                <div className="flex flex-col gap-4">
                  <Eyebrow>Scheda intervento</Eyebrow>
                  <Rule />
                </div>
                <div className="mt-6 flex flex-col">
                  <SpecRow label="Durata media" value={service.duration} strong />
                  <SpecRow label="Prezzo" value={getServicePriceLabel(service.slug)} accent strong />
                  {/* La sede e' nella scheda officina del footer: non si ripete qui. */}
                  <SpecRow label="Prenotazione" value="Consigliata" />
                </div>
                <ButtonLink href="/contatti" className="mt-8 w-full">
                  Prenota l&apos;intervento
                </ButtonLink>
              </Panel>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-20">
        <div className="container-page flex flex-col gap-8">
          <SectionHeading
            eyebrow="Serve anche il pneumatico?"
            title="Acquista online e ritira in officina con montaggio incluso"
            lead="Scegli la misura nello store, seleziona il montaggio in officina in fase di checkout e fissa l'appuntamento: al ritiro trovi il lavoro gia' programmato."
          />
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/store/catalogo" size="lg">
              Apri il catalogo
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
