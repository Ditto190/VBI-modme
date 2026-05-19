import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
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

export interface DashboardChartCollectionDashboardBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> {
  getChartBuilder: (chartId: string) => VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
}

export class DashboardChartCollectionBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
  TDashboardBuilder extends DashboardChartCollectionDashboardBuilder<TQueryDSL, TSeedDSL> =
    DashboardChartCollectionDashboardBuilder<TQueryDSL, TSeedDSL>,
> {
  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
    private dashboardBuilder: TDashboardBuilder,
  ) {}

  add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder {
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

    const builder = new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widgetMap, {
      getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
    })
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

    return this.dashboardBuilder
  }

  update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder {
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
    return this.dashboardBuilder
  }

  remove(widgetId: string): TDashboardBuilder {
    this.doc.transact(() => {
      const widgets = getOrCreateDashboardWidgets(this.dsl)
      const index = locateDashboardWidgetIndexById(widgets, widgetId)
      if (index !== -1) {
        widgets.delete(index, 1)
      }
      removeDashboardWidgetLayouts(this.dsl, widgetId)
    })
    return this.dashboardBuilder
  }

  get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined {
    return this.find(widgetId)
  }

  find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    for (let index = 0; index < widgets.length; index += 1) {
      const widget = widgets.get(index)
      const isTargetChart = widget.get('type') === 'chart' && (widget.get('id') === id || widget.get('chartId') === id)
      if (isTargetChart) {
        return new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widget, {
          getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
        })
      }
    }
    return undefined
  }

  findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const result: DashboardChartBuilder<TQueryDSL, TSeedDSL>[] = []
    widgets.forEach((widget) => {
      if (widget.get('type') === 'chart') {
        result.push(
          new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widget, {
            getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
          }),
        )
      }
    })
    return result
  }

  toJSON(): VBIDashboardWidget[] {
    return this.findAll().map((builder) => builder.toJSON())
  }
}
