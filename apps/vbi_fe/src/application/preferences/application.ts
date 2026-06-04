import { appLocales, createTranslator } from '../../i18n/utils'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import { darkVbiThemeModes, lightVbiThemeModes } from '../../theme/palette'
import type { AppLocaleList, AppThemeList, AppThemeMode, I18nApplication, ThemeApplication } from './contract'

const createThemeList = (): AppThemeList => ({
  dark: [...darkVbiThemeModes],
  light: [...lightVbiThemeModes],
})

const listLocales = (): AppLocaleList => [...appLocales]

const assertListedTheme = (mode: AppThemeMode) => {
  const themes = createThemeList()
  const availableThemes = [...themes.light, ...themes.dark]
  if (availableThemes.includes(mode)) return

  throw new Error(
    `Unknown application theme "${String(mode)}". Use application.theme.list() before application.theme.change().`,
  )
}

const assertListedLocale = (locale: I18nApplication['locale']) => {
  const locales = listLocales()
  if (locales.includes(locale)) return

  throw new Error(
    `Unknown application locale "${String(locale)}". Use application.i18n.list() before application.i18n.change().`,
  )
}

export const getThemeApplication = (): ThemeApplication => {
  const state = useAppPreferencesStore.getState()

  return {
    mode: state.themeMode,
    list: createThemeList,
    change: (mode) => {
      assertListedTheme(mode)
      state.setThemeMode(mode)
    },
  }
}

export const getI18nApplication = (): I18nApplication => {
  const state = useAppPreferencesStore.getState()

  return {
    locale: state.locale,
    list: listLocales,
    change: (locale) => {
      assertListedLocale(locale)
      state.setLocale(locale)
    },
    t: createTranslator(state.locale),
  }
}
