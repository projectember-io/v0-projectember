---
title: "Meet the team building my homelab automation"
week: 2
date: "2026-06-12"
summary: "Why I split homelab maintenance and personal admin between specialist agents, what each one owns, and how I want their handoffs to work."
---

*Updated 8 September 2026 to reflect the team's evolving roles.*

My homelab supports the things I do every day: editing work, media storage, self-hosted services, and the household network. Keeping it running means dealing with jobs that rarely stay inside one tidy category.

A service can look broken when its storage has disappeared. A storage problem can look like a network problem. Before changing anything, someone has to work out which system is actually responsible.

I already used AI to help troubleshoot. The next question was whether I could give agents ongoing responsibilities and enough shared context to pick up work without starting every conversation from scratch.

That's the idea behind the team inside LibraHQ. Project Ember is where I document how it develops.

## The idea that got me thinking

Väinämöinen, Pulsed Media's AI support and systems administration agent, was one of my inspirations. Their [account of building it](https://pulsedmedia.com/blog/2026/02/vainamoinen-autonomous-ai-sysadmin-transformed-support-costs-with-91-autonomy/) connects a recurring operational burden with an agent given defined responsibilities. It also describes mistakes and the controls introduced afterward.

That combination matters to this project. I want help with real work, and I need to understand what happens when the agent gets something wrong.

For my setup, I've divided the work into IT Operations and a personal team. The roles are established, but the amount each agent can do varies. General unattended maintenance is still being prepared; the names below aren't a claim that the homelab already runs itself.

## IT Operations: who owns the problem?

Integrity coordinates three technical specialists. This is the intended division of responsibility:

![IT Operations structure: Integrity coordinates Forge for systems, Vault for storage and knowledge, and Conduit for networking.](/images/it-operations-team.svg)

| Agent | Responsibility | A question that belongs here |
| --- | --- | --- |
| **Integrity** | CTO, orchestration, and review | What needs investigating, who should do it, and what evidence would close the task? |
| **Forge** | Systems engineering | Is the service running, what do its logs say, and which dependency is failing? |
| **Vault** | Storage and knowledge management | Is the data available, is the backup usable, and do the records match the system? |
| **Conduit** | Networking and infrastructure | Can the systems reach each other, and are DNS, routing, and network policy behaving as intended? |

The point of the split is to make ownership clear. Forge shouldn't have to guess whether a storage change is safe. Integrity should be able to ask Vault for the relevant evidence before deciding what happens next.

## What a useful handoff would look like

Consider a media service that opens normally but cannot play a file. This is an illustration of the workflow I want, not a claim that the agents have completed this sequence autonomously.

1. **Integrity defines the investigation.** Establish whether the failure is in the application or one of its dependencies. Start with observation.
2. **Forge checks the service.** The application may be running while its media mount is unavailable. That finding narrows the next question.
3. **Vault checks the storage side.** Is the share available, and can the expected data be read? Conduit joins if there is evidence of a connectivity problem.
4. **Integrity reviews the proposed action.** A service restart or disruptive change comes back to me for approval.
5. **The result is checked where the problem appeared.** A green service status is not enough; the affected media needs to be readable again. The record should say what was verified and what remains unexplained.

That last step is easy to lose. The value of the handoff is having someone carry the problem through to a checked result.

## The personal team: less admin to reconstruct

Infrastructure is only part of the overhead I want to reduce. The other team focuses on tasks, information, and everyday decisions.

| Agent | Its job | Where the work stands |
| --- | --- | --- |
| **Ember** | Executive assistant and HQ operations | Briefings, task tracking, and inbox/calendar context. Ember is the central point for what needs my attention. |
| **Scout** | Deals and price watching | Still developing. The aim is to compare relevant offers with what I actually buy and normally pay. |
| **Endeavour** | Finance and growth | Current work centres on finance records and invoice handoffs. Payments and financial commitments remain separate decisions. |

Ember needs to remember an outstanding task. Scout needs price history. Endeavour needs the relevant financial records. Giving them the same pile of information and tools would make those different jobs harder to define.

## What I'm trying to prove

The next milestone is a verified handoff: a finding becomes a scoped task, the right specialist investigates it, and the result reaches review with enough evidence to make a decision.

I don't yet have a measured time-saving figure for the team as a whole. That's something the actual workflows need to establish.

If you're building something similar, start with one recurring job. Write down its inputs, the decisions it requires, and what a successful result looks like. The agent's name can come afterward. Its responsibility needs to be clear first.
