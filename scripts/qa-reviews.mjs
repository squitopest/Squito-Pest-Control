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

await check("reviews section renders", async () => {
  await page.goto(`${base}/#reviews`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#reviews");
  const h2 = await page.locator("#reviews h2").innerText();
  if (!h2.includes("Families love us")) throw new Error(h2);
});

await check("score hero shows 5.0", async () => {
  const score = await page.locator("#reviews").getByText("5.0").count();
  if (score < 1) throw new Error("Missing 5.0 score");
});

await check("no auto-scroll duplicate cards", async () => {
  const aleksis = await page.locator("#reviews").getByText("Aleksis Knel").count();
  if (aleksis !== 1) throw new Error(`Expected 1 Aleksis card, got ${aleksis}`);
});

await check("google link present", async () => {
  const href = await page.locator('#reviews a:has-text("See on Google")').getAttribute("href");
  if (!href?.includes("google.com")) throw new Error("Missing Google link");
});

await check("yelp link present", async () => {
  const href = await page.locator('#reviews a:has-text("See on Yelp")').getAttribute("href");
  if (!href?.includes("yelp.com")) throw new Error("Missing Yelp link");
});

await check("no review tag pills", async () => {
  const sameDay = await page.locator("#reviews").getByText("Same-day response").count();
  const noUpsell = await page.locator("#reviews").getByText("No upsell").count();
  if (sameDay > 0 || noUpsell > 0) throw new Error("Review tag pills still visible");
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
