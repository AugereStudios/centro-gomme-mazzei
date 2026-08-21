import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPlaceholder } from "@/components/site/MapPlaceholder";
import { BulletList, Eyebrow, Panel, Rule, SectionHeading } from "@/components/ui/Primitives";
import { Table, TableWrap, Td, Th } from "@/components/ui/Table";
import { addressLine, site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contatti e orari",
  description: `Centro Gomme Mazzei — ${addressLine}. Telefono ${site.phone.label}. ${site.hoursSummary}.`,
};

/**
 * PLACEHOLDER — indicazioni generiche, da confermare con il cliente.
 * Non descrivono riferimenti stradali reali.
 */
const directions = [
  "Officina su strada, ingresso diretto dal piazzale esterno",
  "Spazio di manovra e sosta davanti al capannone",
  "Accesso consentito ad autocarri e mezzi da lavoro",
  "Per mezzi agricoli e industriali conviene avvisare prima di arrivare",
];

export default function ContattiPage() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow>Contatti</Eyebrow>
            <Rule />
            <h1 className="headline text-4xl leading-[1.08] sm:text-5xl">
              Siamo a {site.address.city}, in {site.address.street}.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-fg-2">
              Per il montaggio conviene fissare un appuntamento: riduciamo l&apos;attesa e prepariamo in anticipo
              le gomme della misura richiesta.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.phone.href}
                className="bg-accent px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:bg-accent-strong"
              >
                Chiama {site.phone.label}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="border border-line px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/*
            L'indirizzo completo e' nella scheda officina del footer: qui la
            colonna risponde a una domanda diversa, come si arriva in officina.
          */}
          <div className="lg:col-span-5">
            <Panel className="flex h-full flex-col gap-6 p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>Come arrivare</Eyebrow>
                <Rule />
                <BulletList items={directions} />
              </div>

              <MapPlaceholder className="min-h-44 flex-1" />
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionHeading
              gap={6}
              eyebrow="Orari di apertura"
              title="Aperti sei giorni su sette"
              titleClassName="text-2xl sm:text-3xl"
              lead="Il sabato pomeriggio l'officina resta chiusa. Per interventi su mezzi agricoli e industriali concordiamo un orario dedicato."
              leadClassName="text-sm leading-relaxed text-fg-2"
            />
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <Th>Giorni</Th>
                    <Th>Mattina</Th>
                    <Th>Pomeriggio</Th>
                  </tr>
                </thead>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days}>
                      <Td className="font-semibold text-fg">{h.days}</Td>
                      <Td>{h.morning}</Td>
                      <Td className={h.afternoon === "Chiuso" ? "text-fg-3" : undefined}>{h.afternoon}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionHeading
              gap={6}
              eyebrow="Richiesta di contatto"
              title="Scrivici la misura o il servizio che ti serve"
              titleClassName="text-2xl sm:text-3xl"
            />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
