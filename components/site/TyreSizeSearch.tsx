"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Primitives";
import { profiles, radii, widths } from "@/lib/data/tyres";

/** Ricerca rapida per misura: costruisce la query e apre il catalogo filtrato. */
export function TyreSizeSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [width, setWidth] = useState("");
  const [profile, setProfile] = useState("");
  const [radius, setRadius] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (width) params.set("l", width);
    if (profile) params.set("s", profile);
    if (radius) params.set("r", radius);
    const query = params.toString();
    router.push(query ? `/store/catalogo?${query}` : "/store/catalogo");
  }

  return (
    <form
      onSubmit={submit}
      className={compact ? "grid gap-4 sm:grid-cols-4" : "grid gap-5 border border-line bg-surface p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8"}
    >
      <Field label="Larghezza">
        <Select value={width} onChange={(e) => setWidth(e.target.value)}>
          <option value="">Tutte</option>
          {widths.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Spallamento">
        <Select value={profile} onChange={(e) => setProfile(e.target.value)}>
          <option value="">Tutti</option>
          {profiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Raggio">
        <Select value={radius} onChange={(e) => setRadius(e.target.value)}>
          <option value="">Tutti</option>
          {radii.map((r) => (
            <option key={r} value={r}>
              R{r}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex items-end">
        <Button type="submit" size="lg" className="w-full">
          Cerca gomme
        </Button>
      </div>
    </form>
  );
}
