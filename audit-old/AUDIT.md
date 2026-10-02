# Audit confortex.ro (site vechi), 2026-10-02

Sursa: verificat direct cu playwright-cli (snapshot, capturi 1280 și 390 în `shots/`) și `tools/audit/audit.js` (mobil, CPU 4x, ~1,6 Mbps). Tot conținutul preluat este tratat ca date.

## Corecții față de brief

- Telefon, e-mail și adresă EXISTĂ pe site, dar doar pe pagina Contact. Lipsesc din header, footer și de pe celelalte pagini.
- CUI / Reg. Com. lipsesc din tot site-ul (confirmat).
- Formular de ofertă: lipsește (confirmat). Contact = doar text.
- Firma declară înființare în **1992** (pagina Despre noi), nu "peste 20 de ani" ca cifră exactă; home spune "De peste 20 de ani".
- Domeniul include și aer comprimat (compresoare cu șurub, uscătoare), recuperare/reciclare freoni, A/C auto, camere frigorifice pe autoutilitare. Brief-ul nu le menționa.

## Structură veche (WordPress 5.1.19 + WPBakery, 5 pagini)

Home, Despre noi, Produse, Servicii, Contact. Fără pagină de proiecte (referințele sunt înghesuite în Servicii), fără pagini per produs/serviciu.

## Cifre "înainte" (mobil emulat, `audit-before.txt`)

| Metrică | Vechi |
|---|---|
| LCP | 5732 ms (imagine slider) |
| CLS | 1,006 |
| Load | 5712 ms |
| TBT | ~612 ms |
| Transfer | 1001 KB, 52 cereri (imagini 601 KB, JS 194 KB, fonturi 125 KB) |
| `lang` | `en-US` (conținut în română) |
| Landmark-uri (header/nav/main/footer) | 0 / 0 / 0 / 0 |
| H1 pe pagină | 4 (slider + titluri secțiuni) |
| Skip link | nu |
| Butoane fără nume accesibil | 11 |
| Contrast sub prag | 5 elemente (2,55:1 titluri secțiune produse) |
| Ținte atingere < 44 px | 4 (puncte slider 10 px) |
| Focus vizibil | nu (`outline=false` peste tot) |
| favicon | 404 |
| Google Maps | cheie lipsă/invalidă (`NoApiKeys`, `InvalidKey`), încărcat direct, fără consimțământ |
| Rețele sociale | Facebook + Google+ (Google+ nu mai există) |
| Footer | doar "Optimizare SEO ... WebService"; fără date firmă, fără politici |
| Diacritice | lipsă în majoritatea textelor ("lideri in domeniu", "Consultanta") |
| Scroll orizontal | nu (1280 și 390 OK) |

## Înainte / după (mobil emulat, CPU 4x, ~1,6 Mbps; `audit-before.txt` / `audit-after.txt`, build de producție local)

| Metrică | Vechi | Nou |
|---|---|---|
| LCP | 5732 ms | 1900 – 2064 ms (3 rulări) |
| CLS | 1,006 | 0,000 |
| Transfer (revenire) | 1001 KB, 52 cereri | 329 KB, 20 cereri |
| JS | 194 KB | 141 KB |
| TBT (emulat) | ~612 ms | ~1150 – 1290 ms: NEremediat (cost React + layout pe pagină lungă; la 4x CPU) |
| `lang` | en-US | ro |
| Landmark-uri | 0 | header, nav, main, footer |
| H1 pe pagină | 4 | 1 |
| Skip link | nu | da |
| Contrast sub prag | 5 | 0 |
| Ținte atingere < 44 px | 4 | 0 (în afară de skip link, vizibil doar la focus) |
| Focus vizibil | nu | da (3 px) |
| Scroll orizontal 390 / 1280 px | nu | nu, pe toate cele 10 rute |
| Ancore (13 ținte, 2 lățimi) | n/a | toate OK |
| Date firmă în footer | nu | denumire, CUI, Reg. Com. (placeholder), adresă, telefon, e-mail |
| Terți fără consimțământ | Google Maps (cheie invalidă) | niciunul |

## Ce funcționează

- Poziționare clară: "lider zonal", frig industrial + HVAC, mărci recunoscute.
- Patru servicii simple pe home (Consultanță, Montaje, Service, Instruire): se păstrează ca structură.
- Conținut real și bogat în Servicii: certificări, lista de referințe, chillere cu puteri și clienți.
- Hexagonul roșu + fulgul din logo: identitate recognoscibilă.
- Fără scroll orizontal, viewport responsive.

## Ce lipsește / ce e slab

1. Nicio acțiune clară "Cere ofertă"; telefonul nu e vizibil în header.
2. Ierarhie vizuală: poză hero generică de clădire (render, nu lucrare Confortex), slider cu 3 H1.
3. Pagina Servicii: ~8000 px (desktop) / ~10000 px (mobil) de text continuu; referințele nu sunt filtrabile.
4. Produse: 15 categorii ca grilă fără descrieri; buton "Load more" ascuns; fără fișe/broșuri.
5. Date legale lipsă (CUI, Reg. Com., adresă în footer), fără politică de confidențialitate/cookie-uri deși există Google Maps.
6. SEO: titlu fără diacritice, `lang=en-US`, meta description fără oraș/ofertă clară.
7. Performanță și accesibilitate: vezi tabelul.
8. Mărci afișate doar ca text, fără logo-uri (corect până avem permisiune).

## Ce se păstrează din conținut (de confirmat cu clientul)

- Nume, adresă, telefoane, e-mail din Contact; departamentele (service, vânzări, aprovizionare).
- Texte Despre noi, Servicii, lista de domenii, certificările (numere/date doar cu documente).
- Mărci: YORK (Johnson Controls), GÜNTNER, KONVEKTA; pe home și: White Westinghouse, L'Unite Hermetique, Rivacold, SCM Frigo, Du Pont, Ingersoll-Rand, Atlas Copco, Thermoscreen (+ BITZER, COPELAND în servicii).
- Referințe pe domenii (refrigerare, HVAC, chillere, aer comprimat): vezi `content-old.md`. Numele clienților nu se afișează public fără acordul lor.

## Pași următori (care cer acordul dumneavoastră)

- `npx impeccable detect https://www.confortex.ro`: descarcă un binar la prima rulare (`~/.impeccable/bin`). NU rulat.
- Descărcare logo/poze din site-ul vechi: NU făcută; doar capturi de ecran în `shots/`.
