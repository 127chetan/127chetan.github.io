---
title: "Chapter 6: Growing the BILL API Developer Platform"
description: How the Postman Collection and a developer tutorial video program drove BILL's API developer base to 2500+ — nearly double the OKR target — and generated 130% of the associated revenue goal.
---

## Two launches, one summer

By mid-2025, the BILL v3 API had strong documentation and a mature spec pipeline. What it didn't have was a fast path for developers to go from discovery to a working integration. Two things changed that in the summer of 2025: the Postman Collection in June, and the first developer tutorial video in July.

Together, they addressed the two moments where developer adoption stalls — the point where a developer decides whether the API is worth their time, and the point where they try to figure out how to actually use it. The Postman Collection compressed the first working API call from hours to minutes. The videos walked developers through the workflows that mattered before they got to the reference docs.

## The developer tutorial video program

The video program started with a content gap: no developer audience was going to sit through a generic product walkthrough. They needed to see the API doing something real — a specific workflow, a specific use case, with the actual endpoints and expected responses visible on screen.

I wrote 16 scripts across the program. Eleven were published to the [BILL API Platform for Developers playlist](https://www.youtube.com/playlist?list=PLnyriCE50-7zPC1SiWAcC0kyL0DhgWK9Y) on YouTube. Topics spanned the full developer journey:

- **Getting started** — sandbox account and developer key setup, BILL authentication
- **Core AP workflows** — domestic AP payments, bill approvals
- **Core AR workflows** — AR workflow deep dive
- **v3-exclusive features** — working with Spend & Expense, working with webhooks
- **Embedded finance** — BILL Elements onboarding and use

Each script followed a consistent structure: a setup section defining prerequisites, on-screen action callouts for what the viewer should do, and voiceover narration organized into an introduction, a set of feature chapters, and a conclusion. The structure made the scripts usable by anyone recording — the on-screen actions were explicit enough that a non-writer could follow them without interpretation.

Before any script was finalized, I shared it with the developer platform engineers and API solution engineers. Their review covered technical accuracy, the depth of information, and whether the content addressed the questions API customers were actually asking. That feedback loop meant the videos were solving real problems, not explaining features in the abstract.

Of the eleven published videos, I recorded two — bill approvals and the AR workflow deep dive — using Zoom screenshare, recording with voice while demoing the live features, then editing in iMovie. The content team handled final publishing. The remaining nine were recorded by API solution engineers using the same scripts.

For workflows that needed visual explanation beyond what a screenshare could show, I built diagrams in Lucidchart. Gemini drafted the initial structure; I took that draft and rebuilt it for an API customer audience — sequencing, labeling, and visual hierarchy aligned to how a developer thinks about the workflow, not how BILL thinks about the product. BILL brand guidelines kept the diagrams consistent with the rest of the developer platform.

## The numbers

In October 2025, BILL established OKRs for the developer platform. API developer adoption — new registered developers actively building with BILL — was a key result, set at 1,300. By the OKR measurement period ending June 2026, the platform had reached 2,500+ active API developers: approximately 200% of the target.

The associated revenue OKR measured payment volume generated through the API — as developers shipped their integrations to production, their users making payments through BILL drove direct revenue. That OKR closed at 130% of target.

The Postman Collection launched first and drove the initial acceleration. The July 2025 tutorial video gave developers a reference point before they even opened the API reference — they could watch an AP payments workflow, understand the sequence of calls, and then open Postman with a clear mental model of what they were building. The combination compressed time-to-first-integration for new developers and lowered the support burden for API solution engineers who were otherwise answering the same onboarding questions repeatedly.

## What the growth represented

2,500+ active API developers is a top-of-funnel number. It measures how many developers, teams, and partners were actively building with the BILL API Platform. It doesn't measure every integration that shipped or every payment that was processed — it measures the front of the funnel, the moment a developer chose to build.

Every API documentation decision made between 2021 and 2026 contributed to that number in some way: the ReadMe migration that made the docs credible, the OpenAPI spec that made the reference accurate, the v3 documentation that made the upgrade path clear, the Postman Collection that removed friction at first contact, the tutorial videos that answered the workflow questions before developers had to ask them. The 2,500+ number is the output of all of it.
