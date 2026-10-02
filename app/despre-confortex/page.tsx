import type { Metadata } from "next";
import { BrandsCerts } from "@/components/BrandsCerts";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteBand } from "@/components/QuoteBand";
import { Timeline } from "@/components/Timeline";
import { about, region, site } from "@/content/site";

export const metadata: Metadata = { title: "Despre noi", description: `Confortex: tehnica frigului industrial, ventilație, aer condiționat și aer comprimat, din ${site.founded}, la Iași.` };

export default function Page() {
  return (
    <>
      <PageHero title={about.title} lead={about.lead} />
      <section className="band">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="grid content-start gap-5 lg:col-span-6">
            {about.paragraphs.map((t) => (
              <p key={t} className="max-w-prose">
                {t}
              </p>
            ))}
            <p className="max-w-prose">{about.methodology}</p>
            <p className="max-w-prose font-semibold">
              Din {site.founded} (afirmație a firmei, de confirmat). Zona de lucru: {region}.
            </p>
          </div>
          <figure className="lg:col-span-6">
            <Photo img={about.image} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover" />
          </figure>
        </div>
      </section>
      <Timeline />
      <BrandsCerts />
      <QuoteBand />
    </>
  );
}
