import type { Season, Tyre } from "@/types";

const eur = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function formatEUR(value: number): string {
  return eur.format(value);
}

/** "205/55 R16 91V" — per gli articoli fuori standard omette gli indici. */
export function formatSize(t: Tyre): string {
  const base = t.profile > 0 ? `${t.width}/${t.profile} R${t.radius}` : `${t.width}.00 R${t.radius}`;
  if (t.loadIndex === "-" || t.speedRating === "-") return base;
  return `${base} ${t.loadIndex}${t.speedRating}`;
}

/** Misura senza indici, usata dove serve compattezza (tabelle, filtri). */
export function formatSizeShort(t: Tyre): string {
  return t.profile > 0 ? `${t.width}/${t.profile} R${t.radius}` : `${t.width}.00 R${t.radius}`;
}

export const seasonLabels: Record<Season, string> = {
  estive: "Estive",
  invernali: "Invernali",
  "quattro-stagioni": "Quattro stagioni",
};

export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
