import { classNames } from "@/lib/utils/format";

/**
 * Illustrazione tecnica del pneumatico: nessuna immagine esterna, solo SVG.
 * Le foto reali arriveranno dal catalogo fornitore.
 */
export function TyreVisual({ size, className }: { size: string; className?: string }) {
  return (
    <div className={classNames("relative flex items-center justify-center bg-elevated", className)}>
      <svg viewBox="0 0 200 200" className="h-full w-full max-h-56" role="img" aria-label={`Pneumatico ${size}`}>
        <defs>
          <pattern id="tread" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <rect width="4" height="10" fill="var(--color-line)" />
          </pattern>
        </defs>
        <circle cx="100" cy="100" r="78" fill="url(#tread)" opacity="0.9" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="var(--color-line)" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="var(--color-ink)" stroke="var(--color-line)" strokeWidth="2" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="var(--color-fg-3)" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1="100"
            y1="100"
            x2={100 + 42 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 42 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--color-fg-3)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <span className="absolute bottom-2 right-2 rounded-sq bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3">
        {size}
      </span>
    </div>
  );
}
