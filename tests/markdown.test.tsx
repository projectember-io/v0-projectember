import assert from "node:assert/strict"
import { test } from "node:test"
import { renderToStaticMarkup } from "react-dom/server"
import { Markdown } from "../components/markdown"

test("renders links, lists, emphasis, code and GFM tables", () => {
  const html = renderToStaticMarkup(<Markdown>{'## Heading\n\n- **Strong** and [link](https://example.org)\n\n```ts\nconst x = 1\n```\n\n| Name | Value |\n| --- | --- |\n| Ember | 1 |'}</Markdown>)
  for (const expected of ['<h2>', '<ul>', '<strong>', 'href="https://example.org"', '<pre>', '<table>']) assert.ok(html.includes(expected), expected)
})

test("does not render raw HTML or executable links", () => {
  const html = renderToStaticMarkup(<Markdown>{'<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)\n\n<img src=x onerror=alert(1)>'}</Markdown>)
  assert.doesNotMatch(html, /<script|<img|javascript:|onerror=/)
})
