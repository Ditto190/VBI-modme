import { expect, test } from '@rstest/core'
import { render, screen } from '@testing-library/react'
import { DragGhost } from 'src/components/Editor/dnd/DragGhost'
import type { ProfessionalDragPayload } from 'src/types/dnd'

const payload: ProfessionalDragPayload = {
  field: { isDate: false, name: 'sales', role: 'measure', type: 'number' },
  kind: 'schema-field',
}

test('drag ghost follows source element dimensions', () => {
  render(<DragGhost payload={payload} sourceRect={{ height: 24, width: 168 }} />)

  const ghost = screen.getByText('sales')
  expect(ghost.style.width).toBe('168px')
  expect(ghost.style.height).toBe('24px')
})
