# Execution Management

**See the work. Stay in control.**

Status: planned capability, not released functionality. Basics: POC 1 · Verified changes: POC 7. Delivery dates TBD. nimbls remains a development code name.

## Standard feature card

| Field | Description |
| --- | --- |
| Audience | People supervising agent work and device operations |
| Customer problem | A finished conversation does not prove that the task succeeded or a device reached the intended state. |
| Capability | Inspect progress, stop or rerun work, and distinguish successful results from incomplete attempts. Extend this foundation to authorized device changes with before/after verification. |
| Benefits | Understand what happened; Control active work; Verify results beyond a success message |
| Deliverable | A change record with authorized scope, before/after observations, per-device outcomes, and recovery needs. |
| Prerequisites | Supported NIMBL/bbcli operation, enforceable authorization, observable device state, and an operation-specific recovery plan. |
| Proof required | Prove scope enforcement, actual-state verification, and truthful partial-failure handling on a defined supported operation. |
| Scope and limits | Progress, Stop, rerun, and truthful failures start in POC 1. POC 7 does not promise universal autonomous repair or rollback support for every device operation. |

## Customer scenario

> Apply this supported change to these devices, then verify what actually changed.

An operator defines a supported change and device scope. The Device Change Agent explains the intended action, uses authorized operations, and checks actual state. Partial failures are reported separately with the required next steps.

## Workflow

1. **Define:** Specify scope and change.
2. **Authorize:** Check permitted operations.
3. **Execute:** Apply the supported action.
4. **Verify:** Inspect actual device state.

## 30-second sales explanation

“Inspect progress, stop or rerun work, and distinguish successful results from incomplete attempts. Extend this foundation to authorized device changes with before/after verification. The intended benefit is to help you understand what happened. In a demonstration, we would show: Apply this supported change to these devices, then verify what actually changed. The result is a change record with authorized scope, before/after observations, per-device outcomes, and recovery needs.”

## Three-minute demo outline

- **0:00–0:30:** Explain the customer problem and show the scoped request.
- **0:30–2:00:** Walk through the four workflow steps using a prepared representative case.
- **2:00–2:40:** Inspect the deliverable and its evidence: Prove scope enforcement, actual-state verification, and truthful partial-failure handling on a defined supported operation.
- **2:40–3:00:** Explain prerequisites and limits: Progress, Stop, rerun, and truthful failures start in POC 1. POC 7 does not promise universal autonomous repair or rollback support for every device operation.

These are presentation slots, not execution-speed claims. Label mockups and pre-run examples. No validated runtime demo is implied.

## Visual use

The accompanying SVG is a workflow concept, not a product screen. Future screen illustrations must follow the canonical UI guide or be explicitly proposed as design changes before marketing adoption.
