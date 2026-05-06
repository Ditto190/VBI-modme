import { expect, test } from '@rstest/core'
import {
  isNoopSlotReorder,
  normalizeSlotInsertIndex,
  resolveProfessionalDropAction,
} from '../src/components/Editor/dnd/dropLogic'
import type { FieldSlot, MappedField, SchemaField } from '../src/types'
import type { SlotDropPayload } from '../src/types/dnd'

const dimensionSlot: FieldSlot = { accepts: ['dimension'], dimensionEncoding: 'xAxis', title: 'X Axis' }
const measureSlot: FieldSlot = { accepts: ['measure'], measureEncoding: 'yAxis', title: 'Y Axis' }
const colorSlot: FieldSlot = { accepts: ['dimension'], dimensionEncoding: 'color', title: 'Color' }
const dimensionField: SchemaField = { isDate: false, name: 'region', role: 'dimension', type: 'string' }
const mappedDimension: MappedField = {
  encoding: 'xAxis',
  field: 'region',
  id: 'region-id',
  isDate: false,
  role: 'dimension',
}

const createDrop = (slot: FieldSlot, insertIndex: number, itemCount = 2): SlotDropPayload => ({
  anchor: 'before',
  insertIndex,
  itemCount,
  kind: 'slot-insert',
  slot,
  slotIndex: 0,
  zone: 'before',
})

test('resolves schema field drop to matching slot add action', () => {
  expect(
    resolveProfessionalDropAction({
      dragPayload: { field: dimensionField, kind: 'schema-field' },
      dropPayload: createDrop(dimensionSlot, 99, 3),
    }),
  ).toEqual({ type: 'add-field', field: dimensionField, insertIndex: 3, slot: dimensionSlot })
})

test('rejects schema field drop when role is not accepted', () => {
  expect(
    resolveProfessionalDropAction({
      dragPayload: { field: dimensionField, kind: 'schema-field' },
      dropPayload: createDrop(measureSlot, 0),
    }),
  ).toEqual({ type: 'none' })
})

test('treats self-edge drops as no-op same-slot reorders', () => {
  expect(isNoopSlotReorder({ dragIndex: 1, insertIndex: 1 })).toBe(true)
  expect(isNoopSlotReorder({ dragIndex: 1, insertIndex: 2 })).toBe(true)
  const dragPayload = { item: mappedDimension, kind: 'mapped-field' as const, sourceEncoding: 'xAxis', sourceIndex: 1 }

  expect(resolveProfessionalDropAction({ dragPayload, dropPayload: createDrop(dimensionSlot, 1) })).toEqual({
    type: 'none',
  })
  expect(resolveProfessionalDropAction({ dragPayload, dropPayload: createDrop(dimensionSlot, 2) })).toEqual({
    type: 'none',
  })
})

test('keeps adjacent same-slot swap as a real reorder', () => {
  expect(
    resolveProfessionalDropAction({
      dragPayload: { item: mappedDimension, kind: 'mapped-field', sourceEncoding: 'xAxis', sourceIndex: 0 },
      dropPayload: createDrop(dimensionSlot, 2),
    }),
  ).toEqual({ type: 'reorder-field', id: 'region-id', insertIndex: 1, role: 'dimension', slot: dimensionSlot })
})

test('normalizes same-slot forward drops before mapping target index', () => {
  expect(
    resolveProfessionalDropAction({
      dragPayload: { item: mappedDimension, kind: 'mapped-field', sourceEncoding: 'xAxis', sourceIndex: 0 },
      dropPayload: createDrop(dimensionSlot, 3, 3),
    }),
  ).toEqual({ type: 'reorder-field', id: 'region-id', insertIndex: 2, role: 'dimension', slot: dimensionSlot })
})

test('clamps insert index boundaries', () => {
  expect(normalizeSlotInsertIndex(-3, 4)).toBe(0)
  expect(normalizeSlotInsertIndex(6, 4)).toBe(4)
})

test('resolves mapped field drop across slots to move action', () => {
  expect(
    resolveProfessionalDropAction({
      dragPayload: { item: mappedDimension, kind: 'mapped-field', sourceEncoding: 'xAxis', sourceIndex: 0 },
      dropPayload: createDrop(colorSlot, -4),
    }),
  ).toEqual({ type: 'move-field', id: 'region-id', insertIndex: 0, role: 'dimension', slot: colorSlot })
})
