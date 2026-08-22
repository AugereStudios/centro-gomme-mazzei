import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { SiteFooter } from "@/components/site/SiteFooter";

/** Guscio dell'area enterprise: barra di livello e footer ridotto. */
export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-6">
            <Logo href="/area-enterprise" />
            <span className="hidden border-l border-line pl-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent md:block">
              Area enterprise
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/area-enterprise/login"
              className="border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
            >
              Accedi
            </Link>
            <Link
              href="/"
              className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 transition-colors hover:text-accent sm:block"
            >
              Torna al sito
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter variant="enterprise" />
    </>
  );
}
