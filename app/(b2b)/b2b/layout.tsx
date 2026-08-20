import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { site } from "@/lib/config/site";

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-6">
            <Logo href="/b2b/dashboard" />
            <span className="hidden border-l border-line pl-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent md:block">
              Portale rivenditori
            </span>
          </div>
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 transition-colors hover:text-accent"
          >
            Torna al sito
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto border-t border-line bg-surface">
        <div className="container-page flex flex-col gap-2 py-6 text-[11px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} — Area riservata ai clienti professionali
          </p>
          <p>Assistenza ordini: {site.phone.label}</p>
        </div>
      </footer>
    </>
  );
}
