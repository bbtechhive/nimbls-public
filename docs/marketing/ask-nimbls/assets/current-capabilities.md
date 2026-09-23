# nimbls — Development capability inventory

Checked September 23, 2026 against merged application revision `e269f31`. Development preview; not a packaged release or full Agent acceptance.

| Capability | Implemented boundary | Evidence level |
| --- | --- | --- |
| Agent management | Saved user Agents, protected Ask nimbls/Create Agent definitions, default tasks, manual Run, new sessions and scoped deletion | Source inspection; selected real UI lifecycle check rerun |
| Files and text outputs | Scoped read/write/edit/list/find/search; selected read-only inputs; formal text output and revisions | Real six-tool task and output read-back rerun |
| Application operations | Structured nimblscli bridge for supported operations, discovery and actual-result inspection | Source inspection; prior real management trials |
| Skills | Agent-scoped resource snapshots, built-in skill metadata and on-demand bodies | Source inspection and current automated checks |
| Memory foundations | Working files, instructions, retained sessions/execution evidence; explicit preferences and bounded exact-request observations | Source inspection, current automated checks and prior real preference/session trials |
| Optional evaluations | Isolated selected Agent/task/model cases with explicit usage approval, result/history/cancel and available usage estimates | Source inspection, current automated checks and prior real evaluation trials |
| Optional Bash | Separately enabled for user Agents on supported macOS hosts, with confinement and bounded execution | Source inspection, current automated checks and prior real Bash trial |
| NIMBL authentication | Sign-in/session state; no completed live network reporting or device-change workflow | Source inspection only in this review |

The runtime uses explicit guarded tools. Global skill discovery and extensions remain disabled; Agent skill loading is not disabled. Readiness does not prove execution success. New session retains files and records without replaying historical conversations. Repetition does not authorize permanent settings changes.

Pending: daily scheduling; default network Agents and collected site knowledge; full live syslog workflow; desktop output browsing and pins; local-model workflow validation; controlled external disclosure; supported device changes/rollback; certified binary-document workflows; packaged release and cross-platform acceptance. Optional evaluation infrastructure is not a claim that the Milestone 5 improvement workflow is complete.

See [dated validation evidence](development-evidence.md), [development preview](../current-capabilities.html) and [planned milestones](../roadmap.html). Current cloud-provider access is separate from future policy-controlled external assistance.
