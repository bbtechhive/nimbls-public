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
- Start with a local application on the operator’s computer. Shared-server deployment remains a future option. Preserve flexibility to support it without implementing server or team-management features in the initial scope. Closing the window keeps nimbls running in the background; explicitly choosing Quit nimbls stops the service. Use a cross-platform technology stack targeting macOS, Windows, and Linux. Electron + TypeScript + React is selected, with Pi SDK execution in a separate process. Validate the syslog POC on macOS first. Record the test machine architecture during setup; CPU coverage and platform release order remain open.

The block decomposition and behavioral defaults below remain proposals except for the confirmed requirements above. These are product responsibilities, not a commitment to separate services, databases, screens, or a particular agent framework. No nimbls application behavior has been implemented. CLI source inspection and upstream integration checks are recorded below; they do not validate a packaged nimbls application.

## Shared NIMBL access through bbcli

Confirmed integration direction, based on the user's bbcli constraint: bbcli connects to one bbrootsvc. All agents retrieving NIMBL information use the shared bbcli integration and its single configured bbrootsvc target. Configure this connection once at application level; do not introduce multiple NIMBL connection profiles or a per-agent NIMBL connection selector.

Agents may still have different task/device scopes within that NIMBL system. General agents remain usable without NIMBL. Exact bbcli setup, credential handling, and connectivity-check commands must be verified against the selected CLI build before implementation; no live connection was tested for this decision.

Confirmed device-operation boundary: available device changes depend on what the bundled bbcli actually supports. Use the existing upstream NIMBL skill and the installed CLI's help to discover applicable operations; do not build a separate device-control interface or advertise unsupported commands. Follow the user's task scope and applicable operation guidance, and verify actual results. Capability availability does not by itself authorize an operation or prove it works on every target. Select representative read/write validation cases from the supported CLI build rather than treating the proposed milestone order as a blanket ban on early write support.

## First-use model discovery

Confirmed direction: discover model connection candidates from known provider environment variables, explicitly supported configuration sources, and local Ollama. Avoid arbitrary filesystem searches for credentials. Pi is the selected initial agent runtime; reuse its credential/provider-resolution capabilities where suitable, with exact discovery adapters still to be designed.

- Present discovered providers, safe source metadata, and local models without placing keys in conversation, execution history, or logs.
- Distinguish discovery, successful connection validation, and suitability for an agent's task. Finding a key or model does not establish readiness.
- Add local Ollama model discovery using its model-list API. Pi's documented custom-model setup alone does not provide this onboarding experience.
- Do not automatically execute command-based credential expressions during discovery. Preserve manual setup when no usable configuration is found.
- Let users start with one model profile. NIMBL connection is optional; only agents whose tasks depend on NIMBL require it. General tasks remain available.

References inspected: [Pi provider configuration](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md), [Pi custom models](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md), and [Ollama model listing](https://docs.ollama.com/api/tags). Exact configuration adapters and validation behavior await implementation; no environment discovery has been implemented or tested.

## Proposed blocks

| ID | Function block | User outcome | Owns | Boundary |
| --- | --- | --- | --- | --- |
| F1 | NIMBL connection | Give agents access to NIMBL through the shared bbcli integration. | One application-level bbrootsvc connection, credential references, connectivity checks, bbcli compatibility, retrieving information and submitting authorized device operations within task scope. | All NIMBL information retrieval uses bbcli; no per-agent connection selection. NIMBL remains authoritative. Exact CLI operations must be verified. |
| F2 | Agent management | Easily create a custom agent, understand its role, and configure what it can do. | Guided creation, conversational refinement and trial runs, starter customization, editable purpose/instructions, agent identity, tools/skills and execution configuration, assigned NIMBL access, and agent deletion. | nimbls directly launches and manages agents initially; Pi is the selected runtime; provider/model configuration remains open. External-agent support is deferred. An agent's configuration is distinct from a particular execution. |
| F3 | Task execution | Assign a clear objective to an agent and obtain a verifiable outcome. | Saved default task, direct Run action, objective, target scope, acceptance criteria, responsible agent, execution state, limits, and attempts. | Run executes the selected agent’s saved default task without requiring a chat prompt. Manual and scheduled work share the execution path. Automatic delegation and collaborative planning are deferred beyond the initial scope; retain an extensible execution interface. |
| F4 | Monitoring and control | See all agents' activity and intervene when needed. | Compact visible status/progress, actionable failure summaries, optional detail/history/log views, user input, cancellation requests, retry requests. | Show commands as requested versus acknowledged. Do not imply that cancel reverses an already-applied device change. |
| F5 | Permissions and change approval | Control which devices and actions an agent may access or change. | Read/write scope, enforceable access decisions, proposed changes, approval records, and conflicting-write prevention. | Approval must match the exact targets and proposed operation. Changing either invalidates that approval. Enforcement cannot rely solely on agent instructions. |
| F6 | Results and history | Understand what happened and whether the requested outcome was achieved. | Primary result view and file preview, shared output organization, result files, supporting observations, action history, verification outcome, attribution, timestamps, and safe evidence export. | A successful command or finished agent response is insufficient to prove a device change succeeded. Logs alone are not a user-facing result. |
| F7 | Scheduling | Have an assigned agent perform recurring work, such as daily at 12:00. | Recurrence, timezone, enable/disable, next due time, dispatch, and missed/overlapping occurrence handling. | Dispatch through F3 with the same F5 permissions; scheduling does not bypass approval or guarantee execution while the host is unavailable. |
| F8 | Local models and secure external analysis | Keep routine analysis within the site and obtain stronger external assistance when explicitly allowed. | Local provider readiness, model selection, minimal evidence preparation, sanitization, outbound policy, authenticated encrypted transport, response validation, and audit metadata. | No automatic cloud fallback or unrestricted data export. External analysis does not acquire local tools or authorize device changes. |

## Local models and secure external analysis

Local LLM support remains in the initial product direction. Secure external assistance is explicitly outside milestone 1 and must be considered during tech-stack review only.

The canonical [Secure external assistance design](secure-external-assistance.md) defines architecture, per-data-type review/test gates, proposed async evidence exchange, frontend state and approval behavior, acceptance cases, and unresolved choices. Unknown or unreviewed data types must not be exported. Pi is selected for initial local agent execution; future external-assistance routing, relay, transport, and detailed mechanisms remain unselected and unimplemented.

For reports and stakeholder communication, see the [繁體中文摘要](../concepts/secure-assistance-overview.md). External model assistance is distinct from the deferred external-agent workspace feature.

## Agreed agent lifecycle direction

nimbls directly launches and manages agents first. Users configure agents, assign tasks, start manual work or set schedules, and monitor supported execution controls and results through nimbls. Pi (`@earendil-works/pi-coding-agent`) is the selected first-version agent runtime, reusing its session, skills, context-file, and extension capabilities rather than building those directly on `pi-agent-core`. The application owns agent creation/management, scheduling, result presentation, and nimblscli; Pi provides agent execution. Pi SDK execution in a separate process is selected; exact process transport, Pi version, and model/provider selection remain open. The application provides its own UI; users do not need to operate Pi's terminal interface. Initial deployment is local on the operator’s computer; do not build a parallel agent execution loop.

External-agent support, including preparing a workspace that a user opens in Codex, is an optional future plan. Reconsider it during milestone review if there is a concrete need. It is not required for initial acceptance and does not block the direct-agent workflow.

If external-agent support is added later, define task/result handoff, attribution, available controls, and permission enforcement at that time. Opening a workspace alone does not provide live monitoring, cancellation, or scheduling in nimbls.

This is agreed product scope; no agent runtime or application workflow has been implemented or validated yet.

## Independent agents first; collaboration later

Confirmed initial scope: agents execute independently. Do not implement automatic delegation, collaborative planning, or multi-agent coordination in the first version. Ask nimbls can still operate and inspect individual agents through nimblscli.

Implementation must leave room for future agent collaboration. Keep execution dispatch and result inspection available through reusable application operations, with clear agent/task/execution identities and attributable outputs; avoid coupling execution to a particular UI or assuming requests can only originate from a human or timer. Future delegation can build on those operations while preserving existing execution controls and access rules.

This is an extensibility requirement, not a requirement to build an orchestration framework, message bus, team model, or unused collaboration APIs now. Detailed cooperation semantics remain future design work.

## Start with a useful agent or create your own

User-facing explanations: [agent concepts](../concepts/agents.md), [creation examples](../guides/create-an-agent.md), and [daily syslog scenario](../scenarios/daily-syslog-summary.md).

Confirmed priority: users can start with a useful prepared agent or define their own with minimal setup. See the [proposed starter lineup and first-use flow](../guides/starter-agents.md). The following interaction is proposed for review; specific controls and defaults are not yet approved.

1. Describe what the agent should do in ordinary language. Optional examples can help the user start, but a custom description is always supported.
2. nimbls suggests an editable name and concise role/instructions. Ask a focused follow-up only when missing information prevents a useful or unambiguous setup. Do not require users to write prompts, configuration files, or CLI commands.
3. Show a short review of the agent’s purpose, shared NIMBL connection readiness, device scope, and allowed actions. Reuse existing connection and application runtime setup where available. Missing setup should have a clear next action, and users can save the agent before completing it. Suggested defaults do not silently grant access; propose read-only access initially.
4. Review the proposed output destination, filename rule, and sample content. Let the user discuss and revise them before confirmation. If the request includes recurring work, propose its task and schedule during creation; otherwise a schedule is optional.
5. After confirmation, prepare the agent and validate readiness without starting device operations. Show any missing prerequisites and offer a first execution; the user can explicitly choose to confirm and try in the same action.

Keep model/runtime overrides, detailed instructions, and execution limits under optional advanced settings. Initial application setup may still require provider sign-in and NIMBL credentials; do not repeat those requirements for each agent or imply that they can be skipped when needed to run work. Do not infer credentials from the user’s description.

Example description: “Help me monitor factory switches and explain problems.” The review can suggest “Switch assistant” and read-only access to a user-selected device scope. This defines a reusable agent role; “Check these switches now” is a separate task. Users can edit the saved agent, and existing execution records retain the configuration actually used.

The first milestone should demonstrate a useful starter agent plus creation of a user-defined agent, each with a representative task and verifiable results. A health report is only an example for validation, not a restriction on the roles users can define. Custom instructions remain bounded by supported tools and granted access.

## Simple agent management

Confirmed initial scope: Add and Delete are the agent lifecycle actions. Do not add agent enable/disable, re-enable, or duplicate/copy actions. Existing creation, configuration refinement, saving, and repeated execution remain part of the agreed workflow. Schedule controls are separate from agent lifecycle controls.

Confirmed simplified deletion mechanism: stop the selected agent's active work, remove its agent/schedule registration, and delete its entire managed working folder. Use that folder as the unit of removal rather than building separate cleanup operations for every kind of internal file. Show the folder-removal scope in the deletion confirmation and confirm termination before deleting files that running work could still use.

Only the selected agent's managed folder is the recursive deletion target; do not follow references to user input folders, other agents, or shared application resources. Formal deliverables live in the system output/ root outside agents/. Deleting the agent folder leaves these system outputs intact; remove them only through separately requested output cleanup. This supersedes the previous detailed per-category deletion proposal; no actual files are being deleted in this discussion.

## Result-first agent workspace

Confirmed direction: task results are the main experience, and chat is optional. The conversational creation/refinement flow remains available, but ordinary execution must work without opening chat or typing a request.

Each ready agent has a saved default task: objective, target scope, reporting-period rule, and output expectations. Agent creation or starter setup prepares this task. Run starts a new execution using the saved task; it does not ask the user to repeat the objective. A default task is still distinct from the agent identity and from each execution.

Surface known missing prerequisites before Run, with a direct setup action. Do not substitute a long conversational refusal for a clear readiness indicator. Runtime failures that cannot be known in advance remain visible after starting.

Proposed workspace layout:

| Visibility | Content |
| --- | --- |
| Always visible | Agent name, readiness/execution state, Run or Stop as applicable, task outcome, and the result region with output browsing and pinned current files |
| Appears when relevant | Compact current activity, request for missing input, partial-data notice, failure reason and next action |
| Available through entry buttons | Optional chat, history, full error/action logs, model/tools/skills settings, schedule details |

Successful work shows a readable result and output links. A failed execution shows a concise reason and actions such as Retry, Check connection, and View error log. Partial coverage is visible alongside the report. An earlier successful report can remain accessible but must retain its original date and must not look like the failed execution’s result.

Chat supports explanation, one-off requests, and agent/default-task refinement when users choose to open it. Actual operations and results drive the UI; a conversational statement alone is not evidence that settings changed or work completed. Exact conversation-to-task routing remains to be decided. While an execution is active, Run becomes View progress under the confirmed per-agent concurrency rule.

### Minimal conversation session control

Confirmed minimum: provide a **New session** action wherever the optional chat or creation/refinement assistant is available. This starts a fresh conversation context so users can leave earlier discussion behind without recreating the agent.

A new session retains the saved agent configuration, default task, connection settings, schedules, execution history, and output files. It does not cancel or restart an active execution and does not change the primary result view. Saved configuration provides the new conversation’s starting context; earlier messages and unconfirmed proposals are not carried into its model context automatically.

Proposed initial UX: one current conversation per agent/assistant, with New session available from its chat controls. If an unconfirmed proposal would be discarded, explain that before resetting. Historical-session browsing, switching, branching, merging, and automatic long-term conversation memory remain deferred. Conversation archival/retention storage details are undecided; New session is a context reset, not a promise to erase stored records.

When a conversation is actively generating or applying a change, disable New session until that operation finishes or is explicitly stopped. This avoids a late response appearing in the new conversation or an unconfirmed proposal being mistaken for saved configuration. Task executions remain separately tracked and may continue.

### Session choice when running an agent

Confirmed requirement: expose a run flag controlling whether an execution starts a fresh conversation session. Recurring scheduled agents should start a new session on every execution by default; save the choice with their run/schedule configuration rather than requiring user input each time. Make the effective choice available through the application operations and nimblscli. Exact flag spelling and manual-run default await implementation design.

Confirmed creation behavior: the creation assistant uses its skill to choose the fresh-session setting from the task. Prefer fresh sessions for independent recurring reports, inspections, and analyses; choose continuation when the work requires prior conversation context. Needing historical data alone does not require continuing a conversation: a fresh session can read persisted working files. Explain the choice briefly in the creation summary and allow the user to change it. Ask only when unclear requirements materially affect the choice.

Fresh means loading the saved agent instructions, skills, harness settings, and task without automatically carrying prior conversation messages into model context. It does not delete working files, execution history, or outputs; the agent may still read relevant persisted files through its tools. When fresh-session mode is disabled, allow continuing an existing session; session selection and missing-session behavior remain to be defined. Record the effective session identity for execution attribution. This is independent of the manual New session chat action and does not introduce full session-management UI.

Crash/process-restart recovery is outside the current design discussion. The proposed interrupted-task recovery behavior was not accepted; do not treat session continuation as checkpoint recovery or a promise to resume an interrupted execution.

## Simple access to working data

Confirmed direction: prioritize ease of use. Automatically create and manage the agent's working folder for harness files, notes, intermediate files, and execution history. Users select only the input folders needed for their task; formal results go to the shared output root and its purpose-specific categories.

The creation assistant guides source selection from the user's task description. Ask nimbls can help add or change sources. Keep internal directory structure out of the normal setup flow and expose locations through optional entries when useful.

Preserve source files by default and write deliverables to output. When editing, renaming, or organizing source files is the task itself, make that behavior explicit in the agent setup. New session resets conversation context without clearing working files. Exact paths remain open; output preservation and default retention are confirmed below.

## Application state and persistence

Confirmed first-version storage: use memory for live state, derived indexes, and schedule timers, with JSON files for persistent application data such as agent registration, schedule rules, model-profile settings, and pinned output paths. Reload saved settings and rebuild derived state on startup. Do not introduce SQLite for application metadata. This does not add interrupted-task recovery or missed-schedule catch-up.

Keep persistent state updates behind the shared application-operation interface used by UI, nimblscli, and agent tools, preserving a replacement point for future storage and collaboration needs. Working files, instructions, skills, conversation/execution records, and outputs retain their appropriate file formats; JSON application persistence does not require converting every artifact. One application-operation owner serializes JSON changes against the latest committed state. Write a temporary file beside the target and replace the target after a successful write; update in-memory settings and report success only after persistence succeeds. Failed writes retain the previous committed state and return an error. Agent instructions, skills, and working files remain directly editable, while formal outputs use write_output. Exact filenames, schemas, and platform replacement behavior await implementation validation; no cross-file transaction guarantee is implied.

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

## When agent configuration changes take effect

Confirmed behavior: changes to instructions, skills, harness configuration, and model settings take effect on the next execution. An active execution continues with the effective configuration it started with. To use new settings immediately, stop the current execution and start a new one; editing alone does not stop or restart work.

Preserve the effective configuration or immutable references needed to attribute each execution. This boundary applies even before Git revision functionality exists: do not let changes to mutable skill/instruction files silently alter an in-flight execution when it reads them later. Exact snapshot/loading mechanics await implementation. Continuing a conversation session does not override this rule; the next execution must use the updated saved configuration while applying the selected conversation-context policy.

## Basic tools and separate Bash capability

Confirmed implementation approach: the basic tool set covers file read/write/edit/search/list operations. Reuse suitable Pi tools such as read, write, edit, grep, find, and ls; implement or adapt tools only where behavior is missing or does not meet the application contract. Ordinary working-file writes can use Pi tools; formal system-output writes use write_output for the required destination, edit modes, and deleted/ behavior.

Bash is still provided for general tasks, but is not part of the basic tool set. This supersedes the earlier blanket exclusion of shell execution. Basic tools are available by default. During agent creation, the assistant decides whether the task requires Bash and explains its choice. Users can change that setting. Scheduled runs reuse the saved agent setting without asking each time. Changes take effect on the next execution; active work retains its starting configuration. Not using Pi's TUI does not remove the shell dependency when its Bash tool is used; provisioning and compatibility must be verified per platform.

Prefer dedicated adapters for bundled bbcli and nimblscli, selecting the packaged executable and passing structured arguments with shell execution disabled. This keeps application/NIMBL operations independent of Bash. Reuse the existing NIMBL skill and adapt invocation guidance as needed.

## Adding skills, MCP connections, and scripts

Confirmed interaction: users can ask the creation assistant to add a skill from a file or source, connect an MCP service using supplied connection information, or make a supported script available to an agent. The assistant uses nimblscli operations to configure the capability, inspect its setup, and check whether it is usable. Ask only for missing information needed to complete the setup, and report the actual check outcome and any remaining prerequisites. Registration alone does not prove that a capability works.

Include initial additions in agent creation. Changes to an existing setup are also allowed before revision functionality is available. nimblscli must provide the corresponding setup, inspection, and validation operations; exact command syntax, supported source formats, MCP transports, script runtimes, and validation checks await implementation design. Validation must stay within the intended task and authorized test scope; adding a capability does not authorize unrelated external effects.

## Agent-authored changes and future revisions

Confirmed capability direction: an agent may directly modify skills, harness configuration, and instructions, including an existing agent setup, even when revision functionality has not been implemented. Revision work is not a prerequisite for delivering these modifications. This updates the earlier dependency; the current discussion defines product behavior and does not start implementation.

Confirmed revision direction: use a Git library embedded in the application for local agent-configuration versions, without requiring system Git or GitHub. Select the library after the technology stack is chosen and verify its local commit, diff, and restore capabilities and distribution compatibility. No library has been selected or integrated.

The intended layout is one local repository per agent configuration directory, tracking instructions, skills, harness configuration, and scripts. Exclude credentials, working data, execution records, and output artifacts. After a coherent modification is completed and validated through the application operations, the system records a commit. Detailed change grouping and failed-validation handling remain to be designed; activation on the next execution is confirmed above.

Deliver automatic local version recording first; user-facing change-history, comparison, and restore controls can follow. Keep Git as an implementation detail, with task-oriented wording such as modification history and restore. Restoring configuration cannot undo external operations already performed. This direction does not reinstate a revision prerequisite for agent modification or promise revision features before implementation. Output-file update/archive rules remain separate. Automatic improvement by a future improvement agent remains deferred.

## Output files and write_output

Confirmed interface: formal deliverables are written through `write_output` into the system `output/` root outside `agents/`. The caller may specify a nested relative target directory: `syslog/2022/mon` resolves to `output/syslog/2022/mon`; the filename is placed within that directory. Resolve destinations against the managed output root, not the agent's current working directory, and prevent paths from escaping that root.

Support four operations:

| Mode | Result |
| --- | --- |
| write | Write the supplied content to the target filename. |
| append | Add supplied content after the existing content. |
| prepend | Add supplied content before the existing content. |
| search & replace | Find specified content and replace it in the target file. |

When updating an existing filename, preserve its previous file in the system-managed `deleted/` folder and place the resulting content at the requested original path. For append/prepend/search-and-replace, compute the result from the existing content before replacing it; moving the old file must not discard the content needed for the update. Repeated archives must not overwrite each other. Users may clean `deleted/` whenever they choose; no automatic expiry is required. The exact location/naming inside `deleted/`, tool argument spelling, missing-file rules, and literal/regex or match-count semantics remain implementation details to define.

This supersedes the earlier requirement for distinct filenames per execution and the proposed unique suffix at the live output path. Preserve attribution and update evidence in execution records; do not claim a historical file remains available after its archived copy is explicitly cleaned. Report write failures and incomplete execution outcomes truthfully. Exact atomic-write and concurrent-edit handling require implementation validation; no tool has been implemented.

## Result region and pinned files

Confirmed UI: provide a result region where users can browse the entire system `output/` folder hierarchy and select any file. Render Markdown and HTML. Users can mark files to remain displayed in the region; these pinned entries show the latest content at the selected path after a file update, rather than freezing an earlier execution's content.

Keep the current file view separate from execution outcome: a pinned file showing its latest content is not proof that the latest execution succeeded. Retain visible attribution/time and incomplete/error information where applicable. This replaces the earlier latest-success-only primary display rule. Pin storage scope, refresh mechanics, missing-file presentation, and handling of other file types remain to be designed. Confirmed initial HTML capability: support interactive reports such as chart switching, table filtering, and expandable details. Allow the client-side behavior needed for these interactions within an isolated preview environment. HTML content does not receive direct access to nimbls operations, bbcli, or local filesystem APIs; agents continue using the formal tools for those actions. Exact renderer, isolation mechanism, asset loading, and network policy await implementation design and verification.

## Default retention and manual cleanup

Confirmed initial policy: retain outputs, execution records, and agent working data by default, with no automatic expiry. Defer automatic cleanup and configurable retention periods.

When users want to clean up, Ask nimbls uses nimblscli to inspect the relevant data and present the proposed deletion scope and effects. Delete only after the user confirms that concrete scope. Report the result truthfully, including any partial failure. These operations belong to the existing application-operation interface; no separate cleanup administration UI is required by this decision.

Users may explicitly clean the deleted/ archive at any time. Default retention lasts until explicit cleanup; deleting an agent removes the data within its working folder. System output/ artifacts remain outside that deletion scope. Storage locations, active-data handling for selective cleanup, and detailed deletion mechanics await implementation design. No cleanup operation has been implemented or performed.

## Creation report and shared outputs

The creation-agent interprets the user’s requirement and presents an editable setup report: agent name and generated ID, purpose/instructions, a recommended High/Medium/Low profile with its provider/model binding and rationale, required tools and skills, harness settings, on-demand or scheduled work, and output rules. Users can discuss changes before confirming creation. Selection must refer to available capabilities; missing dependencies remain visible rather than being reported as ready.

nimbls creates and manages one shared output root for the initial local deployment. This system `output/` directory must be outside `agents/`, and formal deliverables are written through `write_output`. Organize results by purpose rather than requiring a separate output root per agent:

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
- Filename rule: {date}-syslog-summary.md; updates archive the prior file in deleted/ and keep this live output path.
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

- Confirmed: agents use the `write_output` tool to write formal deliverables into the system `output/` root, outside `agents/`. The tool resolves the managed destination; agents do not construct a private agent-local output root. It preserves agent/execution attribution and follows the confirmed write/update/archive behavior above. Exact tool schema and write-scope enforcement remain implementation details. A shared root does not automatically grant every agent access to every file.
- Preserve agent/task/execution attribution for each output so results from different agents remain distinguishable.
- On an existing target filename, move the previous file to deleted/ before publishing updated content at the same path; do not replace this with an automatic suffix on the live filename.
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

- Confirmed: all agents use bbcli for NIMBL information through one shared bbrootsvc connection. Keep the configured target attributable in execution evidence; no multi-connection management is needed.
- Assign tasks to agents explicitly, with manual or scheduled execution. Demonstrate multiple agents with separately attributable work before adding automatic cooperation.
- Use a read-only task as a simple validation case; device-change availability follows the bundled bbcli capabilities, with representative supported operations selected for verification.
- For the first write workflow, require review of the proposed change. Wider policy-based autonomy can follow a separate decision.
- Prevent overlapping writes to the same scoped device; define how execution ownership is released after failures before enabling concurrent writes.
- Treat stale/disconnected status as unknown, not healthy. Recover enough durable state to distinguish completed, still-running, and uncertain operations after interruption.
- A retry must not blindly repeat a potentially applied write. Check actual device state first and use operation-specific recovery.
- Do not promise universal rollback, process suspension/resumption, arbitrary external-agent compatibility, or automatic agent collaboration before their supported semantics are defined.
- Initial deployment is local on the operator’s computer. Define local credential handling, durable storage, and enforceable agent/device access for that scope. Shared-server deployment remains a future option; server identity and team authorization are deferred. Keep task execution, scheduling, and persistence responsibilities separable from the local UI so a future server deployment can reuse them; this does not require separate services now.

## Cross-platform implementation direction

Confirmed requirement: choose a cross-platform technology stack from the start, targeting macOS, Windows, and Linux. Assess the desktop UI, background lifecycle, scheduling, Pi integration, embedded Git library, paths, credential storage, packaging, and update mechanism together. The confirmed desktop baseline is Electron + TypeScript + React, with Pi SDK execution in a separate process and no Pi TUI. Keep core agent operations independent of the UI to preserve future collaboration/shared-server flexibility. Application persistence uses JSON files with in-memory live state/indexes; no SQLite in the first version. Packaging, build tooling, and exact versions remain open.

A first validation platform is not a restriction on architecture or a promise of simultaneous releases. macOS is the first validation platform; record the test machine architecture during setup and select release coverage/order separately. In particular, verify bundled bbcli and its native dependencies on each supported target; a cross-platform UI framework alone is not evidence that a complete installer works on all three operating systems.

## Bundled bbcli delivery

The confirmed user experience is a single application installation that includes the required CLI. Electron is selected; the following detailed build approach remains proposed:

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

The harness records operational facts independently of whether the model writes a work summary. Keep large evidence in referenced files rather than copying it into every event. Credential material is excluded; omitted, truncated, expired, or unavailable evidence must be explicit so reviewers can report insufficient evidence instead of inventing a verdict. Exact schema, storage layout, and capture limits remain implementation decisions; recorded evidence follows the default retention and explicit cleanup policy.

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

## Waiting for user input

Confirmed direction: reuse Pi's extension dialog/waiting mechanism rather than build a separate agent interaction loop. Provide a question tool/extension and bridge its questions and answers into the application UI and operation interfaces. Pi supports input, selection, and confirmation dialogs; its RPC UI protocol waits for a matching response and supports optional timeouts. Pi is selected as the runtime; SDK execution in a separate process is selected; process transport and the application bridge still await detailed integration design.

Agents first use available settings, skills, and tools to resolve needed information. When necessary information is unavailable, show the question and a waiting-for-answer state. Initially do not impose an answer deadline: continue when answered, or allow the user to stop the execution. Waiting counts as an active execution, so further scheduled occurrences for that agent are skipped under the existing concurrency rule. Apply the same behavior to manual and scheduled work.

Closing the window preserves the background process and its pending question; reopening must expose it again. Explicit Quit follows the confirmed stop-and-exit behavior. Do not claim that pending questions survive a crash or process restart automatically; persistence/recovery needs separate design and verification. Cancelling a dialog is not by itself proof that the whole execution has stopped.

Evidence: inspected the installed Pi 0.82.1 documentation/code and the current [Pi extension UI protocol](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md#extension-ui-protocol). This is integration direction based on source/documentation, not a completed runtime test.

## Scheduled execution

Confirmed initial recurrence choices: daily at a chosen time, weekly on selected weekdays at a chosen time, and fixed intervals (for example, every 30 minutes). Users describe the requirement in ordinary language; the creation assistant configures it through nimblscli and presents the rule, timezone, and next execution time for review. Default to the computer's timezone at schedule creation. Further behavior is distinguished below as confirmed or proposed.

| Concern | Behavior and status |
| --- | --- |
| Simple setup (confirmed) | Configure daily, selected-weekday, or fixed-interval recurrence through the assistant and nimblscli. Show the rule, timezone, and next due time. No cron syntax is required. |
| Timezone | Confirmed: default to the computer's timezone at creation and show it in the schedule summary. Proposed implementation: store an explicit IANA timezone such as Asia/Taipei and do not silently change it when the system timezone changes. |
| Calendar semantics | Daily 12:00 means noon in the selected timezone, not every 24 elapsed hours. Proposed daylight-saving rule: skip nonexistent local times and dispatch once for repeated local times; verify this before supporting affected schedules. |
| Fixed-interval details | Use schedule-save time as the anchor; first due is one interval later, then fixed elapsed-time multiples independent of completion time. Preserve the anchor across restart and pause/resume. Changing the interval resets the anchor to edit-save time; other edits retain it. Skip active/missed occurrences under the existing rules; manual Run is available immediately. Exact supported interval limits are an implementation choice. |
| Durable state | Save the recurrence, enabled state, next due time, and occurrence history. Recalculate due work on startup/resume; do not rely solely on an in-memory timer. Persist application state in JSON files and reconstruct the in-memory scheduler on startup; no SQLite. |
| Traceability | Each dispatched occurrence has its scheduled time and its own execution record under the assigned task, including actual start, outcome, and evidence. A missed occurrence does not create an execution. Preserve the configuration used for that execution. |
| Duplicate prevention | Use a unique occurrence identity and a serialized dispatch decision through the shared operation owner. Do not dispatch the same occurrence twice within the live scheduler; full crash recovery remains deferred, and exactly-once external device effects are not promised. |
| Overlap (confirmed) | One active execution per agent across manual and scheduled work. While active, Run becomes View progress. A schedule triggering during active work is recorded as skipped without queuing. Different agents may run concurrently subject to available resources; shared-resource conflicts still need implementation handling. |
| Missed time (confirmed) | Do nothing for missed occurrences: no catch-up execution, backlog, or special user prompt. On startup/resume, calculate the next future scheduled time and continue normally. The ordinary manual Run action remains available. |
| Schedule management (confirmed) | Support conversational edit, pause, resume, and cancel through nimblscli. Editing updates the rule and shows the next due time. Pause retains settings and prevents future dispatch; resume continues at the next future time without catch-up. Cancel deletes the schedule while preserving the agent. None of these actions stops an active execution; use Stop separately. |
| Permissions | Recheck current access at dispatch and before effects. A schedule is not permanent approval for future device changes; writes requiring review wait visibly for approval. |
| Visibility | Show enabled/paused status, next scheduled time, last actual execution/outcome, and overlap skips in history. Missed times require no special prompt or recovery UI; any passive diagnostic recording remains an implementation detail. Distinguish waiting for approval from completed work. |

Confirmed lifecycle: closing the window keeps nimbls running in the background, including active work and scheduling. Explicitly choosing Quit nimbls stops the service. This is an agreed product requirement, not implemented behavior; Electron is selected, while the detailed background lifecycle remains to be implemented and tested.

Confirmed explicit Quit behavior: exit directly when no execution is active. If work is active, ask “Tasks are running. Stop them and quit?” Cancelling leaves the application and its work running. On confirmation, stop active executions, preserve partial outputs with an incomplete label, and exit after termination is confirmed. Keep the stopping state truthful under the execution-control rules; completed external operations are not automatically rolled back. Termination timeout and forced-exit mechanics remain implementation details, not a promise that every external operation can be cancelled.

Scheduled work requires the application to remain running and the computer to be awake. Full application exit, sleep, shutdown, or missing NIMBL/model connectivity can prevent on-time execution. Show that availability condition during schedule setup. Explicit exit handling, per-agent overlap, and doing nothing for missed times are confirmed; other unconfirmed scheduling policies above remain proposals.

## Proposed terminology for review

No canonical glossary entries have been approved yet. The current repositories have no source/API/UI definitions that establish these distinctions; the glossary guide's examples are illustrative only.

| Candidate term | Proposed project meaning | Distinction to confirm |
| --- | --- | --- |
| Agent | An identifiable AI worker configured to perform tasks within assigned capabilities and scope. | A worker identity/configuration, not its process or one execution. |
| Task | A requested objective with target scope and acceptance criteria. | The objective persists independently of retry attempts. |
| Execution | One attempt by an assigned agent to carry out a task. | A retry creates another execution; avoid using Run or Job for the same concept without a semantic reason. |
| NIMBL connection | The application-level bbcli access relationship to the single configured bbrootsvc. | Device identifiers and permissions must be interpreted within this connection. |
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
| Manage a schedule (confirmed) | Editing shows the updated next due time; pause prevents new dispatch while preserving settings; resume uses the next future occurrence without catch-up; cancel removes the schedule but keeps the agent. Active work continues unless separately stopped. |
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

Confirmed first POC, to be tested on macOS first: use the site history agent's daily syslog report to exercise create → try → modify → save → schedule with real evidence in the agreed test environment. Develop configuration delivery and event follow-up afterward according to bbcli capabilities. The creation assistant and Ask nimbls remain built-in application support roles. This sequence does not imply that a daily report delivers the entire site-history or incident-follow-up scope; the acceptance scope below is confirmed, while concrete test fixtures remain to be selected.

## Confirmed syslog POC acceptance scope

Validate the following on macOS; these are requirements, not completed tests:

1. Retrieve syslog for specified devices and a specified time range through bundled bbcli and the existing NIMBL skill, using supported CLI capabilities.
2. Produce event summaries and identified anomalies linked to corresponding original records. Distinguish inference from observed facts.
3. Write a Markdown daily report through write_output; browse it in the result region and pin it there.
4. Apply a user-requested report refinement, rerun and inspect the result, then save the agent setup.
5. Configure daily execution, using a fresh conversation session on each scheduled run.

Before runtime validation, identify the NIMBL connection, device/data scope, time range, usable model/provider, and a concrete refinement request. Existing test infrastructure may be reused once identified. Retain evidence of retrieved data, source-backed report content, refinement outcome, output/pin behavior, and fresh-session scheduled execution. Do not treat setup alone as a passed run or record credentials in public documentation. This scope does not remove previously confirmed output modes, interactive HTML, or other product requirements; Markdown is the initial POC report format.

## POC milestone baseline

The accepted [macOS syslog POC SPEC](macos-syslog-poc.md) and [milestone index](../../MILESTONES.md) now own the first delivery sequence: M1 manual syslog reporting, M2 refinement and reuse, and M3 daily automation. Together they complete the confirmed create/try/modify/save/schedule POC. The earlier candidate sequence is superseded; broader requirements in this document remain in force with POC versus later delivery identified in the SPEC. The milestone index links the three GitHub milestones and their function issues. No implementation, test results, or release dates are implied.

## Remaining implementation and test setup

1. Direct-agent execution: `@earendil-works/pi-coding-agent` is confirmed as the initial runtime. Use Pi SDK in a separate process; design its transport and pin a verified Pi version. External-agent support is optional for future milestone review and is not a prerequisite.
2. Local installation: macOS-first validation is confirmed. Record the test machine architecture and define the runnable installation path and platform release coverage/order, retaining macOS, Windows, and Linux as cross-platform targets. Shared-server deployment remains an optional future direction; preserve deployment flexibility while implementing locally first.
3. First validation details: The site history agent's daily syslog report and create/try/modify/save/schedule flow are confirmed as the starting case. The five-step syslog POC acceptance scope above is confirmed. Select its connection, device/time scope, model, concrete test data and refinement, covering starter use and user-defined creation without restricting other agent tasks.
4. Collaboration compatibility: Initial agents work independently (confirmed). Review the chosen execution interface for future delegation/result handoff without implementing collaboration in the initial milestone.
5. Runtime and integration: With Pi selected, choose a tested provider/model configuration and bundled bbcli version for the first runnable case. The development harness's GPT-6 Astra setting does not choose the product model.

6. Packaging: bbcli/ is now on mnms main. Choose which OS/CPU combinations the first installer supports and pin a verified revision before defining a release build.
7. Local inference and future compatibility: Select the first local runtime/model, hardware target, and provisioning path. During tech-stack review, assess the future assistance considerations in the [secure design](secure-external-assistance.md). Relay topology, transport/authentication, export policy, and provider retention are deferred decisions and do not block milestone 1; no live external transmission is authorized by this design.

8. Remaining scheduling details: Fixed-interval anchor behavior is defined above. Select supported limits and timezone-change/daylight-saving behavior during implementation without requiring separate approval for routine choices. Schedule edit/pause/resume/cancel behavior is confirmed. Daily, selected-weekday, and fixed-interval recurrence with a creation-time system timezone default are confirmed, as are background window-close behavior, explicit Quit, per-agent overlap, and doing nothing for missed times.

## Technical references for proposed packaging and lifecycle

- [Electron ASAR limitations](https://www.electronjs.org/docs/latest/tutorial/asar-archives): packaged executables require deliberate handling outside normal archived source files.
- [Electron powerMonitor](https://www.electronjs.org/docs/latest/api/power-monitor): suspend/resume events support reconciliation; they do not make a sleeping host execute tasks.
