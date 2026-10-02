# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind, per `guidelines/05-technical-standards.md`. Deploy to Vercel is done by the user.

## Users

B2B buyers and technical staff in the Iași region, Moldova (RO) and nearby counties: owners, plant and facility managers, engineers, purchasing. Segments, in order of weight (user delegated the order on 2026-10-02; derived from the old site's reference list, to be confirmed by the client): food industry (slaughterhouses, dairy, wine, meat, fish, fruit and vegetables), cold storage and logistics, retail and HoReCa, buildings and halls needing HVAC. They compare 2-3 suppliers and need proof (references, brands, certificates) before asking for a quote. Also existing customers looking for service.

## Product Purpose

Confortex SRL (CUI 1989262), Iași, sells, installs and services industrial and commercial refrigeration, HVAC, air handling units (AHU), chillers, rooftops and compressed air. The website must turn a company visitor into a quote request ("Cere ofertă") or a phone call, and let a service customer reach the service desk. Success: a visitor understands in seconds what Confortex does, sees proof, and requests a quote.

## Positioning

Project, installation and service from one supplier: delivery, assembly, commissioning, warranty and post-warranty service, staff training. Backed (old-site claims, to confirm with documents) by: company founded 1992, ISO 9001 quality system since 2005, direct importer and authorized distributor of York (Johnson Controls), Güntner and Konvekta, refrigerant recovery and recycling center (declared), a portfolio from 10 m3 cold rooms to 11,000 m3 warehouses and 60,000 m3/h AHUs.

## Operating Context

Quotes are engineered per project (capacity, temperature, site). Customers are companies; they call or write to a departmental contact, then receive an offer. Service happens on contract or per order. The user cannot reach the client yet: every unconfirmed fact is a visible placeholder or tagged in `guidelines/niches/hvac-refrigeration.md`.

## Capabilities and Constraints

- Quote request is visual only in the demo: form layout with disabled submit and a visible notice (form becomes active at launch), plus working `tel:` and `mailto:`.
- Public contact data available from the old Contact page: Calea Chișinăului 29, Iași 700177; +40 232 231 900; confortex@confortex.ro. Staff names and mobile numbers are not published without consent. Reg. Com. and confirmed registered address are unknown.
- No client logos of brands or customers, no certificate numbers shown as facts, until documents and permission exist.
- Romanian only (formal "dumneavoastră"); English undecided.
- Demo is local and `noindex`.

## Brand Commitments

Name CONFORTEX; slogan on the old logo: "excelența confortului dumneavoastră" (to confirm). Logo: snowflake plus wordmark with red "EX"; red hexagons on the old site. Identity of the new site is derived from the client's logo, not from another firm.

## Evidence on Hand

Old-site text in `audit-old/content-old.md`; audit in `audit-old/AUDIT.md`; mirror of old-site files (photos, certificate scans, PDF catalogs) in `scrape/` (gitignored). Reference projects listed on the old site (client names need approval). No testimonials, no case-study photos of Confortex installations confirmed yet, no vector logo, no verified service hours or emergency policy. Do not fabricate any of these.

## Product Principles

1. Proof before promise: capacities, brands, references, certificates, each traceable to a client document.
2. One action: "Cere ofertă" reachable in one click on every page; the phone number always visible.
3. Say only what is true: placeholders over inventions.
4. Technical clarity over decoration: spec tables and numbers that engineers can scan.
5. Fast and legible on a weak phone and an office desktop.

## Accessibility & Inclusion

WCAG AA contrast, visible focus, keyboard operation, reduced-motion support, Romanian diacritics rendered correctly.
