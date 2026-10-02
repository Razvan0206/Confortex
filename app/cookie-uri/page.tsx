import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { legal } from "@/content/site";

export const metadata: Metadata = { title: "Politica de cookie-uri" };

export default function Page() {
  return (
    <>
      <PageHero title="Politica de cookie-uri" lead={legal.note} />
      <section className="band">
        <div className="wrap grid max-w-3xl gap-8">
          <div>
            <h2 className="text-xl">Ce folosește acest site</h2>
            <p className="mt-2">Site-ul nu folosește cookie-uri de analiză sau de marketing și nu încarcă scripturi sau conținut de la terți. Fonturile sunt servite de pe același domeniu. Harta este doar un link către Google Maps, care se deschide când îl alegeți.</p>
          </div>
          <div>
            <h2 className="text-xl">Dacă se schimbă</h2>
            <p className="mt-2">Dacă la lansare se adaugă analiză de trafic, hărți încorporate sau alte servicii care salvează date pe dispozitivul dumneavoastră, ele se vor încărca numai după acordul dumneavoastră, cu opțiuni „Accept” și „Refuz” egale ca vizibilitate, iar această pagină se actualizează.</p>
          </div>
        </div>
      </section>
    </>
  );
}
