# Ask nimbls. Put NIMBL to work.

Big-picture architecture for NIMBL network site management. Planned product architecture, not a deployed topology.

- People configure, teach, refine and review agents through Ask nimbls.
- Scheduled execution runs saved tasks without requiring a new conversation each time.
- Network agents access devices through the shared bbcli integration and one configured NIMBL connection. Device changes require authorization, supported operations and verification.
- Site history supplies retained evidence; results and work history support review and improvement.
- A local LLM server supplies inference on an approved local endpoint. Local-only work must not silently fall back to cloud.
- Future external assistance passes through disclosure controls and a proposed nimbls-relay route to an approved model. Advice returns for local validation, with no direct external device control. Exact relay architecture and security implementation remain future work.

The site boundary illustrates an approved local deployment, not a required single machine or an air-gap guarantee. General-purpose agents remain supported. Event-triggered automation is not asserted by this diagram; the primary execution path is configured schedules. All capability and security statements require implementation evidence before being presented as delivered.

## Visual and brand asset sources

The illustration groups ongoing work into Keep watch, Investigate, and Act & verify. Switch stacks, agent/task symbols and server illustrations are original SVG artwork. Site knowledge represents retained files and evidence, not a database implementation choice.

OpenAI and Anthropic marks identify example model providers in the planned external-assistance path; they do not imply validated integrations, partnership or endorsement. Marks remain the property of their respective owners. Source artwork was retrieved from official OpenAI and Anthropic web properties on 2026-09-21, preserving its shape and proportions.

- OpenAI brand reference and source: https://openai.com/brand/
- Anthropic source: https://www.anthropic.com/
- Anthropic official brand assets: https://brandfolder.com/anthropic/
