import { theme as antdTheme, type ThemeConfig } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import type { ProfessionalLocale, ProfessionalTheme } from 'src/constants/builder'

export const antdLocales: Record<ProfessionalLocale, typeof zhCN> = {
  'en-US': enUS,
  'zh-CN': zhCN,
}

export const getThemeConfig = (themeMode: ProfessionalTheme): ThemeConfig => ({
  algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    borderRadius: 6,
    colorPrimary: themeMode === 'dark' ? '#38bdf8' : '#0f766e',
    controlHeight: 30,
    fontSize: 12,
  },
})
