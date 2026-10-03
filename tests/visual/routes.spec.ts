import { test, expect } from "@playwright/test";

// Route smoke coverage. Add a real /tours/{slug} here once a confirmed tour exists.
for (const path of ["/", "/gallery", "/rural-camps", "/picnic-point"]) {
  test(`renders ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

test("unknown tour shows not-found page", async ({ page }) => {
  await page.goto("/tours/unknown-tour");
  await expect(page.getByText("This departure isn't listed.")).toBeVisible();
});
