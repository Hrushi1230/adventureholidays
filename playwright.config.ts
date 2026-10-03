import { defineConfig } from "@playwright/test";

const viewports = {
  "mobile-360": { width: 360, height: 640 },
  "mobile-390": { width: 390, height: 844 },
  "tablet-768": { width: 768, height: 1024 },
  "laptop-1366": { width: 1366, height: 768 },
  "desktop-1920": { width: 1920, height: 1080 },
};

export default defineConfig({
  testDir: "./tests/visual",
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  timeout: 90_000,
  fullyParallel: true,
  reporter: [["list"]],
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:8080",
    browserName: "chromium",
    reducedMotion: "reduce",
  },
  projects: Object.entries(viewports).map(([name, viewport]) => ({
    name,
    use: { viewport },
  })),
});
