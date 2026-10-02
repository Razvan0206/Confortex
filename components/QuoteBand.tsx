import { site } from "@/content/site";
import { Icon } from "./Icon";
import { QuoteForm } from "./QuoteForm";

export function QuoteBand({ id }: { id?: string }) {
  return (
    <section id={id} className="on-ink band" aria-labelledby={`${id ?? "quote"}-title`}>
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id={`${id ?? "quote"}-title`} className="text-[clamp(1.9rem,3.6vw,3rem)]">
            Cere ofertă pentru lucrarea dumneavoastră
          </h2>
          <p className="muted mt-4 max-w-md">Spuneți-ne ce aveți de răcit sau de climatizat, unde și cât de mare este spațiul. Revenim cu o ofertă personalizată.</p>
          <ul className="mt-8 grid gap-3">
            <li>
              <a href={site.phoneHref} className="link num inline-flex min-h-11 items-center gap-3 text-2xl font-semibold">
                <Icon name="phone" className="size-6" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link inline-flex min-h-11 items-center gap-3">
                <Icon name="mail" className="size-6" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-paper p-6 text-ink md:p-8 lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
