export const createSettingsHelpers = () => ({
  getLimit: (builder: { limit: { getLimit(): number | undefined } }) => builder.limit.getLimit(),
  getLocale: (builder: { locale: { getLocale(): string } }) => builder.locale.getLocale(),
  getTheme: (builder: { theme: { getTheme(): string } }) => builder.theme.getTheme(),
  setLimit: (builder: { limit: { setLimit(limit: number): void } }, limit: number) => builder.limit.setLimit(limit),
  setLocale: (builder: { locale: { setLocale(locale: string): void } }, locale: string) =>
    builder.locale.setLocale(locale),
  setTheme: (builder: { theme: { setTheme(theme: string): void } }, theme: string) => builder.theme.setTheme(theme),
})
