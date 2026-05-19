import { createVBI, VBI } from '@visactor/vbi'
import { VBIDashboardBuilder } from 'src/dashboard-builder'
import { DashboardChartBuilder, DashboardInsightBuilder } from 'src/dashboard-builder/features'
import { mergeWidgetLayoutsIntoDSL } from 'src/dashboard-builder/features/layout-merge'
import { isEmptyVBIDashboardDSL } from 'src/dashboard-builder/modules'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'
import { createDashboardWidgetYMap, removeDashboardWidgetLayouts } from 'src/vbi/from/dashboard-widget-y-map'
import * as Y from 'yjs'

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

  test('constructor initializes defaults for an empty Yjs document', () => {
    const builder = new VBIDashboardBuilder(new Y.Doc())

    expect(builder.build()).toMatchObject({
      widgets: [],
      breakpoints: VBIDashboardDefaultBreakpoints,
      layout: createEmptyDashboardLayout(),
      meta: {
        title: '',
        theme: 'light',
      },
      version: 0,
    })
    expect(builder.isEmpty()).toBe(true)
  })

  test('dashboard builders sync through YJS updates', () => {
    const b1 = VBI.dashboard.create(VBI.dashboard.createEmpty())
    const b2 = VBI.dashboard.create(VBI.dashboard.createEmpty())

    b2.applyUpdate(b1.encodeStateAsUpdate())
    b1.applyUpdate(b2.encodeStateAsUpdate())

    b1.chart.add((chart) => {
      chart.setTitle('Synced Chart').setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
    })

    b2.applyUpdate(b1.encodeStateAsUpdate())

    expect(b2.build().widgets).toHaveLength(1)
    expect(b2.build().widgets[0]).toMatchObject({
      type: 'chart',
      title: 'Synced Chart',
    })
  })

  test('resource builder access is guarded when registry or ids are missing', () => {
    const builderWithoutRegistry = new VBIDashboardBuilder(new Y.Doc())
    const builderWithRegistry = VBI.dashboard.create(VBI.dashboard.createEmpty())

    expect(builderWithoutRegistry.getChartBuilder('chart-1')).toBeUndefined()
    expect(builderWithoutRegistry.getInsightBuilder('insight-1')).toBeUndefined()
    expect(builderWithRegistry.getChartBuilder('')).toBeUndefined()
    expect(builderWithRegistry.getInsightBuilder('')).toBeUndefined()
  })

  test('widget builders resolve resources through options without a dashboard parent', () => {
    const LocalVBI = createVBI()
    const chartResource = LocalVBI.chart.create(LocalVBI.chart.createEmpty('chart-resource'))
    const insightResource = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    const doc = new Y.Doc()
    const widgets = doc.getArray<Y.Map<any>>('widgets')
    const chartWidget = new Y.Map<any>()
    const insightWidget = new Y.Map<any>()

    chartWidget.set('id', 'chart-widget')
    chartWidget.set('chartId', chartResource.getUUID())
    insightWidget.set('id', 'insight-widget')
    insightWidget.set('insightId', insightResource.getUUID())
    doc.transact(() => {
      widgets.push([chartWidget, insightWidget])
    })

    const chartWidgetBuilder = new DashboardChartBuilder(chartWidget, {
      getBuilder: (chartId) => (chartId === chartResource.getUUID() ? chartResource : undefined),
    })
    const insightWidgetBuilder = new DashboardInsightBuilder(insightWidget, {
      getBuilder: (insightId) => (insightId === insightResource.getUUID() ? insightResource : undefined),
    })

    expect(chartWidgetBuilder.getBuilder()).toBe(chartResource)
    expect(insightWidgetBuilder.getBuilder()).toBe(insightResource)
  })

  test('internal empty check supports plain widget arrays', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')

    dsl.set('widgets', [{ id: 'w1' }])

    expect(isEmptyVBIDashboardDSL(dsl)).toBe(false)
    expect(isEmptyVBIDashboardDSL(new Y.Doc().getMap('dsl'))).toBe(true)
  })

  test('internal widget maps preserve defaults and resource ids', () => {
    const chart = createDashboardWidgetYMap({
      id: '',
      type: 'chart',
      chartId: 'chart-1',
    })
    const insight = createDashboardWidgetYMap({
      id: 'insight-widget',
      type: 'insight',
      insightId: 'insight-1',
    })
    const widgets = new Y.Doc().getArray('widgets')

    widgets.push([chart, insight])

    expect(chart.get('id')).toBeTruthy()
    expect(chart.get('type')).toBe('chart')
    expect(chart.get('title')).toBe('')
    expect(chart.get('description')).toBe('')
    expect(chart.get('chartId')).toBe('chart-1')
    expect(insight.get('id')).toBe('insight-widget')
    expect(insight.get('type')).toBe('insight')
    expect(insight.get('title')).toBe('')
    expect(insight.get('description')).toBe('')
    expect(insight.get('insightId')).toBe('insight-1')
  })

  test('internal layout removal supports Y.Map layouts', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const layout = new Y.Map<any>()
    const lg = new Y.Array<any>()
    const md = new Y.Array<any>()
    const lgItem = new Y.Map<any>()

    lgItem.set('widgetId', 'w1')
    lg.push([lgItem, { widgetId: 'w2' }])
    md.push([{ widgetId: 'w1' }])
    layout.set('lg', lg)
    layout.set('md', md)
    dsl.set('layout', layout)

    removeDashboardWidgetLayouts(dsl, 'w1')

    expect(lg.toArray()).toHaveLength(1)
    expect(lg.toArray()[0].widgetId).toBe('w2')
    expect(md.toArray()).toHaveLength(0)

    const noLayoutDSL = new Y.Doc().getMap('dsl')
    expect(() => removeDashboardWidgetLayouts(noLayoutDSL, 'w1')).not.toThrow()
  })

  test('internal layout merge ignores missing root layout', () => {
    const dsl = new Y.Doc().getMap('dsl')

    expect(() => {
      mergeWidgetLayoutsIntoDSL(dsl, 'w1', { lg: { x: 0, y: 0, w: 1, h: 1 } })
    }).not.toThrow()
    expect(dsl.get('layout')).toBeUndefined()
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

    test('find, toJSON, and chart widget getBuilder resolve registered chart builder', () => {
      const LocalVBI = createVBI()
      const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demo'))
      const dashboardBuilder = LocalVBI.dashboard.create(LocalVBI.dashboard.createEmpty())

      chartBuilder.measures.add('sales', (node) => {
        node.setAlias('Sales').setAggregate({ func: 'sum' }).setEncoding('yAxis')
      })
      dashboardBuilder.chart.add((chart) => {
        chart
          .setChartId(chartBuilder)
          .setTitle('Revenue Chart')
          .setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
      })

      const [chartWidget] = dashboardBuilder.chart.toJSON()
      const chartWidgetBuilder = dashboardBuilder.chart.find(chartWidget.id)
      const chartWidgetBuilderByChartId = dashboardBuilder.chart.find(chartBuilder.getUUID())

      expect(chartWidgetBuilder?.getId()).toBe(chartWidget.id)
      expect(chartWidgetBuilder?.toJSON()).toEqual(chartWidget)
      expect(chartWidgetBuilderByChartId?.toJSON()).toEqual(chartWidget)
      expect(chartWidgetBuilder?.getBuilder()).toBe(chartBuilder)
      expect(chartWidgetBuilder?.getBuilder()?.build().measures).toMatchObject([{ field: 'sales', alias: 'Sales' }])
      expect(dashboardBuilder.chart.find('missing')).toBeUndefined()
      expect(() => dashboardBuilder.chart.update('missing', () => {})).toThrow(
        'Chart widget with id "missing" not found',
      )
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
        insight
          .setTitle('Updated Insight')
          .setDescription('Some description')
          .setLayouts({ lg: { x: 1, y: 1, w: 5, h: 4 } })
      })

      const updated = builder.build()
      expect(updated.widgets[0].title).toBe('Updated Insight')
      expect(updated.widgets[0].description).toBe('Some description')
      expect(updated.layout.lg![0]).toMatchObject({ widgetId, x: 1, y: 1, w: 5, h: 4 })

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

    test('find, toJSON, and insight widget getBuilder resolve registered insight builder', () => {
      const LocalVBI = createVBI()
      const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
      const dashboardBuilder = LocalVBI.dashboard.create(LocalVBI.dashboard.createEmpty())

      insightBuilder.setContent('hello dashboard')
      dashboardBuilder.insight.add((insight) => {
        insight
          .setInsightId(insightBuilder)
          .setTitle('Key Finding')
          .setLayouts({ lg: { x: 0, y: 0, w: 4, h: 3 } })
      })

      const [insightWidget] = dashboardBuilder.insight.toJSON()
      const insightWidgetBuilder = dashboardBuilder.insight.find(insightWidget.id)
      const insightWidgetBuilderByInsightId = dashboardBuilder.insight.find(insightBuilder.getUUID())

      expect(insightWidgetBuilder?.getId()).toBe(insightWidget.id)
      expect(insightWidgetBuilder?.toJSON()).toEqual(insightWidget)
      expect(insightWidgetBuilderByInsightId?.toJSON()).toEqual(insightWidget)
      expect(insightWidgetBuilder?.getBuilder()).toBe(insightBuilder)
      expect(insightWidgetBuilder?.getBuilder()?.build().content).toBe('hello dashboard')
      expect(dashboardBuilder.insight.find('missing')).toBeUndefined()
      expect(() => dashboardBuilder.insight.update('missing', () => {})).toThrow(
        'Insight widget with id "missing" not found',
      )
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
