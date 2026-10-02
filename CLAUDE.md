# Confortex website

Niche: **hvac-refrigeration** (B2B; `trades-local-services` base only). Seeded from RenovoGuidelines 2026-10-02. Chat Romanian; site copy Romanian with diacritics; guideline docs English.

## Always on

- **ponytail (full) + caveman (full)** ON (plugins in `.claude/settings.json`, hook restates each prompt). Caveman = chat prose only; never code, exact errors, security/irreversible warnings, written docs, client copy. Ponytail = reuse, stdlib, native, installed dep, one line, minimum code, after reading real flow. Off only if user says.
- Verify before "done": `npx next typegen && npx tsc --noEmit && npx eslint . && npx next build`, then `site-audit` skill.

## Read first

1. `guidelines/00-START-HERE.md`, `guidelines/03-workflow.md`.
2. `guidelines/niches/hvac-refrigeration.md` (claims tagged verified/unverified).
3. `guidelines/10-romania-legal-local.md`, `guidelines/11-capability-catalog.md`.
4. `guidelines/02-tool-routing.md`.

## Project decisions

- All client text in `content/site.ts` (config-first). Client: CONFORTEX SRL, CUI 1989262 (user-given). Reg. Com., registered-address confirmation, hours: visible placeholders. Public contact from old Contact page (Calea Chișinăului 29, Iași 700177; +40 232 231 900; confortex@confortex.ro). Staff names/mobiles NOT shown until client agrees.
- Scope: local demo. User deploys to Vercel himself. Standing rule (2026-10-02): commit + `git push origin main` (https://github.com/Razvan0206/Confortex.git, PUBLIC repo) after every change; never commit staff names/mobiles or `scrape/`. Deploy/send to third parties still needs an explicit order. User cannot reach client yet: placeholders + gap list.
- Quote request visual only: submit disabled, visible notice "Formularul devine activ la lansare", tel/mailto. No fake submit. Launch: Server Action + Resend + Turnstile (11-capability-catalog).
- Old site: audit `audit-old/AUDIT.md` (before/after numbers), text `audit-old/content-old.md`, mirror in `scrape/` (gitignored; `scripts/fetch-old-site.mjs`). Old site lockout plugin 403s after bursts: crawl slow, never bypass.
- Brands: text only until logo permission. Certificates: only with documents; old scans in `scrape/files`, client confirms current.
- Brief confirmed by user 2026-10-02. Reference clients stay public as on old site (user decision; client to confirm). Built: all routes, 16 products with spec tables, 23 PDFs (<= 3 MB) in `public/docs` (10 bigger only in `scrape/`), real old-site photos in `public/img`. Added later: gallery with lightbox (27 old-site photos) on `/proiecte`, About timeline, breadcrumbs + JSON-LD, spec tables, blur placeholders (`scripts/build-images.py`), OG image, `content-visibility` on home only (inner `.wrap`), webp only. Records: `DESIGN.md`, `guidelines/12-lessons-confortex.md`, Lighthouse via `audit-old/lh.sh` (JSON gitignored).
- Run: `npm run dev` or `npx next build && npx next start -p 3100`; audit: `cd tools/audit && BASE_URL=http://localhost:3100/ node audit.js` and `node anchors-confortex.js`.

## Identity (confirmed)

- Persuade, redesign-overhaul, B2B trust-first. Dials `VARIANCE 5 / MOTION 3 / DENSITY 5`. Authority: client brand > `04-design-rules.md` > design-taste > impeccable > emil. ui-ux-pro-max navy/blue not taken, only pattern (proof after hero, one quote CTA).
- Color sampled from `logo.png`: brand red `#ff0019` (marks, large type on ink); `red-ui #d6001a` button fills/red text (>= 5:1); ink `#14171c`, ink-2 `#1d2229`, steel `#566070`, line `#d9dee4`, paper `#f3f5f7`. One accent. Logo = vector redraw (`scripts/build-logo.py`, `content/logo.json`, `public/logo.svg`) of the original 223x40 px white PNG, so header/hero/footer ink, content paper/white (deliberate single-theme deviation).
- Shape: hexagon = only signature (badges, bullets); radius 2 px controls, 0 elsewhere. Type: Geist only (tabular figures via `.num`). No serif, no mono.
- Layout: 7/5 hero with real photo + caption; proof facts line; capacities (m³, kW, m³/h, °C) live in the proof line and the card texts, no chart (the axes added nothing next to the numbers); asymmetric domain tiles; numbered services with sticky heading; product groups; references grouped by domain; brands text list; quote band with visual form.
- Motion (3): CSS only, all in `prefers-reduced-motion: no-preference`, scroll-driven parts behind `@supports`. Tokens `--ease-out/--ease-in-out/--ease-drawer` (Emil). Load: hero lines rise, ink panel wipes off the photo, photo settles; scroll: progress bar, hero parallax, reveals with `--i` stagger, hexagon pops and timeline line draw; UI: press scale .97, hover gated to mouse, nav underline, image zoom 1.03, burger turns into an X and the menu panel drops from the header (clip-path), lightbox with `@starting-style`; page: every navigation fades/rises via `app/template.tsx` (`<html data-scroll-behavior="smooth">` stops the visible scroll to top), product list -> product page morphs the shared photo, header pinned. No marquee/carousel/library. Hero photo never fades (LCP).
- Routes (old slugs kept): `/`, `/despre-confortex`, `/produse`, `/produse/[slug]` (old `/project/[slug]` redirects), `/servicii-confortex`, `/proiecte`, `/contact` (`#oferta`), `/confidentialitate`, `/cookie-uri`, 404. CTA label everywhere "Cere ofertă". Header: logo, 6 links, phone, CTA. Icons: 5 own SVG.
- Not shown as facts (old-site claims): current ISO 9001 (old scan valid to 2020-11-02), F-gas/AGFR, "unic centru de recuperare freoni", "singura companie din România care produce criostate".
- Deviations: nav "Home" became "Acasă"; submit disabled; TBT not optimized (~1.2 s emulated, React + layout).
- Open placeholders (grep `Aici va veni`, `Aici vor veni`, `de completat de client`): Reg. Com., address confirmation, hours, current ISO certificate, current F-gas/AGFR attestations, York authorization, vector logo, reference approvals, legally validated privacy/cookie texts, receiving e-mail, AHU and mobilier frigorific descriptions, fax validity.
- Deploy: by user on Vercel; `noindex` until launch.

## Ask first

Force-push/history rewrite; global installs; copying code from repos not owned; publishing client data (real names, ratings, unlicensed photos); making repos public; inviting collaborators. Standing push rules in user memory.

## graphify

Knowledge graph at graphify-out/ (gitignored).
- Code questions: first `graphify query "<question>"` when graphify-out/graph.json exists; `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`. Smaller than GRAPH_REPORT.md or grep.
- If graphify-out/wiki/index.md exists, use for navigation.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review.
- After code changes: `graphify update .` (AST-only, no API cost).
