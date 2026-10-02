import { milestones } from "@/content/site";

// Dated milestones from the old site. The red line fills as the list scrolls through (CSS scroll-driven, static where unsupported).
export function Timeline() {
  return (
    <section className="on-white band" aria-labelledby="timeline-title">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="timeline-title" className="text-[clamp(1.9rem,3.6vw,3rem)]">
              Repere în timp
            </h2>
            <p className="muted mt-4 max-w-sm">Datele sunt cele declarate de firmă pe site-ul anterior; documentele se confirmă înainte de lansare.</p>
          </div>
        </div>
        <ol className="tl lg:col-span-8">
          <span className="tl-line" aria-hidden />
          <span className="tl-fill" aria-hidden />
          {milestones.map((m, i) => (
            <li key={m.year} className="relative grid grid-cols-[3.25rem_1fr] gap-5 pb-10 last:pb-0">
              <span className="hex hex-badge tl-node z-10" style={{ "--i": i } as React.CSSProperties} aria-hidden />
              <div>
                <p className="num text-2xl font-semibold">{m.year}</p>
                <p className="muted mt-1 max-w-2xl">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
