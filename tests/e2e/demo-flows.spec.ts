import { expect, test, type Page } from "@playwright/test";

async function followPrimaryNav(page: Page, name: RegExp) {
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  if (!(await nav.isVisible())) {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await nav.getByRole("link", { name }).click();
}

test.beforeEach(async ({ page }) => {
  // Sample imagery is hosted on a preview-platform path. Abort those requests
  // so tests remain deterministic and do not imply that the assets are portable.
  await page.route("**/manus-storage/async-images/**", (route) => route.abort());
});

test("home labels demo-only scope and navigation works on desktop and mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".demo-ribbon")).toContainText("DEMO SITE");
  await expect(page.getByRole("main")).toBeVisible();

  await followPrimaryNav(page, /shop/i);
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole("heading", { name: "Small things. Good energy." })).toBeVisible();
});

test("available sample can move through cart and fake checkout without creating a real order", async ({ page }) => {
  await page.goto("/products/daylight-planner");
  await expect(page.getByRole("heading", { name: "Daylight Planner" })).toBeVisible();

  await page.getByRole("radio", { name: "Cobalt" }).check();
  await page.getByRole("button", { name: "Increase sample quantity" }).click();
  await page.getByRole("button", { name: "Increase sample quantity" }).click();
  await expect(page.locator(".product-quantity .quantity-control [aria-live='polite']")).toHaveText("3");

  await page.getByRole("button", { name: /Add sample to demo bag/ }).click();
  await expect(page.getByRole("button", { name: /Added to demo bag/ })).toBeVisible();

  await followPrimaryNav(page, /Cart, 3 sample items/);
  await expect(page.getByRole("heading", { name: "Your sample picks." })).toBeVisible();
  await expect(page.locator(".cart-row")).toHaveCount(1);
  await expect(page.locator(".cart-row__body")).toContainText("Cobalt");
  await expect(page.locator(".cart-row .quantity-control [aria-live='polite']")).toHaveText("3");

  await page.getByRole("link", { name: /Try simulated checkout/ }).click();
  await expect(page.getByRole("heading", { name: "A checkout with no charge." })).toBeVisible();
  await page.locator('input[name="name"]').fill("Alex Sample");
  await page.locator('input[name="email"]').fill("alex@example.test");
  await page.locator('input[name="address"]').fill("123 Fictional Lane");
  await page.locator('input[name="city"]').fill("Sampletown");
  await page.locator('input[name="postcode"]').fill("00000");
  await page.getByRole("button", { name: /Simulate checkout/ }).click();

  await expect(page.getByRole("heading", { name: /This is a demo/ })).toBeVisible();
  await expect(page.locator(".confirmation-card")).toContainText("No payment was taken");
  await expect(page.getByText("FAKE REFERENCE")).toBeVisible();
  await followPrimaryNav(page, /Cart, 0 sample items/);
  await expect(page.getByRole("heading", { name: "Your demo bag is empty." })).toBeVisible();
});

test("unavailable sample products cannot enter the demo cart", async ({ page }) => {
  await page.goto("/products/studio-cup");
  await expect(page.getByRole("heading", { name: "Studio Cup" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Unavailable in this demo" })).toBeDisabled();

  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Your demo bag is empty." })).toBeVisible();
});

test("service enquiry preselects the service and confirms that nothing was sent", async ({ page }) => {
  await page.goto("/services/brand-foundations");
  await page.getByRole("link", { name: /Test an enquiry/ }).click();

  await expect(page).toHaveURL(/\/enquiry\?service=brand-foundations/);
  await expect(page.locator('select[name="service"]')).toHaveValue("brand-foundations");
  await page.locator('input[name="name"]').fill("Alex Sample");
  await page.locator('input[name="email"]').fill("alex@example.test");
  await page.locator('input[name="business"]').fill("Sample project");
  await page.locator('textarea[name="goals"]').fill("Test only; no real project details.");
  await page.getByRole("checkbox", { name: /I understand this is a demo/ }).check();
  await page.getByRole("button", { name: /Test the enquiry form/ }).click();

  await expect(page.locator(".form-confirmation")).toBeVisible();
  await expect(page.locator(".form-confirmation")).toContainText("Nothing was sent");
  await expect(page.locator(".form-confirmation")).toContainText("not transmitted, saved, routed");
});
