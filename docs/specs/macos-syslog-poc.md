# macOS syslog POC specification

- Status: Accepted POC scope; implementation and acceptance testing have not started.
- Date: 2026-09-18.
- Milestones: [M1–M3](../../MILESTONES.md), sequential and cumulative; no release dates committed.
- Related issues: [Function issues #4–#25](../../MILESTONES.md#function-issues), assigned to M1–M3 with dependencies and acceptance coverage.
- Naming: `nimbls` is a development code name. Ask nimbls and nimblscli are provisional; the product name is undecided.

## User problem and intended users

A network operator needs a repeatable daily account of device events without repeatedly collecting logs and writing summaries by hand. The operator must be able to inspect supporting records, refine the report, save the setup, and schedule future reports.

The POC demonstrates **create → try → modify → save → schedule** on macOS. A useful syslog starter and a description-based creation flow share the same agent execution and application operations. The application opens on Ask nimbls chat with startup guidance cards. Agents, Output, and Configuration have separate tabs; saved-task execution and evidence-backed results remain central to the POC. See the [UI guide](../guides/ui-guide.md) for the confirmed navigation and shared AgentChat design.

## Scope and relationship to the broader design

This SPEC owns the delivery scope and acceptance criteria for the first POC. The [fundamental function design](fundamental-function-blocks.md) owns broader confirmed product behavior. M1–M3 deliver the subset below; later requirements are explicitly listed at the end. This is a delivery sequence, not a cancellation of those requirements.

| Milestone | User-visible outcome | Exit criteria |
| --- | --- | --- |
| M1 — Manual syslog report | Create/select an agent, run it, inspect and pin an evidence-backed Markdown report | AC1–AC5, AC10–AC12 |
| M2 — Refine and reuse | Request a change, rerun, save, restart, and reuse the agent | AC6–AC8, AC10–AC12, plus M1 regression |
| M3 — Daily automation | Run the saved report daily with fresh sessions and truthful lifecycle controls | AC9–AC12, plus M1–M2 regression |

Controls are introduced as soon as their underlying capability exists. Stop, truthful failure status, persistent saved setup, and safe output handling are not postponed until M3. M2 validates the complete modification/restart workflow; M3 adds scheduler lifecycle validation.

## Confirmed technical and integration boundaries

- Electron + TypeScript + React desktop application; Pi (`@earendil-works/pi-coding-agent`) SDK runs in a separate process. No Pi TUI.
- Test on macOS first and record the actual OS/CPU and dependency versions. Preserve Windows/Linux portability; no untested platform support or simultaneous release is promised.
- Use memory for live state, indexes, and timers; JSON files for durable application state. No SQLite. One shared application-operation owner serializes state changes and publishes in-memory settings only after successful persistence.
- UI, nimblscli, and agent tools use the same operations and validation. Every delivered application function has discovery, action, inspection, and outcome verification through nimblscli; no UI-only functionality.
- Bundle bbcli and reuse the upstream NIMBL skill. Resolve the executable from the installed resources independently of the agent working directory or global PATH. All agents use one application-level bbcli connection to one bbrootsvc.
- OpenRouter is the initial POC provider candidate. Select and validate a compatible model during integration. A configured credential does not prove access or model compatibility; desktop credential loading must be tested. Local-model support remains a broader requirement.
- The basic tool set covers file read/write/edit/search/list operations. Bash is a separate capability, not required for the syslog workflow or dedicated CLI adapters. Reuse suitable Pi tools and add only missing application behavior.
- Keep each agent's working folder separate from shared system output/. Formal report writes go through write_output. Do not create a separate agent execution loop, database memory system, or collaboration framework.

## Test setup and inputs

NIMBL setup is deferred until the POC is ready for live testing; it does not block implementation. The user supplies the NIMBL test connection and target scope at that point.

Before a live acceptance run, record:

| Input | Requirement |
| --- | --- |
| Host | macOS version and CPU architecture; actual packaged application/build identifier |
| Runtime | Pi, bbcli, application, and model/provider versions or identifiers |
| NIMBL | Working test connection and a bounded device selection; keep credentials outside public documents |
| Syslog | Explicit query start/end and timezone, including at least one known event for evidence checking |
| Report | Requested language, grouping, destination, and one concrete refinement request |
| Model | Usable provider/model configuration, loaded by the application rather than assumed from a development shell |
| Schedule | Daily local time and saved timezone, with a near-future occurrence for a real dispatch test |

Use fixtures to develop and verify deterministic failure paths. Label fixture-based results as such; they do not replace a live bundled-bbcli retrieval and report test. Use data suitable for the configured provider and agreed test scope. Keep raw sensitive logs, customer/device identifiers, and credentials out of this public repository; publish only sanitized evidence summaries.

## Expected workflow

### M1 — Create and run a manual report

1. Open the macOS application and complete essential provider/NIMBL setup. Missing setup has a specific corrective action. The syslog starter is available without authoring instructions from scratch.
2. Create an agent from a task description or select the starter. Review the device selection, time range, output destination, and illustrative report. A sample is labelled as a sample, not a real completed report.
3. Save the default task and run it without requiring an open chat. Each attempt has an execution identity, effective configuration, source scope, and visible state. One execution per agent may be active; Run opens progress while busy.
4. Retrieve logs through supported bundled-bbcli capabilities discovered using the NIMBL skill and CLI help. Bound the requested scope, handle pagination where applicable, and expose incomplete retrieval instead of presenting it as complete.
5. Produce a Markdown report containing device/time scope, coverage, event summaries, anomalies, and references to corresponding source records. Separate observations from hypotheses. Report an empty result explicitly when the query succeeds with no records; a failed query is not an empty result.
6. Write the report with write_output and show it in the result region. Browse the output hierarchy and pin a file to display its current contents. Show execution outcome independently of file presence.

### M2 — Refine, save, and reuse

1. Ask for a report change, such as grouping by device and highlighting repeated events. If essential information is missing, the agent can ask a question and continue when answered; Stop remains available while waiting.
2. Apply instruction/skill/task changes through the supported editing flow. Changes affect the next execution; active work retains its starting configuration. Revision history is not a prerequisite.
3. Rerun as a new execution, compare the result with the requested refinement, and save the agent setup. A failed refinement attempt remains visible and does not make an earlier output appear to be a new success.
4. Quit and restart normally. Saved agents, model-profile references, output pins, and configuration remain available, and the saved task can run again. This does not promise recovery of interrupted work.
5. Provide the fresh-session run setting and New session for chat. The syslog agent defaults to a fresh execution session; fresh sessions preserve working files, configuration, outputs, and execution history. Continuing a session remains available where configured, without a full session-management UI.
6. Support Add and Delete agent. Delete stops active work, removes registration/schedules, and deletes the entire agent working folder after the agreed deletion flow. Shared output/ remains intact.

### M3 — Schedule the saved report

1. Configure a daily local time; save an explicit timezone and show the next due time. For scheduled reports, use the preceding calendar day in that timezone as the default data window, unless the saved task specifies a different window; display the effective range in each report.
2. Dispatch through the same execution operations as manual Run. Each scheduled run starts a fresh session by default, records its trigger and effective session identity, and uses the saved agent setup. Scheduled runs reuse the saved Bash/session settings without asking each time.
3. If the agent is already active, record the occurrence as skipped without queueing. Do nothing for times missed while the application or computer was unavailable; restart/resume calculates the next future occurrence without catch-up.
4. Support schedule edit, pause, resume, and cancel through the same application operations. These actions do not stop an active execution; cancel preserves the agent and outputs.
5. Closing the window keeps the application and scheduler running. Explicit Quit exits immediately when idle; if work is active, confirm stop-and-quit, retain incomplete outputs, and exit after termination is confirmed. Cancelling Quit keeps work running.
6. Show the daily rule, timezone, next due time, last execution outcome, and active-overlap skips. Scheduling requires the application to run and the computer to remain awake.

## Output and state contracts

- A relative target such as syslog/2022/mon resolves under system output/. Reject paths escaping that root. The output root is outside agents/.
- write_output supports write, append, prepend, and search & replace. Write is required in M1; all modes are verified by M2. Compute the updated content from the prior file when needed, preserve the prior version in deleted/, and publish the new content at the same live path. Archive names must not collide. Serialize competing edits to a target to avoid lost updates.
- Users can explicitly clean deleted/; otherwise files have no automatic expiry. Do not claim an archived version remains available after cleanup. Formal output behavior is distinct from private configuration history.
- Pins refer to paths and show the latest saved content. A missing pinned file displays a missing-file state; it must not silently switch to another output. Refresh after successful writes. A partial/error execution is visible even if an older valid report remains at the pinned path.
- For persistent application JSON, serialize changes against the latest committed state, write a temporary file beside the target, then replace the target. On failure, retain prior committed settings and return an error; do not announce a successful save. This does not promise cross-file transactions or power-loss recovery.
- Detailed JSON schemas, CLI argument spelling, bounded retries, process transport, renderer libraries, and packaging tools are engineering choices. They must satisfy these observable contracts without additional approval for routine choices.

## Failure and control behavior

| Condition | Required behavior |
| --- | --- |
| Missing/invalid provider or NIMBL setup | Explain the missing prerequisite and how to correct it; do not silently switch providers/models or report success |
| CLI/model request fails or times out | Preserve a failed execution record and available evidence; retry only safely repeatable transient operations with a finite visible limit |
| Truncated or partial source data | Mark coverage incomplete and avoid claims about unobserved records |
| No matching logs | Produce an explicit no-records result with the successfully queried scope |
| Report write/archive or JSON save fails | Surface the error, retain available prior data, and avoid successful-save/result claims |
| Stop or Quit during work | Show Stopping until termination is confirmed; label partial results incomplete and do not claim rollback |
| Waiting for an answer | Keep the execution active and stoppable; do not dispatch another execution for the same agent |
| Restart after interrupted work | Do not pretend old work is still live, automatically resume it, or catch up missed schedules; full crash recovery is outside scope |

## Acceptance criteria and evidence

| ID | Observable pass condition | Required evidence |
| --- | --- | --- |
| AC1 | A macOS package runs with its included bbcli and NIMBL skill from arbitrary agent working directories, including paths with spaces | Recorded versions/architecture; packaged resource resolution and help checks, followed by actual retrieval; no reliance on a sibling source checkout or global bbcli |
| AC2 | The starter and a user-created syslog agent can each save a task and run without typing the task again | UI walkthrough plus operation/CLI inspection of saved task and execution |
| AC3 | Retrieved device/time scope matches the request, and report observations can be traced to original records | Live retrieval evidence, query boundaries, checked known event, and report references; any partial coverage identified |
| AC4 | The Markdown report is saved outside agents/, browsable, rendered, and pinnable; updating the same path refreshes its contents | File inspection and UI evidence; previous content retained in deleted/; execution outcome separately visible |
| AC5 | Failed/empty/partial inputs and Stop produce the distinct states described above | Focused failure checks and a representative UI flow; no false-success state or fabricated source evidence |
| AC6 | A concrete requested refinement changes the next report and persists after save; active execution settings do not change mid-run | Before/after report comparison, effective configuration evidence, and separate execution identities |
| AC7 | After normal restart, saved agents/settings/pins remain usable; New session and fresh-run behavior preserve files | Restart walkthrough, restored-state inspection, and distinct fresh-session identities |
| AC8 | All output modes and agent deletion follow the contracts | File-content checks for write/append/prepend/replace, archive collision and conflicting-write checks; deleting an agent preserves shared outputs |
| AC9 | A real daily occurrence runs the saved report in a fresh session; no queued overlap or missed-time catch-up occurs | At least one actual near-future scheduled dispatch and verified report; deterministic clock-based tests for calendar/overlap/missed-time cases plus independent session identities |
| AC10 | Every delivered application function can be discovered, invoked, and inspected through nimblscli | Coverage list mapping UI actions to operations and representative end-to-end CLI results; help alone is insufficient |
| AC11 | Persistent state changes are serialized and errors are visible | Concurrent update and failed-save checks, restart validation, and no lost committed settings under tested conditions |
| AC12 | Lifecycle controls are truthful | Stop from M1; M3 adds window-close/background execution, idle Quit, cancel active Quit, stop-and-quit, and schedule edit/pause/resume/cancel evidence |

Each milestone closes only when its criteria and the applicable earlier criteria pass. Record pass/fail/not-tested, build/version, test scope, and remaining limitations. Screenshots alone cannot establish source correctness or successful external operations. Public summaries must be sanitized; restricted raw evidence may be referenced without publishing it.

## Outside this POC delivery scope

These accepted or future directions retain their status in the fundamental design; they are not required to close M1–M3:

- Interactive HTML output, additional renderers, and richer result presentation; this POC uses Markdown.
- Weekly/fixed-interval schedule delivery, wider starter-agent lineup, and configuration-delivery/event-follow-up workflows.
- General-task Bash packaging across platforms, broader MCP/script integration, and validation of additional providers/local models.
- Automatic configuration revision recording and history/diff/restore UI; agent modification works before these exist.
- Windows/Linux release validation, wider CPU coverage, distribution signing/update automation, and production security hardening.
- Cowork/delegation, shared-server/team features, external-agent integration, improvement agents, secure external assistance, full session management, and crash/checkpoint recovery.

The POC still validates real packaging, basic control boundaries, and truthful failure handling. Deferred production work must not be implied to have passed. Product naming is not a prerequisite.

## Remaining setup and delivery records

The user supplies NIMBL setup when live testing is needed. Concrete device/time scope, provider/model access, and a refinement example are test inputs rather than unresolved product direction. Engineering selects compatible versions and ordinary implementation details and records the actual supported test configuration.

[MILESTONES.md](../../MILESTONES.md) is the document-level milestone index. Three GitHub milestones and 22 function issues are now linked from that index. No release dates, builds, or acceptance results are claimed.
