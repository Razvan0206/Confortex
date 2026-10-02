import { proof } from "@/content/site";

// ponytail: all five facts are the company's own old-site claims (flagged under the list), upgrade: confirm with documents, then drop the flag.
export function ProofStrip() {
  return (
    <section aria-label="Repere" className="bg-ink-2 text-white">
      <div className="wrap py-7">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
          {proof.map((p, i) => (
            <li key={p.figure} className="note note-plain rise" style={{ "--i": i + 5 } as React.CSSProperties}>
              <span>
                <strong className="num block font-semibold">{p.figure}</strong>
                <span className="block text-ink-muted">{p.label}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-muted">Date declarate de firmă; se confirmă cu documente înainte de lansare.</p>
      </div>
    </section>
  );
}
