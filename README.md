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
pnpm exec playwright install chromium
pnpm test:e2e               # desktop/mobile checks against the production build
```

On a fresh Linux CI host, use `pnpm exec playwright install --with-deps chromium` to install browser system dependencies. GitHub Actions runs these checks on pull requests and pushes to main. Configure branch protection to require the `check` job before merging; workflow files alone do not enable branch protection.

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

The production domain returned HTTP 200 from Vercel during the September 7, 2026 review. The original scaffold linked this repository to a v0/Vercel project, but this checkout has no hosting credentials or linked Vercel configuration. The active Git deployment connection and branch protection still need verification in the hosting and repository settings.

In the hosting project's Git settings, verify the repository is `jamieeverett-io/v0-project-ember`, the production branch is `main`, and the custom domain is `www.projectember.io`. Use Node 24, install with `pnpm install --frozen-lockfile`, and build with `pnpm build`. Inspect a preview before merging. Confirm the production deployment's commit SHA matches the merged commit, then check the homepage, latest article, feed, sitemap, and sharing image.

For a self-hosted Node deployment, run the build and `pnpm start` behind the existing reverse proxy. The server binds to `127.0.0.1:3000`; publishing network access is a separate hosting operation.

To roll back on Vercel, promote a previously verified production deployment. For other hosts, redeploy the prior known-good commit with its lockfile. Revert the faulty commit in Git as well so the next deployment does not reintroduce it.

## Maintenance

Dependabot proposes weekly npm updates and monthly workflow updates. Keep Next.js and `eslint-config-next` aligned, and React and React DOM aligned. Review advisories with `pnpm audit`, then run the full checks after dependency changes.

ESLint remains on 9.x because the React, accessibility, and import plugins in Next.js's current config declare support through ESLint 9. TypeScript stays on 5.9 for toolchain compatibility. Upgrade these together when the plugins support the newer versions; do not suppress peer errors to force a major upgrade.

`lib/updates.ts` owns content loading and validation. `components/markdown.tsx` owns article rendering. Shared navigation and publication metadata live in `components/site-header.tsx` and `components/update-meta.tsx`.
