---
title: "Chapter 1: Zendesk → ReadMe Migration"
description: Migrating BILL's developer docs from a neglected Zendesk help site to a modern ReadMe platform — including a months-long vendor approval battle.
---

## Context

When I joined BILL in 2021, `developer.bill.com` was a Zendesk help site template. It hadn't been well maintained. Guides and API reference information lived on the same page for each endpoint, with no structural separation. Standard cases were documented; edge cases, usage examples, and realistic integration scenarios were absent.

The underlying API compounded the problem. BILL v2 was built by BILL engineering for BILL engineering — then a decision was made to make it public. No API design strategy, no customer centricity baked in. Failure responses returned HTTP 200. Every request was a POST. Response fields were inconsistent or unhelpful, and many didn't accurately reflect what was set in the request.

My mandate: make the developer experience feel like BILL was a modern company. Use modern tooling. Build a developer audience. Drive integration partnerships — developer integrations generating payments is direct revenue for BILL.

## The vendor approval battle

My first choice was ReadMe. I'd built and maintained `docs.clover.com` at Clover Network on ReadMe from 2017 to 2021, so I knew exactly what it could do: OpenAPI spec import, live endpoint testing, CI/CD integration with engineering repos, and low maintenance overhead for a one-person docs team.

The alternatives were Confluence (BILL had an Atlassian relationship) and Kong (which bundles a developer portal with its API gateway). Neither fit. Confluence isn't a developer-facing docs platform. Kong's portal was tied to their gateway infrastructure, not a standalone docs site.

But ReadMe faced internal resistance. Bringing in a smaller-scale vendor for a BILL-branded website triggered scrutiny across procurement and infosec. Using ReadMe was frowned upon throughout the vetting process.

I didn't wait for approval. I started a personal ReadMe project and kept adding OpenAPI spec information to it — building the real docs in the background while the vendor review ran its course. The ReadMe support team extended my trial for months while the review was in progress.

To clear the approval, I drew on my track record with `docs.clover.com` and worked directly with the ReadMe team to produce all internal documentation required for BILL's vendor review. ReadMe participated in internal reviews. Eventually, ReadMe was approved.

## Information architecture

ReadMe's structure gave me the foundation:

- **Guides** — conceptual introductions, working examples, and tutorials for core API operations organized by business case. Written for non-technical users and novice developers. Explained the *why* and *how* at a level that didn't require reading the spec first.
- **API Reference** — the published OpenAPI spec. Field-level documentation, endpoint descriptions, and a live sandbox interface for running calls directly in the docs. Aimed at advanced developers and novice developers ready to move from reading to testing.
- **Recipes** — ReadMe's newer section for code-first documentation. I used it for Python scripts demonstrating endpoint orchestration: the output of one endpoint feeding as input into the next. Each section of the script was annotated with contextual docs, making it readable as both code and documentation.
- **Release Notes** — introduced at launch. The response from API customers was immediate. For the first time, they knew what was coming, what had changed, and what they needed to act on before it affected their live integrations.

One security constraint shaped the entire site: every interactive element points to the BILL sandbox environment. Production URLs appear in the Guides section for reference, but there is no way to execute calls to production from the website. This was a deliberate infosec decision to prevent the docs site from becoming a surface for production attacks.

## Outcome

The site launched with a modern look and feel. Internal BILL stakeholders were satisfied with the outcome. BILL engineers adopted it for sandbox testing — a practical endorsement from the team closest to the API.

Infosec began using the site to simulate DOS attacks against the sandbox. That wasn't planned. It was a signal that the site had become genuinely useful infrastructure inside the company.

The developer response was qualitatively positive across the board. API customers said it made BILL feel like a modern company. Documentation feedback was consistently green. Issues with v2's API design were real and ongoing — but developers were clear that the problem was the API, not the docs.

The most telling outcome: the most common developer support question — *how do I log in to the API?* — disappeared within weeks of launch. Developers were finding the answer on their own, getting authenticated, and moving on to their actual integration work.
