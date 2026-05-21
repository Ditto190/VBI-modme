import { describe, expect, test } from '@rstest/core'
import { createVBIComponentPlaceholder } from '../src/index.js'

describe('@visactor/vbi-component', () => {
  test('exports placeholder entry', () => {
    expect(createVBIComponentPlaceholder()).toBe('vbi-component')
  })
})
