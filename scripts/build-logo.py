"""Redraw the Confortex logo as vector (the only original is a 223x40 px PNG).
- snowflake: 6 arms, each with a V pair of branches (geometry measured on the original: branch base at 0.62 R, 64 deg off the arm, 0.36 R long)
- wordmark CONFORTEX (EX in the logo red) and the slogan, from Arimo outlines (OFL, metric twin of Arial, which the original wordmark resembles)
- slogan now has its diacritics ("excelența confortului dumneavoastră"); the original PNG had none
    python scripts/build-logo.py      (needs scrape/fonts/Arimo.ttf, see guidelines/12-lessons-confortex.md)
Writes content/logo.json (used by components/Logo.tsx) and public/logo.svg, public/logo-mark.svg.
"""
import json, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

font = TTFont("scrape/fonts/Arimo.ttf")
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
UPM, CAP = font["head"].unitsPerEm, font["OS/2"].sCapHeight
R4 = lambda v: f"{v:.2f}".rstrip("0").rstrip(".")


def text_path(text, x, baseline, cap_px, track=0.0, width=None):
    """Outline `text` at x/baseline. `cap_px` sets the size; if `width` is given the size is solved to hit it."""
    adv = sum(hmtx[cmap[ord(c)]][0] for c in text)
    s = cap_px / CAP
    if width:
        n = len(text) - 1
        s = (width - track * n) / adv
    pen = SVGPathPen(gs, ntos=R4)
    cx = x
    for c in text:
        g = cmap[ord(c)]
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx, baseline)))
        cx += hmtx[g][0] * s + track
    return pen.getCommands(), cx - track - x


def flake(cx, cy, r, base=0.62, spread=64, blen=0.36):
    d = []
    for k in range(6):
        a = math.radians(-90 + 60 * k)
        ux, uy = math.cos(a), math.sin(a)
        d.append(f"M{R4(cx)} {R4(cy)}L{R4(cx + ux * r)} {R4(cy + uy * r)}")
        bx, by = cx + ux * r * base, cy + uy * r * base
        for side in (-1, 1):
            b = a + side * math.radians(spread)
            d.append(f"M{R4(bx)} {R4(by)}L{R4(bx + math.cos(b) * r * blen)} {R4(by + math.sin(b) * r * blen)}")
    return "".join(d)


CAP_PX, TRACK, X0, H = 22, 0.6, 48, 40
flake_d = flake(20, 20, 18.5)
white_txt, w1 = text_path("CONFORT", X0, 0, CAP_PX, TRACK)  # width probe only
_, w_ex = text_path("EX", 0, 0, CAP_PX, TRACK)
word_w = w1 + TRACK + w_ex
out = {}
for name, base_y, with_tag in (("mark", 20 + CAP_PX / 2, False), ("full", 24.5, True)):
    white, w_white = text_path("CONFORT", X0, base_y, CAP_PX, TRACK)
    red, _ = text_path("EX", X0 + w_white + TRACK, base_y, CAP_PX, TRACK)
    item = {"w": round(X0 + word_w + 2, 2), "h": H, "flake": flake_d, "white": white, "red": red}
    if with_tag:
        tag, _ = text_path("excelența confortului dumneavoastră", X0, 37.5, 0, 0.0, width=word_w)
        item["tag"] = tag
    out[name] = item
# the site only needs the compact lockup (the slogan is real text in the footer); the full lockup stays in public/logo.svg
json.dump(out["mark"], open("content/logo.json", "w"), separators=(",", ":"))

RED = "#ff0019"
for name, item in out.items():
    tag = f'<path fill="#fff" d="{item["tag"]}"/>' if "tag" in item else ""
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {item["w"]} {item["h"]}" role="img" aria-label="Confortex">'
        f'<path fill="none" stroke="#fff" stroke-width="2.1" d="{item["flake"]}"/>'
        f'<path fill="#fff" d="{item["white"]}"/><path fill="{RED}" d="{item["red"]}"/>{tag}</svg>'
    )
    open(f"public/logo{'-mark' if name == 'mark' else ''}.svg", "w", encoding="utf-8").write(svg)
print({k: (v["w"], v["h"]) for k, v in out.items()})
