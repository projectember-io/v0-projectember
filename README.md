# Project Ember

The public engineering journal at https://www.projectember.io, built with Next.js App Router, React, Tailwind CSS, and Markdown. This repository contains the website and articles. Agent runtimes live elsewhere.

## Local development

Use Node **24.18.0** (see `.node-version`) and pnpm **10.34.5** (pinned in `package.json`). With Corepack installed, run `corepack enable` to make pnpm available.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. Development and local production servers bind to loopback by default.

```sh
pnpm check                  # lint, type checking, content/rendering tests, build
pnpm exec playwright install chromium webkit
pnpm test:e2e               # desktop/tablet/mobile checks and article screenshots
```

On a fresh Linux CI host, use `pnpm exec playwright install --with-deps chromium webkit` to install browser system dependencies. GitHub Actions runs these checks on pull requests and pushes to main. Configure branch protection to require the `check` job before merging where the GitHub plan permits it; workflow files alone do not enable branch protection.

## Visual review before merging

Week 2 and Week 3 have screenshot baselines for Chromium and WebKit at desktop, tablet and phone widths. Layout assertions catch oversized diagrams, fragmented table words, narrow agent columns and broken table scrolling. WebKit covers Safari's rendering engine, but does not replace testing on a physical Apple device.

For each article or layout change:

1. Run `pnpm check` and `pnpm test:e2e` on a branch. Add new articles to `tests/browser/articles.spec.ts` when publishing them, adapting the image assertions to their diagrams. A coverage check fails if a published post is omitted. Only the original text-only Week 1 launch post is exempt.
2. Open the `playwright-report` artifact from the PR's CI run. Inspect the full-page attachments at all three widths in both browsers. Read the diagram labels and table columns, and check surrounding spacing and code blocks.
3. For intentional visual changes, inspect the actual screenshots before replacing the matching files in `tests/browser/articles.spec.ts-snapshots/`. Use screenshots from CI's pinned Ubuntu 24.04 environment and locked Playwright version. Local OS/font differences can affect pixels. Never update baselines just to clear a failing check.
4. Commit the reviewed baselines and wait for an ordinary CI run to pass. Record the reviewed viewports in the PR before merging. CI never runs with `--update-snapshots`.

The report includes expected, actual and diff images on a mismatch and is retained for 14 days, including successful runs. A missing baseline fails CI and supplies an actual image for initial review. Screenshot comparisons detect changes; reviewing the first baseline is what establishes whether the layout is acceptable.

## Publishing an update

Add a file under `content/updates/` with a unique lowercase, hyphen-separated filename. The filename becomes its URL. Keep published filenames stable so existing links and RSS identifiers keep working.

```markdown
---
title: "An update title"
week: 3
date: "2026-09-14"
summary: "A short description for the listing, feed, and sharing previews."
draft: true
---

## What changed

Write the article here.
```

`title` and `summary` must contain text, `week` must be a positive integer, and `date` must be a real date in `YYYY-MM-DD` format. YAML multiline strings and Windows line endings are supported. Invalid files fail validation with their filename and field. The date is a publication label, not a scheduler; future-dated posts are visible unless marked as drafts.

Use `draft: true` while preparing a post. Drafts are validated but excluded from pages, direct article routes, RSS, and the sitemap, including local development. Set `draft: false` or remove the field when ready, then inspect a local or deployment preview. Publication still requires deploying the commit.

Articles support headings, links, lists, emphasis, blockquotes, fenced code, tables, and task lists. Raw HTML is disabled. Put article images in `public/images/` and reference them with `/images/...` paths. Describe the image in its Markdown alt text.

Published articles sort by date, newest first; filenames break date ties. Repeated week numbers are allowed. Week numbers identify journal instalments, so they need not match calendar weeks.

## URLs and sharing

The default canonical origin is `https://www.projectember.io`. An optional `SITE_URL` environment variable overrides it for another installation; it must be an HTTP(S) origin with no path, credentials, query, or fragment. Ordinary previews should keep the production origin.

- `/updates` lists published articles.
- `/feed.xml` provides RSS summaries and article links.
- `/sitemap.xml` lists public pages and articles.
- `/opengraph-image` generates the shared social card locally without external image or font requests.
- Article metadata supplies its title, summary, canonical URL, and publication date.

Vercel preview deployments receive a disallow-all robots policy. Vercel Analytics is loaded in production builds. No application secrets are required.

## Deployment and rollback

Vercel deploys pushes to `main` for `jamieeverett-io/v0-project-ember`. This checkout has no Vercel credentials. The production release gate is a hosting setting, not a property of this workflow: in the project's Settings → Deployment Checks, add the GitHub `check` job. Keep automatic production aliasing enabled. [Vercel Deployment Checks](https://vercel.com/docs/deployment-checks) hold the production domain on its previous deployment until the selected check passes. Do not rename the job without updating that setting.

Jamie confirmed enabling the `check` deployment gate on September 8, 2026. Always wait for the PR's checks and visual review before merging. If the hosting configuration changes, verify the gate again; a green build alone does not establish that it is enabled.

In the hosting project's Git settings, verify the repository is `jamieeverett-io/v0-project-ember`, the production branch is `main`, and the custom domain is `www.projectember.io`. Use Node 24, install with `pnpm install --frozen-lockfile`, and build with `pnpm build`. Inspect a preview before merging. Confirm the production deployment's commit SHA matches the merged commit, then check the homepage, latest article, feed, sitemap, and sharing image.

For a self-hosted Node deployment, run the build and `pnpm start` behind the existing reverse proxy. The server binds to `127.0.0.1:3000`; publishing network access is a separate hosting operation.

To roll back on Vercel, promote a previously verified production deployment. For other hosts, redeploy the prior known-good commit with its lockfile. Revert the faulty commit in Git as well so the next deployment does not reintroduce it.

## Maintenance

Dependabot proposes weekly npm updates and monthly workflow updates. Keep Next.js and `eslint-config-next` aligned, and React and React DOM aligned. Review advisories with `pnpm audit`, then run the full checks after dependency changes.

ESLint remains on 9.x because the React, accessibility, and import plugins in Next.js's current config declare support through ESLint 9. TypeScript stays on 5.9 for toolchain compatibility. Upgrade these together when the plugins support the newer versions; do not suppress peer errors to force a major upgrade.

`lib/updates.ts` owns content loading and validation. `components/markdown.tsx` owns article rendering. Shared navigation and publication metadata live in `components/site-header.tsx` and `components/update-meta.tsx`.
