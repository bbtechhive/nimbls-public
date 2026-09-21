# nimbls — Product delivery roadmap

Planning estimate: **2–3 weeks per Milestone; 14–21 weeks total**, sequential delivery. Week 1 begins at the agreed kickoff; calendar dates are not yet set. Estimates include implementation and validation, assume continuous capacity and ready test inputs, and are not release commitments. Milestone 1 includes Features 1–3.

| Milestone | Duration | 2-week schedule | 3-week schedule | Delivery scope |
| --- | --- | --- | --- | --- |
| 1 | 2–3 weeks | Weeks 1–2 | Weeks 1–3 | Agent creation and daily syslog automation |
| 2 | 2–3 weeks | Weeks 3–4 | Weeks 4–6 | Site history retention and incident investigation |
| 3 | 2–3 weeks | Weeks 5–6 | Weeks 7–9 | Local model integration and general tasks |
| 4 | 2–3 weeks | Weeks 7–8 | Weeks 10–12 | Report search, interaction and archiving |
| 5 | 2–3 weeks | Weeks 9–10 | Weeks 13–15 | Agent performance review and improvement |
| 6 | 2–3 weeks | Weeks 11–12 | Weeks 16–18 | Controlled external model assistance |
| 7 | 2–3 weeks | Weeks 13–14 | Weeks 19–21 | Authorized device changes and verification |

## Milestone 1 — Agent creation and daily syslog automation

**Duration:** 2–3 weeks.

- Feature 1: produce a manual syslog report with source evidence.
- Feature 2: refine, save and reuse the agent after restart.
- Feature 3: schedule daily execution and inspect actual outcomes.

**Default agent / entry:** Daily Syslog Summary Agent.

**Demo:** Create, run, refine, save, and schedule a syslog report.

**Acceptance:** Complete Features 1–3 with live NIMBL data, evidence-backed outputs, and truthful failures.

**Feature pages:** [Ask nimbls](../ask-nimbls.html), [Custom Agents](../custom-agents.html), [Scheduling](../automation.html).

## Milestone 2 — Site history retention and incident investigation

**Duration:** 2–3 weeks.

- Define what observations and events are retained.
- Retrieve earlier incidents with source and time references.
- Compare current conditions with previous findings.

**Default agent / entry:** syslog-reviewer + device-snapshot + incident-investigator + ask-nimbls (extended).

**Demo:** Find a similar incident and compare changes and prior handling.

**Acceptance:** Retrieve retained evidence across executions with correct source/time references and explicit uncertainty.

**Feature pages:** [Site History & Knowledge](../site-history.html).

## Milestone 3 — Local model integration and general tasks

**Duration:** 2–3 weeks.

- Configure and verify a supported local model.
- Run the network-reporting workflow locally.
- Validate document comparison without a NIMBL connection.

**Default agent / entry:** Locally validated network agents + Document Comparison Agent.

**Demo:** Run a network report and compare documents without external inference.

**Acceptance:** Validate both workflows on documented hardware/model; observe no external inference requests.

**Feature pages:** [Local AI](../local-ai.html).

## Milestone 4 — Report search, interaction and archiving

**Duration:** 2–3 weeks.

- Find reports by relevant scope and time period.
- Inspect interactive HTML in an isolated preview.
- Archive older reports and verify retrieval.

**Default agent / entry:** Report search and organization through Ask nimbls.

**Demo:** Explore an interactive report and archive old reports while keeping key cases searchable.

**Acceptance:** Correct search results, isolated interactions, and verified archive retrieval.

**Feature pages:** [Results Center](../results-center.html).

## Milestone 5 — Agent performance review and improvement

**Duration:** 2–3 weeks.

- Inspect retained agent inputs, instructions and outputs.
- Propose a targeted instruction or workflow change.
- Compare the revised result against missed and known-good cases.

**Default agent / entry:** Improvement review through Ask nimbls.

**Demo:** Review a missed event, propose a change, and compare revised results.

**Acceptance:** Representative before/after cases show gains or regressions; retain the evidence.

**Feature pages:** [Agent Improvement Review](../agent-improvement.html).

## Milestone 6 — Controlled external model assistance

**Duration:** 2–3 weeks.

- Define reviewed data types, recipients and disclosure rules.
- Apply required approvals, routing and cost controls.
- Validate external analysis locally; demonstrate blocked requests.

**Default agent / entry:** Controlled consultation for existing agents.

**Demo:** Ask an approved model for help using only policy-permitted evidence.

**Acceptance:** Verify allowed/blocked payloads, recipients, cost limits, and local response validation.

**Feature pages:** [Controlled External Assistance](../external-assistance.html).

## Milestone 7 — Authorized device changes and verification

**Duration:** 2–3 weeks.

- Define one supported change and its authorized device scope.
- Capture the starting state and execute authorized operations.
- Verify actual results and report partial failures and recovery needs.

**Default agent / entry:** Device Change Agent.

**Demo:** Execute a supported authorized change and verify actual device state.

**Acceptance:** Scope enforcement, before/after evidence, and honest success/partial-failure outcomes.

**Feature pages:** [Execution Management](../execution-management.html).

## Planning assumptions

- Milestone 1 is 2–3 weeks for Features 1–3 combined, not per milestone.
- Start the next Milestone after acceptance. Shorter stages advance subsequent work.
- Estimates assume continuous capacity, ready models/devices/data, and no additional scope. Delays may extend the range.
- Default agents start in Milestone 1. Basic outputs and execution controls are included there.
- No calendar kickoff date, release commitment, or universal production readiness is implied.

## Taiwan working-day schedule

Use the interactive Roadmap page to choose a kickoff and 10 or 15 working days per Milestone. It excludes official non-working dates from the bundled 2026–2027 DGPA office calendars and provides dated SVG/Markdown downloads with excluded dates. The undated poster shows effort only; holidays extend calendar duration. Company leave and emergency closures are not included. Source: https://data.gov.tw/dataset/14718.

## Milestone 2 agent delivery

See [Milestone 2 agent features](poc2-agent-milestones.md) for the four planned agent features and acceptance criteria.
