import { describe, expect, it } from '@stencil/vitest'
import { inferSchema, rowsToDataset } from 'src/utils/data/dataset'

describe('inferSchema', () => {
  it('should infer number type when all non-empty sampled values are numeric', () => {
    const headers = ['id', 'sales', 'category']
    const rows = [
      ['100', '25.5', 'Electronics'],
      ['101', '10.0', 'Books'],
    ]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([
      { name: 'id', type: 'number' },
      { name: 'sales', type: 'number' },
      { name: 'category', type: 'string' },
    ])
  })

  it('should infer date type for date strings', () => {
    const headers = ['date']
    const rows = [['2024-01-01'], ['2024/05/10']]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([{ name: 'date', type: 'date' }])
  })

  it('should fallback to string type when mixed or empty', () => {
    const headers = ['mixed']
    const rows = [['123'], ['abc']]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([{ name: 'mixed', type: 'string' }])
  })
})

describe('rowsToDataset', () => {
  it('should convert rows to LocalRow array according to schema', () => {
    const headers = ['product', 'price']
    const rows = [
      ['Apple', '1.5'],
      ['Orange', ''],
    ]
    const schema = [
      { name: 'product', type: 'string' as const },
      { name: 'price', type: 'number' as const },
    ]
    const dataset = rowsToDataset(headers, rows, schema)
    expect(dataset).toEqual([
      { product: 'Apple', price: 1.5 },
      { product: 'Orange', price: null },
    ])
  })
})
