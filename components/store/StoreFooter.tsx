import Link from "next/link";
import { Eyebrow, Rule } from "@/components/ui/Primitives";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/config/pricing";
import { site } from "@/lib/config/site";
import { formatEUR } from "@/lib/utils/format";

/**
 * Footer del negozio: parla di acquisto, non di officina.
 * Sede, orari e mappa restano nel footer della vetrina, raggiungibile dal link
 * "Officina e contatti": qui non si ricopiano.
 */
const columns = [
  {
    title: "Acquisto",
    links: [
      { href: "/store/catalogo", label: "Catalogo" },
      { href: "/store", label: "Come acquistare" },
      { href: "/store/carrello", label: "Carrello" },
    ],
  },
  {
    title: "Il sito",
    links: [
      { href: "/prodotti", label: "Marchi trattati" },
      { href: "/servizi", label: "Servizi di officina" },
      { href: "/contatti", label: "Officina e contatti" },
    ],
  },
] as const;

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Rule />
          <p className="headline text-lg">Store online {site.shortName}</p>
          <p className="text-sm leading-relaxed text-fg-2">
            Spedizione in 24/48 ore, gratuita oltre {formatEUR(FREE_SHIPPING_THRESHOLD)} di pneumatici
            ({formatEUR(SHIPPING_FLAT)} sotto soglia). In alternativa ritiri in officina e trovi il montaggio
            gia&apos; programmato.
          </p>
          <div className="mt-2 flex flex-col gap-1 border-t border-line pt-5">
            <Eyebrow>Assistenza ordini</Eyebrow>
            <a href={site.phone.href} className="headline text-xl transition-colors hover:text-accent">
              {site.phone.label}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-fg-2 transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <Eyebrow>{column.title}</Eyebrow>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-2 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name} — Store online</p>
          <p>Prototipo dimostrativo — dati e prezzi non definitivi.</p>
        </div>
      </div>
    </footer>
  );
}
