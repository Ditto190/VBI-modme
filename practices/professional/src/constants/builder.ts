export const PROFESSIONAL_DEFAULT_LOCALE = 'zh-CN' as const
export const PROFESSIONAL_DEFAULT_THEME = 'dark' as const
export const PROFESSIONAL_DEFAULT_LIMIT = 1000

export const PROFESSIONAL_SUPPORTED_LOCALES = [
  'zh-CN',
  'en-US',
  'ja-JP',
  'de-DE',
  'id-ID',
  'fr-FR',
  'ko-KR',
  'vi-VN',
] as const
export const PROFESSIONAL_SUPPORTED_THEMES = ['light', 'dark'] as const

export type ProfessionalLocale = (typeof PROFESSIONAL_SUPPORTED_LOCALES)[number]
export type ProfessionalTheme = (typeof PROFESSIONAL_SUPPORTED_THEMES)[number]

export const PROFESSIONAL_LOCALE_LABELS: Record<ProfessionalLocale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'de-DE': 'Deutsch',
  'id-ID': 'Bahasa Indonesia',
  'fr-FR': 'Français',
  'ko-KR': '한국어',
  'vi-VN': 'Tiếng Việt',
}
