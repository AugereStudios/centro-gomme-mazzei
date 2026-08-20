"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartBadge } from "@/components/store/CartBadge";
import { Logo } from "@/components/site/Logo";
import { site } from "@/lib/config/site";
import { classNames } from "@/lib/utils/format";

const nav = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/store/catalogo", label: "Store" },
  { href: "/contatti", label: "Contatti" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

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
          <CartBadge />
          <Link
            href="/b2b/login"
            className="border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
          >
            Area rivenditori
          </Link>
          <a
            href={site.phone.href}
            className="bg-accent px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:bg-accent-strong"
          >
            {site.phone.label}
          </a>
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
              href="/b2b/login"
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-xs font-semibold uppercase tracking-[0.15em] text-fg-2"
            >
              Area rivenditori
            </Link>
            <a
              href={site.phone.href}
              className="my-4 bg-accent py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-fg"
            >
              Chiama {site.phone.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
