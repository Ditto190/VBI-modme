import { createStore } from 'zustand/vanilla'
import { useAppPreferencesStore } from '../../stores/app-preferences.store'
import { getThemeApplication } from '../preferences/application'
import type { ThemeApplication } from './contract'

export const themeApplicationStore = createStore<ThemeApplication>()(() => getThemeApplication())

useAppPreferencesStore.subscribe(() => {
  themeApplicationStore.setState(getThemeApplication(), true)
})
