import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { legal, site } from "@/content/site";

export const metadata: Metadata = { title: "Politica de confidențialitate" };

export default function Page() {
  return (
    <>
      <PageHero title="Politica de confidențialitate" lead={legal.note} />
      <section className="band">
        <div className="wrap grid max-w-3xl gap-8">
          <div>
            <h2 className="text-xl">Operatorul datelor</h2>
            <p className="mt-2">
              {site.legalName}, CUI {site.cui}, cu sediul în {site.street}, {site.city} {site.zip}. Contact pentru protecția datelor: {site.email}.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Ce date prelucrăm și de ce</h2>
            <p className="mt-2">
              Formularul de cerere de ofertă va colecta numele, firma, telefonul, e-mailul și descrierea cererii, doar pentru a vă răspunde la cerere și a vă trimite o ofertă. În varianta demo formularul este inactiv și nu se colectează nicio dată.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Temei, durată, destinatari</h2>
            <p className="mt-2">Temeiul juridic, durata de păstrare și furnizorul care primește mesajele (serviciul de e-mail) se stabilesc cu firma înainte de lansare. Aici vor veni aceste informații [de completat de client].</p>
          </div>
          <div>
            <h2 className="text-xl">Drepturile dumneavoastră</h2>
            <p className="mt-2">
              Aveți dreptul de acces, rectificare, ștergere, restricționare, opoziție și portabilitate. Le puteți exercita scriind la {site.email}. Vă puteți adresa și Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
