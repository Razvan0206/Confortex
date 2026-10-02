// Opens path#id on desktop and mobile; the target heading must land below the sticky header and inside the viewport.
const puppeteer = require("puppeteer-core");
const BASE = (process.env.BASE_URL || "http://localhost:3100").replace(/\/$/, "");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = [
  ["/contact", "oferta"],
  ["/produse", "refrigerare"], ["/produse", "depozite"], ["/produse", "hvac"], ["/produse", "frig-adanc"],
  ["/proiecte", "refrigerare"], ["/proiecte", "fotografii"], ["/proiecte", "hvac"], ["/proiecte", "chillere"], ["/proiecte", "aer-comprimat"],
  ["/servicii-confortex", "consultanta"], ["/servicii-confortex", "montaj"], ["/servicii-confortex", "service"], ["/servicii-confortex", "instruire"],
];

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  let bad = 0;
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: w < 500 });
    console.log(`\n${w}px:`);
    for (const [path, id] of targets) {
      await page.goto("about:blank"); // fresh load: a same-page hash jump would smooth-scroll from the previous target
      await page.goto(`${BASE}${path}#${id}`, { waitUntil: "networkidle2" });
      await sleep(1600); // html has scroll-behavior: smooth
      const r = await page.evaluate((id) => {
        const s = document.getElementById(id);
        if (!s) return null;
        const head = s.querySelector("h2, h3") || s;
        const t = head.getBoundingClientRect().top;
        const header = document.querySelector("header").getBoundingClientRect().bottom;
        // 24 px of tolerance: scroll-driven reveals shift content by up to 1.25rem
        return { t: Math.round(t), header: Math.round(header), ok: t >= header - 24 && t < innerHeight * 0.6 };
      }, id);
      if (!r || !r.ok) bad++;
      console.log(`  ${path}#${id}: ${r ? `headingTop=${r.t} headerBottom=${r.header} ${r.ok ? "OK" : "BAD"}` : "MISSING"}`);
    }
    await page.close();
  }
  await browser.close();
  console.log(bad ? `\n${bad} problems` : "\nall anchors OK");
  process.exit(bad ? 1 : 0);
})();
