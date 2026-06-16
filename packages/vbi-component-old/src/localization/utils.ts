import deDE from './locales/de-DE.json'
import enUS from './locales/en-US.json'
import frFR from './locales/fr-FR.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'

export const VBI_COMPONENT_LOCALES = ['de-DE', 'en-US', 'fr-FR', 'id-ID', 'ja-JP', 'ko-KR', 'vi-VN', 'zh-CN'] as const
export type VBIComponentLocale = (typeof VBI_COMPONENT_LOCALES)[number]

export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string

type TranslationMessages = typeof zhCN

const messages: Record<VBIComponentLocale, TranslationMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}

const getMessage = (messagesObject: TranslationMessages, key: string) => {
  if (!Object.prototype.hasOwnProperty.call(messagesObject, key)) {
    return undefined
  }

  return messagesObject[key as keyof TranslationMessages]
}

const formatMessage = (message: string, params?: TranslationParams) => {
  if (!params) {
    return message
  }

  return message.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    const value = params[key]
    return value === undefined || value === null ? match : String(value)
  })
}

export const translate = (locale: VBIComponentLocale, key: string, params?: TranslationParams) => {
  const message = getMessage(messages[locale], key)

  if (typeof message !== 'string') {
    return key
  }

  return formatMessage(message, params)
}

export const createTranslator = (locale: VBIComponentLocale) => {
  return (key: string, params?: TranslationParams) => translate(locale, key, params)
}

export const VBI_COMPONENT_SOURCE_LOCALE = 'en-US' as const
export const VBI_COMPONENT_TARGET_LOCALES = ['de-DE', 'fr-FR', 'id-ID', 'ja-JP', 'ko-KR', 'vi-VN', 'zh-CN'] as const
export type VBIComponentTargetLocale = (typeof VBI_COMPONENT_TARGET_LOCALES)[number]

export const isVBIComponentLocale = (value: string | null | undefined): value is VBIComponentLocale =>
  typeof value === 'string' && VBI_COMPONENT_LOCALES.includes(value as VBIComponentLocale)

export type VBIComponentText = Partial<Record<string, string>>
export type VBIComponentTextResolver = (key: string) => string | undefined
export type VBIComponentTextSource = VBIComponentText | VBIComponentTextResolver
