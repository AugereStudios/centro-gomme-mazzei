import type { Metadata } from "next";
import { DashboardView } from "@/components/b2b/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard rivenditori",
  description: "Listino netto, disponibilita' e fido residuo per i clienti professionali.",
};

export default function B2BDashboardPage() {
  return <DashboardView />;
}
