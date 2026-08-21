import type { ReactNode } from "react";
import { Eyebrow, Rule } from "@/components/ui/Primitives";
import { classNames } from "@/lib/utils/format";

/**
 * Pannello usato quando non c'e' nulla da mostrare: carrello vuoto, nessun
 * risultato in catalogo, sessione B2B assente.
 * `action` e' un nodo perche' a volte e' un link e a volte un bottone.
 */
export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  level = 1,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  action?: ReactNode;
  /** 2 quando la pagina ha gia' un h1 (es. il catalogo con il suo hero). */
  level?: 1 | 2;
  className?: string;
}) {
  const Title = level === 1 ? "h1" : "h2";
  return (
    <div
      className={classNames(
        "flex flex-col items-start gap-5 border border-line bg-surface p-8",
        eyebrow ? "border-l-2 border-l-accent" : null,
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : <Rule />}
      <Title className="headline text-2xl">{title}</Title>
      <p className="max-w-lg text-sm leading-relaxed text-fg-2">{description}</p>
      {action}
    </div>
  );
}
