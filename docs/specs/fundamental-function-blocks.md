# Fundamental Function Blocks

- Status: Draft for discussion; not an approved SPEC or implementation commitment
- Date: 2026-09-18
- Purpose: Agree on the product's core responsibilities before defining milestones and detailed SPECs.
- Related issues/milestone: None yet; the public issue tracker and milestones were checked before drafting.

## Confirmed direction

nimbls is an application to monitor, control, and manage multiple AI agents. Agents use `bbcli` to retrieve NIMBL information and configure devices managed by NIMBL. Product documentation, issues, SPECs, milestones, and releases belong in nimbls-public.

Additional confirmed requirements:

- Support local LLM inference and a controlled secure channel to external frontier models. Follow a local-by-default direction. Secure external assistance is explicitly excluded from the first milestone and retained for future planning and tech-stack review; detailed routing and disclosure policies below remain proposals.

- Prioritize a compelling, working POC: describe, assemble, try, improve through conversation, save/reuse, and schedule. Broader tools and skill customization are in the POC direction; production security hardening follows review of demonstrated behavior.
- Easy to use and ready out of the box are governing product rules. Include useful starter agents that users can run after guided essential setup, with no need to build an agent first.
- Users must also be able to define their own agents as easily as possible; users are not limited to starter agents. The creation assistant supports customization and new requirements.
- nimbls manages a shared output folder with purpose-specific subfolders such as syslogs/, reports/, errors/, and audits/. During creation, the creation-agent selects a suitable existing folder or proposes a new one and presents a sample output for user review.

- bbcli is our product and may be distributed with nimbls. The build must obtain the correct target artifact from the mnms repository; users should not have to install the CLI separately.
- Agents must support scheduled recurring work, such as executing a task every day at 12:00.
- nimbls directly launches and manages agents for the initial scope, including manual and scheduled execution. External-agent support is an optional future plan to reconsider during milestone review, not an initial requirement.
- Start with a local application on the operator’s computer. Shared-server deployment remains a future option. Preserve flexibility to support it without implementing server or team-management features in the initial scope. Supported operating systems, application framework, and background-execution behavior remain open.

The block decomposition and behavioral defaults below remain proposals except for the confirmed requirements above. These are product responsibilities, not a commitment to separate services, databases, screens, or a particular agent framework. No nimbls application behavior has been implemented. CLI source inspection and upstream integration checks are recorded below; they do not validate a packaged nimbls application.

## Proposed blocks

| ID | Function block | User outcome | Owns | Boundary |
| --- | --- | --- | --- | --- |
| F1 | NIMBL connections | Connect an agent to the intended NIMBL system and device scope. | Connection setup, credential references, connectivity checks, bbcli compatibility, retrieving information and submitting authorized device operations. | NIMBL remains authoritative for managed device information. Exact CLI operations must be verified. |
| F2 | Agent management | Easily create a custom agent, understand its role, and configure what it can do. | Guided creation, conversational refinement and trial runs, starter customization/copying, editable purpose/instructions, agent identity, tools/skills and execution configuration, assigned NIMBL access, enable/disable for new work. | nimbls directly launches and manages agents initially; runtime/provider selection remains open. External-agent support is deferred. An agent's configuration is distinct from a particular execution. |
| F3 | Task execution | Assign a clear objective to an agent and obtain a verifiable outcome. | Objective, target scope, acceptance criteria, responsible agent, execution state, limits, and attempts. | Start with explicit assignment. Manual and scheduled work share the execution path. Automatic delegation and collaborative planning are not assumed. |
| F4 | Monitoring and control | See all agents' activity and intervene when needed. | Overview, execution detail, latest activity, waiting/error states, user input, cancellation requests, retry requests. | Show commands as requested versus acknowledged. Do not imply that cancel reverses an already-applied device change. |
| F5 | Permissions and change approval | Control which devices and actions an agent may access or change. | Read/write scope, enforceable access decisions, proposed changes, approval records, and conflicting-write prevention. | Approval must match the exact targets and proposed operation. Changing either invalidates that approval. Enforcement cannot rely solely on agent instructions. |
| F6 | Results and history | Understand what happened and whether the requested outcome was achieved. | Shared output organization, result files, supporting observations, action history, verification outcome, attribution, timestamps, and safe evidence export. | A successful command or finished agent response is insufficient to prove a device change succeeded. Logs alone are not a user-facing result. |
| F7 | Scheduling | Have an assigned agent perform recurring work, such as daily at 12:00. | Recurrence, timezone, enable/disable, next due time, dispatch, and missed/overlapping occurrence handling. | Dispatch through F3 with the same F5 permissions; scheduling does not bypass approval or guarantee execution while the host is unavailable. |
| F8 | Local models and secure external analysis | Keep routine analysis within the site and obtain stronger external assistance when explicitly allowed. | Local provider readiness, model selection, minimal evidence preparation, sanitization, outbound policy, authenticated encrypted transport, response validation, and audit metadata. | No automatic cloud fallback or unrestricted data export. External analysis does not acquire local tools or authorize device changes. |

## Local models and secure external analysis

Local LLM support remains in the initial product direction. Secure external assistance is explicitly outside milestone 1 and must be considered during tech-stack review only.

The canonical [Secure external assistance design](secure-external-assistance.md) defines architecture, per-data-type review/test gates, proposed async evidence exchange, frontend state and approval behavior, acceptance cases, and unresolved choices. Unknown or unreviewed data types must not be exported. Runtime, relay, transport, and detailed mechanisms remain unselected and unimplemented.

For reports and stakeholder communication, see the [繁體中文摘要](../concepts/secure-assistance-overview.md). External model assistance is distinct from the deferred external-agent workspace feature.

## Agreed agent lifecycle direction

nimbls directly launches and manages agents first. Users configure agents, assign tasks, start manual work or set schedules, and monitor supported execution controls and results through nimbls. The runtime/provider remains to be selected; initial deployment is local on the operator’s computer; this direction does not require building a new agent runtime from scratch.

External-agent support, including preparing a workspace that a user opens in Codex, is an optional future plan. Reconsider it during milestone review if there is a concrete need. It is not required for initial acceptance and does not block the direct-agent workflow.

If external-agent support is added later, define task/result handoff, attribution, available controls, and permission enforcement at that time. Opening a workspace alone does not provide live monitoring, cancellation, or scheduling in nimbls.

This is agreed product scope; no agent runtime or application workflow has been implemented or validated yet.

## Start with a useful agent or create your own

User-facing explanations: [agent concepts](../concepts/agents.md), [creation examples](../guides/create-an-agent.md), and [daily syslog scenario](../scenarios/daily-syslog-summary.md).

Confirmed priority: users can start with a useful prepared agent or define their own with minimal setup. See the [proposed starter lineup and first-use flow](../guides/starter-agents.md). The following interaction is proposed for review; specific controls and defaults are not yet approved.

1. Describe what the agent should do in ordinary language. Optional examples can help the user start, but a custom description is always supported.
2. nimbls suggests an editable name and concise role/instructions. Ask a focused follow-up only when missing information prevents a useful or unambiguous setup. Do not require users to write prompts, configuration files, or CLI commands.
3. Show a short review of the agent’s purpose, selected NIMBL connection/device scope, and allowed actions. Reuse existing connection and application runtime setup where available. Missing setup should have a clear next action, and users can save the agent before completing it. Suggested defaults do not silently grant access; propose read-only access initially.
4. Review the proposed output destination, filename rule, and sample content. Let the user discuss and revise them before confirmation. If the request includes recurring work, propose its task and schedule during creation; otherwise a schedule is optional.
5. After confirmation, prepare the agent and validate readiness without starting device operations. Show any missing prerequisites and offer a first execution; the user can explicitly choose to confirm and try in the same action.

Keep model/runtime overrides, detailed instructions, and execution limits under optional advanced settings. Initial application setup may still require provider sign-in and NIMBL credentials; do not repeat those requirements for each agent or imply that they can be skipped when needed to run work. Do not infer credentials from the user’s description.

Example description: “Help me monitor factory switches and explain problems.” The review can suggest “Switch assistant” and read-only access to a user-selected device scope. This defines a reusable agent role; “Check these switches now” is a separate task. Users can edit the saved agent, and existing execution records retain the configuration actually used.

The first milestone should demonstrate a useful starter agent plus creation of a user-defined agent, each with a representative task and verifiable results. A health report is only an example for validation, not a restriction on the roles users can define. Custom instructions remain bounded by supported tools and granted access.

## POC priority: create, try, and improve

Confirmed direction: first demonstrate a compelling agent that actually works, then refine production security and operational restrictions. Do not make detailed permission administration or repeated approval screens the center of the POC. Use an agreed test environment for demonstrations; results must still be real and attributable. The dedicated secure external-assistance design remains deferred beyond milestone 1, including its eventual per-data-type review/test gates.

The agreed POC capability direction is:

| Area | User capability |
| --- | --- |
| Tools | Use bbcli, file, database, and script capabilities; add custom tools or MCP connections where supported by the selected runtime. |
| Skills | Select existing skills or ask the creation-agent to generate and revise a procedure for the requested work. |
| Instructions | Generate AGENTS.md and supporting setup from the agreed role; revise through conversation without requiring manual file editing. |
| Model | Suggest a suitable available local/site model and allow the user to switch. |
| Output | Propose the shared subfolder, naming rule, format, and sample; incorporate feedback. |
| Trial and refinement | Run a task, inspect its actual result, and request changes to the agent or its output. Repeat the trial with the revised setup. |
| Reuse | Save a satisfactory agent and copy it for another purpose. |
| Schedule | Turn a successful trial into recurring work through a simple request, with timing and timezone made explicit. |

This direction permits a broader capability set; it does not claim every connector or skill already works. Exact tool inventory and integration breadth are selected during stack and milestone review. Generated tools/skills must be checked in the representative trial before describing the setup as ready. A custom tool connection does not introduce the deferred secure external-model workflow.

The conversational loop is **describe → proposal and sample → confirm and try → inspect → revise and retry → save/reuse → schedule**. A user can also save an unfinished agent without running it. A confirmation can explicitly include a trial run; there is no need for a second redundant approval when the selected test scope and action are already clear.

Example demonstration:

1. “Create an agent that analyzes daily syslogs.”
2. Review a useful setup and report sample.
3. “Include a comparison with the previous seven days.”
4. The creation-agent adapts the instructions and necessary tools/skills, checking whether that history is available.
5. Run against the test environment and inspect the real report. Missing history is reported rather than invented.
6. “Good. Save this agent and run it every morning at eight.”
7. Confirm the timezone and enabled schedule in the resulting setup.

Harness execution remains managed by nimbls. Agent configuration, individual tasks, and executions stay distinct so changes and trial results are traceable. This is a product experience direction, not approval of a final implementation stack or production-device operations.

## Creation report and shared outputs

The creation-agent interprets the user’s requirement and presents an editable setup report: agent name and generated ID, purpose/instructions, a model suggested from usable providers with its rationale, required tools and skills, harness settings, on-demand or scheduled work, and output rules. Users can discuss changes before confirming creation. Selection must refer to available capabilities; missing dependencies remain visible rather than being reported as ready.

nimbls creates and manages one shared output root for the initial local deployment. Organize results by purpose rather than requiring a separate output root per agent:

```text
output/
  syslogs/
  reports/
  errors/
  audits/
```

The creation-agent inspects available output categories, reuses a suitable one, or proposes a descriptive new subfolder. Show the folder and whether it is new in the creation report. Create a new folder when the user confirms the setup. The actual local root location is still to be selected.

For the syslog example, propose:

- Output type: result-file; format: Markdown.
- Destination: syslogs/ under the shared output root.
- Filename rule: {date}-syslog-summary.md.
- Date meaning: the analyzed reporting date in the selected timezone, not an unexplained machine timestamp.
- Content: reporting period, source coverage, anomalies, critical events/alerts, important operations, supporting evidence, and suggested follow-up.

Show a rendered output sample and its relative destination before confirmation. Mark it clearly as illustrative with synthetic data, not a real analysis. The user can revise the folder, filename, format, sections, and level of detail. Save the approved output rules and sample with the agent configuration; real executions supply fresh findings rather than copying sample facts. Preview generation does not require retrieving real device data or writing a production result.

Illustrative destination: syslogs/2011-10-11-syslog-summary.md. Example preview:

```markdown
# Syslog summary — 2011-10-11

> SAMPLE — synthetic events; no device logs have been retrieved.

Reporting period: 2011-10-11 00:00–24:00, Asia/Taipei

## Summary
One recurring connection issue and one configuration change need review.

## Anomalies and alerts
- Example switch A: repeated link-down events on port 3.
  Evidence: illustrative events at 09:12 and 09:18.
  Suggested follow-up: inspect the link and connected device.

## Important operations
- Example switch B: configuration changed at 10:05.
  Suggested follow-up: check whether the change was expected.

## Coverage and limitations
Illustration only. Actual reports describe sources retrieved and any gaps.
```

Proposed implementation boundaries, pending detailed design:

- write-output resolves destinations inside the managed output root and enforces each agent’s allowed write scope. A shared root does not automatically grant every agent access to every file.
- Preserve agent/task/execution attribution for each output so results from different agents remain distinguishable.
- Do not silently overwrite another execution’s file. Propose a visible unique suffix on name collision, including retries, with the exact rule shown in setup.
- errors/ and audits/ hold categorized diagnostic/audit outputs; harness-maintained operational records should retain their integrity independently of model-authored report text. Do not require every successful execution to create an error file.

## One coherent workflow

1. Describe and create an agent, then complete its NIMBL connection and allowed scope as needed (F1, F2, F5).
2. Submit a task with an objective, target devices, and acceptance criteria; run it now or configure a recurring schedule (F3, F7).
3. Monitor execution and answer questions or request cancellation (F4).
4. For device changes, inspect the exact proposed operation and approve it when required by the selected policy (F5).
5. Execute through bbcli and retrieve fresh observations to verify the result (F1, F3).
6. Present the outcome with its evidence and retain the history (F6).

An overview can combine several blocks. The user should not need to understand this decomposition to use the product.

## Proposed initial boundaries

These are discussion defaults, not accepted requirements:

- Prefer one NIMBL connection for the first end-to-end slice; retain an explicit connection identity so targets cannot be confused.
- Assign tasks to agents explicitly, with manual or scheduled execution. Demonstrate multiple agents with separately attributable work before adding automatic cooperation.
- Begin with a read-only information task, then add one bounded device-change operation.
- For the first write workflow, require review of the proposed change. Wider policy-based autonomy can follow a separate decision.
- Prevent overlapping writes to the same scoped device; define how execution ownership is released after failures before enabling concurrent writes.
- Treat stale/disconnected status as unknown, not healthy. Recover enough durable state to distinguish completed, still-running, and uncertain operations after interruption.
- A retry must not blindly repeat a potentially applied write. Check actual device state first and use operation-specific recovery.
- Do not promise universal rollback, process suspension/resumption, arbitrary external-agent compatibility, or automatic agent collaboration before their supported semantics are defined.
- Initial deployment is local on the operator’s computer. Define local credential handling, durable storage, and enforceable agent/device access for that scope. Shared-server deployment remains a future option; server identity and team authorization are deferred. Keep task execution, scheduling, and persistence responsibilities separable from the local UI so a future server deployment can reuse them; this does not require separate services now.

## Bundled bbcli delivery

The confirmed user experience is a single application installation that includes the required CLI. The following build approach is proposed, with Electron packaging conditional on that stack being selected:

1. Pin a mnms commit or version for the application release; do not copy an arbitrary developer build or follow a moving branch during release packaging.
2. Use the bbcli/ Go entry from mnms (merged into main through mnms PR #2236; verified merge revision 81bba4d5cc471d70c5926e1c38f0fc0262910f8f). It is distinct from bbctl. Build from the pinned full mnms checkout because the CLI imports shared mnms packages; copying only its source directory is insufficient.
3. Generate required build inputs, including the frontend dist assets embedded by shared mnms code, then build the CLI for the selected OS/CPU target; alternatively retrieve a verified artifact produced from that pinned source. It currently imports native/CGO dependencies through shared mnms packages, so use a compatible target build environment rather than assuming a GOOS/GOARCH change alone is sufficient. Reject missing or mismatched artifacts. Select the first supported platforms before defining the build matrix.
4. Stage the executable and required runtime dependencies in the application resources. For Electron, keep the executable outside app.asar and resolve its absolute installed path; do not depend on a global PATH entry or a sibling mnms checkout on the user's machine.
5. Preserve executable permissions where applicable and include the CLI in platform signing/packaging. Record its version/source revision, target, and checksum in release build metadata, without copying credentials or private source into public artifacts.
6. Test the installed application on each supported target without a globally installed bbcli: invoke a documented harmless help/version operation and exercise a read-only NIMBL task in a test environment.

The source entry and bbcli/Makefile have been inspected. A native macOS arm64 build and version/help smoke check passed during upstream integration; no nimbls installer has been built or tested yet. The existing general service build lists do not include bbcli, so the nimbls build must explicitly build or obtain it. Product ownership clears the distribution concern; target compatibility and installed-package behavior still need verification.

## Scheduled execution

Confirmed capability: an agent can perform recurring work, including daily at 12:00. Proposed initial behavior:

| Concern | Proposed behavior |
| --- | --- |
| Simple setup | Select the agent and task, choose Daily and a time, and show a timezone. No cron syntax is required. |
| Timezone | Default to the system's timezone when creating the schedule, store an explicit IANA timezone such as Asia/Taipei, and show the next execution time. Later system timezone changes do not silently change the schedule. |
| Calendar semantics | Daily 12:00 means noon in the selected timezone, not every 24 elapsed hours. Proposed daylight-saving rule: skip nonexistent local times and dispatch once for repeated local times; verify this before supporting affected schedules. |
| Durable state | Save the recurrence, enabled state, next due time, and occurrence history. Recalculate due work on startup/resume; do not rely solely on an in-memory timer. SQLite is the candidate store, not an accepted implementation decision yet. |
| Traceability | Each due occurrence has its scheduled time and its own execution record under the assigned task, including actual start, outcome, and evidence. Preserve the configuration used for that execution. |
| Duplicate prevention | Use a durable unique occurrence identity and an atomic dispatch claim. Reconcile interrupted dispatch/execution state after a crash; do not promise exactly-once external device effects. |
| Overlap | Default to one active execution per schedule. If the previous execution is still running or awaiting approval, skip and record the new occurrence rather than piling up work. Device-conflict checks still apply across different schedules and agents. |
| Missed time | Proposed simple default: record the missed occurrence and continue with the next future time; offer Run now. Do not automatically replay a backlog of device changes. |
| Enable/disable and edits | Pause prevents future dispatch. Pausing or editing a schedule does not silently cancel an already running execution; use the existing execution controls. |
| Permissions | Recheck current access at dispatch and before effects. A schedule is not permanent approval for future device changes; writes requiring review wait visibly for approval. |
| Visibility | Show enabled/paused status, next scheduled time, last actual execution/outcome, and missed/skipped occurrences. Distinguish waiting for approval from completed work. |

For the proposed simplest Electron deployment, closing the window would leave the application running in the system tray. Scheduled work would require the application to remain running and the computer to be awake. Full application exit, sleep, shutdown, or missing NIMBL/model connectivity can prevent on-time execution. Show that availability condition during schedule setup.

This lifecycle policy is not yet confirmed. If execution must continue after the application fully exits, a separate background service or server is needed. A service on the same sleeping or powered-off computer still cannot provide an always-on guarantee.

## Proposed terminology for review

No canonical glossary entries have been approved yet. The current repositories have no source/API/UI definitions that establish these distinctions; the glossary guide's examples are illustrative only.

| Candidate term | Proposed project meaning | Distinction to confirm |
| --- | --- | --- |
| Agent | An identifiable AI worker configured to perform tasks within assigned capabilities and scope. | A worker identity/configuration, not its process or one execution. |
| Task | A requested objective with target scope and acceptance criteria. | The objective persists independently of retry attempts. |
| Execution | One attempt by an assigned agent to carry out a task. | A retry creates another execution; avoid using Run or Job for the same concept without a semantic reason. |
| NIMBL connection | The configured access relationship to a particular NIMBL system. | Device identifiers and permissions must be interpreted within this connection. |
| Schedule | A persisted recurrence and timezone that dispatches an assigned task to an agent. | Distinct from the task objective and each actual execution; pausing a schedule affects future dispatch. |

Reason for proposing these terms: their identity affects assignment, UI status, history, and future API relationships. Confirm the distinctions before promoting them into the canonical glossary; avoid adding implementation-only concepts.

## Acceptance scenarios to turn into SPECs

| Scenario | Observable acceptance evidence |
| --- | --- |
| Review output before creation | The setup report shows the selected or proposed new subfolder, filename rule, and clearly synthetic sample. User changes are retained in the confirmed configuration; preview generation creates no production result. |
| Organize shared output | A confirmed syslog agent writes its result under syslogs/ in the shared root. A different purpose can reuse a suitable folder or create a confirmed new category. Saved output is traceable to its execution. |
| Use a starter agent | On a clean supported installation, the user selects a prepared agent, completes guided essential connection/provider setup, and obtains a useful verified result without CLI commands, configuration editing, or custom-agent creation. |
| Local-only inference | With external inference blocked, a supported task completes using an approved local model. Instrumentation shows no external model request, including from the creation-agent; missing local capability produces an explicit limitation. |
| Approved external assistance (future; outside milestone 1) | A test request shows its destination and prepared payload; prohibited data is removed or transmission is blocked. Only the approved payload is sent through the verified secure path, and the original agent receives the result. |
| External denial or failure (future; outside milestone 1) | Denied policy, changed payload/destination, invalid server identity, unavailable relay, or timeout produces no unapproved fallback. Scheduled work waits when approval is required. |
| External response and audit (future; outside milestone 1) | A test response containing instructions cannot expand permissions or trigger a device change. Audit records preserve attribution without raw payloads or secrets; supported local checks qualify the returned findings. |
| Refine an agent through trial | A user requests a change after seeing a real test result; the creation-agent revises the setup, reruns the task, and produces an attributable result reflecting the change. The user can save/copy the agent and then schedule its task. |
| Create a custom agent | From a user-written description, review/edit and save a reusable agent without code, CLI commands, or advanced settings. Creation alone performs no device operation. |
| Missing setup and first task | An agent can be saved before connection/provider setup is complete. The UI identifies what is missing; once resolved, a separate task runs using the reviewed scope and returns attributable evidence. |
| Install with bundled CLI | On a clean supported target without a global CLI, the installed app locates the matching packaged executable and completes a harmless CLI smoke check. |
| Daily at 12:00 | With the host awake and app running, a daily schedule produces one occurrence at noon in the selected timezone within a timing tolerance to be specified. The UI shows the next due time and resulting execution. |
| Restart, resume, or clock change | Schedule state survives restart, due work is recalculated, and the same occurrence is not dispatched twice. Missed work follows the visible policy. |
| Overlap or pause | A still-running occurrence does not create an overlapping execution of the same schedule; paused schedules do not dispatch new work. |
| Read NIMBL information | A scoped task returns observations tied to the selected connection, target devices, and retrieval time. No write operation occurs. |
| Observe two agents | The overview attributes each active execution and result to the correct agent/task. One failure does not falsely mark the other execution failed. |
| Disabled or unavailable agent | New work is rejected or visibly queued under an explicit policy; the UI does not claim it is running. |
| Operator-approved change | The requested target and operation match approval; execution is traced and fresh observations confirm the postcondition. |
| Out-of-scope or conflicting write | Execution is prevented or explicitly queued before a write reaches NIMBL; the user sees the reason. |
| Timeout, cancellation, or lost connection during a write | The UI distinguishes a requested stop from a confirmed stop and reports uncertain device state until reconciled. |
| Retry after a partial change | A new attempt is traceable to its task and checks current state before repeating an operation. |
| Inspect a completed task | The user can distinguish achieved, failed, and unverified outcomes and inspect the supporting evidence. |

These scenarios are draft acceptance inputs, not completed tests.

## Starter-agent product direction

The [starter-agent set](../guides/starter-agents.md) now centers on site history, configuration delivery through acceptance, and event follow-up through verified resolution. Device status and inventory are supporting tasks. Preserve these complete outcomes while explicitly selecting a tested initial subset; a daily syslog report alone is not incident follow-up, and a change plan alone is not verified delivery. This alignment does not automatically approve all full workflows for the first milestone.

## Candidate milestone sequence

Secure external assistance is excluded from milestone 1; consider its future needs during stack selection without implementing it.

Define milestones as complete user workflows, not one milestone per function block. This sequence is proposed only; no GitHub milestone or release date has been created.

1. Start, customize, and repeat: the creation/trial/refinement loop above, an installer with bundled bbcli, useful prepared agents, easy creation of a user-defined agent launched and managed by nimbls, one connection, a read-only task, visible execution, and a result backed by retrieved evidence. Run manually and daily at a chosen time; include persistence, basic access enforcement, and missed/overlap handling from the start.
2. Supervise multiple agents: two independently assigned agents, activity/status visibility, isolated failures, and well-defined cancellation/retry behavior.
3. Apply a controlled change: one supported device configuration operation with scope enforcement, review/approval, conflicting-write prevention, and post-change verification.

Local deployment is confirmed; supported platforms and a runnable installation path must be chosen before committing the first milestone. Confirm whether any write capability or agent collaboration is required earlier.

## Decisions needed before a milestone/SPEC baseline

1. Direct-agent execution: Which runtime integration should nimbls use to launch and manage agents? External-agent support is optional for future milestone review and is not a prerequisite.
2. Local installation: Which operating system and CPU target should the first local application support? Shared-server deployment remains an optional future direction; preserve deployment flexibility while implementing locally first.
3. Agent creation and first validation task: Review the proposed description-first creation flow, then choose a representative task and success evidence for a user-defined agent. The validation example must not restrict custom agent definitions.
4. Collaboration: Is independent agent supervision sufficient first, or must agents delegate/share work in the initial milestone?
5. Runtime and integration: Which agent runtime/provider and current bbcli version are available for the first runnable case? The development harness's GPT-6 Astra setting does not choose the product runtime.

6. Packaging: bbcli/ is now on mnms main. Choose which OS/CPU combinations the first installer supports and pin a verified revision before defining a release build.
7. Local inference and future compatibility: Select the first local runtime/model, hardware target, and provisioning path. During tech-stack review, assess the future assistance considerations in the [secure design](secure-external-assistance.md). Relay topology, transport/authentication, export policy, and provider retention are deferred decisions and do not block milestone 1; no live external transmission is authorized by this design.

8. Scheduling availability: Is running in the system tray on an awake computer sufficient initially, or must execution continue after full application exit? Confirm missed-run and overlap defaults before accepting the scheduling SPEC.

## Technical references for proposed packaging and lifecycle

- [Electron ASAR limitations](https://www.electronjs.org/docs/latest/tutorial/asar-archives): packaged executables require deliberate handling outside normal archived source files.
- [Electron powerMonitor](https://www.electronjs.org/docs/latest/api/power-monitor): suspend/resume events support reconciliation; they do not make a sleeping host execute tasks.
