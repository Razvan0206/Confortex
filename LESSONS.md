# Lessons from building the Confortex redesign

For an agent that builds a similar B2B site, or any business site in another domain (restaurant, clinic, gym, shop, services). Everything here was learned on this project (October 2026). Each item says what happened and what to do. Tags: **[verified]** = measured or run in this project; **[opinion]** = the user's taste, applies to this user's sites.

Detailed case study with a mistakes table: `guidelines/12-lessons-confortex.md`. Design record: `DESIGN.md`. Numbers: `audit-old/AUDIT.md`.

## 0. The 12 rules that mattered most

1. **Measure the old site first**, save the numbers, and show before/after. It sets the bar and ends arguments.
2. **Never invent a fact.** Unknown = visible placeholder `[de completat de client]`, listed as a client gap. Claims copied from the old site stay labelled as the company's own until a document backs them.
3. **Open every certificate and logo file before using it.** The ISO scan was valid only until 2020-11-02; the logo was a 223x40 px PNG.
4. **Be gentle with a client's old server.** One request at a time. Stop on 403. Never bypass a lockout.
5. **Derive the identity from the client's logo** (sampled pixels), not from a template. A white logo forces an ink header; accept it and write it down as a deviation.
6. **Decoration that repeats a number adds nothing.** A drawn axis next to the same figure was removed on request. Show a chart only when it carries information the text does not.
7. **Any flash on navigation is a bug.** Scroll slides, white backgrounds, half-faded pages: reproduce them with slowed animations, fix the cause.
8. **Test in a clean browser, on the latest build.** Stale sessions and stale servers cost hours of wrong conclusions here.
9. **Run an independent finish review** (separate agent, fresh eyes). It found seven real issues that passing audits missed.
10. **Commit and push after each coherent change** when the user says so, but check repo visibility first (this repo is public).
11. **Hub tools are not always loaded.** Skills under `.claude/skills` appear only after a session restart; read `SKILL.md` directly.
12. **Say what failed.** Several tools failed or did not apply; each is listed in section 8 so the next agent does not retry blindly.

## 1. Intake and content

- **Old-site audit first.** Playwright snapshots at 1280 and 390 px, `tools/audit/audit.js` for numbers (LCP, CLS, landmarks, contrast, touch targets), `impeccable detect` for anti-patterns. Contacts that the brief said were missing were on one page only; verify the brief against the site. **[verified]**
- **WordPress sites:** `/wp-json/wp/v2/media?per_page=100&page=N` lists every upload (341 here); `/wp-json/wp/v2/types` shows which post types are exposed (products were a custom type, not exposed). `sitemap.xml` here held 11,724 junk URLs (`/mom-*`); do not crawl a sitemap blindly. **[verified]**
- **Locked out?** The old site's security plugin returned 403 on pages and REST after a burst. Static files still answered 200. Fallback used: the public Wayback Machine for page HTML (`web.archive.org/web/2id_/<url>`), the live host for files, delay between requests, stop after repeated 403, resumable script (`scripts/fetch-old-site.mjs`). **[verified]**
- **Path drift:** old HTML pointed to `/wp-content/uploads/`, the live host served `/continut/uploads/`. 37 PDFs were silently missing until links in the HTML were diffed against files on disk. Always diff links against what you downloaded. **[verified]**
- **Choose photos with a numbered contact sheet** (PIL) of every candidate; look at them, then pick. 90 photos were reviewed in three images.
- **Real photos need accurate, modest captions.** Describe only what is visible or stated on the old site. No client names in alt text.
- **Third-party PDFs in a public repo:** cap size (3 MB here), keep the big manufacturer catalogs out, mention "available on request". Hosting other people's catalogs is a licence question for the client to settle.
- **Client names / people:** staff names and mobile numbers from the old Contact page were not published without consent. Customer names were published on the user's instruction, with a visible caveat on every page that lists them.
- **Ask what you cannot find out, once**, in one message. When the user cannot reach the client, build with placeholders and keep a gap list in `CLAUDE.md`.

## 2. Identity and design

- **Sample colours from pixels.** Logo red was `#ff0019`; a darker `#d6001a` carries white text at AA contrast and red text on paper. One accent only.
- **Shape language from the logo.** Snowflake plus red hexagons on the old site became one signature shape (badges, bullets). Everything else sharp.
- **No side-stripe callouts** (`border-left` above 1px), no hero-metric template, no eyebrows above headings. `impeccable detect` flags the first; its `craft-floor.md` bans the others. A small hexagon bullet replaced the stripe. **[verified]**
- **Hero photo:** the first pick (grey chillers by tanks) was rejected. The replacement is brighter and on brand (red hall, blue sky, yellow rail). Rule: hero image = real work, high key, shares a colour with the brand. Compare 6-9 candidates side by side. **[opinion]**
- **Typography details the user noticed:**
  - Do not switch bold to thin inside one phrase ("**Depozite industriale** de 11.000 m³"). Put the figure bold on its own line and the label muted on the next.
  - Bind prepositions and units to numbers with no-break spaces (`de 11.000 m³`, `10 – 2.000 m³`, phone numbers). A script over `content/site.ts` replaced 106 places. Never let "de" end a line.
  - Diacritics: comma-below ș ț; load the font's latin-ext subset; Geist covers them.
- **Logo redraw** (`scripts/build-logo.py`): measure the original (6 arms, branch V at 0.62 of the arm, 64 degrees, 0.36 long), outline the wordmark from a font with `fontTools` (Arimo, OFL, a metric twin of Arial; in the Google Fonts repo it lives under `ofl/`, not `apache/`), keep the logo red for "EX", use `currentColor` for the rest. Ship the compact lockup in the app (2.7 KB of path data) and the full lockup with slogan as `public/logo.svg` (the slogan outlines were 14 KB). Flag it with a `ponytail:` comment as a redraw, not the client's master. **[verified]**
- **Generate derived assets from the same source:** favicon, apple icon and the Open Graph image were regenerated from the vector so they never drift.
- **Open Graph image:** compose with PIL and a system font that has ș ț (Segoe UI); view the result, the first attempt overlapped three elements.

## 3. Motion that held up

All CSS, inside `@media (prefers-reduced-motion: no-preference)`, scroll-driven parts behind `@supports (animation-timeline: view())`. Tokens from Emil Kowalski's skills: `--ease-out cubic-bezier(.23,1,.32,1)`, `--ease-in-out (.77,0,.175,1)`, `--ease-drawer (.32,.72,0,1)`; press feedback `scale(.97)` at 160 ms; UI under 300 ms (page fades 240 ms).

- Load: masked headline lines rise (`overflow:hidden` with bottom padding for descenders), an ink panel wipes off the photo, photo settles. Never fade the LCP photo itself.
- Scroll: progress bar (`scroll(root)`), hero parallax, reveals with a per-item `--i` stagger, hexagon pops, timeline line that draws.
- Interaction: hover only under `@media (hover: hover) and (pointer: fine)`, nav underline that draws, image zoom 1.03, arrows that nudge.
- **Mobile menu:** a disclosure panel under the header (`clip-path: inset`), burger bars turn into an X, links rise with a stagger, `inert` while closed, Escape closes and returns focus, page scroll locked while open. Store `openPath` instead of a boolean so a route change closes the menu without an effect. **[verified]**
- **Next 16 + smooth scroll:** the router no longer overrides `scroll-behavior`. With `html { scroll-behavior: smooth }` every navigation visibly slides to the top, and hash links slide. Fix: `<html data-scroll-behavior="smooth">`. **[verified]**
- **Page transitions** (`app/template.tsx` with `<ViewTransition enter="page-in" exit="page-out" default="none">`): make it a **true cross-fade** (the exit animation is the same keyframes, reversed). Fades offset in time or with different curves leave a half-transparent page and read as a flash. Also set an explicit `background` on `<html>`: the root snapshot otherwise shows white for the body-propagated canvas colour. **[verified]**
- **Debug motion by slowing it:** inject `::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) { animation-duration: 4s !important }`, trigger the click, screenshot every 300 ms, then measure pure-white pixels with PIL. **[verified]**
- **Shared element** between a list and a detail page: same `name`, `share="morph"`, `default="none"` on both sides; add `react-experimental.d.ts` (`/// <reference types="react/experimental" />`) for types. Pin the header with its own `view-transition-name`.
- Rejected on purpose: marquee, carousels, animation libraries, hold-to-confirm patterns, animation on keyboard-driven actions.

## 4. Performance

- Use Lighthouse through `npx --yes lighthouse` on the **production build**, for every page type, several runs (scores move by 1-3 points). Look at `lcp-breakdown-insight`, not only the score. **[verified]**
- **AVIF delayed the LCP paint by ~930 ms** under 4x CPU throttling (element render delay). `images.formats: ["image/webp"]` took it to ~35 ms. `fetchPriority="high"` plus `priority` on the hero. A custom `quality` needs `images.qualities` in `next.config.ts`. **[verified]**
- **`content-visibility: auto` helped a lot** (first paint 1285 ms to 162 ms, unthrottled) when put on each section's inner `.wrap` with `contain-intrinsic-size`, only on the home page. Raf Gym lesson stays: skip it on pages with hash anchors. Applied to a section with absolutely positioned labels it made axe report false contrast failures; exclude such sections. **[verified]**
- Blur placeholders: 10 px WebP data URIs generated by `scripts/build-images.py` (5 KB for 47 photos; JPEG was 40 KB). Lazy `fill` images look blank in headless full-page screenshots: scroll first, or check `img.complete`.
- Two audits disagree by design: Lighthouse simulates throttling, `tools/audit/audit.js` observes it. Report both and name which is which.
- Results: Lighthouse mobile performance 94-98, accessibility 100, best practices 100 (SEO 63 only because of `noindex`), own audit LCP 1.5 s, CLS 0, 329 KB. TBT stayed the open problem (framework plus layout).

## 5. Accessibility and mobile

- Touch targets: make links `inline-flex min-h-11 items-center`; the audit found nav, footer and form links at 35-39 px.
- Contrast: tick labels at 12 px in muted grey on white failed; run axe (Lighthouse) after every colour change.
- Menu button: `aria-expanded`, `aria-controls`, label that flips; `aria-current="page"` in desktop and mobile nav; skip link; one `h1`; landmarks (the old site had none and `lang="en-US"`).
- `viewport-fit=cover` and `interactive-widget=resizes-content`; `-webkit-tap-highlight-color` off; hover gated; fixed action bar with `env(safe-area-inset-bottom)`; hide the bar when the quote form is already on the page (`body:has(#oferta)`).
- Test on a real phone before launch. Everything here was emulated.

## 6. Romanian B2B specifics (reusable for other Romanian sites)

- Footer: exact company name, CUI, Reg. Com. (placeholder until known), address, phone, e-mail; privacy and cookie pages; no third-party loads (maps as a link, not an embed). Formal "dumneavoastră".
- Quote form without a backend: show the real fields, disable submit, state why in a visible note, and give a working fallback (`tel:` and a `mailto:` with the subject and a body template prefilled with `encodeURIComponent` and `"\n"` joins). At launch: Server Action + Resend + Turnstile.
- Schema: `HVACBusiness` with `taxID`, `foundingDate`, `areaServed`; `BreadcrumbList` on detail pages. `noindex` until launch.
- Keep old URLs: `/project/:slug` redirected permanently to `/produse/:slug`; old slugs for the main pages stayed.
- Specs: product tables only with values the old site stated (kW range, refrigerants, temperatures). Where there was nothing, a visible "Aici va veni descrierea" note.

## 7. Process, tooling and testing

- **Work order that worked:** bootstrap from the hub, read the docs once, audit the old site, create the niche file, write the brief into `CLAUDE.md` and wait for confirmation, build with config-first content, quality gate, audit, review, commit, push.
- **Quality gate:** `npx next typegen && npx tsc --noEmit && npx eslint . && npx next build`. Keep a restart script (`audit-old/restart.ps1`) that also kills every process on the port.
- **Anchors test** (`tools/audit/anchors-confortex.js`): load `about:blank` between targets (a same-page hash jump smooth-scrolls from the previous target), wait 1.6 s for smooth scroll, allow 24 px for scroll-driven reveals. Also check horizontal overflow on every route at 390, 1024 and 1280 px.
- **Stale state traps:** `playwright-cli close` before checking a new build; kill all PIDs on the port (an old server kept answering); confirm with `curl` for a string that exists only in the new build.
- **Independent review:** dual agents for `impeccable critique` (design review without the detector, then detector and browser evidence), a documenter agent for `DESIGN.md`, a finish reviewer for last-pass issues. Verify each claim before acting: some "defects" were screenshot artefacts.
- **Cheap navigation:** `uv tool install graphifyy`, `graphify install --project` (no strict mode, no git hook), `graphify update .` after changes (AST only). On a repo this small it gains little; its value is across sessions.
- **Use dedicated tools for edits, Python for bulk text transforms.** A Python heredoc containing `\n` inside a string wrote a raw newline into a TypeScript string and broke the build; write `"\\n"` or build the string with `.join("\n")` from a file.
- **Windows:** the console encoding is cp1252, so write UTF-8 output to a file and read it; `rm -r` on a folder that is a shell cwd gives EPERM (delete the files inside); `pkill` is absent in Git Bash (use PowerShell); LF-to-CRLF warnings from git are harmless.
- **Git hygiene:** add generated output (`audit-old/lh-*.json`, shots, `scrape/`, `graphify-out/`) to `.gitignore` before the first audit, because `git add -A` is the standing habit. A public repo means no client staff data and no secrets.

## 8. What failed or did not apply

| Item | What happened | Do instead |
|---|---|---|
| `security-review` skill | Needs `origin/HEAD`; failed in a fresh repo | Review manually: grep for secrets, `dangerouslySetInnerHTML`, `target=_blank`, env use; add path checks to scripts that write files named by remote content |
| `caveman-compress` script | "Claude call failed", file untouched | Compress by hand, back up outside the project |
| Project skills (`web-design-guidelines`, `graphify`) | "Unknown skill" until session restart | Read `SKILL.md` and follow it |
| `impeccable detect <url>` | Returned empty output | Run `detect --json components app` on source after the build |
| Agent Reach | Does not read Google Maps reviews | Ask the client for an exported reviews file (`06-content-media-ethics.md`) |
| `ExitPlan`-style confirmation for design | n/a | Writing the identity brief into `CLAUDE.md` and waiting worked |
| Full-page screenshots with scroll-driven reveals | Content invisible, sections blank | Inject `animation:none` and `content-visibility: visible` for QA only |
| `content-visibility` on the scale section | False contrast failures | Apply to inner wrappers only, exclude positioned labels |

## 9. Adapting to another domain

Keep the method, swap the content model.

| Domain | Proof that replaces "capacities and references" | Primary action | Watch out for |
|---|---|---|---|
| Restaurant / café | Real dish photos, hours with live open status, menu as HTML | Call / reserve link | Never embed menu images; allergens text needs the client |
| Clinic / dental | Doctors with credentials (documents), services with prices only if given | Call / appointment link | Medical claims, patient photos and reviews need consent |
| Gym / studio | Class schedule, trainers, price groups | WhatsApp / visit | Do not invent classes (Raf Gym lesson) |
| Shop | Product grid, delivery, returns, price with VAT | Order on WhatsApp first, card payments later | SAL badge, withdrawal info, no SOL link |
| Construction / services | Before-after jobs, areas served, authorizations | Call now | Authorizations only from documents |
| Architecture / design | Project gallery, process, documents | Contact | Renders vs built work must be labelled (HMS) |

For any domain: write the niche file first (`guidelines/niches/<slug>.md`), list what must come from the client, build placeholders for the rest, and keep every number traceable to a source.

## 10. Checklist for the next agent

1. `node scripts/doctor.mjs`; read `CLAUDE.md`, `00-START-HERE.md`, `03-workflow.md`, the niche file, `10-romania-legal-local.md`.
2. Audit and mirror the old site slowly; save before numbers; inventory logo, photos, certificates, PDFs; open the certificates.
3. Write PRODUCT.md and the identity brief; get the user's confirmation before code.
4. Build config-first (`content/site.ts`), placeholders visible, claims labelled.
5. Motion: CSS only, reduced-motion safe; `data-scroll-behavior="smooth"`; true cross-fade page transition; test slowed.
6. Gate, Lighthouse on each page type, own audit, anchors, overflow on all routes at 3 widths.
7. Independent finish review; fix; record `DESIGN.md`; update `CLAUDE.md`.
8. Commit and push per the standing rule; check repo visibility first.
9. List client gaps, remaining shortcuts (`ponytail:` comments), and decisions for the user.
