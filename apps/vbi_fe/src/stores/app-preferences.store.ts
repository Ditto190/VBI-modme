import { create } from 'zustand'
import { isAppLocale, type AppLocale } from '../i18n/utils'
import { vbiThemePalettes, type VbiThemeMode } from '../theme/palette'

export type AppThemeMode = VbiThemeMode

type AppPreferencesState = {
  hydratePreferences(): void
  locale: AppLocale
  themeMode: AppThemeMode
  setLocale(locale: AppLocale): void
  setThemeMode(themeMode: AppThemeMode): void
}

const localeStorageKey = 'vbi.locale'
const themeStorageKey = 'vbi.theme'

const languageFallbacks: Record<string, AppLocale> = {
  de: 'de-DE',
  en: 'en-US',
  fr: 'fr-FR',
  id: 'id-ID',
  ja: 'ja-JP',
  ko: 'ko-KR',
  vi: 'vi-VN',
  zh: 'zh-CN',
}

const getStoredValue = (key: string) => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const setStoredValue = (key: string, value: string) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage can be disabled in privacy modes; the in-memory state still works.
  }
}

const isThemeMode = (value: string | null): value is AppThemeMode =>
  typeof value === 'string' && value in vbiThemePalettes

const resolveBrowserLocale = (): AppLocale => {
  if (typeof navigator === 'undefined') return 'zh-CN'

  const browserLanguages = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean)

  for (const language of browserLanguages) {
    if (isAppLocale(language)) return language

    const languagePrefix = language.split('-')[0]?.toLowerCase()
    const matchedLocale = languagePrefix ? languageFallbacks[languagePrefix] : undefined

    if (matchedLocale) return matchedLocale
  }

  return 'zh-CN'
}

const resolveInitialLocale = () => {
  const storedLocale = getStoredValue(localeStorageKey)
  return isAppLocale(storedLocale) ? storedLocale : resolveBrowserLocale()
}

const resolveInitialThemeMode = () => {
  const storedThemeMode = getStoredValue(themeStorageKey)
  return isThemeMode(storedThemeMode) ? storedThemeMode : 'slate'
}

export const useAppPreferencesStore = create<AppPreferencesState>((set) => ({
  hydratePreferences: () =>
    set((state) => {
      const nextLocale = resolveInitialLocale()
      const nextThemeMode = resolveInitialThemeMode()

      return state.locale === nextLocale && state.themeMode === nextThemeMode
        ? state
        : { locale: nextLocale, themeMode: nextThemeMode }
    }),
  locale: 'zh-CN',
  themeMode: 'slate',
  setLocale: (locale) =>
    set((state) => {
      setStoredValue(localeStorageKey, locale)
      return state.locale === locale ? state : { locale }
    }),
  setThemeMode: (themeMode) =>
    set((state) => {
      setStoredValue(themeStorageKey, themeMode)
      return state.themeMode === themeMode ? state : { themeMode }
    }),
}))
