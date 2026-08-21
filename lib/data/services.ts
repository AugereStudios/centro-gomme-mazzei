export interface Service {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  lead: string;
  body: string;
  points: string[];
  /** Indicazione di durata media dell'intervento, mostrata come dato tecnico. */
  duration: string;
}

export const services: Service[] = [
  {
    slug: "convergenza-3d",
    index: "01",
    title: "Convergenza 3D",
    eyebrow: "Assetto ruote",
    lead: "Allineamento computerizzato con rilevamento tridimensionale su tutti e quattro gli assi.",
    body: "Le telecamere leggono i target applicati alle ruote e restituiscono i valori reali di convergenza, campanatura e incidenza, confrontati con i dati del costruttore. La regolazione elimina il consumo irregolare del battistrada e il tiraggio dello sterzo, riducendo il consumo di carburante.",
    points: [
      "Banco 3D a otto telecamere",
      "Confronto con scheda tecnica del costruttore",
      "Stampa del rapporto prima/dopo",
      "Verifica altezza di assetto e usura sospensioni",
    ],
    duration: "45 - 60 minuti",
  },
  {
    slug: "bilanciatura-elettronica",
    index: "02",
    title: "Bilanciatura elettronica",
    eyebrow: "Equilibratura",
    lead: "Equilibratrice elettronica di precisione per eliminare vibrazioni al volante e usura anomala.",
    body: "Ogni ruota viene misurata a velocita' di rotazione controllata: la macchina individua posizione ed entita' dello squilibrio e indica il contrappeso esatto da applicare. Su cerchi in lega utilizziamo pesi adesivi interni per non alterare l'estetica del cerchio.",
    points: [
      "Precisione al grammo",
      "Pesi adesivi interni per cerchi in lega",
      "Controllo eccentricita' del cerchio",
      "Compresa nel servizio di montaggio",
    ],
    duration: "10 minuti a ruota",
  },
  {
    slug: "deposito-pneumatici",
    index: "03",
    title: "Deposito pneumatici",
    eyebrow: "Stagionale",
    lead: "Custodia del treno di gomme non in uso in magazzino climatizzato, con etichettatura nominale.",
    body: "Al cambio stagionale ritiriamo il treno smontato, lo laviamo, ne verifichiamo lo stato e lo conserviamo in rastrelliera al riparo da luce e umidita'. Alla riconsegna trovi le gomme pronte al montaggio, con la posizione di provenienza gia' annotata per la rotazione corretta.",
    points: [
      "Magazzino asciutto e ventilato",
      "Lavaggio e controllo usura inclusi",
      "Etichetta con posizione di provenienza",
      "Promemoria al cambio stagione",
    ],
    duration: "Servizio stagionale",
  },
  {
    slug: "montaggio",
    index: "04",
    title: "Montaggio e riparazione",
    eyebrow: "Officina",
    lead: "Smontaggio, montaggio e serraggio a coppia con smontagomme automatico senza leva.",
    body: "Lavoriamo su cerchi in acciaio e in lega, misure ribassate e run-flat, con attrezzatura che non intacca il canale del cerchio. Eseguiamo riparazioni a fungo sulla zona battistrada quando il danno rientra nei limiti di sicurezza, sostituzione valvole e ripristino sensori TPMS.",
    points: [
      "Smontagomme automatico senza leva",
      "Gestione run-flat e ribassati",
      "Riparazione a fungo su battistrada",
      "Programmazione sensori TPMS",
    ],
    duration: "30 - 45 minuti a treno",
  },
];
