# Local AI

**Everyday work. Close to your data.**

Status: planned capability, not released functionality. POC 3. Delivery dates TBD. nimbls remains a development code name.

## Standard feature card

| Field | Description |
| --- | --- |
| Audience | Teams using approved on-site computing |
| Customer problem | Routine analysis may depend on external inference even when data and compute can stay on site. |
| Capability | Run supported models on your computer or an approved site server. Validate useful network and general-purpose workflows locally, with explicit model and hardware requirements. |
| Benefits | Keep routine inference on site; Use existing agent workflows; Demonstrate work beyond network operations |
| Deliverable | A locally generated network report and a document comparison with references to the supplied files. |
| Prerequisites | Provisioned local model, sufficient hardware, and compatible tool capabilities. Offline tasks need their dependencies available locally. |
| Proof required | Complete both representative workflows with no external inference requests; record supported hardware, model, and observed limitations. |
| Scope and limits | Local deployment does not automatically mean local inference. Hardware and operation have costs; do not promise zero cost or universal model quality. |

## Security advantages

### Keep sensitive inputs on site

For validated local-only workflows, prompts, supplied documents and network evidence are processed by a model on your computer or an approved site server, without sending them to an external inference provider.

### Reduce external data exposure

Keeping routine inference local reduces the number of external services that receive task content and the provider data-handling arrangements your team must assess for that workflow.

### Use infrastructure your team controls

Run inference within your approved environment, where your IT team can apply its own network access, identity, storage and retention controls. These protections depend on how the environment is configured.

### Keep external assistance a deliberate choice

Local-only work must not silently fall back to a cloud model. Controlled external assistance is planned separately for POC 6, with data-type review, permitted destinations and disclosure checks before enablement.

Local inference is one part of data protection. Agent tools, telemetry, updates and other integrations require separate network review. Local files and reports still need appropriate access controls, retention and backups. A local interface alone does not prove local processing or an air-gapped deployment.

## Customer scenario

> Use our local model to compare these documents and highlight the differences.

An operations team needs to summarize internal network events and compare confidential maintenance documents. It selects an approved on-site model, runs both tasks locally, and reviews the reports alongside evidence that no external inference request was made. If the model cannot finish a task, the intended local-only behavior is to report the limitation instead of silently sending the data to a cloud model.

## Workflow

1. **Configure:** Choose a supported model.
2. **Check:** Verify tools and readiness.
3. **Run locally:** Process approved inputs.
4. **Inspect:** Review the deliverable.

## 30-second sales explanation

“Put AI to work where your sensitive data already lives. Local AI is designed to analyze internal network evidence and documents using an approved on-site model, reducing exposure to external inference providers. Your team controls the surrounding infrastructure. We demonstrate the benefit by completing representative tasks and checking that no external inference requests occur; controlled external assistance is a separate future capability.”

## Three-minute demo outline

- **0:00–0:30:** Explain the customer problem and show the scoped request.
- **0:30–2:00:** Walk through the four workflow steps using a prepared representative case.
- **2:00–2:40:** Inspect the deliverable and its evidence: Complete both representative workflows with no external inference requests; record supported hardware, model, and observed limitations.
- **2:40–3:00:** Explain prerequisites and limits: Local deployment does not automatically mean local inference. Hardware and operation have costs; do not promise zero cost or universal model quality.

These are presentation slots, not execution-speed claims. Label mockups and pre-run examples. No validated runtime demo is implied.

## Visual use

The accompanying SVG is a workflow concept, not a product screen. Future screen illustrations must follow the canonical UI guide or be explicitly proposed as design changes before marketing adoption.
