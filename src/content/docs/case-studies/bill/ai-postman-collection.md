---
title: "AI-Powered Postman Collection"
description: How a solo technical writer used AI to build and publish the official BILL v3 API Postman Collection in 3 weeks — and what made it more than just an export.
---

## Context

By mid-2025, the AI shift gave developers new powers to discover and evaluate API products. Developers could describe a workflow in natural language and get working integration code, without the need to read documentation or to write a single API call from scratch.

At the same time, the BILL Developer Platform, Partner Support, and Product Marketing teams were looking for new ways to make the BILL API Platform more visible and accessible. A published Postman Collection was the answer: it would signal confidence in the BILL API products, meet developers where they already worked, and give them a ready-to-run starting point.

I built and published the official BILL v3 API Postman Collection. As a solo project, I went from my first experiment to published Collection in just 3 weeks (15 business days). Without AI, this timeline would be impossible.

## A weekend experiment

I started the project one weekend as a personal experiment with ChatGPT and my free Postman account. I used the Swagger Petstore sample spec to understand what was possible.

My core idea was to use the Postman `openapi-to-postmanv2` library to convert the BILL v3 OpenAPI spec into a Postman Collection, and then add a layer of tooling to make the result useful.

A big limitation of the library is that it ignores the folder structure defined with the OpenAPI `tag` field. The output is a flat list of 300+ endpoints, without any hierarchy, grouping, or navigation structure.

That was not something I wanted to publish.

## The build

My solution was to build a set of JavaScript scripts with AI. These scripts transformed the Collection generated with `openapi-to-postmanv2` into a publishable version. I tested each script extensively and iterated at every stage.

**Script 1: Restructure the Collection**  
The first script parsed the generated Collection JSON and reorganized it into a folder structure that matched the [v3 API reference](https://developer.bill.com/reference/login) on `developer.bill.com`. Developers familiar with the API reference docs could pick up right where they left off in Postman.

Visual and navigational consistency between the two surfaces was non-negotiable. Developers shouldn't have to relearn the API reference layout when they switch tools.

**Script 2: Build the Postman Environment**  
The second script scanned the `example` fields in the source OpenAPI spec for Postman variables and generated a Postman Environment file with 100+ variables.

A Postman variable is a key-value pair that acts as a placeholder for a value. For example, the `{{session_id}}` variable is set as a header value in each API request. When a developer completes API login with `POST /v3/login`, this variable is set as the generated session ID from the login response. Other variable examples include `{{vendor_id}}`, `{{bill_id}}`, and `{{organization_id}}`.

**Script 3: Post-response automation**  
The third script generated Post-response scripts for each relevant endpoint.

Postman Post-response scripts are blocks of JavaScript code that run automatically after an API response is received from the server. When a request succeeds, the script captures the relevant value from the response and saves it as the corresponding Postman variable.

For example, the Post-response script for a successful API login response looks for the `sessionId` field and sets the value as the `{{session_id}}` variable. In addition, the `userId` field is set as the `{{login_user_id}}` variable.
```javascript
let jsonData = pm.response.json();
let value = jsonData.sessionId;
if (value) pm.environment.set("session_id", value);
pm.environment.set("login_user_id", jsonData.userId);
```

Similarly, the Post-response script for a successful Create a vendor response looks for the vendor `id` field and sets the value as the `{{vendor_id}}` variable.
```javascript
let jsonData = pm.response.json();
let value = jsonData.id;
if (value) pm.environment.set("vendor_id", value);
```

With these scripts in place, a developer could run complete workflows in sequence, with no manual state management between steps.

1. Log in, and the session ID is set as the `{{session_id}}` header value for every subsequent request.
2. Create a vendor, and the `{{vendor_id}}` variable is ready for the Create a bill request.
3. Create a bill, and both the `{{vendor_id}}` and `{{bill_id}}` variables are ready for the payment request.

## AI as a build partner

My AI tooling evolved through the project. I worked with ChatGPT for my initial experiments. When Gemini was approved at BILL in 2025, it became the tool for generating JavaScript logic. I iterated by reading code, identifying logic errors, testing output, and reporting back. JavaScript was the right choice: the logic was simple enough to follow, which made the feedback loop fast and reliable.

When Kiro was approved at BILL in 2026, the project moved to Kiro for ongoing maintenance. For example, I used Kiro to make sure the Postman `PUT` operation for publishing Collection updates worked as expected when fields were added or deprecated, or when endpoints were updated. When BILL adopted Claude in May 2026, I used Claude for the final iteration, focusing on code efficiency for long-term maintainability.

## Request examples in the Postman Collection

A prerequisite for publishing the Collection was working request examples. A developer should be able to hit `Send` on any request and get a successful response, without the need to replace a single placeholder value.

I added examples for each `POST`, `PUT`, and `PATCH` request in the source Java engineering project. When the OpenAPI spec was generated with the `openapi-generator` library, these examples appeared as prefilled request bodies in both the API reference on `developer.bill.com` and Postman Collection.

For requests that depend on an earlier response, the examples used Postman variables in place of hard-coded IDs. For example, the Create a bill example uses `{{vendor_id}}`, which is set by the Create a vendor post-response script. No placeholder for the developer to replace. The Collection simply fills in working placeholders values.

## The publishing workflow

The expected workflow for each release:

1. New endpoint or field added in the Java engineering project
2. CI/CD pipeline generates the updated v3 OpenAPI spec
3. Scripts run against the spec, producing an updated Collection JSON and Environment file
4. Output published to a personal Postman account for visual verification
5. On confirmation, published to the official BILL Postman account

With each Collection update, I posted release note summaries directly in Postman. Every subscriber and follower on the BILL Postman account received an email with the summary — the same release discipline that had built trust on `developer.bill.com` extended to where developers were already working.

## Automating Collection updates

Publishing the Collection the first time was one problem. Keeping it current with every API release was another.

In August 2025 — after the Collection was live — I built the first iteration of the update workflow as a set of JavaScript scripts. Each script handled a discrete operation in the chain:

1. **Combine** — merge the two v3 source OpenAPI spec files into one. The v3 API spans two engineering projects: one covering AP, AR, Partner, Organization, and Network operations; one covering Webhooks. The scripts treat them as a single surface.
2. **GET** — call the Postman API to pull the current published Collection JSON.
3. **Diff** — compare the combined spec against the current Collection to identify added, changed, and removed endpoints, fields, field names, and types.
4. **Update** — apply the diff: add new operations, update changed fields, remove deprecated ones.
5. **Post-response scripts** — the diff identifies which new POST endpoints need a post-response script. Writing the script requires human intervention: the response structure of each new endpoint determines how the generated ID value is captured and saved as a Postman variable.
6. **Examples** — add or update request examples in POST, PUT, and PATCH operations from the working examples set in the source spec.
7. **PUT** — call the Postman API to push the updated Collection.

Getting the PUT configuration right for our specific use case required working directly with the Postman team — they were responsive and helped identify the correct endpoint configuration.

The pipeline runs twice for each update: first against a local copy of the Collection for a human eyetest, then — once confirmed — against the official published Collection. The trigger is manual: a deliberate choice to control when updates go out so releases and Collection changes stay coordinated.

Once the process was reliable, I formalized it into a GitLab CI/CD pipeline with discrete stages — one per script operation. The AI tooling evolved alongside the project: Gemini when it was approved at BILL, then Kiro, then Claude in May 2026 — each iteration improving the code logic and pipeline structure.

## The reception

API customer feedback was immediate and positive. The response was consistent: instead of testing in the docs or copying cURL examples and manually replacing placeholders, developers could run complete workflows from start to finish. The variables handled state. The post-response scripts handled continuity. The folder structure handled navigation.

The regular Collection update emails signaled something important to customers: the Collection was being actively maintained. That confidence — knowing that what they were using reflected the current API — was as valuable as the Collection itself.
