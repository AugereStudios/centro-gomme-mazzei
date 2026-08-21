import { PublicShell } from "@/components/site/PublicShell";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
