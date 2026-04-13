import { zVBIInsightDSL } from 'src/types/insightDSL/insight'
import { createEmptyInsight } from 'src/vbi/index'

describe('insight DSL schemas', () => {
  test('parse minimal insight DSL', () => {
    expect(zVBIInsightDSL.parse(createEmptyInsight())).toEqual({
      uuid: 'uuid-1',
      content: '',
      version: 0,
    })
  })

  test('empty insight helper stays stable', () => {
    expect(createEmptyInsight()).toEqual({
      uuid: 'uuid-1',
      content: '',
      version: 0,
    })
  })

  test('insight helper accepts custom uuid', () => {
    expect(createEmptyInsight('insight-uuid')).toEqual({
      uuid: 'insight-uuid',
      content: '',
      version: 0,
    })
  })
})
