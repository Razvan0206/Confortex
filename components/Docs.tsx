import docs from "@/content/docs.json";
import { Icon } from "./Icon";

const available = docs as Record<string, number>;
const size = (kb: number) => (kb >= 1000 ? `${(kb / 1024).toLocaleString("ro-RO", { maximumFractionDigits: 1 })} MB` : `${kb} KB`);

// Links only the PDFs that exist in public/docs (see scripts/copy-docs.mjs); bigger catalogs are not shipped in the demo.
export function Docs({ items }: { items: readonly { label: string; file: string }[] | undefined }) {
  const ok = (items ?? []).filter((d) => d.file in available);
  const missing = (items?.length ?? 0) - ok.length;
  if (!items?.length) return null;
  return (
    <div>
      <h2 className="text-xl">Fișe tehnice și cataloage</h2>
      {ok.length > 0 && (
        <ul className="mt-4 grid gap-1">
          {ok.map((d) => (
            <li key={d.file}>
              <a href={`/docs/${d.file}`} className="link inline-flex min-h-11 items-center gap-3" download>
                <Icon name="download" className="size-5 shrink-0 text-brand-ui" />
                <span>
                  {d.label} <span className="num text-sm text-steel">PDF, {size(available[d.file])}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {missing > 0 && <p className="mt-3 text-steel">{ok.length ? "Alte cataloage" : "Cataloagele"} mari ale producătorilor sunt disponibile la cerere.</p>}
    </div>
  );
}
