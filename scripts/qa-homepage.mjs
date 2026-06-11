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

await check("hero dual CTAs present", async () => {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  const getProtected = await page.locator('#hero a:has-text("Get Protected"), #hero-desktop a:has-text("Get Protected")').count();
  const callLink = await page.locator('a[href="tel:6312031000"]').count();
  if (getProtected < 1) throw new Error("Missing Get Protected in hero");
  if (callLink < 1) throw new Error("Missing tel link");
});

await check("trust band copy present", async () => {
  const band = page.locator("#hero, #hero-desktop").getByText(/Same-Day Service/i);
  const count = await band.count();
  if (count < 1) throw new Error("Trust band not found in hero");
});

await check("pest intent section renders", async () => {
  await page.locator("#pest-intent").scrollIntoViewIfNeeded();
  const h2 = await page.locator("#pest-intent h2").innerText();
  if (!h2.includes("What's bugging you")) throw new Error(h2);
});

await check("plans teaser features visible", async () => {
  await page.locator("#plans-teaser").scrollIntoViewIfNeeded();
  const features = await page.locator("#plans-teaser .hidden.md\\:grid ul li").count();
  if (features < 3) throw new Error(`Expected plan features visible, got ${features}`);
});

await check("service area anchor reachable", async () => {
  await page.locator("#service-area").scrollIntoViewIfNeeded();
  await page.waitForSelector("#service-area h2");
});

await check("reviews headline unchanged", async () => {
  await page.locator("#reviews").scrollIntoViewIfNeeded();
  const h2 = await page.locator("#reviews h2").innerText();
  if (!h2.includes("Families love us")) throw new Error(h2);
});

await check("guarantee section present", async () => {
  const text = await page.getByText("Squito Guarantee").count();
  if (text < 1) throw new Error("Missing guarantee section");
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
