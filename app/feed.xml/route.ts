import { renderFeed } from "@/lib/feed"
import { getSiteUrl } from "@/lib/site"
import { getAllUpdates } from "@/lib/updates"

export const dynamic = "force-static"

export function GET() {
  return new Response(renderFeed(getAllUpdates(), getSiteUrl()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
