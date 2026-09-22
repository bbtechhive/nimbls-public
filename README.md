# nimbls

**Development code name only. The product name has not been decided.** References to Ask nimbls and nimblscli are provisional.

An application to monitor, control, and manage multiple AI agents. Agents use `bbcli` to retrieve information from [NIMBL](https://github.com/bbtechhive/mnms) and configure devices managed by NIMBL.

Project setup is in progress. Public discussion, documentation, specifications, milestones, changelog, and binary releases live in [nimbls-public](https://github.com/bbtechhive/nimbls-public).

The product rules are **easy to use** and **ready out of the box**: include useful starter agents, guide essential setup, and keep technical configuration optional. These are design commitments; the application is not yet released.

## Marketing website — start here

Start with **three illustrated everyday scenarios**: a morning network brief, planned network-status answers, and network change investigation. Then explore seven core functions, reusable visuals, feature cards, and the interactive roadmap. The website is in English and includes individual downloads and a complete marketing kit. It describes planned capabilities, not a released product.

- [Download the complete marketing website ZIP](docs/marketing/ask-nimbls/nimbls-marketing-kit.zip?raw=true)
- [Read the full quick-start guide](docs/marketing/ask-nimbls/README.md)
- [Download all marketing visuals and presentation notes](docs/marketing/ask-nimbls/nimbls-visual-library.zip?raw=true) — PNG for slides, editable SVG, and Markdown notes. After starting the website, open **Visual Library** for previews.
- [Browse the website files](docs/marketing/ask-nimbls/)

### Open the website on your computer

1. Download the ZIP above. If GitHub opens a file page, choose **Download raw file**.
2. **Extract the whole ZIP** into a folder. Keep all pages and the `assets` folder together.
3. Start the website for your computer:

| Computer | Start the website |
| --- | --- |
| macOS | Double-click **Start Website.command**. |
| Windows | Double-click **Start Website.bat**. |
| Linux | Open a terminal in the extracted folder and run `sh start-website.sh`. |

The launcher requires **Python 3**, with no extra packages. It opens your default browser automatically; if it does not, copy the local address shown in the launcher window. Keep that window open while browsing. Press **Ctrl+C** in it when you are finished.

**Without Python:** double-click **index.html** in the extracted folder to view the website directly. The content and holiday calendar work offline. If an asset opens instead of downloading, use your browser's Save option.

Already have this repository on your computer? Open `docs/marketing/ask-nimbls/` and use the same launcher or `index.html` directly; no ZIP download is needed.

Use **Roadmap** in the website to choose a start date and each POC's duration. It calculates dates around the bundled 2026–2027 Taiwan government office calendar and offers dated SVG and Markdown downloads.

GitHub displays HTML source; it does not launch this website from the repository view. The launcher opens a local preview, not a public website. Share the ZIP with colleagues rather than your local preview address.

## Future agent capabilities

Explore [Google Workspace, Microsoft 365, and more capability candidates](docs/marketing/ask-nimbls/future-capabilities.html), or read the [candidate plan](docs/plans/agent-capability-candidates.md). Everyday examples explain the proposed value. These are unscheduled ideas for evaluation, not released integrations.

## Available in the development build

[Getting started with Ask nimbls](docs/guides/ask-nimbls-help.md) provides task-based help copy for the development build.

[Ask nimbls today](docs/marketing/ask-nimbls/current-capabilities.html) describes implemented conversation and text-output capabilities, the current tool/skill boundary, and prior validation evidence. This is not a packaged release.

## Explore the planned experience

- [Understand agents in nimbls](docs/concepts/agents.md)
- [Useful starter agents](docs/guides/starter-agents.md)
- [Example requests for creating your own agent](docs/guides/create-an-agent.md)
- [Walk through a daily syslog summary scenario](docs/scenarios/daily-syslog-summary.md)

These are concept and scenario documents, not released functionality.

## POC scope and milestones

The [macOS syslog POC SPEC](docs/specs/macos-syslog-poc.md) and [M1–M3 milestones](MILESTONES.md) define the accepted first delivery scope: manual reporting, refinement/reuse, and daily automation. They are planning documents; implementation and acceptance testing have not started.
