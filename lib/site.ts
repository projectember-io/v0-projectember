export const site = {
  name: "Project Ember",
  description: "Jamie Everett’s practical homelab automation journal: AI agents, self-hosted services, maintenance, and the evidence behind what works.",
  author: "Jamie Everett",
}

// Keep preview builds and feeds linked to the public production origin.
export function getSiteUrl(): URL {
  const configured = process.env.SITE_URL ?? "https://www.projectember.io"
  const url = new URL(configured)
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, a path, query, or fragment")
  }
  return url
}

export const feedAlternates = { types: { "application/rss+xml": "/feed.xml" } }
