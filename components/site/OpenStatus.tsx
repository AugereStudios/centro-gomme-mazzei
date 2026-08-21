"use client";

import { site } from "@/lib/config/site";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatOpenStatus, getOpenStatus } from "@/lib/utils/hours";
import { classNames } from "@/lib/utils/format";

/**
 * Indicatore "aperto ora / chiuso".
 * Dipende dall'ora del client: prima dell'idratazione mostra il riassunto
 * statico degli orari, cosi' il markup coincide con quello prerenderizzato.
 */
export function OpenStatus({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const status = hydrated ? getOpenStatus(new Date()) : null;
  const open = status?.open ?? false;

  return (
    <p className={classNames("flex items-start gap-2.5 text-sm", className)}>
      <span
        aria-hidden="true"
        className={classNames("mt-1.5 h-1.5 w-1.5 shrink-0", open ? "bg-accent" : "bg-fg-3")}
      />
      <span className={open ? "font-semibold text-fg" : "text-fg-2"}>
        {status ? formatOpenStatus(status) : site.hoursSummary}
      </span>
    </p>
  );
}
