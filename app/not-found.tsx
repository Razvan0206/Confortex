import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <PageHero title="Pagina nu a fost găsită" lead="Adresa nu există sau a fost mutată.">
      <Link href="/" className="btn btn-red">
        Înapoi la prima pagină
      </Link>
      <Link href="/produse" className="btn btn-line">
        Produse
      </Link>
      <a href={site.phoneHref} className="btn btn-line">
        <span className="num">{site.phone}</span>
      </a>
    </PageHero>
  );
}
