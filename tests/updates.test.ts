import assert from "node:assert/strict"
import { test } from "node:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { getAllUpdates, parseUpdate } from "../lib/updates"

const article = `---
title: "A title: with punctuation"
week: 1
date: "2026-06-05"
summary: >-
  A multiline
  summary.
---
## Hello

Body text.
`

test("reads YAML, BOM and Windows line endings", () => {
  const update = parseUpdate("\uFEFF" + article.replaceAll("\n", "\r\n"), "week-1.md")
  assert.equal(update.title, "A title: with punctuation")
  assert.equal(update.summary, "A multiline summary.")
  assert.equal(update.href, "/updates/week-1")
  assert.equal(update.date, "2026-06-05")
})

for (const [name, input, field] of [
  ["missing title", article.replace(/title:.*\n/, ""), "title"],
  ["invalid week", article.replace("week: 1", "week: nope"), "week"],
  ["fractional week", article.replace("week: 1", "week: 1.5"), "week"],
  ["impossible date", article.replace("2026-06-05", "2026-02-30"), "date"],
  ["invalid date", article.replace("2026-06-05", "tomorrow"), "date"],
  ["duplicate field", article.replace("week: 1", "week: 1\nweek: 2"), "frontmatter"],
  ["invalid draft", article.replace("week: 1", 'week: 1\ndraft: "false"'), "draft"],
  ["empty body", article.slice(0, article.lastIndexOf("---") + 3), "body"],
] as const) {
  test(`rejects ${name} with filename and field`, () => {
    assert.throws(() => parseUpdate(input, "broken.md"), new RegExp(`broken.md:.*${field}`))
  })
}

test("sorts published updates and excludes drafts", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ember-test-"))
  try {
    fs.writeFileSync(path.join(directory, "older.md"), article)
    fs.writeFileSync(path.join(directory, "newer.md"), article.replace("2026-06-05", "2026-07-05"))
    fs.writeFileSync(path.join(directory, "draft.md"), article.replace("week: 1", "week: 1\ndraft: true"))
    assert.deepEqual(getAllUpdates(directory).map((update) => update.slug), ["newer", "older"])
    fs.writeFileSync(path.join(directory, "broken.md"), article.replace("week: 1", "week: 0"))
    assert.throws(() => getAllUpdates(directory), /broken.md: week/)
  } finally { fs.rmSync(directory, { recursive: true }) }
})

test("all repository articles validate", () => { assert.ok(getAllUpdates().length > 0) })
