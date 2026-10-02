import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/QuoteBand";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: `Confortex, ${site.street}, ${site.city}. Telefon ${site.phone}, e-mail ${site.email}.` };

export default function Page() {
  return (
    <>
      <PageHero title="Contact" lead="Sunați-ne sau trimiteți o cerere de ofertă. Un inginer vă răspunde." />
      <section className="band" aria-label="Date de contact">
        <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-xl">Sediu central</h2>
            <p className="mt-3 flex gap-3">
              <Icon name="pin" className="mt-1 size-5 shrink-0 text-brand-ui" />
              <span>
                {site.street}
                <br />
                {site.city} {site.zip}, România
              </span>
            </p>
            <a href={site.mapsUrl} className="link mt-3 inline-flex min-h-11 items-center gap-2 font-semibold" target="_blank" rel="noopener noreferrer">
              Deschide în Google Maps <Icon name="arrow" className="ico-arrow size-4" />
            </a>
          </div>
          <div>
            <h2 className="text-xl">Telefon și e-mail</h2>
            <ul className="mt-3 grid gap-1">
              <li>
                <a href={site.phoneHref} className="link num inline-flex min-h-11 items-center gap-3 text-xl font-semibold">
                  <Icon name="phone" className="size-5 text-brand-ui" /> {site.phone}
                </a>
              </li>
              <li className="muted num pl-8">Fax: {site.fax}</li>
              <li>
                <a href={`mailto:${site.email}`} className="link inline-flex min-h-11 items-center gap-3">
                  <Icon name="mail" className="size-5 text-brand-ui" /> {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Program</h2>
            <p className="mt-3">{site.hours ?? "Aici va veni programul de lucru și, dacă există, programul pentru intervenții urgente [de completat de client]."}</p>
          </div>
        </div>
      </section>
      <QuoteBand id="oferta" />
    </>
  );
}
