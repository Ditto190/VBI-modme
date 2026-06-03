import { useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../application'
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
  const { locale, themeMode } = useApplication(
    (state) => ({
      locale: state.i18n.locale,
      themeMode: state.theme.mode,
    }),
    { equality: applicationShallowEqual },
  )

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
