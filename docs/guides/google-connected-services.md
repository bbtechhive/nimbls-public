# Google connected services

Development preview, updated 2026-10-05. Not a released integration. Local automated tests cover the application flow with synthetic Google and model responses, including an unsigned macOS package. Real Google sign-in and bounded access checks passed for Gmail, Calendar and Drive on one development account. One cross-service meeting briefing passed with a real model using newly created synthetic Google records after explicit disclosure approval. This is a scoped development test, not broad reliability or release acceptance. Windows and Linux are unverified.

## What this preview supports

Connect Google accounts so an Agent can search and read Gmail messages and threads, list calendars and events, and find files in Drive. Supported file content includes Google Docs and Slides text exports and uploaded plain text, Markdown, CSV and JSON. Sheets, PDF parsing, attachments, sending mail and modifying cloud data are outside this preview.

The product team supplies Google application configuration. Users sign in through their browser; they should not need to create a Cloud project, install a separate CLI or paste tokens.

## Connect an account and try a task

1. Tell Ask or Create agent what you want to do, for example “Create a personal assistant for Gmail and Calendar.” The assistant can prepare the Agent before connecting.
2. Use the **Connect services** card in the conversation. It reuses an existing account; choose which account when several exist. Complete Google sign-in in the browser.
3. Select the services you allow, review the application-wide notice, and choose **Allow**. This applies to all Agents and configured model profiles; each Agent does not need another approval. Credentials belong in the browser, never the conversation.
4. After approval, the conversation resumes the task. Check a small result and its sources. **Check services** records access results separately from sign-in status.
5. For a longer setup, the optional saved progress guide tracks requirements, integration, sign-in, checks, tools, a trial and completion. Skipping a trial is labelled unverified. The dedicated **Connections** page is available for account management.

Example acceptance task: “Prepare tomorrow’s meetings, find related emails and documents, and include sources. Explain any missing information.” A development test of this scenario correctly distinguished an unsent budget proposal from the baseline document and identified missing approval and deadline information.

## Manage connections

Open **Connections** in the main navigation. Each service appears once, with its saved accounts and access states; choose **Connect** or **Manage** to open an account. Use **All connections** to return. Add another Google account only when you need a separate account.

In an account, sign in first, then choose **Allow**. An account entry stays tied to its original Google identity after disconnect. Use Add account for a different identity; older disconnected entries with no verifiable identity also need a new entry. The button changes to **Disallow** after approval. **Service status & maintenance** contains checks, pause, disconnect and removal of unused entries. **Advanced settings** on the overview can pause an entire service. The conversation Connect card remains available when an assistant needs access during a task.

## Understand status and recovery

Agents distinguish **authenticated** (saved provider sign-in) from **approved** (app permission for the services needed by the task). They can offer to open Connect for sign-in or show the Allow card. Paused access needs resuming, not another login; missing provider permissions require reviewing those services. When both permissions are ready, the Agent should continue without asking again. These states are available through nimblscli; they do not establish live service health.


Each service distinguishes sign-in needed, permission needed, not checked, verified, check again, unreachable and paused. Refreshing the displayed status does not itself contact Google; **Check services** performs the access check.

Guides survive application restarts and resume after fresh checks. A removed Agent or a different workspace requires attention; the saved task remains available. An interrupted sign-in starts again rather than reusing an old authorization code. Work does not continue while the application is closed.

Pause an account or its installed integration to stop new use. Disconnect removes this application’s local credentials; it does not claim to revoke the grant at Google.

## Model sharing and saved results

Google sign-in and app access are separate decisions. App access allows selected services for all Agents and all configured model profiles, including data processing by their configured providers. Changing an Agent or model profile does not require repeating this approval. Adding services or changing the connected account requires review. Existing narrow model approvals are not automatically widened; the user must confirm app access. The Agent cannot approve for the user.

Choose **Disallow** to revoke app access. This stops subsequent sends through the controlled application flow. It cannot recall data already sent to the model provider. Managed outputs and retained Agent content keep their source restrictions; revocation does not turn prior content into unrestricted data. Manually copied files outside the application’s managed records are outside that guarantee.

## Other integrations and product names

NIMBL now appears as a connector using its existing single server and bbcli session. The same app-access policy applies. Checking the NIMBL session and server reachability does not verify permission for every device command. All delivered connection controls are also available through nimblscli.

Microsoft services are next in the design direction. A test adapter checks shared metadata contracts; there is no usable Microsoft connector in this preview. Arbitrary plugin installation and Agent-generated connectors remain future work.

The display name is configurable for nimbls or aaagents. Changing it does not rename stable connection IDs, the nimblscli command or the Google consent screen. The consent screen belongs to the configured Google application.

An Agent does not need its own account entry. Setup reuses an existing signed-in connection. Use Add another Google account only when you want another account; no preliminary name is required. Never-used entries can be removed from connection management. This removes the local entry, not the Google account; entries with authorization history or saved setup guides are preserved.

## Multiple accounts

Google Workspace can contain personal and work accounts. Add another account within the Google section; NIMBL keeps one shared network connection. Edit a Google connection’s **Account name** to distinguish its purpose. A verified email appears after a sign-in that supplies email identity; older connections use their saved name and a short identifier.

Use **Accounts for this conversation** to select task sources. A service with one usable account is selected automatically; multiple usable accounts require a choice. Select more than one only for cross-account work. The choice stays across turns and is recorded with executions, so the same session can restore it after a restart. New session resets the choice. If a selected account loses access, restore it or change the choice explicitly; no other account is substituted. App-wide Allow still applies to every Agent. Task selection limits new connector reads, not content already in the conversation.

CLI callers can pass `connectionIds` to `execution.start` and inspect `selectedConnectionIds` in `execution.status`. Repeat the explicit IDs on subsequent CLI task turns. Scheduling an ambiguous service does not choose an arbitrary account.

Conversations that have read connected-account data cannot save that content into schedules or other configuration stores without source tracking. Use a new conversation or the user controls for those changes. Source-labelled Agent definitions, resources, saved outputs and visible handoffs preserve their restrictions.
