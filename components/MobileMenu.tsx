"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileMenu({ items, cta, phone, phoneHref }: { items: readonly { label: string; href: string }[]; cta: { label: string; href: string }; phone: string; phoneHref: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => ref.current?.showModal()} aria-label="Deschide meniul" className="flex size-12 flex-col items-center justify-center gap-[0.3125rem]">
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
      </button>
      <dialog ref={ref} aria-label="Meniu" onClick={(e) => e.target === ref.current && close()} className="menu on-ink overscroll-contain p-6">
        <form method="dialog" className="flex justify-end">
          <button aria-label="Închide meniul" className="flex size-12 items-center justify-center text-3xl leading-none">
            ×
          </button>
        </form>
        <nav aria-label="Meniu mobil">
          <ul className="mt-4 grid">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} onClick={close} className="block border-t border-ink-line py-4 text-2xl font-semibold">
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
