"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Desktop nav with the current section marked (aria-current + animated underline). Only this tiny part is client code.
export function NavLinks({ items }: { items: readonly { label: string; href: string }[] }) {
  const path = usePathname();
  const current = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));
  return (
    <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} aria-current={current(i.href) ? "page" : undefined} className="navlink inline-flex min-h-11 items-center">
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
