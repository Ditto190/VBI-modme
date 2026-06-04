export const layoutPreferencesSkill = `
# Layout And Preferences Application API

Use application.layout, application.theme, and application.i18n for shell and preference changes.

Layout commands:
- application.layout.sidebar.setCollapsed(boolean)
- application.layout.sidebar.toggleCollapsed()
- application.layout.sidebar.setWidth(number)
- application.layout.sidebar.resetWidth()
- application.layout.sidePanel.setCollapsed(boolean)
- application.layout.sidePanel.toggleCollapsed()
- application.layout.sidePanel.listMode()
- application.layout.sidePanel.changeMode("fixed" | "floating")
- application.layout.sidePanel.toggleMode()
- application.layout.sidePanel.setWidth(number)
- application.layout.sidePanel.resetWidth()
- application.layout.sidePanel.setFloatingPosition({ x, y } | null)
- application.layout.workspacePlacement.list()
- application.layout.workspacePlacement.change("resource-center" | "agent-center")
- application.layout.workspacePlacement.toggle()

Preferences:
- application.theme.list()
- application.theme.change(mode)
- application.i18n.list()
- application.i18n.change(locale)
- application.i18n.t(key)

Call application.theme.list() before application.theme.change(mode). It returns
{ light: string[], dark: string[] }; choose a mode from one of those groups instead of hardcoding or
guessing theme names. Call application.i18n.list() before application.i18n.change(locale), and choose
a returned locale instead of hardcoding or guessing locale names. State is available through the same
grouped objects and through snapshot().

For shell enum choices, call application.layout.sidePanel.listMode() before changeMode(mode), and
application.layout.workspacePlacement.list() before workspacePlacement.change(placement). Numeric and
boolean layout setters still accept explicit user-provided values; prefer current state and min/max UI
constraints when choosing widths.

Example:

const themes = application.theme.list();
const locales = application.i18n.list();
const sidePanelModes = application.layout.sidePanel.listMode();
const workspacePlacements = application.layout.workspacePlacement.list();
const allThemes = [...themes.light, ...themes.dark];
const nextTheme = allThemes.find((mode) => mode !== snapshot().theme.mode) ?? snapshot().theme.mode;
const nextLocale = locales.find((locale) => locale !== snapshot().i18n.locale) ?? snapshot().i18n.locale;
const nextMode = sidePanelModes.includes("floating") ? "floating" : snapshot().layout.sidePanel.mode;
const nextPlacement =
  workspacePlacements.find((placement) => placement !== snapshot().layout.workspacePlacement.value) ??
  snapshot().layout.workspacePlacement.value;
assert(allThemes.includes(nextTheme), "Theme must be returned by application.theme.list()");
assert(locales.includes(nextLocale), "Locale must be returned by application.i18n.list()");
assert(sidePanelModes.includes(nextMode), "Mode must be returned by application.layout.sidePanel.listMode()");
assert(
  workspacePlacements.includes(nextPlacement),
  "Workspace placement must be returned by application.layout.workspacePlacement.list()",
);
application.layout.sidePanel.changeMode(nextMode);
application.layout.workspacePlacement.change(nextPlacement);
application.layout.sidePanel.setWidth(520);
application.theme.change(nextTheme);
application.i18n.change(nextLocale);
return json({
  availableLocales: locales,
  availableThemes: themes,
  sidePanelModes,
  workspacePlacements,
  i18n: snapshot().i18n,
  layout: snapshot().layout,
  theme: snapshot().theme,
});
`.trim()
