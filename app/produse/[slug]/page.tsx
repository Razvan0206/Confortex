import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Docs } from "@/components/Docs";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteBand } from "@/components/QuoteBand";
import { productGroups, products, site } from "@/content/site";

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
  const group = productGroups.find((g) => g.id === p.group)!;
  const related = products.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);
  const crumbs = [
    { name: "Acasă", href: "/" },
    { name: "Produse", href: "/produse" },
    { name: group.title, href: `/produse#${group.id}` },
    { name: p.title, href: `/produse/${p.slug}` },
  ];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.href })),
  };
  return (
    <>
      <PageHero title={p.title} lead={p.lead}>
        <Link href={site.cta.href} className="btn btn-red">
          {site.cta.label} <Icon name="arrow" className="ico-arrow size-5" />
        </Link>
        <Link href="/produse" className="btn btn-line">
          Toate produsele
        </Link>
      </PageHero>
      <section className="band">
        <div className="wrap">
          <nav aria-label="Poziția în site" className="muted mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-x-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-x-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.href} className="link inline-flex min-h-11 items-center">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="zoom order-first self-start bg-white p-4 lg:order-last lg:col-span-5">
              <ViewTransition name={`prod-${p.slug}`} share="prod-morph" default="none">
                <Photo img={p.image} sizes="(min-width: 1024px) 40vw, 100vw" priority className="h-auto w-full object-contain" />
              </ViewTransition>
            </figure>
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
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="on-white band" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="text-[clamp(1.5rem,2.6vw,2rem)]">
              Din aceeași categorie
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/produse/${r.slug}`} className="group block">
                    <span className="zoom block bg-paper p-3">
                      <Photo img={r.image} sizes="(min-width: 640px) 30vw, 100vw" className="aspect-[16/9] w-full object-contain" />
                    </span>
                    <span className="mt-3 block text-lg font-semibold leading-tight group-hover:underline">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <QuoteBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
