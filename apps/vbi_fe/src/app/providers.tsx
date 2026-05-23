'use client'

import { useEffect } from 'react'
import { NavigationBinder } from '../components/NavigationBinder'
import { ToastViewport } from '../components/ui/toast'
import {
  initializeAppPreferences,
  reconcilePersistedAppPreferences,
  useAppPreferencesStore,
  type AppThemeMode,
} from '../stores/app-preferences.store'
import type { AppLocale } from '../i18n'
import { getVbiThemeStyle, isDarkVbiTheme } from '../theme'

type VbiAppProvidersProps = {
  children: React.ReactNode
  initialLocale: AppLocale
  initialThemeMode: AppThemeMode
}

export const VbiAppProviders = ({ children, initialLocale, initialThemeMode }: VbiAppProvidersProps) => {
  initializeAppPreferences({ locale: initialLocale, themeMode: initialThemeMode })

  const locale = useAppPreferencesStore((state) => state.locale)
  const themeMode = useAppPreferencesStore((state) => state.themeMode)

  useEffect(() => {
    reconcilePersistedAppPreferences()
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div
      data-theme={themeMode}
      data-theme-tone={isDarkVbiTheme(themeMode) ? 'dark' : 'light'}
      style={getVbiThemeStyle(themeMode)}
    >
      <NavigationBinder />
      {children}
      <div data-vbi-portal-root='' />
      <ToastViewport />
    </div>
  )
}
