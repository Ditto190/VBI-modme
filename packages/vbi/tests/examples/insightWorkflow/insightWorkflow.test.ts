import { rs } from '@rstest/core'
import { VBI, type VBIInsightBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('insight / InsightWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('retention-risk-insight-lifecycle', async () => {
    const builder = VBI.insight.create({
      content: '',
      version: 0,
    })

    const applyBuilder = (builder: VBIInsightBuilder) => {
      expect(builder.isEmpty()).toBe(true)
      builder.setContent('高价值客户在最近 30 天复购放缓，建议运营团队优先触达企业客户并复核折扣策略。')
      expect(builder.isEmpty()).toBe(false)
      expect(builder.build().content).toContain('高价值客户')
    }
    await applyBuilder(builder)

    const insightDSL = builder.build()
    expect(insightDSL).toMatchInlineSnapshot(`
      {
        "content": "高价值客户在最近 30 天复购放缓，建议运营团队优先触达企业客户并复核折扣策略。",
        "uuid": "uuid-1",
        "version": 0,
      }
    `)
  })
})
