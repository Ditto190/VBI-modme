import { describe, expect, it } from '@stencil/vitest'
import { parseCsv } from 'src/utils/data/parseCsv'

describe('parseCsv', () => {
  it('should parse simple comma-separated values', () => {
    const input = 'name,age,city\nAlice,30,City1\nBob,25,City2'
    const result = parseCsv(input)
    expect(result).toEqual([
      ['name', 'age', 'city'],
      ['Alice', '30', 'City1'],
      ['Bob', '25', 'City2'],
    ])
  })

  it('should handle quoted fields containing commas and newlines', () => {
    const input = 'id,description\n1,"Hello, world"\n2,"Multi\nline"'
    const result = parseCsv(input)
    expect(result).toEqual([
      ['id', 'description'],
      ['1', 'Hello, world'],
      ['2', 'Multi\nline'],
    ])
  })

  it('should handle escaped quotes inside quotes', () => {
    const input = 'id,note\n101,"He said ""hello"""'
    const result = parseCsv(input)
    expect(result).toEqual([
      ['id', 'note'],
      ['101', 'He said "hello"'],
    ])
  })

  it('should strip BOM from first cell if present', () => {
    const input = '\uFEFFcol1,col2\nval1,val2'
    const result = parseCsv(input)
    expect(result[0][0]).toBe('col1')
  })

  it('should handle Windows CRLF line endings', () => {
    const input = 'a,b\r\n1,2\r\n3,4'
    const result = parseCsv(input)
    expect(result).toEqual([
      ['a', 'b'],
      ['1', '2'],
      ['3', '4'],
    ])
  })
})
