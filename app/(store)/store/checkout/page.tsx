import type { Metadata } from "next";
import { CheckoutView } from "@/components/store/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Scegli tra spedizione a domicilio e montaggio in officina con bilanciatura elettronica: il sovrapprezzo dipende dal raggio del pneumatico.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
