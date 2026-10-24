// Renders images/og.png (1200x630) from tools/og.html.
// Run from the repository root with a local server:
//   python3 -m http.server 8765   then   node tools/make-og.js
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto("http://localhost:8765/tools/og.html");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: "images/og.png" });
  await browser.close();
  console.log("images/og.png written");
})();
