---
title: "Platform Expansion: Elements, Get Started, and Docs Leadership"
description: Hiring and leading a contract technical writer to expand developer.bill.com — and an editorial pass that turned walls of text into structured, component-driven documentation.
---

## Scaling the team

By early 2025, developer.bill.com had mature API reference documentation, two versioned API docs running simultaneously, and a growing developer audience. The gap was coverage: BILL Elements had no documentation, and the get started experience assumed developers already knew which integration path was right for them.

In March 2025, I hired a contract technical writer to close that gap. The hiring process involved reviewing resumes and interviewing four candidates for the role. In parallel, other teams at BILL had open contract TW needs — I interviewed four additional candidates to shortlist for their requirements as well. The process surfaced where technical writing skills were strong and where they fell short quickly: give a candidate an undocumented API endpoint and a blank page, and the gap between writers who can structure information and writers who can only transcribe it becomes obvious.

## What the contract TW built

The contract writer was primarily responsible for two areas.

**BILL Elements documentation** — Elements are pre-built, embeddable UI components that let integration partners offer BILL payment functionality without building their own UI. The documentation covered the full Elements surface: onboarding and MFA verification, funding account connection, vendor setup and BILL Network enrollment, payment scheduling, and payment history. The goal was a self-contained reference a developer could follow from initial setup through a live payment, without needing to cross-reference the v3 API docs for every step.

The published Elements documentation starts at [developer.bill.com/docs/elements-overview](https://developer.bill.com/docs/elements-overview).

**Get started section expansion** — Before this work, a developer landing on developer.bill.com was dropped directly into the v3 API reference. There was no platform overview, no explanation of the integration options, and no guidance on which path fit their use case. The contract writer built out the get started section to address this: a platform overview explaining API-only, Elements-only, and hybrid integration models; AP payment funding methods and disbursement methods; the BILL Network; and the differences between sandbox and production environments.

## The editorial pass

Every doc the contract writer delivered went through an editorial review. The technical accuracy review — confirming that information was complete and that flow diagrams captured the right sequences — was collaborative, involving developer platform engineers and API solution engineers. My editorial focus was different: presentation.

The raw drafts were accurate but dense. Core concepts were buried in bullet lists. Relationships between ideas were described in prose where a diagram or table would have made them scannable in seconds. ReadMe's custom component library — cards, tabs, accordions, callouts, embeddable MDX — gave me the tools to fix this without rewriting the underlying content.

[BILL Core Capabilities](https://developer.bill.com/docs/bill-core-capabilities) is the clearest example of what that editorial pass looked like. The original draft presented the three integration models (API-only, Elements-only, hybrid) as a chunky bullet list. The AP, AR, and Spend & Expense capability breakdowns were similarly flat — bullet points that a developer would skim past. The flow diagrams didn't exist.

The published version opens with interactive cards for each integration model, giving developers an immediate visual comparison of effort, flexibility, and use case. The AP, AR, and S&E sections each have their own structured layout with a payment methods table, capability callouts, and workflow diagrams created in Lucidchart. A developer scanning the page now sees the shape of the platform before they've read a word.

The same pattern applied across the get started section: the [platform landing page](https://developer.bill.com/docs/home) uses cards and tabs to orient developers to their integration path before they go deeper; [AP Payments](https://developer.bill.com/docs/ap-payments) uses an accordion to organize payment method details without flattening them into a wall of text; [Elements get started](https://developer.bill.com/docs/bill-elements-get-started) uses cards and tabs to guide developers through setup in a sequence that matches how they'll actually build.

The content team handled accuracy. I handled the experience of reading it.
