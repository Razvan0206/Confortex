import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/QuoteBand";
import { gallery, otherClients, referenceGroups, region } from "@/content/site";

export const metadata: Metadata = { title: "Proiecte de referință", description: "Lucrări de refrigerare, HVAC, chillere și aer comprimat executate de Confortex în Iași și în regiune." };

export default function Page() {
  return (
    <>
      <PageHero title="Proiecte de referință" lead={`Lucrări executate în ${region}. Listă preluată de pe site-ul anterior; denumirile se confirmă cu clientul.`} />
      <nav aria-label="Domenii de proiecte" className="on-white sticky top-[4.25rem] z-30 border-b border-line">
        <ul className="wrap flex gap-x-6 overflow-x-auto py-1 text-[0.95rem] font-medium">
          {referenceGroups.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="link inline-flex min-h-11 items-center">
                {g.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a href="#fotografii" className="link inline-flex min-h-11 items-center">
              Fotografii
            </a>
          </li>
        </ul>
      </nav>
      {referenceGroups.map((g, gi) => (
        <section key={g.id} id={g.id} className={`band ${gi % 2 ? "on-white" : ""}`} aria-labelledby={`${g.id}-title`}>
          <div className="wrap">
            <h2 id={`${g.id}-title`} className="max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)]">
              {g.title}
            </h2>
            <p className="muted mt-3 max-w-2xl">{g.intro}</p>
            <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {g.items.map((r) => (
                <li key={r.client + r.what} className={gi % 2 ? "" : "bg-white p-5"}>
                  <h3 className="text-lg">{r.client}</h3>
                  <p className="muted mt-1">{r.what}</p>
                  {"spec" in r && r.spec && <p className="num mt-2 font-semibold text-brand-ui">{r.spec}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="band" aria-labelledby="clients-title">
        <div className="wrap">
          <h2 id="clients-title" className="text-[clamp(1.5rem,2.6vw,2rem)]">
            Alți clienți
          </h2>
          <p className="mt-4 max-w-4xl">{otherClients.join(" · ")}</p>
        </div>
      </section>
      <section id="fotografii" className="on-white band" aria-labelledby="photos-title">
        <div className="wrap">
          <h2 id="photos-title" className="max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)]">
            Lucrări în imagini
          </h2>
          <p className="muted mt-3 max-w-2xl">Fotografii din lucrările Confortex, preluate de pe site-ul anterior. Apăsați pe o fotografie pentru a o mări.</p>
          <div className="mt-10">
            <Gallery groups={gallery} />
          </div>
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
