import { describe, expect, it } from '@stencil/vitest'
import { buildShelfMenuLabel } from 'src/components/chart/shelves/utils/menuItemUtils'

describe('buildShelfMenuLabel', () => {
  it('should return plain label when extra is not provided', () => {
    expect(buildShelfMenuLabel('Sum')).toBe('Sum')
    expect(buildShelfMenuLabel('Count', undefined)).toBe('Count')
  })

  it('should format label with extra info when extra is provided', () => {
    expect(buildShelfMenuLabel('Sum', 'Sales')).toBe('Sum (Sales)')
  })
})
