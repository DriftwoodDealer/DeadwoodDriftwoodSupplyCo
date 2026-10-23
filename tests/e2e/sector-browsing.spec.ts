import { test, expect } from "@playwright/test";
import { inventoryItems, sectors } from "../../lib/mock-inventory";

test("shop selector uses the current artwork below tablet navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/shop");
  const navigation = page.getByRole("navigation", { name: "Shop sections" });
  await expect(navigation.getByRole("link")).toHaveCount(5);
  await expect(
    navigation.getByRole("link", {
      name: "Wholesale — Supply for your business",
    }),
  ).toHaveAttribute("href", "/wholesale");
  await expect
    .poll(() =>
      page
        .locator("picture img")
        .first()
        .evaluate((image) => (image as HTMLImageElement).currentSrc),
    )
    .toContain("from-the-water.webp");
  const header = await page.locator(".site-header").boundingBox();
  expect((await page.locator("picture").first().boundingBox())?.y).toBe(
    header!.y + header!.height,
  );
  expect(await navigation.evaluate((element) => getComputedStyle(element).columnGap)).toBe("2px");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    768,
  );
});

test("desktop selector shows linked collections beneath the full-width hero", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const images: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "image") images.push(request.url());
  });
  await page.goto("/shop");
  await expect(
    page.getByRole("navigation", { name: "Shop sections" }),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Shop sections" }).getByRole("link")).toHaveCount(5);
  await expect
    .poll(() =>
      page
        .locator("picture img")
        .first()
        .evaluate((image) => (image as HTMLImageElement).currentSrc),
    )
    .toContain("from-the-water.webp");
  expect((await page.locator("picture").first().boundingBox())?.y).toBe(0);
  expect(
    images.some((url) =>
      /hero-mobile|desktop-1920/.test(
        url,
      ),
    ),
  ).toBe(false);
});

test("shared desktop footer links home and email, and waits for mobile artwork", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/shop");
  const footer = page.getByRole("contentinfo", { name: "Site footer" });
  await expect(footer).toHaveCount(1);
  await expect(footer).toBeVisible();
  await expect(footer.getByRole("link", { name: "Email Deadwood Driftwood Supply Co." })).toHaveAttribute("href", "mailto:deadwooddriftwood@gmail.com");
  await footer.getByRole("link", { name: "DEADWOOD — Back to homepage" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(footer).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(footer).toBeHidden();
});

test("mobile collection links render their destination rather than retaining selector", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop");
  await expect(
    page.getByRole("link", { name: "RELICS — Artistry meets everyday use", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Taxidermy — A natural stage for your work" })
    .click();
  await expect(page).toHaveURL(/\/shop\/taxidermy$/);
  await expect(page.locator("#taxidermy-hero-title")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Shop sections" }),
  ).toHaveCount(0);
});

for (const path of ["/", "/shop"]) {
  test(`${path} offers sectors without a mixed product catalog`, async ({
    page,
  }) => {
    if (path === "/shop")
      await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await expect(page.locator(".product-card, .featured-piece")).toHaveCount(0);
    for (const sector of sectors) {
      await expect(
        page.locator(
          path === "/shop"
            ? `nav[aria-label="Shop sections"] a[href="/shop/${sector.slug}"]`
            : `a.home-sector-card[href="/shop/${sector.slug}"]`,
        ),
      ).toBeVisible();
    }
  });
}

for (const sector of sectors) {
  test(`${sector.name} only lists its assigned inventory`, async ({ page }) => {
    await page.goto(`/shop/${sector.slug}`);
    const labels = await page
      .locator(".product-card .product-kicker")
      .allTextContents();
    const ownItems = inventoryItems.filter(
      (item) =>
        item.sector === sector.aliases[0] && item.status === "published",
    );
    if (ownItems.length) expect(labels.length).toBeGreaterThan(0);
    expect(labels.every((label) => label === sector.aliases[0])).toBe(true);
    for (const item of inventoryItems.filter(
      (item) => item.sector !== sector.aliases[0],
    )) {
      await expect(page.locator(`a[href="/shop/${item.slug}"]`)).toHaveCount(0);
    }
  });
}

for (const slug of ["reptile", "landscaping"]) {
  test(`${slug} Browse All remains in that sector`, async ({ page }) => {
    const sector = sectors.find((sector) => sector.slug === slug)!;
    await page.goto(`/shop/${slug}`);
    await page
      .getByRole("button", {
        name: `Browse all ${slug} driftwood forms across sizes`,
      })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: `All ${sector.name} Forms` }),
    ).toBeVisible();
    for (const item of inventoryItems.filter(
      (item) => item.sector !== sector.aliases[0],
    )) {
      await expect(
        dialog.locator(".piece-browser-item-title", { hasText: item.title }),
      ).toHaveCount(0);
    }
    const ownItem = inventoryItems.find(
      (item) =>
        item.sector === sector.aliases[0] && item.status === "published",
    )!;
    await expect(
      dialog.locator(".piece-browser-item-title", { hasText: ownItem.title }),
    ).toBeVisible();
  });
}

test("taxidermy detail returns to taxidermy despite legacy reptile tags", async ({
  page,
}) => {
  await page.goto("/shop/taxidermy-perch-branch");
  await expect(
    page.getByText("← Back to Taxidermy", { exact: true }),
  ).toBeVisible();
  await page.getByText("← Back to Taxidermy", { exact: true }).click();
  await expect(page).toHaveURL(/\/shop\/taxidermy$/);
});
