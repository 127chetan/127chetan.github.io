---
title: "BILL API Platform: A Five-Year Documentation Build"
description: How I built BILL's developer documentation program from a neglected Zendesk help site into a modern, structured docs platform over five years.
---

When I joined BILL in 2021, [developer.bill.com](https://developer.bill.com) was a Zendesk help site template — unmaintained, unstructured, and built for an API that was never designed for external developers. Over five years, I rebuilt it from scratch: migrated to ReadMe, wrote a 178,000-line OpenAPI spec covering 300+ endpoints solo in three months, shipped and maintained documentation for two simultaneous API versions, built the v3 Postman Collection in three weeks with AI, published four Claude skills for the documentation workflow, wrote 16 developer tutorial video scripts, and drove API developer adoption to 2,500+ — 200% of target — with an associated 130% of the revenue OKR.

## The arc

| Year | Chapter |
|---|---|
| 2021 | [Zendesk → ReadMe Migration](/case-studies/bill/zendesk-to-readme/) |
| 2022 | [Writing the OpenAPI Spec from Scratch](/case-studies/bill/openapi-spec/) |
| 2023–2024 | [Publishing & Maintaining Two API Versions](/case-studies/bill/dual-api-versions/) |
| 2025 | [AI-Powered Postman Collection](/case-studies/bill/ai-postman-collection/) |
| 2026 | [AI Tooling for the Docs Workflow](/case-studies/bill/ai-docs-tooling/) |
| 2025–2026 | [Growth — Developer Platform](/case-studies/bill/growth/) |

## Impact

- Migrated developer.bill.com from Zendesk to ReadMe — the most common developer support question ("how do I log in?") disappeared within weeks of launch
- Wrote a 178,000-line OpenAPI spec covering 300+ endpoints across 10 spec files, solo, in three months — the spec later became the engineering input for the BILL v3 API design
- Built and maintained a GitLab CI/CD pipeline that published every spec change to developer.bill.com for the full five-year tenure
- Shipped documentation for v2 and v3 simultaneously; v3 became the primary version six months after launch
- Built the official BILL v3 Postman Collection solo in three weeks using AI — 200+ endpoints, 100+ environment variables, post-response automation for complete AP/AR workflow execution
- Wrote 16 developer tutorial video scripts; 11 published to YouTube, 2 recorded and edited personally
- Published four Claude skills to BILL's internal GitLab — docs review, interactive recipe drafts, tutorial video script drafts, and API developer communications drafts
- BILL engineers adopted developer.bill.com for internal sandbox testing; infosec used it for DOS simulation against the sandbox — neither was planned
- 2,500+ active API developers at end of tenure — approximately 200% of the OKR target of 1,300
- 130% of the associated revenue OKR, driven by API integrations generating payment volume through BILL
