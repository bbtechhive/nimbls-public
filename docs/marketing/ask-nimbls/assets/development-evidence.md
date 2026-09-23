# Development evidence — September 23, 2026

**Source baseline:** merged application revision `e269f31`. **Environment:** macOS 26.5.2 arm64, Electron 44.4.2, Pi 0.86.1. All fresh checks and captures below were produced from a separately built, detached checkout of this exact revision, excluding concurrent unmerged changes. No application code was changed for this website review. This is a bounded development check, not full Agent acceptance, a customer deployment, or a packaged product release.

## Fresh checks in this review

| Check | Observed result | What it establishes |
| --- | --- | --- |
| TypeScript check | Passed | Current source passes static typing |
| Unit/integration suite | 192 passed across 27 files | Existing deterministic tests passed on this source baseline |
| Desktop build | Passed | Development application builds on this machine |
| Real six-tool Agent task | Passed once | Read/write/edit/grep/find/ls and formal output were recorded successful; output content and attribution matched read-back and disk; source input and sibling Agent file stayed unchanged |
| Real Agent UI lifecycle | Passed once | Two same-name Agents were created; intended saved task ran; protected-system deletion was disabled; session reset, external state refresh and selected deletion were checked |
| Real chat output | Passed once | Explicit tool request produced the exact expected text file; application read-back and disk content matched with Agent attribution |
| Natural-language follow-up append | Passed once | Requested addition retained original content, saved file matched read-back and attribution, and the previous version remained archived |
| Natural-language reusable checklist | Passed once | A request without save/tool wording created a saved text file with the requested topic markers; read-back and disk content matched |

The two natural-language cases establish bounded intent/persistence behavior. The generated checklist was not reviewed for operational correctness and is not published as device-maintenance guidance.

Real requests used OpenRouter: the six-tool trial configured `anthropic/claude-sonnet-5`; the isolated UI and output/intent tests used the default `anthropic/claude-haiku-4.5` profile. No real network/device data was used and no device was changed. All five selected tests completed without skips or retries. Test durations in the JSON are whole test timings, not product response-time promises.

[Machine-readable sanitized results](development-evidence.json).

## Actual captures and exact output

- [Agent list](development-agents-live.png): actual captured development UI with synthetic same-name Agents. Captured before manual Run; the remaining lifecycle was checked afterward.
- [Output confirmation](development-output-live.png): actual captured conversation after the explicit controlled write request. It is not a natural-language usability benchmark.

The output test independently verified exactly:

```text
# Output tool verified
Live Pi execution.
```

The file ends in a newline. The screenshot alone is not the proof of filesystem persistence; independent read-back assertions supply that check. Images are unedited captures; they contain no credentials or customer/device records.

## Source inspection

The merged runtime enables guarded basic file tools, text output publication, a structured application-operation bridge and optional macOS Bash. Built-in and user-Agent resource snapshots feed skills metadata into the runtime; skill bodies are loaded on demand. Global discovery and extensions remain disabled. The application owns saved Agents, resources, explicit preferences, retained executions and isolated evaluation operations. The desktop connects Agent management and evaluation controls to that service. Output browsing remains an unfinished view; scheduling and a complete live NIMBL data workflow are not delivered by this review.

## Prior evidence, not rerun here

Existing engineering records contain real Agent creation/refinement, preference recall/correction/forgetting, scoped memory across workspaces, retained sessions, application management, confined Bash, isolated evaluations and a macOS development-bundle tool probe. They also retain failed and incomplete attempts. Those records informed the source review but are not fresh passes in this report. Their full acceptance reconciliation remains open even though the implementation is merged.

## Limits

No general model-quality, universal task, security certification, local-inference, full network workflow, scheduling, supported device rollback, signed installer or cross-platform readiness claim follows from these checks. External-provider access does not establish the planned Milestone 6 data-disclosure controls. Optional evaluations do not make the complete Milestone 5 improvement workflow finished. Unmerged follow-up changes are excluded.

[Current inventory](current-capabilities.md) · [Development preview](../current-capabilities.html) · [Roadmap](../roadmap.html)

## Website verification in this review

All 22 pages were inspected at a 390px viewport for document overflow, heading count and shared navigation. The milestone evolution uses seven readable 16px-text cards on mobile. Representative homepage, preview, resources and diagram layouts were visually inspected. The 10/15-day planner scenarios produced 70/105 working days and monthly switching worked; feedback preparation changed the workflow prompt without posting anything. Local HTML/asset/anchor checks covered 621 references with no missing targets; new Markdown links, SVG XML and cache hashes passed. Three download archives passed integrity and byte-for-byte source parity checks after regeneration. No GitHub feedback issue was submitted.
