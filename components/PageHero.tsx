import type { ReactNode } from "react";

export function PageHero({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="on-ink border-b border-ink-line py-14 md:py-20">
      <div className="wrap">
        <h1 className="rise max-w-4xl text-[clamp(2.1rem,5vw,3.75rem)]">{title}</h1>
        {lead && (
          <p className="muted rise mt-5 max-w-2xl text-lg" style={{ "--i": 1 } as React.CSSProperties}>
            {lead}
          </p>
        )}
        {children && <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>{children}</div>}
      </div>
    </section>
  );
}
