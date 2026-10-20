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

The `/docs-review` skill applied the style guide directly. A writer or engineer could run it against any page or section and receive a structured review from Claude. The review included errors to fix, warnings to consider, and guidance based on the same rules as the ReadMe linting tools.

Feedback from the skill review was specific and actionable. Instead of "this is unclear," it was "this field description is missing its constraints and default value."

#### 02 Interactive recipe drafts

The `/docs-recipe` skill generated first drafts of interactive recipes. In 2026, I overhauled recipes on `developer.bill.com` from Python scripts in the ReadMe recipes feature to custom MDX components. These interactive recipes run API calls in the docs, show each response, and automatically use the response as input for the next API call (live orchestration). For example, the [BILL AP workflow interactive recipe](https://developer.bill.com/docs/recipe-bill-ap-workflow) enables developers to enter their sandbox credentials, and then walks them through the workflow by making live API calls and showing how the endpoints connect.

Given a topic, the skill produced a structured draft: what to call first, how the output of one request feeds into the next, and where developers typically get stuck. The draft was a starting point, not a finished product. But it cut the time from "we need a recipe for X" to "here's a draft to review" from days to minutes.

:::note[Published recipes]
Of the 9 interactive recipes published on `developer.bill.com`, 8 started as first drafts from the Claude skill. See the complete list at [BILL v3 API recipes](https://developer.bill.com/docs/bill-v3-api-recipes).
:::

#### 03 Developer tutorial video script drafts

The `/docs-script` skill generated first-draft scripts for developer tutorial videos.

In the second half of 2025, YouTube tutorials were a core part of our platform growth work with BILL Product Marketing. I wrote 16 tutorial scripts by hand, and 11 were published to YouTube ([Developer Platform Growth](/case-studies/bill/growth/)).

Given a topic and relevant API operations, this Claude skill produced a narrated walkthrough structured for recording. It included an introduction, context, demo steps, and a summary of what was covered. The Google Drive MCP connector was used to save each draft automatically to a shared folder accessible to leadership.

The skill was designed so that each time the team added endpoints that introduced or extended a BILL workflow, a first-draft script would be ready as soon as the documentation went live.

#### 04 API developer communications drafts

The `/docs-comms` skill generated first drafts for mass communications to the API developer audience (release announcements, migration notices, and deprecation warnings).

Given a topic and the relevant context (new endpoint, changed behavior, or upcoming deadline), the skill produced a structured email draft written for a technical audience. Like the video script skill, the output was saved automatically to a Google Drive folder accessible to leadership. Our first drafts went from an hour to a few seconds.

## How the skills were built

The build process was intentionally iterative. For each skill, Claude generated the `skill.md` from the source material I provided. I then tested the skill on sample topics and refined the `skill.md` based on output.

Each published skill included 2 files.
- A `skill.md` file for defining behavior, scope, and output format. This is the file Claude Code reads to execute the skill.
- A `readme.md` file with installation instructions, usage examples, and scope documentation. This file is written for first-time users of Claude skills.

Each skill had its own source material and test topics.
- **Docs review** (`/docs-review`): My input was the style guide and existing docs from `developer.bill.com`. I refined the `skill.md` based on what the skill flagged and how it phrased feedback.
- **Interactive recipe drafts** (`/docs-recipe`): I first built the BILL AP workflow interactive recipe (MDX custom component) with Claude Code. When that recipe was published, I fed the MDX to Claude as input, and then tested the skill with small workflows (for example, adding an organization bank account with the API). I fine-tuned the skill based on generated output.
- **Developer tutorial video script drafts** (`/docs-script`): My input was the 16 tutorial scripts I had written and the 11 published YouTube tutorials. I then worked through the same cycle of testing the skill with small workflows and iterating based on output.
- **API developer communications drafts** (`/docs-comms`): My input was past developer emails and changelog entries. I tested the skill with sample announcements (for example, a field deprecation in the next 2 months) and refined the `skill.md` based on generated output.

Each skill was also instructed to ask follow-up questions whenever a detail in the provided instructions was unclear or incomplete. Instead of guessing, the skill asked first.

#### Internal feedback

Engineers on the Developer Platform team were the first set of users. They tested the skills against real content, gave feedback on where the output missed, and those findings went back into the next set of iterations.

#### Switching between Claude models

Model selection was part of the iterations as well. I worked across Claude Haiku, Sonnet, and Opus at different stages. I used lighter models for fast iteration on structure, and then switched to more capable models to review and refine the `skill.md` itself. The goal was to match the model to the task, not to default to the most capable one.

## Outcomes

The skills did not replace the documentation workflow. They changed where effort was spent. Engineers could now produce structured first drafts without waiting for the technical writer.

The docs review skill meant that those drafts could be evaluated against the style guide before they were ever published. The recipe and tutorial skills compressed the gap between "we need this content" and "here is a draft," and the comms skill turned a deprecation or release into a ready-to-review email draft. The recipe skill produced first drafts for 8 of the 9 interactive recipes published on `developer.bill.com`.

The deeper shift was that the style guide, the structural knowledge of the API, and the understanding of what developers needed were now encoded in tools that anyone on the Developer Platform team could use. The knowledge became shareable infrastructure.

For me, it was also a direct application of what AI had taught me over the previous year: the most valuable use of these tools is not about generating finished output. It is about building systems that make the right output easier for everyone to produce.

## Making the docs AI-agent ready

The skills addressed how AI could help produce documentation. A parallel question was whether the documentation itself was ready for AI agents to consume.

I ran `developer.bill.com` through [afdocs.dev](https://afdocs.dev), an AI-friendliness audit tool for documentation sites. The results shaped a set of concrete changes.

| Update | Impact |
|---|---|
| Published `llms.txt` | AI agents get a structured index of the site content and purpose |
| Enabled Markdown output | AI agents parse the docset with structured text, not HTML |
| Fixed broken links with the ReadMe AI audit tool | AI agents traverse the docset without hitting dead ends |
| Enabled MCP server at `developer.bill.com/mcp` | AI agents access the docs programmatically, not by scraping |

The [Postman Collection](/case-studies/bill/ai-postman-collection/) added one more surface. The Postman AI agent can natively read the Collection and make live API calls. A developer using an AI agent in Postman can describe a workflow in natural language and have the agent execute the corresponding API calls against the BILL sandbox environment. The agent uses the same Collection structure, environment variables, and Post-response automation built into the BILL Postman Collection.

Taken together, these updates extended the reach of documentation beyond human readers. By June 2026, `developer.bill.com` was structured for developers, AI coding assistants, and AI agents.
