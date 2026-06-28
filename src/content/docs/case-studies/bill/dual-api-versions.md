---
title: "Chapter 3: Publishing & Maintaining Two API Versions"
description: Running v2 and v3 documentation simultaneously on developer.bill.com — versioned references, a migration guide, and the internal advocacy that kept v3 moving forward.
---

## v3 goes live

BILL v3 documentation launched publicly in the second half of 2023. The initial focus was Accounts Payable — vendors, bills, and AP payments. Every endpoint was a direct upgrade: simpler request and response bodies, fields with clear meaning, combined operations where v2 required multiple sequential calls, correct HTTP verbs, and correct HTTP status codes.

On developer.bill.com, v3 appeared as a version dropdown alongside v2. v2 remained the default. API customers could switch between versions and compare — the Guides and API reference sections were fully independent for each version.

## A different publishing pipeline for v3

The v2 spec pipeline ran through a dedicated GitLab repository I owned. For v3, the integration went deeper. Spec contributions lived directly in the Java engineering project — at the controller level for endpoint descriptions, path parameters, and query parameters, and at the DTO level for request and response body documentation. Publishing was one stage in a multi-stage CI/CD pipeline: feature build, feature testing, release to staging and production, then publish to the API reference.

As the engineering team shipped new v3 features and endpoints through 2023 and into 2024, the v3 API reference updated automatically with each release. The docs were no longer a downstream artifact — they were part of the release pipeline itself.

A detail that paid off later: in 2025, I added working request examples directly in the request DTOs. When the v3 Postman Collection launched, those examples became the default values that populated each request automatically, dramatically reducing the time it took new API customers to run their first successful call.

## Setting v3 as the primary version

By early 2024 — roughly six months after v3 launched — the core AP and AR workflows were in place: vendors, bills, payments, customers, invoices, AR payment tracking. Organization operations had been added, including the ability to provision a bank account via API, which was not possible in v2.

We set v3 as the primary docs version. v2 remained fully accessible, but v3 was now what new developers saw first.

## The migration guide

When v3 became the primary version, I wrote a migration guide. The reference points were the Twitter/X and ServiceNow migration guides — documents that treat migration as a developer task, not a marketing announcement.

The guide led with side-by-side comparisons of what v2 and v3 actually looked like in practice. Authentication was the clearest example:

**v2 login**
```bash
curl --request POST \
  --url 'https://api-stage.bill.com/api/v2/Login.json' \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'userName={username}' \
  --data 'password={password}' \
  --data 'orgId={organization_id}' \
  --data 'devKey={developer_key}'
```

**v3 login**
```bash
curl --request POST \
  --url 'https://gateway.stage.bill.com/connect/v3/login' \
  --header 'content-type: application/json' \
  --data '{
  "username": "{username}",
  "password": "{password}",
  "organizationId": "{organization_id}",
  "devKey": "{developer_key}"
}'
```

The comparison made the differences immediate: JSON body vs form-encoded data, consistent field naming, a URL structure that communicated version and intent. The guide extended this pattern across endpoint naming conventions, HTTP response codes, and response body structure — verbose and flat in v2, typed and nested in v3.

## Who stayed on v2 and why

Large API customers — bank partners, accounting platforms, enterprise integrators — remained on v2 through 2023 and into 2024. The reason was feature parity. v3 was not yet a complete replacement for v2, and customers with deep integrations couldn't migrate until every capability they depended on was available in v3.

As engineering shipped more features through 2024, customers who reached parity migrated. The response was consistent: the ease-of-use improvement was immediate and significant. Many cited the release notes as a key part of their decision to move — they could track exactly what had been added, when, and what it meant for their integration. Subscriptions to the [RSS changelog feed](https://developer.bill.com/changelog) grew as a direct result.

## The hardest part: internal advocacy

The technical challenge of running two versioned doc sets was manageable. The harder work was internal.

API customers were vocal about two things: feature parity gaps and v3 bugs. Every gap was a reason to delay migration. Every bug that stayed open for days or weeks reinforced skepticism. For customers already uncertain about the migration effort, a poor v3 experience was enough to keep them on v2 indefinitely.

My ongoing role was to keep both in motion — pushing bugs to resolution, making the case for parity work alongside new feature development, and keeping RTB (run the business) and tech debt visible to engineering and product leadership. The release notes and changelog weren't just developer communication. They were also internal accountability — a public record of what had shipped and what was still outstanding.
