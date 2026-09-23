# nimbls — Core Features & Product Roadmap

An English marketing website covering Ask nimbls, custom agents, site history, local AI, scheduling, results, agent improvement, controlled external assistance, execution management, and the seven-Milestone roadmap. All materials describe a planned product experience. They are review drafts, not an announcement of released functionality.

## Quick start for sales and marketing

1. Download **nimbls-marketing-kit.zip**.
2. **Extract the whole ZIP into a folder.** Do not run it from inside the ZIP. Keep the files and the `assets` folder together.
3. Start the website using the instructions for your computer below.
4. Your default browser will open the page automatically. If it does not, copy the address shown in the launcher window into your browser.

| Your computer | How to start |
| --- | --- |
| macOS | Double-click **Start Website.command**. |
| Windows | Double-click **Start Website.bat**. |
| Linux | Open a terminal in the extracted folder and run `sh start-website.sh`. |

**Requirement:** Python 3 must be installed. No extra Python packages are needed. If the launcher says Python is missing, ask your IT team to install Python 3, or obtain it from [python.org](https://www.python.org/downloads/). Follow your organization's software policy.

**No-install alternative:** Double-click **index.html** to read the page directly in your browser. All illustrations and text are local. If your browser opens an asset instead of downloading it, use its Save option, or start the website with the launcher for normal download behavior.

### While using the website

- Keep the launcher window open; minimizing it is fine.
- Use **All features** to choose a capability. Each feature opens on its own page, with its scenario, workflow visual, feature card, and sales/demo copy.
- Use **Roadmap** to see the agreed seven stages, acceptance direction, and default agents. Download the roadmap as SVG or Markdown, or expand its poster preview on the page.
- The **Ask nimbls toolkit** retains its four visuals and five readable text materials. The other feature pages have their own inline previews and download buttons.
- Select a visual to see it at full size. Text panels can be scrolled, or collapsed using their headings.
- Use the download button beside an item to save an editable copy.
- SVG artwork works well in design tools and applications that support SVG. Markdown (`.md`) files contain plain text you can copy into your documents.

### When you are finished

Press **Ctrl+C** in the launcher window to stop the website. On macOS or Windows, follow the prompt to close that window. Closing only the browser tab does not stop the preview.

The local address is available only on your own computer and may change each time you start. Send colleagues the ZIP, not your local address. Starting the preview does not publish anything online.

## Calculate dates around Taiwan holidays

Open **Roadmap**, choose a **start date**, and select **2 or 3 weeks per Milestone**. Two weeks means 10 working days; three means 15. Each Milestone starts on the next working day after the previous Milestone finishes. A working kickoff counts as day 1; a holiday kickoff moves forward automatically.

The timeline shades excluded dates and lists official holidays and substitute days by date and their original Chinese names. Expand the full list to see weekends too. Date changes update the schedule, stage details, and **dated SVG / Markdown downloads** immediately.

The bundled official DGPA office calendars cover **2026–2027** and work offline. The planner follows each date's official working-day flag, including any adjusted working days. It will not calculate beyond verified coverage. Company-specific leave and emergency closures are not included. Calendar elapsed time can exceed the 14–21 weeks of estimated effort.

Source: [Taiwan government office calendar](https://data.gov.tw/dataset/14718), retrieved 2026-09-21, Government Data Open License v1.0. Original CSV files and provenance are included in `assets/calendar/`. To extend coverage, the website team must update the official calendar snapshot and verify the planner before publishing.

## Troubleshooting

- **Python is missing:** use the no-install alternative above, or ask IT to install Python 3.
- **macOS does not run the launcher:** ask IT for assistance. If the extracted file has lost its executable permission, you can start it from Terminal with `bash ` followed by the dragged-in `Start Website.command` file. Follow organizational security prompts and do not bypass a security block.
- **The browser did not open:** copy the `http://127.0.0.1:...` address from the launcher window.
- **Images or files are missing:** extract the complete ZIP again. Do not move `index.html` away from its `assets` folder.
- **A colleague cannot open your preview link:** local previews are private to your computer. Share the ZIP or an officially published website URL.

## Included materials

| Material | File |
| --- | --- |
| Website | `index.html` |
| Hero illustration | `assets/ask-nimbls-hero.svg` |
| Workflow diagram | `assets/ask-nimbls-workflow.svg` |
| Capability diagram | `assets/ask-nimbls-capabilities.svg` |
| Feature icon | `assets/ask-nimbls-icon.svg` |
| Standard feature card | `assets/feature-card.md` |
| Customer scenario | `assets/customer-scenario.md` |
| Sales explanation and demo script | `assets/sales-and-demo-script.md` |
| Sample report | `assets/sample-report.md` |
| Full draft | `assets/full-feature-draft.md` |

Keep the planned-feature labels, sample-content labels, and provisional naming when reusing the material. Product name, wording, and visual identity need final approval before official publication. The hero reconstructs the current desktop foundation using the UI guide and application source. It is not a captured screenshot. Report samples show document content, not the application interface.

## For the website or IT team

This is a static page. It has no external fonts, tracking, framework, or runtime dependency. Host all `.html` pages and `assets/` together under the chosen website path. Include `README.md` and the complete ZIP for the page's download links. The local launcher is for previewing only; do not use its development server as a public website server. Launcher files need not be hosted individually.

The complete ZIP contains this README, all website pages, all marketing assets and bundled calendar data, the editable content catalog, and the four launcher files. It does not contain itself. On an extracted offline copy, **Download complete kit** is unavailable unless the original ZIP is placed alongside `index.html`; all individual previews and downloads still work. Rebuild the ZIP when source files change.

macOS and Windows launchers use an installed Python 3 interpreter. The shared server binds only to `127.0.0.1`, chooses a free port automatically, and serves the extracted folder regardless of the starting directory.

## Big-picture architecture

The feature library (`features.html`) includes the network site architecture with a full-size preview and downloads: `assets/nimbls-architecture.svg` and its explanation, `assets/nimbls-architecture.md`. It shows scheduled operations through NIMBL, local context and inference, and the separately planned external-assistance path.

## Additional feature and roadmap downloads

Each of the eight additional capabilities has an SVG workflow diagram and a Markdown feature pack (card, scenario, sales pitch, demo outline, and scope). These are available beside the feature on the page and under `assets/`.

- `assets/product-roadmap.svg`: downloadable seven-Milestone poster.
- `assets/product-roadmap.md`: detailed roadmap with acceptance direction.
- `assets/all-core-features.md`: concise feature/slogan/delivery matrix.
- `feature-content.json`: content catalog for future editorial changes; editing it alone does not rebuild the static HTML.

The Ask nimbls hero follows the current desktop foundation. Other capability visuals are workflow concepts, not application screenshots. They must not be used to imply unapproved UI or completed runtime functionality.

## Website pages

- `index.html`: scenario-led homepage with illustrated network briefs, planned network-status answers, and network change investigation. Includes fictional sample results and a three-step explanation.
- `features.html`: the full feature library, network architecture, milestone summaries, and reusable marketing materials.
- `ask-nimbls.html`: Ask nimbls, scenario, design-aligned hero, and toolkit.
- `custom-agents.html`: Custom Agents.
- `site-history.html`: Site History & Knowledge.
- `local-ai.html`: Local AI.
- `automation.html`: Scheduling & Automation.
- `results-center.html`: Results Center.
- `agent-improvement.html`: Agent Improvement Review.
- `external-assistance.html`: Controlled External Assistance.
- `execution-management.html`: Execution Management and verified device changes.
- `roadmap.html`: seven-Milestone delivery plan, 2–3-week estimates, feature-page links, and timeline SVG/Markdown downloads.

Keep these pages together. Navigation uses relative links, so the site works from the extracted folder or under a website subdirectory. Old overview hash links redirect to their corresponding page when JavaScript is enabled.

- `guide.html`: formatted quick-start guide for sales and marketing; the Markdown README remains available to download.

## Visual Library for sales and marketing

Open **Visual Library** from any page to preview and download the architecture, feature diagrams, daily network scenario, and roadmap reference. Each offers PNG for slides, editable SVG and presentation notes. **Download all visuals & notes** provides a separate ZIP; the complete website kit includes that ZIP too. Individual feature pages also offer PNG/SVG beside the relevant diagram.

The homepage introduces three everyday scenarios; the feature library preserves the architecture and daily operations journey; detailed diagrams stay on their matching feature pages. For a dated roadmap, use the interactive Roadmap page and its SVG/Markdown exports. The library roadmap poster is undated. Preserve scope labels and distinguish planned concepts from product reconstructions.

## Roadmap and features

Use **Total view** for the overall schedule or **Monthly calendar** for daily dates and holidays. Both offer SVG downloads.

Milestone cards list their important features under **View features**. Milestone 2 has four standalone feature pages with simple explanations, diagrams and downloads: syslog-reviewer, device-snapshot, incident-investigator and Ask nimbls site operations. Engineering issues and acceptance criteria remain in GitHub and the design documents.

## Future agent capabilities

Open `future-capabilities.html` for Google Workspace, Microsoft 365, and four additional ideas. Download `assets/agent-capability-candidates.md` for scope and integration evidence. These candidates are unscheduled and excluded from current roadmap estimates; they are not released integrations.

## Homepage illustrations

`assets/everyday-work-scenes.png` is an AI-generated editorial illustration of three workplace moments, not a product screenshot. The homepage frames the original image into three scenes using CSS. `assets/everyday-work-scenes.md` records the generation prompt and usage. Scenario results are fictional; retain the planned/candidate labels when reusing them.

## Leave feedback

Every page has a **Leave feedback** link. Choose the page and type, enter a short summary and message, then select **Continue to GitHub**. Review the prefilled issue, sign in if needed, and submit it on GitHub. Draft preparation does not post an issue. **View feedback & replies** opens the public discussion history.

All feedback goes to the public nimbls-public repository. Do not include confidential, customer, or personal information. The form includes only a known website filename and title, never a local filesystem path or local preview address. It uses no GitHub token, server, or browser storage; the downloaded website works the same way, with internet access required to continue to GitHub. Without JavaScript, use the direct GitHub link. The website does not confirm submission or display synchronized comments.

The roadmap focuses on actual working days and milestone dates. Holiday and excluded-date lists are omitted from the page and calculated Markdown download; the underlying official calendar still determines working days.

Roadmap script URLs include a content-hash version to avoid mixing updated markup with a cached older planner. When changing a roadmap script, update its `?v=` value in `roadmap.html` to the first 12 characters of that file’s SHA-256 hash, then refresh both complete website kits.

Monthly calendars highlight each milestone’s final working day in blue with a **Demo / release** label. These are planning targets, not committed release dates. The same markers appear in monthly and all-month SVG downloads.

## Current capabilities

`current-capabilities.html` and `assets/current-capabilities.md` distinguish implemented development capabilities from planned experiences. Re-check tool exposure, skill loading, and evidence when updating this inventory; application operations are not automatically agent tools. The page supports the shared feedback flow.

## Shared visual style

All pages load `assets/site-theme.css` after their page styles. It preserves the homepage’s warm ivory background, dark green text, warm neutral sections, and yellow accents. Update the content-hash query in each page when changing this stylesheet, then refresh the complete kits.

## Preserved future homepage scenarios

The original meeting-preparation and proposal-comparison scenarios are retained in `assets/future-landing-scenarios.md`, displayed on Future capabilities, and preserved verbatim in `feature-content.json` under `deferredLandingScenarios`. Bring each back to the homepage after its related tools/skills and full workflow are verified. The current homepage emphasizes network-status answers and network change investigation.

The preview launcher sends no-cache/no-store headers for pages and assets so review changes stay current. Use `--port` when a fixed loopback address is needed for an existing tunnel. A tab cached before this change may need one hard refresh or a fresh query-string URL.

### Milestone capability evolution

The Roadmap page includes a seven-stage concept and capability diagram, plus a concrete deliverable summary for every milestone. Download the editable diagram from `assets/milestone-evolution.svg`. Summaries describe planned outcomes; calculated Markdown plans include them too.

## Website distribution

GitHub Pages hosting is deferred. Use the downloadable website kit and local launchers described above. Feedback submission requires internet access and a GitHub account.
