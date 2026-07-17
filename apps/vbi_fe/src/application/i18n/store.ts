import { createStore } from 'zustand/vanilla'
import { appLocales, createTranslator } from '../../i18n/utils'
import { persistLocalePreference, refreshPreferenceCookies } from '../preferences/storage'
import type { I18nApplication } from './contract'

const listLocales = () => [...appLocales]
let clientI18nInitialized = false

const assertListedLocale = (locale: I18nApplication['locale']) => {
  const locales = listLocales()
  if (locales.includes(locale)) return

  throw new Error(
    `Unknown application locale "${String(locale)}". Use application.getState().i18n.list() before application.getState().i18n.change().`,
  )
}

const createI18nState = (locale: I18nApplication['locale']): I18nApplication => ({
  locale,
  list: listLocales,
  change: (nextLocale) => {
    setI18nApplicationLocale(nextLocale, { persist: true })
  },
  t: createTranslator(locale),
})

export const i18nApplicationStore = createStore<I18nApplication>()(() => createI18nState('zh-CN'))

export const setI18nApplicationLocale = (
  locale: I18nApplication['locale'],
  options: {
    persist?: boolean
  } = {},
) => {
  assertListedLocale(locale)
  if (options.persist) persistLocalePreference(locale)
  i18nApplicationStore.setState((state) => (state.locale === locale ? state : createI18nState(locale)), true)
}

export const initializeI18nApplication = (locale: I18nApplication['locale']) => {
  if (typeof window !== 'undefined') {
    if (clientI18nInitialized) return
    clientI18nInitialized = true
  }

  setI18nApplicationLocale(locale)
}

export const reconcilePersistedI18nApplication = () => {
  const { persistedLocale } = refreshPreferenceCookies()
  if (persistedLocale) setI18nApplicationLocale(persistedLocale)
}
