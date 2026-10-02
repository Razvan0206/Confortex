"""Copy extra project photos from the old-site mirror (scrape/) into public/img and write content/blur.json
(10 px WebP data URIs used as next/image blurDataURL, so lazy photos never pop in on a blank block).
    python scripts/build-images.py
"""
import base64, io, json, os, shutil
from PIL import Image

UP = "scrape/files/continut/uploads/2014/12"
EXTRA = {  # new public name -> file in the mirror
    "tablou-chiller": "IMG_0407.jpg",
    "rooftop-acoperis": "IMG_0360.jpg",
    "rooftop-hala": "IMG_0363.jpg",
    "chiller-vas": "Image0875.jpg",
    "compresoare-rack": "PICT1980.jpg",
    "camera-evaporatoare-2": "DSC_0059.jpg",
    "hala-camere": "DSC_0128.jpg",
    "tablou-electric": "Image0556.jpg",
    "rezervoare-agregat": "20131101_120840.jpg",
}
os.makedirs("public/img", exist_ok=True)
for name, src in EXTRA.items():
    dst = f"public/img/{name}.jpg"
    if not os.path.exists(dst):
        shutil.copy(os.path.join(UP, src), dst)

blur = {}
for f in sorted(os.listdir("public/img")):
    if not f.endswith(".jpg"):
        continue
    im = Image.open(f"public/img/{f}").convert("RGB")
    im.thumbnail((10, 10))
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=35, method=6)
    blur[f[:-4]] = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
json.dump(blur, open("content/blur.json", "w"), indent=0)
print(len(blur), "blur entries,", sum(len(v) for v in blur.values()) // 1024, "KB")
