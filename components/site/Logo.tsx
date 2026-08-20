import Link from "next/link";
import { site } from "@/lib/config/site";
import { classNames } from "@/lib/utils/format";

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={classNames("group flex items-center gap-3", className)}>
      <span className="flex h-9 w-9 items-center justify-center bg-accent text-sm font-bold tracking-[-0.02em] text-fg">
        CM
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-[-0.02em] text-fg">Centro Gomme</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 group-hover:text-accent">
          {site.shortName} — Montella
        </span>
      </span>
    </Link>
  );
}
