import { describe, expect, it } from '@stencil/vitest'
import { getFieldRoleBySchemaType, isDateSchemaType } from 'src/utils/data/fieldRole'

describe('getFieldRoleBySchemaType', () => {
  it('should return "measure" when schemaType is "number"', () => {
    expect(getFieldRoleBySchemaType('number')).toBe('measure')
  })

  it('should return "dimension" for string, date or undefined schemaType', () => {
    expect(getFieldRoleBySchemaType('string')).toBe('dimension')
    expect(getFieldRoleBySchemaType('date')).toBe('dimension')
    expect(getFieldRoleBySchemaType(undefined)).toBe('dimension')
  })
})

describe('isDateSchemaType', () => {
  it('should return true for date schema types case-insensitively', () => {
    expect(isDateSchemaType('date')).toBe(true)
    expect(isDateSchemaType('DATE')).toBe(true)
    expect(isDateSchemaType('datetime')).toBe(true)
    expect(isDateSchemaType('timestamp')).toBe(true)
  })

  it('should return false for non-date schema types or undefined', () => {
    expect(isDateSchemaType('string')).toBe(false)
    expect(isDateSchemaType('number')).toBe(false)
    expect(isDateSchemaType(undefined)).toBe(false)
  })
})
