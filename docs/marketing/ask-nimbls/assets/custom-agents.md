# Custom Agents

**Teach it your way. Put it to work.**

Status: planned capability, not released functionality. POC 1 · M1–M3. Delivery dates TBD. nimbls remains a development code name.

## Standard feature card

| Field | Description |
| --- | --- |
| Audience | Operators and teams with repeatable tasks |
| Customer problem | Useful work gets described from scratch, and each result needs the same corrections. |
| Capability | Start with a ready-to-use agent or describe a new one. Refine its instructions, tools, and output through conversation, then save the approach that meets your needs. Agents can serve general tasks as well as NIMBL workflows. |
| Benefits | Start from an included agent; Keep your preferred working method; Extend to tasks beyond NIMBL |
| Deliverable | A reusable agent with a defined task and inspectable output. |
| Prerequisites | A working model and the tools/data required by the task. NIMBL is needed only for NIMBL tasks. |
| Proof required | The saved agent survives restart and reuses the requested instructions; evaluate the report against known input records. |
| Scope and limits | Changing instructions is not model training or proof of better accuracy. The first POC validates the syslog workflow; other tasks require their own validation. |

## Customer scenario

> Create a daily syslog agent. Group repeated events and keep the source records.

A network operator starts with the included Daily Syslog Summary Agent, asks for a shorter priority summary, checks the revised report, and saves those instructions for tomorrow.

## Workflow

1. **Describe:** Define the task and inputs.
2. **Try:** Run a representative case.
3. **Refine:** Adjust and inspect the result.
4. **Save:** Reuse the working approach.

## 30-second sales explanation

“Start with a ready-to-use agent or describe a new one. Refine its instructions, tools, and output through conversation, then save the approach that meets your needs. Agents can serve general tasks as well as NIMBL workflows. The intended benefit is to help you start from an included agent. In a demonstration, we would show: Create a daily syslog agent. Group repeated events and keep the source records. The result is a reusable agent with a defined task and inspectable output.”

## Three-minute demo outline

- **0:00–0:30:** Explain the customer problem and show the scoped request.
- **0:30–2:00:** Walk through the four workflow steps using a prepared representative case.
- **2:00–2:40:** Inspect the deliverable and its evidence: The saved agent survives restart and reuses the requested instructions; evaluate the report against known input records.
- **2:40–3:00:** Explain prerequisites and limits: Changing instructions is not model training or proof of better accuracy. The first POC validates the syslog workflow; other tasks require their own validation.

These are presentation slots, not execution-speed claims. Label mockups and pre-run examples. No validated runtime demo is implied.

## Visual use

The accompanying SVG is a workflow concept, not a product screen. Future screen illustrations must follow the canonical UI guide or be explicitly proposed as design changes before marketing adoption.
