import Link from "next/link";
import { productGroups, products } from "@/content/site";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

export function ProductGroups() {
  return (
    <section className="band" aria-labelledby="products-title">
      <div className="wrap">
        <h2 id="products-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          Echipamente și instalații
        </h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {productGroups.map((g, i) => {
            const n = products.filter((p) => p.group === g.id).length;
            return (
              <li key={g.id} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/produse#${g.id}`} className="group on-white grid h-full sm:grid-cols-[2fr_3fr]">
                  <span className="zoom relative block min-h-48">
                    <Photo img={g.image} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw" className={g.id === "frig-adanc" ? "object-contain p-4" : "object-cover"} />
                  </span>
                  <span className="grid content-start gap-2 p-6">
                    <span className="text-xl font-semibold leading-tight">{g.title}</span>
                    <span className="muted">{g.text}</span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-ui">
                      {n} {n === 1 ? "categorie" : "categorii"} <Icon name="arrow" className="ico-arrow size-4" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
