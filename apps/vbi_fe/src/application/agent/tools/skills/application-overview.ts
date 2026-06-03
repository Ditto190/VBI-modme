export const applicationOverviewSkill = `
# Application Tool Overview

Use this skill before non-trivial VBI web application operations.

The browser agent has two tools:
- read_skill: list or read lazy application skills.
- vbi_application: run trusted JavaScript against the semantic application API.

The script receives application, VBI, snapshot, waitFor, json, assert, and console.

Rules:
- Use only application.chart, application.insight, application.report, application.reportDetail, application.layout, application.theme, application.i18n, and application.agent.
- Do not access zustand stores, router internals, DOM nodes, window private fields, localStorage, or provider clients directly.
- Return json(serializableValue) from every script.
- Use snapshot() for a compact serializable state projection.
- Use waitFor(() => condition) when an application command triggers async state changes.
- Builder or DSL changes must go through Builder APIs exposed by application sessions or VBI Builder objects.

Example:

const before = snapshot().theme.mode;
application.theme.changeTheme(before === "blue" ? "slate" : "blue");
return json({ before, after: snapshot().theme.mode });
`.trim()
