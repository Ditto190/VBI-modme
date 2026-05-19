import type { VBIDashboardBreakpoint, VBIDashboardItemLayout } from 'src/types'
import { id } from 'src/utils'
import * as Y from 'yjs'

type PartialItemLayout = Omit<VBIDashboardItemLayout, 'id' | 'widgetId'>
type WidgetLayouts = Partial<Record<VBIDashboardBreakpoint, PartialItemLayout>>

export const mergeWidgetLayoutsIntoDSL = (dsl: Y.Map<any>, widgetId: string, layouts: WidgetLayouts): void => {
  const rootLayout = dsl.get('layout')
  if (rootLayout == null || typeof rootLayout !== 'object') {
    return
  }

  const plainLayout = rootLayout instanceof Y.Map ? rootLayout.toJSON() : { ...rootLayout }

  for (const [breakpoint, itemLayout] of Object.entries(layouts)) {
    if (!itemLayout) continue
    const bp = breakpoint as VBIDashboardBreakpoint
    const items: VBIDashboardItemLayout[] = Array.isArray(plainLayout[bp]) ? [...plainLayout[bp]] : []

    const existingIndex = items.findIndex((item) => item.widgetId === widgetId)
    const layoutItem: VBIDashboardItemLayout = {
      id: id.uuid(),
      widgetId,
      ...itemLayout,
    }

    if (existingIndex !== -1) {
      items[existingIndex] = layoutItem
    } else {
      items.push(layoutItem)
    }
    plainLayout[bp] = items
  }

  dsl.set('layout', plainLayout)
}
