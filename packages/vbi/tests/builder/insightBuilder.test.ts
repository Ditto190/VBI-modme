import { VBI } from '@visactor/vbi'

describe('VBIInsightBuilder', () => {
  test('generates stable UUID on creation', () => {
    const builder = VBI.insight.create(VBI.insight.createEmpty())

    expect(builder.getUUID()).toBe(builder.getUUID())
    expect(typeof builder.getUUID()).toBe('string')
  })

  test('builds insight DSL from content updates', () => {
    const builder = VBI.insight.create(VBI.insight.createEmpty())
    builder.setContent('insight content')

    expect(builder.build()).toEqual({
      uuid: builder.getUUID(),
      content: 'insight content',
      version: 0,
    })
  })

  test('insight builders sync through YJS updates', () => {
    const b1 = VBI.insight.create(VBI.insight.createEmpty())
    const b2 = VBI.insight.create(VBI.insight.createEmpty())

    b2.applyUpdate(b1.encodeStateAsUpdate())
    b1.applyUpdate(b2.encodeStateAsUpdate())

    b1.setContent('synced insight')
    b2.applyUpdate(b1.encodeStateAsUpdate())

    expect(b2.build()).toEqual(b1.build())
  })
})
