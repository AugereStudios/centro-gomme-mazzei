import type { Metadata } from "next";
import { CartView } from "@/components/store/CartView";

export const metadata: Metadata = {
  title: "Carrello",
  description: "Riepilogo degli articoli selezionati prima del checkout.",
};

export default function CarrelloPage() {
  return <CartView />;
}
