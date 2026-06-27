---
title: "Chapter 2: Writing the OpenAPI Spec from Scratch"
description: Writing a 178,000-line OpenAPI spec for 300+ endpoints, solo, in three months — and watching it become the input for BILL's next-generation API.
---

## The problem with documenting an undocumented API

The BILL v2 API had no OpenAPI spec. No machine-readable description of what endpoints existed, what fields they accepted, what they returned, or how errors were structured. Documentation of any kind was sparse and inconsistent. To publish a real API reference on ReadMe, I needed to write the spec from scratch.

300+ endpoints. Solo. Three months.

## The tooling challenge

Writing a 178,000-line YAML file by hand is not a documentation problem — it's an engineering problem. One incorrect indentation in a 1,000-line YAML block is nearly impossible to debug by eye. I built a toolchain to catch errors in real time:

- **Swagger Editor** for rendering — seeing the spec as structured output while writing it, not after
- **Stoplight.io** for live linting — catching spec violations at the line level as I typed, so I knew immediately whether each addition would pass validation

Even with live linting, it was clear that maintaining a single 178,000-line spec file would eventually become unmanageable. I made the decision early to split the spec into smaller files organized by BILL's core workflows.

## Splitting by workflow, not by alphabet

The final set was 10 spec files, covering roughly 300 endpoints across four domains:

- **Accounts Payable** — vendors, bills, recurring bills, payments, vendor credits
- **Accounts Receivable** — customers, invoices, recurring invoices, charge customers, credit memos
- **Organization Operations** — users, bank accounts, card accounts
- **Classifications** — bookkeeping resources including chart of accounts, accounting class, location, department, payment terms

This structure mirrored how BILL customers actually used the API — by business function, not alphabetically. Each file could be uploaded to its own section in ReadMe's API reference, so developers working on AP payments weren't navigating past AR invoicing to find what they needed.

For each endpoint and field, I researched usage in the BILL source repository and tested with real requests and responses in sandbox. I documented every field: its role, its constraints, and the behavior that wasn't obvious from the name alone.

The full published reference is at [developer.bill.com/v2/reference/api-reference-overview](https://developer.bill.com/v2/reference/api-reference-overview).

## Building the CI/CD pipeline

Once the spec was complete, I built a GitLab repository and CI/CD pipeline to manage all future updates. The workflow:

1. Update the relevant spec file
2. Open a GitLab merge request
3. Pipeline runs on merge and publishes the updated spec directly to developer.bill.com

What had previously required manual uploads and coordination now took minutes. I built this pipeline and maintained it for my entire tenure at BILL — every spec change, every API update, every version release flowed through it.

## The spec as a forcing function

Publishing the complete v2 API reference had an unintended effect inside BILL. BILL engineers, product managers, and leadership were all API customers of the published spec. For the first time, internal stakeholders were looking at their own API through the same lens as external developers.

What they saw was uncomfortable. The spec made visible — precisely and publicly — the issues that API customers had been complaining about for years: internal fields exposed in responses, misleading field names, non-standard error structures returning HTTP 200 on failure, behaviors that didn't match what was documented.

When the complaints came from external customers, they were easy to deprioritize. When they were visible in a structured spec that BILL leadership could read, review, and share — that changed. Teams moved to hide internal fields, improve error messages, and fix bugs that had been open for years. The docs weren't describing the API anymore. They were holding it accountable.

## The spec as input for v3

The most significant outcome of the v2 spec work wasn't the documentation itself.

The developer platform engineering team used the v2 spec files as the foundation for designing and testing the BILL v3 API. They generated an internal SDK from the spec to write tests and validate the v3 experience before it was built. The team then used those tests to guide the actual v3 implementation.

A technical writer's output — an OpenAPI spec written to document a public API — became the engineering input for the next-generation product. Because the spec used an open standard, it was portable, tool-agnostic, and immediately useful across product, engineering, and release workflows. Nobody had to rely on the BILL codebase to understand what the API did or should do. The spec said it plainly, in a format every tool could read.
