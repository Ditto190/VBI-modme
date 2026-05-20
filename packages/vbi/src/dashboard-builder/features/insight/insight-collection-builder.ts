import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIDashboardWidget } from 'src/types'
import { id } from 'src/utils'
import {
  getOrCreateDashboardWidgets,
  locateDashboardWidgetIndexById,
  removeDashboardWidgetLayouts,
} from 'src/vbi/from/dashboard-widget-y-map'
import * as Y from 'yjs'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import { mergeWidgetLayoutsIntoDSL } from '../layout-merge'
import { DashboardInsightBuilder } from './insight-builder'

export interface DashboardInsightCollectionDashboardBuilder {
  getInsightBuilder: (insightId: string) => VBIInsightBuilder | undefined
}

export class DashboardInsightCollectionBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
  TDashboardBuilder extends DashboardInsightCollectionDashboardBuilder = DashboardInsightCollectionDashboardBuilder,
> {
  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
    private dashboardBuilder: TDashboardBuilder,
  ) {}

  add(callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder {
    const widgetId = id.uuid()
    const insightId = id.uuid()

    const widgetMap = new Y.Map<any>()
    widgetMap.set('id', widgetId)
    widgetMap.set('type', 'insight')
    widgetMap.set('title', '')
    widgetMap.set('description', '')
    widgetMap.set('insightId', insightId)

    const widgets = getOrCreateDashboardWidgets(this.dsl)

    this.doc.transact(() => {
      widgets.push([widgetMap])
    })

    const builder = new DashboardInsightBuilder<TQueryDSL, TSeedDSL>(widgetMap, {
      getBuilder: (insightId) => this.dashboardBuilder.getInsightBuilder(insightId),
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
      throw new Error('addInsight requires layouts.lg to be set')
    }

    this.doc.transact(() => {
      mergeWidgetLayoutsIntoDSL(this.dsl, widgetId, layouts)
    })

    return this.dashboardBuilder
  }

  update(
    widgetId: string,
    callback: (insight: DashboardInsightBuilder<TQueryDSL, TSeedDSL>) => void,
  ): TDashboardBuilder {
    this.doc.transact(() => {
      const builder = this.get(widgetId)
      if (!builder) {
        throw new Error(`Insight widget with id "${widgetId}" not found`)
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

  get(widgetId: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined {
    return this.find(widgetId)
  }

  find(id: string): DashboardInsightBuilder<TQueryDSL, TSeedDSL> | undefined {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    for (let index = 0; index < widgets.length; index += 1) {
      const widget = widgets.get(index)
      const isTargetInsight =
        widget.get('type') === 'insight' && (widget.get('id') === id || widget.get('insightId') === id)
      if (isTargetInsight) {
        return new DashboardInsightBuilder<TQueryDSL, TSeedDSL>(widget, {
          getBuilder: (insightId) => this.dashboardBuilder.getInsightBuilder(insightId),
        })
      }
    }
    return undefined
  }

  findAll(): DashboardInsightBuilder<TQueryDSL, TSeedDSL>[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const result: DashboardInsightBuilder<TQueryDSL, TSeedDSL>[] = []
    widgets.forEach((widget) => {
      if (widget.get('type') === 'insight') {
        result.push(
          new DashboardInsightBuilder<TQueryDSL, TSeedDSL>(widget, {
            getBuilder: (insightId) => this.dashboardBuilder.getInsightBuilder(insightId),
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
