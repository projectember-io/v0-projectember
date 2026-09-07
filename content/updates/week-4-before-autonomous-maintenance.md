---
title: "Before I let an agent maintain the homelab"
week: 4
date: "2026-09-08"
summary: "The observation, recovery, and spending controls I'm preparing before enabling unattended maintenance."
draft: true
---

Project Ember's maintenance work is still in preparation. I haven't switched on general unattended patching across the homelab.

The current work is less visible than watching an agent fix a server: defining the evidence it needs, what it may do, and what stops it when something is unclear.

## Start with observation

The proposed first stage is seven days of observation across a small pilot group.

Ordinary health checks should use deterministic monitoring. An agent becomes useful when a finding needs investigation or a decision, rather than being called repeatedly to interpret an unchanged healthy result.

An unavailable source needs to appear as a coverage gap. It cannot quietly become a green status because no failure was collected.

The same applies to repeated findings. An unchanged problem should update the existing work record, rather than launch another investigation on every polling cycle.

## Give the controls their own job

The local prototype includes request reservations, usage reconciliation, deadlines, retry limits, and durable records of work and outgoing reports.

A reservation accounts for a request before it starts. If the actual usage is unknown afterward, the system should not assume the request was free and immediately spend the same allowance again.

These controls also need to survive restarts. Keeping a counter only in the current agent conversation would lose the information precisely when a failure makes it most useful.

The proposed budgets still need acceptance and enforcement at the real provider boundary. Passing an offline accounting test does not prove that a live model call is bounded.

## Test the awkward cases

The September 7 checkpoint records local tests for repeated events, clock reversal, process failure, unknown usage, and ambiguous delivery.

Review also found a useful distinction in task identity. A problem that is still active should not create duplicate tasks. But if a resolved problem genuinely recurs, it needs to be able to create new work without rewriting the old history.

That is easy to miss if the only test is whether the first event creates a task.

## Observation is not permission to change a server

Before a write pilot, the plan calls for host-specific recovery evidence, constrained access, independent auditing, and verified reporting. The first candidate would have a narrow package scope on one host, following tests on a disposable target.

Restarts, reboots, and changes affecting critical services remain separate decisions.

These are requirements for the pilot, not claims that the whole system already meets them. Provider integration, specialist handoffs, and live delivery evidence remained unfinished in the records used for this draft.

The next useful result will be a demonstrated, bounded workflow with evidence of what happened and where it stopped. That's the progress I want the journal to make visible.
