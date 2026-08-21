import { Badge } from "@/components/ui/Primitives";
import { vehicleLabels } from "@/lib/data/vehicles";
import { seasonLabels } from "@/lib/utils/format";
import type { Tyre } from "@/types";

/** Etichette di un pneumatico: stagione, classe di veicolo, run-flat, su preventivo. */
export function TyreBadges({
  tyre,
  showVehicleClass = false,
  className = "flex flex-wrap items-center gap-2",
}: {
  tyre: Tyre;
  showVehicleClass?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Badge tone="accent">{seasonLabels[tyre.season]}</Badge>
      {showVehicleClass ? <Badge>{vehicleLabels[tyre.vehicleClass]}</Badge> : null}
      {tyre.runflat ? <Badge>Run-flat</Badge> : null}
      {tyre.saleMode !== "online" ? <Badge tone="muted">Su preventivo</Badge> : null}
    </div>
  );
}
