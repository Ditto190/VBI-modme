import * as Y from 'yjs'
import type { VBIDashboardBreakpoint, VBIDashboardItemLayout, VBIDashboardWidget } from 'src/types'

type ResourceReference = string | { getUUID: () => string }

const resolveResourceReference = (value: ResourceReference): string => {
  return typeof value === 'string' ? value : value.getUUID()
}

export type DashboardWidgetLayouts = Partial<
  Record<VBIDashboardBreakpoint, Omit<VBIDashboardItemLayout, 'id' | 'widgetId'>>
>

export class DashboardInsightBuilder {
  private _layouts: DashboardWidgetLayouts = {}

  constructor(private widget: Y.Map<any>) {}

  getId(): string {
    return this.widget.get('id')
  }

  setTitle(title: string): this {
    this.widget.set('title', title)
    return this
  }

  setDescription(description: string): this {
    this.widget.set('description', description)
    return this
  }

  setInsightId(insight: ResourceReference): this {
    this.widget.set('insightId', resolveResourceReference(insight))
    return this
  }

  setLayouts(layouts: DashboardWidgetLayouts): this {
    this._layouts = layouts
    return this
  }

  /** @internal */
  getLayouts(): DashboardWidgetLayouts {
    return this._layouts
  }

  toJSON(): VBIDashboardWidget {
    return this.widget.toJSON() as VBIDashboardWidget
  }
}
