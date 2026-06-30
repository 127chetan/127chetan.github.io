---
title: "Chapter 5: Building AI Tooling for the Documentation Workflow"
description: How a one-person docs team turned a company AI sprint into four published Claude skills — and shifted engineering teams from documentation consumers to documentation contributors.
---

## The window

In the final week of May 2026, BILL officially adopted Claude as an enterprise AI tool and gave teams unstructured time to experiment — a sprint with cleared calendars and no deliverable requirements. For engineering teams, that meant exploring code generation and test automation. For me, it meant something different: turning a year of AI experience into reusable tools that could change how documentation was produced at BILL.

By the end of June 2026, I had published four Claude skills to BILL's internal GitLab — each one a documented, installable tool with a `skill.md` defining its behavior and a `readme.md` covering installation, usage, and scope.

## The foundation: a style guide engineers could actually use

Before the sprint, I had a set of style guidelines in place for the developer platform engineering team. The intent was practical: when an engineer added or updated a feature in the Java engineering project, they had the option to write a first draft of the related documentation themselves. The guidelines gave them enough of a framework to do that without needing deep documentation expertise.

Those guidelines, combined with key reference docs from developer.bill.com, became the input I fed to Claude Code. The output was two things at once: the content that populated ReadMe's built-in linting and audit tools, and the `skill.md` file for the first Claude skill.

ReadMe provides two quality tools for documentation teams — a single-page linter and a full docset audit tool. Both evaluate content against a configured style guide, surfacing errors and warnings at the field level. The style guide I generated with Claude Code made those tools precise: they could now flag specific issues against standards built for developer documentation, not generic writing guidelines.

## The four skills

### Docs review

The first skill was a direct translation of the style guide work into a Claude skill. A writer or engineer could run it against any page or section and receive a structured review: errors to fix, warnings to consider, and guidance anchored to the same standards used in the ReadMe linting tools. The feedback was specific and actionable — not "this is unclear," but "this field description is missing its constraints and default value."

### Interactive recipe drafts

The second skill generated first drafts of interactive recipes — ReadMe's code-first documentation format for multi-endpoint workflows. Given a topic, the skill produced a structured draft showing endpoint orchestration: what to call first, how the output of one request feeds into the next, and where developers typically get stuck. The draft was a starting point, not a finished product, but it cut the time from "we need a recipe for X" to "here's a draft to review" from days to minutes.

### Developer tutorial video script drafts

The third skill generated first-draft scripts for developer tutorial videos. Given a topic and the relevant API operations, it produced a narrated walkthrough structured for recording: introduction, context, demo steps, and a summary of what was covered. The output went directly to a shared Google Drive folder accessible to leadership — using the Google Drive MCP connector in Claude Code to write the file on completion. No copy-paste, no formatting step.

### API developer communications drafts

The fourth skill generated first drafts of mass communications to the API developer audience — release announcements, migration notices, deprecation warnings. Given a topic and the relevant context (new endpoint, changed behavior, upcoming deadline), it produced a structured email draft written for a technical audience. Like the video script skill, the output was written automatically to a shared Google Drive folder, so leadership had immediate visibility into what was being drafted and sent.

## How the skills were built

The build process was intentionally iterative. Each skill started as a rough `skill.md` — a Claude Code skill file defining the behavior, scope, and output format. I ran the skill, reviewed the output, improved the `skill.md`, and ran it again. Engineers on the developer platform team were the first external users: they tested the skills against real content, gave feedback on where the output missed, and those findings went back into the next iteration.

Model selection was part of the iteration. I worked across Claude Haiku, Sonnet, and Opus at different stages — using lighter models for fast iteration on structure and switching to more capable models when reviewing and refining the `skill.md` itself. The goal was the right model for each task, not the most capable model by default, and I learned to be deliberate about what each model tier was actually good for.

Each published skill included:
- A `skill.md` defining behavior, scope, and output format — the file Claude Code reads to execute the skill
- A `readme.md` with installation instructions, usage examples, and scope documentation — written for engineers who had never used Claude Code before

## What it changed

The skills didn't replace the documentation workflow. They changed where effort was spent. Engineers could now produce structured first drafts without waiting for the technical writer. The docs review skill meant those drafts could be evaluated against real standards before they were ever published. The recipe and tutorial skills compressed the gap between "we need this content" and "here is a draft."

The deeper shift was that the documentation team's expertise — the style guide, the structural knowledge of the API, the understanding of what developers needed — was now encoded in tools that anyone on the developer platform team could use. The knowledge became shareable infrastructure.

For me, it was also a direct application of what AI had taught me over the previous year: the most valuable use of these tools isn't generating finished output. It's building systems that make the right output easier for everyone to produce.
