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

test("unknown album shows gallery not-found page", async ({ page }) => {
  await page.goto("/gallery/unknown-album");
  await expect(page.getByText("Tour album not found.")).toBeVisible();
});

for (const [path, label, text] of [["/rural-camps", "Enquire About Rural Camps", "Rural Camps"], ["/picnic-point", "Plan Your Picnic", "Picnic Point"]] as const) {
  test(`${path} has a WhatsApp enquiry CTA`, async ({ page }) => {
    await page.goto(path);
    const cta = page.getByRole("link", { name: label }).first();
    await expect(cta).toBeVisible();
    const href = decodeURIComponent((await cta.getAttribute("href")) ?? "");
    expect(href).toContain("wa.me/919937524018");
    expect(href).toContain(`enquire about ${text}.`);
  });
}
