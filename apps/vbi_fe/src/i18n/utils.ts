import enUS from './locales/en-US.json'
import deDE from './locales/de-DE.json'
import frFR from './locales/fr-FR.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'

export type AppLocale = 'zh-CN' | 'en-US' | 'ja-JP' | 'de-DE' | 'id-ID' | 'fr-FR' | 'ko-KR' | 'vi-VN'
export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string

type TranslationMessages = typeof zhCN

const messages: Record<AppLocale, TranslationMessages> = {
  'de-DE': deDE,
  'en-US': enUS,
  'fr-FR': frFR,
  'id-ID': idID,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'vi-VN': viVN,
  'zh-CN': zhCN,
}

export const appLocales = Object.keys(messages) as AppLocale[]
export const isAppLocale = (value: string | null | undefined): value is AppLocale =>
  typeof value === 'string' && appLocales.includes(value as AppLocale)

const languageFallbacks: Record<string, AppLocale> = {
  de: 'de-DE',
  en: 'en-US',
  fr: 'fr-FR',
  id: 'id-ID',
  ja: 'ja-JP',
  ko: 'ko-KR',
  vi: 'vi-VN',
  zh: 'zh-CN',
}

export const resolveLocaleFromLanguageTags = (languages: readonly string[]): AppLocale => {
  for (const language of languages) {
    if (isAppLocale(language)) return language

    const languagePrefix = language.split('-')[0]?.toLowerCase()
    const matchedLocale = languagePrefix ? languageFallbacks[languagePrefix] : undefined

    if (matchedLocale) return matchedLocale
  }

  return 'zh-CN'
}

const parseAcceptLanguageHeader = (acceptLanguage: string | null | undefined) =>
  (acceptLanguage ?? '')
    .split(',')
    .map((item) => {
      const [language, quality = 'q=1'] = item.trim().split(';')
      const score = Number.parseFloat(quality.replace(/^q=/, ''))

      return { language, score: Number.isFinite(score) ? score : 1 }
    })
    .filter((item) => item.language)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.language)

export const resolveLocaleFromAcceptLanguage = (acceptLanguage: string | null | undefined): AppLocale =>
  resolveLocaleFromLanguageTags(parseAcceptLanguageHeader(acceptLanguage))

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
