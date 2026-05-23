import { create } from 'zustand'
import { isAppLocale, type AppLocale } from '../i18n/utils'
import { vbiThemePalettes, type VbiThemeMode } from '../theme/palette'

export type AppThemeMode = VbiThemeMode

type AppPreferencesState = {
  locale: AppLocale
  themeMode: AppThemeMode
  setLocale(locale: AppLocale): void
  setThemeMode(themeMode: AppThemeMode): void
}

const localeStorageKey = 'vbi.locale'
const themeStorageKey = 'vbi.theme'
const preferenceCookieMaxAge = 60 * 60 * 24 * 365
const defaultPreferences = {
  locale: 'zh-CN' as AppLocale,
  themeMode: 'slate' as AppThemeMode,
}

type InitialAppPreferences = Partial<{
  locale: AppLocale
  themeMode: AppThemeMode
}>

let clientPreferencesInitialized = false

const getLocalStorageValue = (key: string) => {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const getCookieValue = (key: string) => {
  if (typeof document === 'undefined') return null

  const encodedKey = encodeURIComponent(key)
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${encodedKey}=`))
    ?.slice(encodedKey.length + 1)

  return cookie ? decodeURIComponent(cookie) : null
}

const getPersistedValue = (key: string) => getCookieValue(key) ?? getLocalStorageValue(key)

const setPreferenceCookie = (key: string, value: string) => {
  if (typeof document === 'undefined') return

  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=${preferenceCookieMaxAge}; SameSite=Lax`
}

const setPersistedValue = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Storage can be disabled in privacy modes; the in-memory state still works.
    }
  }

  setPreferenceCookie(key, value)
}

const isThemeMode = (value: string | null): value is AppThemeMode =>
  typeof value === 'string' && value in vbiThemePalettes

const resolvePersistedLocalePreference = () => {
  const storedLocale = getPersistedValue(localeStorageKey)
  return isAppLocale(storedLocale) ? storedLocale : null
}

const resolvePersistedThemePreference = () => {
  const storedThemeMode = getPersistedValue(themeStorageKey)
  return isThemeMode(storedThemeMode) ? storedThemeMode : null
}

const normalizeInitialPreferences = (preferences: InitialAppPreferences) => ({
  locale: preferences.locale ?? defaultPreferences.locale,
  themeMode: preferences.themeMode ?? defaultPreferences.themeMode,
})

export const initializeAppPreferences = (preferences: InitialAppPreferences) => {
  if (typeof window !== 'undefined') {
    if (clientPreferencesInitialized) return
    clientPreferencesInitialized = true
  }

  useAppPreferencesStore.setState(normalizeInitialPreferences(preferences))
}

export const reconcilePersistedAppPreferences = () => {
  const persistedLocale = resolvePersistedLocalePreference()
  const persistedThemeMode = resolvePersistedThemePreference()

  if (persistedLocale) setPreferenceCookie(localeStorageKey, persistedLocale)
  if (persistedThemeMode) setPreferenceCookie(themeStorageKey, persistedThemeMode)

  useAppPreferencesStore.setState((state) => ({
    locale: persistedLocale ?? state.locale,
    themeMode: persistedThemeMode ?? state.themeMode,
  }))
}

export const useAppPreferencesStore = create<AppPreferencesState>((set) => ({
  locale: defaultPreferences.locale,
  themeMode: defaultPreferences.themeMode,
  setLocale: (locale) =>
    set((state) => {
      setPersistedValue(localeStorageKey, locale)
      return state.locale === locale ? state : { locale }
    }),
  setThemeMode: (themeMode) =>
    set((state) => {
      setPersistedValue(themeStorageKey, themeMode)
      return state.themeMode === themeMode ? state : { themeMode }
    }),
}))
