"use client";

import Link from "next/link";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartStore } from "@/lib/store/cart-store";

export function CartBadge() {
  const hydrated = useHydrated();
  const count = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.qty, 0));

  return (
    <Link
      href="/store/carrello"
      className="relative flex items-center gap-2 border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
    >
      Carrello
      <span className="min-w-6 bg-accent px-1.5 py-0.5 text-center text-[10px] font-bold text-fg">
        {hydrated ? count : 0}
      </span>
    </Link>
  );
}
