import Link from "next/link";
import { services } from "@/content/site";
import { Icon } from "./Icon";

// Sticky heading on the left, numbered services on the right. `compact` = home version (link to the full page).
export function ServicesList({ compact = false }: { compact?: boolean }) {
  return (
    <section className="on-white band" aria-labelledby="services-title">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" className="text-[clamp(1.9rem,3.6vw,3rem)]">
              De la proiect la service, un singur furnizor
            </h2>
            <p className="muted mt-4 max-w-sm">Livrare, montare, punere în funcțiune, service în garanție și post-garanție, instruirea personalului de exploatare.</p>
            {compact && (
              <Link href="/servicii-confortex" className="link mt-6 inline-flex min-h-11 items-center gap-2 font-semibold">
                Toate serviciile <Icon name="arrow" className="size-4" />
              </Link>
            )}
          </div>
        </div>
        <ol className="grid gap-10 lg:col-span-8">
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="reveal flex gap-5">
              <span className="hex hex-badge" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl">{s.title}</h3>
                <p className="muted mt-2 max-w-2xl">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
