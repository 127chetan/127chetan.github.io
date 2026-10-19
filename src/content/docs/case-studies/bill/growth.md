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

The video program started with a content gap: no developer audience was going to sit through a generic product walkthrough. In addition, we wanted to give developers a new medium of instructions for their commonly asked questions and for features that generated more revenue for BILL.

The direction was to record and publish tutorial vidoes showcasing the API in real workflows, specific use cases, actual endpoints, and expected responses visible on screen.

I wrote 16 scripts across the program. From these scripts, 11 were published to the [BILL API Platform for Developers playlist](https://www.youtube.com/playlist?list=PLnyriCE50-7zPC1SiWAcC0kyL0DhgWK9Y) on YouTube. 

Topics spanned the full developer journey.

| Topic area | Videos |
|---|---|
| Getting started | Sandbox account & developer key setup; BILL authentication |
| Core AP workflows | Domestic AP payments; Bill approvals |
| Core AR workflows | AR workflow deep dive |
| v3-exclusive features | Working with Spend & Expense; Working with webhooks |
| Embedded finance | BILL Elements onboarding & use |

Each script followed a consistent structure: a setup section defining prerequisites, on-screen action callouts for what the viewer should do, and voiceover narration organized into an introduction, a set of feature chapters, and a conclusion. The structure made the scripts usable by anyone recording — the on-screen actions were explicit enough that a non-writer could follow them without interpretation.

Before any script was finalized, I shared it with the Developer Platform engineers and API solution engineers. Their review covered technical accuracy, the depth of information, and whether the content addressed the questions API customers were actually asking. That feedback loop meant the videos were solving real problems, not explaining features in the abstract.

I went even further with recording 2 tutorial videos (Bill approvals, and the AR workflow deep dive) using Zoom screenshare, recording with voice while demoing the live features, then editing in iMovie. The content team handled final publishing. The remaining 9 were recorded by API solution engineers using the same scripts.

For workflows that needed visual explanation beyond what a screenshare could show, I built diagrams in Lucidchart. Gemini drafted the initial structure; I took that draft and rebuilt it for an API customer audience — sequencing, labeling, and visual hierarchy aligned to how a developer thinks about the workflow, not how BILL thinks about the product. BILL brand guidelines kept the diagrams consistent with the rest of the Developer Platform.

In June 2026, I used the 16 scripts and the published YouTube tutorials as input to build a Claude skill ([AI Tooling for Docs](/case-studies/bill/ai-docs-tooling/)). Given a topic and the relevant API operations, the skill generates a first-draft script with the same setup section, on-screen action callouts, and voiceover chapters. The skill was designed so that each time the team shipped endpoints that introduced or extended a BILL workflow, a first-draft script would be ready as soon as the documentation went live. The structure I refined by hand across 16 scripts became available to anyone on the team.

## The numbers

In October 2025, BILL established OKRs for the Developer Platform. API developer adoption — new registered developers actively building with BILL — was a key result, set at 1300. By the OKR measurement period ending June 2026, the platform had reached 2500+ active API developers: 192% of the target.

The associated revenue OKR measured payment volume generated through the API — as developers shipped their integrations to production, their users making payments through BILL drove direct revenue. That OKR closed at 130% of target.

The Postman Collection launched first and drove the initial acceleration. The July 2025 tutorial video gave developers a reference point before they even opened the API reference — they could watch an AP payments workflow, understand the sequence of calls, and then open Postman with a clear mental model of what they were building. The combination compressed time-to-first-integration for new developers and lowered the support burden for API solution engineers who were otherwise answering the same onboarding questions repeatedly.

## What the growth represented

2500+ active API developers is a top-of-funnel number. It measures how many developers, teams, and partners were actively building with the BILL API Platform. It doesn't measure every integration that shipped or every payment that was processed — it measures the front of the funnel, the moment a developer chose to build.

Every API documentation decision made between 2021 and 2026 contributed to that number in some way: the ReadMe migration that made the docs credible, the OpenAPI spec that made the reference accurate, the v3 documentation that made the upgrade path clear, the Postman Collection that removed friction at first contact, the tutorial videos that answered the workflow questions before developers had to ask them. The 2500+ number is the output of all of it.
