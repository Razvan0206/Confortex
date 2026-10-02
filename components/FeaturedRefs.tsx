import Link from "next/link";
import { featuredRefs } from "@/content/site";
import { Icon } from "./Icon";

export function FeaturedRefs() {
  return (
    <section className="on-white band" aria-labelledby="refs-title">
      <div className="wrap">
        <h2 id="refs-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          Lucrări care arată capacitatea echipei
        </h2>
        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {featuredRefs.map((r) => (
            <li key={r.title} className="reveal">
              <h3 className="text-xl">{r.title}</h3>
              <p className="muted mt-1">{r.client}</p>
              <p className="num mt-3 text-lg font-semibold text-brand-ui">{r.value}</p>
            </li>
          ))}
        </ul>
        <Link href="/proiecte" className="link mt-10 inline-flex min-h-11 items-center gap-2 font-semibold">
          Toate proiectele de referință <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
