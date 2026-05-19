import { rs } from '@rstest/core'
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('Dashboard', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('basic-dashboard', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {
        salesChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'bar',
          dimensions: [
            {
              field: 'province',
              alias: '省份',
            },
          ],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
              encoding: 'xAxis',
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
        salesInsight: LocalVBI.insight.create({
          content: '华东区域销售额领先，建议继续跟进重点客户。',
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
        title: '销售仪表盘',
        theme: 'light',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, resources: any) => {
      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.salesChart)
          .setTitle('销售趋势')
          .setDescription('按省份汇总销售额')
          .setLayouts({
            lg: { x: 0, y: 0, w: 8, h: 6 },
            md: { x: 0, y: 0, w: 6, h: 5 },
          })
      })
      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.salesInsight)
          .setTitle('关键洞察')
          .setLayouts({
            lg: { x: 8, y: 0, w: 4, h: 6 },
            md: { x: 0, y: 5, w: 6, h: 3 },
          })
      })

      const chartWidget = builder.chart.toJSON()[0]
      const insightWidget = builder.insight.toJSON()[0]
      builder.chart.find(chartWidget.id)?.getBuilder()?.build()
      builder.chart.find(resources.charts.salesChart.getUUID())?.getBuilder()?.build()
      builder.insight.find(insightWidget.id)?.getBuilder()?.build()
      builder.insight.find(resources.insights.salesInsight.getUUID())?.getBuilder()?.build()
    }
    applyBuilder(builder, resources)

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
              "h": 6,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 6,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-7",
              "x": 8,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-10",
              "w": 6,
              "widgetId": "id-7",
              "x": 0,
              "y": 5,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "销售仪表盘",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额",
            "id": "id-3",
            "title": "销售趋势",
            "type": "chart",
          },
          {
            "description": "",
            "id": "id-7",
            "insightId": "uuid-2",
            "title": "关键洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('update-and-remove-dashboard-widgets', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {},
      insights: {},
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
        title: '',
        theme: 'light',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, _resources: any) => {
      builder.chart.add((chart) => {
        chart.setTitle('临时图表').setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight.setTitle('保留洞察').setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 } })
      })

      const chartWidget = builder.chart.toJSON()[0]
      const insightWidget = builder.insight.toJSON()[0]

      builder.chart.update(chartWidget.id, (chart) => {
        chart.setDescription('更新后移除').setLayouts({ lg: { x: 0, y: 1, w: 5, h: 3 } })
      })
      builder.insight.update(insightWidget.id, (insight) => {
        insight.setDescription('仪表盘保留的洞察说明')
      })
      builder.chart.remove(chartWidget.id)
    }
    applyBuilder(builder, resources)

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
              "h": 4,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-4",
              "x": 6,
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
          "title": "",
        },
        "uuid": "uuid-1",
        "version": 0,
        "widgets": [
          {
            "description": "仪表盘保留的洞察说明",
            "id": "id-4",
            "insightId": "id-5",
            "title": "保留洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
