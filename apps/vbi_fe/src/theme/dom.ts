import { getVbiThemeCssVariables } from './first-paint'
import { isDarkVbiTheme, type VbiThemeMode } from './palette'

export const applyVbiThemeToDocument = (mode: VbiThemeMode) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const tone = isDarkVbiTheme(mode) ? 'dark' : 'light'

  root.dataset.theme = mode
  root.dataset.themeTone = tone
  root.style.colorScheme = tone

  Object.entries(getVbiThemeCssVariables(mode)).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })
}
