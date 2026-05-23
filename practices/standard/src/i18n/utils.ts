import deDE from './locales/de-DE.json'
import enUS from './locales/en-US.json'
import frFR from './locales/fr-FR.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'
import type { DemoLocale } from '../constants/builder'

export type TranslationParams = Record<string, string | number | boolean | null | undefined>
export type Translate = (key: string, params?: TranslationParams) => string

type TranslationMessages = typeof zhCN

const messages: Record<DemoLocale, TranslationMessages> = {
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

export const translate = (locale: DemoLocale, key: string, params?: TranslationParams) => {
  const message = getMessage(messages[locale], key)

  if (typeof message !== 'string') {
    return key
  }

  return formatMessage(message, params)
}

export const createTranslator = (locale: DemoLocale) => {
  return (key: string, params?: TranslationParams) => translate(locale, key, params)
}
