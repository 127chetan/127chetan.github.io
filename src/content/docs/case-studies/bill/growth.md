---
title: "Developer Platform Growth"
description: How the Postman Collection and a developer tutorial video program drove BILL's API developer base to 2500+, which was early double the OKR target, and generated 130% of the associated revenue goal.
---

## Context

By mid-2025, the BILL v3 API had strong documentation and a mature product release process.

We worked with BILL Product Marketing to find new ways to give developers a faster path from product discovery to a working integration with BILL. I led 2 major project launches in the summer of 2025: the [Postman Collection](/case-studies/bill/ai-postman-collection/) in June, and the first developer tutorial video in July.

Together, these projects addressed 2 points where developer adoption stalled.
- **Evaluation**: Deciding whether the API was worth a developer's time. The Postman Collection compressed the first working API call from hours to minutes.
- **Implementation**: Figuring out how to use the API. The tutorial videos walked developers through core workflows before they opened the API reference docs.

## The developer tutorial video program

The video program started with a content gap: no developer audience was going to sit through a generic product walkthrough. In addition, we wanted to give developers a new format for answers to common questions, and for features that drove revenue for BILL.

The direction was to record and publish tutorial videos showing the API in real workflows, with the actual endpoints and expected responses visible on screen.

I wrote 16 scripts across the program. From these scripts, 11 were published to the [BILL API Platform for Developers playlist](https://www.youtube.com/playlist?list=PLnyriCE50-7zPC1SiWAcC0kyL0DhgWK9Y) on YouTube.

Topics spanned the full developer journey. This is a representative list.

| Topic area | Videos |
|---|---|
| Getting started | Sandbox account & developer key setup; BILL authentication |
| Core AP workflows | Domestic AP payments; Bill approvals |
| Core AR workflows | AR workflow deep dive |
| v3-exclusive features | Working with Spend & Expense; Working with webhooks |
| Embedded finance | BILL Elements onboarding & use |

#### Script structure

Each script followed a consistent structure that made the scripts more usable for recording. The on-screen actions were explicit enough that a non-writer could follow them without interpretation.

| Section | On-screen action | Voiceover |
|---|---|---|
| Setup | Prerequisites the viewer needs before the walkthrough starts | - |
| Introduction | Show the core feature | Introduce the workflow & what the viewer will build |
| Feature chapter 1 | Show action(s) the viewer takes | Explain what the action does & why it matters |
| Chapters 2…n | One chapter per feature in the workflow | Same pairing, repeated for each feature |
| Conclusion | Show end result | Recap what was covered |

#### Feedback & iterations

Before any script was ready for recording, I shared it with the Developer Platform engineers and API solution engineers. Their review covered technical accuracy, depth of information, and whether the information addressed the questions API customers were actually asking. The feedback loop meant the videos were solving real problems, and not just explaining features in the abstract.

#### Videos I recorded

I recorded 2 of the tutorial videos myself ([Bill approvals](https://www.youtube.com/watch?v=qQoo0Zvyg48) and [AR workflow deep dive](https://www.youtube.com/watch?v=SLzl0MvDrv0)). I used Zoom screenshare to record voiceover with a live demo, and then edited the videos in iMovie. The BILL content team handled final publishing. API solution engineers recorded the other 9 videos using the scripts I wrote.

#### Diagrams

For workflows that needed visual explanations beyond on-screen demos, I built diagrams in Lucidchart.

Gemini drew the first drafts. I rebuilt each draft for API developers, aligning sequencing, labels, and visual hierarchy to how a developer thinks about the workflow. BILL brand guidelines kept the diagrams consistent with the rest of the Developer Platform.

#### Claude skill

In June 2026, I used the 16 scripts and the published YouTube tutorials to build a Claude skill that generated first-draft scripts in the same structure ([AI Tooling for Docs](/case-studies/bill/ai-docs-tooling/)).

## Outcomes

#### OKR results

In October 2025, BILL established OKRs for the Developer Platform. API developer adoption (new registered developers actively building with BILL) was a key result set at 1300. By the OKR measurement period ending June 2026, the platform had reached 2500+ active API developers: 192% of the target.

The associated revenue OKR measured payment volume generated through the API. As developers shipped their integrations to production, their users making payments through BILL drove direct revenue. That OKR closed at 130% of the target.

#### Why it worked

The Postman Collection launched first and drove the initial acceleration. The July 2025 tutorial video gave developers a reference point before they started reading the API reference docs. They could watch a tutorial for the AP payments workflow, understand the sequence of calls, and then run API calls directly in Postman with a clear mental model of what they were building.

Together, the tutorial videos and the Postman Collection compressed time-to-first-integration for new developers and lowered the support burden for API solution engineers who were otherwise answering the same onboarding questions repeatedly.

:::note[Top-of-funnel number]
The 2500+ figure was a top-of-funnel number. It measured new registered developers who chose to build with the BILL API Platform, and not every integration that shipped or every payment that was processed.
:::
