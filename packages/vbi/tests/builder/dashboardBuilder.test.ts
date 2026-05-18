import { createVBI, VBI } from '@visactor/vbi'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'

describe('VBIDashboardBuilder', () => {
  test('empty dashboard helper accepts custom uuid', () => {
    expect(VBI.dashboard.createEmpty('dashboard-uuid')).toMatchObject({
      uuid: 'dashboard-uuid',
      widgets: [],
      breakpoints: VBIDashboardDefaultBreakpoints,
      layout: createEmptyDashboardLayout(),
      meta: {
        title: '',
        theme: 'light',
      },
      version: 0,
    })
  })

  describe('Chart Widget', () => {
    test('add chart creates widget with type: chart', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setTitle('Revenue Chart').setLayouts({
          lg: { x: 0, y: 0, w: 6, h: 4 },
        })
      })

      const dsl = builder.build()
      expect(dsl.widgets).toHaveLength(1)

      const widget = dsl.widgets[0]
      expect(widget.type).toBe('chart')
      expect(widget.title).toBe('Revenue Chart')
      expect(widget.id).toBeDefined()
      expect(typeof widget.id).toBe('string')
      expect(widget.id.length).toBeGreaterThan(0)
      expect(widget.type === 'chart' && widget.chartId).toBeDefined()
      expect(widget.type === 'chart' && typeof widget.chartId === 'string').toBe(true)
    })

    test('auto id and auto chartId are unique', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.chart.add((chart) => {
        chart.setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 } })
      })

      const dsl = builder.build()
      expect(dsl.widgets).toHaveLength(2)
      expect(dsl.widgets[0].id).not.toBe(dsl.widgets[1].id)

      const chart0 = dsl.widgets[0]
      const chart1 = dsl.widgets[1]
      if (chart0.type === 'chart' && chart1.type === 'chart') {
        expect(chart0.chartId).not.toBe(chart1.chartId)
      }
    })

    test('set/update/remove chart', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setTitle('Original').setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })

      const widgetId = builder.build().widgets[0].id

      builder.chart.update(widgetId, (chart) => {
        chart.setTitle('Updated').setDescription('A description')
      })

      const updated = builder.build()
      expect(updated.widgets[0].title).toBe('Updated')
      expect(updated.widgets[0].description).toBe('A description')

      builder.chart.remove(widgetId)
      expect(builder.build().widgets).toHaveLength(0)
      expect(builder.isEmpty()).toBe(true)
    })

    test('setChartId accepts resource reference with getUUID', () => {
      const LocalVBI = createVBI()
      const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demo'))
      const chartUUID = chartBuilder.getUUID()
      const dashboardBuilder = LocalVBI.dashboard.create(LocalVBI.dashboard.createEmpty())

      dashboardBuilder.chart.add((chart) => {
        chart.setChartId(chartBuilder).setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })

      const widget = dashboardBuilder.build().widgets[0]
      expect(widget.type).toBe('chart')
      expect(widget.type === 'chart' ? widget.chartId : undefined).toBe(chartUUID)
    })

    test('layout lg is written to root layout.lg', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setLayouts({
          lg: { x: 0, y: 0, w: 12, h: 6 },
          md: { x: 0, y: 0, w: 6, h: 4 },
        })
      })

      const dsl = builder.build()
      const widgetId = dsl.widgets[0].id

      expect(dsl.layout.lg).toBeDefined()
      expect(dsl.layout.lg).toHaveLength(1)
      expect(dsl.layout.lg![0]).toMatchObject({
        widgetId,
        x: 0,
        y: 0,
        w: 12,
        h: 6,
      })

      expect(dsl.layout.md).toBeDefined()
      expect(dsl.layout.md).toHaveLength(1)
      expect(dsl.layout.md![0]).toMatchObject({
        widgetId,
        x: 0,
        y: 0,
        w: 6,
        h: 4,
      })
    })

    test('missing layouts.lg throws and dashboard stays empty', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      expect(() => {
        builder.chart.add((chart) => {
          chart.setTitle('No Layout')
        })
      }).toThrow('addChart requires layouts.lg to be set')

      expect(builder.build().widgets).toHaveLength(0)
      expect(builder.isEmpty()).toBe(true)
    })
  })

  describe('Insight Widget', () => {
    test('add insight creates widget with type: insight', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.insight.add((insight) => {
        insight.setTitle('Key Finding').setLayouts({
          lg: { x: 0, y: 0, w: 4, h: 3 },
        })
      })

      const dsl = builder.build()
      expect(dsl.widgets).toHaveLength(1)

      const widget = dsl.widgets[0]
      expect(widget.type).toBe('insight')
      expect(widget.title).toBe('Key Finding')
      expect(widget.id).toBeDefined()
      expect(widget.type === 'insight' && widget.insightId).toBeDefined()
      expect(widget.type === 'insight' && typeof widget.insightId === 'string').toBe(true)
    })

    test('auto id and auto insightId are unique', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.insight.add((insight) => {
        insight.setLayouts({ lg: { x: 0, y: 0, w: 4, h: 3 } })
      })
      builder.insight.add((insight) => {
        insight.setLayouts({ lg: { x: 4, y: 0, w: 4, h: 3 } })
      })

      const dsl = builder.build()
      expect(dsl.widgets).toHaveLength(2)
      expect(dsl.widgets[0].id).not.toBe(dsl.widgets[1].id)

      const i0 = dsl.widgets[0]
      const i1 = dsl.widgets[1]
      if (i0.type === 'insight' && i1.type === 'insight') {
        expect(i0.insightId).not.toBe(i1.insightId)
      }
    })

    test('set/update/remove insight', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.insight.add((insight) => {
        insight.setTitle('Original Insight').setLayouts({ lg: { x: 0, y: 0, w: 4, h: 3 } })
      })

      const widgetId = builder.build().widgets[0].id

      builder.insight.update(widgetId, (insight) => {
        insight.setTitle('Updated Insight').setDescription('Some description')
      })

      const updated = builder.build()
      expect(updated.widgets[0].title).toBe('Updated Insight')
      expect(updated.widgets[0].description).toBe('Some description')

      builder.insight.remove(widgetId)
      expect(builder.build().widgets).toHaveLength(0)
      expect(builder.isEmpty()).toBe(true)
    })

    test('setInsightId accepts resource reference with getUUID', () => {
      const LocalVBI = createVBI()
      const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
      const insightUUID = insightBuilder.getUUID()
      const dashboardBuilder = LocalVBI.dashboard.create(LocalVBI.dashboard.createEmpty())

      dashboardBuilder.insight.add((insight) => {
        insight.setInsightId(insightBuilder).setLayouts({ lg: { x: 0, y: 0, w: 4, h: 3 } })
      })

      const widget = dashboardBuilder.build().widgets[0]
      expect(widget.type).toBe('insight')
      expect(widget.type === 'insight' ? widget.insightId : undefined).toBe(insightUUID)
    })

    test('missing layouts.lg throws and dashboard stays empty', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      expect(() => {
        builder.insight.add((insight) => {
          insight.setTitle('No Layout Insight')
        })
      }).toThrow('addInsight requires layouts.lg to be set')

      expect(builder.build().widgets).toHaveLength(0)
      expect(builder.isEmpty()).toBe(true)
    })
  })

  describe('Chart and Insight Coexistence', () => {
    test('chart and insight coexist in widgets', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setTitle('My Chart').setLayouts({ lg: { x: 0, y: 0, w: 8, h: 4 } })
      })

      builder.insight.add((insight) => {
        insight.setTitle('My Insight').setLayouts({ lg: { x: 8, y: 0, w: 4, h: 4 } })
      })

      const dsl = builder.build()
      expect(dsl.widgets).toHaveLength(2)

      const chartWidget = dsl.widgets.find((w) => w.type === 'chart')
      const insightWidget = dsl.widgets.find((w) => w.type === 'insight')
      expect(chartWidget).toBeDefined()
      expect(insightWidget).toBeDefined()
      expect(chartWidget!.title).toBe('My Chart')
      expect(insightWidget!.title).toBe('My Insight')

      expect(dsl.layout.lg).toHaveLength(2)
    })

    test('remove widget also removes corresponding layout', () => {
      const builder = VBI.dashboard.create(VBI.dashboard.createEmpty())

      builder.chart.add((chart) => {
        chart.setTitle('Chart A').setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight.setTitle('Insight B').setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 } })
      })

      const dsl = builder.build()
      expect(dsl.layout.lg).toHaveLength(2)

      const chartWidgetId = dsl.widgets.find((w) => w.type === 'chart')!.id

      builder.chart.remove(chartWidgetId)

      const afterRemove = builder.build()
      expect(afterRemove.widgets).toHaveLength(1)
      expect(afterRemove.widgets[0].type).toBe('insight')
      expect(afterRemove.layout.lg).toHaveLength(1)
      expect(afterRemove.layout.lg![0].widgetId).not.toBe(chartWidgetId)
    })
  })
})
