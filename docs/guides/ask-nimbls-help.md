# Getting started with Ask nimbls

Editorial status: help copy for the development build, prepared 2026-09-22. Not a release announcement. “nimbls” and “Ask nimbls” are provisional names.

## What can I do with nimbls?

You can use nimbls to work with AI assistants that help you make sense of information and get everyday work done. Start with Ask nimbls—just describe what you need in your own words.

For example, you can ask me to:

- **Make sense of saved reports.** “Compare these reports and tell me what needs attention.” I can pull together the relevant information, explain where it came from, and save a summary for you.
- **Create an assistant for work you do often.** “Help me set up an agent to summarize my weekly notes.” We can give it instructions and selected files, try it, and adjust it for next time.
- **Help with your setup.** “Is my current model a good fit for this task?” I can check your settings, explain the tradeoffs, and help make changes you request.
- **Keep track of decisions.** “We decided our weekly reports should cover Monday through Sunday.” I can record that decision and refer to it when we work on future reports in this workspace.

You don't need to know commands or create an agent before asking for help. A good first request is: **“Help me summarize a report.”**

## How do I get started?

Open Ask nimbls and describe the result you want. For example: “I have two weekly reports. Help me compare them and write a short update for my team.”

You'll need an AI provider and model configured before we can chat. Configuration is where you set that up. Your workspace is the folder that holds your agents and their work; saved reports normally go in its output folder.

## Can you read my files and reports?

I can help with saved text reports and files made available to the relevant agent. For reports in Output, I first look at how the files are organized, then read the parts relevant to your question. I'll tell you which sources I used and what I couldn't cover.

The current Output reader supports text files such as Markdown, plain text, CSV and JSON. It doesn't directly interpret PDFs, images or spreadsheet workbooks. If a file is too large or isn't supported, we can work from a smaller text extract or summary.

## Can I reuse an agent?

Yes. An agent keeps the instructions and configuration you give it, so you can return to it for similar work. You can chat with it, run its saved task, review its results, and refine its instructions.

For example, you might keep one agent for weekly notes and another for reviewing technical reports. Use Agents → Manage schedules to choose the first run time, repeat interval and output folder. Keep the application open. Pause or cancel a schedule without deleting its Agent; View results shows retained progress and failures.

## Can you recommend a model?

I can inspect your setup and explain what matters for your task. Combining several reports or making a series of configuration changes may benefit from a model that handles reasoning and tools well. A short, straightforward task may be better served by a faster, less costly model.

The high, medium and low profiles are configurable choices, not measured quality ratings. I'll distinguish recommendations from actual test results. Asking for advice doesn't change your settings or start a paid model comparison.

## How do I choose a model for one agent?

On the Agents page, choose a Profile for that agent: high, medium, low, or Default. This works for Ask nimbls and Create agent too; both start with high. Default follows your selection in Configuration; choosing a specific profile affects only that agent, starting with its next message or run. A task already running keeps its current model.

To change which model a profile contains, use Configuration. That change affects every agent using that profile. System agents' built-in instructions and skills remain protected.

## Will you remember what we decide?

I can keep decisions you explicitly make in this workspace's decision notes and refer to them in a later conversation. For example: “Use Monday through Sunday as our reporting period.” You can ask me to review, change or remove a decision.

This doesn't mean I remember every conversation or automatically turn repeated requests into preferences.

## What about NIMBL?

NIMBL is a network management system. It's optional—you can use nimbls for general work without it.

The current build includes NIMBL connection and sign-in support. Before helping with a particular network task, I'll check which operations your installed version supports. Connecting to NIMBL alone doesn't mean every device action or network report is available.

## Which cache mode should I use?

Development-build guidance (2026-10-01; not a packaged release announcement): Configuration offers prompt-cache retention and cache warming. Ask “Which cache mode fits my model and work?” and Ask nimbls can inspect your setup, explain its recommendation, and apply a change you request.

Start with **Standard** retention. **Longer** requests extended retention where supported. **Disable client cache hints** disables application cache controls and warming; the provider may still cache automatically.

Warming sends additional requests, consuming tokens or subscription allowance:

- **Off** suits infrequent reports or avoiding extra refresh requests. Ordinary prompt caching still works.
- **During active runs** is the default and can help eligible long tool runs.
- **During runs and between follow-ups** suits frequent follow-ups with large repeated context; idle warming lasts at most 30 minutes after the last real request.

Warming requires a known model cache lifetime and enough estimated savings. Codex subscription caching is automatic; Pi's built-in Codex models do not declare a warming lifetime or expose longer retention. For Codex-only work, use Standard retention and Off warming. API cost estimates do not measure subscription savings.

Saving cache settings stops previous warming and applies the new controls on the next run. Expand Ask nimbls cache status to see the latest observed eligibility and reason. Execution analysis includes cache-read/write tokens and warming usage. A saved mode alone does not prove a cache hit or active warming; inspect the observed session and usage.
