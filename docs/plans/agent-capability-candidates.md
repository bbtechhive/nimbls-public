# Future agent capability candidates

Updated: 2026-09-22. **Candidate backlog — not released, not scheduled, and not a commitment to support every named service.** nimbls is a development code name; final branding is undecided.

We want agents to help with everyday work across the tools people already use. Google Workspace and Microsoft 365 are the initial user-proposed candidates. The other categories below are additional suggestions for evaluation, not accepted delivery commitments.

These candidates complement the [seven-Milestone roadmap](../../MILESTONES.md). They are not included in its existing duration estimates, and their placement has not been decided. General productivity agents would not require a NIMBL connection.

## Google Workspace

**Origin:** Your suggestion. **Status:** Candidate; unscheduled.

Bring your email, calendar, and files into one useful briefing.

- **Potential scope:** Gmail, Google Calendar, Drive, Docs, Sheets, and Slides.
- **Example request:** “Summarize customer emails, check tomorrow’s meetings, and find the documents I need.”
- **Useful results:** Email summaries, draft replies, meeting preparation, and document lookup.
- **Readiness:** Existing Pi integrations identified; nimbls compatibility remains untested.

## Microsoft 365

**Origin:** Your suggestion. **Status:** Candidate; unscheduled.

Turn everyday office information into a clear next step.

- **Potential scope:** Outlook mail and calendar, OneDrive, SharePoint, Teams, and Excel.
- **Example request:** “Prepare me for tomorrow’s customer meeting using relevant emails, files, and team updates.”
- **Useful results:** Meeting briefs, email drafts, shared-file search, and spreadsheet summaries.
- **Readiness:** Microsoft Graph is a candidate integration route; connector selection and nimbls validation are pending.

## Web research

**Origin:** Additional suggestion. **Status:** Candidate; unscheduled.

Get a sourced answer without opening dozens of tabs.

- **Potential scope:** Public websites, product documentation, and news sources.
- **Example request:** “Compare these three products and give me a short brief with source links and dates.”
- **Useful results:** Research briefs, product comparisons, and summaries of changes on selected pages.
- **Readiness:** Suggested for evaluation; source access, freshness, and citation quality need validation.

## Documents & spreadsheets

**Origin:** Additional suggestion. **Status:** Candidate; unscheduled.

Turn scattered files into something you can use.

- **Potential scope:** User-selected PDFs, text documents, spreadsheets, and CSV files.
- **Example request:** “Compare these proposals and turn the prices, differences, and open questions into a table.”
- **Useful results:** Document comparison, data cleanup, summaries, and reusable reports.
- **Readiness:** Suggested for evaluation; builds on the planned document-comparison direction. Format support and output quality need validation.

## Team chat & task tracking

**Origin:** Additional suggestion. **Status:** Candidate; unscheduled.

Turn conversations into follow-ups people can act on.

- **Potential scope:** Potential services include Slack, Teams, Jira, Asana, and Trello; the final service list is undecided.
- **Example request:** “Summarize this project discussion and draft follow-up tasks with owners and due dates.”
- **Useful results:** Discussion summaries, task drafts, and project status updates.
- **Readiness:** Suggested for evaluation; start with one chat service and one task service. Teams overlaps with Microsoft 365.

## Customer & CRM follow-ups

**Origin:** Additional suggestion. **Status:** Candidate; unscheduled.

Prepare the next customer conversation with the right context.

- **Potential scope:** Potential services include HubSpot or Salesforce, alongside a connected email account.
- **Example request:** “Review this customer’s recent activity and draft a follow-up with the next steps.”
- **Useful results:** Customer briefs, follow-up drafts, and proposed CRM updates.
- **Readiness:** Exploratory candidate; choose a service and validate account access and supported actions first.

## Suggested first demonstrations

For initial evaluation, start with an email-and-calendar briefing for each ecosystem and a comparison of user-selected documents. These produce visible, reviewable results and give us concrete cases for checking relevance, sources, account setup, and output quality. This is a prioritization suggestion, not a change to the existing roadmap.

Expand to sending messages, changing events, updating tasks, or editing CRM records only after the supported actions, authorization, and result verification are defined and tested. Recurring briefings also depend on the separately planned scheduling capability.

## From candidate to delivery

Before assigning a milestone, choose a narrow customer scenario and supported services; evaluate reusable tools; confirm setup, licensing/cost, account permissions and data handling; then test the complete flow in nimbls with a real account. Verify useful results, source references, failures, and any external changes. Record the evidence and scope before describing it as supported.

Online services still require network access even when the agent or model runs locally. Local inference does not mean Gmail, Microsoft 365, or other connected services operate offline. Broader app coverage, account types, and unattended actions remain to be assessed.

## Integration evidence

Source review on 2026-09-22; documentation evidence only, with no nimbls integration test:

- [Pi Radius extensions](https://radius.earendil.com/docs/extensions) document an optional `@earendil-works/pi-radius-work` package with Google Workspace access. Evaluate its authentication, dependencies, service coverage, and compatibility with nimbls before selecting it.
- [pi-skills](https://github.com/badlogic/pi-skills) lists Gmail, Google Calendar, and Google Drive skills backed by separate CLI tools. This is another reuse candidate, not bundled nimbls functionality.
- [Microsoft Graph overview](https://learn.microsoft.com/en-us/graph/overview) documents APIs for Microsoft 365 services including Outlook, calendars, OneDrive, SharePoint, Teams, and Excel. This provides a possible integration route; it does not establish a ready-made Pi or nimbls connector.

The remaining service names are examples of candidate scope, not verified integrations or vendor partnerships.
