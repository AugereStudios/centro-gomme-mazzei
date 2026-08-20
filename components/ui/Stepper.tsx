"use client";

import { classNames } from "@/lib/utils/format";

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantita'",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const clamp = (n: number) => Math.min(Math.max(n, min), max);

  return (
    <div className={classNames("inline-flex items-stretch border border-line", className)}>
      <button
        type="button"
        aria-label={`Diminuisci ${label}`}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className="px-3 py-2 text-fg-2 transition-colors hover:text-accent disabled:opacity-30"
      >
        &minus;
      </button>
      <input
        type="number"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        className="w-12 border-x border-line bg-transparent text-center text-sm font-semibold text-fg [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={`Aumenta ${label}`}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className="px-3 py-2 text-fg-2 transition-colors hover:text-accent disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
