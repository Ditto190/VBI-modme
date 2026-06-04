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
- Before changing selectable values, inspect available values through grouped APIs such as application.theme.list(), application.i18n.list(), application.agent.model.list(), and application.layout.sidePanel.listMode().
- Before calling id-based commands such as open, rename, delete, connect, select, addChart, or removePage, derive and verify ids from list(), items, pages, pageSections, or the current snapshot.
- Do not hardcode enum-like values or ids unless the user gave an exact value and the relevant list or state confirms it exists.

Example:

const before = snapshot().theme.mode;
const availableThemes = application.theme.list();
const nextTheme = [...availableThemes.light, ...availableThemes.dark].find((mode) => mode !== before) ?? before;
const beforeLocale = snapshot().i18n.locale;
const availableLocales = application.i18n.list();
const nextLocale = availableLocales.find((locale) => locale !== beforeLocale) ?? beforeLocale;
assert([...availableThemes.light, ...availableThemes.dark].includes(nextTheme), "Theme must be returned by application.theme.list()");
assert(availableLocales.includes(nextLocale), "Locale must be returned by application.i18n.list()");
application.theme.change(nextTheme);
application.i18n.change(nextLocale);
return json({ availableLocales, availableThemes, before, beforeLocale, after: snapshot().theme.mode, afterLocale: snapshot().i18n.locale });
`.trim()
