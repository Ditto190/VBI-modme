import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIDashboardWidget } from 'src/types'
import { id } from 'src/utils'
import {
  getOrCreateDashboardWidgets,
  locateDashboardWidgetIndexById,
  removeDashboardWidgetLayouts,
} from 'src/vbi/from/dashboard-widget-y-map'
import * as Y from 'yjs'
import { mergeWidgetLayoutsIntoDSL } from '../layout-merge'
import { DashboardChartBuilder } from './chart-builder'

export class DashboardChartCollectionBuilder {
  constructor(
    private parent: VBIDashboardBuilder,
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {}

  add(callback: (chart: DashboardChartBuilder) => void): VBIDashboardBuilder {
    const widgetId = id.uuid()
    const chartId = id.uuid()

    const widgetMap = new Y.Map<any>()
    widgetMap.set('id', widgetId)
    widgetMap.set('type', 'chart')
    widgetMap.set('title', '')
    widgetMap.set('description', '')
    widgetMap.set('chartId', chartId)

    const widgets = getOrCreateDashboardWidgets(this.dsl)

    this.doc.transact(() => {
      widgets.push([widgetMap])
    })

    const builder = new DashboardChartBuilder(widgetMap)
    callback(builder)

    const layouts = builder.getLayouts()
    if (!layouts.lg) {
      this.doc.transact(() => {
        const index = locateDashboardWidgetIndexById(widgets, widgetId)
        if (index !== -1) {
          widgets.delete(index, 1)
        }
      })
      throw new Error('addChart requires layouts.lg to be set')
    }

    this.doc.transact(() => {
      mergeWidgetLayoutsIntoDSL(this.dsl, widgetId, layouts)
    })

    return this.parent
  }

  update(widgetId: string, callback: (chart: DashboardChartBuilder) => void): VBIDashboardBuilder {
    this.doc.transact(() => {
      const builder = this.get(widgetId)
      if (!builder) {
        throw new Error(`Chart widget with id "${widgetId}" not found`)
      }
      callback(builder)

      const layouts = builder.getLayouts()
      if (Object.keys(layouts).length > 0) {
        mergeWidgetLayoutsIntoDSL(this.dsl, widgetId, layouts)
      }
    })
    return this.parent
  }

  remove(widgetId: string): VBIDashboardBuilder {
    this.doc.transact(() => {
      const widgets = getOrCreateDashboardWidgets(this.dsl)
      const index = locateDashboardWidgetIndexById(widgets, widgetId)
      if (index !== -1) {
        widgets.delete(index, 1)
      }
      removeDashboardWidgetLayouts(this.dsl, widgetId)
    })
    return this.parent
  }

  get(widgetId: string): DashboardChartBuilder | undefined {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const index = locateDashboardWidgetIndexById(widgets, widgetId)
    if (index === -1) {
      return undefined
    }
    const widget = widgets.get(index)
    if (widget.get('type') !== 'chart') {
      return undefined
    }
    return new DashboardChartBuilder(widget)
  }

  findAll(): DashboardChartBuilder[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const result: DashboardChartBuilder[] = []
    widgets.forEach((widget) => {
      if (widget.get('type') === 'chart') {
        result.push(new DashboardChartBuilder(widget))
      }
    })
    return result
  }

  toJSON(): VBIDashboardWidget[] {
    return this.findAll().map((builder) => builder.toJSON())
  }
}
