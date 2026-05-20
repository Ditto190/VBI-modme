import { rs } from '@rstest/core'
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / ResourceWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('register-and-reference-quarterly-resources', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {
        quarterlyRevenueChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'line',
          dimensions: [
            {
              field: 'order_date',
              alias: '订单季度',
              aggregate: {
                func: 'toQuarter',
              },
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '季度销售额',
              encoding: 'yAxis',
              aggregate: {
                func: 'sum',
              },
            },
          ],
          whereFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          havingFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          theme: 'light',
          locale: 'zh-CN',
          version: 1,
        }),
      },
      insights: {
        quarterlyInsight: LocalVBI.insight.create({
          content: 'Q4 销售额继续增长，但利润贡献需要结合品类折扣进一步拆解。',
          version: 0,
        }),
        temporaryInsight: LocalVBI.insight.create({
          content: '临时备注用于验证资源移除，不进入最终仪表盘。',
          version: 0,
        }),
      },
    }
    const builder = LocalVBI.dashboard.create({
      widgets: [],
      breakpoints: {
        xxl: 1600,
        xl: 1200,
        lg: 996,
        md: 768,
        sm: 480,
        xs: 0,
      },
      layout: {
        xxl: [],
        xl: [],
        lg: [],
        md: [],
        sm: [],
        xs: [],
      },
      meta: {
        title: '季度经营复盘',
        theme: 'light',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, resources: any) => {
      const chartId = resources.charts.quarterlyRevenueChart.getUUID()
      const insightId = resources.insights.quarterlyInsight.getUUID()
      const temporaryInsightId = resources.insights.temporaryInsight.getUUID()

      expect(LocalVBI.resources.chart.has(chartId)).toBe(true)
      expect(LocalVBI.resources.chart.get(chartId)?.chartType).toBe('line')
      expect(LocalVBI.resources.chart.list().map((chart) => chart.uuid)).toContain(chartId)
      expect(LocalVBI.resources.snapshot().insights[insightId]?.content).toContain('Q4 销售额')

      expect(LocalVBI.resources.insight.unregister(temporaryInsightId)).toBe(true)
      expect(LocalVBI.resources.insight.get(temporaryInsightId)).toBeUndefined()
      const restoredTemporaryInsight = LocalVBI.resources.insight.register(resources.insights.temporaryInsight.build())
      expect(restoredTemporaryInsight.uuid).toBe(temporaryInsightId)

      const registered = LocalVBI.resources.register({
        charts: [resources.charts.quarterlyRevenueChart.build()],
        insights: [resources.insights.quarterlyInsight.build()],
      })
      expect(registered.charts[0].uuid).toBe(chartId)
      expect(registered.insights[0].uuid).toBe(insightId)

      builder.chart.add((chart) => {
        chart
          .setChartId(chartId)
          .setTitle('季度销售走势')
          .setDescription('复盘会共享资源中的季度销售图')
          .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 } })
      })

      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.quarterlyInsight)
          .setTitle('季度经营解读')
          .setDescription('引用已注册 insight builder')
          .setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 } })
      })
    }
    await applyBuilder(builder, resources)

    const dashboardDSL = builder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 996,
          "md": 768,
          "sm": 480,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 5,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-8",
              "w": 4,
              "widgetId": "id-6",
              "x": 8,
              "y": 0,
            },
          ],
          "md": [],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "季度经营复盘",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "复盘会共享资源中的季度销售图",
            "id": "id-3",
            "title": "季度销售走势",
            "type": "chart",
          },
          {
            "description": "引用已注册 insight builder",
            "id": "id-6",
            "insightId": "uuid-2",
            "title": "季度经营解读",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
