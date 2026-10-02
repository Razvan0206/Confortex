import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Docs } from "@/components/Docs";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { QuoteBand } from "@/components/QuoteBand";
import { products, site } from "@/content/site";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

const find = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: p.title, description: p.lead } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const related = products.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <PageHero title={p.title} lead={p.lead}>
        <Link href={site.cta.href} className="btn btn-red">
          {site.cta.label} <Icon name="arrow" />
        </Link>
        <Link href="/produse" className="btn btn-line">
          Toate produsele
        </Link>
      </PageHero>
      <section className="band">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="grid content-start gap-8 lg:col-span-7">
            {p.specs && (
              <dl className="grid gap-px bg-line">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="grid gap-1 bg-white px-4 py-3 sm:grid-cols-[2fr_3fr] sm:gap-6">
                    <dt className="muted">{k}</dt>
                    <dd className="num font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {p.points && (
              <ul className="grid gap-3">
                {p.points.map((t) => (
                  <li key={t} className="note">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {p.brand && (
              <p>
                <span className="muted">Mărci: </span>
                <span className="font-semibold">{p.brand}</span>
              </p>
            )}
            {p.note && <p className="note">{p.note}</p>}
            <Docs items={p.docs} />
          </div>
          <figure className="bg-white p-4 lg:col-span-5">
            <Image src={p.image.src} alt={p.image.alt} width={p.image.w} height={p.image.h} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full object-contain" />
          </figure>
        </div>
      </section>
      {related.length > 0 && (
        <section className="on-white band" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="text-[clamp(1.5rem,2.6vw,2rem)]">
              Din aceeași categorie
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/produse/${r.slug}`} className="link inline-flex min-h-11 items-center font-semibold">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <QuoteBand />
    </>
  );
}
