"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false durante il render sul server e nel primo render di idratazione,
 * true da li' in poi. Serve ai componenti che leggono gli store persistiti su
 * localStorage (badge carrello, riepiloghi, sessione B2B) per non produrre
 * markup diverso da quello generato in fase di build.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
