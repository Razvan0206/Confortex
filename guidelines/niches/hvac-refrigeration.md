# Niche: industrial and commercial refrigeration, HVAC, air handling (hvac-refrigeration)

Status: draft, first used on Confortex (2026-10-02). Not validated on a launched site. Tags: **[verified]** = read or measured this session (source named); **[unverified]** = general knowledge or client claim, confirm before publishing.

Different from `trades-local-services`: buyers are companies, not households. The sale is a quote for a project or a service contract, decided by an engineer, owner or purchasing person, often after comparing 2-3 suppliers. Phone speed matters less than proof (references, brands, certificates, capacity numbers).

## Who and why they visit

- Operations or facility managers, owners and engineers of: food processing plants (meat, dairy, wine, fish, fruit and vegetables), cold storage and logistics, retail chains and shops, restaurants and hotels, pharma and labs, offices and halls needing HVAC. **[unverified: inferred from the Confortex reference list, to be confirmed by the client]**
- Intents in order: (1) "can you do my kind of project at my size and in my area", (2) "are you an authorized partner of brand X / certified", (3) "give me a quote", (4) "my plant is down, who services it".
- Mostly desktop at work for research, mobile for urgent service calls. Build mobile-first anyway.

## Primary conversion (one) and secondary actions

Primary: **Cere ofertă** (quote request: what, where, size/capacity, contact). Secondary: tap-to-call (one number visible in header on every page), download datasheets/brochures when the client has them, service request.

Rule: a quote form must be real or visibly marked as not active yet (`05-technical-standards.md`: no fake forms). Demo = form layout shown, submit disabled, notice with the phone and e-mail.

## Section order (home and site)

1. Header: logo, nav, phone, "Cere ofertă" button.
2. Hero: what they do + region + proof line (years, ISO) + two actions (Cere ofertă, Sună).
3. Domenii deservite (food industry, logistics/storage, retail/HoReCa, industrial buildings): own icons or real photos.
4. Servicii: consultanță/proiectare, montaj și punere în funcțiune, service și mentenanță, instruire. Optional: recuperare freoni, A/C auto, autoutilitare izoterme.
5. Produse pe categorii: refrigerare industrială, refrigerare comercială, depozite/camere din panouri, frig adânc, HVAC (chillere, rooftop-uri, AHU), aer comprimat.
6. Mărci reprezentate: text list until the client confirms logo permission.
7. Certificări și autorizări: only what the client documents (ISO 9001, F-gas/AGFR, importer authorization).
8. Proiecte de referință: filterable by domain; capacity numbers when approved (m3, kW, m3/h). Client names only with approval.
9. Despre noi: since when, team, area covered, quality policy.
10. Cerere ofertă (form block) + contact (address, phones, e-mail, map link).
11. Footer: legal identification block (`10-romania-legal-local.md` section 2), privacy and cookies links.

Optional/with client input: referințe cu nume, broșuri PDF, echipă, intervenție urgentă.

## Collect from the client

Logo (vector or largest file), real project photos with captions and capacity numbers, permission per client name and per brand logo, brand authorization documents (distributor/importer certificates), ISO certificate copies, F-gas/AGFR company and technician attestations, quality policy, datasheets and brochures (PDF), service hours and emergency policy (only claim what is true), area covered, who answers quote requests and on which e-mail, correct legal identification (name, CUI, Reg. Com., registered address), which phone numbers and person names may be public.

## Visual direction (derive, do not copy)

- Mood: engineered, precise, calm authority. Cold-chain feeling without cliché blue-ice stock.
- Color from the client's logo (Confortex: red + neutral grey/black; confirm by sampling the logo file). Industrial neutrals plus one brand color. Check with ui-ux-pro-max `--design-system`.
- Shape: derived from the logo (Confortex uses hexagons and a snowflake).
- Numbers and capacities in tabular figures; spec tables over adjectives.
- Motion: low. Only what explains (e.g. temperature/line draw, section reveal). Respect `prefers-reduced-motion`.

## Imagery and media

Real installations (cold rooms, rooftop units on roofs, chillers, plant rooms, service vans) beat stock. Product shots from brand datasheets only with permission. Avoid generic engineers-with-hard-hats stock. If photos are weak: schematic CSS/SVG diagrams (e.g. a cold chain flow) are honest and informative.

## Copy and tone (Romanian)

Formal ("dumneavoastră"). Technical but plain. Specific numbers beat superlatives; "lider zonal" and similar claims only if the client can substantiate them. Buttons: "Cere ofertă", "Sună acum", "Descarcă fișa tehnică", "Solicită service". Diacritics ș ț.

## SEO and schema

schema.org `HVACBusiness` (or `LocalBusiness` with `additionalType`) with `name`, `address`, `telephone`, `email`, `areaServed`, `vatID` (CUI), `foundingDate` when confirmed; `Service` entries per service. Phrases: "frig industrial Iași", "camere frigorifice", "service instalații frigorifice", "centrale de tratare aer", "chillere", plus the region. NAP identical everywhere and on Google Business Profile.

## Compliance and legal

Shared rules: `guidelines/10-romania-legal-local.md`. Niche specifics:
- F-gas / refrigerant handling in Romania requires company and technician certification **[unverified: confirm current rules with the client; the old site cites AGFR certificates from 2013 and a 2006 EC regulation that has since been replaced]**. Show attestations only from current documents.
- Brand logos (York, Güntner, Konvekta...) are trademarks: text names only until written permission.
- "ISO 9001" shown only with a current certificate copy and issuer.
- Reference clients: names only with approval; else anonymize by industry.
- Safety/environment claims (energy savings, refrigerant types) only with a source.

## Features worth adding / not worth adding

Worth: quote form with project type, location, size/capacity, urgency, file upload later (`11-capability-catalog.md`: Server Action + e-mail API + Turnstile, after the client names the receiving e-mail); sticky header phone; filterable references; datasheet downloads; service request block. Not worth: chatbots, live chat widgets, online shop, auto-playing carousels, Google Maps embed before consent (use static link).

## Niche anti-patterns

Phone only on the Contact page; references buried in a 10,000 px page; brand logos without permission; "24/7" or "lider" without proof; stock handshake photos; long mandatory forms; hero image of an unrelated building render.

## Definition of done

Quote action reachable in one tap on every page; one phone visible in the header; legal block in the footer with real CUI; every claim traced to a client document or marked as placeholder; references grouped by domain with capacities; certificates only with documents; LCP < 2.5 s on emulated mobile; no horizontal scroll at 390 and 1280.

## References

- Confortex (old site, **[verified]** 2026-10-02, `audit-old/AUDIT.md`): rich content but contacts only on one page, references in one long page, no quote form, no footer identification, LCP 5.7 s mobile.
- Frigotehnica, frigotehnica.ro **[verified]** 2026-10-02 via page fetch: big national player; hero "Universul Frigului"; credibility numbers (technicians, projects, years, business units); services split commercial, industrial, maintenance; phone, e-mail and hours visible. Take: numbers strip, service split. Don't take: English slogan hero for a Romanian local firm, numbers without client data.
- Frigoterm Expert, frigotermexpert.ro **[verified]** 2026-10-02: "CERE OFERTA" button prominent; phones, e-mail, address, hours visible; maintenance packages (Basic / All Inclusive); cold-room page lacks sizes and temperatures. Take: visible quote CTA, maintenance packages idea (only if Confortex offers contracts: old site says service "pe bază de contract"). Don't take: vague cold-room copy; fill it with real sizes (Confortex old site cites 10 to 2,000 m3 rooms).
- Frigo Iași, frigoiasi.ro **[unverified: site had an expired SSL certificate when fetched, so only a search snippet was read]**: local Iași competitor, "over 20 years", cold rooms and display cases for restaurants and shops.
