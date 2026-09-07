import type { Update } from "./updates"
import { site } from "./site"

function xml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!)
}

export function renderFeed(updates: Update[], origin: URL): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${xml(site.name)}</title><link>${xml(origin.href)}</link>
<description>${xml(site.description)}</description><language>en-au</language>
<atom:link href="${xml(new URL("/feed.xml", origin).href)}" rel="self" type="application/rss+xml" />
${updates.map((update) => {
    const url = xml(new URL(update.href, origin).href)
    return `<item><title>${xml(update.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xml(update.summary)}</description><pubDate>${new Date(`${update.date}T00:00:00Z`).toUTCString()}</pubDate></item>`
  }).join("\n")}
</channel></rss>`
}
