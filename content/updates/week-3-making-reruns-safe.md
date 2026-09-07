---
title: "An automation should know when to do nothing"
week: 3
date: "2026-08-14"
summary: "How I hardened a podcast link workflow with bounded retries, duplicate prevention, and a separate notification switch."
draft: false
---

*Updated 8 September 2026 with the reliability work completed in late August.*

A useful test for an automation is to give it work it has already finished.

Does it recognise that nothing needs doing? Or does it create the same records again and send another email?

One of the workflows maintained through LibraHQ handles podcast links. It discovers episodes, works out the platform destinations, and creates branded short links with Shlink. n8n coordinates the steps.

The late-August work described below was about making repeated runs predictable, including when an upstream feed fails.

## A fallback with a stopping point

The workflow first tries the YouTube RSS feed. It makes at most three attempts, with five-second waits between them. If those fail, it tries the channel's public videos page.

The fallback converts the page data into the same structure the existing planner expects. That means both discovery routes use the same downstream decisions about what to create.

The page parser also needs maintenance as YouTube changes its page structure. A fallback gives us another way to discover an episode; it still needs tests and evidence that it works.

## Check what exists before creating anything

The planner compares the exact expected short-link slugs with the records already in Shlink.

For a complete episode, all six expected links already exist. Running discovery again should produce no creation work.

That behaviour is covered by local regression tests using saved and synthetic fixtures. The tests do not have to create real links or contact a client to establish that a repeated plan contains no writes.

## Keep email separate from verification

Both ordinary notifications and alerts pass through an explicit notification switch.

That let us observe the scheduled workflow with email disabled. We used its normal schedule rather than pressing Execute to test a live workflow with external effects.

The recorded two-day observation showed repeated full cycles reaching the planner with no new short-link creation or email-node execution for an already-complete episode.

Notifications were re-enabled with my approval on August 31. The first three trigger checks after that change also recorded no link creation or email execution. Those short checks established that changing the switch did not itself send anything. The next full discovery cycle remained a separate verification step in the runbook.

## What this proves, and what it doesn't

The evidence supports a specific result: repeated scheduled discovery did not duplicate the links or emails for work that was already complete.

It does not establish that every future episode will publish correctly. Workflow-volume and off-host backup assurance were also still open in the records reviewed for this post.

This is the kind of homelab automation work I want to document. A successful run matters. So does being able to repeat it without wondering what it will do twice.
