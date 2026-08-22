import type { Metadata } from "next";
import { LoginForm } from "@/components/enterprise/LoginForm";
import { BulletList, SectionHeading } from "@/components/ui/Primitives";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Accesso area enterprise",
  description:
    "Area riservata ai clienti professionali del Centro Gomme Mazzei. L'accesso richiede approvazione manuale dell'amministratore.",
};

const vantaggi = [
  "Prezzi netti riservati, gia' scontati a listino",
  "Ricerca rapida per EAN o codice articolo",
  "Fido concordato e situazione contabile sempre visibile",
  "Consegne programmate sui mezzi in officina",
];

export default function B2BLoginPage() {
  return (
    <section className="relative">
      <div className="grid-texture absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col gap-6">
          <SectionHeading
            gap={6}
            level={1}
            eyebrow="Area riservata"
            title="Il portale per officine, gommisti e flotte."
            titleClassName="text-4xl leading-[1.08] sm:text-5xl"
            lead={`Consulta disponibilita' e prezzi netti riservati al canale professionale, con la stessa logistica del banco di ${site.address.city}.`}
            leadClassName="max-w-xl text-base leading-relaxed text-fg-2"
          />
          <BulletList items={vantaggi} className="max-w-lg" />
          <div className="mt-4 flex flex-col gap-1 border-t border-line pt-6">
            <span className="eyebrow">Attivazione utenze</span>
            <a href={site.phone.href} className="text-lg font-semibold hover:text-accent">
              {site.phone.label}
            </a>
          </div>
        </div>

        <div className="lg:pl-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
