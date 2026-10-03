import { test, expect, type Page } from "@playwright/test";

// Freeze motion so screenshots are deterministic.
const STABILISE_CSS = `
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
  img { transform: none !important; }
  html { scroll-behavior: auto !important; }
`;

async function preparePage(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: STABILISE_CSS });
  await page.evaluate(() => document.fonts.ready);
  // Pin viewport-relative heights so full-page capture (which resizes the viewport) stays stable.
  await page.evaluate(() => {
    const h = window.innerHeight;
    const style = document.createElement("style");
    style.textContent = `#home{min-height:${h}px !important}section[class*="80svh"]{min-height:${Math.round(h * 0.8)}px !important}`;
    document.head.appendChild(style);
  });
  // Load every lazy image so the full-page capture is complete.
  await page.evaluate(async () => {
    document.querySelectorAll<HTMLImageElement>("img[loading=lazy]").forEach((img) => (img.loading = "eager"));
    await Promise.all(
      Array.from(document.images).map((img) =>
        img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }),
      ),
    );
    window.scrollTo(0, 0);
  });
}

test("home page matches reference", async ({ page }) => {
  await preparePage(page);
  await expect(page).toHaveScreenshot("home-hero.png");
  // Capture each section separately to keep reference images small.
  const sections = page.locator("main > section, footer");
  const count = await sections.count();
  for (let i = 0; i < count; i++) {
    const section = sections.nth(i);
    const id = (await section.getAttribute("id")) ?? `section-${String(i).padStart(2, "0")}`;
    await expect(section).toHaveScreenshot(`home-${id}.png`, { timeout: 15_000 });
  }
});

test("gallery photo viewer matches reference", async ({ page }) => {
  await preparePage(page);
  await page.locator("#gallery").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /^Open image:/ }).first().click();
  const viewer = page.getByRole("dialog", { name: "Image viewer" });
  await expect(viewer).toBeVisible();
  await expect(page).toHaveScreenshot("viewer-open.png");

  await viewer.getByRole("button", { name: "Next" }).click();
  await expect(page).toHaveScreenshot("viewer-next.png");

  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
});
