import Image from "next/image";
import { domains } from "@/content/site";

// 7/5 then 5/7: asymmetric on desktop, single column on mobile.
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Domains() {
  return (
    <section className="band" aria-labelledby="domains-title">
      <div className="wrap">
        <h2 id="domains-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          Pentru cine lucrăm
        </h2>
        <ul className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {domains.map((d, i) => (
            <li key={d.title} className={`reveal ${span[i]}`}>
              <Image src={d.image.src} alt={d.image.alt} width={d.image.w} height={d.image.h} sizes="(min-width: 1024px) 55vw, 100vw" className="h-56 w-full object-cover lg:h-72" />
              <h3 className="mt-5 text-2xl">{d.title}</h3>
              <p className="muted mt-2 max-w-xl">{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
