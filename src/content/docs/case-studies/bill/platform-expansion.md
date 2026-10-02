---
title: "Platform Expansion & Docs Leadership"
description: Hired and led a contract technical writer to expand developer.bill.com, and ran an editorial pass that turned walls of text into structured, component-driven documentation.
---

## Context

By early 2025, [developer.bill.com](https://developer.bill.com) had mature API reference documentation for both API versions (v2 and v3), and a growing developer audience.

Around this time, BILL introduced the BILL Elements product: low-code UI widgets that customers can embed directly into their applications for the BILL AP workflow. Elements handle the underlying v3 API calls and BILL's business rules internally, so customer development effort is minimal — customers embed a component rather than building out the API calls, rules, requests, and responses themselves.

The early-stage BILL Elements docs assumed that customers already knew which integration path was right for them. By March 2025, I hired a contract technical writer to focus on developing the BILL Elements docs. The hiring process involved reviewing resumes and interviewing 4 candidates for the role. Other teams at BILL also had open technical writer needs, and I interviewed 4 more candidates to shortlist for their requirements as well.

## BILL Elements docs strategy & direction

Now that we were a team of 2, we built a project plan and direction for the BILL Elements docs. This was effort in addition to the v2 and v3 API docs management based on engineering releases.

**BILL Elements documentation**: The goal of the docs was to build a self-contained reference a developer could follow from initial setup through to a live payment, without the need to reference the v3 API docs for every step.

The documentation was set up to showcase the BILL AP workflow.

1. Onboarding and MFA verification
2. Add and manage funding account
3. User verification
4. Vendor setup and BILL Network setup
5. Schedule payments
6. View payments history

**Showcase all integration options**: At the time, a customer landing on `developer.bill.com` was directed to API guides, tutorials, and reference documentation. With BILL Elements, we now built journeys for customers based on integration options with guidance on paths based on their use case: API-only, Elements-only, and hybrid integration models.

:::note[Customer integration options]
- The landing page on [developer.bill.com](https://developer.bill.com/docs/home) currently guides customers through the available integration options with the BILL API platform.
- The published Elements documentation is available at [developer.bill.com/docs/elements-overview](https://developer.bill.com/docs/elements-overview).
:::

## My role as editor & content strategist

Every doc the contract writer delivered went through an editorial review. The technical accuracy review — confirming that information was complete and that flow diagrams captured the right sequences — was collaborative, involving developer platform engineers and API solution engineers. My editorial focus was different: presentation.

The raw drafts were accurate but dense. Core concepts were buried in bullet lists. Relationships between ideas were described in prose where a diagram or table would have made them scannable in seconds. ReadMe's custom component library — cards, tabs, accordions, callouts, embeddable MDX — gave me the tools to fix this without rewriting the underlying content.

[BILL Core Capabilities](https://developer.bill.com/docs/bill-core-capabilities) is the clearest example of what that editorial pass looked like. The original draft presented the 3 integration models (API-only, Elements-only, hybrid) as a chunky bullet list. The AP, AR, and Spend & Expense capability breakdowns were similarly flat — bullet points that a developer would skim past. The flow diagrams didn't exist.

The published version opens with interactive cards for each integration model, giving developers an immediate visual comparison of effort, flexibility, and use case. The AP, AR, and S&E sections each have their own structured layout with a payment methods table, capability callouts, and workflow diagrams created in Lucidchart. A developer scanning the page now sees the shape of the platform before they've read a word.

| Area | Before | After |
|---|---|---|
| Integration models (API-only, Elements-only, hybrid) | Chunky bullet list | Interactive cards with an immediate visual comparison of effort, flexibility, and use case |
| AP, AR, and Spend & Expense capability breakdowns | Flat bullet points a developer would skim past | Structured layout with a payment methods table and capability callouts |
| Flow diagrams | Didn't exist | Workflow diagrams created in Lucidchart |

The same pattern applied across the get started section: the [platform landing page](https://developer.bill.com/docs/home) uses cards and tabs to orient developers to their integration path before they go deeper; [AP Payments](https://developer.bill.com/docs/ap-payments) uses an accordion to organize payment method details without flattening them into a wall of text; [Elements get started](https://developer.bill.com/docs/bill-elements-get-started) uses cards and tabs to guide developers through setup in a sequence that matches how they'll actually build.

The content team handled accuracy. I handled the experience of reading it.
