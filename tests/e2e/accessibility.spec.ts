import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scanPage(page: Page, route: string) {
  // Preserve in-memory cart state when auditing cart and checkout screens.
  if (new URL(page.url()).pathname !== route) await page.goto(route);
  await expect(page.getByRole("main")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const findings = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    affectedNodes: violation.nodes.length,
    selectors: violation.nodes.slice(0, 3).map((node) => node.target),
  }));

  if (findings.length) {
    console.log(`axe findings for ${route}: ${JSON.stringify(findings)}`);
  }

  // The CI gate blocks high-impact barriers. All findings remain in test logs
  // for triage; passing this gate is not a WCAG conformance certification.
  const blocking = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(
    blocking.map(({ id, impact, help, nodes }) => ({
      id, impact, help, selectors: nodes.slice(0, 3).map((node) => node.target),
    })),
    `Serious/critical accessibility violations at ${route}`,
  ).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.route("**/manus-storage/async-images/**", (route) => route.abort());
});

test("home page has no serious or critical WCAG violations", async ({ page }) => {
  await scanPage(page, "/");
});

test("shop page has no serious or critical WCAG violations", async ({ page }) => {
  await scanPage(page, "/shop");
});

test("product detail has no serious or critical WCAG violations", async ({ page }) => {
  await scanPage(page, "/products/daylight-planner");
});

test("service discovery has no serious or critical WCAG violations", async ({ page }) => {
  await scanPage(page, "/services");
});

test("enquiry form has no serious or critical WCAG violations", async ({ page }) => {
  await scanPage(page, "/enquiry");
});

test("non-empty cart and checkout form have no serious or critical WCAG violations", async ({ page }) => {
  await page.goto("/products/daylight-planner");
  await page.getByRole("button", { name: /Add sample to demo bag/ }).click();
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  if (!(await nav.isVisible())) await page.getByRole("button", { name: "Open navigation" }).click();
  await nav.getByRole("link", { name: /Cart, 1 sample item/ }).click();
  await scanPage(page, "/cart");
  await page.getByRole("link", { name: /Try simulated checkout/ }).click();
  await scanPage(page, "/checkout");
});
