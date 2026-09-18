# Create an agent: example requests

Status: Proposed user experience, not instructions for a released application. Examples use fictional descriptions and do not imply that every NIMBL data field or integration has been verified.

If a prepared agent fits your need, start with a [starter agent](starter-agents.md). Creating a custom agent is optional.

## Start with what you want done

You should not need to write code or configure a harness. Describe the work and the result you want. Include a timing preference if you have one; nimbls should help resolve missing details.

A useful starting sentence is:

> Create an agent that [does this work] for [these devices or sources], [when needed], and produces [this result].

You can write a short request first and refine the proposed setup through conversation. You do not need to name a model or tool.

## Requests for the proposed starter roles

- **Site history:** “Review this site’s settings and status daily. Compare changes with our verified normal state and retain evidence for handover and troubleshooting.”
- **Configuration delivery:** “Help plan this site’s configuration change, show its impact and acceptance checks, and wait for approval before any supported device change.”
- **Event follow-up:** “Track recurring syslog problems across days, retain the actions taken, and check whether they return after a fix.”

See [starter-agent scope](starter-agents.md) for the proposed capabilities and release limits. The smaller examples below illustrate individual tasks within or alongside these roles.

## Copyable examples

### Daily syslog summary

> Create an agent that reviews yesterday’s syslogs for the devices I select. Find anomalies, critical events, alerts, and important operations. Group repeated events and recommend what needs attention. Run every day at 08:00 in Asia/Taipei and save a Markdown report under syslogs/ named {date}-syslog-summary.md, using the date being analyzed. Show me a sample before creating it.

Expected proposal: a reusable syslog agent, scoped log access, a daily task, and an evidence-backed report. The assistant still needs a NIMBL connection and device selection. See the [complete scenario](../scenarios/daily-syslog-summary.md).

### Device status report on demand

> Create an agent that checks the current status of devices I select and explains which ones need attention. Run only when I ask. Save a concise Markdown report under reports/ with the check time, unavailable devices, and supporting observations. Do not change device settings.

Expected proposal: read-only access and manual execution. Which status fields can be checked depends on the verified NIMBL/CLI capabilities.

### Device inventory export

> Create an agent that lists the devices in my selected scope and saves a CSV inventory under reports/inventory/. Include device name, identifier, and any model or version information available. Show missing values clearly. Run when I ask and show me a sample CSV first.

Expected proposal: inventory retrieval and CSV output. The new subfolder and supported fields should appear in the review; unavailable fields should not be invented.

### Configuration-change review

> Create an agent that reviews available configuration-change records from the previous day. Summarize what changed, when, and which devices were affected. Save the report under audits/. Highlight changes that need human review and do not make changes itself.

Expected proposal: a read-only audit report, conditional on access to suitable change records. The assistant should explain missing source support. It should not claim a change was authorized without evidence of authorization.

## Review the proposed agent

The creation report should explain:

| Item | What you review |
| --- | --- |
| Name and purpose | Does the agent understand its ongoing role? |
| Model suggestion | Is it an available local/site model, and why is it suitable? External assistance is deferred beyond the first milestone. |
| Data routing | Local only for the initial scope; future external assistance will require a separate disclosure policy. |
| Tools and skills | What capabilities and procedures does the agent need? |
| Access | Which NIMBL source, devices, and actions are allowed? |
| Timing | On demand or scheduled; if scheduled, time, timezone, and reporting period |
| Output | Format, destination, filename rule, content, and an illustrative sample |
| Readiness | Any missing connection, provider setup, or capability |

Advanced settings can expose detailed instructions and limits without making them compulsory steps for every user.

## Start a fresh discussion

Use **New session** to start a fresh conversation with the assistant. Saved agent settings, its default task, schedules, past executions, and result files remain available. Previous conversation messages and unconfirmed proposals are not automatically included in the new conversation.

The action does not stop running tasks or delete their results. If a proposal has not been saved, the assistant should explain what will be left behind before resetting. Full session browsing and branching are outside the initial scope.

## Refine it in ordinary language

Examples of follow-up requests:

- “Only include critical events in the opening summary.”
- “Show repeated events as one finding with a count.”
- “Save this under reports/network/ instead.”
- “Use a shorter report, but keep references to the original events.”
- “Run manually for now; do not enable the daily schedule yet.”

nimbls should update the proposal and sample before you confirm. Samples must be labeled as illustrative; they do not prove the agent can access real data.

## Improve the agent by trying real work

The POC should make this a conversational loop: **describe → review sample → try → give feedback → try again → save and schedule**.

For example, after the syslog trial, say “Compare this with the previous seven days” or “Group repeated events and shorten the opening summary.” The creation-agent should revise the relevant instructions, tools, skills, and output rules, then try the changed task in the selected test environment. It must explain unavailable historical data rather than invent a comparison.

Users can select or generate skills, add custom tools or supported MCP connections, and adjust model selection without constructing a harness themselves. Exact integrations depend on the chosen runtime and remain unimplemented. Save a satisfactory agent for repeated use, or ask to schedule its work.

## Confirm, prepare, and try it

After confirmation, the intended flow is to create the agent setup, prepare the output destination, and check readiness. Any missing prerequisite should have a clear explanation. The user can save without running or explicitly choose to confirm and try in the selected environment. A clear request to run does not need a redundant second confirmation.

A first real execution should show which data was retrieved, whether coverage was complete, and where the output was saved. “No findings” must be distinguishable from “data could not be retrieved.” Scheduled local work also depends on the application and computer being available; exact background behavior remains under design.

Related: [Agent concepts](../concepts/agents.md) · [Daily syslog scenario](../scenarios/daily-syslog-summary.md)
