import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="on-ink sticky top-0 z-40 border-b border-ink-line" style={{ viewTransitionName: "site-header" }}>
      <div className="wrap flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="Confortex, prima pagină">
          <Logo className="h-8 w-auto" />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <NavLinks items={site.nav} />
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 px-2 font-semibold lg:flex" aria-label={`Sună la ${site.phone}`}>
            <Icon name="phone" />
            <span className="num hidden text-[0.95rem] xl:inline">{site.phone}</span>
          </a>
          <Link href={site.cta.href} className="btn btn-red hidden lg:inline-flex">
            {site.cta.label}
          </Link>
          <MobileMenu items={site.nav} cta={site.cta} phone={site.phone} phoneHref={site.phoneHref} />
        </div>
      </div>
    </header>
  );
}
