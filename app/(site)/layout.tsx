import { PublicShell } from "@/components/site/PublicShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
