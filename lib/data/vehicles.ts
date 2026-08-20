import type { VehicleClass } from "@/types";

export interface VehicleCategory {
  slug: VehicleClass;
  index: string;
  title: string;
  description: string;
  points: string[];
  /** Rotta di destinazione della card in home. */
  href: string;
}

export const vehicleCategories: VehicleCategory[] = [
  {
    slug: "auto",
    index: "01",
    title: "Auto e SUV",
    description:
      "Vetture, station wagon e SUV. Misure da R15 a R22, estive, invernali e quattro stagioni dei principali marchi.",
    points: ["Montaggio in giornata", "Bilanciatura elettronica", "Convergenza 3D"],
    href: "/store/catalogo?veicolo=auto",
  },
  {
    slug: "autocarri",
    index: "02",
    title: "Autocarri e furgoni",
    description:
      "Misure commerciali C per trasporto leggero e flotte aziendali. Gestione ricambio programmato su piu' mezzi.",
    points: ["Misure rinforzate C", "Intervento su flotta", "Fatturazione aziendale"],
    href: "/store/catalogo?veicolo=autocarri",
  },
  {
    slug: "agricoli",
    index: "03",
    title: "Mezzi agricoli",
    description:
      "Trattrici, rimorchi e macchine da raccolta. Servizio su appuntamento con attrezzatura dedicata alle ruote agricole.",
    points: ["Radiali e diagonali", "Riparazioni strutturali", "Preventivo su misura"],
    href: "/store/catalogo?veicolo=agricoli",
  },
  {
    slug: "industriali",
    index: "04",
    title: "Mezzi industriali",
    description:
      "Carrelli elevatori, minipale e movimento terra. Pneumatici pieni, superelastici e da cantiere.",
    points: ["Pieni e superelastici", "Fermo macchina ridotto", "Assistenza programmata"],
    href: "/store/catalogo?veicolo=industriali",
  },
];

export const vehicleLabels: Record<VehicleClass, string> = {
  auto: "Auto e SUV",
  autocarri: "Autocarri e furgoni",
  agricoli: "Mezzi agricoli",
  industriali: "Mezzi industriali",
};
