import { classNames } from "@/lib/utils/format";

/**
 * Mappa segnaposto: nessuna chiamata a servizi esterni nel prototipo.
 * Usata nella pagina contatti e nella scheda officina del footer.
 */
export function MapPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "grid-texture relative flex items-center justify-center border border-line bg-elevated",
        className,
      )}
      role="img"
      aria-label="Posizione dell'officina — mappa non attiva nel prototipo"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-accent"
      />
      <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-fg-3">
        Mappa non attiva nel prototipo
      </span>
    </div>
  );
}
