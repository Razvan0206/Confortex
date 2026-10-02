"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Disclosure menu: a panel drops from under the header (clip-path), the burger turns into an X, links rise in one by one.
// `openPath` instead of a boolean: changing page closes the menu without an effect.
export function MobileMenu({ items, cta, phone, phoneHref }: { items: readonly { label: string; href: string }[]; cta: { label: string; href: string }; phone: string; phoneHref: string }) {
  const path = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === path;
  const button = useRef<HTMLButtonElement>(null);
  const close = () => setOpenPath(null);
  const current = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPath(null);
      button.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={button}
        type="button"
        onClick={() => setOpenPath(open ? null : path)}
        aria-label={open ? "Închide meniul" : "Deschide meniul"}
        aria-expanded={open}
        aria-controls="meniu-mobil"
        className="burger"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="mmenu-backdrop" data-open={open} onClick={close} aria-hidden />
      <div id="meniu-mobil" className="mmenu on-ink" data-open={open} inert={!open}>
        <nav aria-label="Meniu mobil" className="wrap">
          <ul className="grid">
            {items.map((i, n) => (
              <li key={i.href} style={{ "--i": n } as React.CSSProperties}>
                <Link href={i.href} onClick={close} aria-current={current(i.href) ? "page" : undefined} className="block border-t border-ink-line py-4 text-2xl font-semibold aria-[current=page]:text-brand">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 pb-8 pt-6">
            <Link href={cta.href} onClick={close} className="btn btn-red">
              {cta.label}
            </Link>
            <a href={phoneHref} className="btn btn-line">
              {phone}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
