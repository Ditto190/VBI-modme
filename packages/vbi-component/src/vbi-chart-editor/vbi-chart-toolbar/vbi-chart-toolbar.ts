import '@awesome.me/webawesome/dist/components/button-group/button-group.js'
import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/number-input/number-input.js'
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { translateVBIComponentText as translate } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import '../vbi-chart-type'
import styles from './vbi-chart-toolbar.style'

const toolbarIconName = {
  undo: 'rotate-left',
  redo: 'rotate-right',
  info: 'circle-info',
} as const

type ToolbarIcon = keyof typeof toolbarIconName

/**
 * Core toolbar for the VBI chart editor.
 *
 * @tag vbi-chart-toolbar
 *
 * @prop {boolean} canUndo - Whether undo is available. Defaults to `false`.
 * @prop {boolean} canRedo - Whether redo is available. Defaults to `false`.
 * @prop {number} limit - Current query row limit. Defaults to `1000`.
 *
 * @fires vbi-chart-limit-change - Dispatched when the row limit changes. `detail: { value: number }`.
 * @fires vbi-chart-undo - Dispatched when undo is requested.
 * @fires vbi-chart-redo - Dispatched when redo is requested.
 */
@customElement('vbi-chart-toolbar')
export class VBIChartToolbar extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ type: Number }) accessor limit: number = 1000
  @property({ type: Boolean, attribute: 'can-undo' }) accessor canUndo: boolean = false
  @property({ type: Boolean, attribute: 'can-redo' }) accessor canRedo: boolean = false

  private _handleLimitChange = (event: Event): void => {
    const input = event.currentTarget as HTMLElement & { value: string | null }
    const nextLimit = Number(input.value)

    if (nextLimit === this.limit) return

    this.limit = nextLimit
    this.dispatchEvent(
      new CustomEvent('vbi-chart-limit-change', {
        detail: { value: nextLimit },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _undo = (): void => {
    this.dispatchEvent(
      new CustomEvent('vbi-chart-undo', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _redo = (): void => {
    this.dispatchEvent(
      new CustomEvent('vbi-chart-redo', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _renderIcon(icon: ToolbarIcon) {
    return html`<wa-icon name=${toolbarIconName[icon]}></wa-icon>`
  }

  private _getHistoryButtonMeta(action: 'undo' | 'redo') {
    const isUndo = action === 'undo'
    const label = translate(isUndo ? 'toolbarHistoryUndo' : 'toolbarHistoryRedo')
    const shortcut = isUndo ? 'Ctrl/Cmd+Z' : 'Ctrl+Y / Cmd+Shift+Z'
    const disabled = isUndo ? !this.canUndo : !this.canRedo
    const id = `history-${action}-button`
    const tooltip = `${label} (${shortcut})`

    return { disabled, id, isUndo, label, tooltip }
  }

  private _renderHistoryButton(action: 'undo' | 'redo') {
    const { disabled, id, isUndo, label, tooltip } = this._getHistoryButtonMeta(action)

    return html`
      <wa-button
        id=${id}
        class="history-button"
        title=${tooltip}
        aria-label=${label}
        appearance="outlined"
        size="xs"
        type="button"
        variant="neutral"
        ?disabled=${disabled}
        @click=${isUndo ? this._undo : this._redo}
      >
        ${this._renderIcon(action)}
      </wa-button>
    `
  }

  private _renderHistoryTooltip(action: 'undo' | 'redo') {
    const { id, tooltip } = this._getHistoryButtonMeta(action)

    return html`
      <wa-tooltip for=${id}>
        <p class="toolbar-tooltip-text">${tooltip}</p>
      </wa-tooltip>
    `
  }

  private _renderLimitTooltip() {
    return html`
      <wa-tooltip for="limit-info-icon">
        <p class="toolbar-tooltip-text">${translate('toolbarLimitTooltip')}</p>
      </wa-tooltip>
    `
  }

  override render() {
    return html`
      <div class="toolbar">
        <div class="toolbar__left">
          <slot name="chart-type">
            <vbi-chart-type style="width: 100px"></vbi-chart-type>
          </slot>

          <wa-button-group class="history-group" label=${translate('toolbarHistoryLabel')}>
            ${this._renderHistoryButton('undo')} ${this._renderHistoryButton('redo')}
          </wa-button-group>
        </div>

        <div class="toolbar__right">
          <wa-number-input
            min="1"
            size="xs"
            without-steppers
            .value=${String(this.limit)}
            @change=${this._handleLimitChange}
            style="width: 100px;"
          >
            <wa-icon id="limit-info-icon" slot="end" name=${toolbarIconName.info} aria-hidden="true"></wa-icon>
          </wa-number-input>
        </div>
      </div>

      ${this._renderHistoryTooltip('undo')} ${this._renderHistoryTooltip('redo')} ${this._renderLimitTooltip()}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-toolbar': VBIChartToolbar
  }
}
