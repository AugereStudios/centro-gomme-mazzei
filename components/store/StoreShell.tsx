import { StoreFooter } from "@/components/store/StoreFooter";
import { StoreHeader } from "@/components/store/StoreHeader";

/** Guscio del livello negozio: intestazione e footer propri, distinti dalla vetrina. */
export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </>
  );
}
