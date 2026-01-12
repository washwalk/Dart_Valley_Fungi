import { test, expect } from "@playwright/test";

test.describe("Shop pages", () => {
  test("shop page loads", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator("h1")).toContainText("Shop");
  });

  test("product page loads", async ({ page }) => {
    await page.goto("/shop/oyster-mushroom-fresh");
    await expect(page.locator("h1")).toContainText("Oyster");
  });
});
