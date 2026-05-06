import { expect, rs, test } from '@rstest/core'
import { fireEvent, render, screen } from '@testing-library/react'
import { createEmptyChart, createVBI } from '@visactor/vbi'
import { FieldToken } from 'src/components/Editor/FieldToken'
import { ProfessionalDndProvider } from 'src/components/Editor/dnd/ProfessionalDndProvider'
import { getLabels } from 'src/config/labels'
import type { MappedField } from 'src/types'

const field: MappedField = {
  field: 'sales',
  id: 'sales-id',
  isDate: false,
  role: 'measure',
}

test('field token menu button does not start parent drag gestures', () => {
  const builder = createVBI().chart.create(createEmptyChart('professionalLocalData'))
  const parentPointerDown = rs.fn()
  const parentMouseDown = rs.fn()
  render(
    <div onMouseDown={parentMouseDown} onPointerDown={parentPointerDown}>
      <ProfessionalDndProvider builder={builder}>
        <FieldToken item={field} labels={getLabels('en-US')} onAction={() => undefined} />
      </ProfessionalDndProvider>
    </div>,
  )

  const menuButton = screen.getByLabelText('Format')
  fireEvent.pointerDown(menuButton)
  fireEvent.mouseDown(menuButton)

  expect(parentPointerDown).not.toHaveBeenCalled()
  expect(parentMouseDown).not.toHaveBeenCalled()
})
