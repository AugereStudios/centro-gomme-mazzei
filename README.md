| Anagrafica, ordini e convenzioni B2B | `lib/data/b2b.ts` | Sessione, movimenti, convenzione flotta e offerte della landing enterprise. |# Centro Gomme Mazzei — prototipo frontend

Prototipo **frontend-only** (nessun backend, nessun database) in Next.js 16 / App Router, TypeScript e
Tailwind CSS v4. Tutti i dati sono mock locali.

```bash
npm install
npm run dev
```

## Superfici

| Area | Rotte |
| --- | --- |
| Sito vetrina | `/`, `/chi-siamo`, `/prodotti`, `/prodotti/[marca]`, `/servizi`, `/contatti` |
| Store B2C | `/store`, `/store/catalogo`, `/store/pneu/[id]`, `/store/carrello`, `/store/checkout` |
| Area enterprise | `/area-enterprise`, `/area-enterprise/login`, `/area-enterprise/dashboard` |

Le tre aree sono livelli separati, in route group distinti — `app/(site)`, `app/(store)`,
`app/(enterprise)` — ognuno con il proprio guscio: la vetrina usa `SiteHeader`/`SiteFooter`, il negozio
`StoreShell` (il carrello vive solo lì), l'area enterprise ha header proprio e footer in variante ridotta.

"B2B" nel codice (`lib/data/b2b.ts`, `lib/store/b2b-store.ts`, tipi `B2BSession`) indica il canale
commerciale — prezzi netti, fido, RiBa; "area enterprise" è il nome che quell'area ha nell'interfaccia.

## Dove si innestano i dati reali

| Cosa | File | Nota |
| --- | --- | --- |
| Listino sovrapprezzi montaggio | `lib/config/pricing.ts` | **Placeholder.** Unica sorgente dei valori R15–R22, delle spese di spedizione e dell'IVA. La UI usa solo `getMountingFee()` e `getShipping()`. |
| Catalogo articoli | `lib/data/tyres.ts` | Mock con la stessa forma di `types/index.ts`; da sostituire con la risposta della API fornitore. |
| Dati aziendali (NAP, orari) | `lib/config/site.ts` | Riusati da header, footer, contatti, checkout e metadata. |
| Anagrafica e ordini B2B | `lib/data/b2b.ts` | Sessione e movimenti dimostrativi. |
| Schede dei marchi | `lib/data/brands.ts` | Solo il testo editoriale è scritto a mano: articoli, misure, stagioni e prezzi delle schede `/prodotti` sono derivati dal catalogo. |

## Testi segnaposto

Marcati con `PLACEHOLDER` nel file che li contiene, da sostituire con i contenuti reali:
profilo aziendale e percorso in `app/(site)/chi-siamo/page.tsx`, posizionamento dei marchi in
`lib/data/brands.ts`, indicazioni stradali in `app/(site)/contatti/page.tsx`, tariffe di montaggio in
`lib/config/pricing.ts`, partita IVA in `lib/config/site.ts`.

## Logo

`public/brand/` contiene lockup e monogramma consegnati dal cliente, usati senza ritocchi; il monogramma
serve anche da favicon (`app/icon.png`). Il navy del marchio (`#233C72`) sul fondo `#0A0A0A` ha un
contrasto di circa 2:1: scelta voluta, la variante per fondi scuri non è stata prodotta.

## Stato applicativo

Zustand con middleware `persist` (localStorage). Entrambi gli store sono **placeholder dimostrativi**,
marcati come tali in testa al file:

- `lib/store/cart-store.ts` — righe carrello, modalita' di consegna, ultimo ordine simulato.
- `lib/store/b2b-store.ts` — sessione B2B finta: il login accetta qualsiasi credenziale.

Il calcolo dei totali non vive negli store ma in `lib/cart/totals.ts` (`computeTotals`), funzione pura e
unico punto in cui il carrello diventa un totale:

```
totale = pneumatici + (consegna === "officina" ? Σ getMountingFee(raggio) × qty : 0) + spedizione
```

I componenti che leggono gli store persistiti usano `lib/hooks/use-hydrated.ts` per non divergere dal
markup generato in build.

## Design system

Token definiti una sola volta in `app/globals.css` (blocco `@theme`): sfondo `#0A0A0A`, accento
`#C0392B`, testi `#FFFFFF / #9A9A9A / #5C5C5C`, bordi `#2A2A2A`, raggio `2px`, font Inter.
Le classi editoriali condivise (`.eyebrow`, `.headline`, `.rule-accent`, `.bullet-accent`,
`.hairline-grid`, `.grid-texture`) stanno nello stesso file; le primitive UI in `components/ui/`.

## Verifiche

```bash
npx tsc --noEmit
npx eslint .
npm run build
```
