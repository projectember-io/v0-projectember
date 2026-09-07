import { getSiteUrl } from "../../lib/site"
import { expect, test } from "@playwright/test"

test("homepage, anchors and article navigation work without horizontal overflow", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(page.locator('link[type="application/rss+xml"]')).toHaveAttribute("href", new URL("/feed.xml", getSiteUrl()).href)
  await page.getByRole("navigation").getByRole("link", { name: "About", exact: true }).click()
  const top = await page.locator("#about").evaluate((element) => element.getBoundingClientRect().top)
  expect(top).toBeGreaterThanOrEqual(64)
  await page.getByRole("link", { name: "Read recent updates" }).click()
  await page.locator('main a[href^="/updates/"]').first().click()
  await expect(page.locator("article h1")).toBeVisible()
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article")
  await expect(page.locator("time").first()).toHaveAttribute("datetime", /\d{4}-\d{2}-\d{2}/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test("skip link moves keyboard focus to main content", async ({ page }) => {
  await page.goto("/")
  await page.keyboard.press("Tab")
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page.locator("main")).toBeFocused()
})

test("feeds, sharing image, sitemap, and unknown routes respond correctly", async ({ request }) => {
  const feed = await request.get("/feed.xml")
  expect(feed.status()).toBe(200)
  expect(feed.headers()["content-type"]).toContain("application/rss+xml")
  expect(await feed.text()).toContain("/updates/week-1-launch")
  const sitemap = await request.get("/sitemap.xml")
  expect(sitemap.status()).toBe(200)
  expect(await sitemap.text()).not.toContain("catch-up")
  const image = await request.get("/opengraph-image")
  expect(image.status()).toBe(200)
  expect(image.headers()["content-type"]).toContain("image/png")
  expect((await request.get("/updates/not-a-real-post")).status()).toBe(404)
  expect((await request.get("/updates/catch-up")).status()).toBe(404)
})
