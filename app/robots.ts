import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(process.env.VERCEL_ENV === "preview" ? { disallow: "/" } : { allow: "/" }) },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).href,
  }
}
