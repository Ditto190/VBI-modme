import { describe, expect, it } from '@stencil/vitest'
import { randomShortId } from 'src/utils/random'

describe('randomShortId', () => {
  it('should return a string of length 7', () => {
    const id = randomShortId()
    expect(typeof id).toBe('string')
    expect(id.length).toBe(7)
  })

  it('should generate alphanumeric characters', () => {
    const id = randomShortId()
    expect(id).toMatch(/^[a-z0-9]+$/)
  })

  it('should generate different ids on multiple calls', () => {
    const id1 = randomShortId()
    const id2 = randomShortId()
    expect(id1).not.toBe(id2)
  })
})
