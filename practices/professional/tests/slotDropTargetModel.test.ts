import { expect, test } from '@rstest/core'
import {
  acceptsSlotDrop,
  createSlotDropClassName,
  createSlotDropPayload,
  createSlotDropTargetId,
} from '../src/components/Editor/dnd/slotDropTargetModel'
import type { FieldSlot } from '../src/types'
import type { SlotDropZone } from '../src/types/dnd'

const slot: FieldSlot = { accepts: ['measure'], measureEncoding: 'yAxis', title: 'Y Axis' }
const zones: SlotDropZone[] = ['head', 'before', 'after', 'empty', 'tail']

test('creates unique slot drop ids for all zones at the same insert index', () => {
  const ids = zones.map((zone) => createSlotDropTargetId({ insertIndex: 0, slotIndex: 1, zone }))

  expect(new Set(ids).size).toBe(zones.length)
})

test('creates head payload as an insert-before action at index zero', () => {
  expect(createSlotDropPayload({ insertIndex: 0, itemCount: 2, slot, slotIndex: 1, zone: 'head' })).toEqual({
    anchor: 'before',
    insertIndex: 0,
    itemCount: 2,
    kind: 'slot-insert',
    slot,
    slotIndex: 1,
    zone: 'head',
  })
})

test('keeps role acceptance and class names consistent across zones', () => {
  expect(acceptsSlotDrop(slot, 'measure')).toBe(true)
  expect(acceptsSlotDrop(slot, 'dimension')).toBe(false)
  expect(createSlotDropClassName({ accepts: true, hasContent: false, isOver: true, zone: 'head' })).toContain(
    'pro-slot-drop--head',
  )
  expect(createSlotDropClassName({ accepts: true, hasContent: false, isOver: true, zone: 'head' })).toContain(
    'pro-slot-drop--edge',
  )
})
