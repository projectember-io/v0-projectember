import assert from "node:assert/strict"
import { test } from "node:test"
import { renderFeed } from "../lib/feed"
import { parseUpdate } from "../lib/updates"

test("RSS escapes content and supplies absolute links and dates", () => {
  const update = parseUpdate('---\ntitle: "A & B"\nweek: 1\ndate: "2026-06-05"\nsummary: "<hello>"\n---\nBody', 'launch.md')
  const xml = renderFeed([update], new URL('https://ember.example'))
  assert.match(xml, /A &amp; B/)
  assert.match(xml, /&lt;hello&gt;/)
  assert.match(xml, /https:\/\/ember.example\/updates\/launch/)
  assert.match(xml, /Fri, 05 Jun 2026 00:00:00 GMT/)
})
