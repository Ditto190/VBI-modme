import { afterEach, expect, test } from '@rstest/core'
import { cleanup, render, screen } from '@testing-library/react'
import { createEmptyChart, createVBI, type VBIChartDSL } from '@visactor/vbi'
import { ConfigOverlay } from 'src/components/Editor/ConfigOverlay'
import { ProfessionalDndProvider } from 'src/components/Editor/dnd/ProfessionalDndProvider'
import { getLabels } from 'src/config/labels'
import type { FieldSlot } from 'src/types'

afterEach(() => cleanup())

test('config overlay renders mapped field token in matching slot with menu control', () => {
  const { container } = renderConfigOverlay({
    dimensions: [{ encoding: 'xAxis', field: 'region', id: 'region-id' }],
  })

  expect(screen.getByText('region')).toBeInTheDocument()
  expect(container.querySelectorAll('.pro-token-menu')).toHaveLength(1)
  expect(screen.queryByText('Configured fields')).not.toBeInTheDocument()
})

test('config overlay keeps unmatched mapped fields as editable field tokens', () => {
  const { container } = renderConfigOverlay({
    dimensions: [{ encoding: 'detail', field: 'region', id: 'region-id' }],
  })

  expect(screen.getByText('Unmatched fields')).toBeInTheDocument()
  expect(screen.getByText('region')).toBeInTheDocument()
  expect(container.querySelectorAll('.pro-config__unmatched .pro-token-menu')).toHaveLength(1)
})

const xAxisSlot: FieldSlot = {
  accepts: ['dimension'],
  dimensionEncoding: 'xAxis',
  title: 'X Axis',
}

const renderConfigOverlay = (dsl: Partial<VBIChartDSL>) => {
  const builder = createVBI().chart.create(createEmptyChart('professionalLocalData'))
  return render(
    <ProfessionalDndProvider builder={builder}>
      <ConfigOverlay
        active={false}
        builder={builder}
        dsl={{ dimensions: [], measures: [], ...dsl } as VBIChartDSL}
        fields={[{ isDate: false, name: 'region', role: 'dimension', type: 'string' }]}
        labels={getLabels('en-US')}
        slots={[xAxisSlot]}
      />
    </ProfessionalDndProvider>,
  )
}
