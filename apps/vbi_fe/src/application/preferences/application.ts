import { createTranslator } from '../../i18n/utils'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import type { I18nApplication, ThemeApplication } from './contract'

export const getThemeApplication = (): ThemeApplication => {
  const state = useAppPreferencesStore.getState()

  return {
    mode: state.themeMode,
    changeTheme: state.setThemeMode,
  }
}

export const getI18nApplication = (): I18nApplication => {
  const state = useAppPreferencesStore.getState()

  return {
    locale: state.locale,
    setLocale: state.setLocale,
    t: createTranslator(state.locale),
  }
}
