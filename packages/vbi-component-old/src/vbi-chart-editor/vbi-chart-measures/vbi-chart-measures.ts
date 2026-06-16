import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import '@awesome.me/webawesome/dist/components/option/option.js'
import '@awesome.me/webawesome/dist/components/select/select.js'
import { Droppable } from '@dnd-kit/dom'
import { html, nothing, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { translateVBIComponentText as translate } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import {
  ChartEditorDragController,
  getVBIChartEditorDragDropManager,
  VBI_CHART_EDITOR_FIELD_DRAG_TYPE,
  type VBIChartEditorDragDropManager,
} from '../drag-drop'
import type { VBIChartField } from '../vbi-chart-fields'
import styles from './vbi-chart-measures.style'

export interface VBIMeasureItem {
  id: string
  field: string
  alias?: string
  encoding?: string
  aggregate?: {
    func:
      | 'count'
      | 'countDistinct'
      | 'sum'
      | 'avg'
      | 'min'
      | 'max'
      | 'variance'
      | 'variancePop'
      | 'stddev'
      | 'median'
      | 'quantile'
    quantile?: number
  }
  format?: {
    autoFormat?: boolean
    type?: string
    prefix?: string
    ratio?: number
    symbol?: string
    fractionDigits?: number
  }
  sort?: 'asc' | 'desc'
}

interface VBIChartMeasureDropData extends Record<string, unknown> {
  kind: 'measure-drop-zone'
}

function getMeasureDisplayLabel(item: VBIMeasureItem, t: any): string {
  const fieldName = item.field || item.id
  const label = item.alias || fieldName
  const aggFunc = item.aggregate?.func || 'sum'
  const aggLabel =
    t(`aggregatesMeasure${aggFunc.charAt(0).toUpperCase()}${aggFunc.slice(1)}Short`) || aggFunc.toUpperCase()
  return `${aggLabel}(${label})`
}

const FORMAT_PRESETS = [
  { key: 'auto', labelKey: 'menuAutoFormat' },
  { key: 'number-2', labelKey: 'formatNumber2' },
  { key: 'percent-1', labelKey: 'formatPercent1' },
  { key: 'cny-wan', labelKey: 'formatCnyWan' },
  { key: 'usd-k', labelKey: 'formatUsdK' },
  { key: 'scientific-3', labelKey: 'formatScientific3' },
  { key: 'raw', labelKey: 'menuRaw' },
]

function getFormatPresetKey(format: VBIMeasureItem['format']): string {
  if (!format) return 'raw'
  if (format.autoFormat) return 'auto'
  if (format.type === 'percent' && format.fractionDigits === 1) return 'percent-1'
  if (format.type === 'scientific' && format.fractionDigits === 3) return 'scientific-3'
  if (format.type === 'number') {
    if (format.prefix === '¥' && format.ratio === 10000 && format.symbol === '万') return 'cny-wan'
    if (format.prefix === '$' && format.ratio === 1000 && format.symbol === 'K') return 'usd-k'
    if (format.fractionDigits === 2 && !format.prefix && !format.symbol) return 'number-2'
  }
  return 'raw'
}

function mapPresetKeyToFormat(key: string): VBIMeasureItem['format'] | undefined {
  switch (key) {
    case 'auto':
      return { autoFormat: true }
    case 'number-2':
      return { type: 'number', fractionDigits: 2 }
    case 'percent-1':
      return { type: 'percent', fractionDigits: 1 }
    case 'cny-wan':
      return { type: 'number', prefix: '¥', ratio: 10000, symbol: '万', fractionDigits: 2 }
    case 'usd-k':
      return { type: 'number', prefix: '$', ratio: 1000, symbol: 'K', fractionDigits: 2 }
    case 'scientific-3':
      return { type: 'scientific', fractionDigits: 3 }
    case 'raw':
    default:
      return undefined
  }
}

let nextDropZoneId = 0

@customElement('vbi-chart-measures')
export class VBIChartMeasures extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor measures: VBIMeasureItem[] = []
  @property({ attribute: false }) accessor fields: VBIChartField[] = []
  @property({ attribute: false }) accessor dragDropManager: VBIChartEditorDragDropManager =
    getVBIChartEditorDragDropManager()

  @state() private accessor _isFieldDragging: boolean = false
  @state() private accessor _isDragOver: boolean = false
  @state() private accessor _editingMeasureId: string | null = null

  // Temporary edit states
  @state() private accessor _editAlias: string = ''
  @state() private accessor _editSort: 'none' | 'asc' | 'desc' = 'none'
  @state() private accessor _editAggregate: string = 'sum'
  @state() private accessor _editFormatKey: string = 'raw'

  private readonly _dropZoneId = `vbi-chart-measures-drop-zone:${++nextDropZoneId}`
  private _dropZone: Droppable<VBIChartMeasureDropData> | undefined

  private _dnd = new ChartEditorDragController(this, {
    getManager: () => this.dragDropManager,
    onDragStart: () => {
      this._isFieldDragging = true
      this._isDragOver = false
    },
    onDragOver: (_, event) => {
      this._isDragOver = event.operation.target?.id === this._dropZoneId
    },
    onDragEnd: (data, event) => {
      const didDropHere = !event.canceled && event.operation.target?.id === this._dropZoneId

      this._isFieldDragging = false
      this._isDragOver = false

      if (!didDropHere) return

      const field = data.field
      // Check if already on the shelf
      if (this.measures.some((m) => m.id === field.name || m.field === field.name)) {
        return
      }

      const item: VBIMeasureItem = {
        id: field.name,
        field: field.name,
        alias: undefined,
        aggregate: { func: 'sum' },
        encoding: 'yAxis', // Default recommended encoding
      }

      const nextMeasures = [...this.measures, item]
      this.measures = nextMeasures

      this.dispatchEvent(
        new CustomEvent('vbi-chart-measure-add', {
          detail: { field, item, measures: nextMeasures },
          bubbles: true,
          composed: true,
        }),
      )
    },
  })

  override disconnectedCallback(): void {
    this._destroyDropZone()
    super.disconnectedCallback()
  }

  override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)
    this._syncDropZone()
  }

  private _syncDropZone(): void {
    const manager = this._dnd.manager
    const element = this.renderRoot.querySelector<HTMLElement>('[data-measure-drop-zone]')

    if (!element) {
      this._destroyDropZone()
      return
    }

    if (this._dropZone) {
      this._dropZone.element = element
      return
    }

    this._dropZone = new Droppable<VBIChartMeasureDropData>(
      {
        id: this._dropZoneId,
        element,
        accept: VBI_CHART_EDITOR_FIELD_DRAG_TYPE,
        data: { kind: 'measure-drop-zone' },
      },
      manager,
    )
  }

  private _destroyDropZone(): void {
    this._dropZone?.destroy()
    this._dropZone = undefined
  }

  // ── Shelf Item Actions ────────────────────────────────────────────

  private _removeMeasure(item: VBIMeasureItem): void {
    const nextMeasures = this.measures.filter((m) => m.id !== item.id)
    this.measures = nextMeasures

    if (this._editingMeasureId === item.id) {
      this._editingMeasureId = null
    }

    this.dispatchEvent(
      new CustomEvent('vbi-chart-measure-remove', {
        detail: { id: item.id, measures: nextMeasures },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _toggleEditPopover(item: VBIMeasureItem): void {
    if (this._editingMeasureId === item.id) {
      this._editingMeasureId = null
      return
    }

    this._editingMeasureId = item.id
    this._editAlias = item.alias || ''
    this._editSort = item.sort || 'none'
    this._editAggregate = item.aggregate?.func || 'sum'
    this._editFormatKey = getFormatPresetKey(item.format)
  }

  private _handleSaveEdit(item: VBIMeasureItem): void {
    const updated: VBIMeasureItem = {
      ...item,
      alias: this._editAlias.trim() || undefined,
      sort: this._editSort === 'none' ? undefined : this._editSort,
      aggregate: {
        func: this._editAggregate as any,
        quantile: this._editAggregate === 'quantile' ? 0.5 : undefined,
      },
      format: mapPresetKeyToFormat(this._editFormatKey),
    }

    const nextMeasures = this.measures.map((m) => (m.id === item.id ? updated : m))
    this.measures = nextMeasures
    this._editingMeasureId = null

    this.dispatchEvent(
      new CustomEvent('vbi-chart-measure-update', {
        detail: { id: item.id, measure: updated, measures: nextMeasures },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _handleCancelEdit(): void {
    this._editingMeasureId = null
  }

  // ── Rendering ─────────────────────────────────────────────────────

  private _renderMeasureItem(item: VBIMeasureItem) {
    const isEditing = this._editingMeasureId === item.id
    const displayLabel = getMeasureDisplayLabel(item, translate)
    const tokenClass = isEditing ? 'shelf-token shelf-token--editing' : 'shelf-token'
    const fieldName = item.field || item.id

    return html`
      <div class="shelf-popover-anchor">
        <div class=${tokenClass} @click=${() => this._toggleEditPopover(item)}>
          <wa-icon class="shelf-token__icon" name="hashtag"></wa-icon>
          <span class="shelf-token__text">${displayLabel}</span>
          ${item.sort
            ? html`<wa-icon
                name=${item.sort === 'asc' ? 'arrow-up' : 'arrow-down'}
                style="font-size: 10px; margin-left: 2px"
              ></wa-icon>`
            : nothing}
          <wa-button
            class="shelf-token__remove"
            appearance="plain"
            size="xs"
            type="button"
            variant="neutral"
            @click=${(e: Event) => {
              e.stopPropagation()
              this._removeMeasure(item)
            }}
          >
            <wa-icon name="xmark"></wa-icon>
          </wa-button>
        </div>

        ${isEditing
          ? html`
              <div class="shelf-popover">
                <div class="editor-form">
                  <div class="editor-field-group">
                    <label class="editor-label">${translate('filterFormField') || 'Field'}</label>
                    <wa-input
                      size="xs"
                      .value=${this._editAlias}
                      placeholder=${fieldName}
                      @input=${(e: Event) => {
                        this._editAlias = (e.currentTarget as HTMLInputElement).value
                      }}
                    ></wa-input>
                  </div>

                  <div class="editor-field-group">
                    <label class="editor-label">${translate('menuAggregate') || 'Aggregate'}</label>
                    <wa-select
                      size="xs"
                      value=${this._editAggregate}
                      @change=${(e: Event) => {
                        this._editAggregate = (e.currentTarget as HTMLInputElement).value
                      }}
                    >
                      <wa-option value="sum">${translate('aggregatesMeasureSumLabel') || 'Sum'}</wa-option>
                      <wa-option value="count">${translate('aggregatesMeasureCountLabel') || 'Count'}</wa-option>
                      <wa-option value="countDistinct"
                        >${translate('aggregatesMeasureCountDistinctLabel') || 'Distinct Count'}</wa-option
                      >
                      <wa-option value="avg">${translate('aggregatesMeasureAvgLabel') || 'Average'}</wa-option>
                      <wa-option value="min">${translate('aggregatesMeasureMinLabel') || 'Minimum'}</wa-option>
                      <wa-option value="max">${translate('aggregatesMeasureMaxLabel') || 'Maximum'}</wa-option>
                      <wa-option value="median">${translate('aggregatesMeasureMedianLabel') || 'Median'}</wa-option>
                      <wa-option value="quantile"
                        >${translate('aggregatesMeasureQuantileLabel') || 'Quantile (0.5)'}</wa-option
                      >
                      <wa-option value="variance"
                        >${translate('aggregatesMeasureVarianceLabel') || 'Variance'}</wa-option
                      >
                      <wa-option value="variancePop"
                        >${translate('aggregatesMeasureVariancePopLabel') || 'Population Variance'}</wa-option
                      >
                      <wa-option value="stddev"
                        >${translate('aggregatesMeasureStddevLabel') || 'Standard Deviation'}</wa-option
                      >
                    </wa-select>
                  </div>

                  <div class="editor-field-group">
                    <label class="editor-label">${translate('menuFormat') || 'Format'}</label>
                    <wa-select
                      size="xs"
                      value=${this._editFormatKey}
                      @change=${(e: Event) => {
                        this._editFormatKey = (e.currentTarget as HTMLInputElement).value
                      }}
                    >
                      ${FORMAT_PRESETS.map(
                        (p) => html` <wa-option value=${p.key}>${translate(p.labelKey) || p.key}</wa-option> `,
                      )}
                    </wa-select>
                  </div>

                  <div class="editor-field-group">
                    <label class="editor-label">${translate('filterFormOperator') || 'Sort'}</label>
                    <wa-select
                      size="xs"
                      value=${this._editSort}
                      @change=${(e: Event) => {
                        this._editSort = (e.currentTarget as HTMLInputElement).value as any
                      }}
                    >
                      <wa-option value="none">${translate('menuSortClear') || 'None'}</wa-option>
                      <wa-option value="asc">${translate('menuSortAsc') || 'Ascending'}</wa-option>
                      <wa-option value="desc">${translate('menuSortDesc') || 'Descending'}</wa-option>
                    </wa-select>
                  </div>

                  <div class="editor-actions">
                    <wa-button size="xs" appearance="outlined" variant="neutral" @click=${this._handleCancelEdit}>
                      ${translate('filterCancel') || 'Cancel'}
                    </wa-button>
                    <wa-button size="xs" variant="brand" @click=${() => this._handleSaveEdit(item)}>
                      ${translate('filterSave') || 'Save'}
                    </wa-button>
                  </div>
                </div>
              </div>
            `
          : nothing}
      </div>
    `
  }

  override render() {
    const dropZoneClass = [
      'shelf-drop-zone',
      this._isFieldDragging ? 'shelf-drop-zone--active' : '',
      this._isDragOver ? 'shelf-drop-zone--over' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return html`
      <section class="shelf-panel">
        <div class="shelf-header">
          <h3 class="shelf-header__title">${translate('panelsShelvesMeasures') || 'Measures'}</h3>
        </div>
        <div class=${dropZoneClass} data-measure-drop-zone>
          ${this.measures.length
            ? this.measures.map((item) => this._renderMeasureItem(item))
            : html`<span class="shelf-empty"
                >${translate('filterEmptyText') || 'Drag fields here or click + to add'}</span
              >`}
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-measures': VBIChartMeasures
  }
}
