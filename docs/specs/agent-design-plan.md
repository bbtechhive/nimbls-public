# Agent design plan

Status: Accepted product direction; implementation plan and acceptance targets, not a claim of delivered Agent functionality.
Date: 2026-09-22

## Purpose and users

Give users reusable agents with their own working directories, instructions, skills and tools. Users can create or select an agent, work with it, start a clean conversation without losing files, and keep useful results. General agents do not require NIMBL. Ordinary use does not require users to assemble a harness or edit configuration files.

This is the consolidated source for Agent composition, directory identity, basic tools and minimal session behavior. It refines the [fundamental function design](fundamental-function-blocks.md) and the Agent foundation within the [syslog POC](macos-syslog-poc.md). Other POC requirements remain tracked separately.

## Confirmed scope

- Each agent has cwd `workspace/agents/<agent-name-id>`.
- Integrate the complete basic file tool set: read, write, edit, grep, find and ls. Reuse suitable Pi implementations rather than implementing a second tool library.
- Keep write_output for formal deliverables. Bash remains a separately configurable capability under the existing design.
- Load the agent's instructions, skills and enabled tool configuration through the managed Pi runtime.
- Provide New session: fresh conversation context, retained previous sessions and unchanged saved Agent configuration, skills, working files and outputs.
- Persist a boolean `new` execution flag for both regular/manual and scheduled Agents. When true, every accepted activation starts a new session and retains previous sessions.
- No historical-session browsing, switching, branching or restoration in this slice. Explicit, bounded ask-nimbls preference/pattern records are included below; full conversation memory is not.
- Define the whole Agent model here without requiring all later capabilities to ship in this slice.

## Agent building blocks

| Block | Responsibility and persistence |
| --- | --- |
| Identity | Stable generated Agent ID, ownership (`system` or `user`), display name, purpose and stored working-directory path. User-owned names are editable and may repeat. Operations address IDs. |
| Instructions | Agent-specific role and behavior in AGENTS.md and explicitly referenced supporting files. Keep these separate from the application's fixed system instructions. |
| Model | Reference an application Model Profile; resolve provider/model/thinking settings at execution start and record the effective values. Credentials remain application-owned. |
| Harness | Shared nimbls orchestration and Pi runtime with per-agent settings. Own execution lifecycle, cancellation, resource loading and operational records; do not copy a runtime into every directory or create a parallel model loop. |
| Skills | Reusable guidance and supporting resources loaded for this agent. A skill guides tool use; it does not itself register a tool or grant access. |
| Tools | Basic file tools, write_output and explicitly enabled additional capabilities. Persist the selected configuration and expose actual readiness. |
| Working data | Notes, intermediate files and references that survive New session. File persistence is not automatic model recall. |
| Session | Pi-owned conversation records. New session changes conversation context while retaining older records on disk. |
| Default task | Saved objective, scope and expected outcome for repeatable Run; distinct from Agent identity and each Execution. |
| Execution | One attempt, with ID, effective configuration, session identity, status, tool outcomes and output attribution. A Pi session is not a replacement for application Execution records. |
| Output rules | Shared destination, filename/format and task expectations. Formal results use write_output and its existing archive/attribution behavior. |
| Schedule | Optional rule referencing Agent ID and its task. Scheduling remains a later slice and does not define Agent identity. |

## Directory and identity contract

```text
workspace/
  agents/
    <agent-name-id>/        # Agent cwd and managed deletion boundary
      AGENTS.md
      skills/
      scripts/
      work/
      .nimbls/
        agent.json
        sessions/          # Pi JSONL records
        executions/        # application operational records
  output/                  # default shared formal-output root
```

This tree shows user-owned Agent resources; system Agent authoritative definitions use the product-managed layout below. The outer `workspace/agents/<agent-name-id>` path is confirmed. Inner filenames and directories above are the proposed implementation layout; adapt the Pi resource loader explicitly rather than assuming it automatically discovers this layout.

Generate a stable unique ID and a filesystem-safe name component. Build the directory basename from both, validate containment, and create it exclusively; do not overwrite an existing directory on a collision. Two agents with the same display name must have different IDs and directories. IDs, not display names or parsed directory strings, are used by operations, schedules and attribution.

Implementation default: store the allocated path. Editing the display name does not rename the directory or change ID. This avoids moving live files and invalidating session references; an explicit move/rename operation is outside this slice. Names containing Unicode, spaces, separators, reserved characters or case-only differences must remain safe across target platforms.

Work files normally live under work/ but cwd is the Agent root. A working directory is not a filesystem sandbox. Input paths are explicit task resources; preserve source files unless changing them is the requested task. Shared output must remain outside agents/, including custom output roots. Existing workspace containment alone is insufficient once agent-folder deletion is enabled.

Workspace-scoped implementation default: list and activate user Agents from the selected workspace only. Switching workspace does not move/delete files; switching back restores access to its registrations. Provision the built-in system Agent instances idempotently in each workspace. Their work, sessions and preference records remain workspace-scoped. Reject switching while executions are active; unavailable/corrupt registries produce explicit errors rather than replacement empty data. File migration is deferred. Test switching and switching back before enabling it for persisted Agents.

## System default agents and first-use bootstrap

System default agents, including ask-nimbls and create-agent, are product-owned. Users cannot modify their definitions or delete them, through UI, API, nimblscli, another Agent or ordinary file tools. Ownership comes from the trusted product registry; create/update input cannot claim system ownership or change that classification. User-owned agents retain the normal creation/refinement/deletion flow. Built-in definitions are updated only by the product update path.

Ship versioned definitions, minimal workflow skills and the fixed nimblscli adapter with the application. On first use of a workspace, idempotently allocate stable registered IDs and `agents/<agent-name-id>` runtime directories for the system agents; bootstrap must not depend on create-agent already running. A missing model credential blocks execution with setup guidance, not bootstrap or discovery.

Keep authoritative system definitions in product-managed resources, outside writable working data. Runtime directories hold sessions, work and bounded preference records; any visible definition copy is read-only and not authoritative. Resource loaders resolve system definitions from the trusted catalog, never from a modified working copy. Enforce protected-resource writes in application operations and file-tool adapters; Bash/custom tools must not provide a supported route around this rule. Validate resolved paths/symlinks. This is product enforcement, not a claim of protection against a machine owner tampering with the installed application.

The immutable definition includes instructions, skills, tool policy, identity and saved Agent settings. Normal use may create sessions, outputs and operational state. Users may inspect, correct or forget preference records and change application-level settings via their usual operations; these are not edits to a system Agent definition. New session is allowed. Agent-local preference records cannot rewrite instructions, enable tools, change `new`, alter permissions or override product rules. A request to customize a protected definition receives an explanation and may be fulfilled by creating a separate user-owned Agent from a task description; no duplicate/copy lifecycle action is introduced.

## Tools and resources

| Capability | Behavior |
| --- | --- |
| read | Read Agent working files and task-selected inputs, with suitable bounded responses. |
| write | Create or replace ordinary working files. Formal deliverables follow write_output policy. |
| edit | Apply targeted edits with clear missing/ambiguous-match errors. |
| grep | Search file contents and report bounded matches. |
| find | Find paths matching a pattern. |
| ls | Inspect directories. |
| write_output | Publish durable task results in the shared output root, retaining existing edit modes, archives and attribution. |
| Bash | Separate saved setting; creation assistant recommends it when needed and explains the choice. Not implicitly enabled by the basic-file-tool requirement. |
| bbcli / nimblscli | Dedicated packaged-executable adapters with structured arguments, independent of Bash. bbcli serves NIMBL; nimblscli serves application operations. Existing integration issues own delivery. |
| Extensions / MCP / scripts | Additional configured capabilities, with visible prerequisites and representative validation. Supporting every connector is not a foundation acceptance requirement. |

The packaged basic-tool implementation must work without developer-installed rg/fd or a network download. Bundle tested target binaries where the chosen Pi implementation needs them, or provide compatible implementations; expose missing prerequisites honestly. Verify clean-environment basic tool behavior on the initial macOS target and avoid claiming untested platform coverage.

Bind all cwd-sensitive tools and resource loading to the correct Agent directory. Do not accidentally discover the developer's global Pi configuration or another agent's skills. Explicitly combine product-owned resources with the selected agent's resources. Surface malformed or unavailable resources instead of pretending they loaded.

Instructions, skills and enabled settings apply on the next Execution. Active work retains its effective configuration, including skill content or immutable snapshots needed if a skill is read later in that execution. Store only nonsecret settings in Agent files. No silent provider fallback.

## Minimal session behavior

New session creates a new conversation context without automatically carrying prior messages or unconfirmed proposals into the model context. Previous sessions remain stored. Saved Agent configuration, skills, working files, outputs and existing Execution records remain unchanged.

Reuse Pi file-backed session storage under the Agent-managed directory. Do not invent another conversation serialization format. Persist actual conversation records across application restart; retention does not require restoring the previous conversation into the UI. Empty sessions need not create meaningless files.

Expose New session through the same application operation used by UI and nimblscli. Disable/reject it while that conversation is generating or applying a change; the user can finish or explicitly stop first. Explain loss of an unsaved proposal when relevant. New session does not implicitly stop an independent Execution. After replacement, events and new messages must belong to the new session; old events cannot populate the new conversation.

### The `new` execution flag

Both regular/manual and scheduled Agents have a saved boolean `new` flag, exposed through shared application operations and nimblscli. `new: true` starts a fresh Pi session for every accepted activation, before the task is sent to the model. Preserve prior session files and load the saved instructions, skills, tools and task without automatically including previous conversation messages.

The API must explicitly distinguish task activation from conversation continuation (operation or typed request intent), because the current chat transport creates an Execution for every submitted message. Apply `new` only for task activation, never by inferring it from the existence of an Execution.

An activation means a new Execution started by Run, explicit Rerun, or an actual scheduled dispatch. It does not mean each chat message, tool call, model turn or transport retry within the same Execution. A rejected/duplicate request or skipped overlapping schedule occurrence does not create a session. Record the effective `new` value and session identity with the Execution. Editing the saved flag affects subsequent activations only.

One active Execution per Agent covers chat, manual runs and scheduled runs. Reject competing manual/chat requests as busy with the active Execution reference; scheduled overlaps are skipped. After a task run, its session becomes that Agent's current session for follow-up chat. Follow-up requests identify the expected current session; reject stale-session requests instead of silently sending them to a replacement session. New session and execution-start decisions are serialized per Agent.

With `new: false`, reuse the current eligible session when available; otherwise create one. This fallback does not require restoring a historical conversation after restart or adding session-selection UI. Recurring independent reports default to `new: true`; ordinary conversational use defaults to false as an implementation default, configurable by the user. Both manual and scheduled activation use the same flag semantics.

The manual New session action remains available independently of the saved flag. Historical-session browsing, switching, branching, restoration and crash/checkpoint recovery remain excluded. The flag and manual-activation behavior belong to the Agent foundation; actual scheduled dispatch remains in #21.

## Application API and nimblscli integration

Implement the Agent foundation through the application API. nimblscli is a thin client of this API; it must not own separate validation, persistence or Agent lifecycle logic. The desktop UI and agent-tool adapters use the same application operations. The create-agent Agent discovers the API contract and invokes it through nimblscli.

Extend the existing application dispatcher and service-owned operation documentation. Current transport is the local socket for nimblscli and Electron IPC for UI; both reach the same operations. An API does not require introducing an HTTP server for this slice. Transport changes are separate decisions.

| API capability | Required behavior |
| --- | --- |
| Discovery and documentation | Enumerate available Agent operations and retrieve complete field schemas, rules, defaults, recommendations, examples, errors and verification guidance. |
| Capability/state inspection | Inspect available tools, skills, profiles and prerequisites; list Agents and read their complete nonsecret configuration through bounded detail retrieval. |
| Validate | Validate a proposed create/update payload without side effects using the same schema and business rules as mutation. Return field-level errors separately from optional suggestions. |
| Create/update | Persist Agent configuration with stable identity and safe directory allocation; return inspectable saved state and readiness. Support retry-safe creation so a transport retry does not create another Agent. |
| Activate | Start a distinct Execution with the effective saved `new` value and session identity; expose status, output and cancellation through existing execution operations. |
| New session | Replace the conversation context and retain prior session records, with active-conversation conflict handling. |
| Delete | Inspect/perform the authorized managed-folder deletion and return truthful results, preserving shared outputs. |

Exact operation identifiers and payload schemas are selected during implementation and published by the service before clients use them. This table is a responsibility map, not a claim that new endpoints already exist. Generic nimblscli invocation must support all delivered fields; convenience commands cannot limit API access. Test API contracts directly and verify equivalent CLI/UI behavior, including errors and read-back.

### Resource writing, conflicts and partial failure

The API includes instruction and skill-resource inspect/create/update/remove operations for user-owned Agents, including supporting files. Large text content uses bounded staged chunks with declared total size, content digest and final commit; every ordinary request/response remains within the existing byte budget. Reject escaping paths and unsupported resource types. Incomplete uploads never become active resources; discard/expire uncommitted staging with an inspectable outcome. Do not route Agent configuration resources through formal-output publication.

Create is retry-safe by request identity and payload digest; mismatched retries return a conflict. Update/delete require the expected configuration revision and relevant content hashes. Revalidate against current state at commit time, including direct instruction/skill file edits, and return a conflict with inspection/retry guidance rather than silently overwriting another edit. Validation is side-effect-free and does not reserve identity or guarantee a later commit.

Prepare a candidate directory/configuration, validate it, then publish registration only when its required files are committed. On partial failure, report what exists, retain the last usable committed configuration and clean only the operation's own uncommitted staging. Reconciliation on startup identifies incomplete registration/deletion without pretending it is ready or restarting interrupted tasks. Deletion first prevents new activations, waits for owned work to stop, then removes the selected resources/registration; retry completes only the same deletion scope. This is bounded storage consistency, not general execution crash recovery.

## Agent-readable creation contract

The create-agent Agent is the intended author of Agent configurations. It and other authorized agents must discover every configurable field, enforced rule and recommendation through nimblscli/application operations, without reading this repository or relying on a manually synchronized skill prompt. No UI-only or undocumented creation fields are allowed.

The application service owns one canonical operation-documentation source consumed by CLI help and agent tools. Skills teach discovery and workflow; they do not duplicate schemas, field catalogs or command inventories. Documentation reads are non-mutating and progressively linked, with bounded pages/sections under the existing 8,191-byte JSON limit.

| Discoverable contract | Required content |
| --- | --- |
| Field schemas | Exact field keys, types, required/optional/read-only status, defaults, enums, bounds, units, null/omission semantics, examples and mutability. Include identity/name/path, instructions, model profile, harness settings, skills, tools/Bash, inputs, default task, output rules and `new`; link scheduling fields when supported. Mark generated ID/path fields as system-owned. |
| Enforced rules | Cross-field constraints, unique identity/directory allocation, output outside agents/, readiness prerequisites, activation boundaries, next-execution changes, deletion effects and persistence behavior. State validation errors with field paths and recovery guidance. |
| Recommendations | Task-based guidance and rationale for model profile, skills/tools, Bash, output format/location, default task and `new`. Clearly distinguish recommendations from enforced constraints and defaults. For independent recurring reports recommend `new: true`; do not require it for all conversational work. |
| Available capabilities | Inspect actual available model profiles, tools, skills and supported integrations with input schemas, prerequisites, readiness and limitations. A design capability is not automatically installed or usable. |
| Workflows | Discover → inspect capabilities/state → propose configuration → validate → create/save → read back → trial when authorized → inspect results → refine. State which operations have effects and how to verify them. |
| Results and errors | Return resolved nonsecret configuration, applied defaults, ID/directory, readiness and structured validation errors. Expose unknown/unavailable values honestly; never return credentials. |

Configuration validation uses the same rules as create/update and is available without creating an Agent or running a task. Validation can return errors and optional recommendations separately. Creation accepts saved incomplete setups with truthful readiness where supported; syntactically invalid configuration is not silently accepted. Configuration validity, dependency readiness and a successful real trial are different results.

All persisted configurable fields must be inspectable through operations; large instruction/skill content can be retrieved through linked bounded detail operations. Other agents can retrieve documentation and permitted state through the same interfaces. Readability does not grant authority to modify unrelated agents or perform device operations.

Future fields must update the served schemas, rules, examples and inspection contract in the same change that adds behavior. A create-agent skill must not need a copied field definition update simply to discover a new supported field.

## Lifecycle and shared operations

- Create allocates identity, directory and configuration through shared application operations. Failed creation reports its actual state and does not register a nonexistent ready Agent.
- Save persists application metadata through the existing serialized JSON owner. Instructions and skills remain their file sources, without a second conflicting metadata copy.
- Inspect exposes identity, actual directory, enabled tools/skills, readiness and saved configuration through UI and discoverable nimblscli operations.
- Refine applies the next-execution rule and supports representative trials before claiming readiness.
- System-owned definitions reject update/delete with a stable protected-agent error and actionable alternatives; all mutation paths enforce ownership.
- Delete of a user-owned Agent confirms the concrete scope, stops owned work, removes registration/schedules and deletes only the selected managed directory. Sessions inside it are included. Do not follow links into other agents, inputs or shared outputs; outputs and pins survive.
- Keep lifecycle Add/Delete; copying, enable/disable, collaboration and automatic improvement remain deferred.

## ask-nimbls: management, guidance and bounded memory

ask-nimbls is the real initial acceptance Agent. Its skill guides access to every delivered nimbls function and all permitted nonsecret state, information and configuration through nimblscli/application API. Include Agents/resources, executions, outputs, settings/model readiness, diagnostics, preferences and scheduling when delivered. Maintain a coverage map from the service operation registry to discovery and inspectable outcomes. Planned/unavailable operations are clearly marked; credentials are never returned as state.

Strict progressive disclosure is mandatory. The always-loaded entry skill is only a short purpose/workflow and a topic index pointing to canonical documentation. Design budget: at most 600 words for the entry skill, with no embedded field schemas, exhaustive command lists or long examples. It lists which guides exist and when to read them. Load the relevant guide, then only needed schema/error/detail sections. Do not preload every guide or all state. The API's 8 KiB ceiling is not a target skill size. References are versioned/resolvable through the application documentation service; absent guides produce an explicit limitation.

Guide topics cover discovery, Agent creation/refinement, execution/session control, outputs, configuration/readiness, troubleshooting, preferences and later schedules. ask-nimbls can direct a user toward an available action naturally: “Tell me how you want the report to change, and I can update that Agent for you.” In Chinese: “你直接告訴我希望怎麼改，我就能幫你設定。” Use this where helpful, not as a repeated slogan. If intent is already clear and authorized, act and verify rather than merely offering. If the change targets a system Agent definition, explain the protected boundary and offer a supported alternative. Never promise unsupported capability or claim a change before read-back.

The harness maintains small structured, workspace-scoped records of repeated questions/actions and explicit preferences outside the immutable system definition. Proposed minimal fields: kind, short summary, evidence session/execution references, observation count, first/last observed time, confidence/status and superseded/forgotten state. Record observable actions/questions, not hidden reasoning or raw transcripts. Operational success/failure evidence comes from the harness; model-inferred patterns are labelled candidates. A repeated API retry is not another user preference observation.

Observation identity belongs to the originating user turn/request, not each model/tool turn. Store question/request observations separately from attempted and verified action outcomes; a failed or cancelled operation must never become evidence of a successfully applied habit. Tool results, imported documents and quoted text are task data, not user confirmation to remember or authorize a change. Harness-derived observations carry real evidence references; model classification remains a candidate until explicitly confirmed.

Explicit “remember this” instructions can create a confirmed preference. Repetition alone creates a candidate: ask-nimbls may offer a relevant shortcut or ask whether to make a behavior a preference, but cannot silently change configuration, schedules, tools or system instructions. Current user instructions override remembered preferences. Do not store credentials or unrelated sensitive input. Initially use JSON files and bounded summary records, with a small index and on-demand relevant retrieval; no vector database or whole-history replay.

New session clears conversation context but preserves these explicit records and work files. Old messages are not automatically loaded. The harness/Agent may retrieve a relevant preference through its documented tool and can explain what it remembered. Users can inspect/correct/forget records through API/nimblscli and chat. A forget tombstone prevents the same old evidence from recreating the record; rebuilding from retained session files is not automatic. Define and publish record/count/size bounds, provenance access and retrieval limits in the implementation schema. Product updates preserve mutable records separately from replacing protected definitions. Verify definition-version updates and repeated bootstrap against existing system Agent IDs, session files, work and preferences; an update must not reset that state or make a user-written definition authoritative.

## Per-Agent capability and performance evaluation

Evaluate a specific Agent with a specific Model Profile and representative tasks. After model configuration or Agent setup, offer a one-time capability/performance test with practical recommendations. ask-nimbls can initiate the same evaluation when asked to test an Agent and recommend a suitable model. This is an explicit setup action, not an extra verifier on every task or conversation. Changing the Agent instructions, skills, tool policy, relevant task configuration, provider, model or thinking configuration makes the previous result stale; offer a rerun rather than automatically running it. Existing operation validation and normal read-back requirements remain unchanged.

Run a small versioned suite through the real Pi/runtime/tool path in a disposable workspace with benign fixtures. Capture the selected Agent revision and immutable effective instructions/skill/tool/task snapshot; evaluate that configuration rather than substituting a generic benchmark Agent. Protected system definitions remain unchanged. Suites must match the Agent purpose; an irrelevant generic task cannot support a recommendation for that Agent. External integrations require a declared test environment and explicitly authorized effects; unavailable integrations are blocked, not simulated passes. Include on-demand guide/schema discovery, correct tool arguments, a simple requested state change with authoritative result inspection, and a representative multi-step preference or Agent-management task. The evaluator compares results to known fixture expectations; it must not use the tested model's own success claim as the score. Never alter the user's actual Agents, settings, preferences, files or outputs. Retain only a bounded sanitized report and clean test data after completion or cancellation.

Expose evaluation as a standard service-owned application capability, with discoverable schemas, rules, prerequisites, errors and bounded results. Provide evaluation-plan/validation, start, status, result/history and cancel operations through the application API and nimblscli; the configuration UI and ask-nimbls use these operations. The pre-run screen explains that the test makes real provider requests and can incur charges. Users may skip or cancel it. No automatic model switch or follow-up benchmark of another paid model.

The report records Agent ID/revision, effective resource/task snapshot references, suite/application version, tested provider/model/thinking settings, completion and correctness per task, duration, tool errors and available token/cost usage. Mark unavailable cost data as unknown. Distinguish configuration/authentication/network failures and incomplete tests from measured model capability. A single small suite is diagnostic evidence, not a reliability guarantee or ranking of untested models.

Different tasks may use different Model Profiles through the existing Agent profile selection. Recommend by a task-by-model evidence matrix, not a global model prestige/price ranking. Classify suite cases (for example state lookup, configuration changes, Agent creation and multi-step management) and report sample count, correct outcomes, latency and available cost separately for each. Only recommend a specific model for a task when applicable measured evidence exists; untested combinations are unknown, small samples are preliminary, and provider/configuration/suite differences must be visible. Do not extrapolate a preference-management pass into proven Agent-creation or report-analysis capability. Setup testing does not introduce automatic per-turn routing; the user chooses the task/Agent profile, and later routing is separate scope.

Give task-specific recommendations: suitable for the tested simple operations, needs care on the tested multi-step tasks, or consider testing a more capable model because named cases failed. Show the actual observations and an optional route to change the model or rerun the suite. Do not require an upgrade to use the product, claim an untested model will succeed, or repeat upgrade prompts during ordinary conversations. Results belong to the tested Agent/configuration/profile combination and are inspectable later. ask-nimbls discovers the evaluation contracts, inspects an Agent, explains the test plan and provider usage, executes the user-requested evaluation, retrieves results and gives evidence-linked recommendations; it does not maintain a separate testing implementation. Result history contains evaluation reports, not historical conversation browsing. Proposed operation inputs include Agent ID, expected Agent revision, suite/version, fixture scope, explicit model-profile candidates and request identity. Capture effective configuration once per run, provide retry-safe starts and execution references, and keep lifecycle state separate from per-case correctness. A comparison of several models must be explicitly requested or selected in the concrete test plan; a single-model request does not authorize testing every available profile. Exact operation schemas and the small suite are implementation work; this section does not claim the setup test is already delivered.

### Evidence-derived capability case library

Future Agent development must consider capability evaluation alongside instructions, skills and tools. Turn reproducible failures observed during development and real-Agent acceptance into versioned reusable cases, rather than compensating for each failure with more always-loaded instructions. Preserve ordinary successful baseline tasks as well as difficult cases. Select cases by the evaluated Agent's purpose and enabled capabilities; prioritize relevant cases with measured high failure rates without presenting that deliberately difficult subset as a general workload success rate.

Each case records a stable ID/version, task category, sanitized origin/evidence reference, observed failure and reproduction conditions, isolated fixtures/prerequisites, expected outcome and an independent verification method. Record tested Agent/resource revision, provider/model/thinking configuration, application/suite version, attempts, successes, failures and blocked/incomplete attempts separately. A single failure is a useful regression case, not evidence of a high failure rate. Preserve failed attempts when later reruns pass; label insufficient or noncomparable samples explicitly.

Classify causes before making model recommendations: product/API defects, ambiguous test expectations, permissions, missing setup, storage and provider/network failures are distinct from model task failures. Fix product defects and retain their regression tests without counting them as evidence that users need a more powerful model. Do not copy credentials, private conversations or customer/device data into shipped fixtures or public evidence. Keep case selection and full case definitions progressively discoverable through the evaluation API; ask-nimbls reads only relevant cases and reports, not the whole library on every turn.

When Agent behavior or interfaces change, review the relevant case selection and rerun affected evaluations before asserting improved capability. Recommendations cite applicable task/model results, sample sizes and limitations. Evaluation should inform which profile a particular Agent/task uses; it does not silently switch models, expand task authority or add tests to each normal execution. This is an ongoing Agent development requirement, not a claim that the case-library service is implemented.

## Implementation sequence

1. Bootstrap protected system Agents and their small shipped skills/adapters without recursive creation dependencies. Extend the application API with discoverable Agent schemas, rules, recommendations, capability inspection and non-mutating validation; integrate nimblscli as its thin client; persist identity/directory allocation with duplicate-name handling and read-back.
2. Bind Pi cwd, instructions and skills to the Agent and integrate all six basic tools plus existing write_output; retain separate Bash configuration.
3. Enable Pi file-backed sessions, the minimal New session operation/UI behavior, and the saved `new` flag for regular/manual activation. Scheduling later reuses the same contract.
4. Connect creation, refinement and deletion to the same shared operations, preserving execution attribution and output boundaries.
5. Deliver ask-nimbls progressive-disclosure guidance and bounded preference operations. Execute the [real-Agent test plan](agent-test-plan.md), including create → run → refine → run → restart → reuse. Reuse the foundation for syslog; scheduling and broader integrations continue in their existing slices.

## Acceptance evidence

The [Agent test plan](agent-test-plan.md) owns the real ask-nimbls cases, evidence matrix and pass/fail criteria, including protected system definitions and bounded memory.

- Give a create-agent Agent only its workflow skill and nimblscli entry point, without repository access or a copied schema. Have it discover the fields/rules/recommendations, inspect capabilities, validate a proposal, create an Agent and read back every configured value including `new`.
- Submit an invalid field combination, verify a structured field-level error and documentation reference, then have the Agent correct and revalidate it. Verify validation does not create directories, Agents or Executions.
- Check complete field coverage across runtime schemas, served documentation and inspection results. Retrieve all pages/sections without silent truncation, including tool/skill configuration and full instructions. Distinguish suggestions from mandatory rules.

- Create two same-name agents; inspect distinct IDs/directories through UI/CLI and disk. Rename a display name and verify identity/path remain stable under the default above.
- Each agent reads its own instructions and skills and resolves relative paths against its own cwd.
- Run real read/write/edit/grep/find/ls operations on fixture working files; inspect resulting contents and search results, including missing files and bounded large results. Listing tool names alone is insufficient.
- Demonstrate an Agent reading inputs, writing intermediate work, editing it and publishing a result through write_output with correct Agent/Execution attribution.
- Put a unique marker only in an old conversation, start New session and inspect the effective context to prove it was not carried over. Verify the old JSONL still exists and all saved setup/work/output files remain intact.
- Activate a regular Agent twice with `new: true`: verify distinct session IDs and absence of prior conversation messages, with old records/files preserved. Repeat for actual scheduled dispatch when scheduling is delivered. Verify `new: false` reuses the current eligible session, falling back to a new one when absent; a follow-up turn or internal retry does not reset context.
- Normal restart retains old sessions on disk without requiring historical-session UI or interrupted-work recovery.
- New session during active chat is rejected/disabled; late events cannot enter the new chat.
- Saved instruction/skill edits affect the next Execution and do not change active effective configuration.
- Delete one same-name Agent and verify the other Agent, source inputs and shared outputs survive. Reject custom output roots inside agents/.
- Verify failed persistence and malformed resource handling without false success or silent data replacement.

## Related issues and delivery boundaries

| Issue | Role |
| --- | --- |
| [#39](https://github.com/bbtechhive/nimbls-public/issues/39) | General Agent foundation; independent of NIMBL. |
| [#40](https://github.com/bbtechhive/nimbls-public/issues/40) | Real ask-nimbls management, guidance, progressive disclosure and bounded memory acceptance. |
| [#7](https://github.com/bbtechhive/nimbls-public/issues/7) | Agent creation, complete building blocks, unique directories and all basic tools. |
| [#6](https://github.com/bbtechhive/nimbls-public/issues/6) | Packaged bbcli/NIMBL skill integration; independent of general file-task acceptance. |
| [#14](https://github.com/bbtechhive/nimbls-public/issues/14) | Refinement and next-execution configuration behavior. |
| [#15](https://github.com/bbtechhive/nimbls-public/issues/15) | Minimal New session, retained Pi session files and the shared `new` activation flag. |
| [#17](https://github.com/bbtechhive/nimbls-public/issues/17) | Durable identity/configuration and restart behavior. |
| [#18](https://github.com/bbtechhive/nimbls-public/issues/18) | Agent-directory deletion boundary. |
| [#19](https://github.com/bbtechhive/nimbls-public/issues/19) | End-to-end refinement/reuse acceptance. |
| [#21](https://github.com/bbtechhive/nimbls-public/issues/21) | Later scheduled fresh-session behavior; no current session-management UI. |

These support Manual syslog report (#32), Refine and reuse (#33), and later Daily automation (#34). Existing milestone scope is not marked complete by this document.

## Current baseline and remaining decisions

The current engineering baseline has Pi chat execution, model profiles, application workspace and write_output. It uses in-memory conversations, disables basic built-in tools and skill/context discovery, and does not yet persist product Agents. This plan describes the next work, not delivered functionality.

The product direction is sufficient to prepare implementation. The engineering contracts above close the reviewed bootstrap, activation, resource-write, dependency, concurrency and workspace gaps; executable schemas and tests remain implementation work. Inner file layout, ID encoding, loader wiring and the stored-path rename default are implementation choices to validate. Full session management, directory migration, Git-based configuration revision UI, arbitrary connector support, scheduling, collaboration and automatic improvement are separate work.
