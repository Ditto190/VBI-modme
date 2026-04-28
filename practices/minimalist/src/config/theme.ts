import { theme as antdTheme, type ThemeConfig } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import type { DemoTheme } from 'src/constants/builder'

export const antdLocales = { 'zh-CN': zhCN, 'en-US': enUS } as const

export const getThemeConfig = (themeMode: DemoTheme): ThemeConfig => ({
  algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    borderRadius: 6,
    colorPrimary: themeMode === 'dark' ? '#4f9cf9' : '#2563eb',
    controlHeight: 28,
    fontSize: 12,
  },
})
