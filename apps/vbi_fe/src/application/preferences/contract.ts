import type { AppLocale, Translate } from '../../i18n'
import type { VbiThemeMode } from '../../theme/palette'

export type AppThemeMode = VbiThemeMode

export type ThemeApplication = {
  mode: AppThemeMode
  changeTheme(mode: AppThemeMode): void
}

export type I18nApplication = {
  locale: AppLocale
  setLocale(locale: AppLocale): void
  t: Translate
}
