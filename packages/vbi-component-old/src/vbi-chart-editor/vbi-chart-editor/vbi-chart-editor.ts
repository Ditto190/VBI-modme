import type { VBIChartBuilderInterface } from '@visactor/vbi'
import type { VSeed } from '@visactor/vseed'
import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement, VdashElement } from 'src/shared/element'
import '../../vbi-vseed-render'
import { getVBIChartEditorDragDropManager, type VBIChartEditorDragDropManager } from '../drag-drop'
import '../vbi-chart-dimensions'
import '../vbi-chart-fields'
import type { VBIChartField } from '../vbi-chart-fields'
import '../vbi-chart-filter'
import type { VBIChartFilterItem } from '../vbi-chart-filter'
import type { HavingFilterItem } from '../vbi-chart-filter'
import '../vbi-chart-measures'
import '../vbi-chart-toolbar'
import styles from './vbi-chart-editor.style'

/**
 * Main chart editor workspace component.
 *
 * Coordinates the toolbar, fields sidebar list, dimensions, measures,
 * where, and having filter panels, and the chart renderer into a single layout.
 *
 * Accepts a `VBIChartBuilderInterface` as the single source of truth for
 * chart state, and a `fields` array describing the available schema columns.
 * The consumer is responsible for creating the builder (via `vbi.chart.create()`)
 * and discovering the schema fields (via `connector.discoverSchema()`).
 *
 * @tag vbi-chart-editor
 *
 * @prop {VBIChartBuilderInterface} chartBuilder - The chart builder instance.
 * @prop {VBIChartField[]} fields - Available schema fields for the sidebar.
 */
@customElement('vbi-chart-editor')
export class VBIChartEditor extends VdashElement {
  static override get styles() {
    return styles
  }

  /** The chart builder — single source of truth for chart state. */
  @property({ attribute: false }) accessor chartBuilder: VBIChartBuilderInterface | undefined = undefined

  /** Available schema fields shown in the sidebar for drag-and-drop. */
  @property({ attribute: false }) accessor fields: VBIChartField[] = []

  @state() private accessor _dragDropManager: VBIChartEditorDragDropManager = getVBIChartEditorDragDropManager()

  /** The latest VSeed spec built from the chart builder. */
  @state() private accessor _vseed: VSeed | undefined = undefined

  /** Unsubscribe callback returned by the YJS doc observer. */
  private _unobserveDoc: (() => void) | undefined

  /** Abort controller for the in-flight `buildVSeed()` call. */
  private _buildAbortController: AbortController | undefined

  override connectedCallback(): void {
    super.connectedCallback()
    console.log('[vbi-chart-editor] connectedCallback, hasBuilder:', !!this.chartBuilder)
    this._observeBuilder()
    this._vseedDirty = true
  }

  override disconnectedCallback(): void {
    this._buildAbortController?.abort()
    this._unobserveBuilder()
    super.disconnectedCallback()
  }

  override willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    console.log(
      '[vbi-chart-editor] willUpdate, changedKeys:',
      [...changedProperties.keys()],
      'hasBuilder:',
      !!this.chartBuilder,
    )
    if (changedProperties.has('chartBuilder')) {
      console.log('[vbi-chart-editor] willUpdate: chartBuilder changed!')
      this._buildAbortController?.abort()
      this._unobserveBuilder()
      this._observeBuilder()
      this._vseedDirty = true
    }
  }

  override updated(_changedProperties: Map<PropertyKey, unknown>): void {
    console.log('[vbi-chart-editor] updated, dirty:', this._vseedDirty, 'hasBuilder:', !!this.chartBuilder)
    if (this._vseedDirty) {
      this._vseedDirty = false
      this._buildVSeed()
    }
  }

  // ── Builder observation ───────────────────────────────────────────

  /** Flag indicating the vseed needs to be rebuilt after the next render. */
  private _vseedDirty = false

  /**
   * Observe the builder's underlying YJS doc so the component re-renders
   * whenever the chart state is mutated (locally or via sync).
   */
  private _observeBuilder(): void {
    const doc = this.chartBuilder?.doc
    if (!doc) return

    const handler = () => {
      this._vseedDirty = true
      this.requestUpdate()
    }
    doc.on('update', handler)
    this._unobserveDoc = () => {
      doc.off('update', handler)
    }
  }

  private _unobserveBuilder(): void {
    this._unobserveDoc?.()
    this._unobserveDoc = undefined
  }

  /**
   * Build the VSeed spec from the chart builder.
   * Cancels any previous in-flight build via AbortController.
   */
  private async _buildVSeed(): Promise<void> {
    this._buildAbortController?.abort()

    const builder = this.chartBuilder
    if (!builder || builder.isEmpty()) {
      console.log('[vbi-chart-editor] _buildVSeed: no builder or empty', {
        hasBuilder: !!builder,
        isEmpty: builder?.isEmpty(),
      })
      this._vseed = undefined
      return
    }

    const controller = new AbortController()
    this._buildAbortController = controller

    try {
      console.log('[vbi-chart-editor] _buildVSeed: calling buildVSeed...')
      const vseed = await builder.buildVSeed({ signal: controller.signal })
      console.log('[vbi-chart-editor] _buildVSeed: result', { aborted: controller.signal.aborted, vseed: !!vseed })
      if (!controller.signal.aborted) {
        this._vseed = vseed as VSeed
      }
    } catch (err) {
      console.error('[vbi-chart-editor] _buildVSeed failed:', err, { aborted: controller.signal.aborted })
      if (!controller.signal.aborted) {
        this._vseed = undefined
      }
    }
  }

  // ── Derived state helpers ────────────────────────────────────────

  private get _dsl() {
    return this.chartBuilder?.build()
  }

  private get _limit(): number {
    return this._dsl?.limit ?? 1000
  }

  private get _canUndo(): boolean {
    return this.chartBuilder?.undoManager.canUndo() ?? false
  }

  private get _canRedo(): boolean {
    return this.chartBuilder?.undoManager.canRedo() ?? false
  }

  private get _dimensions(): any[] {
    return this._dsl?.dimensions ?? []
  }

  private get _measures(): any[] {
    return this._dsl?.measures ?? []
  }

  private get _whereFilters(): VBIChartFilterItem[] {
    const where = this._dsl?.whereFilter
    return (where?.conditions as VBIChartFilterItem[] | undefined) ?? []
  }

  private get _whereRootOperator(): 'and' | 'or' {
    return this._dsl?.whereFilter?.op ?? 'and'
  }

  private get _havingFilters(): HavingFilterItem[] {
    const having = this._dsl?.havingFilter
    return (having?.conditions as HavingFilterItem[] | undefined) ?? []
  }

  private get _havingRootOperator(): 'and' | 'or' {
    return this._dsl?.havingFilter?.op ?? 'and'
  }

  // ── Event handlers ───────────────────────────────────────────────
  // All child-component events are handled here by delegating to the
  // appropriate builder sub-API. The YJS doc observer triggers re-render.

  private _handleLimitChange = (event: CustomEvent<{ value: number }>): void => {
    this.chartBuilder?.limit.setLimit(event.detail.value)
  }

  // ── Dimension Handlers ───────────────────────────────────────────

  private _handleDimensionAdd = (event: CustomEvent<{ item: any }>): void => {
    const { item } = event.detail
    this.chartBuilder?.dimensions.add(item.field, (node) => {
      if (item.alias) node.setAlias(item.alias)
      if (item.sort) node.setSort(item.sort)
      if (item.aggregate) node.setAggregate(item.aggregate)
    })
  }

  private _handleDimensionRemove = (event: CustomEvent<{ id: string }>): void => {
    this.chartBuilder?.dimensions.remove(event.detail.id)
  }

  private _handleDimensionUpdate = (event: CustomEvent<{ id: string; dimension: any }>): void => {
    const { id, dimension } = event.detail
    this.chartBuilder?.dimensions.update(id, (node) => {
      node.setAlias(dimension.alias ?? '')
      if (dimension.sort) {
        node.setSort(dimension.sort)
      } else {
        node.clearSort()
      }
      if (dimension.aggregate) {
        node.setAggregate(dimension.aggregate)
      } else {
        node.clearAggregate()
      }
    })
  }

  // ── Measure Handlers ──────────────────────────────────────────────

  private _handleMeasureAdd = (event: CustomEvent<{ item: any }>): void => {
    const { item } = event.detail
    this.chartBuilder?.measures.add(item.field, (node) => {
      if (item.alias) node.setAlias(item.alias)
      if (item.aggregate) node.setAggregate(item.aggregate)
      if (item.encoding) node.setEncoding(item.encoding)
      if (item.sort) node.setSort(item.sort)
      if (item.format) node.setFormat(item.format)
    })
  }

  private _handleMeasureRemove = (event: CustomEvent<{ id: string }>): void => {
    this.chartBuilder?.measures.remove(event.detail.id)
  }

  private _handleMeasureUpdate = (event: CustomEvent<{ id: string; measure: any }>): void => {
    const { id, measure } = event.detail
    this.chartBuilder?.measures.update(id, (node) => {
      node.setAlias(measure.alias ?? '')
      if (measure.aggregate) node.setAggregate(measure.aggregate)
      if (measure.sort) {
        node.setSort(measure.sort)
      } else {
        node.clearSort()
      }
      if (measure.format) {
        node.setFormat(measure.format)
      } else {
        node.clearFormat()
      }
    })
  }

  // ── Where Filter Handlers ────────────────────────────────────────

  private _handleWhereFilterChange = (
    event: CustomEvent<{ filters: any[]; action: string; changedItem?: any }>,
  ): void => {
    const { action, changedItem } = event.detail
    if (action === 'clear') {
      this.chartBuilder?.whereFilter.clear()
      return
    }
    const item = changedItem
    if (!item) return
    if (action === 'remove') {
      this.chartBuilder?.whereFilter.remove(item.id)
    } else if (action === 'add') {
      this.chartBuilder?.whereFilter.add(item.field, (node) => {
        if (item.operator) node.setOperator(item.operator)
        if (item.operator === 'date' && item.value) node.setDate(item.value)
        else if (item.value !== undefined) node.setValue(item.value)
      })
    } else if (action === 'update') {
      this.chartBuilder?.whereFilter.update(item.id, (node) => {
        if (item.operator) node.setOperator(item.operator)
        if (item.operator === 'date' && item.value) node.setDate(item.value)
        else if (item.value !== undefined) node.setValue(item.value)
      })
    }
  }

  private _handleWhereFilterRootOperatorChange = (_event: CustomEvent<{ operator: 'and' | 'or' }>): void => {
    // Root operator is managed by the filter component's local state;
    // the builder does not expose a root operator setter currently.
    // The filter panel toggles it visually, and the built DSL reflects
    // the conditions array — no builder action needed here.
  }

  // ── Having Filter Handlers ───────────────────────────────────────

  private _handleHavingFilterChange = (
    event: CustomEvent<{ filters: any[]; action: string; changedItem?: any }>,
  ): void => {
    const { action, changedItem } = event.detail
    if (action === 'clear') {
      this.chartBuilder?.havingFilter.clear()
      return
    }
    const item = changedItem
    if (!item) return
    if (action === 'remove') {
      this.chartBuilder?.havingFilter.remove(item.id)
    } else if (action === 'add') {
      this.chartBuilder?.havingFilter.add(item.field, (node) => {
        if (item.aggregate) node.setAggregate(item.aggregate)
        if (item.operator) node.setOperator(item.operator)
        if (item.value !== undefined) node.setValue(item.value)
      })
    } else if (action === 'update') {
      this.chartBuilder?.havingFilter.update(item.id, (node) => {
        if (item.aggregate) node.setAggregate(item.aggregate)
        if (item.operator) node.setOperator(item.operator)
        if (item.value !== undefined) node.setValue(item.value)
      })
    }
  }

  private _handleHavingFilterRootOperatorChange = (_event: CustomEvent<{ operator: 'and' | 'or' }>): void => {
    // Same as where — root operator is visual state in the filter panel.
  }

  // ── Rendering ────────────────────────────────────────────────────

  override render() {
    return html`
      <div class="editor-toolbar">
        <vbi-chart-toolbar
          .limit=${this._limit}
          ?can-undo=${this._canUndo}
          ?can-redo=${this._canRedo}
          @vbi-chart-limit-change=${this._handleLimitChange}
        >
          <slot name="toolbar-chart-type" slot="chart-type"></slot>
        </vbi-chart-toolbar>
      </div>
      <div class="editor-body">
        <aside class="editor-sidebar">
          <vbi-chart-fields .fields=${this.fields} .dragDropManager=${this._dragDropManager}></vbi-chart-fields>
        </aside>
        <main class="editor-main">
          <div class="editor-shelves">
            <vbi-chart-dimensions
              .dimensions=${this._dimensions}
              .fields=${this.fields}
              .dragDropManager=${this._dragDropManager}
              @vbi-chart-dimension-add=${this._handleDimensionAdd}
              @vbi-chart-dimension-remove=${this._handleDimensionRemove}
              @vbi-chart-dimension-update=${this._handleDimensionUpdate}
            ></vbi-chart-dimensions>

            <vbi-chart-measures
              .measures=${this._measures}
              .fields=${this.fields}
              .dragDropManager=${this._dragDropManager}
              @vbi-chart-measure-add=${this._handleMeasureAdd}
              @vbi-chart-measure-remove=${this._handleMeasureRemove}
              @vbi-chart-measure-update=${this._handleMeasureUpdate}
            ></vbi-chart-measures>

            <vbi-chart-filter
              type="where"
              .filters=${this._whereFilters}
              .fields=${this.fields}
              .rootOperator=${this._whereRootOperator}
              .dragDropManager=${this._dragDropManager}
              @vbi-filter-change=${this._handleWhereFilterChange}
              @vbi-chart-filter-root-operator-change=${this._handleWhereFilterRootOperatorChange}
            ></vbi-chart-filter>

            <vbi-chart-filter
              type="having"
              .filters=${this._havingFilters}
              .fields=${this.fields}
              .rootOperator=${this._havingRootOperator}
              .dragDropManager=${this._dragDropManager}
              @vbi-filter-change=${this._handleHavingFilterChange}
              @vbi-chart-having-root-operator-change=${this._handleHavingFilterRootOperatorChange}
            ></vbi-chart-filter>
          </div>
          <div class="editor-render">
            <vbi-vseed-render .vseed=${this._vseed}></vbi-vseed-render>
          </div>
        </main>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-editor': VBIChartEditor
  }
}
