"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "./Icon";

export function MobileMenu({ items, cta, phone, phoneHref }: { items: readonly { label: string; href: string }[]; cta: { label: string; href: string }; phone: string; phoneHref: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const close = () => ref.current?.close();
  const current = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));
  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        aria-label="Deschide meniul"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="meniu-mobil"
        className="flex size-12 items-center justify-center"
      >
        <Icon name="menu" className="size-7" />
      </button>
      <dialog
        id="meniu-mobil"
        ref={ref}
        aria-label="Meniu"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && close()}
        className="menu on-ink overscroll-contain p-6"
      >
        <form method="dialog" className="flex justify-end">
          <button aria-label="Închide meniul" className="flex size-12 items-center justify-center">
            <Icon name="close" className="size-7" />
          </button>
        </form>
        <nav aria-label="Meniu mobil">
          <ul className="mt-4 grid">
            {items.map((i, n) => (
              <li key={i.href} style={{ "--i": n } as React.CSSProperties}>
                <Link href={i.href} onClick={close} aria-current={current(i.href) ? "page" : undefined} className="block border-t border-ink-line py-4 text-2xl font-semibold aria-[current=page]:text-brand">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <Link href={cta.href} onClick={close} className="btn btn-red">
            {cta.label}
          </Link>
          <a href={phoneHref} className="btn btn-line">
            {phone}
          </a>
        </div>
      </dialog>
    </div>
  );
}
