import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { classNames } from "@/lib/utils/format";

type Variant = "accent" | "outline" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sq font-semibold uppercase tracking-[0.15em] transition-colors disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-fg hover:bg-accent-strong",
  outline: "border border-line text-fg hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-fg-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-2 text-[10px]",
  md: "px-5 py-3 text-[11px]",
  lg: "px-7 py-4 text-xs",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "accent",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={classNames(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "accent",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={classNames(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
