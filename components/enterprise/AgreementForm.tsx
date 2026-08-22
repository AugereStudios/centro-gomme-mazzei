"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Rule, Select, Textarea } from "@/components/ui/Primitives";

/** PLACEHOLDER DEMO — nessun invio reale: mostra solo la conferma a video. */
export function AgreementForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col gap-4 border border-accent bg-surface p-8">
        <Rule />
        <h3 className="headline text-xl">Richiesta registrata</h3>
        <p className="text-sm leading-relaxed text-fg-2">
          Questo prototipo non invia nulla. Nella versione definitiva la richiesta arriva in officina e ti
          richiamiamo per concordare sconto, fido e modalita&apos; di pagamento; l&apos;utenza viene poi
          abilitata a mano.
        </p>
        <Button variant="outline" className="self-start" onClick={() => setSent(false)}>
          Compila un&apos;altra richiesta
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 border border-line bg-surface p-6 sm:grid-cols-2 lg:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Field label="Ragione sociale" className="sm:col-span-2">
        <Input name="ragioneSociale" required placeholder="Autofficina Rossi S.r.l." />
      </Field>
      <Field label="Partita IVA">
        <Input name="partitaIva" required placeholder="01234567890" inputMode="numeric" />
      </Field>
      <Field label="Referente">
        <Input name="referente" required placeholder="Nome e cognome" />
      </Field>
      <Field label="Email">
        <Input name="email" type="email" required placeholder="ordini@azienda.it" />
      </Field>
      <Field label="Telefono">
        <Input name="telefono" type="tel" required placeholder="333 1234567" />
      </Field>
      <Field label="Tipo di richiesta">
        <Select name="tipo" defaultValue="flotta">
          <option value="flotta">Convenzione flotta</option>
          <option value="rivenditore">Condizioni rivenditore</option>
          <option value="entrambe">Entrambe</option>
        </Select>
      </Field>
      <Field label="Mezzi o volumi" hint="Numero di mezzi in flotta oppure pneumatici acquistati in un anno">
        <Input name="volumi" placeholder="Es. 18 furgoni" />
      </Field>
      <Field label="Note" className="sm:col-span-2">
        <Textarea
          name="note"
          rows={4}
          placeholder="Misure ricorrenti, stagionalita', esigenze di fermo macchina"
        />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Invia richiesta
        </Button>
      </div>
    </form>
  );
}
