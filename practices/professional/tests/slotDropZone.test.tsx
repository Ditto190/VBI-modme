import { expect, test } from '@rstest/core'
import { render } from '@testing-library/react'
import { SlotDropZone } from 'src/components/Editor/SlotDropZone'
import { getLabels } from 'src/config/labels'
import type { FieldSlot, MappedField } from 'src/types'

const slot: FieldSlot = {
  accepts: ['dimension'],
  dimensionEncoding: 'xAxis',
  title: 'X Axis',
}

const value: MappedField = {
  encoding: 'xAxis',
  field: 'region',
  id: 'region-id',
  isDate: false,
  role: 'dimension',
}

const secondValue: MappedField = {
  ...value,
  field: 'segment',
  id: 'segment-id',
}

test('slot drop zone renders one insert target for each slot boundary', () => {
  const { container } = render(
    <SlotDropZone
      activeRole='dimension'
      labels={getLabels('en-US')}
      slot={slot}
      slotIndex={0}
      values={[value, secondValue]}
      onFieldAction={() => undefined}
    />,
  )

  expect(container.querySelectorAll('.pro-slot-drop--head')).toHaveLength(1)
  expect(container.querySelectorAll('.pro-slot-drop--before')).toHaveLength(1)
  expect(container.querySelectorAll('.pro-slot-drop--after')).toHaveLength(0)
  expect(container.querySelectorAll('.pro-slot-drop--tail')).toHaveLength(1)
  expect(container.querySelectorAll('.pro-slot-token')).toHaveLength(2)
})
