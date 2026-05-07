import { expect, test } from '@rstest/core'
import {
  createMappedFieldDragPayload,
  createSchemaFieldDragPayload,
  getDragLabel,
  getDragRole,
} from '../src/components/Editor/dnd/dragPayload'
import type { MappedField, SchemaField } from '../src/types'

const schemaField: SchemaField = { isDate: false, name: 'region', role: 'dimension', type: 'string' }

const mappedField: MappedField = {
  alias: 'Revenue',
  aggregate: { func: 'sum' },
  encoding: 'yAxis',
  field: 'sales',
  id: 'sales-id',
  isDate: false,
  role: 'measure',
}

test('creates schema field drag payload with stable role and label helpers', () => {
  const payload = createSchemaFieldDragPayload(schemaField)

  expect(payload).toEqual({ field: schemaField, kind: 'schema-field' })
  expect(getDragRole(payload)).toBe('dimension')
  expect(getDragLabel(payload)).toBe('region')
})

test('creates mapped field drag payload with source metadata', () => {
  const payload = createMappedFieldDragPayload(mappedField, {
    sourceEncoding: 'yAxis',
    sourceIndex: 2,
    sourceSlotIndex: 1,
  })

  expect(payload).toEqual({
    item: mappedField,
    kind: 'mapped-field',
    sourceEncoding: 'yAxis',
    sourceIndex: 2,
    sourceSlotIndex: 1,
  })
  expect(getDragRole(payload)).toBe('measure')
  expect(getDragLabel(payload)).toBe('sum(Revenue)')
})
