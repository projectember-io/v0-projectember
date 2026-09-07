import { expect, test } from "@playwright/test"

const articles = ["week-2-meet-the-team", "week-3-making-reruns-safe"]

for (const slug of articles) {
  test(`${slug} stays readable and matches the reviewed layout`, async ({ page }, testInfo) => {
    await page.goto(`/updates/${slug}`)
    await page.evaluate(() => document.fonts.ready)
    const article = page.locator("article")
    const diagram = article.locator("img")
    await expect(diagram).toBeVisible()
    await diagram.evaluate((image: HTMLImageElement) => image.decode())
    const bounds = await diagram.boundingBox()
    expect(bounds).not.toBeNull()
    expect(bounds!.height).toBeLessThanOrEqual(slug.startsWith("week-2") ? 365 : 706)
    const content = await page.locator(".article-content").boundingBox()
    expect(Math.abs(bounds!.x + bounds!.width / 2 - (content!.x + content!.width / 2))).toBeLessThan(2)

    for (const table of await article.locator("table").all()) {
      // Measure the rendered text, not just the CSS declaration: every word
      // in a cell must fit without breaking into fragments on separate lines.
      const brokenWords = await table.evaluate((element) => {
        const broken: string[] = []
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) {
          const node = walker.currentNode
          // Hyphens are legitimate line-break opportunities.
          for (const match of node.textContent!.matchAll(/[\p{L}\p{N}]+/gu)) {
            const range = document.createRange()
            range.setStart(node, match.index!)
            range.setEnd(node, match.index! + match[0].length)
            if (new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top))).size > 1) broken.push(match[0])
          }
        }
        return broken
      })
      expect(brokenWords).toEqual([])
    }

    if (slug.startsWith("week-2")) {
      for (const cell of await article.locator("tr > :first-child").all()) {
        const size = await cell.boundingBox()
        expect(size!.width).toBeGreaterThanOrEqual(119)
        const lines = await cell.evaluate((element) => {
          const range = document.createRange()
          range.selectNodeContents(element)
          return new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top))).size
        })
        expect(lines).toBe(1)
      }
    }

    for (const wrapper of await article.locator(".article-table").all()) {
      const dimensions = await wrapper.evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }))
      if (page.viewportSize()!.width < 600) {
        expect(dimensions.scroll).toBeGreaterThan(dimensions.client)
        await wrapper.focus()
        await page.keyboard.press("ArrowRight")
        await expect.poll(() => wrapper.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
        await wrapper.evaluate((element) => { element.scrollLeft = 0; (element as HTMLElement).blur() })
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)

    // Full articles include surrounding copy, diagrams, tables and code blocks.
    // Keep these in the report even on successful runs for editorial review.
    await page.evaluate(() => window.scrollTo(0, 0))
    await testInfo.attach(`${slug}-page`, { body: await page.screenshot({ fullPage: true, animations: "disabled" }), contentType: "image/png" })
    await expect(article).toHaveScreenshot(`${slug}.png`)
  })
}
