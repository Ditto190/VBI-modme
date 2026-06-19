export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string
export type Locale = 'zh-CN' | 'en-US' | 'ja-JP' | 'de-DE' | 'id-ID' | 'fr-FR' | 'ko-KR' | 'vi-VN'
