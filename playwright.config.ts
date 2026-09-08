import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/browser",
  reporter: "html",
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.001 } },
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: ["chromium", "webkit"].flatMap((browserName) => [
    { name: `${browserName}-desktop`, use: { ...devices["Desktop Chrome"], browserName: browserName as "chromium" | "webkit", viewport: { width: 1440, height: 1000 } } },
    { name: `${browserName}-tablet`, use: { ...devices["iPad Mini"], defaultBrowserType: browserName as "chromium" | "webkit" } },
    { name: `${browserName}-mobile`, use: { ...devices["iPhone 13"], defaultBrowserType: browserName as "chromium" | "webkit" } },
  ]),
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
  },
})
