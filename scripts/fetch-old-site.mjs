// One-off mirror of confortex.ro (client's own site) into scrape/ (gitignored).
//   node scripts/fetch-old-site.mjs [--live]
// Why Wayback for HTML: the first run crawled 11k junk /mom-* sitemap URLs and tripped the site's
// lockout plugin (pages and REST answer 403, static files still 200). We do not bypass it: page HTML
// comes from the public Wayback Machine (snapshot URL kept in pages-index.json); files come from the
// live site first, Wayback second. Polite: one request at a time. Resumable (existing files skipped).
// With --live, pages are fetched from the live site instead (use after the lockout is gone).
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ORIGIN = "https://www.confortex.ro";
const OUT = "scrape";
const LIVE = process.argv.includes("--live");
const DELAY = 1200;
const UA = { "user-agent": "Mozilla/5.0 (Confortex redesign demo; contact: razvan.iuga02@gmail.com)" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u) => { await sleep(DELAY); return fetch(u, { headers: UA, redirect: "follow" }); };
const wb = (u, kind = "id_") => `https://web.archive.org/web/2${kind}/${u}`;

const fileUrls = new Set();
const addFile = (raw, base) => {
  let u;
  try { u = new URL(raw.replaceAll("\\/", "/"), base); } catch { return; }
  if (u.hostname === "web.archive.org") return;
  u.pathname = u.pathname.replace("/wp-content/", "/continut/"); // old HTML paths; the live site serves /continut/
  if (!u.hostname.endsWith("confortex.ro") || !/\/continut\/uploads\//.test(u.pathname)) return;
  u.protocol = "https:"; u.hostname = "www.confortex.ro";
  fileUrls.add(u.href);
  // the full-size original of a generated thumbnail (name-300x200.jpg -> name.jpg)
  const full = u.href.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
  if (full !== u.href) fileUrls.add(full);
};
const scan = (html, base) => {
  for (const m of html.matchAll(/(?:src|href|data-[a-z-]+|content)=["']([^"']+)["']/gi)) addFile(m[1], base);
  for (const m of html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) addFile(m[1], base);
  for (const m of html.matchAll(/https?:\\?\/\\?\/www\.confortex\.ro\\?\/(?:continut|wp-content)\\?\/uploads[^"'\s)<>]+/gi)) addFile(m[0], base);
};

mkdirSync(join(OUT, "html"), { recursive: true });
if (existsSync(join(OUT, "media.json"))) for (const m of JSON.parse(readFileSync(join(OUT, "media.json"), "utf8"))) {
  addFile(m.source_url, ORIGIN);
  for (const s of Object.values(m.media_details?.sizes ?? {})) addFile(s.source_url, ORIGIN);
}

// pages: the 5 main ones, then every /project/<slug>/ (products) found in the products page
const index = [];
const seen = new Set();
const queue = ["", "despre-confortex/", "produse/", "servicii-confortex/", "contact/"].map((p) => `${ORIGIN}/${p}`);
while (queue.length) {
  const u = queue.shift();
  if (seen.has(u)) continue;
  seen.add(u);
  const r = await get(LIVE ? u : wb(u));
  if (!r.ok) { console.error("page", u, r.status); index.push({ url: u, status: r.status }); continue; }
  const html = await r.text();
  const slug = new URL(u).pathname.replace(/^\/|\/$/g, "").replaceAll("/", "__") || "home";
  writeFileSync(join(OUT, "html", `${slug}.html`), html);
  index.push({ url: u, status: r.status, fetchedFrom: r.url, bytes: html.length });
  scan(html, u);
  for (const m of html.matchAll(/https?:\/\/www\.confortex\.ro\/project\/[a-z0-9-]+\/?/gi)) {
    const p = m[0].replace(/^http:/, "https:").replace(/\/?$/, "/");
    if (!seen.has(p)) queue.push(p);
  }
}
writeFileSync(join(OUT, "pages-index.json"), JSON.stringify(index, null, 1));

// files: live first, Wayback as fallback
let ok = 0, viaWayback = 0;
const failed = [];
for (const url of fileUrls) {
  const rel = join(OUT, "files", decodeURIComponent(new URL(url).pathname.replace(/^\/+/, "")));
  if (!resolve(rel).startsWith(resolve(OUT, "files"))) { failed.push(`${url} (path outside ${OUT}/files)`); continue; } // page content is untrusted data
  if (existsSync(rel)) { ok++; continue; }
  let r = await get(url).catch(() => null);
  let fromWb = false;
  if (!r?.ok) { r = await get(wb(url, "im_")).catch(() => null); fromWb = true; }
  if (!r?.ok) { failed.push(url); continue; }
  mkdirSync(dirname(rel), { recursive: true });
  writeFileSync(rel, Buffer.from(await r.arrayBuffer()));
  ok++; if (fromWb) viaWayback++;
}
writeFileSync(join(OUT, "files-failed.txt"), failed.join("\n"));
console.log(JSON.stringify({ pages: index.length, files: fileUrls.size, ok, viaWayback, failed: failed.length }));
