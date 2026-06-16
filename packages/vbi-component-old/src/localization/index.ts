import deDE from './locales/de-DE.json'
import enUS from './locales/en-US.json'
import frFR from './locales/fr-FR.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'

export const VBI_COMPONENT_SOURCE_LOCALE = 'en-US' as const
export const VBI_COMPONENT_TARGET_LOCALES = ['de-DE', 'fr-FR', 'id-ID', 'ja-JP', 'ko-KR', 'vi-VN', 'zh-CN'] as const
export const VBI_COMPONENT_LOCALES = ['de-DE', 'en-US', 'fr-FR', 'id-ID', 'ja-JP', 'ko-KR', 'vi-VN', 'zh-CN'] as const

export type VBIComponentLocale = (typeof VBI_COMPONENT_LOCALES)[number]
export type VBIComponentTargetLocale = (typeof VBI_COMPONENT_TARGET_LOCALES)[number]
export type VBIComponentText = Partial<Record<string, string>>
export type VBIComponentTextResolver = (key: string) => string | undefined
export type VBIComponentTextSource = VBIComponentText | VBIComponentTextResolver
export type VBIComponentLocaleChangeListener = (locale: VBIComponentLocale) => void

export interface VBIComponentLocalization {
  getLocale(): VBIComponentLocale
  setLocale(locale: VBIComponentLocale): Promise<void>
  subscribe(listener: VBIComponentLocaleChangeListener): () => void
}

type VBIComponentMessages = typeof enUS

const messages = {
  'de-DE': deDE,
  'en-US': enUS,
  'fr-FR': frFR,
  'id-ID': idID,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'vi-VN': viVN,
  'zh-CN': zhCN,
} satisfies Record<VBIComponentLocale, VBIComponentMessages>

let currentLocale: VBIComponentLocale = VBI_COMPONENT_SOURCE_LOCALE
const localeListeners = new Set<VBIComponentLocaleChangeListener>()

export const isVBIComponentLocale = (value: string | null | undefined): value is VBIComponentLocale =>
  typeof value === 'string' && VBI_COMPONENT_LOCALES.includes(value as VBIComponentLocale)

export const getVBIComponentLocale = (): VBIComponentLocale => currentLocale

export const subscribeVBIComponentLocaleChange = (listener: VBIComponentLocaleChangeListener): (() => void) => {
  localeListeners.add(listener)
  return () => {
    localeListeners.delete(listener)
  }
}

export const setVBIComponentLocale = async (locale: VBIComponentLocale): Promise<void> => {
  if (!isVBIComponentLocale(locale)) {
    throw new Error(`Unsupported VBI component locale: ${locale}`)
  }

  if (currentLocale === locale) {
    return
  }

  currentLocale = locale
  localeListeners.forEach((listener) => listener(locale))
}

export const translateVBIComponentText = (key: string, text?: VBIComponentTextSource): string => {
  if (typeof text === 'function') {
    return (
      text(key) ??
      messages[currentLocale][key as keyof VBIComponentMessages] ??
      enUS[key as keyof VBIComponentMessages] ??
      key
    )
  }

  return (
    text?.[key] ??
    messages[currentLocale][key as keyof VBIComponentMessages] ??
    enUS[key as keyof VBIComponentMessages] ??
    key
  )
}

const localization: VBIComponentLocalization = {
  getLocale: getVBIComponentLocale,
  setLocale: setVBIComponentLocale,
  subscribe: subscribeVBIComponentLocaleChange,
}

export const configureVBIComponentLocalization = (): VBIComponentLocalization => localization
