import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "./Icon";

// Phone and quote stay one tap away on small screens.
export function ActionBar() {
  return (
    <div className="actionbar on-ink fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px border-t border-ink-line pb-[env(safe-area-inset-bottom)] xl:hidden">
      <a href={site.phoneHref} className="flex min-h-14 items-center justify-center gap-2 font-semibold">
        <Icon name="phone" /> Sună acum
      </a>
      <Link href={site.cta.href} className="flex min-h-14 items-center justify-center bg-brand-ui font-semibold">
        {site.cta.label}
      </Link>
    </div>
  );
}
