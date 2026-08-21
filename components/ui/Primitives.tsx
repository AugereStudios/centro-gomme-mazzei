import type { ComponentProps, ReactNode } from "react";
import { classNames } from "@/lib/utils/format";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={classNames("eyebrow", className)}>{children}</p>;
}

export function Rule({ className }: { className?: string }) {
  return <span className={classNames("rule-accent", className)} aria-hidden="true" />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  level = 2,
  gap = 4,
  titleClassName = "text-2xl sm:text-3xl md:text-4xl",
  leadClassName = "max-w-2xl text-sm leading-relaxed text-fg-2 sm:text-base",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** 1 per il titolo principale di pagina, 2 per le intestazioni di sezione. */
  level?: 1 | 2;
  /** Spaziatura verticale: una classe sola, per non far collidere due gap- di Tailwind. */
  gap?: 4 | 5 | 6;
  titleClassName?: string;
  leadClassName?: string;
  className?: string;
}) {
  const Title = level === 1 ? "h1" : "h2";
  const gapClass = gap === 6 ? "gap-6" : gap === 5 ? "gap-5" : "gap-4";
  return (
    <div
      className={classNames(
        "flex flex-col",
        gapClass,
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Rule />
      <Title className={classNames("headline", titleClassName)}>{title}</Title>
      {lead ? <p className={leadClassName}>{lead}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "muted";
  className?: string;
}) {
  const tones = {
    neutral: "border-line text-fg-2",
    accent: "border-accent text-accent",
    muted: "border-line text-fg-3",
  } as const;
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-sq border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={classNames("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="bullet-accent text-sm leading-relaxed text-fg-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={classNames("flex flex-col gap-2", className)}>
      <span className="eyebrow">{label}</span>
      {children}
      {hint ? <span className="text-xs text-fg-3">{hint}</span> : null}
    </label>
  );
}

const controlClass =
  "w-full rounded-sq border border-line bg-ink px-3 py-2.5 text-sm text-fg placeholder:text-fg-3 focus:border-accent focus:outline-none";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={classNames(controlClass, className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={classNames(controlClass, "appearance-none pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={classNames(controlClass, className)} {...props} />;
}

export function Panel({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "aside";
}) {
  return <Tag className={classNames("rounded-sq border border-line bg-surface", className)}>{children}</Tag>;
}

/** Riga chiave/valore usata nelle schede tecniche e nei riepiloghi. */
export function SpecRow({
  label,
  value,
  strong,
  accent,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
      <span className="eyebrow">{label}</span>
      <span
        className={classNames(
          "text-right text-sm",
          strong ? "font-semibold text-fg" : "text-fg-2",
          accent && "text-accent",
        )}
      >
        {value}
      </span>
    </div>
  );
}
