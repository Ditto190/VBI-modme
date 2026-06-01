import { configureLocalization, type LocaleModule } from '@lit/localize'
import { allLocales, sourceLocale, targetLocales } from './generated/locale-codes'

export type VBIComponentLocale = (typeof allLocales)[number]
export type VBIComponentTargetLocale = (typeof targetLocales)[number]

type VBIComponentLocalization = ReturnType<typeof configureLocalization>

const localeLoaders: Record<VBIComponentTargetLocale, () => Promise<LocaleModule>> = {
  'de-DE': () => import('./generated/locales/de-DE'),
  'fr-FR': () => import('./generated/locales/fr-FR'),
  'id-ID': () => import('./generated/locales/id-ID'),
  'ja-JP': () => import('./generated/locales/ja-JP'),
  'ko-KR': () => import('./generated/locales/ko-KR'),
  'vi-VN': () => import('./generated/locales/vi-VN'),
  'zh-CN': () => import('./generated/locales/zh-CN'),
}

let localization: VBIComponentLocalization | undefined

export const configureVBIComponentLocalization = (): VBIComponentLocalization => {
  if (localization) {
    return localization
  }

  localization = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: async (locale) => {
      const loadLocale = localeLoaders[locale as VBIComponentTargetLocale]
      if (!loadLocale) {
        throw new Error(`Unsupported VBI component locale: ${locale}`)
      }

      return loadLocale()
    },
  })

  return localization
}

export const getVBIComponentLocale = (): VBIComponentLocale => {
  return configureVBIComponentLocalization().getLocale() as VBIComponentLocale
}

export const setVBIComponentLocale = (locale: VBIComponentLocale): Promise<void> => {
  return configureVBIComponentLocalization().setLocale(locale)
}

export {
  allLocales as VBI_COMPONENT_LOCALES,
  sourceLocale as VBI_COMPONENT_SOURCE_LOCALE,
  targetLocales as VBI_COMPONENT_TARGET_LOCALES,
}
