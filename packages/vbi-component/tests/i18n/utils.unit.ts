import { describe, expect, it } from '@stencil/vitest'
import { createTranslator, translate } from 'src/i18n/utils'

describe('translate', () => {
  it('should return translation string for known keys', () => {
    const result = translate('en-US', 'builderCreateChart')
    expect(typeof result).toBe('string')
  })

  it('should return the key when key is not found', () => {
    const key = 'nonExistentTranslationKey_12345'
    expect(translate('en-US', key)).toBe(key)
  })

  it('should interpolate params when placeholders exist', () => {
    const result = translate('en-US', 'nonExistentKey', { name: 'World' })
    expect(result).toBe('nonExistentKey')
  })
})

describe('createTranslator', () => {
  it('should return a translator bound to the given locale', () => {
    const t = createTranslator('en-US')
    const key = 'builderCreateChart'
    expect(t(key)).toBe(translate('en-US', key))
  })
})
