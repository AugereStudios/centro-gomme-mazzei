import type { Metadata } from "next";
import { AgreementForm } from "@/components/enterprise/AgreementForm";
import { ButtonLink } from "@/components/ui/Button";
import { BulletList, Eyebrow, Panel, Rule, SectionHeading, SpecRow } from "@/components/ui/Primitives";
import { enterpriseOffers, enterpriseSteps } from "@/lib/data/b2b";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Area enterprise",
  description:
    "Convenzioni per flotte e condizioni riservate ai rivenditori del Centro Gomme Mazzei: prezzi netti, fido concordato, interventi programmati.",
};

export default function AreaEnterprisePage() {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <SectionHeading
            className="lg:col-span-7"
            gap={6}
            level={1}
            eyebrow="Area enterprise"
            title="Per chi tiene i mezzi in strada e per chi rivende."
            titleClassName="text-4xl leading-[1.08] sm:text-5xl"
            lead="Due modi di lavorare con noi: una convenzione annuale se gestisci una flotta, condizioni di canale se sei un'officina o un gommista. In entrambi i casi si parte da una richiesta e si concorda tutto prima."
            leadClassName="max-w-xl text-base leading-relaxed text-fg-2"
          />

          <div className="lg:col-span-5">
            <Panel className="flex h-full flex-col justify-between gap-6 p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>Hai gia&apos; un accesso?</Eyebrow>
                <Rule />
                <p className="text-sm leading-relaxed text-fg-2">
                  Entra nel portale per consultare il listino netto, il fido residuo e inviare una richiesta
                  d&apos;ordine.
                </p>
              </div>
              <div className="flex flex-col">
                <SpecRow label="Evasione ordini" value="24 / 48 ore" />
                <SpecRow label="Pagamento" value="RiBa 60 gg" />
                <SpecRow label="Trasporto" value="Franco sopra 500 EUR" />
              </div>
              <div className="flex flex-col gap-3">
                <ButtonLink href="/area-enterprise/login" size="lg" className="w-full">
                  Accedi al portale
                </ButtonLink>
                <a
                  href={site.phone.href}
                  className="w-full border border-line px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {site.phone.label}
                </a>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading
            eyebrow="Le due offerte"
            title="Convenzioni flotte e condizioni rivenditori"
            titleClassName="text-2xl sm:text-3xl"
          />
          <div className="hairline-grid grid grid-cols-1 md:grid-cols-2">
            {enterpriseOffers.map((offer) => (
              <div key={offer.slug} className="flex flex-col gap-5 bg-surface p-6 lg:p-8">
                <Eyebrow>{offer.eyebrow}</Eyebrow>
                <Rule />
                <h3 className="headline text-2xl">{offer.title}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{offer.lead}</p>
                <BulletList items={offer.points} />
                <p className="mt-auto border-t border-line pt-4 text-xs leading-relaxed text-fg-3">
                  {offer.audience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 lg:py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading
            eyebrow="Come si diventa cliente"
            title="Tre passi, nessuna registrazione automatica"
            titleClassName="text-2xl sm:text-3xl"
            lead="L'accesso al portale non si apre da soli: le utenze vengono abilitate a mano dopo la verifica dei dati."
            leadClassName="max-w-2xl text-sm leading-relaxed text-fg-2"
          />
          <ol className="hairline-grid grid grid-cols-1 md:grid-cols-3">
            {enterpriseSteps.map((step) => (
              <li key={step.index} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
                <span className="eyebrow">{step.index}</span>
                <Rule />
                <h3 className="headline text-lg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-fg-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Richiesta"
            title="Raccontaci che parco mezzi hai"
            titleClassName="text-2xl sm:text-3xl"
            lead="Compila la richiesta: ti richiamiamo per concordare le condizioni. Se preferisci fare prima due chiacchiere, il telefono funziona sempre."
            leadClassName="text-sm leading-relaxed text-fg-2"
          />
          <div className="lg:col-span-7">
            <AgreementForm />
          </div>
        </div>
      </section>
    </>
  );
}
