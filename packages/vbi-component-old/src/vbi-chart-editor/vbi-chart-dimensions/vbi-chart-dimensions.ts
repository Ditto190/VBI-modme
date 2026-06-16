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
import { isDateSchemaType as isDateFieldType } from '../vbi-chart-filter/utils/measure-aggregate-utils'
import styles from './vbi-chart-dimensions.style'

let nextDropZoneId = 0

export interface VBIDimensionItem {
  id: string
  field?: string
  alias?: string
  sort?: 'asc' | 'desc'
  aggregate?: 'year' | 'quarter' | 'month' | 'week' | 'day'
}

interface VBIChartDimensionDropData extends Record<string, unknown> {
  kind: 'dimension-drop-zone'
}

function getDimensionDisplayLabel(item: VBIDimensionItem, _t: any): string {
  const fieldName = item.field || item.id
  const label = item.alias || fieldName
  if (item.aggregate) {
    return `${item.aggregate.toUpperCase()}(${label})`
  }
  return label
}

@customElement('vbi-chart-dimensions')
export class VBIChartDimensions extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor dimensions: VBIDimensionItem[] = []

  @property({ attribute: false }) accessor fields: VBIChartField[] = []

  @property({ attribute: false }) accessor dragDropManager: VBIChartEditorDragDropManager =
    getVBIChartEditorDragDropManager()

  @state() private accessor _isFieldDragging: boolean = false
  @state() private accessor _isDragOver: boolean = false
  @state() private accessor _editingDimensionId: string | null = null

  // Temporary edit states
  @state() private accessor _editAlias: string = ''
  @state() private accessor _editSort: 'none' | 'asc' | 'desc' = 'none'
  @state() private accessor _editAggregate: string = 'none'

  private readonly _dropZoneId = `vbi-chart-dimensions-drop-zone:${++nextDropZoneId}`
  private _dropZone: Droppable<VBIChartDimensionDropData> | undefined

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
      if (this.dimensions.some((d) => d.id === field.name || d.field === field.name)) {
        return
      }

      const item: VBIDimensionItem = {
        id: field.name,
        field: field.name,
        alias: undefined,
      }

      // Auto-aggregate if it's a date field
      if (isDateFieldType(field.type)) {
        item.aggregate = 'year'
      }

      const nextDims = [...this.dimensions, item]
      this.dimensions = nextDims

      this.dispatchEvent(
        new CustomEvent('vbi-chart-dimension-add', {
          detail: { field, item, dimensions: nextDims },
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
    const element = this.renderRoot.querySelector<HTMLElement>('[data-dimension-drop-zone]')

    if (!element) {
      this._destroyDropZone()
      return
    }

    if (this._dropZone) {
      this._dropZone.element = element
      return
    }

    this._dropZone = new Droppable<VBIChartDimensionDropData>(
      {
        id: this._dropZoneId,
        element,
        accept: VBI_CHART_EDITOR_FIELD_DRAG_TYPE,
        data: { kind: 'dimension-drop-zone' },
      },
      manager,
    )
  }

  private _destroyDropZone(): void {
    this._dropZone?.destroy()
    this._dropZone = undefined
  }

  // ── Shelf Item Actions ────────────────────────────────────────────

  private _removeDimension(item: VBIDimensionItem): void {
    const nextDims = this.dimensions.filter((d) => d.id !== item.id)
    this.dimensions = nextDims

    if (this._editingDimensionId === item.id) {
      this._editingDimensionId = null
    }

    this.dispatchEvent(
      new CustomEvent('vbi-chart-dimension-remove', {
        detail: { id: item.id, dimensions: nextDims },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _toggleEditPopover(item: VBIDimensionItem): void {
    if (this._editingDimensionId === item.id) {
      this._editingDimensionId = null
      return
    }

    this._editingDimensionId = item.id
    this._editAlias = item.alias || ''
    this._editSort = item.sort || 'none'
    this._editAggregate = item.aggregate || 'none'
  }

  private _handleSaveEdit(item: VBIDimensionItem): void {
    const updated: VBIDimensionItem = {
      ...item,
      alias: this._editAlias.trim() || undefined,
      sort: this._editSort === 'none' ? undefined : this._editSort,
      aggregate: this._editAggregate === 'none' ? undefined : (this._editAggregate as any),
    }

    const nextDims = this.dimensions.map((d) => (d.id === item.id ? updated : d))
    this.dimensions = nextDims
    this._editingDimensionId = null

    this.dispatchEvent(
      new CustomEvent('vbi-chart-dimension-update', {
        detail: { id: item.id, dimension: updated, dimensions: nextDims },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _handleCancelEdit(): void {
    this._editingDimensionId = null
  }

  // ── Rendering ─────────────────────────────────────────────────────

  private _renderDimensionItem(item: VBIDimensionItem) {
    const isEditing = this._editingDimensionId === item.id
    const displayLabel = getDimensionDisplayLabel(item, translate)
    const tokenClass = isEditing ? 'shelf-token shelf-token--editing' : 'shelf-token'

    const fieldName = item.field || item.id
    const origField = this.fields.find((f) => f.name === fieldName)
    const isDate = isDateFieldType(origField?.type)

    return html`
      <div class="shelf-popover-anchor">
        <div class=${tokenClass} @click=${() => this._toggleEditPopover(item)}>
          <wa-icon class="shelf-token__icon" name="italic"></wa-icon>
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
              this._removeDimension(item)
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
                    <label class="editor-label">${translate('filterFormOperator') || 'Sort'}</label>
                    <wa-select
                      size="xs"
                      value=${this._editSort}
                      @change=${(e: Event) => {
                        this._editSort = (e.currentTarget as HTMLInputElement).value as any
                      }}
                    >
                      <wa-option value="none">None</wa-option>
                      <wa-option value="asc">Ascending</wa-option>
                      <wa-option value="desc">Descending</wa-option>
                    </wa-select>
                  </div>

                  ${isDate
                    ? html`
                        <div class="editor-field-group">
                          <label class="editor-label">Date Grouping</label>
                          <wa-select
                            size="xs"
                            value=${this._editAggregate}
                            @change=${(e: Event) => {
                              this._editAggregate = (e.currentTarget as HTMLInputElement).value
                            }}
                          >
                            <wa-option value="none">None</wa-option>
                            <wa-option value="year">${translate('filterDateUnitYear') || 'Year'}</wa-option>
                            <wa-option value="quarter">${translate('filterDateUnitQuarter') || 'Quarter'}</wa-option>
                            <wa-option value="month">${translate('filterDateUnitMonth') || 'Month'}</wa-option>
                            <wa-option value="week">${translate('filterDateUnitWeek') || 'Week'}</wa-option>
                            <wa-option value="day">${translate('filterDateUnitDay') || 'Day'}</wa-option>
                          </wa-select>
                        </div>
                      `
                    : nothing}

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
          <h3 class="shelf-header__title">${translate('panelsShelvesDimensions') || 'Dimensions'}</h3>
        </div>
        <div class=${dropZoneClass} data-dimension-drop-zone>
          ${this.dimensions.length
            ? this.dimensions.map((item) => this._renderDimensionItem(item))
            : html`<span class="shelf-empty">Drag dimensions or measures here</span>`}
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-dimensions': VBIChartDimensions
  }
}
