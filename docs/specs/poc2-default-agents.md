# Milestone 2 default agents — design and acceptance

Status: planned design; no implementation or delivery claim. Milestone 2 features map to GitHub issues #35–#38.


## Feature 1 — syslog-reviewer

Status: planned Milestone 2 milestone. This is a product definition, not released functionality. GitHub milestone links are listed below.

### Goal

Daily syslog review.

### Scope

Run scripts first to classify known patterns, deduplicate events and count changes by device and time. The agent reviews unmatched logs and unusual changes in known patterns, then retains useful, critical and anomalous findings.

### Workflow

1. **Collect:** Scoped NIMBL syslogs through bbcli.
2. **Classify:** Deduplicate and count. Keep device/time context.
3. **Review:** Unknown events + known patterns with unusual trends.
4. **Test patterns:** Replay retained cases. Approve, version, activate.

### Deliverables

Important findings, source references, trend counts, and tested pattern candidates.

### Acceptance

Replay known important events and frequency spikes. Compare findings, token use and elapsed time against full-log analysis; report misses and cost changes. Test candidate patterns on retained cases before human approval and versioned activation.

### Example review case

Illustrative input: A familiar link-down message suddenly appears much more often on one switch.

Expected behavior: The reviewer reports the frequency change even though the message matches a known pattern. A suggested pattern update remains a candidate until replay tests and approval.

### Dependencies

Milestone 1 syslog retrieval and saved scheduling; defined pattern format and replay cases.

### Boundaries

Known does not mean harmless. Compare cost and missed events before claiming an improvement.

Milestone 2 has one combined 2–3-week planning estimate across all four agents, subject to scope review. No per-agent dates are committed. General autonomous delegation is not included.


## Feature 2 — device-snapshot

Status: planned Milestone 2 milestone. This is a product definition, not released functionality. GitHub milestone links are listed below.

### Goal

Daily device snapshots.

### Scope

Use a script to capture a defined snapshot of every in-scope device and store it through a shared database interface. Compare snapshots; let the agent explain meaningful differences and recommend retention changes.

### Workflow

1. **Capture:** Script collects all in-scope device information.
2. **Store:** Shared database interface. Device IDs + capture times.
3. **Compare:** Separate real differences from collection failures.
4. **Explain:** Comment on useful changes. Retain incident evidence.

### Deliverables

Device snapshots, meaningful differences, and an explicit collection-status record.

### Acceptance

Retrieve snapshots across days with consistent device IDs and timestamps. Distinguish collection failure from device removal or no change. Apply explicit retention rules, preserving incident-linked evidence; do not silently delete it.

### Example review case

Illustrative input: One switch has a changed firmware field; another does not respond to collection.

Expected behavior: The report separates a confirmed field difference from a failed collection. It does not describe the unreachable device as removed or unchanged.

### Dependencies

Supported device-information retrieval; shared snapshot schema, storage interface and retention policy.

### Boundaries

Cleanup follows retention policy. Daily snapshots bound a change in time; they do not pinpoint it.

Milestone 2 has one combined 2–3-week planning estimate across all four agents, subject to scope review. No per-agent dates are committed. General autonomous delegation is not included.


## Feature 3 — incident-investigator

Status: planned Milestone 2 milestone. This is a product definition, not released functionality. GitHub milestone links are listed below.

### Goal

Evidence-backed incident investigation.

### Scope

On request, combine retained syslog findings, device snapshots and previous cases into an incident timeline. Cite evidence, explain possible causes and identify missing information.

### Workflow

1. **Scope:** Choose the device, issue and time window.
2. **Retrieve:** Syslog findings, snapshots and relevant prior cases.
3. **Compare:** Build a timeline. Test similarities and gaps.
4. **Explain:** Cite possible causes. Suggest what to verify next.

### Deliverables

A sourced incident timeline, hypotheses, evidence gaps, and next checks.

### Acceptance

Investigate a switch with repeated link interruptions. Retrieve matching source/time references, compare device changes and distinguish hypotheses from proven causes. Daily snapshots only bound a change between captures.

### Example review case

Illustrative input: A switch has repeatedly disconnected since the last maintenance window.

Expected behavior: The investigator compares events and snapshots, identifies what evidence overlaps, and states which missing observation would help confirm or reject a hypothesis.

### Dependencies

Retained Feature 1 findings and Feature 2 snapshots with common device IDs and timestamps.

### Boundaries

A hypothesis is not a proven root cause. This investigation does not authorize device changes.

Milestone 2 has one combined 2–3-week planning estimate across all four agents, subject to scope review. No per-agent dates are committed. General autonomous delegation is not included.


## Feature 4 — ask-nimbls

Status: planned Milestone 2 milestone. This is a product definition, not released functionality. GitHub milestone links are listed below.

### Goal

Site operations entry point.

### Scope

Extend the existing Milestone 1 agent to answer site-history questions, inspect daily-agent outcomes, initiate a scoped investigation and help refine schedules or review candidate patterns. Daily jobs continue independently on their schedules.

### Workflow

1. **Understand:** Clarify the question and requested scope.
2. **Check records:** Read site history and latest job outcomes.
3. **Investigate:** Start a scoped task through explicit operations.
4. **Respond:** Track progress and result. Cite evidence and failures.

### Deliverables

One entry for site questions, investigation results, and guided improvements.

### Acceptance

Ask what changed yesterday, why a switch is disconnecting, and whether daily jobs finished. Show current results and failures with sources. An initiated investigation retains its scope, progress and outcome through an explicit execution interface.

### Example review case

Illustrative input: “What changed yesterday, and did the daily agents finish successfully?”

Expected behavior: Ask nimbls returns sourced changes and the latest outcomes. If investigation is requested, it exposes the scoped task and its progress instead of hiding a failure behind an older report.

### Dependencies

The existing Milestone 1 Ask nimbls agent and inspectable Feature 1–Feature 3 operations and results.

### Boundaries

Daily agents run on their own schedules. Ask nimbls is extended, not recreated or used as a daily dispatcher.

Milestone 2 has one combined 2–3-week planning estimate across all four agents, subject to scope review. No per-agent dates are committed. General autonomous delegation is not included.


## GitHub feature tracking

- [syslog-reviewer](https://github.com/bbtechhive/nimbls-public/issues/35)
- [device-snapshot](https://github.com/bbtechhive/nimbls-public/issues/36)
- [incident-investigator](https://github.com/bbtechhive/nimbls-public/issues/37)
- [ask-nimbls site operations](https://github.com/bbtechhive/nimbls-public/issues/38)
