/** Intervallo di apertura in formato "HH:MM". */
export type TimeRange = readonly [string, string];

/** Giorno della settimana secondo Date.getDay(): 0 = domenica, 6 = sabato. */
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const WEEKDAY_LABELS: Record<WeekDay, string> = {
  1: "Lunedi",
  2: "Martedi",
  3: "Mercoledi",
  4: "Giovedi",
  5: "Venerdi",
  6: "Sabato",
  0: "Domenica",
};

/** Ordine di visualizzazione: la settimana inizia di lunedi. */
const WEEK_ORDER: WeekDay[] = [1, 2, 3, 4, 5, 6, 0];

/**
 * Unica sorgente degli orari di apertura.
 * Da qui derivano sia la tabella mostrata a video sia lo stato "aperto ora".
 */
const schedule: Record<WeekDay, readonly TimeRange[]> = {
  1: [
    ["08:00", "12:00"],
    ["14:00", "18:00"],
  ],
  2: [
    ["08:00", "12:00"],
    ["14:00", "18:00"],
  ],
  3: [
    ["08:00", "12:00"],
    ["14:00", "18:00"],
  ],
  4: [
    ["08:00", "12:00"],
    ["14:00", "18:00"],
  ],
  5: [
    ["08:00", "12:00"],
    ["14:00", "18:00"],
  ],
  6: [["08:00", "12:00"]],
  0: [],
};

export interface HoursRow {
  days: string;
  morning: string;
  afternoon: string;
}

/** "08:00" -> "8:00" */
export function formatTime(time: string): string {
  return time.replace(/^0/, "");
}

function signature(ranges: readonly TimeRange[]): string {
  return ranges.map(([from, to]) => `${from}-${to}`).join("|");
}

function formatRange(range: TimeRange | undefined): string {
  return range ? `${formatTime(range[0])} - ${formatTime(range[1])}` : "Chiuso";
}

/** Righe della tabella orari: i giorni consecutivi con lo stesso orario vengono accorpati. */
function buildHoursRows(source: Record<WeekDay, readonly TimeRange[]>): HoursRow[] {
  const groups: { days: WeekDay[]; ranges: readonly TimeRange[] }[] = [];

  for (const day of WEEK_ORDER) {
    const ranges = source[day];
    const current = groups.at(-1);
    if (current && signature(current.ranges) === signature(ranges)) {
      current.days.push(day);
    } else {
      groups.push({ days: [day], ranges });
    }
  }

  return groups.map(({ days, ranges }) => ({
    days:
      days.length === 1
        ? WEEKDAY_LABELS[days[0]]
        : `${WEEKDAY_LABELS[days[0]]} - ${WEEKDAY_LABELS[days[days.length - 1]]}`,
    morning: formatRange(ranges[0]),
    afternoon: formatRange(ranges[1]),
  }));
}

/** Dati aziendali: unica sorgente di verita' per header, footer, contatti e metadata. */
export const site = {
  name: "Centro Gomme Mazzei",
  shortName: "Mazzei",
  claim: "Pneumatici, assetto e assistenza tecnica dal 1998",
  description:
    "Centro Gomme Mazzei a Montella (AV): vendita e montaggio pneumatici per auto, autocarri, mezzi agricoli e industriali. Convergenza 3D, bilanciatura elettronica, deposito pneumatici.",
  address: {
    street: "Contrada Baruso SNC",
    zip: "83048",
    city: "Montella",
    province: "AV",
    region: "Campania",
  },
  phone: {
    label: "350 136 5509",
    href: "tel:+393501365509",
  },
  email: "info@centrogommemazzei.it",
  /**
   * PLACEHOLDER — partita IVA reale da inserire.
   * Finche' resta vuota non viene stampata da nessuna parte.
   */
  vat: "",
  schedule,
  weekdayLabels: WEEKDAY_LABELS,
  hours: buildHoursRows(schedule),
  hoursSummary: "Lun-Sab 8:00-12:00 | Lun-Ven 14:00-18:00",
  /** Fasce orarie selezionabili per l'appuntamento in officina. */
  appointmentSlots: [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ],
} as const;

export const addressLine = `${site.address.street}, ${site.address.zip} ${site.address.city} (${site.address.province})`;
