import { createStore } from 'zustand/vanilla'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import { getI18nApplication } from '../preferences/application'
import type { I18nApplication } from './contract'

export const i18nApplicationStore = createStore<I18nApplication>()(() => getI18nApplication())

useAppPreferencesStore.subscribe(() => {
  i18nApplicationStore.setState(getI18nApplication(), true)
})
