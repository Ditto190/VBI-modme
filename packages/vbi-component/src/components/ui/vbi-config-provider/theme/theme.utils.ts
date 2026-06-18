import { darkTheme, lightTheme } from './theme.default'
import { type ThemeConfig, type ThemeMode } from './theme.types'

export const getThemeCssVariables = (userTheme?: ThemeConfig): Record<string, string | undefined> => {
  const mode = userTheme?.mode || getTheme()
  const baseTheme = mode === 'light' ? lightTheme : darkTheme
  const tokens = { ...baseTheme.tokens, ...userTheme?.tokens }

  return {
    'color-scheme': mode,

    '--color-base-100': tokens.colorBase100,
    '--color-base-200': tokens.colorBase200,
    '--color-base-300': tokens.colorBase300,
    '--color-base-content': tokens.colorBaseContent,

    '--color-primary': tokens.colorPrimary,
    '--color-primary-content': tokens.colorPrimaryContent,
    '--color-secondary': tokens.colorSecondary,
    '--color-secondary-content': tokens.colorSecondaryContent,
    '--color-accent': tokens.colorAccent,
    '--color-accent-content': tokens.colorAccentContent,

    '--color-neutral': tokens.colorNeutral,
    '--color-neutral-content': tokens.colorNeutralContent,

    '--color-info': tokens.colorInfo,
    '--color-info-content': tokens.colorInfoContent,
    '--color-success': tokens.colorSuccess,
    '--color-success-content': tokens.colorSuccessContent,
    '--color-warning': tokens.colorWarning,
    '--color-warning-content': tokens.colorWarningContent,
    '--color-error': tokens.colorError,
    '--color-error-content': tokens.colorErrorContent,

    '--radius-selector': tokens.radiusSelector,
    '--radius-field': tokens.radiusField,
    '--radius-box': tokens.radiusBox,
    '--size-selector': tokens.sizeSelector,
    '--size-field': tokens.sizeField,
    '--border': tokens.border,
    '--depth': tokens.depth?.toString(),
    '--noise': tokens.noise?.toString(),
  }
}

const THEME_KEY = 'vbi-theme'

export const getTheme = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark') {
      return 'dark'
    }
    return 'light'
  } catch {
    return 'light'
  }
}

export const setTheme = (mode: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_KEY, mode)
  } catch (error) {
    console.error('Error while saving theme:', error)
  }
}
