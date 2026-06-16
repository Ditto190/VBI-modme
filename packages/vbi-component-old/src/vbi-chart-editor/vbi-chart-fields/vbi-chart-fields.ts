import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/divider/divider.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/input/input.js'
import { Draggable, Feedback, type DragMoveEvent, type DragStartEvent } from '@dnd-kit/dom'
import { html, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { translateVBIComponentText as translate } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import {
  createChartEditorFieldDragId,
  ChartEditorDragController,
  getVBIChartEditorDragDropManager,
  VBI_CHART_EDITOR_FIELD_DRAG_TYPE,
  type VBIChartEditorFieldDragData,
  type VBIChartEditorDragDropManager,
} from '../drag-drop'
import styles from './vbi-chart-fields.style'

const fieldIconName = {
  string: 'font',
  number: 'hashtag',
  date: 'calendar-days',
  datetime: 'clock',
  timestamp: 'stopwatch',
  index: 'hashtag',
} as const

export type VBIChartFieldType = keyof typeof fieldIconName

/** A single field entry shown in the sidebar list. */
export interface VBIChartField {
  /** Unique field name (e.g. `"order_date"`). */
  name: string
  /** Whether the field is a dimension or a measure. */
  kind: 'dimension' | 'measure'
  /** Field data type from the dataset schema. */
  type?: VBIChartFieldType
}

export const getChartEditorFieldIconName = (field: VBIChartField) => {
  return fieldIconName[field.type ?? 'string']
}

/**
 * Sidebar field-list panel for the VBI chart editor.
 *
 * Renders a searchable, categorised list of dimension and measure fields that
 * the user can inspect (and later drag) into query shelves.
 *
 * @tag vbi-chart-fields
 *
 * @prop {VBIChartField[]} fields - The full set of fields to display.
 * @prop {VBIChartEditorDragDropManager} dragDropManager - Shared `@dnd-kit/dom`
 *   manager for field drop targets rendered outside this element.
 *
 * @fires vbi-chart-field-drag-start - Dispatched when a field drag starts.
 *   `detail: { field: VBIChartField }`.
 *
 * @fires vbi-chart-field-drag-end - Dispatched when a field drag ends.
 *   `detail: { field: VBIChartField, canceled: boolean, targetId?: string | number }`.
 */
@customElement('vbi-chart-fields')
export class VBIChartFields extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor fields: VBIChartField[] = []

  @property({ attribute: false }) accessor dragDropManager: VBIChartEditorDragDropManager =
    getVBIChartEditorDragDropManager()

  @state() private accessor _searchQuery: string = ''

  @state() private accessor _draggingFieldId: string | undefined

  private _fieldDraggables = new Map<string, Draggable<VBIChartEditorFieldDragData>>()

  private _dragPreviewElement: HTMLElement | undefined

  private _dnd = new ChartEditorDragController(this, {
    getManager: () => this.dragDropManager,
    onManagerChange: () => {
      this._destroyFieldDraggables()
    },
    onDragStart: (data, event) => {
      const source = event.operation.source
      if (!source || !this._fieldDraggables.has(String(source.id))) return

      this._draggingFieldId = createChartEditorFieldDragId(data.field)
      this._createDragPreview(data.field)
      this._moveDragPreview(event)
      this.dispatchEvent(
        new CustomEvent('vbi-chart-field-drag-start', {
          detail: { field: data.field },
          bubbles: true,
          composed: true,
        }),
      )
    },
    onDragMove: (_, event) => {
      const source = event.operation.source
      if (source && this._fieldDraggables.has(String(source.id))) {
        this._moveDragPreview(event)
      }
    },
    onDragEnd: (data, event) => {
      const source = event.operation.source
      const isLocal = source != null && this._fieldDraggables.has(String(source.id))

      this._draggingFieldId = undefined
      this._removeDragPreview()

      if (!isLocal) return

      this.dispatchEvent(
        new CustomEvent('vbi-chart-field-drag-end', {
          detail: {
            field: data.field,
            canceled: event.canceled,
            targetId: event.operation.target?.id,
          },
          bubbles: true,
          composed: true,
        }),
      )
    },
  })

  override disconnectedCallback(): void {
    this._removeDragPreview()
    this._destroyFieldDraggables()
    super.disconnectedCallback()
  }

  override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties)
    this._syncFieldDraggables()
  }

  // ── Computed helpers ──────────────────────────────────────────────

  private get _filteredFields(): VBIChartField[] {
    const q = this._searchQuery.toLowerCase().trim()
    if (!q) return this.fields
    return this.fields.filter((f) => f.name.toLowerCase().includes(q))
  }

  private get _dimensions(): VBIChartField[] {
    return this._filteredFields.filter((f) => f.kind === 'dimension')
  }

  private get _measures(): VBIChartField[] {
    return this._filteredFields.filter((f) => f.kind === 'measure')
  }

  // ── Drag and drop ─────────────────────────────────────────────────

  private _syncFieldDraggables(): void {
    const manager = this._dnd.manager
    const fieldsById = new Map(this._filteredFields.map((field) => [createChartEditorFieldDragId(field), field]))
    const nextIds = new Set<string>()

    this.renderRoot.querySelectorAll<HTMLElement>('[data-field-drag-id]').forEach((element) => {
      const id = element.dataset.fieldDragId
      const field = id ? fieldsById.get(id) : undefined

      if (!id || !field) {
        return
      }

      const existing = this._fieldDraggables.get(id)
      const data: VBIChartEditorFieldDragData = { kind: 'schema-field', field: { ...field } }

      if (existing) {
        existing.element = element
        existing.data = data
      } else {
        this._fieldDraggables.set(
          id,
          new Draggable<VBIChartEditorFieldDragData>(
            {
              id,
              element,
              data,
              type: VBI_CHART_EDITOR_FIELD_DRAG_TYPE,
              plugins: [
                Feedback.configure({
                  dropAnimation: null,
                }),
              ],
            },
            manager,
          ),
        )
      }

      nextIds.add(id)
    })

    for (const [id, draggable] of this._fieldDraggables) {
      if (!nextIds.has(id)) {
        draggable.destroy()
        this._fieldDraggables.delete(id)
      }
    }
  }

  private _destroyFieldDraggables(): void {
    for (const draggable of this._fieldDraggables.values()) {
      draggable.destroy()
    }

    this._fieldDraggables.clear()
  }

  private _createDragPreview(field: VBIChartField): void {
    this._removeDragPreview()

    const preview = document.createElement('div')
    const icon = document.createElement('wa-icon')
    const name = document.createElement('span')

    icon.setAttribute('name', getChartEditorFieldIconName(field))
    icon.style.color =
      field.kind === 'measure'
        ? 'var(--wa-color-success-on-normal, #15803d)'
        : 'var(--wa-color-brand-on-normal, #2563eb)'
    icon.style.fontSize = '12px'
    name.textContent = field.name
    name.style.overflow = 'hidden'
    name.style.textOverflow = 'ellipsis'
    name.style.whiteSpace = 'nowrap'

    preview.setAttribute('data-vbi-chart-field-drag-preview', '')
    preview.style.position = 'fixed'
    preview.style.top = '0'
    preview.style.left = '0'
    preview.style.zIndex = '2147483647'
    preview.style.pointerEvents = 'none'
    preview.style.display = 'flex'
    preview.style.alignItems = 'center'
    preview.style.gap = '8px'
    preview.style.maxWidth = '260px'
    preview.style.padding = '6px 10px'
    preview.style.border = '1px solid var(--wa-color-brand-border-normal, #8ab4ff)'
    preview.style.borderRadius = '6px'
    preview.style.background = 'var(--wa-color-surface-raised, #fff)'
    preview.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.16)'
    preview.style.color = 'var(--wa-color-neutral-on-normal, #1f2937)'
    preview.style.fontFamily = 'var(--vbi-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)'
    preview.style.fontSize = '12px'
    preview.style.lineHeight = '18px'
    preview.style.opacity = '0.96'
    preview.style.transform = 'translate3d(-9999px, -9999px, 0)'

    preview.append(icon, name)
    document.body.append(preview)
    this._dragPreviewElement = preview
  }

  private _removeDragPreview(): void {
    this._dragPreviewElement?.remove()
    this._dragPreviewElement = undefined
  }

  private _moveDragPreview(event: DragStartEvent | DragMoveEvent): void {
    const preview = this._dragPreviewElement

    if (!preview) {
      return
    }

    const position = event.operation.position.current
    preview.style.transform = `translate3d(${position.x + 12}px, ${position.y + 12}px, 0)`
  }

  // ── Event handlers ────────────────────────────────────────────────

  private _handleSearch = (event: Event): void => {
    const input = event.currentTarget as HTMLElement & { value: string }
    this._searchQuery = input.value
  }

  // ── Rendering ─────────────────────────────────────────────────────

  private _renderFieldItem(field: VBIChartField) {
    const iconClass = `field-item__icon field-item__icon--${field.kind}`
    const dragId = createChartEditorFieldDragId(field)
    const itemClass = dragId === this._draggingFieldId ? 'field-item field-item--dragging' : 'field-item'

    return html`
      <div class=${itemClass} data-field-drag-id=${dragId}>
        <wa-icon class=${iconClass} name=${getChartEditorFieldIconName(field)}></wa-icon>
        <span class="field-item__name">${field.name}</span>
      </div>
    `
  }

  override render() {
    return html`
      <!-- Header -->
      <div class="fields-header">
        <h2 class="fields-header__title">${translate('fieldsTitle')}</h2>
      </div>
      <wa-divider class="fields-header__divider"></wa-divider>

      <!-- Search -->
      <div class="fields-search">
        <wa-input size="xs" placeholder=${translate('fieldsSearchPlaceholder')} with-clear @input=${this._handleSearch}>
          <wa-icon slot="start" name="magnifying-glass"></wa-icon>
        </wa-input>
      </div>

      <!-- Scrollable field list -->
      <div class="fields-scroll">
        <!-- Dimensions -->
        <section class="fields-section">
          <h3 class="fields-section__label">${translate('fieldsDimensionsLabel')}</h3>
          <div class="fields-list">${this._dimensions.map((f) => this._renderFieldItem(f))}</div>
        </section>

        <!-- Measures -->
        <section class="fields-section">
          <h3 class="fields-section__label">${translate('fieldsMeasuresLabel')}</h3>
          <div class="fields-list">${this._measures.map((f) => this._renderFieldItem(f))}</div>
        </section>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-fields': VBIChartFields
  }
}
