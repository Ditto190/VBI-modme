import type { CSSProperties } from 'react'
import { getVbiThemeCssVariables, type CssVariableMap } from './first-paint'
import type { VbiThemeMode } from './palette'

export const getVbiThemeStyle = (mode: VbiThemeMode): CSSProperties => {
  return getVbiThemeCssVariables(mode) as CSSProperties & CssVariableMap
}
