import Link from "next/link";
import { gallery } from "@/content/site";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// Three real job photos that lead to the full gallery (breaks up text-heavy pages).
export function PhotoStrip({ title }: { title: string }) {
  const picks = [gallery[0].items[0], gallery[1].items[0], gallery[0].items[7]];
  return (
    <section className="band" aria-labelledby="strip-title">
      <div className="wrap">
        <h2 id="strip-title" className="reveal max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)]">
          {title}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {picks.map((im, i) => (
            <li key={im.src} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <Link href="/proiecte#fotografii" className="zoom relative block aspect-[4/3]" aria-label={`Vezi fotografiile din lucrări: ${im.alt}`}>
                <Photo img={im} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/proiecte#fotografii" className="link mt-8 inline-flex min-h-11 items-center gap-2 font-semibold">
          Toate fotografiile din lucrări <Icon name="arrow" className="ico-arrow size-4" />
        </Link>
      </div>
    </section>
  );
}
