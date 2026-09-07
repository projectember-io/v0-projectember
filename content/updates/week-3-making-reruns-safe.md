---
title: "Making my Shlink and n8n podcast workflow safe to rerun"
week: 3
date: "2026-08-14"
summary: "A failed YouTube feed exposed a bigger requirement: recovering podcast links without recreating existing work or sending duplicate emails. Here's the workflow and a runnable example."
draft: false
---

*Updated 8 September 2026 with the reliability work completed in late August.*

The YouTube RSS feed returned a 404, and my podcast link workflow stopped delivering links. The episode still needed its links. A broken discovery step couldn't become a reason to leave that job unfinished.

Recovering the destinations was the immediate task. Making the workflow reliable enough to run again was the more useful fix.

The result of the late-August work was a bounded retry path, a second way to discover episodes, and checks that keep an already-complete episode from creating more work. During two days of scheduled observation, repeated full cycles created no duplicate links and executed no email nodes for the completed episode being checked.

## What the workflow does

A podcast episode has destinations on YouTube, Spotify, and Apple Podcasts. This workflow creates two branded short-link variants for each platform: six links in total.

[Shlink](https://shlink.io/) stores the short links and redirects visitors to the platform destinations. [n8n](https://n8n.io/) connects discovery, checks, creation, and notification into a scheduled workflow. LibraHQ holds the implementation and operational records.

The important decision happens before anything is created: which of those six links are actually missing?

![Podcast link workflow: YouTube RSS retries or a channel-page fallback feed a shared planner, which compares expected links with Shlink before creation. Notifications pass through a separate enable switch.](/images/podcast-link-workflow.svg)

This is a simplified view of the discovery and write decisions, rather than an export of every n8n node.

## Recover the episode, then fix the recurrence

On August 26, the immediate recovery used independently checked platform destinations to create the missing links. All six redirects were then checked against their intended destinations.

That recovered one episode. It left the recurring RSS failure to address.

The hardened workflow tries the feed at most three times, with five-second waits. If the RSS step still fails, its error path fetches the channel's public videos page.

The second source needs a parser because its data is shaped differently from the feed. We added support for the page structure found during the investigation, then converted the result into the format the existing planner expects.

That conversion keeps the downstream behaviour in one place. A fallback should not introduce a second, slightly different set of rules for creating links.

The tradeoff is that page parsing needs maintenance when the upstream page changes. It is another recovery option, not a guarantee that episode discovery can never fail.

## Let the planner decide what is missing

The planner compares the exact expected slugs with the slugs already in Shlink. A slug is the identifying part of a short link after the domain.

The core idea is small enough to show directly:

```js
function missingExactSlugs(expectedSlugs, existingSlugs) {
  const existing = new Set(existingSlugs);
  return expectedSlugs.filter((slug) => !existing.has(slug));
}
```

For example, if an episode needs six slugs and all six already exist, the result is an empty array. If one is missing, only that slug should be planned for creation.

I made a [standalone demonstration](/examples/shlink-rerun-demo.mjs) using invented episode names. Save it and run `node shlink-rerun-demo.mjs`. It needs no dependencies, API keys, or running services.

Its expected output is:

```text
New episode: 6 links to create
Partially complete episode: 1 link to create
Completed episode rerun: 0 links to create
All planning checks passed.
```

This demonstrates the planner's set comparison, not a live Shlink request or the complete production workflow. Concurrent runs still need coordination or conflict handling at the write step; checking first does not make two simultaneous creates atomic.

## Test without turning verification into an email

The workflow also has an explicit notification switch. Both ordinary notifications and alerts pass through it before they can reach Gmail.

During verification, that switch stayed off. The local regression tests used saved and synthetic fixtures. They could exercise discovery parsing and repeat planning without contacting a client or creating a real short link.

For the deployed workflow, we let the normal schedule run and inspected its execution summaries. Manually pressing Execute was unnecessary and would have made it harder to reason about what triggered the work.

## What the checks showed

| Check | Recorded result | What it establishes |
| --- | --- | --- |
| Recovered episode links | Six redirects reached the intended platform destinations | That episode's links worked after recovery. |
| Two days of scheduled full cycles, email disabled | Zero new link creations and zero email-node runs for an already-complete episode | Repeated discovery did not repeat completed work during that observation. |
| First three trigger checks after notifications were re-enabled on August 31 | No link creation or email-node execution | Changing the switch did not itself send anything. These were not a full new-episode test. |

The next full discovery cycle after re-enabling notifications remained an observation step in the runbook. Workflow-volume and off-host backup assurance were also still open. Those are separate jobs from fixing discovery and duplicate prevention.

## The part I'd reuse elsewhere

The useful separation is between discovering work, deciding what remains, and performing the external action.

A feed can be fetched again. A planner can run again. Neither should automatically mean another link or another email.

For another scheduled automation, I'd start with the same small test: give the planner something it has already completed, and check that it plans no new writes. Then test a partially completed job. That is where a retry needs to make progress without repeating everything that succeeded the first time.
