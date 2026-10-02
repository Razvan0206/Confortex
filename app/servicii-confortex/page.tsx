import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/QuoteBand";
import { ServicesList } from "@/components/ServicesList";
import { extraServices, site } from "@/content/site";

export const metadata: Metadata = { title: "Servicii", description: "Consultanță, proiectare, montaj, punere în funcțiune, service și instruire pentru instalații frigorifice și HVAC, la Iași." };

export default function Page() {
  return (
    <>
      <PageHero title="Servicii" lead="Un singur furnizor pentru proiect, montaj, service și instruire.">
        <a href={site.cta.href} className="btn btn-red">
          {site.cta.label}
        </a>
      </PageHero>
      <ServicesList />
      <section className="band" aria-labelledby="extra-title">
        <div className="wrap">
          <h2 id="extra-title" className="max-w-3xl text-[clamp(1.7rem,3vw,2.5rem)]">
            Și, la cerere
          </h2>
          <ul className="mt-6 grid max-w-3xl gap-4">
            {extraServices.map((t) => (
              <li key={t} className="note">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
