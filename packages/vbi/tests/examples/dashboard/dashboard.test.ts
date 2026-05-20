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

  it('responsive-dashboard-layout', async () => {
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
        profitChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'line',
          dimensions: [
            {
              field: 'order_date',
              alias: '订单月份',
              aggregate: {
                func: 'toMonth',
              },
            },
          ],
          measures: [
            {
              field: 'profit',
              alias: '利润',
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
        opsInsight: LocalVBI.insight.create({
          content: '销售额与利润趋势需要联合观察，低利润月份应进一步拆解品类结构。',
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
        title: '经营看板',
        theme: 'dark',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, resources: any) => {
      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.salesChart)
          .setTitle('区域销售')
          .setDescription('按省份汇总销售额')
          .setLayouts({
            lg: { x: 0, y: 0, w: 7, h: 5 },
            md: { x: 0, y: 0, w: 6, h: 4 },
            sm: { x: 0, y: 0, w: 4, h: 4 },
          })
      })

      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.profitChart)
          .setTitle('利润趋势')
          .setDescription('按月份汇总利润')
          .setLayouts({
            lg: { x: 7, y: 0, w: 5, h: 5 },
            md: { x: 0, y: 4, w: 6, h: 4 },
            sm: { x: 0, y: 4, w: 4, h: 4 },
          })
      })

      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.opsInsight)
          .setTitle('经营洞察')
          .setDescription('销售与利润联动说明')
          .setLayouts({
            lg: { x: 0, y: 5, w: 12, h: 3 },
            md: { x: 0, y: 8, w: 6, h: 3 },
            sm: { x: 0, y: 8, w: 4, h: 3 },
          })
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
              "id": "id-7",
              "w": 7,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-12",
              "w": 5,
              "widgetId": "id-10",
              "x": 7,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-17",
              "w": 12,
              "widgetId": "id-15",
              "x": 0,
              "y": 5,
            },
          ],
          "md": [
            {
              "h": 4,
              "id": "id-8",
              "w": 6,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-13",
              "w": 6,
              "widgetId": "id-10",
              "x": 0,
              "y": 4,
            },
            {
              "h": 3,
              "id": "id-18",
              "w": 6,
              "widgetId": "id-15",
              "x": 0,
              "y": 8,
            },
          ],
          "sm": [
            {
              "h": 4,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-14",
              "w": 4,
              "widgetId": "id-10",
              "x": 0,
              "y": 4,
            },
            {
              "h": 3,
              "id": "id-19",
              "w": 4,
              "widgetId": "id-15",
              "x": 0,
              "y": 8,
            },
          ],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "dark",
          "title": "经营看板",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额",
            "id": "id-5",
            "title": "区域销售",
            "type": "chart",
          },
          {
            "chartId": "uuid-2",
            "description": "按月份汇总利润",
            "id": "id-10",
            "title": "利润趋势",
            "type": "chart",
          },
          {
            "description": "销售与利润联动说明",
            "id": "id-15",
            "insightId": "uuid-3",
            "title": "经营洞察",
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

      const [chartWidget] = builder.chart.toJSON()
      const [insightWidget] = builder.insight.toJSON()

      builder.chart.update(chartWidget.id, (chart) => {
        chart.setDescription('更新后移除').setLayouts({ lg: { x: 0, y: 1, w: 5, h: 3 } })
      })
      builder.insight.update(insightWidget.id, (insight) => {
        insight.setDescription('仪表盘保留的洞察说明')
      })
      builder.chart.remove(chartWidget.id)
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
