import { test, expect } from "@playwright/test";
import path from "node:path";

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;
const image = path.join(process.cwd(), "public/assets/images/deadwood-hero.png");

test("admin can publish a Nano listing and open its public detail", async ({ page }) => {
  test.skip(!email || !password, "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD to run the authenticated CMS flow.");
  const stamp = Date.now();
  const title = `Playwright Nano ${stamp}`;
  const slug = `playwright-nano-${stamp}`;

  await page.goto("/login");
  await page.locator('input[type="email"]').fill(email!);
  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin");
  await page.goto("/admin/cms");

  await page.locator('input[name="title"]').fill(title);
  await page.locator('input[name="sku"]').fill(`PW-${stamp}`);
  await page.locator('input[name="slug"]').fill(slug);
  await page.locator('select[name="category"]').selectOption("NANO_RANDOM");
  await page.locator('textarea[name="description"]').fill("A test listing for the public gallery.");
  await page.locator('input[type="number"]').fill("20");
  await page.locator('select[name="inventoryStatus"]').selectOption("published");
  await page.locator('input[type="file"]').first().setInputFiles([image, image]);
  await expect(page.locator(".deadwood-media-slot.has-file")).toHaveCount(2);
  await page.getByRole("button", { name: "Save Listing" }).click();
  await expect(page.getByRole("status")).toContainText("Published", { timeout: 15_000 });

  await page.goto("/shop");
  const card = page.locator(`a[href="/shop/${slug}"]`).first();
  await expect(card).toBeVisible({ timeout: 15_000 });
  await card.click();
  await expect(page.locator(".detail-image img").first()).toBeVisible();
  await expect(page.getByText("Add to Cart")).toBeVisible();
  await expect(page.getByText("Weight on request")).toHaveCount(0);
  await expect(page.getByText("Not posted yet")).toHaveCount(0);
  await expect.poll(() => page.locator(".detail-image img").first().evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});
