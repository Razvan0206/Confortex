import { domains } from "@/content/site";
import { Photo } from "./Photo";

// One large tile (the heaviest segment) next to three compact rows: asymmetric, and shorter than four equal photo tiles.
export function Domains() {
  const [lead, ...rest] = domains;
  return (
    <section className="band" aria-labelledby="domains-title">
      <div className="wrap">
        <h2 id="domains-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          Pentru cine lucrăm
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="reveal lg:col-span-7">
            <div className="zoom relative h-64 sm:h-80 lg:h-[26rem]">
              <Photo img={lead.image} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <h3 className="mt-5 text-2xl">{lead.title}</h3>
            <p className="muted mt-2 max-w-xl">{lead.text}</p>
          </article>
          <ul className="grid content-between gap-8 lg:col-span-5">
            {rest.map((d, i) => (
              <li key={d.title} className="reveal grid grid-cols-[7.5rem_1fr] items-start gap-5 sm:grid-cols-[10rem_1fr]" style={{ "--i": i + 1 } as React.CSSProperties}>
                <div className="zoom relative h-28 sm:h-32">
                  <Photo img={d.image} fill sizes="160px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl">{d.title}</h3>
                  <p className="muted mt-1">{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
