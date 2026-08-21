import Link from "next/link";
import { MapPlaceholder } from "@/components/site/MapPlaceholder";
import { Eyebrow, Rule } from "@/components/ui/Primitives";
import { addressLine, site } from "@/lib/config/site";
import { services } from "@/lib/data/services";

type Variant = "site" | "b2b";

const columns = [
  {
    title: "Sito",
    links: [
      { href: "/", label: "Home" },
      { href: "/chi-siamo", label: "Chi siamo" },
      { href: "/prodotti", label: "Prodotti" },
      { href: "/servizi", label: "Servizi" },
      { href: "/contatti", label: "Contatti" },
    ],
  },
  {
    title: "Store",
    links: [
      { href: "/store/catalogo", label: "Catalogo" },
      { href: "/store/carrello", label: "Carrello" },
      { href: "/store", label: "Come acquistare" },
    ],
  },
  {
    title: "Servizi",
    // Nessuna ancora per singolo servizio: i link puntano alla pagina servizi.
    links: services.map((s) => ({ href: "/servizi", label: s.title })),
  },
] as const;

export function SiteFooter({ variant = "site" }: { variant?: Variant }) {
  if (variant === "b2b") {
    return (
      <footer className="mt-auto border-t border-line bg-surface">
        <BottomBar
          left={`${site.name} — Area riservata ai clienti professionali`}
          right={`Assistenza ordini: ${site.phone.label}`}
        />
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:gap-10">
        {/* Scheda officina */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Rule />
          <div className="flex flex-col gap-2">
            <p className="headline text-lg">{site.name}</p>
            <p className="text-sm leading-relaxed text-fg-2">{site.claim}</p>
          </div>

          <address className="not-italic text-sm leading-relaxed text-fg-2">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city} ({site.address.province})
          </address>

          <div className="flex flex-col gap-1 border-t border-line pt-5">
            <Eyebrow>Telefono</Eyebrow>
            <a
              href={site.phone.href}
              className="headline text-2xl transition-colors hover:text-accent"
            >
              {site.phone.label}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-fg-2 transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <MapPlaceholder className="h-40" />
        </div>

        {/* Colonne di navigazione */}
        <nav className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:gap-8">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <Eyebrow>{column.title}</Eyebrow>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-2 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.title === "Store" ? (
                  <li className="pt-2">
                    <Link
                      href="/b2b/login"
                      className="inline-block border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      Area rivenditori
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <BottomBar
        left={[site.name, addressLine, site.vat ? `P. IVA ${site.vat}` : null]
          .filter(Boolean)
          .join(" — ")}
        right="Prototipo dimostrativo — dati e prezzi non definitivi."
      />
    </footer>
  );
}

function BottomBar({ left, right }: { left: string; right: string }) {
  return (
    <div className="border-t border-line">
      <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{left}</p>
        <p>{right}</p>
      </div>
    </div>
  );
}
