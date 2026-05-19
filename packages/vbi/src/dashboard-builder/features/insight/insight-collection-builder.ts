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
import { DashboardInsightBuilder } from './insight-builder'

export class DashboardInsightCollectionBuilder {
  constructor(
    private parent: VBIDashboardBuilder,
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {}

  add(callback: (insight: DashboardInsightBuilder) => void): VBIDashboardBuilder {
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

    const builder = new DashboardInsightBuilder(widgetMap)
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

    return this.parent
  }

  update(widgetId: string, callback: (insight: DashboardInsightBuilder) => void): VBIDashboardBuilder {
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

  get(widgetId: string): DashboardInsightBuilder | undefined {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const index = locateDashboardWidgetIndexById(widgets, widgetId)
    if (index === -1) {
      return undefined
    }
    const widget = widgets.get(index)
    if (widget.get('type') !== 'insight') {
      return undefined
    }
    return new DashboardInsightBuilder(widget)
  }

  findAll(): DashboardInsightBuilder[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const result: DashboardInsightBuilder[] = []
    widgets.forEach((widget) => {
      if (widget.get('type') === 'insight') {
        result.push(new DashboardInsightBuilder(widget))
      }
    })
    return result
  }

  toJSON(): VBIDashboardWidget[] {
    return this.findAll().map((builder) => builder.toJSON())
  }
}
