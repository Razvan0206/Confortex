import { scale } from "@/content/site";

// Every bar position comes from the numbers in content/site.ts (log axis between lo and hi).
const pos = (v: number, lo: number, hi: number) => ((Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))) * 100;

const decades = (lo: number, hi: number) => Array.from({ length: Math.round(Math.log10(hi / lo)) + 1 }, (_, i) => lo * 10 ** i);

export function CapacityScale() {
  return (
    <section className="on-ink band cv-off" aria-labelledby="scale-title">
      <div className="wrap">
        <h2 id="scale-title" className="reveal max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)]">
          De la 10 m³ la 11.000 m³, de la 8 kW la 1.000 kW
        </h2>
        <p className="muted reveal mt-4 max-w-2xl">{scale.intro}</p>
        <div className="mt-12 grid gap-14">
          {scale.axes.map((axis) => (
            <div key={axis.title} className="reveal">
              <h3 className="text-base font-semibold tracking-normal text-ink-muted">
                {axis.title} <span className="num">({axis.unit}, scară logaritmică)</span>
              </h3>
              <div className="mt-5 grid gap-7">
                {axis.rows.map((row, i) => {
                  const left = pos(row.from, axis.lo, axis.hi);
                  const width = Math.max(pos(row.to, axis.lo, axis.hi) - left, 0.8);
                  const last = i === axis.rows.length - 1;
                  return (
                    <div key={row.label}>
                      <p className="flex flex-wrap items-baseline justify-between gap-x-6">
                        <span className="font-medium">{row.label}</span>
                        <span className="num text-xl font-semibold">{row.text}</span>
                      </p>
                      <div className="axis mt-3" role="img" aria-label={`${row.label}: ${row.text}`} style={{ marginBottom: last ? "2.25rem" : 0 }}>
                        <span className="bar" style={{ left: `${left}%`, width: `${width}%`, minWidth: "0.5rem" }} />
                        {last &&
                          decades(axis.lo, axis.hi).map((t) => (
                            <span key={t} className="tick" style={{ left: `${pos(t, axis.lo, axis.hi)}%` }}>
                              <span className="num">{t.toLocaleString("ro-RO")}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="reveal border-t border-ink-line pt-8">
            <p className="flex flex-wrap items-baseline justify-between gap-x-6">
              <span className="font-medium">{scale.deep.label}</span>
              <span className="num text-xl font-semibold">{scale.deep.text}</span>
            </p>
            <p className="muted mt-2 max-w-2xl">{scale.deep.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
