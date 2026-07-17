export const layoutPreferencesSkill = `
# Layout And Preferences Application API

Use application.getState().layout, application.getState().theme, and application.getState().i18n for shell and preference changes.

Layout commands:
- application.getState().layout.sidebar.setCollapsed(boolean)
- application.getState().layout.sidebar.toggleCollapsed()
- application.getState().layout.sidebar.setWidth(number)
- application.getState().layout.sidebar.resetWidth()
- application.getState().layout.sidePanel.setCollapsed(boolean)
- application.getState().layout.sidePanel.toggleCollapsed()
- application.getState().layout.sidePanel.listMode()
- application.getState().layout.sidePanel.changeMode("fixed" | "floating")
- application.getState().layout.sidePanel.toggleMode()
- application.getState().layout.sidePanel.setWidth(number)
- application.getState().layout.sidePanel.resetWidth()
- application.getState().layout.sidePanel.setFloatingPosition({ x, y } | null)
- application.getState().layout.workspacePlacement.list()
- application.getState().layout.workspacePlacement.change("resource-center" | "agent-center")
- application.getState().layout.workspacePlacement.toggle()

Preferences:
- application.getState().theme.list()
- application.getState().theme.change(mode)
- application.getState().i18n.list()
- application.getState().i18n.change(locale)
- application.getState().i18n.t(key)

Call application.getState().theme.list() before application.getState().theme.change(mode). It returns
{ light: string[], dark: string[] }; choose a mode from one of those groups instead of hardcoding or
guessing theme names. Call application.getState().i18n.list() before application.getState().i18n.change(locale), and choose
a returned locale instead of hardcoding or guessing locale names. State is available through the same
grouped objects and through snapshot().

For shell enum choices, call application.getState().layout.sidePanel.listMode() before changeMode(mode), and
application.getState().layout.workspacePlacement.list() before workspacePlacement.change(placement). Numeric and
boolean layout setters still accept explicit user-provided values; prefer current state and min/max UI
constraints when choosing widths.

Example:

const themes = application.getState().theme.list();
const locales = application.getState().i18n.list();
const sidePanelModes = application.getState().layout.sidePanel.listMode();
const workspacePlacements = application.getState().layout.workspacePlacement.list();
const allThemes = [...themes.light, ...themes.dark];
const nextTheme = allThemes.find((mode) => mode !== snapshot().theme.mode) ?? snapshot().theme.mode;
const nextLocale = locales.find((locale) => locale !== snapshot().i18n.locale) ?? snapshot().i18n.locale;
const nextMode = sidePanelModes.includes("floating") ? "floating" : snapshot().layout.sidePanel.mode;
const nextPlacement =
  workspacePlacements.find((placement) => placement !== snapshot().layout.workspacePlacement.value) ??
  snapshot().layout.workspacePlacement.value;
assert(allThemes.includes(nextTheme), "Theme must be returned by application.getState().theme.list()");
assert(locales.includes(nextLocale), "Locale must be returned by application.getState().i18n.list()");
assert(sidePanelModes.includes(nextMode), "Mode must be returned by application.getState().layout.sidePanel.listMode()");
assert(
  workspacePlacements.includes(nextPlacement),
  "Workspace placement must be returned by application.getState().layout.workspacePlacement.list()",
);
application.getState().layout.sidePanel.changeMode(nextMode);
application.getState().layout.workspacePlacement.change(nextPlacement);
application.getState().layout.sidePanel.setWidth(520);
application.getState().theme.change(nextTheme);
application.getState().i18n.change(nextLocale);
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
