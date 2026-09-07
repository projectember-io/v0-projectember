import fs from "node:fs"
import path from "node:path"
import { parseDocument } from "yaml"

export type Update = {
  slug: string
  title: string
  week: number
  date: string
  displayDate: string
  summary: string
  content: string
  href: string
  draft: boolean
}

export function parseUpdate(fileContents: string, filename: string): Update {
  const fail = (message: string): never => { throw new Error(`${filename}: ${message}`) }
  const slug = path.basename(filename, ".md")
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("filename must use lowercase words separated by hyphens")
  const match = fileContents.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/)
  if (!match) return fail("start the file with YAML frontmatter between --- lines")
  const document = parseDocument(match[1])
  if (document.errors.length) fail(`invalid frontmatter: ${document.errors[0].message}`)
  const metadata: unknown = document.toJS({ maxAliasCount: 0 })
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return fail("frontmatter must be a mapping")
  const fields = metadata as Record<string, unknown>
  const text = (key: string) => {
    const value = fields[key]
    if (typeof value !== "string" || !value.trim()) return fail(`${key} must be non-empty text`)
    return value.trim()
  }
  const title = text("title")
  const summary = text("summary")
  const date = text("date")
  const parsedDate = new Date(`${date}T00:00:00.000Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) fail("date must be a real calendar date in YYYY-MM-DD format")
  const week = fields.week
  if (typeof week !== "number" || !Number.isSafeInteger(week) || week < 1) return fail("week must be a positive integer")
  if (fields.draft !== undefined && typeof fields.draft !== "boolean") fail("draft must be true or false")
  const content = match[2].trim()
  if (!content) fail("article body must not be empty")
  return {
    slug, title, summary, date, week, content,
    draft: fields.draft === true,
    displayDate: new Intl.DateTimeFormat("en-AU", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(parsedDate),
    href: `/updates/${slug}`,
  }
}

export function getAllUpdates(directory = path.join(process.cwd(), "content", "updates")): Update[] {
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parseUpdate(fs.readFileSync(path.join(directory, name), "utf8"), name))
    .filter((update) => !update.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

export function getUpdateBySlug(slug: string) {
  return getAllUpdates().find((update) => update.slug === slug)
}
