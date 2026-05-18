import type { VBIDashboardWidget } from 'src/types'
import { id } from 'src/utils'
import * as Y from 'yjs'

export const createDashboardWidgetYMap = (widget: VBIDashboardWidget): Y.Map<any> => {
  const yMap = new Y.Map<any>()
  yMap.set('id', widget.id || id.uuid())
  yMap.set('type', widget.type)
  yMap.set('title', widget.title ?? '')
  yMap.set('description', widget.description ?? '')

  if (widget.type === 'chart') {
    yMap.set('chartId', widget.chartId)
  } else if (widget.type === 'insight') {
    yMap.set('insightId', widget.insightId)
  }

  return yMap
}

export const getOrCreateDashboardWidgets = (dsl: Y.Map<any>): Y.Array<Y.Map<any>> => {
  const widgets = dsl.get('widgets')
  if (widgets instanceof Y.Array) {
    return widgets as Y.Array<Y.Map<any>>
  }

  const nextWidgets = new Y.Array<Y.Map<any>>()
  dsl.set('widgets', nextWidgets)
  return nextWidgets
}

export const locateDashboardWidgetIndexById = (widgets: Y.Array<Y.Map<any>>, widgetId: string): number => {
  return widgets.toArray().findIndex((widget) => widget.get('id') === widgetId)
}

export const removeDashboardWidgetLayouts = (dsl: Y.Map<any>, widgetId: string): void => {
  const layout = dsl.get('layout')
  if (layout == null || typeof layout !== 'object') {
    return
  }

  if (layout instanceof Y.Map) {
    for (const [_breakpoint, items] of layout.entries()) {
      if (items instanceof Y.Array) {
        const indices: number[] = []
        items.forEach((item: any, index: number) => {
          const id = item instanceof Y.Map ? item.get('widgetId') : item?.widgetId
          if (id === widgetId) {
            indices.push(index)
          }
        })
        for (let i = indices.length - 1; i >= 0; i--) {
          items.delete(indices[i], 1)
        }
      }
    }
  } else {
    // layout is a plain object stored in dsl
    const plainLayout = { ...layout }
    let changed = false
    for (const breakpoint of Object.keys(plainLayout)) {
      const items = plainLayout[breakpoint]
      if (Array.isArray(items)) {
        const filtered = items.filter((item: any) => item.widgetId !== widgetId)
        if (filtered.length !== items.length) {
          plainLayout[breakpoint] = filtered
          changed = true
        }
      }
    }
    if (changed) {
      dsl.set('layout', plainLayout)
    }
  }
}
