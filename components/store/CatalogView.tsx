"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TyreCard } from "@/components/store/TyreCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Eyebrow, Field, Select } from "@/components/ui/Primitives";
import { brands, tyres } from "@/lib/data/tyres";
import { vehicleLabels } from "@/lib/data/vehicles";
import { classNames, seasonLabels } from "@/lib/utils/format";
import type { Season, VehicleClass } from "@/types";

/** Chiavi usate nella query string: l=larghezza, s=spallamento, r=raggio. */
const KEYS = ["l", "s", "r", "stagione", "marca", "veicolo", "ordine"] as const;
type FilterKey = (typeof KEYS)[number];

const allWidths = Array.from(new Set(tyres.map((t) => t.width))).sort((a, b) => a - b);
const allProfiles = Array.from(new Set(tyres.map((t) => t.profile))).sort((a, b) => a - b);
const allRadii = Array.from(new Set(tyres.map((t) => t.radius))).sort((a, b) => a - b);

export function CatalogView() {
  const router = useRouter();
  const params = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const get = (key: FilterKey) => params.get(key) ?? "";

  function setFilter(key: FilterKey, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(next.toString() ? `/store/catalogo?${next.toString()}` : "/store/catalogo", {
      scroll: false,
    });
  }

  const activeCount = KEYS.filter((k) => k !== "ordine" && get(k)).length;

  const results = useMemo(() => {
    const value = (key: FilterKey) => params.get(key) ?? "";
    const l = value("l");
    const s = value("s");
    const r = value("r");
    const stagione = value("stagione");
    const marca = value("marca");
    const veicolo = value("veicolo");
    const ordine = value("ordine");

    const list = tyres.filter((t) => {
      if (l && t.width !== Number(l)) return false;
      if (s && t.profile !== Number(s)) return false;
      if (r && t.radius !== Number(r)) return false;
      if (stagione && t.season !== (stagione as Season)) return false;
      if (marca && t.brand !== marca) return false;
      if (veicolo && t.vehicleClass !== (veicolo as VehicleClass)) return false;
      return true;
    });

    // Gli articoli su preventivo non hanno prezzo al pubblico: restano in coda.
    if (ordine === "prezzo-asc" || ordine === "prezzo-desc") {
      const direction = ordine === "prezzo-asc" ? 1 : -1;
      return [...list].sort((a, b) => {
        if (a.saleMode !== b.saleMode) return a.saleMode === "online" ? -1 : 1;
        if (a.saleMode !== "online") return 0;
        return (a.price - b.price) * direction;
      });
    }
    return list;
  }, [params]);

  const filterControls = (
    <div className="flex flex-col gap-5">
      <Field label="Larghezza">
        <Select value={get("l")} onChange={(e) => setFilter("l", e.target.value)}>
          <option value="">Tutte</option>
          {allWidths.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Spallamento">
        <Select value={get("s")} onChange={(e) => setFilter("s", e.target.value)}>
          <option value="">Tutti</option>
          {allProfiles.map((p) => (
            <option key={p} value={p}>
              {p === 0 ? "—" : p}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Raggio">
        <Select value={get("r")} onChange={(e) => setFilter("r", e.target.value)}>
          <option value="">Tutti</option>
          {allRadii.map((r) => (
            <option key={r} value={r}>
              R{r}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Stagione">
        <Select value={get("stagione")} onChange={(e) => setFilter("stagione", e.target.value)}>
          <option value="">Tutte</option>
          {Object.entries(seasonLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Marca">
        <Select value={get("marca")} onChange={(e) => setFilter("marca", e.target.value)}>
          <option value="">Tutte</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Tipo di mezzo">
        <Select value={get("veicolo")} onChange={(e) => setFilter("veicolo", e.target.value)}>
          <option value="">Tutti</option>
          {Object.entries(vehicleLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.replace("/store/catalogo", { scroll: false })}
        disabled={activeCount === 0}
      >
        Azzera filtri
      </Button>
    </div>
  );

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
      {/* Filtri */}
      <aside className="lg:col-span-3">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <p className="text-sm text-fg-2">
            <span className="font-semibold text-fg">{results.length}</span> articoli
          </p>
          <Button variant="outline" size="sm" onClick={() => setFiltersOpen((v) => !v)}>
            Filtri{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </div>

        <div
          className={classNames(
            "mt-4 border border-line bg-surface p-5 lg:sticky lg:top-24 lg:mt-0 lg:block",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
            <Eyebrow>Filtra per misura</Eyebrow>
            <span className="rule-accent" aria-hidden="true" />
          </div>
          {filterControls}
        </div>
      </aside>

      {/* Risultati */}
      <section className="lg:col-span-9">
        <div className="mb-6 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="hidden text-sm text-fg-2 lg:block">
            <span className="font-semibold text-fg">{results.length}</span> articoli disponibili
          </p>
          <div className="flex items-center gap-3 sm:ml-auto">
            <span className="eyebrow whitespace-nowrap">Ordina</span>
            <Select
              value={get("ordine")}
              onChange={(e) => setFilter("ordine", e.target.value)}
              className="w-auto min-w-44"
              aria-label="Ordinamento"
            >
              <option value="">Rilevanza</option>
              <option value="prezzo-asc">Prezzo crescente</option>
              <option value="prezzo-desc">Prezzo decrescente</option>
            </Select>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState
            level={2}
            title="Nessun articolo per questi filtri"
            description="La misura potrebbe essere disponibile su ordinazione: chiamaci in officina oppure azzera i filtri per vedere tutto il catalogo."
            action={
              <Button variant="outline" onClick={() => router.replace("/store/catalogo", { scroll: false })}>
                Azzera filtri
              </Button>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((tyre) => (
              <TyreCard key={tyre.id} tyre={tyre} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
