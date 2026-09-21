# Default agents and delivery milestones

Status: Agreed POC 2 agent direction, updated 2026-09-21. This document defines planned behavior and acceptance; it does not claim these agents are implemented or shipped. `nimbls` and agent labels remain provisional.

## Ready to use after essential setup

Include prepared agent instructions, tools, scope, output rules and illustrative samples. Users should reuse guided NIMBL/provider configuration rather than author technical files. Default and custom agents use the same execution, permissions, output and history behavior.

## Delivery sequence

POC 1 retains the existing M1–M3 daily syslog workflow and Ask nimbls entry point: create → try → refine → save → schedule. POC 2 deepens that workflow with script-assisted syslog review, persistent device snapshots, evidence-based investigation and site-history access through Ask nimbls. It does not recreate Ask nimbls from scratch or move POC 1 acceptance into POC 2.

| POC 2 milestone | Agent | Invocation | Responsibility |
| --- | --- | --- | --- |
| P2-M1 | `syslog-reviewer` | Daily schedule | Script-based classification and statistics, agent review of unknown events and abnormal changes, tested candidate patterns. |
| P2-M2 | `device-snapshot` | Daily schedule | Script-based device snapshots and differences, stored through a shared database interface; agent interpretation. |
| P2-M3 | `incident-investigator` | On request | Combine syslog findings, snapshots and previous cases with source references and uncertainty. |
| P2-M4 | `ask-nimbls` extension | User request | Query site history, inspect latest job outcomes, initiate scoped investigation and guide refinement. |

These are planning identifiers, not assigned GitHub milestone IDs. The POC 2 estimate covers all four together, not 2–3 weeks per agent, and must be rechecked against the expanded scope. Individual dates and implementation issues remain unassigned.

Daily jobs run independently on saved schedules. Ask nimbls is the user entry point, not a required daily dispatcher. Investigation startup uses explicit application operations that preserve task scope, progress and outcomes; general autonomous delegation is not part of this definition.

## P2-M1 — syslog-reviewer

**Outcome:** Daily syslog review.

**Deliver:** Run scripts first to classify known patterns, deduplicate events and count changes by device and time. The agent reviews unmatched logs and unusual changes in known patterns, then retains useful, critical and anomalous findings.

**Accept when:** Replay known important events and frequency spikes. Compare findings, token use and elapsed time against full-log analysis; report misses and cost changes. Test candidate patterns on retained cases before human approval and versioned activation.

## P2-M2 — device-snapshot

**Outcome:** Daily device snapshots.

**Deliver:** Use a script to capture a defined snapshot of every in-scope device and store it through a shared database interface. Compare snapshots; let the agent explain meaningful differences and recommend retention changes.

**Accept when:** Retrieve snapshots across days with consistent device IDs and timestamps. Distinguish collection failure from device removal or no change. Apply explicit retention rules, preserving incident-linked evidence; do not silently delete it.

## P2-M3 — incident-investigator

**Outcome:** Evidence-backed incident investigation.

**Deliver:** On request, combine retained syslog findings, device snapshots and previous cases into an incident timeline. Cite evidence, explain possible causes and identify missing information.

**Accept when:** Investigate a switch with repeated link interruptions. Retrieve matching source/time references, compare device changes and distinguish hypotheses from proven causes. Daily snapshots only bound a change between captures.

## P2-M4 — ask-nimbls

**Outcome:** Site operations entry point.

**Deliver:** Extend the existing POC 1 agent to answer site-history questions, inspect daily-agent outcomes, initiate a scoped investigation and help refine schedules or review candidate patterns. Daily jobs continue independently on their schedules.

**Accept when:** Ask what changed yesterday, why a switch is disconnecting, and whether daily jobs finished. Show current results and failures with sources. An initiated investigation retains its scope, progress and outcome through an explicit execution interface.

## Shared design rules

Scripts own repeatable collection, parsing, comparison and policy-based cleanup. Agents interpret exceptions, evidence and improvements. Snapshot schema and writes belong to a shared storage interface; the database engine remains to be selected and does not change nimbls application-setting storage. Use common device identifiers, timestamps and evidence references. P2-M1 and P2-M2 supply evidence for P2-M3; P2-M4 exposes those capabilities through the existing Ask nimbls agent. No general autonomous agent delegation is implied.

Recurring patterns are not automatically harmless. Keep counts and trends; evaluate candidate patterns before activation. Cost reductions are targets to measure, not promises.

## Later agent directions

Configuration delivery and ongoing event follow-up remain broader future directions, not additional POC 2 milestone agents. Configuration delivery requires supported device operations, explicit authorization, before/after verification, failure handling and an operation-specific recovery plan. A successful command does not prove that services work.

Longer-term event follow-up can retain actions and recurrence until a defined observation period and evidence justify closure. Daily review alone does not establish full incident resolution. Preserve source event references under retention policy; blanket indefinite raw-syslog retention is not implied.

A last-known-good baseline, if supported later, must be explicitly verified and preserved separately. A recent daily snapshot must not silently become that baseline. Event-triggered capture remains a later extension; POC 2 specifies daily snapshots.

## First-use experience

1. Show the useful agents and an illustrative output sample for each.
2. Let the user select an agent and reuse existing NIMBL/provider setup. Request only missing essentials and describe why they are needed.
3. Review the target scope and relevant task options. Use prepared instructions, tools, skills where available, and output rules without requiring advanced settings.
4. Save the selected defaults, check readiness, and offer **Run**. No chat prompt is required. Show a precise next action if setup is incomplete.
5. Present the output browser and pinned files with their latest content in the result region, rendering Markdown and HTML. Keep execution outcomes visible, with optional chat and entry buttons for history, logs, and settings. Offer customization or optional scheduling after the user understands the result.

A user can preview an agent before connecting real data. Such previews must be visibly illustrative. Agent cards should distinguish **Needs setup**, **Ready**, and execution outcomes rather than claiming every shipped agent can run immediately on an unconfigured computer.

## What “ready out of the box” means

The application includes working agent definitions, required product-owned tools such as bundled bbcli, output preparation, and a tested path to the first result. Use an available local/site model by default, with guided readiness checks. External assistance is deferred beyond the first milestone and is not a fallback for initial starter agents. Model/provider selection should have a sensible available default; credentials and provider access may still be required. The provider distribution/authentication approach remains undecided.

Users should not need to install bbcli separately, author a skill, construct a harness, choose tools manually, or edit configuration files to run a starter agent. Connection and credential setup is guided and reused. No demonstration data should be presented as a real result, and no recurring task or device operation should start merely because the app was installed.

Starter agents and custom agents should follow the same execution, access, output, and history behavior. Starter setup follows the Add flow; the initial agent management scope is Add and Delete, without a separate copy action.

## Acceptance for a release

On a clean supported installation, an intended user can select a starter agent, complete only required connection/provider setup, run it without terminal commands or advanced settings, and find a verified useful result. Validate this with a representative user flow and record blockers before describing a starter as ready. No first-result time target has been measured yet.

Related: [Create your own agent](create-an-agent.md) · [Agent concepts](../concepts/agents.md) · [Daily syslog scenario](../scenarios/daily-syslog-summary.md)
