# Fundamental Function Blocks

- Status: Draft for discussion; not an approved SPEC or implementation commitment
- Date: 2026-09-18
- Purpose: Agree on the product's core responsibilities before defining milestones and detailed SPECs.
- Related issues/milestone: None yet; the public issue tracker and milestones were checked before drafting.

Naming: **nimbls is the development code name; the product name has not been decided.** Ask nimbls and nimblscli are provisional names in this draft.

## Confirmed direction

nimbls is an application to monitor, control, and manage multiple AI agents. General agents can operate without NIMBL. NIMBL is an optional integration; connected agents use bundled `bbcli` to retrieve its information and configure its managed devices. Product documentation, issues, SPECs, milestones, and releases belong in nimbls-public.

Additional confirmed requirements:

- Task results are the primary experience; chat is optional. Each ready agent has a saved default task that Run executes directly. UI presents status, progress, outcomes, and actionable failures; detailed history, logs, and configuration are available through entry buttons.

- Support local LLM inference and a controlled secure channel to external frontier models. Follow a local-by-default direction. Secure external assistance is explicitly excluded from the first milestone and retained for future planning and tech-stack review; detailed routing and disclosure policies below remain proposals.

- Prioritize a compelling, working POC: describe, assemble, try, improve through conversation, save/reuse, and schedule. Broader tools and skill customization are in the POC direction; production security hardening follows review of demonstrated behavior.
- Easy to use and ready out of the box are governing product rules. Include useful starter agents that users can run after guided essential setup, with no need to build an agent first.
- Users must also be able to define their own agents as easily as possible; users are not limited to starter agents. The creation assistant supports customization and new requirements.
- nimbls manages a shared output folder with purpose-specific subfolders such as syslogs/, reports/, errors/, and audits/. During creation, the creation-agent selects a suitable existing folder or proposes a new one and presents a sample output for user review.

- bbcli is our product and may be distributed with nimbls. The build must obtain the correct target artifact from the mnms repository; users should not have to install the CLI separately.
- Agents must support scheduled recurring work, such as executing a task every day at 12:00.
- nimbls directly launches and manages agents for the initial scope, including manual and scheduled execution. External-agent support is an optional future plan to reconsider during milestone review, not an initial requirement.
- Start with a local application on the operator’s computer. Shared-server deployment remains a future option. Preserve flexibility to support it without implementing server or team-management features in the initial scope. Closing the window keeps nimbls running in the background; explicitly choosing Quit nimbls stops the service. Supported operating systems and application framework remain open.

The block decomposition and behavioral defaults below remain proposals except for the confirmed requirements above. These are product responsibilities, not a commitment to separate services, databases, screens, or a particular agent framework. No nimbls application behavior has been implemented. CLI source inspection and upstream integration checks are recorded below; they do not validate a packaged nimbls application.

## First-use model discovery

Confirmed direction: discover model connection candidates from known provider environment variables, explicitly supported configuration sources, and local Ollama. Avoid arbitrary filesystem searches for credentials. Follow Pi's credential/provider-resolution pattern and evaluate reuse during stack selection; Pi is not yet the selected runtime.

- Present discovered providers, safe source metadata, and local models without placing keys in conversation, execution history, or logs.
- Distinguish discovery, successful connection validation, and suitability for an agent's task. Finding a key or model does not establish readiness.
- Add local Ollama model discovery using its model-list API. Pi's documented custom-model setup alone does not provide this onboarding experience.
- Do not automatically execute command-based credential expressions during discovery. Preserve manual setup when no usable configuration is found.
- Let users start with one model profile. NIMBL connection is optional; only agents whose tasks depend on NIMBL require it. General tasks remain available.

References inspected: [Pi provider configuration](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md), [Pi custom models](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md), and [Ollama model listing](https://docs.ollama.com/api/tags). Exact configuration adapters and validation behavior await implementation; no environment discovery has been implemented or tested.

## Proposed blocks

| ID | Function block | User outcome | Owns | Boundary |
| --- | --- | --- | --- | --- |
| F1 | NIMBL connections | Connect an agent to the intended NIMBL system and device scope. | Connection setup, credential references, connectivity checks, bbcli compatibility, retrieving information and submitting authorized device operations. | NIMBL remains authoritative for managed device information. Exact CLI operations must be verified. |
| F2 | Agent management | Easily create a custom agent, understand its role, and configure what it can do. | Guided creation, conversational refinement and trial runs, starter customization, editable purpose/instructions, agent identity, tools/skills and execution configuration, assigned NIMBL access, and agent deletion. | nimbls directly launches and manages agents initially; runtime/provider selection remains open. External-agent support is deferred. An agent's configuration is distinct from a particular execution. |
| F3 | Task execution | Assign a clear objective to an agent and obtain a verifiable outcome. | Saved default task, direct Run action, objective, target scope, acceptance criteria, responsible agent, execution state, limits, and attempts. | Run executes the selected agent’s saved default task without requiring a chat prompt. Manual and scheduled work share the execution path. Automatic delegation and collaborative planning are not assumed. |
| F4 | Monitoring and control | See all agents' activity and intervene when needed. | Compact visible status/progress, actionable failure summaries, optional detail/history/log views, user input, cancellation requests, retry requests. | Show commands as requested versus acknowledged. Do not imply that cancel reverses an already-applied device change. |
| F5 | Permissions and change approval | Control which devices and actions an agent may access or change. | Read/write scope, enforceable access decisions, proposed changes, approval records, and conflicting-write prevention. | Approval must match the exact targets and proposed operation. Changing either invalidates that approval. Enforcement cannot rely solely on agent instructions. |
| F6 | Results and history | Understand what happened and whether the requested outcome was achieved. | Primary result view and file preview, shared output organization, result files, supporting observations, action history, verification outcome, attribution, timestamps, and safe evidence export. | A successful command or finished agent response is insufficient to prove a device change succeeded. Logs alone are not a user-facing result. |
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

## Simple agent management

Confirmed initial scope: Add and Delete are the agent lifecycle actions. Do not add agent enable/disable, re-enable, or duplicate/copy actions. Existing creation, configuration refinement, saving, and repeated execution remain part of the agreed workflow. Schedule controls are separate from agent lifecycle controls.

Deletion details for active executions, associated schedules, working data, and retained history remain to be specified; the earlier broader lifecycle proposal was not accepted. This scope decision does not authorize deleting existing files or records.

## Result-first agent workspace

Confirmed direction: task results are the main experience, and chat is optional. The conversational creation/refinement flow remains available, but ordinary execution must work without opening chat or typing a request.

Each ready agent has a saved default task: objective, target scope, reporting-period rule, and output expectations. Agent creation or starter setup prepares this task. Run starts a new execution using the saved task; it does not ask the user to repeat the objective. A default task is still distinct from the agent identity and from each execution.

Surface known missing prerequisites before Run, with a direct setup action. Do not substitute a long conversational refusal for a clear readiness indicator. Runtime failures that cannot be known in advance remain visible after starting.

Proposed workspace layout:

| Visibility | Content |
| --- | --- |
| Always visible | Agent name, readiness/execution state, Run or Stop as applicable, latest task outcome and main result |
| Appears when relevant | Compact current activity, request for missing input, partial-data notice, failure reason and next action |
| Available through entry buttons | Optional chat, history, full error/action logs, model/tools/skills settings, schedule details |

Successful work shows a readable result and output links. A failed execution shows a concise reason and actions such as Retry, Check connection, and View error log. Partial coverage is visible alongside the report. An earlier successful report can remain accessible but must retain its original date and must not look like the failed execution’s result.

Chat supports explanation, one-off requests, and agent/default-task refinement when users choose to open it. Actual operations and results drive the UI; a conversational statement alone is not evidence that settings changed or work completed. Exact conversation-to-task routing remains to be decided. While an execution is active, Run becomes View progress under the confirmed per-agent concurrency rule.

### Minimal conversation session control

Confirmed minimum: provide a **New session** action wherever the optional chat or creation/refinement assistant is available. This starts a fresh conversation context so users can leave earlier discussion behind without recreating the agent.

A new session retains the saved agent configuration, default task, connection settings, schedules, execution history, and output files. It does not cancel or restart an active execution and does not change the primary result view. Saved configuration provides the new conversation’s starting context; earlier messages and unconfirmed proposals are not carried into its model context automatically.

Proposed initial UX: one current conversation per agent/assistant, with New session available from its chat controls. If an unconfirmed proposal would be discarded, explain that before resetting. Historical-session browsing, switching, branching, merging, and automatic long-term conversation memory remain deferred. Conversation archival/retention storage details are undecided; New session is a context reset, not a promise to erase stored records.

When a conversation is actively generating or applying a change, disable New session until that operation finishes or is explicitly stopped. This avoids a late response appearing in the new conversation or an unconfirmed proposal being mistaken for saved configuration. Task executions remain separately tracked and may continue.

## Simple access to working data

Confirmed direction: prioritize ease of use. Automatically create and manage the agent's working folder for harness files, notes, intermediate files, and execution history. Users select only the input folders needed for their task; formal results go to the shared output root and its purpose-specific categories.

The creation assistant guides source selection from the user's task description. Ask nimbls can help add or change sources. Keep internal directory structure out of the normal setup flow and expose locations through optional entries when useful.

Preserve source files by default and write deliverables to output. When editing, renaming, or organizing source files is the task itself, make that behavior explicit in the agent setup. New session resets conversation context without clearing working files. Exact paths and retention duration remain open; the output preservation defaults below are confirmed.

## Harness-managed working data

Confirmed direction: use the harness and its files for agents to save/read their own working data; do not introduce a database-backed agent memory system. Keep working notes, intermediate artifacts, and reference files in the agent’s harness workspace. Formal deliverables still use the shared output root. New session resets conversation context without clearing these files.

The harness should reliably preserve execution/tool records and file operations; do not depend on a model remembering to update every operational state file. A reliable write does not guarantee that model-authored content is correct. Domain-specific baselines, cross-day issue matching, observation periods, and closure rules belong to the relevant default-agent design and will be discussed during its implementation. This decision does not select storage for unrelated application metadata or prohibit database tools when a task needs them.

## User-configurable model profiles

Confirmed direction: provide **High**, **Medium**, and **Low** profiles. Users bind each profile to a configured provider and model in global model-profile settings, reusable across agents. The creation-agent recommends a profile based on the task, and the user can change the assignment. Detailed model/provider settings remain available without dominating the ordinary agent workflow.

| Profile | Intended recommendation category; actual capability must be tested |
| --- | --- |
| High | Complex requirements, multi-step analysis, cross-record reasoning, agent creation/refinement |
| Medium | Routine analysis, tool use, and reports; a candidate default for general work |
| Low | Simple classification, formatting, summaries, and bounded procedures |

Profile names are user-configured roles, not certifications of model capability or model-size thresholds. Validate required capabilities such as tool calling and context capacity separately. Recommend only available compatible bindings; High does not imply cloud access or bypass local-only policy.

Resolve and record the actual provider, model/version where available, and effective settings at execution start. Keep that binding fixed for the execution; editing a profile affects subsequent executions, not work already running. Do not silently fall back to another profile/model if a binding is missing or unavailable. The POC does not need dynamic mid-execution model switching.

Users may begin with one configured default profile; all three need not be populated before first use. An agent assigned to an unconfigured or incompatible profile shows a specific setup requirement. Model/runtime/quantization/context combinations should be tested with representative agent tasks before they are described as recommended; untested bindings can be identified as experimental. Exact model choices remain deferred to stack selection and default-agent trials.

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
| Reuse | Save a satisfactory agent and run it again for subsequent work. |
| Schedule | Turn a successful trial into recurring work through a simple request, with timing and timezone made explicit. |

This direction permits a broader capability set; it does not claim every connector or skill already works. Exact tool inventory and integration breadth are selected during stack and milestone review. Generated tools/skills must be checked in the representative trial before describing the setup as ready. A custom tool connection does not introduce the deferred secure external-model workflow.

The optional conversational creation/refinement loop is **describe → proposal and sample → confirm and try → inspect → revise and retry → save/reuse → schedule**. A user can also save an unfinished agent without running it. A confirmation can explicitly include a trial run; there is no need for a second redundant approval when the selected test scope and action are already clear.

Example demonstration:

1. “Create an agent that analyzes daily syslogs.”
2. Review a useful setup and report sample.
3. “Include a comparison with the previous seven days.”
4. The creation-agent adapts the instructions and necessary tools/skills, checking whether that history is available.
5. Run against the test environment and inspect the real report. Missing history is reported rather than invented.
6. “Good. Save this agent and run it every morning at eight.”
7. Confirm the timezone and enabled schedule in the resulting setup.

Harness execution remains managed by nimbls. Agent configuration, individual tasks, and executions stay distinct so changes and trial results are traceable. This is a product experience direction, not approval of a final implementation stack or production-device operations.

## Output preservation and latest result

Confirmed default: preserve the outputs of each execution separately, including reruns; do not overwrite earlier execution outputs. Show the latest successful result first, with earlier results accessible through history. Keep its execution and date visible, and continue showing any newer failure or active execution so the older success cannot be mistaken for its result.

Label outputs from failed or stopped executions as incomplete. They remain accessible from that execution and do not replace the latest successful result. Output naming or storage must distinguish executions even when their reporting periods match.

For tasks whose purpose is to maintain one evolving document, the agent's skills define its update and preservation behavior as part of the task setup. This exception does not make overwriting the default for ordinary reports. Exact storage layout, retention duration, and cleanup policy remain undecided. These are design requirements, not implemented behavior.

## Creation report and shared outputs

The creation-agent interprets the user’s requirement and presents an editable setup report: agent name and generated ID, purpose/instructions, a recommended High/Medium/Low profile with its provider/model binding and rationale, required tools and skills, harness settings, on-demand or scheduled work, and output rules. Users can discuss changes before confirming creation. Selection must refer to available capabilities; missing dependencies remain visible rather than being reported as ready.

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
- Filename rule: {date}-syslog-summary-{execution-id}.md; the execution identifier distinguishes reruns for the same reporting date.
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

1. Select a starter agent or create one, completing essential setup and its saved default task (F1, F2, F5).
2. Press Run to execute the saved task directly, or configure a recurring schedule. Optional chat can supply a different task or refine the setup (F3, F7).
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

## Execution evidence for future improvement

Confirmed direction: a future improvement agent will inspect other agents' progress, inputs, and outputs and propose improvements. Execution history must support assessment of correctness and efficiency while presenting a substantially simplified view to users. The improvement agent itself is deferred; this does not authorize automatic agent changes or build an optimization system in the first milestone.

Proposed evidence contract, stored as structured harness-managed files and exposed through nimblscli:

| Evidence | Purpose |
| --- | --- |
| Execution identity, task, trigger, parent/retry links, and acceptance criteria | Establish what was requested and connect related attempts. |
| Instruction/tool/skill versions and resolved model/provider/settings | Identify the configuration actually used, even after later edits. |
| Inputs and retrieved evidence, with source, collection time, and preserved snapshots or versioned references | Assess what information was available and whether conclusions are supported. A mutable path or content hash alone cannot reconstruct missing evidence. |
| Ordered execution events and tool calls with arguments, outcomes, errors, and timing | Distinguish observed actions from agent summaries; reveal retries, repeated calls, and bottlenecks. Record observable execution, not hidden model reasoning. |
| Original outputs and their evidence links, partial/completed status, and validation results | Check content against acceptance criteria rather than equating successful execution with correctness. |
| Elapsed time, tool/model latency, retry counts, and provider-reported usage where available | Assess efficiency alongside output quality. Mark missing measurements unknown; distinguish estimated cost from measured usage. |
| User feedback and later review findings | Add corrections without overwriting the original execution evidence. |

The harness records operational facts independently of whether the model writes a work summary. Keep large evidence in referenced files rather than copying it into every event. Credential material is excluded; omitted, truncated, expired, or unavailable evidence must be explicit so reviewers can report insufficient evidence instead of inventing a verdict. Exact schema, storage layout, retention, and capture limits remain implementation decisions.

The default UI shows time, outcome, a short result/error summary, and access to outputs or Ask nimbls. Details are progressively disclosed. The future improvement agent uses the structured evidence to produce evidence-linked findings, suggested instruction/tool/model changes, and a proposed validation case. Suggestions do not by themselves prove improvement; assess correctness against task criteria and compare efficiency on comparable workloads.

## Ask nimbls and application operations

Confirmed direction: provide a built-in general-purpose agent through **Ask nimbls (問問 nimbls)**. Users can ask it to find and explain outputs, inspect/configure nimbls, and troubleshoot failures. Error recovery should lead to Ask nimbls rather than simply directing users to modify settings. This keeps task results primary while making conversation available when useful.

Provide **nimblscli** as the supported command-line interface for all application operations. Its scope is nimbls agents, executions, outputs, configuration, schedules, and diagnostics. **bbcli** remains the separate interface to NIMBL and its managed devices. These are planned capabilities, not shipped commands.

Confirmed direction: equip Ask nimbls with the skills needed to judge how to fulfill a request. Skills guide diagnosis, configuration changes, execution control, and result verification; nimblscli provides the actual application operations. Let the agent select and sequence those operations from the user’s intent and observed state rather than prescribing a fixed response for every phrase or failure. Within the authorized task, it should carry out necessary steps and verify the outcome without repeated confirmations. Ask when necessary information is unavailable or an action exceeds the user’s authorization. Skills do not expand application permissions or override established constraints such as no silent model fallback.

Confirmed coverage: provide skills that use nimblscli to perform every supported nimbls application operation and inspect every application capability and its relevant state. Coverage includes agents and their instructions/tools/skills, tasks, executions and progress, inputs/outputs and history, model/connection settings, schedules, and diagnostics. The assistant must be able to discover available operations, inspect current state, make a requested change, and read back or otherwise verify its actual outcome. No application function should require a UI-only operation or leave its result unavailable to the assistant. This is an application-wide requirement; diagnosis and recovery are examples, not the limit of skill coverage.

Exact skill packaging and procedures await implementation and representative trials. Acceptance must check operation and inspection coverage for each delivered application feature, including the evidence needed to verify changes; a successful command response alone is insufficient. This is an accepted product direction, not an implemented skill set.

Confirmed interface requirement: nimblscli must offer progressive discovery from capability groups to compact operation guides and linked complete contracts. Use stable task-oriented operations, explicit parameter schemas, bounded and paginated retrieval, structured errors with recovery actions, retry-safe mutation contracts, and inspectable progress and outcomes. Skills use these interfaces to select, carry out, and verify work. Detailed command syntax and transport remain implementation choices; this requirement does not add UI controls or expand the initial agent lifecycle beyond Add and Delete.

Proposed implementation based on the capability-discovery pattern of aaclient:

- UI and CLI share application operations and validation rather than maintaining separate business logic. This does not require the UI to invoke shell commands.
- Expose discoverable operation groups, operation help, explicit input contracts, and structured results/errors so the assistant can discover supported actions rather than invent commands.
- Pass the relevant agent/execution/output references and safe error context when opening Ask nimbls from a result or failure. The assistant retrieves further evidence through nimblscli.
- Report what was queried or changed and verify the resulting state. Asking why something failed is distinct from authorizing a change or rerun.
- Confirmed fallback: keep a manual settings entry available, including basic connection/model settings when the assistant itself cannot run. Ask nimbls remains the primary assistance entry.
- Evaluate local transport and packaging during stack selection, preserving future shared-server flexibility. No HTTP, framework, authentication stack, or exact command syntax is selected by this decision.

Example: selecting Ask nimbls on a failed syslog summary opens assistance for that execution. The assistant can inspect its error and configured model profile, explain the cause, and use the supported application operations to carry out a requested correction. It distinguishes a configuration change from a new execution.

## Failure, retry, and stop behavior

Confirmed product direction; not implemented yet:

- The harness handles basic execution controls. Retry transient failures only when the operation can safely be repeated, with a finite retry limit and visible retry progress. Exact limits await implementation.
- Missing configuration or invalid credentials stop work with an actionable explanation and an Ask nimbls (問問 nimbls) entry point that carries the relevant agent and execution context to the built-in assistant.
- A failed execution shows what completed and where it failed, with full logs available through an entry point.
- Rerun creates a new execution of the same task, preserving previous results and history. It is not checkpoint resume. Agent-specific task design must handle already-completed effects; do not blindly retry or replay device mutations.
- Stop displays Stopping until termination is confirmed. Stopping does not imply rollback of completed effects.
- Preserve partial results and mark them incomplete rather than presenting them as a successful report.
- POC includes Stop and Rerun. Pause and resume from checkpoints are deferred.

## Scheduled execution

Confirmed capability: an agent can perform recurring work, including daily at 12:00. Proposed initial behavior:

| Concern | Proposed behavior |
| --- | --- |
| Simple setup | Select the agent and task, choose Daily and a time, and show a timezone. No cron syntax is required. |
| Timezone | Default to the system's timezone when creating the schedule, store an explicit IANA timezone such as Asia/Taipei, and show the next execution time. Later system timezone changes do not silently change the schedule. |
| Calendar semantics | Daily 12:00 means noon in the selected timezone, not every 24 elapsed hours. Proposed daylight-saving rule: skip nonexistent local times and dispatch once for repeated local times; verify this before supporting affected schedules. |
| Durable state | Save the recurrence, enabled state, next due time, and occurrence history. Recalculate due work on startup/resume; do not rely solely on an in-memory timer. SQLite is the candidate store, not an accepted implementation decision yet. |
| Traceability | Each dispatched occurrence has its scheduled time and its own execution record under the assigned task, including actual start, outcome, and evidence. A missed occurrence does not create an execution. Preserve the configuration used for that execution. |
| Duplicate prevention | Use a durable unique occurrence identity and an atomic dispatch claim. Reconcile interrupted dispatch/execution state after a crash; do not promise exactly-once external device effects. |
| Overlap (confirmed) | One active execution per agent across manual and scheduled work. While active, Run becomes View progress. A schedule triggering during active work is recorded as skipped without queuing. Different agents may run concurrently subject to available resources; shared-resource conflicts still need implementation handling. |
| Missed time (confirmed) | Do nothing for missed occurrences: no catch-up execution, backlog, or special user prompt. On startup/resume, calculate the next future scheduled time and continue normally. The ordinary manual Run action remains available. |
| Enable/disable and edits | Pause prevents future dispatch. Pausing or editing a schedule does not silently cancel an already running execution; use the existing execution controls. |
| Permissions | Recheck current access at dispatch and before effects. A schedule is not permanent approval for future device changes; writes requiring review wait visibly for approval. |
| Visibility | Show enabled/paused status, next scheduled time, last actual execution/outcome, and overlap skips in history. Missed times require no special prompt or recovery UI; any passive diagnostic recording remains an implementation detail. Distinguish waiting for approval from completed work. |

Confirmed lifecycle: closing the window keeps nimbls running in the background, including active work and scheduling. Explicitly choosing Quit nimbls stops the service. This is an agreed product requirement, not implemented behavior; no desktop framework or separate service architecture has been selected.

Confirmed explicit Quit behavior: exit directly when no execution is active. If work is active, ask “Tasks are running. Stop them and quit?” Cancelling leaves the application and its work running. On confirmation, stop active executions, preserve partial outputs with an incomplete label, and exit after termination is confirmed. Keep the stopping state truthful under the execution-control rules; completed external operations are not automatically rolled back. Termination timeout and forced-exit mechanics remain implementation details, not a promise that every external operation can be cancelled.

Scheduled work requires the application to remain running and the computer to be awake. Full application exit, sleep, shutdown, or missing NIMBL/model connectivity can prevent on-time execution. Show that availability condition during schedule setup. Explicit exit handling, per-agent overlap, and doing nothing for missed times are confirmed; other unconfirmed scheduling policies above remain proposals.

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
| Start a new session | New session starts fresh conversation context while preserving saved agent/default-task settings, schedules, task history, and files. Old messages/proposals do not enter the new context automatically; active executions are not cancelled. |
| Run without chat | A ready starter or custom agent executes its saved default task from Run without a new prompt. The UI displays progress and the actual result, partial outcome, or actionable error. History/logs are accessible without dominating the main view. |
| Review output before creation | The setup report shows the selected or proposed new subfolder, filename rule, and clearly synthetic sample. User changes are retained in the confirmed configuration; preview generation creates no production result. |
| Organize shared output | A confirmed syslog agent writes its result under syslogs/ in the shared root. A different purpose can reuse a suitable folder or create a confirmed new category. Saved output is traceable to its execution. |
| Use a starter agent | On a clean supported installation, the user selects a prepared agent, completes guided essential connection/provider setup, and obtains a useful verified result without CLI commands, configuration editing, or custom-agent creation. |
| Configured model profiles | A user binds a profile to a provider/model and assigns it to an agent. Each execution records its resolved binding; a profile edit affects only subsequent executions. Missing/incompatible bindings produce a setup requirement without silent fallback. |
| Local-only inference | With external inference blocked, a supported task completes using an approved local model. Instrumentation shows no external model request, including from the creation-agent; missing local capability produces an explicit limitation. |
| Approved external assistance (future; outside milestone 1) | A test request shows its destination and prepared payload; prohibited data is removed or transmission is blocked. Only the approved payload is sent through the verified secure path, and the original agent receives the result. |
| External denial or failure (future; outside milestone 1) | Denied policy, changed payload/destination, invalid server identity, unavailable relay, or timeout produces no unapproved fallback. Scheduled work waits when approval is required. |
| External response and audit (future; outside milestone 1) | A test response containing instructions cannot expand permissions or trigger a device change. Audit records preserve attribution without raw payloads or secrets; supported local checks qualify the returned findings. |
| Refine an agent through trial | A user requests a change after seeing a real test result; the creation-agent revises the setup, reruns the task, and produces an attributable result reflecting the change. The user can save the agent and then schedule its task. |
| Create a custom agent | From a user-written description, review/edit and save a reusable agent without code, CLI commands, or advanced settings. Creation alone performs no device operation. |
| Missing setup and first task | An agent can be saved before connection/provider setup is complete. The UI identifies what is missing; once resolved, a separate task runs using the reviewed scope and returns attributable evidence. |
| Install with bundled CLI | On a clean supported target without a global CLI, the installed app locates the matching packaged executable and completes a harmless CLI smoke check. |
| Daily at 12:00 | With the host awake and app running, a daily schedule produces one occurrence at noon in the selected timezone within a timing tolerance to be specified. The UI shows the next due time and resulting execution. |
| Restart, resume, or clock change | Schedule state survives restart, due work is recalculated, and the same occurrence is not dispatched twice. Missed work follows the visible policy. |
| Per-agent overlap (confirmed) | While an agent is active, Run becomes View progress and scheduled occurrences are recorded as skipped without queuing. Different agents can run concurrently subject to resources. |
| Pause (proposed) | Paused schedules do not dispatch new work. |
| Read NIMBL information | A scoped task returns observations tied to the selected connection, target devices, and retrieval time. No write operation occurs. |
| Observe two agents | The overview attributes each active execution and result to the correct agent/task. One failure does not falsely mark the other execution failed. |
| Unavailable agent | Missing prerequisites are visible; the UI does not claim work is running when it cannot start. |
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

8. Remaining scheduling details: Confirm supported recurrence choices, timezone behavior, and schedule editing/pause semantics. Background window-close behavior, explicit Quit, per-agent overlap, and doing nothing for missed times are already confirmed.

## Technical references for proposed packaging and lifecycle

- [Electron ASAR limitations](https://www.electronjs.org/docs/latest/tutorial/asar-archives): packaged executables require deliberate handling outside normal archived source files.
- [Electron powerMonitor](https://www.electronjs.org/docs/latest/api/power-monitor): suspend/resume events support reconciliation; they do not make a sleeping host execute tasks.
