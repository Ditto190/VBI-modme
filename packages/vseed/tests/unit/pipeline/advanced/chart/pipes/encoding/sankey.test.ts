import { MeasureId } from 'src/dataReshape'
import { encodingForSankey } from 'src/pipeline/advanced/chart/pipes/encoding/sankey'
import type { AdvancedVSeed } from 'src/types'

describe('encodingForSankey', () => {
  it('should keep explicitly encoded source dimensions out of target fallback', () => {
    const advancedVSeed = {
      dimensions: [
        { id: 'area', alias: 'area', encoding: 'source' },
        { id: 'product_type', alias: 'product_type', encoding: 'source' },
        { id: MeasureId, alias: '指标Id' },
      ],
      measures: [
        { id: 'sales', alias: 'sales', encoding: 'size' },
        { id: 'profit', alias: 'profit', encoding: 'size' },
      ],
      reshapeMeasures: [[
        { id: 'sales', alias: 'sales', encoding: 'size' },
        { id: 'profit', alias: 'profit', encoding: 'size' },
      ]],
    } as unknown as AdvancedVSeed

    const result = encodingForSankey(advancedVSeed, {} as any)

    expect(result.encoding.source).toEqual(['area', 'product_type'])
    expect(result.encoding.target).toEqual([MeasureId])
  })

  it('should not infer target from unencoded dimensions when source is explicit', () => {
    const advancedVSeed = {
      dimensions: [
        { id: 'area', alias: 'area', encoding: 'source' },
        { id: 'product_type', alias: 'product_type' },
      ],
      measures: [{ id: 'sales', alias: 'sales', encoding: 'size' }],
      reshapeMeasures: [[{ id: 'sales', alias: 'sales', encoding: 'size' }]],
    } as unknown as AdvancedVSeed

    const result = encodingForSankey(advancedVSeed, {} as any)

    expect(result.encoding.source).toEqual(['area'])
    expect(result.encoding.target).toEqual([])
  })
})
