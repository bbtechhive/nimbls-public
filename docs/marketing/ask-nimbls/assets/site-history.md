# Site History & Knowledge

**Every incident adds context.**

Status: planned capability, not released functionality. POC 2. Delivery dates TBD. nimbls remains a development code name.

## Standard feature card

| Field | Description |
| --- | --- |
| Audience | Network operators and incident investigators |
| Customer problem | Important observations and previous resolutions are scattered across logs, reports, and people. |
| Capability | Retain important observations, syslogs, changes, and investigation findings under defined retention rules. Retrieve the evidence when a new issue appears, with its source and time context. |
| Benefits | Reuse previous investigations; Compare current and past conditions; Keep conclusions tied to evidence |
| Deliverable | An incident timeline and a comparison with previous cases, including source references and unresolved questions. |
| Prerequisites | Accessible historical records, retention rules, identity/time consistency, and supported retrieval operations. |
| Proof required | Seed known historical events, retrieve them across executions, and check source/time references. Missing evidence remains explicit. |
| Scope and limits | Saving reports alone is not historical understanding. A similar event or correlated change does not establish root cause. |

## Customer scenario

> Has this issue happened before? What changed before it started, and what helped last time?

An operator investigates recurring link interruptions. The Site History Agent retrieves a previous incident and relevant observations; the Incident Investigation Agent compares the timelines and identifies which similarities are supported by evidence.

## Workflow

1. **Retain:** Keep scoped observations.
2. **Retrieve:** Find relevant past events.
3. **Compare:** Connect changes and timing.
4. **Investigate:** Cite evidence and gaps.

## 30-second sales explanation

“Retain important observations, syslogs, changes, and investigation findings under defined retention rules. Retrieve the evidence when a new issue appears, with its source and time context. The intended benefit is to help you reuse previous investigations. In a demonstration, we would show: Has this issue happened before? What changed before it started, and what helped last time? The result is an incident timeline and a comparison with previous cases, including source references and unresolved questions.”

## Three-minute demo outline

- **0:00–0:30:** Explain the customer problem and show the scoped request.
- **0:30–2:00:** Walk through the four workflow steps using a prepared representative case.
- **2:00–2:40:** Inspect the deliverable and its evidence: Seed known historical events, retrieve them across executions, and check source/time references. Missing evidence remains explicit.
- **2:40–3:00:** Explain prerequisites and limits: Saving reports alone is not historical understanding. A similar event or correlated change does not establish root cause.

These are presentation slots, not execution-speed claims. Label mockups and pre-run examples. No validated runtime demo is implied.

## Visual use

The accompanying SVG is a workflow concept, not a product screen. Future screen illustrations must follow the canonical UI guide or be explicitly proposed as design changes before marketing adoption.
