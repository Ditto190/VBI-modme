export const VBI_DEFAULT_LOCALE = 'zh-CN' as const
export const VBI_DEFAULT_THEME = 'light' as const
export const VBI_DEFAULT_LIMIT = 1000
export const VBI_MAX_LIMIT = 1000

export const VBI_SUPPORTED_LOCALES = ['zh-CN', 'en-US', 'ja-JP', 'de-DE', 'id-ID', 'fr-FR', 'ko-KR', 'vi-VN'] as const
export const VBI_SUPPORTED_THEMES = ['light', 'dark'] as const

export type VbiLocale = (typeof VBI_SUPPORTED_LOCALES)[number]
export type VbiTheme = (typeof VBI_SUPPORTED_THEMES)[number]

export const VBI_LOCALE_LABELS: Record<VbiLocale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'de-DE': 'Deutsch',
  'id-ID': 'Bahasa Indonesia',
  'fr-FR': 'Français',
  'ko-KR': '한국어',
  'vi-VN': 'Tiếng Việt',
}
