import { chromium } from "playwright";

const base = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
const results = [];

async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (e) {
    results.push({ name, ok: false, error: e.message });
  }
}

await check("get-started page loads", async () => {
  await page.goto(`${base}/get-started`, { waitUntil: "domcontentloaded" });
  const text = await page.locator("h1").innerText();
  if (!text.includes("bugging you")) throw new Error(`Unexpected h1: ${text}`);
});

await check("GPC card routes to /plans", async () => {
  await page.goto(`${base}/get-started`, { waitUntil: "domcontentloaded" });
  await page.locator('button:has(h2:text-is("General Pest Control"))').click();
  await page.waitForURL(/\/plans/, { timeout: 10000 });
});

await check("M&T card routes to mosquito-tick", async () => {
  await page.goto(`${base}/get-started`, { waitUntil: "domcontentloaded" });
  await page.locator('button:has(h2:text-is("Mosquito & Tick"))').click();
  await page.waitForURL(/\/services\/mosquito-tick/, { timeout: 10000 });
});

await check("Hero Get Protected routes to get-started", async () => {
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /Get Protected/i }).first().click();
  await page.waitForURL(/\/get-started/, { timeout: 10000 });
});

await check("Homepage has no PestTicker marquee", async () => {
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  const ticker = await page.locator("text=Mosquitoes").count();
  if (ticker > 2) throw new Error("PestTicker may still be present");
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
