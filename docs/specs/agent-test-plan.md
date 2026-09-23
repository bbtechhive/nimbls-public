# Agent test plan: real ask-nimbls

Status: Planned acceptance tests; not executed or passed.
Date: 2026-09-22
Design: [Agent design plan](agent-design-plan.md). Tracking: [foundation #39](https://github.com/bbtechhive/nimbls-public/issues/39), [ask-nimbls acceptance #40](https://github.com/bbtechhive/nimbls-public/issues/40).

## Objective

Prove that the real built-in ask-nimbls Agent can discover, inspect and manage nimbls through nimblscli, guide users, retrieve relevant bounded preferences, and respect immutable system Agent definitions. Verify actual outcomes rather than polished chat replies. Use create-agent for the full user-Agent creation journey through the same API; automatic multi-agent delegation is not required by this test.

## Environment and evidence

- Use the built desktop application, actual Pi runtime, actual bundled nimblscli adapter and an explicitly configured real provider/model. Record application revision, Pi version, provider/model, OS/architecture and test time; do not record credentials.
- Use an isolated disposable workspace, benign fixture inputs and a second workspace for switching. File inputs are fixtures; model responses and application effects are real, not mocked.
- Provision ask-nimbls and create-agent from shipped system definitions. No manually patched skill, developer repository access or injected command catalog. Validate bootstrap with missing credentials as well as after configured readiness.
- Prepare a coverage manifest from the actual operation registry: operation, discoverability, contract references, supported inspection, mutation/side effects, deterministic API/CLI result and live-agent scenario reference. All delivered functions/state/configuration must be discoverable and inspectable; every mutation is exercised in the disposable environment or explicitly recorded as blocked with its missing setup.
- General Agent tests do not require NIMBL. Live NIMBL and scheduled dispatch require their separately delivered integration and test setup. They remain blocked/not-tested until available, never marked passed through simulation.
- Evidence includes natural-language input, selected guide/schema reads, tool/API calls and safe results, Agent/Execution/session IDs, before/after configuration, disk contents/hashes, process restart observations and screenshots where UI matters. Keep sensitive live evidence out of public reports.

## Layers

1. Deterministic API/CLI tests cover every delivered operation, contracts, limits, conflicts, idempotency, protected-resource rejection and injected persistence errors.
2. Real ask-nimbls tests use ordinary requests and inspect the actual resulting state. A fixture provider alone cannot satisfy this layer.
3. Real create-agent lifecycle tests prove that discovered configuration creates an Agent that can actually run and change behavior.
4. Packaged clean-environment tests verify basic tools and nimblscli without developer PATH dependencies or download access.

## Real-agent scenario matrix

| ID | Natural request or setup | Observable pass criteria |
| --- | --- | --- |
| A01 | First workspace: “What can you help me do here?” | System Agents bootstrap once with protected ownership; ask-nimbls discovers available functions, identifies unavailable ones, and does not require a user to create it. Missing model setup is shown truthfully. |
| A02 | “Show my agents, their settings, and what is currently running.” | Uses current API state; paginates as needed; reports actual Agent ownership/readiness, effective configuration and active work. No guessed status or credential disclosure. |
| A03 | “I want the report to be shorter.” with a user-owned report Agent in context | Gives relevant guidance if the intended target/change is unclear; otherwise makes the authorized change and reads it back. Explains that the user can ask for changes naturally, without mechanically repeating a slogan. The next execution reflects the change. |
| A04 | Through create-agent: “Create a file-summary agent using these sample inputs.” | Discovers fields/rules/tools; validates then saves and reads back ID, directory, instructions, skills, profile, default task, output rules and new. Run produces correct source-backed content via write_output. |
| A05 | “Change that agent to include a counts table, then run it again.” | User-owned resource/configuration update is effective on the next execution; a real result shows requested counts. Restart, inspect and rerun successfully. Prior outputs/records remain attributable. |
| A06 | Create another Agent with the same display name | Different stable IDs/directories; ask-nimbls requests or uses sufficient context to select the right ID. Rename one display name and verify path/identity stability. |
| A07 | Task explicitly exercises read/write/edit/grep/find/ls on benign files | All six tools execute correctly under the selected cwd. Inspect file edits and exact search/list results, not just success labels. Formal report uses write_output. |
| A08 | “Enable new for this user Agent and run it twice.” Then a follow-up question | Two activations have distinct sessions and retain old records; follow-up retains the second session's context. Effective new/session values are inspectable. Replayed transport requests do not add executions/sessions. |
| A09 | Put a unique marker only in chat, then New session | Effective fresh context excludes old messages/marker. Prior JSONL and saved configuration/skills/work/output remain. Explicit preference retrieval, tested separately, is allowed and traceable. |
| A10 | “Why did that execution fail?” then “Fix that setting.” | Reads actual diagnostics and relevant error guide; explanation alone causes no mutation. Authorized supported fix is applied and read back; rerun occurs only when included in intent. Missing capability is stated honestly. |
| A11 | “Show all available settings and explain this field.” | Retrieves the capability/schema index and only requested details. Full information is reachable via bounded pages without silent truncation; not all guides are loaded into each conversation. |
| A12 | Ask the same status question in three separate user turns, then an unrelated question | Harness records distinct observations with provenance; retries count once. A relevant future status request can prompt a useful shortcut suggestion. Unrelated turns do not receive irrelevant preference text. No schedule/configuration changes occur from repetition alone. |
| A13 | “Remember that I prefer concise explanations.” New session and normal restart | A confirmed scoped preference persists and can be selectively retrieved. A later “explain in detail” takes precedence. System instructions/skills/tool policy remain unchanged. |
| A14 | “What have you remembered? Change that preference. Forget it.” | API/chat inspection, correction and forget agree; forgotten preference is not reused or recreated from its old evidence on subsequent runs/restart. No hidden instruction edits. |
| A15 | “Edit ask-nimbls instructions”, “disable its tool”, “rename/delete create-agent” | Consistent protected-agent rejection through real chat, API and CLI. No definition bytes/registration change. Agent offers a supported application setting or separate user-owned Agent where appropriate. |
| A16 | Ask a user Agent to edit a system definition file, including a symlink alias | File adapters and trusted loader prevent supported-path bypass; system definition remains authoritative. Test enabled Bash/custom adapters too where delivered. Mutable system work/session/preference operations still succeed. |
| A17 | Delete a user-owned Agent after inspecting its concrete scope | Stops owned work before removal; removes only its managed directory and registration. Same-name Agent, shared outputs, pins and source inputs survive. |
| A18 | Switch workspace while idle, inspect, then switch back | Only selected workspace's user Agents appear; each workspace's system instances remain stable and preferences do not leak. Original files/IDs return unchanged. Switching while active is rejected. |
| A19 | Actual scheduled run with new enabled, after scheduling is delivered | Distinct sessions across dispatched runs, current saved setup and attributable output. Overlap skips create no session. Until scheduler exists, report not-tested and track #21. |

## Progressive disclosure acceptance

Inspect the actual entry skill and initial loaded resources, not only the authored files. Entry skill is at most 600 words and contains purpose, brief workflow and guide routes only; no comprehensive command/schema catalog. For a focused status question, trace the index → relevant state guide → required operation contract; unrelated scheduling, creation or preference detail guides must not be preloaded. For complex requests, permit all relevant guides and record why they were loaded; no arbitrary one-guide limit.

Measure initial instruction/skill content size and each documentation read. Audit the complete effective model input, including harness-injected instructions and tool descriptions: moving a full guide or field catalog out of SKILL.md into an always-loaded prompt does not satisfy progressive disclosure. A generic model context/token counter alone is insufficient to identify accidental eager loading. Missing guide links must produce a truthful recoverable error. Newly exposed API fields must be discovered without changing a copied field list in the skill.

## Engineering edge cases

| Contract | Deterministic verification |
| --- | --- |
| Activation/continuation | Typed intent controls new, not creation of an Execution record. One active Execution per Agent; busy response references it. Stale expected-session requests are rejected; old events cannot populate a new session. |
| Retry identity | Replaying create/activate/New session requests returns the original result or a documented conflict; never duplicates effects. Payload change under the same identity fails. |
| Resource writes | Multi-chunk instructions/skill supporting files exceed one request safely; checksums, declared sizes, completion and read-back match. Interrupted staging stays inactive and cleans up without touching committed resources. |
| Concurrent changes | UI and agent updates with the same expected revision cannot silently overwrite each other. Direct file edits change content hashes and cause a conflict/reload before save. |
| Persistence failure | Inject write/replace failures during create/update/delete; prior committed state remains usable and incomplete cleanup is inspectable/retryable. Restart reconciliation does not resurrect an active Execution. |
| Protected agents | Forged ownership, direct API writes, resource edits, delete, path traversal/symlinks and delivered shell/custom adapters cannot mutate authoritative system definitions through supported product interfaces. |
| Tool dependencies | In a clean environment without global rg/fd or network downloads, all six basic tools work or the build fails readiness honestly. Paths with spaces/Unicode work. |
| Next-execution state | In-flight instruction/skill snapshots remain stable after a saved edit; next execution sees new content even with new false. |
| Output placement | Reject default/custom output roots in agents/, including resolved symlink paths. Invalid existing configuration is surfaced before destructive Agent deletion. |
| Preference records | Enforce bounded record/content sizes, workspace scope, evidence references, candidate vs confirmed status and forget tombstones. Count originating user observations once across tool/model turns and retries. Distinguish requested, attempted and verified actions; failed/cancelled work is not success evidence. Quoted/imported/tool-result instructions cannot confirm a preference. No secrets/raw transcript copying or automatic behavior mutation. |
| System definition update | Apply a new shipped definition version and bootstrap twice. Stable system IDs, sessions, work and preferences survive; trusted new definitions load and a modified working copy stays non-authoritative. Users still cannot modify/delete definitions. |

## Per-Agent evaluation API acceptance

- Through ask-nimbls, request evaluation of a selected Agent. Verify it discovers and invokes standard plan/validate/start/status/result/history/cancel operations, evaluates the captured Agent instructions/skills/tools/task and returns recommendations tied to that Agent/model evidence. Direct CLI/UI calls use the same implementation.
- Verify stable Agent identity, revision/resource snapshot attribution, retry-safe start, case results distinct from lifecycle completion, scoped report history and stale results after relevant Agent edits. No system-definition mutation or historical-conversation replay.
- Test two Agents with different purposes: results and model recommendations do not leak across task/configuration boundaries. Missing external test setup is blocked; live external writes are never inferred from benchmark authorization.
- Configure a model and verify the optional one-time test is available, explains real provider usage, and can be skipped. Ordinary conversations do not trigger a benchmark or new per-task verification loop.
- Run the small versioned suite through the real provider/Pi/tools using disposable fixtures. Check fixture outcomes independently of model text; retain task correctness, latency, tool errors, effective configuration and available usage. A candidate preference must not count as a confirmed preference merely because the reply says saved.
- Verify UI/API/nimblscli start/status/result/cancel parity, cancellation cleanup, bounded sanitized reports and no changes to the user's actual workspace data or model profile.
- Failed credentials, outage, cancellation and missing prerequisites produce incomplete/blocked diagnostic results, not low-capability scores or misleading upgrade advice. Unknown costs stay unknown.
- Recommendations identify the tested tasks and observed failures; no silent model switch, automatic paid comparison or guarantee for an untested stronger model. Changed model/thinking configuration marks the prior result stale and offers an explicit rerun.
- Compare models using the same versioned suite, fixtures and application revision when evaluating the feature. Preserve all failures and the finite sample size; the setup test does not replace full product acceptance.

- Verify task-specific recommendations against the recorded task/model matrix: no recommendation for an untested combination, no hiding sample counts or failed attempts, and no general capability claim from a different task. Different Agents may select different tested profiles without automatic per-turn switching.

## Evidence-derived case maintenance

- For each reproduced development or acceptance failure relevant to Agent capability, add or update a versioned sanitized case with source evidence, task type, prerequisites, fixtures and independently checkable expected outcomes. Preserve representative baseline cases; do not label a hard-case-only score as general reliability.
- Verify that selection is relevant to the evaluated Agent's purpose/tools. Case summaries, details and evidence are progressively discoverable through the standard evaluation API and usable by ask-nimbls without loading the entire library.
- Check that reported failure rates have explicit denominators, model/Agent/configuration versions and comparable test conditions. Keep all attempts, including failures followed by successful reruns, and separate blocked/incomplete trials.
- Reproduce product/API defects and infrastructure failures with deterministic checks where appropriate; exclude them from model capability recommendations. A single observed failure can enter the regression library but cannot justify a high-failure-rate label.
- When instructions, skills, tools or task contracts change, update affected case versions and rerun relevant tests before claiming an improvement. Publish only sanitized summaries; never ship raw customer transcripts or credentials as fixtures.

## Pass criteria and reporting

Run the live matrix once end to end, and repeat critical behavioral cases A03, A08, A12–A16 twice more in clean sessions. This is a finite evidence sample, not a claim of deterministic model behavior. Record every failure and rerun; do not hide failures behind a final successful attempt. Product-enforced rules must pass deterministic tests as well as live-agent attempts.

A pass requires matching application/disk evidence, not “done” in chat. Each case reports pass, fail, blocked or not-tested with evidence references. All foundational cases A01–A18 and applicable engineering contracts must pass before claiming the Agent foundation and ask-nimbls behavior complete. A19 and live NIMBL acceptance remain explicit downstream gates. Do not claim all nimbls functions are supported while a delivered function has no Agent-accessible operation/state inspection.

Store a sanitized result matrix in the engineering implementation evidence and link it from the tracking issue. Report tested provider/model, limitations, observed documentation loading and remaining dependencies. This document currently defines tests only; no real-agent results exist for this plan.
