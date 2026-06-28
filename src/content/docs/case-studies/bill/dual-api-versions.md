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

Three capabilities shipped as v3-only features, each opening up new integration patterns that were not possible with v2.

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

API customers were vocal about two things: feature parity gaps and v3 bugs. Every gap was a reason to delay migration. Every bug that stayed open for days or weeks reinforced skepticism. For customers already uncertain about the migration effort, a poor v3 experience was enough to keep them on v2 indefinitely.

My ongoing role was to keep both in motion — pushing bugs to resolution, making the case for parity work alongside new feature development, and keeping RTB (run the business) and tech debt visible to engineering and product leadership. The release notes and changelog weren't just developer communication. They were also internal accountability — a public record of what had shipped and what was still outstanding.
