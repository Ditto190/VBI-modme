import type { AppLocale, Translate } from '../../i18n'
import type { VbiThemeMode } from '../../theme/palette'

export type AppThemeMode = VbiThemeMode

export type AppThemeList = {
  dark: AppThemeMode[]
  light: AppThemeMode[]
}
export type AppLocaleList = AppLocale[]

export type ThemeApplication = {
  mode: AppThemeMode
  list(): AppThemeList
  change(mode: AppThemeMode): void
}

export type I18nApplication = {
  locale: AppLocale
  list(): AppLocaleList
  change(locale: AppLocale): void
  t: Translate
}
