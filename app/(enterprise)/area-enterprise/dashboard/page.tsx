import type { Metadata } from "next";
import { DashboardView } from "@/components/enterprise/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard enterprise",
  description: "Listino netto, disponibilita' e fido residuo per i clienti professionali.",
};

export default function B2BDashboardPage() {
  return <DashboardView />;
}
