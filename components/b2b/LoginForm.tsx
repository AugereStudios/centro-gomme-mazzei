"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Field, Input, Rule } from "@/components/ui/Primitives";
import { useB2BStore } from "@/lib/store/b2b-store";

export function LoginForm() {
  const router = useRouter();
  const login = useB2BStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // PLACEHOLDER DEMO — nessuna verifica delle credenziali.
    login(email);
    router.push("/b2b/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 border border-line bg-surface p-6 lg:p-8">
      <div className="flex flex-col gap-3">
        <Eyebrow>Accesso rivenditori</Eyebrow>
        <Rule />
      </div>

      <Field label="Email aziendale">
        <Input
          type="email"
          name="email"
          required
          autoComplete="username"
          placeholder="ordini@tuaofficina.it"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field label="Password">
        <Input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      {/* Messaggio richiesto: l'accesso non e' self-service */}
      <div className="border-l-2 border-accent bg-ink p-4">
        <p className="text-sm leading-relaxed text-fg-2">
          L&apos;accesso richiede approvazione manuale dell&apos;amministratore.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-fg-3">
          Le nuove utenze vengono attivate dopo la verifica di partita IVA e condizioni commerciali. In questo
          prototipo qualsiasi credenziale apre la dashboard dimostrativa.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Accedi al portale
      </Button>

      <p className="text-xs leading-relaxed text-fg-3">
        Non hai ancora un accesso? Contatta l&apos;officina per richiedere l&apos;abilitazione del tuo account
        rivenditore.
      </p>
    </form>
  );
}
