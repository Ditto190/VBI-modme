export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string
