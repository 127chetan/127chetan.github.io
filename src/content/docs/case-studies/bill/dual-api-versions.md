---
title: "Two API Versions"
description: Running v2 and v3 documentation simultaneously on developer.bill.com — versioned references, a migration guide, and the internal advocacy that kept v3 moving forward.
---

## Context

In the second half of 2023, the BILL v3 documentation launched publicly on `developer.bill.com`. The initial focus was the Accounts Payable workflow (set up vendor record → create a bill → pay vendor with AP payments).

Each endpoint was a direct upgrade over the v2 API.
- Simpler request & response bodies, with intuitive field names
- BILL operations combined where possible (v2 required multiple sequential calls)
- Standard REST verbs(all v2 operations are POST)
- Standard HTTP status codes (v2 returns `HTTP 200` on failure)

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="p2-title p2-desc" style="width: 100%; height: auto; display: block;">
<title id="p2-title">v3 API Rollout Timeline</title>
<desc id="p2-desc">Timeline of BILL v3 API domains shipping from the second half of 2023 through 2024: AP, Spend and Expense, and AR launched in 2023; Org Operations, Partner Operations, and Webhooks launched in 2024.</desc>
<rect width="960" height="250" fill="#f5f5f5"/>
<line x1="50" y1="100" x2="850" y2="100" stroke="#bfc0c0" stroke-width="1"/>
<line x1="60" y1="94" x2="60" y2="106" stroke="#7a8399" stroke-width="1"/>
<text x="60" y="124" font-family="'Geist Mono',monospace" font-size="10" font-weight="600" fill="#4f5d75" text-anchor="middle">2023</text>
<line x1="320" y1="94" x2="320" y2="106" stroke="#7a8399" stroke-width="1"/>
<text x="320" y="124" font-family="'Geist Mono',monospace" font-size="10" font-weight="600" fill="#4f5d75" text-anchor="middle">2024</text>
<line x1="90" y1="94" x2="90" y2="66" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="90" cy="100" r="6" fill="#eb6c36" stroke="#eb6c36" stroke-width="1.5"/>
<text x="90" y="48" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2023 H2</text>
<text x="90" y="62" font-family="'Geist',sans-serif" font-size="13" font-weight="700" fill="#eb6c36" text-anchor="middle">AP</text>
<line x1="230" y1="104" x2="230" y2="134" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="230" cy="100" r="4" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="230" y="146" font-family="'Geist',sans-serif" font-size="12" font-weight="600" fill="#2d3142" text-anchor="middle">Spend &amp; Expense</text>
<text x="230" y="160" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2023</text>
<line x1="340" y1="94" x2="340" y2="66" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="340" cy="100" r="4" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="340" y="48" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2023–2024</text>
<text x="340" y="62" font-family="'Geist',sans-serif" font-size="12" font-weight="600" fill="#2d3142" text-anchor="middle">AR</text>
<line x1="480" y1="104" x2="480" y2="134" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="480" cy="100" r="4" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="480" y="146" font-family="'Geist',sans-serif" font-size="12" font-weight="600" fill="#2d3142" text-anchor="middle">Organization Operations</text>
<text x="480" y="160" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2024</text>
<line x1="640" y1="94" x2="640" y2="66" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="640" cy="100" r="4" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="640" y="48" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2024</text>
<text x="640" y="62" font-family="'Geist',sans-serif" font-size="12" font-weight="600" fill="#2d3142" text-anchor="middle">Partner Operations</text>
<line x1="800" y1="104" x2="800" y2="134" stroke="#bfc0c0" stroke-width="1"/>
<circle cx="800" cy="100" r="4" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="800" y="146" font-family="'Geist',sans-serif" font-size="12" font-weight="600" fill="#2d3142" text-anchor="middle">Webhooks</text>
<text x="800" y="160" font-family="'Geist Mono',monospace" font-size="9" font-weight="500" fill="#4f5d75" text-anchor="middle">2024</text>
<line x1="30" y1="182" x2="930" y2="182" stroke="rgba(45,49,66,0.12)" stroke-width="0.8"/>
<circle cx="36" cy="200" r="6" fill="#eb6c36" stroke="#eb6c36" stroke-width="1.5"/>
<text x="50" y="204" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#2d3142" letter-spacing="0.08em">AP in v3 set the design patterns for the rest of the product</text>
<a href="https://github.com/cathrynlavery/diagram-design" target="_blank" rel="noopener noreferrer">
<text x="30" y="228" font-family="'Geist Mono',monospace" font-size="9" font-weight="400" fill="#7a8399" text-decoration="underline">Timeline created with the diagram-design Claude skill</text>
</a>
</svg>

On developer.bill.com, v3 appeared as a version dropdown alongside v2. v2 remained the default. API customers could switch between versions and compare — the Guides and API reference sections were fully independent for each version.

## A different publishing pipeline for v3

The v2 spec pipeline ran through a dedicated GitLab repository I owned. For v3, the integration went deeper. Spec contributions lived directly in the Java engineering project — at the controller level for endpoint descriptions, path parameters, and query parameters, and at the DTO level for request and response body documentation. Publishing was one stage in a multi-stage CI/CD pipeline: feature build, feature testing, release to staging and production, then publish to the API reference.

As the engineering team shipped new v3 features and endpoints through 2023 and into 2024, the v3 API reference updated automatically with each release. The docs were no longer a downstream artifact — they were part of the release pipeline itself.

A detail that paid off later: in 2025, I added working request examples directly in the request DTOs. When the v3 Postman Collection launched, those examples became the default values that populated each request automatically, dramatically reducing the time it took new API customers to run their first successful call.

## Setting v3 as the primary version

By early 2024 — roughly 6 months after v3 launched — the core AP and AR workflows were in place: vendors, bills, payments, customers, invoices, AR payment tracking. Organization operations had been added, including the ability to provision a bank account via API, which was not possible in v2.

We set v3 as the primary docs version. v2 remained fully accessible, but v3 was now what new developers saw first.

## The migration guide

When v3 became the primary version, I wrote a migration guide. The reference points were the Twitter/X and ServiceNow migration guides — documents that treat migration as a developer task, not a marketing announcement.

The guide led with side-by-side comparisons of what v2 and v3 actually looked like in practice.

| Feature | v2 | v3 |
|---|---|---|
| HTTP verbs | `POST` for all operations | Standard REST (`GET`, `POST`, `PATCH`, `DELETE`) |
| HTTP status codes | `HTTP 200` on failure | Standard codes (`400`, `404`, `409`) |
| Content type | `application/x-www-form-urlencoded` | `application/json` |
| Request structure | Flat — all fields at the same level | Nested — typed objects |
| URL convention | `/Crud/Create/Invoice.json` | `/v3/invoices` |
| Related objects | Separate API calls required | Inline creation in the same request |
| Authentication | Session ID + developer key per request | Bearer token |

Authentication was the clearest example:

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

Invoice creation showed the same contrast. The v2 request was a flat wall of string fields, all at the same level, with no nested structure. Creating an invoice required a valid customer ID — there was no way to have BILL create the customer object inline. Sending the invoice to the customer was a separate endpoint call.

**v2 invoice creation**
```bash
curl --request POST \
  --url https://api-stage.bill.com/api/v2/Crud/Create/Invoice.json \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data devKey=string \
  --data sessionId=string \
  --data 'data={"obj":{"entity":"Invoice","isActive":"string","customerId":"string","invoiceNumber":"string","invoiceDate":"string","dueDate":"string","glPostingDate":"string","exchangeRate":0,"description":"string","poNumber":"string","isToBePrinted":true,"isToBeEmailed":true,"lastSentTime":"string","itemSalesTax":"string","terms":"string","salesRep":"string","FOB":"string","shipDate":"string","shipMethod":"string","departmentId":"string","locationId":"string","actgClassId":"string","jobId":"string","payToBankAccountId":"string","payToChartOfAccountId":"string","invoiceTemplateId":"string","hasAutoPay":true,"emailDeliveryOption":"string","mailDeliveryOption":"string","recInvoiceTemplateId":"string","invoiceLineItems":[{"entity":"InvoiceLineItem","itemId":"string","quantity":0,"amount":0,"price":0,"serviceDate":"string","ratePercent":0,"chartOfAccountId":"string","departmentId":"string","locationId":"string","actgClassId":"string","jobId":"string","description":"string","taxable":true,"taxCode":"string","lineOrder":0}]}}'
```

**v3 invoice creation**
```bash
curl --request POST \
  --url https://gateway.stage.bill.com/connect/v3/invoices \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{
  "customer": {
    "id": "{{customer_id}}"
  },
  "invoiceLineItems": [
    {
      "quantity": 2,
      "description": "Classic extreme drum sticks",
      "price": 14.99
    },
    {
      "quantity": 1,
      "description": "Metal guitar picks (5-pack)",
      "price": 50
    }
  ],
  "invoiceNumber": "202602",
  "dueDate": "2026-12-31",
  "processingOptions": {
    "sendEmail": false
  }
}'
```

In v3, `invoiceNumber`, `invoiceDate`, and `dueDate` are optional — BILL auto-generates them if omitted. If the customer doesn't exist yet, setting `name` and `email` in the customer object causes BILL to create the customer inline as part of the same request. Email delivery is a `processingOptions` flag on the same call. When `enableCardPayment` is set to `true`, the customer can pay by card — and a `convenienceFee` object lets you configure the percentage the customer pays for that option.

The migration guide extended these comparisons across endpoint naming conventions, HTTP response codes, and response body structure — verbose and flat in v2, typed and nested in v3.

## v3-exclusive capabilities

A set of major capabilities shipped as v3-only features, each opening up new integration patterns that were not possible with v2.

**Spend & Expense API**

BILL acquired Divvy in 2021 for its expense management capabilities. In 2023, those features became available via API as the Spend & Expense API. This brought an entirely new customer base — integrations built around expense management rather than AP or AR. Endpoints covered budgets, budget users, virtual cards, transactions, and reimbursements.

**Partner Operations**

Partner operations enabled white-label, embedded finance experiences for BILL's integration partners. Partners like NetSuite and Acumatica could programmatically onboard their users into BILL — creating a new organization, provisioning a user in that organization, and then performing full organization-level operations. The entire onboarding flow, from org creation to payment execution, was available in a single API surface.

**Webhooks**

Before webhooks, API customers kept BILL object state synchronized by polling — making scheduled GET calls to check for changes across vendors, bills, payments, invoices, and other entities. For example, `GET /v3/vendors` to list all vendors, `GET /v3/vendors/{vendorId}` for a specific record, repeated at fixed intervals. This created unnecessary API call volume and introduced latency between an event occurring and the integration responding to it.

Webhooks replaced polling with event-driven notifications. Customers subscribed to specific events and received a payload at their endpoint the moment the event occurred. The full event set covered the BILL object model:

| Category | Events |
|---|---|
| Vendors | `vendor.created`, `vendor.updated`, `vendor.archived`, `vendor.restored`, `autopay.failed` |
| AP Bills | `bill.created`, `bill.updated`, `bill.archived`, `bill.restored` |
| AP Payments | `payment.updated`, `payment.failed` |
| AR Invoices | `invoice.created`, `invoice.updated`, `invoice.archived`, `invoice.restored` |
| Bank Accounts | `bank-account.created`, `bank-account.updated` |
| Card Accounts | `card-account.created`, `card-account.updated` |
| Spend & Expense | `spend.transaction.updated`, `spend.reimbursement.created`, `spend.reimbursement.updated`, `spend.reimbursement.deleted`, `spend.three-ds-challenge.created` |
| Risk | `risk-verification.updated` |

## Who stayed on v2 and why

Large API customers — bank partners, accounting platforms, enterprise integrators — remained on v2 through 2023 and into 2024. The reason was feature parity. v3 was not yet a complete replacement for v2, and customers with deep integrations couldn't migrate until every capability they depended on was available in v3.

As engineering shipped more features through 2024, customers who reached parity migrated. The response was consistent: the ease-of-use improvement was immediate and significant. Many cited the release notes as a key part of their decision to move — they could track exactly what had been added, when, and what it meant for their integration. Subscriptions to the [RSS changelog feed](https://developer.bill.com/changelog) grew as a direct result.

## The hardest part: internal advocacy

The technical challenge of running two versioned doc sets was manageable. The harder work was internal.

API customers were vocal about feature parity gaps and v3 bugs. Every gap was a reason to delay migration. Every bug that stayed open for days or weeks reinforced skepticism. For customers already uncertain about the migration effort, a poor v3 experience was enough to keep them on v2 indefinitely.

My ongoing role was to keep both in motion — pushing bugs to resolution, making the case for parity work alongside new feature development, and keeping RTB (run the business) and tech debt visible to engineering and product leadership. The release notes and changelog weren't just developer communication. They were also internal accountability — a public record of what had shipped and what was still outstanding.
