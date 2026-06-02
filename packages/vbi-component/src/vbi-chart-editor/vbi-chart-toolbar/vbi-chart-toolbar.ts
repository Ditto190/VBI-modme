import type { VBIChartBuilder } from '@visactor/vbi'
import { html, svg, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { translateVBIComponentText as translate, type VBIComponentText } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import '../vbi-chart-type'
import {
  VBI_CHART_TYPE_GROUPS,
  VBI_CHART_TYPE_METAS,
  type VBIChartTypeGroupMeta,
  type VBIChartTypeMeta,
} from '../vbi-chart-type/chart-type-meta'
import styles from './vbi-chart-toolbar.style'

export type VBIChartToolbarTheme = 'light' | 'dark'

const DEFAULT_LIMIT = 1000

const normalizeLimit = (limit: number): number => {
  return Math.max(1, Math.round(Number.isFinite(limit) ? limit : DEFAULT_LIMIT))
}

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable || target.closest('[contenteditable="true"]')) {
    return true
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

const iconSvg = (icon: 'undo' | 'redo' | 'sun' | 'moon' | 'info') => {
  switch (icon) {
    case 'undo':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H4v5"/><path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.68"/></svg>`
    case 'redo':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 7h5v5"/><path d="M20 12a8 8 0 1 1-2.34-5.66L20 8.68"/></svg>`
    case 'sun':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>`
    case 'moon':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.4A7.6 7.6 0 0 1 9.6 4a8 8 0 1 0 10.4 10.4z"/></svg>`
    case 'info':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7h.01"/></svg>`
    default: {
      const _: never = icon
      throw new Error(`Unknown icon: ${_}`)
    }
  }
}

/**
 * Core toolbar for the VBI chart editor.
 *
 * @tag vbi-chart-toolbar
 *
 * @prop {VBIChartBuilder} builder - Optional VBI chart builder used as the source of truth.
 * @prop {VBIChartTypeGroupMeta[]} chartTypeGroups - Chart type group catalog passed to the selector.
 * @prop {VBIChartTypeMeta[]} chartTypeMetas - Chart type metadata catalog passed to the selector.
 * @prop {boolean} disableShortcuts - Disable Ctrl/Cmd+Z and redo shortcuts.
 * @prop {VBIComponentText} text - Text override map keyed by i18n keys.
 */
@customElement('vbi-chart-toolbar')
export class VBIChartToolbar extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor builder: VBIChartBuilder | undefined
  @property({ type: Array, attribute: false }) accessor chartTypeGroups: VBIChartTypeGroupMeta[] = VBI_CHART_TYPE_GROUPS
  @property({ type: Array, attribute: false }) accessor chartTypeMetas: VBIChartTypeMeta[] = VBI_CHART_TYPE_METAS
  @property({ type: Boolean, attribute: 'disable-shortcuts' }) accessor disableShortcuts = false
  @property({ attribute: false }) accessor text: VBIComponentText = {}

  private _boundBuilder: VBIChartBuilder | undefined

  override connectedCallback(): void {
    super.connectedCallback()
    window.removeEventListener('keydown', this._handleKeydown)
    window.addEventListener('keydown', this._handleKeydown)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._unbindBuilder()
    window.removeEventListener('keydown', this._handleKeydown)
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('builder')) {
      this._bindBuilder()
    }
  }

  private get _currentLimit(): number {
    return this.builder ? normalizeLimit(this.builder.limit.getLimit() ?? DEFAULT_LIMIT) : DEFAULT_LIMIT
  }

  private get _currentTheme(): VBIChartToolbarTheme {
    return this.builder?.theme.getTheme() === 'dark' ? 'dark' : 'light'
  }

  private get _currentCanUndo(): boolean {
    return this.builder ? this.builder.undoManager.canUndo() : false
  }

  private get _currentCanRedo(): boolean {
    return this.builder ? this.builder.undoManager.canRedo() : false
  }

  private _bindBuilder(): void {
    if (this._boundBuilder === this.builder) {
      return
    }

    this._unbindBuilder()
    this._boundBuilder = this.builder

    if (!this._boundBuilder) {
      return
    }

    this.requestUpdate()
    this._boundBuilder.doc.on('update', this._handleBuilderUpdate)
  }

  private _unbindBuilder(): void {
    if (!this._boundBuilder) {
      return
    }

    this._boundBuilder.doc.off('update', this._handleBuilderUpdate)
    this._boundBuilder = undefined
  }

  private _handleBuilderUpdate = (): void => {
    this.requestUpdate()
  }

  private _handleLimitChange = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement
    const nextLimit = normalizeLimit(Number(input.value))
    input.value = String(nextLimit)

    // Defensive: input is disabled without a builder, but guard against programmatic changes
    if (!this.builder) {
      input.value = String(this._currentLimit)
      return
    }

    this.builder.limit.setLimit(nextLimit)
    // Eager update: don't wait for the builder 'update' event to reflect the new value
    this.requestUpdate()
  }

  private _setTheme(nextTheme: VBIChartToolbarTheme): void {
    if (!this.builder) {
      return
    }

    this.builder.theme.setTheme(nextTheme)
    // Eager update: don't wait for the builder 'update' event to reflect the new theme
    this.requestUpdate()
  }

  private _handleThemeClick = (event: Event): void => {
    const theme = (event.currentTarget as HTMLElement).dataset.themeOption as VBIChartToolbarTheme
    if (theme) {
      this._setTheme(theme)
    }
  }

  private _undo = (): void => {
    if (!this.builder?.undoManager.canUndo()) {
      return
    }

    this.builder.undoManager.undo()
    // Eager update: don't wait for the builder 'update' event to reflect undo state
    this.requestUpdate()
  }

  private _redo = (): void => {
    if (!this.builder?.undoManager.canRedo()) {
      return
    }

    this.builder.undoManager.redo()
    // Eager update: don't wait for the builder 'update' event to reflect redo state
    this.requestUpdate()
  }

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (this.disableShortcuts || isEditableTarget(event.target) || event.altKey) {
      return
    }

    const withCommand = event.ctrlKey || event.metaKey
    if (!withCommand) {
      return
    }

    const key = event.key.toLowerCase()
    const wantsUndo = key === 'z' && !event.shiftKey
    const wantsRedo = key === 'y' || (key === 'z' && event.shiftKey)

    if (wantsUndo && this._currentCanUndo) {
      event.preventDefault()
      this._undo()
    } else if (wantsRedo && this._currentCanRedo) {
      event.preventDefault()
      this._redo()
    }
  }

  private _renderIcon(icon: 'undo' | 'redo' | 'sun' | 'moon' | 'info') {
    return html`<span class="toolbar-icon">${iconSvg(icon)}</span>`
  }

  private _renderHistoryButton(action: 'undo' | 'redo') {
    const isUndo = action === 'undo'
    const label = translate(isUndo ? 'toolbarHistoryUndo' : 'toolbarHistoryRedo', this.text)
    const shortcut = isUndo ? 'Ctrl/Cmd+Z' : 'Ctrl+Y / Cmd+Shift+Z'
    const disabled = isUndo ? !this._currentCanUndo : !this._currentCanRedo

    return html`
      <button
        class="icon-button"
        type="button"
        title=${`${label} (${shortcut})`}
        aria-label=${label}
        data-action=${action}
        ?disabled=${disabled}
        @click=${isUndo ? this._undo : this._redo}
      >
        ${this._renderIcon(action)}
      </button>
    `
  }

  private _renderThemeButton(theme: VBIChartToolbarTheme, icon: 'sun' | 'moon') {
    const selected = this._currentTheme === theme
    const label = translate(theme === 'light' ? 'toolbarThemeLight' : 'toolbarThemeDark', this.text)

    return html`
      <button
        class=${classMap({ 'theme-option': true, 'theme-option--selected': selected })}
        type="button"
        title=${label}
        aria-label=${label}
        aria-pressed=${selected ? 'true' : 'false'}
        data-theme-option=${theme}
        ?disabled=${!this.builder}
        @click=${this._handleThemeClick}
      >
        ${this._renderIcon(icon)}
        <span class="sr-only">${label}</span>
      </button>
    `
  }

  override render() {
    const themeDescription = `${translate('toolbarThemeLabel', this.text)}: ${translate(
      'toolbarThemeDescription',
      this.text,
    )}`
    const limitLabel = translate('toolbarLimitLabel', this.text)
    const limitTooltip = translate('toolbarLimitTooltip', this.text)
    const rootClasses = classMap({
      toolbar: true,
      'toolbar--dark': this._currentTheme === 'dark',
    })

    return html`
      <div class=${rootClasses}>
        <div class="toolbar__inner">
          <div class="toolbar__group toolbar__group--primary">
            <vbi-chart-type
              compact
              .builder=${this.builder}
              .chartTypeGroups=${this.chartTypeGroups}
              .chartTypeMetas=${this.chartTypeMetas}
              .text=${this.text}
            ></vbi-chart-type>

            <span class="divider" aria-hidden="true"></span>

            <div class="button-group" role="group" aria-label=${translate('toolbarHistoryLabel', this.text)}>
              ${this._renderHistoryButton('undo')} ${this._renderHistoryButton('redo')}
            </div>
          </div>

          <div class="toolbar__group toolbar__group--secondary">
            <label class="limit-control" title=${limitTooltip}>
              <span class="sr-only">${limitLabel}</span>
              <input
                class="limit-input"
                type="number"
                min="1"
                step="50"
                inputmode="numeric"
                aria-label=${limitLabel}
                .value=${String(this._currentLimit)}
                ?disabled=${!this.builder}
                @change=${this._handleLimitChange}
              />
              <span class="limit-info" aria-hidden="true">${this._renderIcon('info')}</span>
            </label>

            <span class="divider" aria-hidden="true"></span>

            <div class="theme-switch" role="group" aria-label=${themeDescription} title=${themeDescription}>
              ${this._renderThemeButton('light', 'sun')} ${this._renderThemeButton('dark', 'moon')}
            </div>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-toolbar': VBIChartToolbar
  }
}
