import { rs } from '@rstest/core'
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / DashboardWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('executive-dashboard-widget-lifecycle', async () => {
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
          content: '华东区域销售额领先，管理层需要关注复购与利润结构。',
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
        title: '经营驾驶舱',
        theme: 'dark',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, resources: any) => {
      if (!builder.isEmpty()) {
        throw new Error('new dashboard should start without widgets')
      }

      let missingLayoutRejected = false
      try {
        builder.chart.add((chart) => {
          chart.setTitle('缺少布局的草稿图表').setChartId(resources.charts.salesChart)
        })
      } catch {
        missingLayoutRejected = true
      }
      if (!missingLayoutRejected || !builder.isEmpty()) {
        throw new Error('dashboard should reject chart widgets without lg layout')
      }

      builder.chart
        .add((chart) => {
          chart
            .setChartId(resources.charts.salesChart)
            .setTitle('省份销售额')
            .setDescription('按省份汇总销售额')
            .setLayouts({
              lg: { x: 0, y: 0, w: 8, h: 6 },
              md: { x: 0, y: 0, w: 6, h: 5 },
            })
        })
        .insight.add((insight) => {
          insight
            .setInsightId(resources.insights.salesInsight)
            .setTitle('经营洞察')
            .setDescription('解释销售额集中区域')
            .setLayouts({
              lg: { x: 8, y: 0, w: 4, h: 6 },
              md: { x: 0, y: 5, w: 6, h: 3 },
            })
        })

      const chartWidget = builder.chart.findAll()[0]
      const insightWidget = builder.insight.findAll()[0]
      if (!chartWidget || !insightWidget) {
        throw new Error('dashboard should contain chart and insight widgets')
      }
      if (!chartWidget.getBuilder() || !insightWidget.getBuilder()) {
        throw new Error('dashboard widgets should resolve registered resources')
      }
      if (builder.chart.get(chartWidget.getId())?.toJSON().title !== '省份销售额') {
        throw new Error('chart widget should be findable by widget id')
      }
      if (!builder.chart.find(resources.charts.salesChart.getUUID())) {
        throw new Error('chart widget should be findable by chart resource id')
      }
      if (!builder.insight.find(resources.insights.salesInsight.getUUID())) {
        throw new Error('insight widget should be findable by insight resource id')
      }

      builder.chart.update(chartWidget.getId(), (chart) => {
        chart.setTitle('重点省份销售额').setLayouts({ lg: { x: 0, y: 0, w: 7, h: 6 } })
      })
      builder.insight.update(insightWidget.getId(), (insight) => {
        insight.setDescription('更新为管理层复盘口径')
      })

      if (builder.chart.toJSON()[0].title !== '重点省份销售额') {
        throw new Error('chart widget title should update')
      }
      if (builder.insight.toJSON()[0].description !== '更新为管理层复盘口径') {
        throw new Error('insight widget description should update')
      }

      let missingInsightRejected = false
      try {
        builder.insight.update('missing-widget', (insight) => insight.setTitle('missing'))
      } catch {
        missingInsightRejected = true
      }
      if (!missingInsightRejected) {
        throw new Error('updating missing insight widget should fail')
      }

      builder.insight.remove(insightWidget.getId())
      builder.chart.remove('missing-widget')
      if (builder.insight.findAll().length !== 0 || builder.chart.findAll().length !== 1) {
        throw new Error('only the chart widget should remain')
      }

      const ReplicaVBI = createVBI()
      const replica = ReplicaVBI.dashboard.create(ReplicaVBI.dashboard.createEmpty('dashboard-replica'))
      replica.applyUpdate(builder.encodeStateAsUpdate(), 'dashboard-sync')
      replica.build()
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
              "id": "id-13",
              "w": 7,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-8",
              "w": 6,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "dark",
          "title": "经营驾驶舱",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额",
            "id": "id-5",
            "title": "重点省份销售额",
            "type": "chart",
          },
        ],
      }
    `)
  })

  it('merchandising-dashboard-widget-lifecycle', async () => {
    const LocalVBI = createVBI()
    const resources = {
      charts: {
        categorySalesChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'bar',
          dimensions: [
            {
              field: 'category',
              alias: '商品品类',
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
        discountProfitChart: LocalVBI.chart.create({
          connectorId: 'demoSupermarket',
          chartType: 'scatter',
          dimensions: [
            {
              field: 'discount',
              alias: '折扣',
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
        promotionInsight: LocalVBI.insight.create({
          content: '高折扣品类带来的销售增长未完全转化为利润，需要收紧促销门槛。',
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
        title: '商品运营看板',
        theme: 'dark',
      },
      version: 0,
    })

    const applyBuilder = (builder: VBIDashboardBuilder, resources: any) => {
      expect(builder.isEmpty()).toBe(true)

      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.categorySalesChart)
          .setTitle('品类销售')
          .setDescription('初版品类销售布局')
          .setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 }, md: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.discountProfitChart)
          .setTitle('折扣利润散点')
          .setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 }, md: { x: 0, y: 4, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.promotionInsight)
          .setTitle('促销洞察')
          .setLayouts({ lg: { x: 0, y: 4, w: 12, h: 3 }, md: { x: 0, y: 8, w: 6, h: 3 } })
      })

      const [categoryWidget, discountWidget] = builder.chart.toJSON() as any[]
      const [promotionWidget] = builder.insight.toJSON() as any[]
      expect(builder.chart.find(categoryWidget.chartId)?.getId()).toBe(categoryWidget.id)
      expect(builder.insight.find(promotionWidget.insightId)?.getId()).toBe(promotionWidget.id)

      builder.chart.update(categoryWidget.id, (chart) => {
        chart
          .setTitle('重点品类销售')
          .setDescription('更新后保留 md 布局，并合并新的 lg 布局')
          .setLayouts({ lg: { x: 0, y: 0, w: 7, h: 5 } })
      })
      builder.insight.update(promotionWidget.id, (insight) => {
        insight.setDescription('更新后的促销策略说明').setLayouts({ lg: { x: 7, y: 0, w: 5, h: 5 } })
      })
      builder.chart.remove(discountWidget.id)
      expect(builder.chart.get(discountWidget.id)).toBeUndefined()

      for (const widget of builder.chart.toJSON()) {
        builder.chart.remove(widget.id)
      }
      for (const widget of builder.insight.toJSON()) {
        builder.insight.remove(widget.id)
      }
      expect(builder.isEmpty()).toBe(true)

      builder.chart.add((chart) => {
        chart
          .setChartId(resources.charts.categorySalesChart)
          .setTitle('最终品类销售')
          .setDescription('清空草稿后重建的主图')
          .setLayouts({ lg: { x: 0, y: 0, w: 7, h: 5 }, md: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.promotionInsight)
          .setTitle('最终促销洞察')
          .setDescription('清空草稿后重建的洞察')
          .setLayouts({ lg: { x: 7, y: 0, w: 5, h: 5 }, md: { x: 0, y: 4, w: 6, h: 3 } })
      })
      expect(builder.isEmpty()).toBe(false)
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
              "id": "id-21",
              "w": 7,
              "widgetId": "id-19",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-25",
              "w": 5,
              "widgetId": "id-23",
              "x": 7,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 4,
              "id": "id-22",
              "w": 6,
              "widgetId": "id-19",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-26",
              "w": 6,
              "widgetId": "id-23",
              "x": 0,
              "y": 4,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "dark",
          "title": "商品运营看板",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "清空草稿后重建的主图",
            "id": "id-19",
            "title": "最终品类销售",
            "type": "chart",
          },
          {
            "description": "清空草稿后重建的洞察",
            "id": "id-23",
            "insightId": "uuid-3",
            "title": "最终促销洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
