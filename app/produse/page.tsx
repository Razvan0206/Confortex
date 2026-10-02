import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteBand } from "@/components/QuoteBand";
import { productGroups, products } from "@/content/site";

export const metadata: Metadata = { title: "Produse", description: "Agregate, compresoare, centrale frigorifice, camere din panouri sandwich, chillere, rooftop-uri, centrale de tratare a aerului și frig adânc." };

export default function Page() {
  return (
    <>
      <PageHero title="Produse" lead="Echipamente și instalații pentru frig industrial și comercial, depozite frigorifice și climatizare. Pentru fiecare aplicație elaborăm o ofertă personalizată." />
      <nav aria-label="Categorii de produse" className="on-white z-30 border-b border-line md:sticky md:top-[4.25rem]">
        <ul className="wrap flex gap-x-6 overflow-x-auto py-1 text-[0.95rem] font-medium">
          {productGroups.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="link inline-flex min-h-11 items-center">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {productGroups.map((g, gi) => (
        <section key={g.id} id={g.id} className={`band ${gi % 2 ? "on-white" : ""}`} aria-labelledby={`${g.id}-title`}>
          <div className="wrap">
            <h2 id={`${g.id}-title`} className="max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)]">
              {g.title}
            </h2>
            <p className="muted mt-3 max-w-2xl">{g.text}</p>
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((p) => p.group === g.id)
                .map((p, i) => (
                  <li key={p.slug} className="reveal" style={{ "--i": i % 3 } as React.CSSProperties}>
                    <Link href={`/produse/${p.slug}`} className="group block">
                      <span className="zoom block bg-white p-3">
                        {/* shared element: this photo morphs into the one on the product page */}
                        <ViewTransition name={`prod-${p.slug}`} share="prod-morph" default="none">
                          <Photo img={p.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="aspect-[16/9] w-full object-contain" />
                        </ViewTransition>
                      </span>
                      <span className="mt-4 block text-xl font-semibold leading-tight group-hover:underline">{p.title}</span>
                      {p.brand && <span className="muted mt-1 block text-sm">{p.brand}</span>}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}
      <QuoteBand />
    </>
  );
}
