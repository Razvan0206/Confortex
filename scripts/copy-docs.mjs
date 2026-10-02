// Copy the PDFs referenced in content/site.ts from the old-site mirror (scrape/) to public/docs.
// ponytail: only PDFs <= CAP_MB (10 big manufacturer catalogs stay in scrape/ so the repo and the deploy stay small),
// upgrade: host them on a CDN or Vercel Blob at launch and raise or drop the cap.
// Writes content/docs.json = { "file.pdf": sizeInKB } so the site only links what exists.
import { readFileSync, writeFileSync, readdirSync, statSync, copyFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const CAP_MB = 3;
const src = readFileSync("content/site.ts", "utf8");
const wanted = [...new Set([...src.matchAll(/file: "([^"]+\.pdf)"/g)].map((m) => m[1]))];
const index = new Map();
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p) : n.toLowerCase().endsWith(".pdf") && index.set(n, p);
  }
};
walk("scrape/files");
mkdirSync("public/docs", { recursive: true });
for (const f of readdirSync("public/docs")) rmSync(join("public/docs", f)); // not the folder itself: EPERM on Windows if it is a shell cwd
const out = {};
const skipped = [];
for (const f of wanted) {
  const p = index.get(f);
  if (!p) { skipped.push(`${f} (not in mirror)`); continue; }
  const size = statSync(p).size;
  if (size > CAP_MB * 1e6) { skipped.push(`${f} (${(size / 1e6).toFixed(1)} MB)`); continue; }
  copyFileSync(p, join("public/docs", f));
  out[f] = Math.round(size / 1024);
}
writeFileSync("content/docs.json", JSON.stringify(out, null, 1));
console.log(`${Object.keys(out).length} copied, skipped: ${skipped.join("; ")}`);
