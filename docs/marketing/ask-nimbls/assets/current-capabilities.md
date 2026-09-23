# Ask nimbls: current development capabilities

Checked 2026-09-22 against the merged application source and recorded validation. **Available in the development build; no packaged product release is claimed.** nimbls remains a development code name. This inventory describes the current merged build, not every feature in the product roadmap.

## What you can ask today

| Capability | Example request | Current boundary |
| --- | --- | --- |
| Ask questions and work through supplied information | Explain this error message in plain English: … | Uses the configured model. Supply the relevant text in the conversation; the agent cannot retrieve arbitrary files, websites, or live network data. |
| Create and save a useful text result | Turn these notes into a handover document. | Saves durable results in the configured output folder within the workspace. Markdown, plain text, JSON and CSV are text outputs; PDF, Word, spreadsheet workbooks and image generation are not delivered by this tool. |
| Update a result in the current conversation | Add “backup verified” to the record you just saved. | Supports appending, prepending, full replacement and literal text edits; previous versions are archived. This is not automatic memory or file browsing. |
| Keep a response in chat | Summarize this, but do not save a file. | Explicit chat-only requests remain in chat. Ordinary questions do not create files by default. |
| Get model-profile guidance | Which profile should I use for this task? | Can explain high / medium / low. The user changes the configuration; the agent cannot apply settings itself. |

## Tools and skills: exact current status

- **Enabled agent tool: `write_output`.** Creates or updates UTF-8 text results. It is the only tool currently exposed to the agent runtime. The agent should confirm a saved path only after a successful write.
- **Built-in agent behavior:** task-oriented conversation, model-profile guidance, and automatic saving of durable results are supplied through the system instructions. These are not separately installed skills.
- **Agent skills and extensions:** loading is disabled in the current merged runtime. No bundled runtime skill should be advertised as available yet. Skills used by development assistants are not product capabilities.
- **Not enabled for the agent:** general file read/search/list tools, shell execution, application-management tools, NIMBL data retrieval or device changes, Google Workspace, and Microsoft 365.

## Supporting application features

These are implemented application or CLI functions, not additional tools the chat agent can invoke:

- Configure a workspace and an output folder within it.
- Configure high / medium / low model profiles and check provider readiness. Real requests with OpenRouter and Google are recorded; other provider entries are not a blanket compatibility guarantee.
- Inspect execution state and cancel active work.
- Sign in to NIMBL and inspect connection/session status. Authentication does not establish agent access to syslogs or devices.
- Read and list saved output through the application operations / CLI. Output browsing and pins in the desktop interface remain separate planned work.

## Evidence and delivery boundary

The existing validation record includes real-model chat and output writing, file-content read-back, follow-up edits, and 20 successful runs across 10 natural-language output-intent cases. [Output delivery tracking](https://github.com/bbtechhive/nimbls-public/issues/9) records the completed slice. These are prior development validations, not a new test run performed for this inventory or clean-install release certification.

Saved custom agents, active runtime skills, general file access, daily scheduling, full syslog reporting, site memory and the connected-service candidates remain later work. The macOS development environment is the validated starting point; packaged distribution and broader platform validation remain pending.

Use [the current roadmap](../roadmap.html) for planned delivery and [future capability candidates](../future-capabilities.html) for unassigned ideas. Re-check this inventory when agent tools, skill loading or acceptance evidence changes.
