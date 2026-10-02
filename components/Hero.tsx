import Link from "next/link";
import { hero, site } from "@/content/site";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

const lines = ["Frig industrial și HVAC,", "de la proiect la service"]; // masked line-by-line entrance (see .line in globals.css)

export function Hero() {
  return (
    <section className="on-ink">
      <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)]">
            {lines.map((l, i) => (
              <span key={l} className="line">
                <span style={{ "--i": i } as React.CSSProperties}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="muted rise mt-6 max-w-xl text-lg" style={{ "--i": 3 } as React.CSSProperties}>
            {hero.text}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <Link href={site.cta.href} className="btn btn-red">
              {site.cta.label} <Icon name="arrow" className="ico-arrow size-5" />
            </Link>
            <a href={site.phoneHref} className="btn btn-line">
              <Icon name="phone" /> <span className="num">{site.phone}</span>
            </a>
          </div>
        </div>
        {/* LCP photo: an ink panel wipes off it and it settles; the image itself is painted from the first frame */}
        <figure className="lg:col-span-5">
          <div className="hero-media">
            <div className="hero-par">
              <Photo img={hero.image} sizes="(min-width: 1024px) 40vw, 100vw" priority className="hero-img h-auto w-full" />
            </div>
          </div>
          <figcaption className="muted rise mt-3 text-sm" style={{ "--i": 6 } as React.CSSProperties}>
            {hero.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
