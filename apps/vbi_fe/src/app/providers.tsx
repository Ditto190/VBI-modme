'use client'

import { useEffect } from 'react'
import { DebugBridgeInstaller } from '../components/DebugBridgeInstaller'
import { NavigationBinder } from '../components/NavigationBinder'
import { ToastViewport } from '../components/ui/toast'
import { useAppPreferencesStore } from '../stores/app-preferences.store'
import { getVbiThemeStyle, isDarkVbiTheme } from '../theme'

export const VbiAppProviders = ({ children }: { children: React.ReactNode }) => {
  const hydratePreferences = useAppPreferencesStore((state) => state.hydratePreferences)
  const themeMode = useAppPreferencesStore((state) => state.themeMode)

  useEffect(() => {
    hydratePreferences()
  }, [hydratePreferences])

  return (
    <div
      data-theme={themeMode}
      data-theme-tone={isDarkVbiTheme(themeMode) ? 'dark' : 'light'}
      style={getVbiThemeStyle(themeMode)}
    >
      <NavigationBinder />
      <DebugBridgeInstaller />
      {children}
      <div data-vbi-portal-root='' />
      <ToastViewport />
    </div>
  )
}
