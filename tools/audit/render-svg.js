// node render-svg.js <in.svg> <out.png> <widthPx> [background|transparent]  -> PNG of an SVG (headless Chrome)
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
(async () => {
  const [, , inp, out, w = "800", bg = "transparent"] = process.argv;
  const svg = fs.readFileSync(inp, "utf8");
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const page = await browser.newPage();
  const [, vw, vh] = svg.match(/viewBox="-?[\d.]+ -?[\d.]+ ([\d.]+) ([\d.]+)"/);
  const width = Number(w), height = Math.ceil((width * vh) / vw);
  await page.setViewport({ width, height });
  await page.setContent(`<body style="margin:0;background:${bg}"><div style="width:${width}px;height:${height}px">${svg.replace("<svg ", `<svg width="${width}" height="${height}" `)}</div></body>`);
  await page.screenshot({ path: out, omitBackground: bg === "transparent" });
  await browser.close();
})();
