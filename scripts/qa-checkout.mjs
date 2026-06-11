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

await check("get-started loads intent picker", async () => {
  await page.goto(`${base}/get-started`, { waitUntil: "domcontentloaded" });
  const h1 = await page.locator("h1").innerText();
  if (!h1.includes("bugging you")) throw new Error(h1);
});

await check("plans page shows booking wizard", async () => {
  await page.goto(`${base}/plans`, { waitUntil: "domcontentloaded" });
  const wizard = await page.getByText(/property|address|zip/i).first().isVisible().catch(() => false);
  const plans = await page.getByText(/Essential Defense|Premium Shield|Ultimate Fortress/i).count();
  if (!wizard && plans === 0) throw new Error("No wizard or plan content on /plans");
});

await check("book page accepts GPC query params", async () => {
  await page.goto(
    `${base}/book?plan=essential-defense&billing=monthly&size=small`,
    { waitUntil: "domcontentloaded" }
  );
  const url = page.url();
  if (!url.includes("/book")) throw new Error(url);
  const form = await page.locator('input[name="fullName"], input[placeholder*="name" i]').count();
  if (form < 1) {
    const anyInput = await page.locator("input").count();
    if (anyInput < 1) throw new Error("No form inputs on /book");
  }
});

await check("book page accepts mosquito-tick params", async () => {
  await page.goto(
    `${base}/book?serviceType=mosquito-tick&size=medium&billing=monthly`,
    { waitUntil: "domcontentloaded" }
  );
  if (!page.url().includes("/book")) throw new Error("Redirected away from /book");
});

await check("checkout API route exists", async () => {
  const res = await page.request.post(`${base}/api/checkout`, {
    data: {},
    failOnStatusCode: false,
  });
  if (res.status() === 404) throw new Error("POST /api/checkout returned 404");
});

await check("cancel param shows on book page", async () => {
  await page.addInitScript(() => {
    sessionStorage.setItem(
      "squito:book:form:v1",
      JSON.stringify({ fullName: "Test User", email: "test@example.com" })
    );
  });
  await page.goto(
    `${base}/book?plan=premium-shield&billing=monthly&size=medium&canceled=1`,
    { waitUntil: "domcontentloaded" }
  );
  const banner = await page.getByText(/Checkout was cancelled/i).count();
  if (banner < 1) throw new Error("Cancel banner not found");
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
await browser.close();
process.exit(failed.length ? 1 : 0);
