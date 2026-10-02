import Image from "next/image";

// ponytail: raster logo, ceiling 223x40 px (the only file on the old site; white PNG, slogan without diacritics),
// upgrade: swap for the client's vector logo before launch.
export function Logo({ className = "" }: { className?: string }) {
  return <Image src="/logo-white.png" alt="Confortex" width={223} height={40} priority className={className} />;
}
