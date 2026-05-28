'use client'

import { useEffect, useState } from 'react'
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
import { ManagedRouteShell } from '../views/ManagedRouteShell'

type VbiAppProvidersProps = {
  children: React.ReactNode
  initialLocale: AppLocale
  initialThemeMode: AppThemeMode
}

export const VbiAppProviders = ({ children, initialLocale, initialThemeMode }: VbiAppProvidersProps) => {
  useState(() => {
    initializeAppPreferences({ locale: initialLocale, themeMode: initialThemeMode })
    return null
  })

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
      <ManagedRouteShell>{children}</ManagedRouteShell>
      <div data-vbi-portal-root='' />
      <ToastViewport />
    </div>
  )
}
