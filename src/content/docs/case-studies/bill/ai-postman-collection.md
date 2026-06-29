---
title: "Chapter 4: Building the BILL v3 API Postman Collection with AI"
description: How a solo technical writer used AI to build and publish the official BILL v3 API Postman Collection in three weeks — and what made it more than just an export.
---

## The opportunity

By 2025, AI had shifted how developers discovered and evaluated APIs. Developers could describe a workflow in natural language and get working integration code back — without needing to read documentation line by line or write a single call from scratch. At the same time, the developer platform, partner support, and product marketing teams at BILL were looking for ways to make the BILL API Platform more visible and accessible. A published Postman Collection was the answer: it would signal confidence in the API, meet developers where they already worked, and give them a ready-to-run starting point.

In mid-2025, I built and published the official BILL v3 API Postman Collection. Three weeks from first experiment to published Collection — 15 business days, solo. Without AI, that timeline would not have been possible.

## Starting from scratch — on a weekend

The project started as a personal experiment with ChatGPT and a Postman account, using the petstore OpenAPI spec to understand what was possible. The core idea: use the `openapi-to-postmanv2` library to convert the v3 OpenAPI spec into a Postman Collection, then layer on tooling to make the result actually useful.

The library had a significant limitation: it flattens every endpoint to the same level. Any folder structure defined in the OpenAPI `tag` field is ignored. The output is a flat list of 200+ endpoints — no hierarchy, no grouping, no navigation structure. That was not a publishable experience.

## The build

The solution was a set of JavaScript scripts, each built iteratively with AI:

**Script 1 — Restructure the Collection**  
The first script parsed the generated Collection JSON and reorganized it into a folder structure matching the v3 API reference on developer.bill.com. The same mental model a developer used to navigate the docs carried over directly into Postman. Consistency between the two surfaces was non-negotiable — breaking the mental model across tools would create confusion, not reduce it.

**Script 2 — Build the Postman Environment**  
The second script parsed the source OpenAPI spec and generated a Postman Environment file with 100+ variables — one for each value that would be reused across requests. `{{vendor_id}}`, `{{bill_id}}`, `{{session_id}}`, `{{organization_id}}`, and so on across the full v3 endpoint surface.

**Script 3 — Post-response automation**  
The third script generated post-response scripts for each relevant endpoint. When a request succeeds, the script captures the key value from the response and saves it as the corresponding Postman variable automatically.

For example, the login response:
```javascript
let jsonData = pm.response.json();
let value = jsonData.sessionId;
if (value) pm.environment.set("session_id", value);
pm.environment.set("login_user_id", jsonData.userId);
```

And vendor creation:
```javascript
let jsonData = pm.response.json();
let value = jsonData.id;
if (value) pm.environment.set("vendor_id", value);
```

This meant a developer could run the login request, and the session ID was immediately available in the header for every subsequent call — no copying, no placeholder replacement. Create a vendor, and the vendor ID was ready for the create bill request. Create a bill, and both the bill ID and vendor ID were ready for the payment request. Complete AP workflows, executable in sequence, with no manual state management between steps.

## What made it possible: AI as a build partner

The AI tooling evolved through the project. The initial experiments used ChatGPT. When the project moved into BILL, Gemini was the approved AI tool — it generated the JavaScript logic and I iterated by reading the code, identifying logic errors, testing the output, and reporting back. JavaScript was the right choice: the logic was simple enough to follow by reading, which made the feedback loop fast and reliable.

When Kiro was approved at BILL in 2026, the project moved to Kiro for ongoing maintenance — ensuring that when new fields were added, fields deprecated, or endpoints updated, the Postman PUT operation for publishing Collection updates worked correctly. Claude handled the final iteration, focusing on code efficiency for long-term maintainability.

## Working examples in the source

A prerequisite for the Collection was adding working request examples to the source Java engineering project — picked up by the `openapi-generator` library when generating the spec. These examples appeared as pre-filled request bodies in both the API reference on developer.bill.com and the Postman Collection. A developer could hit **Send** on any request and expect a valid response, without filling in a single placeholder.

For endpoints with natural orchestration — create vendor → use vendor ID to create bill → use bill and vendor IDs to create payment — the examples used Postman variables as placeholders, populated automatically by the post-response scripts.

## The publishing workflow

The expected workflow for each release:

1. New endpoint or field added in the Java engineering project
2. CI/CD pipeline generates the updated v3 OpenAPI spec
3. Scripts run against the spec, producing an updated Collection JSON and Environment file
4. Output published to a personal Postman account for visual verification
5. On confirmation, published to the official BILL Postman account

With each Collection update, I posted release note summaries directly in Postman. Every subscriber and follower on the BILL Postman account received an email with the summary — the same release discipline that had built trust on developer.bill.com extended to where developers were already working.

## The reception

API customer feedback was immediate and positive. The response was consistent: instead of testing in the docs or copying cURL examples and manually replacing placeholders, developers could run complete workflows from start to finish. The variables handled state. The post-response scripts handled continuity. The folder structure handled navigation.

The regular Collection update emails signaled something important to customers: the Collection was being actively maintained. That confidence — knowing that what they were using reflected the current API — was as valuable as the Collection itself.
