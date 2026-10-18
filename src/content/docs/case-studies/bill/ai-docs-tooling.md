---
title: "AI Tooling for Docs"
description: How a one-person docs team turned a company AI sprint into four published Claude skills — and shifted engineering teams from documentation consumers to documentation contributors.
---

## Context

By May 2026, BILL officially adopted Claude as an enterprise AI tool and gave teams unstructured time to experiment. For engineering teams, that meant exploring code generation, process automation, and test automation. For me, it meant turning a year of my AI experience into building tools that could change how documentation was produced at BILL.

By June 2026, I had published 4 Claude skills on GitLab. These skills were documented, installable tools for automating a set of steps in the documentation process.

## The foundation: A style guide that engineers could use

By this time, I had been maintaining a high-level BILL documentation style guide for 4 years. The intent was practical: when a Developer Platform engineer added or updated a feature in the Java engineering project, they had the option to write a first draft of the related documentation themselves. The guide gave them enough of a framework to write first drafts with confidence.

The style guide and the published API reference docs from [developer.bill.com](https://developer.bill.com) became the input for Claude Code. The output was a single `skill.md` file with 2 uses.
- Rules for the first Claude skill
- Style guide for the ReadMe linting and audit tools

I kept iterating on the `skill.md` so that the Claude skill and the ReadMe tools always worked from the same input.

ReadMe provides 2 quality tools for documentation teams (a single-page linter and a full docset audit tool). Both evaluate documentation against a configured style guide, surfacing errors and warnings at the field level. The style guide I generated with Claude Code made the ReadMe tools precise. The tools could now flag specific issues against standards built for BILL developer documentation, and not generic writing guidelines.

## The 4 Claude skills

#### 01 Docs review

The `/docs-review` skill applied the style guide directly. A writer or engineer could run it against any page or section and receive a structured review from Claude. The review included errors to fix, warnings to consider, and guidance based on the same rules as the ReadMe linting tools. The feedback was specific and actionable. Instead of "this is unclear," it was "this field description is missing its constraints and default value."

#### 02 Interactive recipe drafts

The `/docs-recipe` skill generated first drafts of interactive recipes. An interactive recipe on `developer.bill.com` uses ReadMe's support for MDX custom components. For example, the [BILL AP workflow interactive recipe](https://developer.bill.com/docs/recipe-bill-ap-workflow) lets developers enter their sandbox credentials, then walks them through the workflow by making live API calls and showing how the endpoints connect.

Given a topic, the skill produced a structured draft: what to call first, how the output of one request feeds into the next, and where developers typically get stuck. The draft was a starting point, not a finished product. But it cut the time from "we need a recipe for X" to "here's a draft to review" from days to minutes.

:::note[Published recipes]
Of the 9 interactive recipes published on `developer.bill.com`, 8 started as first drafts from the Claude skill. See the complete list at [BILL v3 API recipes](https://developer.bill.com/docs/bill-v3-api-recipes).
:::

#### 03 Developer tutorial video script drafts

The `/docs-script` skill generated first-draft scripts for developer tutorial videos.

In the second half of 2025, YouTube tutorials were a core part of our platform growth work with BILL Product Marketing. I wrote 16 tutorial scripts by hand, and 11 were published to YouTube ([Developer Platform Growth](/case-studies/bill/growth/)).

Given a topic and relevant API operations, this Claude skill produced a narrated walkthrough structured for recording. It included an introduction, context, demo steps, and a summary of what was covered. The Google Drive MCP connector was used to save each draft automatically to a shared folder accessible to leadership.

Each time we add endpoints that introduce or extend a BILL workflow, a first-draft script is ready as soon as the documentation goes live.

#### 04 API developer communications drafts

The `/docs-comms` skill generated first drafts of mass communications to the API developer audience — release announcements, migration notices, deprecation warnings. Given a topic and the relevant context (new endpoint, changed behavior, upcoming deadline), it produced a structured email draft written for a technical audience. Like the video script skill, the output was written automatically to a shared Google Drive folder, so leadership had immediate visibility into what was being drafted and sent.

## How the skills were built

The build process was intentionally iterative. For each skill, Claude generated the `skill.md` (the Claude Code skill file defining behavior, scope, and output format) from the source material I provided, and I kept adding source material as the skill took shape. I then ran the skill on a test topic, reviewed the output, and refined the `skill.md` based on how the skill performed.

Each skill had its own source material and test topics:
- **Docs review**: I fed it the style guide and existing docs from `developer.bill.com`, then fine-tuned the `skill.md` based on the style choices made in those docs.
- **Interactive recipe drafts**: I first built the MDX custom component for the BILL AP workflow recipe with Claude Code. Once that recipe was published, I fed its MDX to Claude as the source material, then tested the skill with small workflows (i.e. adding an organization bank account with the API).
- **Developer tutorial video script drafts**: I fed it the 16 tutorial scripts I had written by hand and the 11 published YouTube tutorials, then tested it with the same kind of small workflows as the recipe skill.
- **API developer communications drafts**: I fed it past developer emails and changelog entries, then tested it with announcements (i.e. the deprecation of a field in the next 2 months).

Every skill was also instructed to ask follow-up questions whenever a detail in the provided instructions was unclear or incomplete. Instead of guessing, the skill asked first.

Engineers on the Developer Platform team were the first external users: they tested the skills against real content, gave feedback on where the output missed, and those findings went back into the next iteration.

Model selection was part of the iteration. I worked across Claude Haiku, Sonnet, and Opus at different stages — using lighter models for fast iteration on structure and switching to more capable models when reviewing and refining the `skill.md` itself. The goal was the right model for each task, not the most capable model by default, and I learned to be deliberate about what each model tier was actually good for.

Each published skill included:
- A `skill.md` defining behavior, scope, and output format — the file Claude Code reads to execute the skill
- A `readme.md` with installation instructions, usage examples, and scope documentation — written for engineers who had never used Claude Code before

## What it changed

The skills didn't replace the documentation workflow. They changed where effort was spent. Engineers could now produce structured first drafts without waiting for the technical writer. The docs review skill meant those drafts could be evaluated against real standards before they were ever published. The recipe and tutorial skills compressed the gap between "we need this content" and "here is a draft."

The deeper shift was that the documentation team's expertise — the style guide, the structural knowledge of the API, the understanding of what developers needed — was now encoded in tools that anyone on the Developer Platform team could use. The knowledge became shareable infrastructure.

For me, it was also a direct application of what AI had taught me over the previous year: the most valuable use of these tools isn't generating finished output. It's building systems that make the right output easier for everyone to produce.

## Making the docs AI-agent ready

The skills addressed how AI could help produce documentation. A parallel question was whether the documentation itself was ready for AI to consume.

I ran `developer.bill.com` through [afdocs.dev](https://afdocs.dev), an AI-friendliness audit tool for documentation sites. The results shaped a set of concrete changes:

- **llms.txt** — published a `llms.txt` file for `developer.bill.com`, giving AI agents a structured index of the site's content and purpose, following the emerging convention for AI-readable site metadata
- **Markdown rendering** — enabled markdown output for all pages on `developer.bill.com`, so AI agents requesting content could parse structured text rather than HTML
- **Link integrity** — used the ReadMe AI audit tool to surface and fix broken links across the docset, ensuring that when an agent traversed the site it didn't hit dead ends
- **MCP server** — enabled `developer.bill.com/mcp`, connecting the docs to an MCP server so AI agents could access the documentation programmatically rather than by scraping

| Change | What it enables |
|---|---|
| Published `llms.txt` | AI agents get a structured index of the site's content and purpose, following the emerging convention for AI-readable site metadata |
| Enabled Markdown output for all pages | AI agents parse structured text, not HTML |
| Fixed broken links with the ReadMe AI audit tool | AI agents traverse the docset without hitting dead ends |
| Enabled the MCP server at `developer.bill.com/mcp` | AI agents access the docs programmatically, not by scraping |

The Postman Collection added one more surface: the Postman AI agent can natively read the Collection and make live API calls from it. A developer using an AI agent in Postman can describe a workflow in natural language and have the agent execute the corresponding API calls against the BILL sandbox — using the same Collection structure, environment variables, and post-response automation built into the original build.

Taken together, these changes extended the reach of the documentation beyond human readers. By June 2026, `developer.bill.com` was structured for developers, AI coding assistants, and AI agents equally.
