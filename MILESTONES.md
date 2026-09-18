# Milestones

Status: Accepted macOS syslog POC scope, 2026-09-18. Planned, not implemented or tested; no release dates committed. `nimbls` remains a development code name.

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

## Later delivery

The [SPEC's scope boundary](docs/specs/macos-syslog-poc.md#outside-this-poc-delivery-scope) distinguishes confirmed later features from the POC: interactive HTML, additional schedules/integrations, revisions, wider platform/model validation, and deferred collaboration/server/security-assistance work. No dates or additional milestone numbers are assigned yet.

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
