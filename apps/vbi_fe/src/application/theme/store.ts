import { createStore } from 'zustand/vanilla'
import { persistThemePreference, refreshPreferenceCookies } from '../preferences/storage'
import { darkVbiThemeModes, lightVbiThemeModes } from '../../theme/palette'
import type { ThemeApplication } from './contract'

const createThemeList = () => ({
  dark: [...darkVbiThemeModes],
  light: [...lightVbiThemeModes],
})

const assertListedTheme = (mode: ThemeApplication['mode']) => {
  const themes = createThemeList()
  const availableThemes = [...themes.light, ...themes.dark]
  if (availableThemes.includes(mode)) return

  throw new Error(
    `Unknown application theme "${String(mode)}". Use application.getState().theme.list() before application.getState().theme.change().`,
  )
}

let clientThemeInitialized = false

export const themeApplicationStore = createStore<ThemeApplication>()(() => ({
  mode: 'slate',
  list: createThemeList,
  change: (mode) => {
    setThemeApplicationMode(mode, { persist: true })
  },
}))

export const setThemeApplicationMode = (
  mode: ThemeApplication['mode'],
  options: {
    persist?: boolean
  } = {},
) => {
  assertListedTheme(mode)
  if (options.persist) persistThemePreference(mode)
  themeApplicationStore.setState((state) => (state.mode === mode ? state : { mode }))
}

export const initializeThemeApplication = (mode: ThemeApplication['mode']) => {
  if (typeof window !== 'undefined') {
    if (clientThemeInitialized) return
    clientThemeInitialized = true
  }

  setThemeApplicationMode(mode)
}

export const reconcilePersistedThemeApplication = () => {
  const { persistedThemeMode } = refreshPreferenceCookies()
  if (persistedThemeMode) setThemeApplicationMode(persistedThemeMode)
}
