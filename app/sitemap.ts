import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"
import { getAllUpdates } from "@/lib/updates"

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl()
  return [
    { url: new URL("/", origin).href },
    { url: new URL("/updates", origin).href },
    ...getAllUpdates().map((update) => ({ url: new URL(update.href, origin).href, lastModified: update.date })),
  ]
}
