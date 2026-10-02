"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryGroup } from "@/content/site";
import { Icon } from "./Icon";

// Thumbnail grids per group + one native <dialog> lightbox: arrows, Escape, swipe; the open image is the only full-size one loaded.
export function Gallery({ groups }: { groups: readonly GalleryGroup[] }) {
  const flat = groups.flatMap((g) => g.items);
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const go = (d: number) => setI((x) => (x + d + flat.length) % flat.length);
  const cur = flat[i];
  const starts = groups.map((_, gi) => groups.slice(0, gi).reduce((a, g) => a + g.items.length, 0));

  return (
    <>
      <div className="grid gap-14">
        {groups.map((g, gi) => (
          <div key={g.id} id={g.id}>
            <h3 className="max-w-3xl text-[clamp(1.35rem,2.2vw,1.75rem)]">{g.title}</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((im, k) => {
                const idx = starts[gi] + k;
                return (
                  <li key={im.src} className="reveal" style={{ "--i": k % 3 } as React.CSSProperties}>
                    <button
                      type="button"
                      className="zoom relative block aspect-[4/3] w-full cursor-zoom-in bg-ink"
                      aria-label={`Mărește fotografia: ${im.alt}`}
                      onClick={() => {
                        setI(idx);
                        dialog.current?.showModal();
                      }}
                    >
                      <Image src={im.src} alt={im.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" placeholder={im.blur ? "blur" : undefined} blurDataURL={im.blur} className="object-cover" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label="Fotografii din lucrări"
        className="lightbox on-ink"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="flex h-full flex-col" style={{ touchAction: "pan-y" }}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <p className="num" aria-live="polite">
              {i + 1} / {flat.length} <span className="muted ml-3">{cur.alt}</span>
            </p>
            <form method="dialog">
              <button className="btn btn-line">Închide</button>
            </form>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="100vw" className="object-contain px-2 pb-4 md:px-20" />
            <button type="button" onClick={() => go(-1)} aria-label="Fotografia anterioară" className="btn btn-red absolute left-2 top-1/2 -translate-y-1/2 px-3 md:left-6">
              <Icon name="arrow-left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Fotografia următoare" className="btn btn-red absolute right-2 top-1/2 -translate-y-1/2 px-3 md:right-6">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
