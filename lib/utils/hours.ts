import { formatTime, site, type TimeRange, type WeekDay } from "@/lib/config/site";

export type OpenStatus =
  /** Officina aperta: `until` e' l'orario di chiusura della fascia in corso. */
  | { open: true; until: string }
  /**
   * Officina chiusa. `reopens.dayLabel` e' null quando la riapertura e' in
   * giornata (pausa pranzo), altrimenti contiene il nome del giorno.
   * `reopens` e' null solo se non esiste alcuna apertura in calendario.
   */
  | { open: false; reopens: { dayLabel: string | null; time: string } | null };

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function rangesFor(day: WeekDay): readonly TimeRange[] {
  return site.schedule[day];
}

/**
 * Stato di apertura calcolato sull'ora locale del dispositivo.
 * Per il prototipo e' sufficiente; se servira' il fuso fisso Europe/Rome
 * andra' introdotta una conversione esplicita.
 */
export function getOpenStatus(now: Date): OpenStatus {
  const today = now.getDay() as WeekDay;
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const [from, to] of rangesFor(today)) {
    if (minutesNow >= toMinutes(from) && minutesNow < toMinutes(to)) {
      return { open: true, until: formatTime(to) };
    }
  }

  const laterToday = rangesFor(today).find(([from]) => toMinutes(from) > minutesNow);
  if (laterToday) {
    return { open: false, reopens: { dayLabel: null, time: formatTime(laterToday[0]) } };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = ((today + offset) % 7) as WeekDay;
    const next = rangesFor(day)[0];
    if (next) {
      return {
        open: false,
        reopens: { dayLabel: site.weekdayLabels[day].toLowerCase(), time: formatTime(next[0]) },
      };
    }
  }

  return { open: false, reopens: null };
}

/** Testo pronto da mostrare accanto all'indicatore di stato. */
export function formatOpenStatus(status: OpenStatus): string {
  if (status.open) return `Aperto ora — fino alle ${status.until}`;
  if (!status.reopens) return "Chiuso";
  const { dayLabel, time } = status.reopens;
  return dayLabel ? `Chiuso — riapre ${dayLabel} alle ${time}` : `Chiuso — riapre oggi alle ${time}`;
}
