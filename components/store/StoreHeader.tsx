"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartBadge } from "@/components/store/CartBadge";
import { Logo } from "@/components/site/Logo";
import { site } from "@/lib/config/site";
import { classNames } from "@/lib/utils/format";

/** Navigazione interna al negozio: il carrello vive qui, non nella vetrina. */
const nav = [
  { href: "/store/catalogo", label: "Catalogo" },
  { href: "/store", label: "Come acquistare" },
] as const;

export function StoreHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/store" ? pathname === "/store" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      {/* Marcatore di livello: chiarisce che si e' dentro il negozio */}
      <div className="border-b border-line bg-surface">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <span className="eyebrow text-accent">Store online</span>
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 transition-colors hover:text-accent"
          >
            &larr; Torna al sito
          </Link>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo href="/store" />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors",
                isActive(item.href) ? "text-fg" : "text-fg-2 hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={site.phone.href}
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:text-accent"
          >
            Assistenza {site.phone.label}
          </a>
          <CartBadge />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CartBadge />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-line"
          >
            <span
              className={classNames("h-0.5 w-5 bg-fg transition-transform", open && "translate-y-1 rotate-45")}
            />
            <span
              className={classNames(
                "h-0.5 w-5 bg-fg transition-transform",
                open && "-translate-y-1 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-surface md:hidden">
          <nav className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={classNames(
                  "border-b border-line py-4 text-xs font-semibold uppercase tracking-[0.15em]",
                  isActive(item.href) ? "text-accent" : "text-fg-2",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-xs font-semibold uppercase tracking-[0.15em] text-fg-2"
            >
              Torna al sito
            </Link>
            <a
              href={site.phone.href}
              className="my-4 bg-accent py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-fg"
            >
              Assistenza {site.phone.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
