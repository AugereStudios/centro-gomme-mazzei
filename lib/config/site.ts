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
  hours: [
    { days: "Lunedi - Venerdi", morning: "8:00 - 12:00", afternoon: "14:00 - 18:00" },
    { days: "Sabato", morning: "8:00 - 12:00", afternoon: "Chiuso" },
    { days: "Domenica", morning: "Chiuso", afternoon: "Chiuso" },
  ],
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
