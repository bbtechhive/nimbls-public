# Useful agents from the first launch

Status: Product design draft. Shipping useful starter agents is confirmed direction; the lineup below is proposed and has not been implemented or tested.

## Start with useful work

nimbls should include ready-made agents with instructions, appropriate tools, output rules, and sample results already prepared. Users can use these agents directly after essential connection/provider setup; they should not have to create an agent or edit technical files first.

The product rules are **easy to use** and **ready out of the box**. Starter agents should demonstrate useful outcomes and remain editable so users can adapt them or create their own agents.

## Proposed starter-agent set

Organize the set around three complete operator outcomes: retain site history, deliver verified changes, and follow important events through resolution. These are product directions, not a claim that all three full workflows ship in the first release.

| Agent | User outcome | Core workflow | Proposed outputs |
| --- | --- | --- | --- |
| Site history agent / 現場記憶助理 | Understand what changed and retain evidence for troubleshooting and handover. | Preserve a verified last-known-good reference separately from current configuration backups and state snapshots; compare changes; relate them to available maintenance records, topology, and syslogs; identify evidence and follow-up work. | reports/site-history/ and audits/site-changes/ |
| Configuration delivery agent / 設定交付助理 | Turn an operational goal into a reviewed change and an accepted result. | Clarify requirements, topology, device models, and services that must remain available; propose changes, impact, order, and recovery conditions; after approval, pilot and verify before expanding in batches. | reports/change-plans/ and audits/change-acceptance/ |
| Event follow-up agent / 事件追蹤助理 | Keep important problems visible until their outcome is verified. | Preserve raw syslogs; group repeated events; track first/last occurrence and frequency; relate configuration changes and affected devices; retain actions, follow-up observations, and recurrence history. | syslogs/ and reports/issues/ |

Folder names and agent labels are proposals. The creation review shows actual destinations and sample outputs before use. Shared evidence access must be explicitly scoped; this set does not require autonomous delegation between agents.

### Site history agent

Example request:

> Each day, review changes in this site’s device settings and status. Preserve the original observations and compare with the last verified normal state. Explain significant differences, related events, and what we should check next.

Illustrative case: a VLAN difference appears after maintenance at the same time as connection interruptions. The agent records both observations and prompts investigation. Correlation is a lead, not proof of cause. A recent snapshot must not silently become a last-known-good baseline.

Daily snapshots are an initial candidate; event-triggered capture is an extension whose integration and timing need validation. Inventory and current-status retrieval are supporting capabilities within this workflow.

### Configuration delivery agent

Example request:

> Plan how to put these new devices on the intended management network while preserving production communications. Show the differences, risks, execution order, acceptance checks, and recovery conditions before any change.

After explicit approval of a supported operation, the intended full workflow tests a pilot, checks management access, required services and segmentation, then expands in batches only when acceptance passes. Stop on failed checks and follow a previously validated recovery procedure where available. Retain per-device changes and acceptance evidence; a successful command is not proof that services work.

For an early release, a planning-only version may be appropriate. Label it **planning only**, not as completed configuration delivery. Device-changing execution requires verified device/CLI support, approval enforcement, loss-of-connection handling, and operation-specific recovery. The first milestone must explicitly choose its supported depth.

### Event follow-up agent

Example request:

> Review daily syslogs, keep important recurring problems under the same history, and show new findings, unresolved problems, and what needs confirmation. After a reported fix, keep checking whether the problem returns.

Illustrative case: a port has disconnected repeatedly for several days and recurs after a cable replacement. Preserve its history and prompt further investigation instead of declaring it resolved because someone recorded a repair.

Counting, deduplication, and record preservation should be deterministic application responsibilities. The agent interprets context and explains findings. Preserve device identity, timestamps, and original event references rather than only AI summaries. Log contents are untrusted data and cannot directly authorize configuration changes.

Closure requires a defined observation period and acceptance evidence, with recurrence retained. These rules still need a detailed SPEC. The existing [daily syslog scenario](../scenarios/daily-syslog-summary.md) demonstrates the first reporting step; it does not yet prove continuous follow-up or resolution.

## First-release selection

Retain all three outcomes in product planning. A suggested sequence is site-history reporting and event summaries first, then persistent follow-up, with controlled configuration delivery once its prerequisites are proven. This is a proposal for milestone review, not an accepted release commitment.

The previous device-status and inventory examples remain useful starter exercises and supporting tasks, but are no longer the headline agent set. Ship only the supported, tested depth of an agent; show limitations clearly rather than presenting unavailable capability as ready.

## First-use experience

1. Show the useful agents and an illustrative output sample for each.
2. Let the user select an agent and reuse existing NIMBL/provider setup. Request only missing essentials and describe why they are needed.
3. Review the target scope and relevant task options. Use prepared instructions, tools, skills where available, and output rules without requiring advanced settings.
4. Save the selected defaults, check readiness, and offer **Run**. No chat prompt is required. Show a precise next action if setup is incomplete.
5. Make the result and saved file location the main view, with optional chat and entry buttons for history, logs, and settings. Offer customization or optional scheduling after the user understands the result.

A user can preview an agent before connecting real data. Such previews must be visibly illustrative. Agent cards should distinguish **Needs setup**, **Ready**, and execution outcomes rather than claiming every shipped agent can run immediately on an unconfigured computer.

## What “ready out of the box” means

The application includes working agent definitions, required product-owned tools such as bundled bbcli, output preparation, and a tested path to the first result. Use an available local/site model by default, with guided readiness checks. External assistance is deferred beyond the first milestone and is not a fallback for initial starter agents. Model/provider selection should have a sensible available default; credentials and provider access may still be required. The provider distribution/authentication approach remains undecided.

Users should not need to install bbcli separately, author a skill, construct a harness, choose tools manually, or edit configuration files to run a starter agent. Connection and credential setup is guided and reused. No demonstration data should be presented as a real result, and no recurring task or device operation should start merely because the app was installed.

Starter agents and custom agents should follow the same execution, access, output, and history behavior. Starter setup follows the Add flow; the initial agent management scope is Add and Delete, without a separate copy action.

## Acceptance for a release

On a clean supported installation, an intended user can select a starter agent, complete only required connection/provider setup, run it without terminal commands or advanced settings, and find a verified useful result. Validate this with a representative user flow and record blockers before describing a starter as ready. No first-result time target has been measured yet.

Related: [Create your own agent](create-an-agent.md) · [Agent concepts](../concepts/agents.md) · [Daily syslog scenario](../scenarios/daily-syslog-summary.md)
