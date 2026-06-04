import fs from "node:fs"
import path from "node:path"

export type Update = {
  slug: string
  title: string
  week: number
  date: string
  displayDate: string
  summary: string
  content: string
  href: string
}

const updatesDirectory = path.join(process.cwd(), "content", "updates")

function parseFrontmatter(fileContents: string) {
  const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!frontmatterMatch) {
    throw new Error("Update files must start with frontmatter.")
  }

  const frontmatter = frontmatterMatch[1]
  const content = frontmatterMatch[2].trim()
  const metadata: Record<string, string> = {}

  for (const line of frontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":")

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^"|"$/g, "")

    metadata[key] = value
  }

  return { metadata, content }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export function getAllUpdates() {
  if (!fs.existsSync(updatesDirectory)) {
    return []
  }

  return fs
    .readdirSync(updatesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const filePath = path.join(updatesDirectory, fileName)
      const { metadata, content } = parseFrontmatter(fs.readFileSync(filePath, "utf8"))

      return {
        slug,
        title: metadata.title,
        week: Number(metadata.week),
        date: metadata.date,
        displayDate: formatDate(metadata.date),
        summary: metadata.summary,
        content,
        href: `/updates/${slug}`,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getUpdateBySlug(slug: string) {
  return getAllUpdates().find((update) => update.slug === slug)
}
