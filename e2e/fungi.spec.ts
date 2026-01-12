import { test, expect } from "@playwright/test";

test.describe("Fungi pages", () => {
  test("fungi listing page loads", async ({ page }) => {
    await page.goto("/fungi");
    await expect(page.locator("h1")).toContainText("Our Fungi");
  });

  test("fungi detail page loads", async ({ page }) => {
    await page.goto("/fungi/oyster-mushroom");
    await expect(page.locator("h1")).toContainText("Oyster");
  });
});
