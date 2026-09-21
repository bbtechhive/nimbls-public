# Milestones

Status: Accepted POC 1 (M1–M3) scope and agreed seven-POC feature sequence, updated 2026-09-21. The desktop foundation exists; complete POC acceptance remains pending. No new release dates committed. `nimbls` remains a development code name.

The three milestones below together deliver **create → try → modify → save → schedule**. They are sequential and cumulative. The [macOS syslog POC SPEC](docs/specs/macos-syslog-poc.md) defines behavior, failures, acceptance criteria, and evidence requirements.

| Milestone | Outcome | Acceptance / dependency | Status |
| --- | --- | --- | --- |
| M1 — Manual syslog report | On macOS, create/select an agent, run Pi with the configured OpenRouter model, retrieve syslog through bundled bbcli, and view/pin an evidence-backed Markdown report | AC1–AC5 and AC10–AC12; live NIMBL setup required for final acceptance | Planned |
| M2 — Refine and reuse | Request a report change, rerun, save, restart, and reuse the saved agent; verify output edit modes and deletion boundaries | M1 + AC6–AC8 and AC10–AC12 | Planned |
| M3 — Daily automation | Schedule daily fresh-session reports; verify background execution, overlap skips, no catch-up, schedule controls, Stop, and Quit | M1–M2 + AC9–AC12 | Planned |

Stop and truthful failures are required when manual execution first exists. Persistent saved setup and output safety are not deferred until later milestones; later milestones verify the complete user journeys.

## Test readiness

Implementation planning can proceed before NIMBL is configured. The user will provide the test connection and device/time scope when the POC is ready. Verify model access and credential loading in the actual desktop process; development-environment credential presence is not runtime evidence. Record the macOS/CPU, dependency versions, known syslog events, and requested refinement used in acceptance.

A milestone closes only with its SPEC evidence, including representative UI and operation/CLI verification. Fixture tests support development but do not replace the live syslog acceptance run. Keep sensitive raw evidence and credentials out of this public repository.

## Seven-POC product roadmap

Agreed product sequence, 2026-09-21. POC 1 retains the existing M1–M3 milestones. POC 2–7 numbers describe capability stages, not newly created GitHub milestones. Initial estimate: **2–3 weeks per POC, 14–21 weeks total**, delivered sequentially. These are effort estimates of 10–15 working days per POC (70–105 working days total); Taiwan holidays extend elapsed calendar time. The [interactive roadmap](docs/marketing/ask-nimbls/roadmap.html) calculates dates from a chosen kickoff using the official 2026–2027 DGPA office calendars. Company-specific leave and emergency closures are not included. Calendar targets and detailed implementation plans remain to be agreed. This estimate includes implementation and validation, assumes continuous capacity and ready inputs, and is not a release commitment. A POC demonstrates its tested scenario, not general release readiness.

| POC | New capability | Default agent / entry | Customer demonstration | Acceptance direction |
| --- | --- | --- | --- | --- |
| 1 — Agent creation and daily syslog automation | Ask nimbls + Custom Agents | Daily Syslog Summary Agent | Create, run, refine, save, and schedule a syslog report. | Complete M1–M3 with live NIMBL data, evidence-backed outputs, and truthful failures. |
| 2 — Site history retention and incident investigation | Site History & Knowledge | syslog-reviewer + device-snapshot + incident-investigator + ask-nimbls (extended) | Find a similar incident and compare changes and prior handling. | Retrieve retained evidence across executions with correct source/time references and explicit uncertainty. |
| 3 — Local model integration and general tasks | Local LLM Server | Locally validated network agents + Document Comparison Agent | Run a network report and compare documents without external inference. | Validate both workflows on documented hardware/model; observe no external inference requests. |
| 4 — Report search, interaction and archiving | Advanced Results Center | Report search and organization through Ask nimbls | Explore an interactive report and archive old reports while keeping key cases searchable. | Correct search results, isolated interactions, and verified archive retrieval. |
| 5 — Agent performance review and improvement | Agent Improvement Review | Improvement review through Ask nimbls | Review a missed event, propose a change, and compare revised results. | Representative before/after cases show gains or regressions; retain the evidence. |
| 6 — Controlled external model assistance | nimbls Relay + Controlled External Assistance | Controlled consultation for existing agents | Ask an approved model for help using only policy-permitted evidence. | Verify allowed/blocked payloads, recipients, cost limits, and local response validation. |
| 7 — Authorized device changes and verification | Authorized Device Changes | Device Change Agent | Execute a supported authorized change and verify actual device state. | Scope enforcement, before/after evidence, and honest success/partial-failure outcomes. |

| Stage | Duration | At 2 weeks per stage | At 3 weeks per stage |
| --- | --- | --- | --- |
| POC 1 | 2–3 weeks | Weeks 1–2 | Weeks 1–3 |
| POC 2 | 2–3 weeks | Weeks 3–4 | Weeks 4–6 |
| POC 3 | 2–3 weeks | Weeks 5–6 | Weeks 7–9 |
| POC 4 | 2–3 weeks | Weeks 7–8 | Weeks 10–12 |
| POC 5 | 2–3 weeks | Weeks 9–10 | Weeks 13–15 |
| POC 6 | 2–3 weeks | Weeks 11–12 | Weeks 16–18 |
| POC 7 | 2–3 weeks | Weeks 13–14 | Weeks 19–21 |

POC 1’s estimate covers M1–M3 combined. Start each next stage after acceptance; update the schedule if integration, validation, or input readiness causes delay.

Default agents begin in POC 1. Each stage adds tested starter agents or useful capabilities through Ask nimbls. Basic Output, Stop, rerun, and truthful execution states remain in POC 1. POC 3 is the dedicated local-model validation stage; it does not reverse the local-first direction or alter the specified initial POC provider setup. Report storage alone does not deliver POC 2 site memory. Later security and device-operation acceptance requirements remain applicable.

The [English marketing website](docs/marketing/ask-nimbls/roadmap.html) presents the same sequence. Download the [roadmap SVG](docs/marketing/ask-nimbls/assets/product-roadmap.svg) or [detailed Markdown roadmap](docs/marketing/ask-nimbls/assets/product-roadmap.md). These describe planned capabilities and do not claim completed demonstrations.

## Later delivery

The [SPEC's scope boundary](docs/specs/macos-syslog-poc.md#outside-this-poc-delivery-scope) distinguishes confirmed later features from the POC: interactive HTML, additional schedules/integrations, revisions, wider platform/model validation, and deferred collaboration/server/security-assistance work. The seven-POC sequence above organizes later delivery. No additional GitHub milestone numbers or dates are assigned by this update.

### Results center and execution management roadmap

Added 2026-09-21 following product discussion. These are planned capabilities, not released features. Results center is a customer-facing capability; execution management supports all agents. Ask nimbls is the conversational entry for supported operations, including finding results, inspecting work, and requesting improvements. Operations must also be inspectable and verifiable through the shared application interface.

Existing POC commitments remain in M1–M3; the additions below do not move them into later delivery.

| Capability | Concrete functions and customer example | Delivery scope / existing tracking |
| --- | --- | --- |
| Read and keep useful results | Browse Markdown reports in Output and pin a file to see its latest content: “Show yesterday’s site report.” | M1; #9–#10 |
| Refine and reuse results | Ask an agent to revise a report, use supported edit modes, retain replaced files, and restore agents/pins after restart: “Add an executive summary.” | M2; #14, #16–#17. Prior-file archiving does not imply a version-comparison UI. |
| Inspect and control execution | View progress, stop, rerun, and inspect failures; trace syslog findings to source records. | M1; #8, #11. Completion must not conceal missing evidence or failed work. |
| Supply missing information | Answer an agent’s request for required information and let the waiting work continue. | M2; #13. This is not general checkpoint recovery. |
| Inspect scheduled work | See scheduled outcomes and supporting evidence without an older successful report masking the latest failure. | M3; #20–#24 |

Future additions map to the seven-POC sequence above. Their target dates, detailed specifications, and implementation issues remain to be set; no new delivery-date commitment is made here.

| Future feature | Customer-visible behavior / example | Dependencies and acceptance direction | Timing / status |
| --- | --- | --- | --- |
| Interactive HTML reports | Read reports with chart switching, table filtering, and expandable details. | Working output pipeline; isolated preview. Report content must not gain application, device, or filesystem privileges. See [function specification](docs/specs/fundamental-function-blocks.md). | Confirmed later requirement; target date TBD |
| Report search and organization | “Find last month’s outage reports”; classify results and retrieve the matching files. | Output metadata and explicit search scope; verify that returned reports match the requested period and subject. Detailed indexing and search design remain open. | Added to future roadmap; target date TBD |
| Report archiving and retention controls | “Archive reports older than three months and keep important incidents easy to find.” | Defined archive location, retention rules, and retrieval behavior; distinguish archive from deletion and from automatic prior-file archiving. Verify preserved files remain retrievable. | Added to future roadmap; target date TBD |
| Searchable work history | Ask nimbls what an agent did, which inputs/results it used, and why a particular execution failed. | Retained execution evidence, history query operations, and links between executions and results; expose gaps when records are unavailable. | Existing direction expanded; target date TBD |
| Agent improvement review | Ask nimbls to inspect work history, propose instruction or workflow changes, and compare results on representative cases. | Searchable history and reusable agent settings; record before/after evidence rather than assume that an edit improves accuracy. This does not imply model training. | Deferred improvement capability; target date TBD |
| Authorized device changes with verification | Explain the intended change, operate within the authorized device scope, then report actual results and failures. | Supported NIMBL/bbcli operations, enforceable authorization, and before/after evidence. Define concrete supported changes and validation cases before delivery. | Existing design requirement; outside syslog POC; target date TBD |
| Controlled external-analysis review | Review the destination and prepared evidence before policy-permitted external analysis; validate returned advice locally. | Local model integration, per-data-type disclosure policies/tests, required approvals, and evaluated optional relay/provider routing. See [secure-assistance specification](docs/specs/secure-external-assistance.md). External analysis does not authorize device changes. | Future design; outside M1; target date TBD |

Saving reports alone does not deliver site memory or root-cause analysis. Historical retrieval, source/time references, and evidence-based comparison need explicit implementation and validation. Full report-version comparison/restoration and general autonomous remediation are not committed by this roadmap update.

## Tracking

[GitHub Milestones](https://github.com/bbtechhive/nimbls-public/milestones) track the following work. Created three GitHub milestones and 22 function issues on 2026-09-18. Issue bodies contain dependency links and acceptance criteria; all are open and labelled needs-triage. There is no released application or published acceptance result.

## Function issues

### [M1 — Manual syslog report](https://github.com/bbtechhive/nimbls-public/milestone/1)

| Issue | Dependencies | Type |
| --- | --- | --- |
| [#4 — Launch the macOS app and persist application settings](https://github.com/bbtechhive/nimbls-public/issues/4) | None | AFK |
| [#5 — Configure OpenRouter and run a Pi SDK task from the desktop](https://github.com/bbtechhive/nimbls-public/issues/5) | [#4](https://github.com/bbtechhive/nimbls-public/issues/4) | AFK |
| [#6 — Connect packaged bbcli and the NIMBL skill to one test service](https://github.com/bbtechhive/nimbls-public/issues/6) | [#4](https://github.com/bbtechhive/nimbls-public/issues/4) | AFK |
| [#7 — Create a syslog agent from a starter or task description](https://github.com/bbtechhive/nimbls-public/issues/7) | [#5](https://github.com/bbtechhive/nimbls-public/issues/5), [#6](https://github.com/bbtechhive/nimbls-public/issues/6) | AFK |
| [#8 — Generate a syslog report with traceable source evidence](https://github.com/bbtechhive/nimbls-public/issues/8) | [#7](https://github.com/bbtechhive/nimbls-public/issues/7) | AFK |
| [#9 — Publish reports through write_output with prior-version archiving](https://github.com/bbtechhive/nimbls-public/issues/9) | [#8](https://github.com/bbtechhive/nimbls-public/issues/8) | AFK |
| [#10 — Browse and pin current Markdown reports in the result region](https://github.com/bbtechhive/nimbls-public/issues/10) | [#9](https://github.com/bbtechhive/nimbls-public/issues/9) | AFK |
| [#11 — Stop, rerun and inspect manual executions without false success](https://github.com/bbtechhive/nimbls-public/issues/11) | [#8](https://github.com/bbtechhive/nimbls-public/issues/8), [#10](https://github.com/bbtechhive/nimbls-public/issues/10) | AFK |
| [#12 — Verify M1 using a packaged macOS app and live syslog](https://github.com/bbtechhive/nimbls-public/issues/12) | [#11](https://github.com/bbtechhive/nimbls-public/issues/11), [#6](https://github.com/bbtechhive/nimbls-public/issues/6), [#7](https://github.com/bbtechhive/nimbls-public/issues/7), [#9](https://github.com/bbtechhive/nimbls-public/issues/9), [#10](https://github.com/bbtechhive/nimbls-public/issues/10) | HITL |

### [M2 — Refine and reuse](https://github.com/bbtechhive/nimbls-public/milestone/2)

| Issue | Dependencies | Type |
| --- | --- | --- |
| [#13 — Ask for missing task details and resume the waiting agent](https://github.com/bbtechhive/nimbls-public/issues/13) | [#11](https://github.com/bbtechhive/nimbls-public/issues/11) | AFK |
| [#14 — Refine a report and apply saved configuration on the next run](https://github.com/bbtechhive/nimbls-public/issues/14) | [#13](https://github.com/bbtechhive/nimbls-public/issues/13), [#7](https://github.com/bbtechhive/nimbls-public/issues/7) | AFK |
| [#15 — Control fresh sessions and reset chat without deleting files](https://github.com/bbtechhive/nimbls-public/issues/15) | [#14](https://github.com/bbtechhive/nimbls-public/issues/14) | AFK |
| [#16 — Edit report files with append, prepend, replace and archive cleanup](https://github.com/bbtechhive/nimbls-public/issues/16) | [#9](https://github.com/bbtechhive/nimbls-public/issues/9), [#10](https://github.com/bbtechhive/nimbls-public/issues/10) | AFK |
| [#17 — Restore refined agents and pins after restart and handle save failures](https://github.com/bbtechhive/nimbls-public/issues/17) | [#15](https://github.com/bbtechhive/nimbls-public/issues/15), [#10](https://github.com/bbtechhive/nimbls-public/issues/10) | AFK |
| [#18 — Delete an agent and its working folder while preserving shared reports](https://github.com/bbtechhive/nimbls-public/issues/18) | [#11](https://github.com/bbtechhive/nimbls-public/issues/11), [#17](https://github.com/bbtechhive/nimbls-public/issues/17), [#16](https://github.com/bbtechhive/nimbls-public/issues/16) | AFK |
| [#19 — Verify report refinement, persistence and agent cleanup end to end](https://github.com/bbtechhive/nimbls-public/issues/19) | [#12](https://github.com/bbtechhive/nimbls-public/issues/12), [#14](https://github.com/bbtechhive/nimbls-public/issues/14), [#15](https://github.com/bbtechhive/nimbls-public/issues/15), [#16](https://github.com/bbtechhive/nimbls-public/issues/16), [#17](https://github.com/bbtechhive/nimbls-public/issues/17), [#18](https://github.com/bbtechhive/nimbls-public/issues/18) | AFK |

### [M3 — Daily automation](https://github.com/bbtechhive/nimbls-public/milestone/3)

| Issue | Dependencies | Type |
| --- | --- | --- |
| [#20 — Save a daily syslog schedule with explicit timezone and next due time](https://github.com/bbtechhive/nimbls-public/issues/20) | [#17](https://github.com/bbtechhive/nimbls-public/issues/17), [#7](https://github.com/bbtechhive/nimbls-public/issues/7) | AFK |
| [#21 — Dispatch daily reports with fresh sessions and skip overlaps or missed times](https://github.com/bbtechhive/nimbls-public/issues/21) | [#20](https://github.com/bbtechhive/nimbls-public/issues/20), [#15](https://github.com/bbtechhive/nimbls-public/issues/15), [#11](https://github.com/bbtechhive/nimbls-public/issues/11) | AFK |
| [#22 — Edit, pause, resume and cancel schedules without stopping active work](https://github.com/bbtechhive/nimbls-public/issues/22) | [#21](https://github.com/bbtechhive/nimbls-public/issues/21), [#18](https://github.com/bbtechhive/nimbls-public/issues/18) | AFK |
| [#23 — Keep daily work alive after window close and quit with truthful stopping](https://github.com/bbtechhive/nimbls-public/issues/23) | [#21](https://github.com/bbtechhive/nimbls-public/issues/21), [#11](https://github.com/bbtechhive/nimbls-public/issues/11) | AFK |
| [#24 — Inspect scheduled outcomes and source evidence without masking failures](https://github.com/bbtechhive/nimbls-public/issues/24) | [#21](https://github.com/bbtechhive/nimbls-public/issues/21), [#22](https://github.com/bbtechhive/nimbls-public/issues/22), [#10](https://github.com/bbtechhive/nimbls-public/issues/10) | AFK |
| [#25 — Verify daily syslog automation and close the macOS POC](https://github.com/bbtechhive/nimbls-public/issues/25) | [#19](https://github.com/bbtechhive/nimbls-public/issues/19), [#21](https://github.com/bbtechhive/nimbls-public/issues/21), [#22](https://github.com/bbtechhive/nimbls-public/issues/22), [#23](https://github.com/bbtechhive/nimbls-public/issues/23), [#24](https://github.com/bbtechhive/nimbls-public/issues/24) | HITL |

AFK means routine implementation can proceed under the agreed design; normal review/publication rules still apply. HITL marks live acceptance requiring user-provided test scope/setup. Missing test access can block execution of integration checks without changing an issue's implementation scope.

## POC 2 agent milestones

POC 2 adds four agent milestones to build and use site history. These are planned website milestones; GitHub tracking IDs and individual dates are not yet assigned. The existing 2–3-week POC estimate covers all four together and must be rechecked against this expanded scope.

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
