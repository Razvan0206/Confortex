import Image from "next/image";
import Link from "next/link";
import { hero, site } from "@/content/site";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section className="on-ink">
      <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="rise text-[clamp(2.1rem,4.6vw,3.4rem)]">{hero.title}</h1>
          <p className="muted rise mt-6 max-w-xl text-lg" style={{ "--i": 1 } as React.CSSProperties}>
            {hero.text}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href={site.cta.href} className="btn btn-red">
              {site.cta.label} <Icon name="arrow" />
            </Link>
            <a href={site.phoneHref} className="btn btn-line">
              <Icon name="phone" /> <span className="num">{site.phone}</span>
            </a>
          </div>
        </div>
        {/* no entry animation on the photo: an opacity fade would delay the LCP paint */}
        <figure className="lg:col-span-5">
          <Image src={hero.image.src} alt={hero.image.alt} width={hero.image.w} height={hero.image.h} priority quality={65} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />
          <figcaption className="muted mt-3 text-sm">{hero.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
