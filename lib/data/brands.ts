import { tyres } from "@/lib/data/tyres";
import type { Season, Tyre, VehicleClass } from "@/types";

export type BrandSegment = "premium" | "qualita" | "budget" | "specialista";

export const segmentLabels: Record<BrandSegment, string> = {
  premium: "Premium",
  qualita: "Qualita'",
  budget: "Accessibile",
  specialista: "Specialista",
};

export interface Brand {
  slug: string;
  name: string;
  segment: BrandSegment;
  origin: string;
  /** PLACEHOLDER — testo editoriale da rivedere con il cliente. */
  positioning: string;
  /** PLACEHOLDER — punti di forza da confermare. */
  specialties: string[];
}

/*
 * PLACEHOLDER — schede marchio da confermare con il cliente.
 * Nomi e provenienza sono quelli correnti dei produttori; posizionamento e
 * punti di forza sono testo redazionale scritto per il prototipo.
 * L'elenco copre i marchi presenti in lib/data/tyres.ts.
 */
export const brands: Brand[] = [
  {
    slug: "michelin",
    name: "Michelin",
    segment: "premium",
    origin: "Francia",
    positioning:
      "Riferimento sulla durata: costa di piu' all'acquisto e rende sui chilometri, soprattutto su chi macina strada tutto l'anno.",
    specialties: ["Durata del battistrada", "Gamma completa auto e trasporto", "Linee agricole dedicate"],
  },
  {
    slug: "continental",
    name: "Continental",
    segment: "premium",
    origin: "Germania",
    positioning:
      "Frenata sul bagnato tra le migliori della categoria, con una gamma commerciale solida per i furgoni delle imprese.",
    specialties: ["Aderenza sul bagnato", "Misure commerciali C", "Linee sportive per cerchi grandi"],
  },
  {
    slug: "pirelli",
    name: "Pirelli",
    segment: "premium",
    origin: "Italia",
    positioning:
      "Scelta abituale su vetture potenti e cerchi ribassati, con ampia disponibilita' di run-flat e omologazioni casa madre.",
    specialties: ["Ribassati e run-flat", "Omologazioni costruttore", "Invernali per alta velocita'"],
  },
  {
    slug: "bridgestone",
    name: "Bridgestone",
    segment: "premium",
    origin: "Giappone",
    positioning:
      "Equilibrio fra comfort e tenuta, con una linea invernale che tiene bene le temperature dell'entroterra.",
    specialties: ["Comfort di rotolamento", "Invernali per zone fredde", "Gamma trasporto leggero"],
  },
  {
    slug: "goodyear",
    name: "Goodyear",
    segment: "premium",
    origin: "Stati Uniti",
    positioning:
      "Gamma quattro stagioni tra le piu' complete: soluzione tipica per chi non vuole gestire due treni di gomme.",
    specialties: ["Quattro stagioni", "Prestazioni su asciutto", "Misure per SUV"],
  },
  {
    slug: "hankook",
    name: "Hankook",
    segment: "qualita",
    origin: "Corea del Sud",
    positioning:
      "Rapporto tra prezzo e resa fra i piu' convincenti, con quattro stagioni adatte all'uso urbano ed extraurbano.",
    specialties: ["Prezzo competitivo", "Quattro stagioni", "Gamma van e trasporto"],
  },
  {
    slug: "nokian",
    name: "Nokian",
    segment: "qualita",
    origin: "Finlandia",
    positioning:
      "Specialista dell'inverno: la scelta quando l'obbligo invernale si accompagna a neve vera in quota.",
    specialties: ["Neve e ghiaccio", "Marcatura 3PMSF", "Tenuta a basse temperature"],
  },
  {
    slug: "vredestein",
    name: "Vredestein",
    segment: "qualita",
    origin: "Paesi Bassi",
    positioning:
      "Quattro stagioni con carattere sportivo, apprezzata su vetture medie che restano ferme d'inverno solo per pochi giorni.",
    specialties: ["Quattro stagioni sportive", "Silenziosita'", "Disegno del battistrada"],
  },
  {
    slug: "kleber",
    name: "Kleber",
    segment: "budget",
    origin: "Francia",
    positioning:
      "Alternativa accessibile per chi percorre pochi chilometri o cerca il ricambio economico sul mezzo da lavoro.",
    specialties: ["Prezzo contenuto", "Trasporto leggero", "Gamma essenziale"],
  },
  {
    slug: "bkt",
    name: "BKT",
    segment: "specialista",
    origin: "India",
    positioning:
      "Molto diffusa su trattrici e mezzi da cantiere: costo per ora di lavoro basso, disponibilita' ampia sulle misure agricole.",
    specialties: ["Agricolo e movimento terra", "Minipale e skid steer", "Rapporto costo/ore di lavoro"],
  },
  {
    slug: "mitas",
    name: "Mitas",
    segment: "specialista",
    origin: "Repubblica Ceca",
    positioning:
      "Radiali agricole con buona impronta a terra, indicata dove conta ridurre il compattamento del terreno.",
    specialties: ["Radiali agricole", "Impronta a terra", "Terne e movimento terra"],
  },
  {
    slug: "trelleborg",
    name: "Trelleborg",
    segment: "specialista",
    origin: "Svezia",
    positioning:
      "Fascia alta dell'agricolo, scelta sulle trattrici di potenza dove la trazione in campo fa la differenza.",
    specialties: ["Trattrici ad alta potenza", "Trazione in campo", "Bassa pressione di esercizio"],
  },
  {
    slug: "camso",
    name: "Camso",
    segment: "specialista",
    origin: "Canada",
    positioning:
      "Soluzioni per mezzi compatti da cantiere, con carcasse pensate per il lavoro continuo su fondi irregolari.",
    specialties: ["Minipale", "Fondi irregolari", "Resistenza al taglio"],
  },
  {
    slug: "solideal",
    name: "Solideal",
    segment: "specialista",
    origin: "Belgio",
    positioning:
      "Pneumatici pieni e superelastici per carrelli elevatori: nessuna foratura, fermo macchina ridotto al minimo.",
    specialties: ["Pieni e superelastici", "Carrelli elevatori", "Uso interno e piazzale"],
  },
];

export interface BrandStats {
  articoli: number;
  online: number;
  suPreventivo: number;
  vehicleClasses: VehicleClass[];
  seasons: Season[];
  radiusMin: number;
  radiusMax: number;
  /** Prezzo al pubblico piu' basso fra gli articoli acquistabili online. */
  prezzoDa: number | null;
  disponibilita: number;
}

export function getBrandTyres(name: string): Tyre[] {
  return tyres.filter((t) => t.brand === name);
}

/** Statistiche derivate dal catalogo: nessun numero scritto a mano nelle pagine. */
export function getBrandStats(name: string): BrandStats {
  const items = getBrandTyres(name);
  const online = items.filter((t) => t.saleMode === "online");
  const radii = items.map((t) => t.radius);
  const prezzi = online.map((t) => t.price).filter((p) => p > 0);

  return {
    articoli: items.length,
    online: online.length,
    suPreventivo: items.length - online.length,
    vehicleClasses: Array.from(new Set(items.map((t) => t.vehicleClass))),
    seasons: Array.from(new Set(items.map((t) => t.season))),
    radiusMin: Math.min(...radii),
    radiusMax: Math.max(...radii),
    prezzoDa: prezzi.length > 0 ? Math.min(...prezzi) : null,
    disponibilita: items.reduce((sum, t) => sum + t.stock, 0),
  };
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** Numeri complessivi mostrati nell'hero dell'indice, anch'essi derivati. */
export function getCatalogOverview() {
  const radii = tyres.map((t) => t.radius);
  return {
    marchi: brands.length,
    articoli: tyres.length,
    radiusMin: Math.min(...radii),
    radiusMax: Math.max(...radii),
    classi: Array.from(new Set(tyres.map((t) => t.vehicleClass))).length,
    stagioni: Array.from(new Set(tyres.map((t) => t.season))).length,
  };
}
