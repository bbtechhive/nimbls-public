# UI guide

Status: UI baseline, updated 2026-09-21. The desktop foundation and component integration are implemented; live agent execution and the full POC workflows remain unvalidated. This guide includes both current layout and planned interactions; it does not claim all described behavior is delivered. `nimbls` is a development code name, not approved branding.

## Sources and scope

Brand reference: **BlackBear_1013_Brand Guidelines.pdf**, October 2022, 44 pages. Relevant sections: logo (pp. 10–16), palette and usage (pp. 20–22), and typography (pp. 24–27). The original release describes it as a marketing guide and recommends logo placement and primary colors as software UI references. This draft adapts those references to an application; it does not claim a newer brand standard has been verified. The source PDF is not redistributed here.

The [macOS syslog POC SPEC](../specs/macos-syslog-poc.md) owns behavior and milestone scope. The [broader function design](../specs/fundamental-function-blocks.md) owns later product direction. This guide adds visual and interaction conventions without expanding M1–M3.

## Experience principles

- Open on **Chat**, with Ask nimbls and startup guidance cards. Keep agent management, outputs, and configuration in separate tabs. Ready-agent saved-task execution remains available as its capability is delivered.
- Start from useful prepared agents. Show missing setup with a named corrective action, such as **Connect NIMBL** or **Set up model**.
- Make the next step clear through **create → try → modify → save → schedule**. Reveal advanced configuration only when needed.
- Keep file contents and execution outcome separate. An older report must never disguise a failed latest attempt.
- Use plain task language. Ordinary flows do not require knowledge of the runtime, CLI, or configuration files.

## Brand and color

Use a light, predominantly white application with black text, restrained yellow emphasis, and neutral surfaces. Keep decoration outside reading and working areas. Do not assign subsidiary brand colors to arbitrary agent identities.

### Source values and inconsistencies

| Reference | Value recorded in the source | Proposed application use |
| --- | --- | --- |
| Primary black | `#000000` | Main text and icons |
| Primary yellow | `#E8C236` | Primary action fill and selected accents |
| White | `#FFFFFF` | Main canvas and report surface |
| Dark gray | `#A7A8A9` | Decorative use; insufficient for normal text on white |
| Warm gray | `#D7D2CB` | Optional neutral surface |
| Blue gray | `#DDE5ED` | Optional neutral surface |
| Cool gray | `#CCCCCC` on p. 20; `#E6E6E6` on p. 21 | Use explicit token values rather than the ambiguous name |

The yellow hex and RGB entries disagree: `#E8C236` equals RGB 232, 194, 54, whereas the printed RGB 250, 199, 0 equals `#FAC700`. **Use `#E8C236` provisionally**, pending design-team clarification. This is an application proposal, not a correction to the source.

Page 22 permits yellow backgrounds, titles, icons, and charts, but not body text; it does not permit black page backgrounds. Keep the initial theme light. Color use in controls and semantic statuses is an application adaptation, not a rule explicitly defined by the marketing guide.

### Proposed semantic tokens

Use a shared token layer so resolving source ambiguities does not require editing individual screens.

| Token | Value | Rule |
| --- | --- | --- |
| `background`, `surface` | `#FFFFFF` | Default canvas and content |
| `surface-muted` | `#F2F2F2` | Secondary regions; source extended neutral palette |
| `foreground` | `#000000` | Primary text |
| `muted-foreground` | `#666666` | Secondary text on white or `#F2F2F2` |
| `primary` | `#E8C236` | Run, Save, and the one main action in a region |
| `primary-foreground` | `#000000` | Always dark text on yellow |
| `border-subtle` | `#CCCCCC` | Decorative separators only |
| `control-border` | `#808080` | Input boundaries on white/light surfaces |
| `focus-ring` | `#000000` | Visible outline with a light offset |
| `success` | `#166534` | Proposed semantic text/icon, paired with a label |
| `warning` | `#854D0E` | Proposed semantic text/icon, paired with a label |
| `destructive` | `#B91C1C` | Proposed error/destructive text/icon |
| `info` | `#1D4ED8` | Proposed informational text/icon |

Semantic status colors are additions for software use, not subsidiary brand assignments. Use them on white in the initial design and verify other backgrounds before use. Yellow alone does not mean warning. Never rely on color alone: show labels such as **Running**, **Needs your answer**, **Failed**, or **Paused**.

Use normal text contrast of at least 4.5:1. Black on the proposed yellow is about 12.2:1; white on that yellow is about 1.7:1 and must not be used for button text. A pale divider cannot be the only way to identify an input. These are palette calculations, not an app accessibility audit. [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## Typography and assets

The source specifies **Krona One** for brand-led titles (p. 24), **Arial** as fallback (p. 25), and **Noto Sans** for additional languages including Chinese (p. 26). Use Krona One sparingly for a brand heading or welcome message. Use readable sans-serif text for controls, agent names, and reports.

Proposed body stack: `Arial, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`. Bundle any chosen redistributable font locally with its license; do not require a font CDN for the desktop UI. Verify actual Traditional Chinese glyph coverage and fallback on each supported platform.

| Role | Proposed size / line height | Weight |
| --- | --- | --- |
| Page title | 24 / 32 px | 700 |
| Section title | 18 / 26 px | 700 |
| Body and controls | 14 / 22 px | 400 or 500 |
| Report body | 16 / 26 px | 400 |
| Supporting metadata | 12 / 18 px | 400 |

These sizes are application choices. Do not copy the PDF's print point sizes into interface controls. Allow text zoom and wrapping; keep essential information out of truncated-only text. Use tabular numerals for timestamps and counters and monospace only for technical values or source excerpts.

Use the supplied official logo artwork when available; do not redraw it. The two-color logo stays black/yellow on white or light gray, without recoloring, gradients, or patterns (p. 10). For the logo without slogan, preserve at least one quarter of the icon height as clear space; prefer one half (pp. 11–13). The source lists print minimum sizes in millimeters (p. 16); a digital minimum is not established by this draft. Validate screen legibility using the real vector asset before implementation. Keep the compact application header free of a slogan.

## Layout and component conventions

Use a 4 px spacing unit, with 8, 12, 16, 24, and 32 px steps. Start with 24 px page padding, 16 px between sections, 8 px between related controls, 6 px control corners, and 8 px panel corners. These are proposed UI defaults.

Use four main tabs: **Chat**, **Agents**, **Output**, and **Configuration**. This user-confirmed layout supersedes the earlier compact agent sidebar and result-first landing proposal.

- **Chat** is the default landing page: Ask nimbls conversation, a welcoming empty state, startup guidance cards, and an input composer. Initial cards guide model setup, NIMBL connection, agent creation, and discovering capabilities. Starting a conversation replaces the welcome area with messages.
- **Agents** is a table with agent name, task summary, status, and **Talk**, **Output**, **More → Delete** actions. **Add Agent** opens a conversation with create-agent. Talk opens the selected agent's conversation. Show an honest empty state when no agents exist.
- **Output** browses shared results; an agent's Output action opens this tab filtered to that agent. Preserve the distinction between a report file and the latest execution outcome.
- **Configuration** provides manual provider, NIMBL, and application settings even when model connectivity is unavailable.

Use one **AgentChat** interface for Ask nimbls, create-agent, and individual agents: target header, welcome/suggestions or messages, streamed text and tool progress, and composer/Stop. The target name stays visible. Keep each target's messages and draft separate when navigating. Creation proceeds through describe, try, refine, and save as the underlying capabilities become available. Do not expose an active control before its operation works, fabricate assistant replies, or imply settings were verified merely because they were saved.

This section specifies the approved interaction direction. A desktop UI foundation does not establish live model execution, persisted agent management, or report availability.

Main controls should be at least 36 px high; icon controls should have at least a 32 × 32 px hit area and an accessible name. Maintain visible keyboard focus. At narrower widths, stack optional panels and let the report use the available width. Avoid fixed window minimums until the real interface has been tested at text zoom. WCAG 2.2's minimum target criterion is 24 × 24 CSS px with defined exceptions; these proposed defaults are larger. [Target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

| Component or region | Required behavior |
| --- | --- |
| Agent table row | Name, task summary, status, Talk, Output, More/Delete. Add Agent talks to create-agent. Ready-agent Run behavior is delivered with execution and opens existing progress while busy. |
| Primary/secondary buttons | One visually dominant action per region. Secondary actions use neutral styling. Keep destructive actions separate from Run/Save. |
| Setup fields | Persistent labels, help where needed, inline actionable errors, retained nonsecret input on failure. A saved credential is distinct from a verified connection. |
| Report | Show queried device/time scope, coverage, evidence references, and latest execution state. Preserve distinction between no records, partial data, and failed retrieval. |
| Output pins | Show current saved file content and metadata. A missing file shows its own error rather than switching to another report. |
| Progress | Use real stage text and elapsed time. Show a percentage only if measurable. Keep Stop available, including while waiting for an answer. |
| Question | Put the question beside current progress with the necessary answer control. Answer resumes the same work; Stop remains available. |
| Empty state | Explain what is missing and provide one useful action. Label illustrative/sample reports explicitly. |
| Save feedback | Say Saved only after persistence succeeds. On failure, keep edits available and explain how to retry. |
| Destructive dialog | Name the agent and consequences: its work folder/schedules are removed; shared outputs remain. Return focus predictably on cancel. |
| Schedule, M3 | Daily time, saved timezone, next due time, last outcome, pause/resume/cancel. State that the app must run and the computer remain awake. |

### Execution states

| State | Visible treatment |
| --- | --- |
| Ready | Saved task and Run action |
| Running | Compact activity indicator, meaningful stage, Stop |
| Needs your answer | Question and answer entry, Stop |
| Stopping | Keep the state until termination is confirmed |
| Succeeded | Result plus execution/source context |
| Failed | Error and corrective action; older report clearly identified |
| Stopped | Explicit stopped status; any partial output labeled incomplete |

Schedule state is separate from execution state. Pausing or cancelling a schedule does not stop active work. A skipped overlapping occurrence is not a completed execution. Do not show missed occurrences as queued work.

## Component library

**Use shadcn/ui with Base UI and shared semantic tokens.** Its editable component source suits the custom brand and result-first layouts; the application owns maintenance of that source. New shadcn projects default to Base UI as of July 2026; Radix remains supported. shadcn/ui was selected on 2026-09-18; dependencies have not yet been installed. [Introduction](https://ui.shadcn.com/docs), [current foundation](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default), [theming](https://ui.shadcn.com/docs/theming)

Start with Button, Field/Input, Select/Combobox, Dialog/Alert Dialog, Dropdown Menu, Tabs, Badge, Alert, Spinner, and Collapsible. Build app-owned AgentItem, ExecutionStatus, ReportPanel, and ScheduleSummary compositions from one shared component layer. Avoid installing several overlapping UI kits.

For M3's daily schedule, use a time field and timezone control; a calendar picker is not required. A UI kit does not provide recurrence logic or next-run calculation. Likewise, Markdown rendering needs a separate renderer and safe content handling. Interactive HTML is outside this POC.

## Review before implementation is accepted

### Product UI in sales and marketing materials

- Use this guide and the current desktop implementation as the source for product-screen visuals. Preserve navigation, target names, component hierarchy, shared colors, and the placement of Chat, Agents, Output, and Configuration.
- Distinguish captured screenshots, design-aligned reconstructions, planned UI proposals, and document-content examples. A generic “illustrative” label does not justify inventing a conflicting application layout.
- Current-state reconstructions must preserve unavailable/disabled controls and disconnected states. Planned execution examples require an approved interaction design and a visible planned-state label; they must not imply runtime validation.
- Keep report-content examples distinct from the application chrome. Do not invent embedded report panels, schedule confirmations, or control placement merely for a marketing composition. The Output tab remains the results destination.
- If a marketing visual proposes a product change, update the relevant interaction design and record the decision before presenting that visual as the product direction. Visual polish alone does not change product behavior.
- When changing a shared visual, update its page preview, downloadable asset, associated copy, and packaged kit together. Record the source baseline and known differences in the engineering handoff.

The current foundation uses `#191919` foreground, `#666666` secondary text, `#F4F4F4` muted surfaces, `#E2E2E2` separators, `#808080` input borders, and provisional `#E8C236` primary fill. Its guidance cards use 12 px corners and its composer uses 16 px corners. These are current implementation values; the earlier general token/spacing tables remain proposed defaults, not instructions to silently restyle screenshots or reconstructions. Material token changes should be reconciled here and in the shared application stylesheet together.

### Application acceptance checks

- Resolve the brand yellow and cool-gray source discrepancies when the design team is available; keep the provisional values centralized meanwhile.
- Obtain official logo assets and check font redistribution licenses; confirm whether a newer brand guide exists.
- Verify buttons, forms, menus, and dialogs with keyboard-only operation, focus return, screen-reader labels, and 200% text zoom in Electron.
- Check all actual color pairs, including hover, focus, selected, disabled, and error states. Library accessibility features do not prove application compliance.
- Walk through a missing connection, no records, partial retrieval, model failure, failed report save, Stop while waiting, and a failed latest attempt with an older pinned report.
- Validate the real create/try/modify/save flow, then M3 scheduling and lifecycle controls. Record screenshot evidence and operation outcomes together.

Dark theme, decorative motion, advanced grids, and interactive HTML are not required by this draft. Add them only when their product need and milestone scope justify them.
