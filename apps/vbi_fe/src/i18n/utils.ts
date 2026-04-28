import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'

export type AppLocale = 'zh-CN' | 'en-US'
export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string

type TranslationMessages = typeof zhCN

const messages: Record<AppLocale, TranslationMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const formatMessage = (message: string, params?: TranslationParams) => {
  if (!params) return message

  return message.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    const value = params[key]
    return value === undefined || value === null ? match : String(value)
  })
}

export const translate = (locale: AppLocale, key: string, params?: TranslationParams) => {
  const message = messages[locale][key as keyof TranslationMessages]
  return typeof message === 'string' ? formatMessage(message, params) : key
}

export const createTranslator =
  (locale: AppLocale): Translate =>
  (key, params) =>
    translate(locale, key, params)
