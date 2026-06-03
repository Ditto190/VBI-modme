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
- application.layout.sidePanel.setMode("fixed" | "floating")
- application.layout.sidePanel.toggleMode()
- application.layout.sidePanel.setWidth(number)
- application.layout.sidePanel.resetWidth()
- application.layout.sidePanel.setFloatingPosition({ x, y } | null)
- application.layout.workspacePlacement.set("resource-center" | "agent-center")
- application.layout.workspacePlacement.toggle()

Preferences:
- application.theme.changeTheme(mode)
- application.i18n.setLocale(locale)
- application.i18n.t(key)

State is available through the same grouped objects and through snapshot().

Example:

application.layout.sidePanel.setMode("floating");
application.layout.sidePanel.setWidth(520);
application.theme.changeTheme("blue");
return json({ layout: snapshot().layout, theme: snapshot().theme });
`.trim()
