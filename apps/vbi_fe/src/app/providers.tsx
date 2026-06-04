'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { exposeApplicationToWindow, setApplicationPathname, useApplication } from '../application'
import { NavigationBinder } from '../components/NavigationBinder'
import { ToastViewport } from '../components/ui/toast'
import { initializeI18nApplication, reconcilePersistedI18nApplication } from '../application/i18n/store'
import { initializeThemeApplication, reconcilePersistedThemeApplication } from '../application/theme/store'
import type { AppThemeMode } from '../application/preferences/contract'
import type { AppLocale } from '../i18n'
import { applyVbiThemeToDocument } from '../theme'

type VbiAppProvidersProps = {
  children: React.ReactNode
  initialLocale: AppLocale
  initialThemeMode: AppThemeMode
}

export const VbiAppProviders = ({ children, initialLocale, initialThemeMode }: VbiAppProvidersProps) => {
  useState(() => {
    initializeI18nApplication(initialLocale)
    initializeThemeApplication(initialThemeMode)
    if (typeof window !== 'undefined') setApplicationPathname(window.location.pathname)
    return null
  })

  const locale = useApplication((state) => state.i18n.locale)
  const themeMode = useApplication((state) => state.theme.mode)

  useEffect(() => {
    exposeApplicationToWindow()
    reconcilePersistedI18nApplication()
    reconcilePersistedThemeApplication()
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useLayoutEffect(() => {
    applyVbiThemeToDocument(themeMode)

    let secondFrame = 0
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.documentElement.removeAttribute('data-vbi-first-paint')
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [themeMode])

  return (
    <div>
      <NavigationBinder />
      {children}
      <div data-vbi-portal-root='' />
      <ToastViewport />
    </div>
  )
}
