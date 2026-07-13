import { vbiThemePalettes, type VbiThemeMode } from './palette'

export type CssVariableName = `--vbi-${string}`
export type CssVariableMap = Record<CssVariableName, string>

type ThemeCssVariableKey = keyof (typeof vbiThemePalettes)[VbiThemeMode]

export const defaultVbiThemeMode = 'slate' satisfies VbiThemeMode

export const vbiThemeCssVariableKeys = [
  'secondary',
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

export const isVbiThemeMode = (value: string | null | undefined): value is VbiThemeMode =>
  typeof value === 'string' && value in vbiThemePalettes

const toCssVariableName = (key: string): CssVariableName =>
  `--vbi-${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`

export const getVbiThemeCssVariables = (mode: VbiThemeMode): CssVariableMap => {
  const palette = vbiThemePalettes[mode]

  return vbiThemeCssVariableKeys.reduce<CssVariableMap>(
    (variables, key) => {
      variables[toCssVariableName(key)] = palette[key]
      return variables
    },
    { '--vbi-bg': palette.secondary } as CssVariableMap,
  )
}
