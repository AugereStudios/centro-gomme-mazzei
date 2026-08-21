"use client";

import { useMemo, useState } from "react";
import { TotalsRows } from "@/components/store/TotalsRows";
import { ButtonLink, Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge, Eyebrow, Field, Input, Panel, Rule, Select, SpecRow } from "@/components/ui/Primitives";
import { computeTotals } from "@/lib/cart/totals";
import { FREE_SHIPPING_THRESHOLD, MOUNTING_INCLUDES, SHIPPING_FLAT } from "@/lib/config/pricing";
import { site } from "@/lib/config/site";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { useCartStore } from "@/lib/store/cart-store";
import { classNames, formatEUR, formatSizeShort } from "@/lib/utils/format";
import type { DeliveryMethod } from "@/types";

interface Confirmation {
  orderId: string;
  method: DeliveryMethod;
  total: number;
  appointment: { date: string; slot: string } | null;
}

export function CheckoutView() {
  const hydrated = useHydrated();
  const lines = useCartStore((s) => s.lines);
  const deliveryMethod = useCartStore((s) => s.deliveryMethod);
  const setDeliveryMethod = useCartStore((s) => s.setDeliveryMethod);
  const clear = useCartStore((s) => s.clear);
  const setLastOrderId = useCartStore((s) => s.setLastOrderId);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentSlot, setAppointmentSlot] = useState<string>(site.appointmentSlots[0]);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const totals = useMemo(() => computeTotals(lines, deliveryMethod), [lines, deliveryMethod]);
  const today = new Date().toISOString().slice(0, 10);

  if (!hydrated) {
    return <div className="container-page py-16 text-sm text-fg-3">Caricamento checkout...</div>;
  }

  if (confirmation) {
    return <ConfirmationScreen confirmation={confirmation} />;
  }

  if (totals.items.length === 0) {
    return (
      <div className="container-page py-16 lg:py-24">
        <EmptyState
          className="max-w-xl"
          title="Nessun articolo da ordinare"
          description="Aggiungi almeno un pneumatico al carrello per completare l'ordine."
          action={
            <ButtonLink href="/store/catalogo" size="lg">
              Vai al catalogo
            </ButtonLink>
          }
        />
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const orderId = `WEB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmation({
      orderId,
      method: deliveryMethod,
      total: totals.total,
      appointment:
        deliveryMethod === "officina" ? { date: appointmentDate, slot: appointmentSlot } : null,
    });
    setLastOrderId(orderId);
    clear();
  }

  return (
    <form onSubmit={handleSubmit} className="container-page grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
      <div className="flex flex-col gap-10 lg:col-span-7">
        <div className="flex flex-col gap-4">
          <Eyebrow>Checkout</Eyebrow>
          <Rule />
          <h1 className="headline text-3xl">Completa l&apos;ordine</h1>
        </div>

        {/* Dati cliente */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4 border-b border-line pb-3">
            <span className="eyebrow">01</span>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em]">Dati del cliente</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome">
              <Input name="nome" required placeholder="Mario" />
            </Field>
            <Field label="Cognome">
              <Input name="cognome" required placeholder="Rossi" />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" required placeholder="mario.rossi@email.it" />
            </Field>
            <Field label="Telefono">
              <Input name="telefono" type="tel" required placeholder="333 1234567" />
            </Field>
          </div>
        </section>

        {/* Modalita' di consegna */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4 border-b border-line pb-3">
            <span className="eyebrow">02</span>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em]">Consegna</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DeliveryCard
              selected={deliveryMethod === "spedizione"}
              onSelect={() => setDeliveryMethod("spedizione")}
              title="Spedizione a domicilio"
              price={
                totals.subtotal >= FREE_SHIPPING_THRESHOLD ? "Gratuita" : formatEUR(SHIPPING_FLAT)
              }
              description="Consegna in 24/48 ore all'indirizzo indicato. Il montaggio resta a tuo carico."
            />
            <DeliveryCard
              selected={deliveryMethod === "officina"}
              onSelect={() => setDeliveryMethod("officina")}
              title="Montaggio in officina"
              price={formatEUR(totals.mountingTotal || totals.items.reduce((s, i) => s + i.mountingFee * i.qty, 0))}
              description="Ritiro presso la nostra sede con montaggio e bilanciatura elettronica inclusi."
              badge="Consigliato"
            />
          </div>

          {deliveryMethod === "spedizione" ? (
            <div className="grid gap-5 border border-line bg-surface p-5 sm:grid-cols-2 lg:p-6">
              <Field label="Indirizzo" className="sm:col-span-2">
                <Input name="indirizzo" required placeholder="Via Roma 1" />
              </Field>
              <Field label="CAP">
                <Input name="cap" required placeholder="83048" inputMode="numeric" />
              </Field>
              <Field label="Citta'">
                <Input name="citta" required placeholder="Montella" />
              </Field>
              <Field label="Provincia">
                <Input name="provincia" required placeholder="AV" maxLength={2} />
              </Field>
              <Field label="Note per il corriere">
                <Input name="note" placeholder="Citofono, orari..." />
              </Field>
            </div>
          ) : (
            <div className="flex flex-col gap-6 border border-line bg-surface p-5 lg:p-6">
              <div className="flex flex-col gap-3">
                <Eyebrow>Sovrapprezzo per raggio</Eyebrow>
                <ul className="flex flex-col">
                  {totals.items.map((item) => (
                    <li
                      key={item.tyre.id}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2 text-sm last:border-b-0"
                    >
                      <span className="text-fg-2">
                        <span className="font-semibold text-fg">R{item.tyre.radius}</span>{" "}
                        {formatSizeShort(item.tyre)} — {formatEUR(item.mountingFee)} x {item.qty}
                      </span>
                      <span className="font-semibold text-accent">{formatEUR(item.lineMounting)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-fg-3">
                  {MOUNTING_INCLUDES.join(" · ")}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Data appuntamento" hint={`Officina: ${site.hoursSummary}`}>
                  <Input
                    type="date"
                    name="data"
                    required
                    min={today}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </Field>
                <Field label="Fascia oraria">
                  <Select
                    name="fascia"
                    value={appointmentSlot}
                    onChange={(e) => setAppointmentSlot(e.target.value)}
                  >
                    {site.appointmentSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          )}
        </section>

        {/* Pagamento */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4 border-b border-line pb-3">
            <span className="eyebrow">03</span>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em]">Pagamento</h2>
          </div>
          <p className="border border-line bg-surface p-5 text-sm leading-relaxed text-fg-2">
            Prototipo dimostrativo: nessun pagamento viene realmente elaborato. Alla conferma vedrai un numero
            d&apos;ordine simulato.
          </p>
        </section>
      </div>

      {/* Riepilogo */}
      <aside className="lg:col-span-5">
        <Panel className="flex flex-col gap-6 p-6 lg:sticky lg:top-24 lg:p-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Riepilogo ordine</Eyebrow>
            <Rule />
          </div>

          <ul className="flex flex-col gap-3">
            {totals.items.map((item) => (
              <li key={item.tyre.id} className="flex justify-between gap-4 border-b border-line pb-3 text-sm">
                <span className="text-fg-2">
                  <span className="font-semibold text-fg">{item.qty}x</span> {item.tyre.brand} {item.tyre.model}
                  <br />
                  <span className="text-xs text-fg-3">{formatSizeShort(item.tyre)}</span>
                </span>
                <span className="whitespace-nowrap font-semibold">{formatEUR(item.lineTotal)}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col">
            <TotalsRows
              totals={totals}
              method={deliveryMethod}
              labels={{
                subtotal: "Imponibile pneumatici",
                mounting: "Montaggio + bilanciatura",
                mountingOff: "Non applicato",
              }}
            />
            <SpecRow label="di cui IVA 22%" value={formatEUR(totals.vat)} />
          </div>

          <div className="flex items-baseline justify-between gap-4 border-t-2 border-accent pt-4">
            <span className="eyebrow">Totale</span>
            <span className="headline text-2xl">{formatEUR(totals.total)}</span>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Conferma ordine
          </Button>
          <ButtonLink href="/store/carrello" variant="ghost" size="sm" className="w-full">
            Torna al carrello
          </ButtonLink>
        </Panel>
      </aside>
    </form>
  );
}

function DeliveryCard({
  selected,
  onSelect,
  title,
  price,
  description,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: string;
  description: string;
  badge?: string;
}) {
  return (
    <label
      className={classNames(
        "flex cursor-pointer flex-col gap-3 border p-5 transition-colors",
        selected ? "border-accent bg-surface" : "border-line bg-surface hover:border-fg-3",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex items-center gap-3">
          <input
            type="radio"
            name="consegna"
            checked={selected}
            onChange={onSelect}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="text-sm font-semibold">{title}</span>
        </span>
        {badge ? <Badge tone="accent">{badge}</Badge> : null}
      </div>
      <span className="headline text-xl text-accent">{price}</span>
      <span className="text-xs leading-relaxed text-fg-2">{description}</span>
    </label>
  );
}

function ConfirmationScreen({ confirmation }: { confirmation: Confirmation }) {
  return (
    <div className="container-page py-16 lg:py-24">
      <div className="flex max-w-2xl flex-col gap-6 border border-line bg-surface p-8 lg:p-12">
        <Rule />
        <Eyebrow>Ordine confermato</Eyebrow>
        <h1 className="headline text-3xl">Grazie, abbiamo registrato la richiesta.</h1>

        <div className="flex flex-col">
          <SpecRow label="Numero ordine" value={confirmation.orderId} strong />
          <SpecRow
            label="Modalita'"
            value={
              confirmation.method === "officina"
                ? "Montaggio in officina con bilanciatura"
                : "Spedizione a domicilio"
            }
          />
          {confirmation.appointment ? (
            <SpecRow
              label="Appuntamento"
              value={`${formatDateIt(confirmation.appointment.date)} — ${confirmation.appointment.slot}`}
              accent
              strong
            />
          ) : null}
          <SpecRow label="Totale" value={formatEUR(confirmation.total)} strong />
        </div>

        <p className="text-sm leading-relaxed text-fg-2">
          {confirmation.method === "officina"
            ? `Ti aspettiamo in ${site.address.street}, ${site.address.city}. Porta con te il numero d'ordine.`
            : "Riceverai il codice di tracciamento appena il corriere ritira il pacco."}
        </p>
        <p className="text-xs text-fg-3">
          Prototipo dimostrativo: nessun ordine reale e&apos; stato inviato e nessun pagamento e&apos; stato
          elaborato.
        </p>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/store/catalogo" size="lg">
            Torna al catalogo
          </ButtonLink>
          <ButtonLink href="/" variant="outline" size="lg">
            Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function formatDateIt(value: string): string {
  if (!value) return "Da concordare";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
