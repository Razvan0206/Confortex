import { brands, certs } from "@/content/site";

export function BrandsCerts() {
  return (
    <section className="band" aria-labelledby="brands-title">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <h2 id="brands-title" className="text-[clamp(1.7rem,3vw,2.5rem)]">
            Mărci reprezentate
          </h2>
          <p className="muted mt-4">Importator direct:</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xl font-semibold">
            {brands.direct.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="muted mt-6">Și echipamente de la:</p>
          <p className="mt-2">{brands.more.join(" · ")}</p>
          <p className="muted mt-6 text-sm">{brands.note}</p>
        </div>
        <div className="reveal">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">Certificări și autorizări</h2>
          <ul className="mt-6 grid gap-6">
            {certs.map((c) => (
              <li key={c.title}>
                <h3 className="text-lg">{c.title}</h3>
                <p className="muted mt-1">{c.text}</p>
                <p className="note mt-2 text-[0.95rem]">{c.missing}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
