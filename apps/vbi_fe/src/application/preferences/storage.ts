import { isAppLocale, type AppLocale } from '../../i18n/utils'
import { defaultVbiThemeMode, isVbiThemeMode } from '../../theme'
import type { AppThemeMode } from './contract'

export const localeStorageKey = 'vbi.locale'
export const themeStorageKey = 'vbi.theme'
const preferenceCookieMaxAge = 60 * 60 * 24 * 365

export const defaultAppPreferences = {
  locale: 'zh-CN' as AppLocale,
  themeMode: defaultVbiThemeMode as AppThemeMode,
}

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

export const resolvePersistedLocalePreference = () => {
  const storedLocale = getPersistedValue(localeStorageKey)
  return isAppLocale(storedLocale) ? storedLocale : null
}

export const resolvePersistedThemePreference = () => {
  const storedThemeMode = getPersistedValue(themeStorageKey)
  return isVbiThemeMode(storedThemeMode) ? storedThemeMode : null
}

export const persistLocalePreference = (locale: AppLocale) => {
  setPersistedValue(localeStorageKey, locale)
}

export const persistThemePreference = (themeMode: AppThemeMode) => {
  setPersistedValue(themeStorageKey, themeMode)
}

export const refreshPreferenceCookies = () => {
  const persistedLocale = resolvePersistedLocalePreference()
  const persistedThemeMode = resolvePersistedThemePreference()

  if (persistedLocale) setPreferenceCookie(localeStorageKey, persistedLocale)
  if (persistedThemeMode) setPreferenceCookie(themeStorageKey, persistedThemeMode)

  return { persistedLocale, persistedThemeMode }
}
