import { useMemo } from 'react'
import { type AppThemeMode, useAppPreferencesStore } from '../stores/app-preferences.store'
import type { AppLocale } from '../i18n'
import { isDarkVbiTheme } from '../theme'

type StandardAppLocale = 'zh-CN' | 'en-US' | 'ja-JP' | 'de-DE' | 'id-ID' | 'fr-FR' | 'ko-KR' | 'vi-VN'
type StandardAppTheme = 'light' | 'dark'

const standardLocaleFallbacks: Record<AppLocale, StandardAppLocale> = {
  'de-DE': 'de-DE',
  'en-US': 'en-US',
  'fr-FR': 'fr-FR',
  'id-ID': 'id-ID',
  'ja-JP': 'ja-JP',
  'ko-KR': 'ko-KR',
  'vi-VN': 'vi-VN',
  'zh-CN': 'zh-CN',
}

export const useStandardAppProps = () => {
  const preferenceKey = useAppPreferencesStore((state) => `${state.locale}|${state.themeMode}`)
  const [locale, themeMode] = preferenceKey.split('|') as [AppLocale, AppThemeMode]

  return useMemo(() => {
    const theme: StandardAppTheme = isDarkVbiTheme(themeMode) ? 'dark' : 'light'
    return {
      hideLocale: true,
      hideTheme: true,
      locale: standardLocaleFallbacks[locale],
      theme,
    }
  }, [locale, themeMode])
}
