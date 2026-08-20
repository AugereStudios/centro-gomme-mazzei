import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/store/CatalogView";
import { Eyebrow, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Catalogo pneumatici",
  description:
    "Catalogo pneumatici per auto, autocarri, mezzi agricoli e industriali. Filtra per larghezza, spallamento, raggio, stagione e marca.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page flex flex-col gap-5 py-12 lg:py-16">
          <Eyebrow>Store — Catalogo</Eyebrow>
          <Rule />
          <h1 className="headline text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Tutte le misure a magazzino, con montaggio prenotabile.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base">
            Prezzi al pubblico IVA inclusa, per singolo pneumatico. Il sovrapprezzo di montaggio e bilanciatura
            elettronica dipende dal raggio e si aggiunge solo se scegli il ritiro in officina.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="container-page py-16 text-sm text-fg-3">Caricamento catalogo...</div>}>
        <CatalogView />
      </Suspense>
    </>
  );
}
