import Image from "next/image";
import Link from "next/link";
import { productGroups, products } from "@/content/site";
import { Icon } from "./Icon";

const photo: Record<string, { src: string; alt: string }> = {
  refrigerare: { src: "/img/centrala-compresoare.jpg", alt: "Centrală frigorifică cu compresoare, într-o sală tehnică" },
  depozite: { src: "/img/camera-frig-goala.jpg", alt: "Interiorul unei camere frigorifice cu vaporizatoare" },
  hvac: { src: "/img/ahu-york-acoperis.jpg", alt: "Centrală de tratare a aerului YORK pe acoperiș" },
  "frig-adanc": { src: "/img/p-criostate.jpg", alt: "Criostat de laborator" },
};

export function ProductGroups() {
  return (
    <section className="band" aria-labelledby="products-title">
      <div className="wrap">
        <h2 id="products-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          Echipamente și instalații
        </h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {productGroups.map((g) => {
            const n = products.filter((p) => p.group === g.id).length;
            const ph = photo[g.id];
            return (
              <li key={g.id} className="reveal">
                <Link href={`/produse#${g.id}`} className="group on-white grid h-full gap-0 sm:grid-cols-[2fr_3fr]">
                  <span className="relative block min-h-48">
                    <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw" className={g.id === "frig-adanc" ? "object-contain p-4" : "object-cover"} />
                  </span>
                  <span className="grid content-start gap-2 p-6">
                    <span className="text-xl font-semibold leading-tight">{g.title}</span>
                    <span className="muted">{g.text}</span>
                    <span className="num mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-ui">
                      {n} {n === 1 ? "categorie" : "categorii"} <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
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
