---
title: "Two API Versions"
description: Running v2 and v3 documentation simultaneously on developer.bill.com — versioned references, a migration guide, and the internal advocacy that kept v3 moving forward.
---

## Context

In the second half of 2023, the BILL v3 documentation launched publicly on [developer.bill.com](https://developer.bill.com). The initial focus was the Accounts Payable workflow (set up vendor record → create a bill → pay vendor with AP payments).

Each endpoint was a direct upgrade over the v2 API.
- Simpler request and response bodies, with intuitive field names
- BILL operations combined where possible (v2 required multiple sequential calls)
- Standard REST verbs (all v2 operations are POST)
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

At launch, I set v3 as a list option in the documentation with v2 as the default. Independent Guides and API reference sections were available for both v2 and v3. In addition, I wrote a migration guide from v2 to v3 to improve adoption.

## v3 publishing integrated with product releases

The v2 spec publishing pipeline ran through a dedicated GitLab repository I owned. Each time I found an opportunity for improvement based on customer feedback, I posted an update in the spec, and the v2 pipeline validated and published the update in the v2 API reference.

For v3, the integration goes much deeper. OpenAPI spec contributions live directly in the Java engineering project.

| Layer | Description | Docs at this level |
|---|---|---|
| Controller | Entry point for handling requests | Endpoint descriptions, path parameters, query parameters |
| DTO | Data Transfer Object; defines the request/response payload structure | Request and response body documentation |

v3 spec publishing is a stage with two jobs (validate and publish) in the CI/CD pipeline.

<svg viewBox="0 0 960 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="p3-title p3-desc" style="width: 100%; height: auto; display: block;">
<title id="p3-title">v3 CI/CD Pipeline</title>
<desc id="p3-desc">Five-stage CI/CD pipeline for v3: feature build, feature testing, release to staging, validate the spec (quality gate), then publish to ReadMe.</desc>
<defs>
<marker id="p3-arr" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
<path d="M0,0.5 L8,3.5 L0,6.5 Z" fill="#4f5d75"/>
</marker>
</defs>
<rect width="960" height="200" fill="#f5f5f5"/>
<rect x="30" y="24" width="159" height="64" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="110" y="61" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Feature build</text>
<line x1="189" y1="56" x2="215" y2="56" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#p3-arr)"/>
<rect x="215" y="24" width="159" height="64" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="295" y="61" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Feature testing</text>
<line x1="374" y1="56" x2="400" y2="56" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#p3-arr)"/>
<rect x="400" y="24" width="161" height="64" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="480" y="61" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Release to staging</text>
<line x1="561" y1="56" x2="587" y2="56" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#p3-arr)"/>
<rect x="587" y="24" width="161" height="64" rx="6" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.5"/>
<text x="667" y="50" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Validate spec</text>
<text x="667" y="70" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">rdme openapi validate</text>
<line x1="748" y1="56" x2="774" y2="56" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#p3-arr)"/>
<rect x="774" y="24" width="156" height="64" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="852" y="50" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Publish to ReadMe</text>
<text x="852" y="70" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">rdme openapi</text>
<text x="110" y="108" font-family="'Geist Mono',monospace" font-size="13" font-weight="600" fill="#7a8399" text-anchor="middle" letter-spacing="0.12em">01</text>
<text x="295" y="108" font-family="'Geist Mono',monospace" font-size="13" font-weight="600" fill="#7a8399" text-anchor="middle" letter-spacing="0.12em">02</text>
<text x="480" y="108" font-family="'Geist Mono',monospace" font-size="13" font-weight="600" fill="#7a8399" text-anchor="middle" letter-spacing="0.12em">03</text>
<text x="667" y="108" font-family="'Geist Mono',monospace" font-size="13" font-weight="600" fill="#eb6c36" text-anchor="middle" letter-spacing="0.12em">04</text>
<text x="852" y="108" font-family="'Geist Mono',monospace" font-size="13" font-weight="600" fill="#7a8399" text-anchor="middle" letter-spacing="0.12em">05</text>
<line x1="30" y1="128" x2="930" y2="128" stroke="rgba(45,49,66,0.12)" stroke-width="0.8"/>
<rect x="30" y="146" width="13" height="13" rx="2" fill="rgba(235,108,54,0.08)" stroke="#eb6c36" stroke-width="1.5"/>
<text x="50" y="157" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#2d3142" letter-spacing="0.08em">QUALITY GATE — pipeline fails here if spec has errors; publish is blocked</text>
<a href="https://github.com/cathrynlavery/diagram-design" target="_blank" rel="noopener noreferrer">
<text x="30" y="182" font-family="'Geist Mono',monospace" font-size="9" font-weight="400" fill="#7a8399" text-decoration="underline">Flow diagram created with the diagram-design Claude skill</text>
</a>
</svg>

As the engineering team ships new v3 features and endpoints with each release, the v3 API reference is updated automatically. With v3, the docs are no longer a downstream artifact. The docs are part of the release pipeline itself.

:::tip[This setup paid off again in 2025]
In 2025, I added working request examples directly in the request DTOs. When the BILL v3 API Postman Collection launched, each example became the default value in each Postman request automatically. This dramatically reduced the time it took new API customers to make their first successful API call.
:::

## v3 becomes primary in 6 months

By early 2024 (roughly 6 months after the v3 launch), the core AP and AR workflows were in place. BILL leadership and I set v3 as the primary version for documentation. v2 remained fully accessible, but any new API customer saw v3 first.

At this point, in addition to the standard AP workflow, customers could build with the v3 AR workflow as well (set up customer record → create an invoice → track AR payment from customer). New v3-specific operations included the ability to provision a bank account for AP payments with the API. This was not possible in v2.

## v2 to v3 migration guide

When v3 became the primary version, I wrote a migration guide from v2 to v3 to improve adoption. At the time, I took inspiration from the Twitter/X and ServiceNow migration guides. These documents treated migration as a developer task, and not as a marketing announcement.

The guide led with side-by-side comparisons of v2 and v3 in practice.

| Feature | v2 | v3 |
|---|---|---|
| HTTP verbs | `POST` for all operations | Standard REST (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`) |
| HTTP status codes | `HTTP 200` even on failure | Standard codes (`200/201`, `4XX`, `5XX`) |
| Content type | `application/x-www-form-urlencoded` | `application/json` |
| Request data model | Flat with all fields at the same level | Nested object mapping |
| URL convention | `/Crud/Create/Invoice.json` | `/v3/invoices` |
| Related operations | Separate API calls | Dependent actions combined into single operations |
| Authentication | Session ID + developer key per request | Bearer token |

Authentication is one of the clearest examples to highlight differences between v2 and v3.

**v2 login with POST /v2/Login.json**

v2 requires a session ID and developer key in every request, obtained by signing in with form-encoded credentials.

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

**v3 login with POST /v3/login**

v3 uses a bearer token issued with a single JSON login call. The token is then passed in the Authorization header in every subsequent request.

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

Invoice creation is another example to highlight the same contrast.

**v2 invoice creation with POST /v2/Crud/Create/Invoice.json**

The v2 request is a flat wall of string fields, all at the same level, with no nested structure. Creating an invoice requires a valid customer ID (another API call to create or get a customer). Sending a created invoice to the customer is another API call.
```bash
curl --request POST \
  --url https://api-stage.bill.com/api/v2/Crud/Create/Invoice.json \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data devKey=string \
  --data sessionId=string \
  --data 'data={"obj":{"entity":"Invoice","isActive":"string","customerId":"string","invoiceNumber":"string","invoiceDate":"string","dueDate":"string","glPostingDate":"string","exchangeRate":0,"description":"string","poNumber":"string","isToBePrinted":true,"isToBeEmailed":true,"lastSentTime":"string","itemSalesTax":"string","terms":"string","salesRep":"string","FOB":"string","shipDate":"string","shipMethod":"string","departmentId":"string","locationId":"string","actgClassId":"string","jobId":"string","payToBankAccountId":"string","payToChartOfAccountId":"string","invoiceTemplateId":"string","hasAutoPay":true,"emailDeliveryOption":"string","mailDeliveryOption":"string","recInvoiceTemplateId":"string","invoiceLineItems":[{"entity":"InvoiceLineItem","itemId":"string","quantity":0,"amount":0,"price":0,"serviceDate":"string","ratePercent":0,"chartOfAccountId":"string","departmentId":"string","locationId":"string","actgClassId":"string","jobId":"string","description":"string","taxable":true,"taxCode":"string","lineOrder":0}]}}'
```

**v3 invoice creation with POST /v3/invoices**

In v3, `invoiceNumber`, `invoiceDate`, and `dueDate` are optional (BILL auto-generates the values if omitted). If the customer does not exist yet, set `name` and `email` in the customer object, and BILL creates the customer inline as part of the same request. Email delivery is a `processingOptions` flag in the same call.

When `enableCardPayment` is set as `true`, the customer can pay the invoice by card. An additional `convenienceFee` object enables the option to set the percentage the customer is charged for paying by card.
```bash
curl --request POST \
  --url https://gateway.stage.bill.com/connect/v3/invoices \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{
  "customer": {
    "name": "{{customer_name}}",
    "email": "{{customer_email_address}}"
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
  },
  "enableCardPayment": true,
  "convenienceFee": {
    "percentage": 1
  }
}'
```

The rest of the migration guide followed the same pattern: flat and verbose in v2, typed and nested in v3.

:::note[The migration docs have evolved in 2026]
In 2026, the BILL v3 API is a mature product. The current docs explain [why to upgrade to v3](https://developer.bill.com/docs/why-upgrade-v3), rather than walking API customers through a step-by-step v2-to-v3 comparison.
:::

## API changelog

I introduced the [API changelog](https://developer.bill.com/changelog) as a way to showcase each feature added and updated in v3, giving customers a clear, ongoing signal of how quickly the parity gap between v2 and v3 was closing.

The parity gap was felt the most by large API customers (bank partners, accounting platforms, enterprise integrators). These customers with deep integrations could not migrate until every capability they depended on was available in v3.

:::tip[Consistent response from API customers]
The ease-of-use improvement was immediate and significant. Many API customers cited the release notes as a key part of their decision to move to v3. They could track exactly what had been added, when, and what it meant for their integration.

The direct result was an increase in subscriptions to the API changelog RSS feed.
:::

## The toughest part: Internal advocacy

The technical challenge of running two versions of documentation was manageable. Internal advocacy for getting to feature parity was a challenge.

Late 2023 and early 2024 were priority constrained. New feature development pulled attention away from existing bug fixes, and advocacy was the most direct way to keep parity work visible for prioritization.

API customers were vocal about feature parity gaps and v3 bugs. Every gap was a reason for them to delay migration. Every bug that stayed open for days or weeks reinforced their skepticism. For customers already uncertain about the migration effort, a poor v3 experience was enough to keep them on v2 indefinitely.

#### My role
My ongoing advocacy role was two-fold.
1. Identify bugs by testing extensively while writing the docs, and keep advocating for their resolution.
2. Keep making the case to engineering and product leadership for parity and tech debt work alongside new feature development.

The API changelog was not just for developer communication. It was also a public record of what had shipped and what was still outstanding, which meant internal accountability.
