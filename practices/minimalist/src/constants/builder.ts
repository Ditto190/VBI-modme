export const DEMO_DEFAULT_LOCALE = 'zh-CN' as const
export const DEMO_DEFAULT_THEME = 'light' as const
export const DEMO_DEFAULT_LIMIT = 1000
export const DEMO_SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'ja-JP', 'de-DE', 'id-ID', 'fr-FR', 'ko-KR', 'vi-VN'] as const
export const DEMO_SUPPORTED_THEMES = ['light', 'dark'] as const

export type DemoLocale = (typeof DEMO_SUPPORTED_LOCALES)[number]
export type DemoTheme = (typeof DEMO_SUPPORTED_THEMES)[number]

export const DEMO_LOCALE_LABELS: Record<DemoLocale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'de-DE': 'Deutsch',
  'id-ID': 'Bahasa Indonesia',
  'fr-FR': 'Français',
  'ko-KR': '한국어',
  'vi-VN': 'Tiếng Việt',
}
