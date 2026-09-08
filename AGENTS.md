# Working on Project Ember

Before changing code or publishing content, read [README.md](README.md). It is the source of truth for local builds, article publishing, visual review, deployment and rollback. Use the toolchain pinned in `.node-version` and `package.json`.

- For article or layout changes, follow **Visual review before merging**. Inspect the rendered screenshots in Chromium and WebKit at desktop, tablet and phone widths before accepting baselines. Include new published articles in visual coverage.
- For a release, follow **Deployment and rollback**. Work on a branch, finish visual review where applicable, and wait for CI on the exact revision before merging to `main`. A push to `main` triggers production deployment; Vercel's required `check` job gates promotion.
- A release is complete when the merged commit's CI passes, Vercel reports successful deployment for that commit, and the public pages and affected layouts have been verified. Report unresolved failures instead of declaring the site live.
- Keep durable instructions in tracked files. `docs/` is ignored and contains local editorial notes; future checkouts cannot rely on it.
- Keep local servers bound to loopback. This repository contains the public website and articles; LibraHQ agent runtimes and infrastructure are separate.
