const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const pages = [
  { name: 'home', url: 'http://localhost:3000' },
  { name: 'about', url: 'http://localhost:3000/about' },
  { name: 'services', url: 'http://localhost:3000/services' },
  { name: 'residential', url: 'http://localhost:3000/residential' },
  { name: 'commercial', url: 'http://localhost:3000/commercial' },
  { name: 'plans', url: 'http://localhost:3000/plans' },
  { name: 'pest-library', url: 'http://localhost:3000/pest-library' },
  { name: 'book', url: 'http://localhost:3000/book' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
  { name: 'faq', url: 'http://localhost:3000/faq' },
  { name: 'blog', url: 'http://localhost:3000/blog' },
];

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  for (const p of pages) {
    try {
      console.log(`Capturing ${p.name}...`);
      await page.goto(p.url, { waitUntil: 'load', timeout: 20000 });
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: path.join(screenshotsDir, `${p.name}.png`),
        fullPage: true,
      });
      console.log(`  ✓ ${p.name}.png`);
    } catch (e) {
      console.log(`  ✗ ${p.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
})();
