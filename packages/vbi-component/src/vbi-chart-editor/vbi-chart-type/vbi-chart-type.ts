import type { VBIChartBuilder } from '@visactor/vbi'
import { html, nothing, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { translateVBIComponentText as translate, type VBIComponentText } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import {
  VBI_CHART_TYPE_GROUPS,
  VBI_CHART_TYPE_METAS,
  getVBIChartTypeGroups,
  getVBIChartTypeMeta,
  type ResolvedVBIChartTypeMeta,
  type VBIChartTypeChangeDetail,
  type VBIChartTypeGroupMeta,
  type VBIChartTypeMeta,
} from './chart-type-meta'
import styles from './vbi-chart-type.style'

/**
 * Chart type selector for the VBI chart editor.
 *
 * @tag vbi-chart-type
 *
 * @prop {VBIChartBuilder} builder - Optional VBI chart builder used as the source of truth.
 * @prop {string} chartType - Selected chart type when no builder is provided.
 * @prop {VBIChartTypeGroupMeta[]} chartTypeGroups - Chart type group catalog.
 * @prop {VBIChartTypeMeta[]} chartTypeMetas - Chart type metadata catalog.
 * @prop {boolean} compact - Render the compact toolbar trigger.
 * @prop {boolean} hideText - Hide label text in the trigger.
 * @prop {VBIComponentText} text - Text override map keyed by the toolbar i18n keys.
 *
 * @cssprop [--vbi-font-family] - Font family used by VBI components.
 * @cssprop [--vbi-chart-type-bg] - Surface background color of trigger, cards, and panel.
 * @cssprop [--vbi-chart-type-text] - Primary text color.
 * @cssprop [--vbi-chart-type-text-secondary] - Secondary text color.
 * @cssprop [--vbi-chart-type-border] - Trigger border color.
 * @cssprop [--vbi-chart-type-border-secondary] - Card border color.
 * @cssprop [--vbi-chart-type-primary] - Accent color for selected and focus states.
 * @cssprop [--vbi-chart-type-primary-bg] - Accent background color.
 * @cssprop [--vbi-chart-type-primary-border] - Accent border color.
 * @cssprop [--vbi-chart-type-radius] - Base corner radius.
 * @cssprop [--vbi-chart-type-radius-lg] - Large corner radius.
 * @cssprop [--vbi-chart-type-shadow] - Floating panel shadow.
 *
 * @fires vbi-chart-type-change - Fired after a chart type is selected.
 */
@customElement('vbi-chart-type')
export class VBIChartType extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor builder: VBIChartBuilder | undefined
  @property({ type: String, attribute: 'chart-type' }) accessor chartType = 'table'
  @property({ type: Array, attribute: false }) accessor chartTypeGroups: VBIChartTypeGroupMeta[] = VBI_CHART_TYPE_GROUPS
  @property({ type: Array, attribute: false }) accessor chartTypeMetas: VBIChartTypeMeta[] = VBI_CHART_TYPE_METAS
  @property({ type: Boolean }) accessor compact = false
  @property({ type: Boolean, attribute: 'hide-text' }) accessor hideText = false
  @property({ attribute: false }) accessor text: VBIComponentText = {}

  @state() private accessor _open = false
  @state() private accessor _builderChartType = 'table'
  @state() private accessor _builderAvailableChartTypes: string[] = VBI_CHART_TYPE_METAS.map((meta) => meta.type)

  private _stopBuilderObserve: (() => void) | undefined

  override connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('click', this._handleDocumentClick)
    document.addEventListener('keydown', this._handleDocumentKeydown)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._stopBuilderObserve?.()
    this._stopBuilderObserve = undefined
    document.removeEventListener('click', this._handleDocumentClick)
    document.removeEventListener('keydown', this._handleDocumentKeydown)
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('builder')) {
      this._bindBuilder()
    }
  }

  private get _currentChartType(): string {
    return this.builder ? this._builderChartType : this.chartType
  }

  private get _chartTypes(): string[] {
    return this.builder ? this._builderAvailableChartTypes : this.chartTypeMetas.map((meta) => meta.type)
  }

  private get _panelTitle(): string {
    return translate('toolbarChartTypePanelTitle', this.text)
  }

  private _bindBuilder(): void {
    this._stopBuilderObserve?.()
    this._stopBuilderObserve = undefined

    if (!this.builder) {
      return
    }

    this._syncFromBuilder()
    this._stopBuilderObserve = this.builder.chartType.observe(() => {
      this._syncFromBuilder()
    })
  }

  private _syncFromBuilder(): void {
    if (!this.builder) {
      return
    }

    this._builderChartType = this.builder.chartType.getChartType()
    this._builderAvailableChartTypes = this.builder.chartType.getAvailableChartTypes()
  }

  private _handleDocumentClick = (event: MouseEvent): void => {
    if (!this._open || event.composedPath().includes(this)) {
      return
    }

    this._open = false
  }

  private _handleDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this._open = false
    }
  }

  private _togglePanel = (): void => {
    this._open = !this._open
  }

  private _selectChartType(type: string): void {
    if (this.builder) {
      this._builderChartType = type
      this.builder.chartType.changeChartType(type)
    } else {
      this.chartType = type
    }

    this._open = false
    this.dispatchEvent(
      new CustomEvent<VBIChartTypeChangeDetail>('vbi-chart-type-change', {
        detail: { chartType: type, type },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _groupedChartTypes() {
    const chartTypes = this._chartTypes
    return getVBIChartTypeGroups(this.text, this.chartTypeGroups)
      .map((group) => ({
        ...group,
        items: chartTypes
          .map((type) => getVBIChartTypeMeta(type, this.text, this.chartTypeMetas))
          .filter((meta) => meta.group === group.key),
      }))
      .filter((group) => group.items.length > 0)
  }

  private _renderIcon(icon: ResolvedVBIChartTypeMeta['icon']) {
    return html`<span class="chart-icon">${icon}</span>`
  }

  private _renderCard(meta: ResolvedVBIChartTypeMeta) {
    const selected = this._currentChartType === meta.type
    const tooltip = `${meta.label}: ${meta.description}`

    return html`
      <button
        class="card"
        type="button"
        title=${tooltip}
        aria-label=${tooltip}
        ?data-selected=${selected}
        @click=${() => this._selectChartType(meta.type)}
      >
        ${this._renderIcon(meta.icon)}
        <span class="card__label">${meta.label}</span>
      </button>
    `
  }

  private _renderPanel() {
    if (!this._open) {
      return nothing
    }

    const groups = this._groupedChartTypes()

    return html`
      <div class="panel" role="dialog" aria-label=${this._panelTitle}>
        <div class="panel__title">${this._panelTitle}</div>
        ${groups.length > 0
          ? html`
              <div class="panel__groups">
                ${repeat(
                  groups,
                  (group) => group.key,
                  (group) => html`
                    <section class="group">
                      <div class="group__heading" title=${group.description}>${group.label}</div>
                      <div class="group__grid">
                        ${repeat(
                          group.items,
                          (item) => item.type,
                          (item) => this._renderCard(item),
                        )}
                      </div>
                    </section>
                  `,
                )}
              </div>
            `
          : html`<div class="panel__empty">${translate('toolbarChartTypeEmpty', this.text)}</div>`}
      </div>
    `
  }

  override render() {
    const currentChartMeta = getVBIChartTypeMeta(this._currentChartType, this.text, this.chartTypeMetas)
    const triggerTooltip = `${currentChartMeta.label}: ${currentChartMeta.description}`
    const triggerClasses = classMap({
      trigger: true,
      'trigger--compact': this.compact,
      'trigger--without-text': this.hideText,
    })

    return html`
      <div class="chart-type">
        <button
          class=${triggerClasses}
          type="button"
          title=${triggerTooltip}
          aria-label=${triggerTooltip}
          aria-haspopup="dialog"
          aria-expanded=${this._open ? 'true' : 'false'}
          @click=${this._togglePanel}
        >
          ${this._renderIcon(currentChartMeta.icon)}
          ${this.hideText
            ? nothing
            : html`
                <span class="trigger__content">
                  <span class="trigger__label">${currentChartMeta.label}</span>
                  ${this.compact
                    ? nothing
                    : html`<span class="trigger__description">${currentChartMeta.description}</span>`}
                </span>
              `}
        </button>
        ${this._renderPanel()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-type': VBIChartType
  }
}
