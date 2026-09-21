# POC 2 — Default agents and site knowledge

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
