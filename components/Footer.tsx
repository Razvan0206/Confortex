import Link from "next/link";
import { productGroups, site } from "@/content/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="on-ink border-t border-ink-line pb-24 pt-14 xl:pb-14">
      <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo className="h-10 w-auto" />
          <p className="muted mt-3 text-sm">excelența confortului dumneavoastră</p>
          <p className="muted mt-5 max-w-sm">Frig industrial și comercial, HVAC și centrale de tratare a aerului. Livrare, montaj, service și instruire.</p>
        </div>
        <nav aria-label="Subsol">
          <h2 className="text-base font-semibold tracking-normal">Pagini</h2>
          <ul className="mt-3 grid gap-1">
            {site.nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="link muted inline-flex min-h-11 items-center hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/confidentialitate" className="link muted inline-flex min-h-11 items-center hover:text-white">
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link href="/cookie-uri" className="link muted inline-flex min-h-11 items-center hover:text-white">
                Politica de cookie-uri
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Categorii de produse">
          <h2 className="text-base font-semibold tracking-normal">Produse</h2>
          <ul className="mt-3 grid gap-1">
            {productGroups.map((g) => (
              <li key={g.id}>
                <Link href={`/produse#${g.id}`} className="link muted inline-flex min-h-11 items-center hover:text-white">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-base font-semibold tracking-normal">Contact</h2>
          <ul className="mt-3 grid gap-2">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-1 size-5 shrink-0" />
              <span>
                {site.street}, {site.city} {site.zip}
              </span>
            </li>
            <li>
              <a href={site.phoneHref} className="link flex min-h-11 items-center gap-3">
                <Icon name="phone" className="size-5 shrink-0" />
                <span className="num">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link flex min-h-11 items-center gap-3">
                <Icon name="mail" className="size-5 shrink-0" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-12 border-t border-ink-line pt-6">
        <p className="muted text-sm">
          {site.legalName} · CUI {site.cui} · {site.regCom ?? "Nr. Reg. Com.: [de completat de client]"} · Sediu: {site.street}, {site.city} {site.zip}
        </p>
        <p className="muted mt-2 text-sm">Variantă demo, în pregătire. Conținutul se confirmă cu clientul înainte de lansare.</p>
      </div>
    </footer>
  );
}
