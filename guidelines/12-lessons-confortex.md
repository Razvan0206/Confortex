# Case study: Confortex (Iași), October 2026

B2B redesign of confortex.ro (industrial refrigeration, HVAC, AHU). Repo `Razvan0206/Confortex` (public). Built from the public old site only; the user could not reach the client, so every unconfirmed fact is a visible placeholder. Candidate for merging into `09-lessons-raf-gym.md` or a shared case-study folder.

## What was new compared with Raf Gym and HMS

- **B2B niche**: `niches/hvac-refrigeration.md` (proof before promise, capacity numbers, references by domain, certificates only with documents).
- **Redesign from a real site**: audit with numbers first (`audit-old/AUDIT.md`), content kept, IA and slugs kept (`/despre-confortex`, `/servicii-confortex`, old `/project/*` redirected to `/produse/*`).
- **Data viz from client numbers**: a log-scale "capacity scale" (10 m3 to 11,000 m3, 8 to 1,000 kW, 2,000 to 60,000 m3/h) drawn in CSS from `content/site.ts`; the only element that could not belong to another company.
- **Native View Transitions in Next 16**: `<ViewTransition name share>` works in the App Router with no flag; add `react-experimental.d.ts` (`/// <reference types="react/experimental" />`) for types.

## Mistakes and fixes

| Mistake | Fix / rule |
|---|---|
| Crawled 11.7k junk URLs from the old site's `sitemap.xml` (`/mom-*`); its security plugin locked the IP (403 on pages and REST, static files still 200) | Never crawl a sitemap blindly. One request at a time, pause between, stop on 403, never bypass. Page HTML from the Wayback Machine (`web/2id_/<url>`), files from the live host. Script: `scripts/fetch-old-site.mjs` |
| Old HTML used `/wp-content/uploads/`, the host serves `/continut/uploads/`: 37 linked PDFs silently missing | After a mirror, diff the links in the HTML against the files on disk |
| WP REST `/wp-json/wp/v2/media` lists every upload (341 files here) and `types` shows which post types are exposed | Check it before scraping HTML; custom post types (products here) may be missing |
| The only logo was a 223x40 white PNG; the ISO scan was valid only to 2020-11-02 | Open every certificate image before showing a claim; mark expired ones as placeholders, list them as client gaps |
| `content-visibility: auto` on whole sections: Lighthouse axe reported false contrast failures (skipped content has no backgrounds) | Put it on the inner `.wrap`, keep the section background outside, exclude sections with absolutely positioned labels. Use only on pages without hash anchors. First paint 1.3 s to 0.2 s unthrottled |
| LCP render delay 933 ms with AVIF under 4x CPU throttling | `images.formats: ["image/webp"]` (+ `qualities`, `fetchPriority="high"`): render delay 36 ms |
| `quality={65}` silently became 75 | Next 16 needs `images.qualities` to allow it |
| Scroll-driven reveals are invisible in full-page screenshots (the timeline depends on scroll position, not on state) | QA helper injects `animation: none` and shows the wipe panel off; real visitors still see the animation |
| Lazy `fill` images below the fold looked blank in headless screenshots | Scroll, wait, or check `img.complete`; do not conclude "broken" from one capture |
| `playwright-cli` kept an old session and showed a previous build | `playwright-cli close` before re-checking after a rebuild |
| Killed only the listening PID; an older server kept serving the old build | Kill every PID on the port, then check a known new string with `curl` |
| Impeccable detector flagged `border-left: 4px` callouts | Replace with a small hexagon bullet (`.note`) |
| `rmSync` of a folder that is the shell cwd: EPERM on Windows | Delete the files inside, not the folder |
| `caveman-compress` script failed ("Claude call failed", empty) | Compress by hand with a backup outside the project (`%LOCALAPPDATA%\caveman-compress\backups`) |
| Lighthouse/axe counted a disabled submit button as fine but a 12 px light-on-white tick label as a failure | Run `npx lighthouse` on the production build for every page type, not only the home page |
| Committed Lighthouse JSON files to a public repo | Ignore `audit-old/lh-*.json` before the first audit run |

## Numbers (emulated mobile, local production build)

Old site: LCP 5.7 s, CLS 1.006, 1001 KB, 0 landmarks, `lang="en-US"`. New: LCP 1.9 to 2.1 s (own audit script), Lighthouse performance 94 to 98, accessibility 100, best practices 100 (SEO 63 only because of `noindex`), CLS 0, 329 KB, 0 horizontal overflow on 11 routes. Details in `audit-old/AUDIT.md`.

## Tools that earned their place

`impeccable detect` (found the side-stripe pattern), Impeccable `craft-floor` (bans: hero-metric template, eyebrows, side stripes), Emil's `animate` rules (press 160 ms, hover gated to mouse, drawer curve, `@starting-style`), `vercel-react-view-transitions` (shared element + pinned header), Lighthouse via `npx` (LCP breakdown found the AVIF delay), Wayback Machine (HTML of a locked site), Python PIL (contact sheets to choose photos, blur placeholders, Open Graph image).
