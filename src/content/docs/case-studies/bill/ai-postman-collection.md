---
title: "AI-Powered Postman Collection"
description: How a solo technical writer used AI to build and publish the official BILL v3 API Postman Collection in 3 weeks, and what made it more than just an export.
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

Visual and navigational consistency between the 2 surfaces was non-negotiable. Developers shouldn't have to relearn the API reference layout when they switch tools.

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

For requests that depend on an earlier response, the examples used Postman variables in place of hard-coded IDs. For example, the Create a bill example uses `{{vendor_id}}`, which is set by the Create a vendor post-response script. No placeholder for the developer to replace. The Collection simply fills in the values for them.

## Keeping the Collection current

Publishing the Collection the first time was one problem. Keeping it current with every API release was another.

Each Agile sprint, the engineering team designed and built new endpoints, features, and also updates in the Java engineering project. When we were ready for a release, the project CI/CD pipeline generated the updated v3 OpenAPI spec for the list of additions and updates. The Postman Collection had to follow each release.

In August 2025, after the Collection was live, I built the first iteration of the Collection update workflow with a set of new JavaScript scripts. Each script handled a key operation in the Collection publishing chain.

<svg viewBox="0 0 960 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pc-title pc-desc" style="width: 100%; height: auto; display: block;">
<title id="pc-title">Postman Collection update pipeline</title>
<desc id="pc-desc">7-stage update pipeline in 2 rows. Row 1, left to right: combine the v3 API and Webhooks specs, GET the live Collection, diff, update the Collection. Row 2, right to left: add post-response scripts, add request examples, and then PUT the Collection. The PUT step runs twice: first to a personal Postman account for a visual check, and then to the BILL Postman account for release.</desc>
<defs>
<marker id="pc-arr" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
<path d="M0,0.5 L8,3.5 L0,6.5 Z" fill="#4f5d75"/>
</marker>
</defs>
<rect width="960" height="280" fill="#f5f5f5"/>
<rect x="32" y="32" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="32" y="24" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">01</text>
<text x="130.5" y="67" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Combine OpenAPI spec</text>
<text x="130.5" y="86" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">v3 API + Webhooks</text>
<rect x="265" y="32" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="265" y="24" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">02</text>
<text x="363.5" y="67" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">GET live Collection</text>
<text x="363.5" y="86" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">Postman API</text>
<rect x="498" y="32" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="498" y="24" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">03</text>
<text x="596.5" y="67" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Diff</text>
<text x="596.5" y="84" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">Combined spec vs</text>
<text x="596.5" y="98" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">live Collection</text>
<rect x="731" y="32" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="731" y="24" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">04</text>
<text x="829.5" y="67" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Update Collection</text>
<text x="829.5" y="86" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">Apply diff</text>
<rect x="731" y="156" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="731" y="148" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">05</text>
<text x="829.5" y="191" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Add Post-response scripts</text>
<text x="829.5" y="210" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">Where required</text>
<rect x="498" y="156" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="498" y="148" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">06</text>
<text x="596.5" y="191" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">Add request examples</text>
<text x="596.5" y="208" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">In POST, PUT,</text>
<text x="596.5" y="222" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">PATCH operations</text>
<rect x="265" y="156" width="197" height="80" rx="6" fill="#ececec" stroke="#2d3142" stroke-width="1.2"/>
<text x="265" y="148" font-family="'Geist Mono',monospace" font-size="11" font-weight="600" fill="#7a8399" letter-spacing="0.12em">07</text>
<text x="363.5" y="191" font-family="'Geist',sans-serif" font-size="14" font-weight="600" fill="#2d3142" text-anchor="middle">PUT Collection</text>
<text x="363.5" y="210" font-family="'Geist Mono',monospace" font-size="11" font-weight="500" fill="#4f5d75" text-anchor="middle">Postman API</text>
<line x1="229" y1="72" x2="265" y2="72" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="462" y1="72" x2="498" y2="72" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="695" y1="72" x2="731" y2="72" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="829.5" y1="112" x2="829.5" y2="156" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="731" y1="196" x2="695" y2="196" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="498" y1="196" x2="462" y2="196" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<path d="M265,196 L247,196" fill="none" stroke="#4f5d75" stroke-width="1.2"/>
<path d="M247,174 L247,218" fill="none" stroke="#4f5d75" stroke-width="1.2"/>
<line x1="247" y1="174" x2="229" y2="174" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<line x1="247" y1="218" x2="229" y2="218" stroke="#4f5d75" stroke-width="1.2" marker-end="url(#pc-arr)"/>
<rect x="32" y="156" width="197" height="36" rx="6" fill="#ffffff" stroke="#4f5d75" stroke-width="1"/>
<text x="130.5" y="172" font-family="'Geist',sans-serif" font-size="13" font-weight="600" fill="#2d3142" text-anchor="middle">1. Personal account</text>
<text x="130.5" y="185" font-family="'Geist Mono',monospace" font-size="10" font-weight="500" fill="#4f5d75" text-anchor="middle">Visual check</text>
<rect x="32" y="200" width="197" height="36" rx="6" fill="#ffffff" stroke="#4f5d75" stroke-width="1"/>
<text x="130.5" y="216" font-family="'Geist',sans-serif" font-size="13" font-weight="600" fill="#2d3142" text-anchor="middle">2. BILL account</text>
<text x="130.5" y="229" font-family="'Geist Mono',monospace" font-size="10" font-weight="500" fill="#4f5d75" text-anchor="middle">Release</text>
<a href="https://github.com/cathrynlavery/diagram-design" target="_blank" rel="noopener noreferrer">
<text x="32" y="264" font-family="'Geist Mono',monospace" font-size="9" font-weight="400" fill="#7a8399" text-decoration="underline">Flow diagram created with the diagram-design Claude skill</text>
</a>
</svg>

1. **Combine OpenAPI spec**: Merge both v3 OpenAPI spec files into one. The v3 API spans 2 engineering projects. One project covers AP, AR, Partner, Organization, and Network operations, and the other project covers Webhooks.
2. **GET live Collection**: Call the Postman API (`GET https://api.postman.com/collections/{collection_id}`) to pull the live Collection JSON.
3. **Diff**: Compare the combined OpenAPI spec (from step 1) against the live Collection to identify additions and updates in endpoints, fields, field names, types, and documentation.
4. **Update Collection**: Apply the results of the diff. Add new operations, add or update fields, and update documentation.
5. **Add Post-response scripts**: The diff identifies the new `POST` endpoints that need a Post-response script. The response structure of each new endpoint determines how the generated ID value is captured and saved as a Postman variable. This step requires human intervention.
6. **Add request examples**: Add or update request examples in `POST`, `PUT`, and `PATCH` operations from the working examples set in the source OpenAPI spec.
7. **PUT Collection**: Call the Postman API (`PUT https://api.postman.com/collections/{collection_id}`) to push the updated Collection first to a personal account for a visual check, and then, when verified, to the BILL account for the product release.

Getting the `PUT` configuration correct for our use case required working directly with the Postman team. They were responsive and helped identify the correct endpoint configuration.

When this process was reliable, I formalized it into a GitLab CI/CD pipeline with discrete stages, one per script operation.

#### Release notes in Postman

With each Collection update, I posted release note summaries directly in Postman. Every subscriber and follower on the BILL Postman account received an email with the summary. The release discipline from the `developer.bill.com` changelog now reached developers where they already worked.

## Outcomes

API customer feedback was immediate and consistently positive. The Collection drove the initial acceleration in API developer adoption, which reached 2500+ active API developers by June 2026 ([Developer Platform Growth](/case-studies/bill/growth/)).

Instead of copying cURL examples from the docs and manually replacing placeholders, developers could run complete workflows from start to finish in Postman. The folder structure handled navigation. The Postman variables handled state. The Post-response scripts handled continuity.

:::note[Customer confidence]
Regular Collection update emails showed customers that the Collection was actively maintained. That confidence was as valuable as the Collection itself.
:::