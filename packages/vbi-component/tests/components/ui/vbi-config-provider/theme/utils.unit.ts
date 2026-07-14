import { describe, expect, it } from '@stencil/vitest'
import { getThemeCssVariables } from 'src/components/ui/vbi-config-provider/theme/utils'

describe('getThemeCssVariables', () => {
  it('should return light theme CSS variables by default', () => {
    const vars = getThemeCssVariables()
    expect(vars['color-scheme']).toBe('light')
    expect(vars['--color-primary']).toBeDefined()
  })

  it('should return dark theme CSS variables when vbiTheme is dark', () => {
    const vars = getThemeCssVariables(undefined, 'dark')
    expect(vars['color-scheme']).toBe('dark')
  })

  it('should override base theme tokens with userTheme tokens', () => {
    const vars = getThemeCssVariables({
      tokens: { colorPrimary: '#123456' } as any,
    })
    expect(vars['--color-primary']).toBe('#123456')
  })
})
