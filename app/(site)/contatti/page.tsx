import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Eyebrow, Panel, Rule } from "@/components/ui/Primitives";
import { Table, TableWrap, Td, Th } from "@/components/ui/Table";
import { addressLine, site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contatti e orari",
  description: `Centro Gomme Mazzei — ${addressLine}. Telefono ${site.phone.label}. ${site.hoursSummary}.`,
};

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

          <div className="lg:col-span-5">
            <Panel className="flex h-full flex-col gap-6 p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>Sede operativa</Eyebrow>
                <Rule />
                <address className="not-italic text-lg font-semibold leading-relaxed tracking-[-0.02em]">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city} ({site.address.province})
                </address>
              </div>

              {/* Mappa segnaposto: nessuna chiamata a servizi esterni nel prototipo. */}
              <div className="grid-texture relative flex min-h-44 flex-1 items-center justify-center border border-line bg-elevated">
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-accent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3">
                  Mappa non attiva nel prototipo
                </span>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>Orari di apertura</Eyebrow>
            <Rule />
            <h2 className="headline text-2xl sm:text-3xl">Aperti sei giorni su sette</h2>
            <p className="text-sm leading-relaxed text-fg-2">
              Il sabato pomeriggio l&apos;officina resta chiusa. Per interventi su mezzi agricoli e industriali
              concordiamo un orario dedicato.
            </p>
            <TableWrap>
              <Table className="min-w-0">
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
            <Eyebrow>Richiesta di contatto</Eyebrow>
            <Rule />
            <h2 className="headline text-2xl sm:text-3xl">Scrivici la misura o il servizio che ti serve</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
