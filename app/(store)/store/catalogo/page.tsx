import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/store/CatalogView";
import { SectionHeading } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Catalogo pneumatici",
  description:
    "Catalogo pneumatici per auto, autocarri, mezzi agricoli e industriali. Filtra per larghezza, spallamento, raggio, stagione e marca.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="border-b border-line">
        <SectionHeading
          className="container-page py-12 lg:py-16"
          gap={5}
          level={1}
          eyebrow="Store — Catalogo"
          title="Tutte le misure a magazzino, con montaggio prenotabile."
          titleClassName="text-3xl leading-tight sm:text-4xl lg:text-5xl"
          lead="Prezzi al pubblico IVA inclusa, per singolo pneumatico. Il sovrapprezzo di montaggio e bilanciatura elettronica dipende dal raggio e si aggiunge solo se scegli il ritiro in officina."
        />
      </section>

      <Suspense fallback={<div className="container-page py-16 text-sm text-fg-3">Caricamento catalogo...</div>}>
        <CatalogView />
      </Suspense>
    </>
  );
}
