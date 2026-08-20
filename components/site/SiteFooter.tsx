import Link from "next/link";
import { Eyebrow } from "@/components/ui/Primitives";
import { addressLine, site } from "@/lib/config/site";
import { services } from "@/lib/data/services";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="rule-accent" aria-hidden="true" />
          <p className="text-lg font-bold tracking-[-0.02em]">{site.name}</p>
          <p className="text-sm leading-relaxed text-fg-2">{site.claim}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow>Sede</Eyebrow>
          <address className="not-italic text-sm leading-relaxed text-fg-2">
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city} ({site.address.province})
          </address>
          <a href={site.phone.href} className="text-sm font-semibold text-fg transition-colors hover:text-accent">
            {site.phone.label}
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow>Servizi</Eyebrow>
          <ul className="flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/servizi" className="text-sm text-fg-2 transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow>Orari</Eyebrow>
          <ul className="flex flex-col gap-2.5 text-sm text-fg-2">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 border-b border-line pb-2">
                <span>{h.days}</span>
                <span className="text-right text-fg-3">
                  {h.morning}
                  {h.afternoon !== "Chiuso" ? ` / ${h.afternoon}` : ""}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/b2b/login"
            className="mt-2 self-start border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
          >
            Area rivenditori
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} — {addressLine}
          </p>
          <p>Prototipo dimostrativo — dati e prezzi non definitivi.</p>
        </div>
      </div>
    </footer>
  );
}
