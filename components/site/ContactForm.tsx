"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Rule, Select, Textarea } from "@/components/ui/Primitives";
import { vehicleCategories } from "@/lib/data/vehicles";

/** PLACEHOLDER DEMO — nessun invio reale: mostra solo la conferma a video. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col gap-4 border border-accent bg-surface p-8">
        <Rule />
        <h3 className="headline text-xl">Richiesta registrata</h3>
        <p className="text-sm leading-relaxed text-fg-2">
          Questo prototipo non invia messaggi: nella versione definitiva la richiesta arrivera&apos; in officina
          e riceverai una risposta entro un giorno lavorativo.
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
      <Field label="Nome e cognome">
        <Input name="nome" required placeholder="Mario Rossi" />
      </Field>
      <Field label="Telefono">
        <Input name="telefono" type="tel" required placeholder="333 1234567" />
      </Field>
      <Field label="Email">
        <Input name="email" type="email" required placeholder="mario.rossi@email.it" />
      </Field>
      <Field label="Tipo di mezzo">
        <Select name="mezzo" defaultValue="auto">
          {vehicleCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Messaggio" className="sm:col-span-2">
        <Textarea name="messaggio" rows={5} required placeholder="Misura, targa del mezzo o servizio richiesto" />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Invia richiesta
        </Button>
      </div>
    </form>
  );
}
