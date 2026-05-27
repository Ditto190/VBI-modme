import type { CSSProperties } from 'react'
import { vbiThemePalettes, type VbiThemeMode } from './palette'

type CssVariableName = `--vbi-${string}`
type CssVariableStyle = CSSProperties & Record<CssVariableName, string>
type ThemeCssVariableKey = keyof (typeof vbiThemePalettes)[VbiThemeMode]

const themeCssVariableKeys = [
  'secondary',
  'sider',
  'control',
  'controlMuted',
  'text',
  'textStrong',
  'textMuted',
  'textSoft',
  'border',
  'borderStrong',
  'activeBg',
  'activeText',
  'hoverBg',
  'tableHead',
  'rowBorder',
  'primary',
  'primaryHover',
  'primaryText',
  'focus',
  'placeholder',
  'danger',
  'quote',
  'codeBg',
  'codeInk',
  'editorBg',
  'shadow',
] as const satisfies readonly ThemeCssVariableKey[]

const toCssVariableName = (key: string): CssVariableName =>
  `--vbi-${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`

export const getVbiThemeStyle = (mode: VbiThemeMode): CSSProperties => {
  const palette = vbiThemePalettes[mode]

  return themeCssVariableKeys.reduce<CssVariableStyle>(
    (style, key) => {
      style[toCssVariableName(key)] = palette[key]
      return style
    },
    { '--vbi-bg': palette.secondary } as CssVariableStyle,
  )
}
