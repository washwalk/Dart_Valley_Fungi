import { test, expect } from "@playwright/test";

test("homepage loads successfully", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Dart Valley Fungi/);
});

test("navigation links work", async ({ page }) => {
  await page.goto("/");
  
  await page.click("text=Our Fungi");
  await expect(page).toHaveURL(/.*fungi/);
  
  await page.click("text=Shop");
  await expect(page).toHaveURL(/.*shop/);
  
  await page.click("text=Blog");
  await expect(page).toHaveURL(/.*blog/);
});
