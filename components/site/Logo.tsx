import Image from "next/image";
import Link from "next/link";
import lockup from "@/public/brand/mazzei-lockup.png";
import { site } from "@/lib/config/site";
import { classNames } from "@/lib/utils/format";

/**
 * Logo del cliente, negli originali consegnati.
 * Il lockup contiene gia' il nome esteso, quindi accanto resta solo la
 * localita': ripetere "Centro Gomme Mazzei" a fianco sarebbe un doppione.
 * Nota: il navy del marchio (#233C72) su fondo #0A0A0A ha contrasto basso.
 */
export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={classNames("group flex items-center gap-3", className)}>
      <Image
        src={lockup}
        alt={site.name}
        priority
        className="h-10 w-auto shrink-0 object-contain sm:h-12"
      />
      <span className="border-l border-line pl-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-fg-3 group-hover:text-accent">
        {site.address.city}
        <br />
        {site.address.province}
      </span>
    </Link>
  );
}
