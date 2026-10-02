import { proof } from "@/content/site";

// ponytail: all five facts are the company's own old-site claims (flagged under the list), upgrade: confirm with documents, then drop the flag.
export function ProofStrip() {
  return (
    <section aria-label="Repere" className="bg-ink-2 text-white">
      <div className="wrap py-7">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
          {proof.map((p, i) => (
            <li key={p.strong} className="note rise bg-transparent! p-0!" style={{ "--i": i + 5 } as React.CSSProperties}>
              <span>
                <strong className="font-semibold">{p.strong}</strong> <span className="text-ink-muted">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-muted">Date declarate de firmă; se confirmă cu documente înainte de lansare.</p>
      </div>
    </section>
  );
}
