import type { VBIComponentLocale } from './utils'

let currentLocale: VBIComponentLocale = 'en-US'
export type VBIComponentLocaleChangeListener = (locale: VBIComponentLocale) => void

const listeners = new Set<VBIComponentLocaleChangeListener>()

export const getLocale = () => currentLocale

export const setLocale = (locale: VBIComponentLocale) => {
  if (currentLocale !== locale) {
    currentLocale = locale
    listeners.forEach((listener) => listener(locale))
  }
}

export const subscribe = (listener: VBIComponentLocaleChangeListener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export interface VBIComponentLocalization {
  getLocale(): VBIComponentLocale
  setLocale(locale: VBIComponentLocale): Promise<void>
  subscribe(listener: VBIComponentLocaleChangeListener): () => void
}

const localization: VBIComponentLocalization = {
  getLocale,
  setLocale: async (locale) => setLocale(locale),
  subscribe,
}

export const configureVBIComponentLocalization = (): VBIComponentLocalization => localization
