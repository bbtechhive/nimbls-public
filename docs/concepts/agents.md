# Agents in nimbls

Agent foundation update (2026-09-22): [Agent design plan](../specs/agent-design-plan.md) consolidates Agent composition and specifies `workspace/agents/<agent-name-id>`, all six basic file tools, and New session with retained Pi sessions. It supersedes open directory-location and session-retention choices below. A saved `new` flag applies to regular/manual and scheduled activation: when true, each accepted activation starts a fresh session and retains old sessions. Historical-session UI remains excluded; actual scheduling is later work. The Agent plan also defines immutable system default Agents and bounded ask-nimbls preference records; its ownership rules supersede general Agent modification/deletion wording below.

Status: Product concept draft. The workflows described here are planned, not released functionality.

## What nimbls is for

nimbls is intended to help people create and supervise AI agents that work with NIMBL-managed networks. You describe the work, review the proposed setup, and decide when the agent runs. The agent retrieves information through NIMBL and produces a result you can inspect and keep.

The initial direction is a local application that directly runs and manages agents. Shared-server deployment and external-agent support remain future options, not initial product commitments.

## Useful from the start

nimbls should include useful starter agents that can be run after guided connection/provider setup. Users can begin with a prepared agent, customize it, or create their own. Easy use and readiness out of the box guide the product; ordinary use should not require technical configuration. Milestone 1 validates daily syslog reporting and Ask nimbls. Milestone 2 adds `syslog-reviewer`, `device-snapshot`, `incident-investigator`, and a site-operations extension of `ask-nimbls`, with one planned milestone per agent. Scheduled scripts collect and compare evidence; agents interpret exceptions and findings. See the [default agents and delivery milestones](../guides/starter-agents.md) for scope and acceptance.

## Results first, chat when useful

The primary agent workspace shows the task result, readiness, and a Run button. Each ready agent has a saved default task, so users can run useful work without opening chat or restating their request. While work runs, the UI shows concise progress; failures show a reason and a useful next action. Details, history, logs, and settings remain accessible through entry buttons.

Chat is optional for asking about a result, changing requirements, or refining the agent. The conversational examples below illustrate that option, not a mandatory step for every execution.

## A familiar example

Instead of manually reading a day of syslogs, you could ask:

> Create an agent that reviews yesterday’s syslogs every morning, identifies important events and anomalies, and saves a Markdown summary under syslogs/.

nimbls would propose the agent’s role, access, schedule, and output. Before confirming, you would see an example report and could say “include event counts” or “make the summary shorter.” After setup, a first execution would demonstrate whether the agent can retrieve the intended data and save a useful report.

## The main concepts

| Concept | Plain-language meaning | Example |
| --- | --- | --- |
| Agent | A reusable AI worker with a purpose and permitted capabilities. | Syslog review assistant |
| Task | A particular piece of work you give an agent. | Summarize yesterday’s logs for the selected devices. |
| Execution | One attempt to complete a task. | This morning’s analysis, or a later retry |
| Tool | A capability that performs an action. | Retrieve logs or write a result file |
| Skill | Reusable guidance for doing a kind of work. | A procedure for investigating repeated connection failures |
| Model | The AI used to interpret and analyze information. | A suitable model from a configured provider |
| Harness | The software that runs the agent and manages its tools, limits, and progress. | Managed by nimbls; users do not need to build one. |
| Schedule | A rule for when a task should run. | Daily at 08:00 in the selected timezone |
| Output | The result you receive and can inspect. | A Markdown summary with findings and supporting evidence |

These are explanations of the proposed product model; detailed terminology and behavior are still being refined.

## You stay in control

The creation-agent is the assistant that helps turn your description into an agent setup. It should suggest sensible choices and ask about missing essentials, such as which devices to inspect. You can discuss and edit its proposal before confirming.

Selecting a skill does not grant permission to change devices. The planned access controls must enforce which information and actions each agent can use. Creating an agent does not itself start a device operation.

An agent finishing its work is not enough to prove success. Results should show what was inspected, the findings, the evidence, and any missing data. A possible cause should be labeled as an interpretation, not presented as a verified fact.

## Local analysis, with optional external help

Support for local LLMs is part of the initial product direction. Secure external assistance is future work, excluded from the first milestone; the workflow below describes that later option. The proposed default is **Local only**: the agent uses a model on your computer or an approved endpoint within your site. If it cannot complete an analysis, it explains the limitation rather than silently sending data to a cloud model.

When external assistance is enabled, the same agent can propose a specific question and a minimal, sanitized evidence package. The proposed review shows the destination and what will be sent. Only policy-approved requests leave through an authenticated encrypted connection. The agent receives advice back and checks it locally before proceeding; external analysis does not itself authorize device changes.

This is separate from support for external agents. It does not require opening a workspace in another product. Detailed runtime and transport choices remain under design. A secure connection does not mean that no information leaves: the approved payload is disclosed to its recipients, and their retention behavior must be verified. Local-only operation is the option when no external analysis is allowed.

See the [secure design and frontend contract](../specs/secure-external-assistance.md) or the [Chinese report overview](secure-assistance-overview.md) for the canonical details and delivery scope.

## Where results go

nimbls will manage a shared output folder, organized by purpose:

```text
output/
  syslogs/
  reports/
  errors/
  audits/
```

During creation, the assistant proposes a suitable folder or a new category. You review the destination, filename, and sample content. The output root is outside agents/. The write_output tool supports nested folders, write, append, prepend, and search-and-replace; prior files move to deleted/ when updated, and users may clean that archive. Its exact physical installation path remains to be selected.

Saved reports provide a useful history for people. Comparing past reports or using them as agent memory requires explicitly supported behavior and access; saving files alone does not provide that capability.

## How to describe nimbls to others

Suggested product description:

> nimbls is being designed to let network operators describe an AI agent in everyday language, review its capabilities and expected output, and run it locally to turn NIMBL information into useful, traceable results.

For sales and marketing, position reduced manual review and repeatable reporting as intended benefits to validate in a pilot. There are no measured time savings, released installers, or completed application demonstrations yet. Do not promise unattended device repair, universal agent compatibility, or execution while a local computer is unavailable.

Next: [Create an agent: example requests](../guides/create-an-agent.md) · [Daily syslog scenario](../scenarios/daily-syslog-summary.md) · [Detailed function draft](../specs/fundamental-function-blocks.md)


The result region lets users browse system output/ and pin files to keep their latest content visible. Markdown and HTML are rendered directly. A pinned file is a current file view; execution status still identifies incomplete or failed work.

## GitHub feature tracking

- [syslog-reviewer](https://github.com/bbtechhive/nimbls-public/issues/35)
- [device-snapshot](https://github.com/bbtechhive/nimbls-public/issues/36)
- [incident-investigator](https://github.com/bbtechhive/nimbls-public/issues/37)
- [ask-nimbls site operations](https://github.com/bbtechhive/nimbls-public/issues/38)
