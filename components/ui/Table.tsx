import type { ComponentProps } from "react";
import { classNames } from "@/lib/utils/format";

/** Tabella tecnica: intestazioni maiuscole tracciate, righe separate da hairline. */
export function TableWrap({ className, children }: ComponentProps<"div">) {
  return (
    <div className={classNames("w-full overflow-x-auto rounded-sq border border-line bg-surface", className)}>
      {children}
    </div>
  );
}

export function Table({ className, children, ...props }: ComponentProps<"table">) {
  return (
    <table className={classNames("w-full min-w-[46rem] border-collapse text-left", className)} {...props}>
      {children}
    </table>
  );
}

export function Th({ className, children, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={classNames(
        "border-b border-line px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3 whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({ className, children, ...props }: ComponentProps<"td">) {
  return (
    <td className={classNames("border-b border-line px-4 py-3 text-sm text-fg-2", className)} {...props}>
      {children}
    </td>
  );
}
