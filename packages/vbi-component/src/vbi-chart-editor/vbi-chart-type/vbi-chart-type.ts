import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/popover/popover.js'
import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { translateVBIComponentText as translate } from 'src/localization'
import { customElement, VdashElement } from 'src/shared/element'
import { VBI_CHART_TYPE_GROUP, type VBIChartTypeGroup, type VBIChartTypeItem } from './config'
import styles from './vbi-chart-type.style'

/**
 * Chart type selector for the VBI chart editor.
 *
 * @tag vbi-chart-type
 *
 * @prop {VBIChartTypeGroup[]} data - Chart type groups from config.
 * Defaults to the built-in `VBI_CHART_TYPE_GROUP` catalog.
 * @prop {string} title - Panel title.
 * @prop {VBIChartType} value - Current chart type value. Use with `vbi-chart-type-change` for two-way binding.
 * @cssprop --vbi-chart-type-panel-width - Popover panel width. Defaults to `45rem`.
 *
 * @fires vbi-chart-type-change - Dispatched when a chart type is applied. `detail: { value: VBIChartType }`.
 */
@customElement('vbi-chart-type')
export class VBIChartType extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ type: Array, attribute: false }) accessor data: VBIChartTypeGroup[] = VBI_CHART_TYPE_GROUP
  @property({ type: String }) accessor title: string = translate('toolbarChartTypePanelTitle')
  @property({ attribute: false }) accessor value: VBIChartTypeItem | undefined

  private _selectChartType(value: VBIChartTypeItem): void {
    this.value = value
    this.dispatchEvent(
      new CustomEvent('vbi-chart-type-change', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _renderItem(meta: VBIChartTypeItem, currentChartType?: string) {
    const selected = currentChartType === meta.type

    return html`
      <wa-button
        class="truncate-label"
        appearance=${selected ? 'filled-outlined' : 'outlined'}
        variant=${selected ? 'brand' : 'neutral'}
        size="xs"
        type="button"
        aria-pressed=${selected ? 'true' : 'false'}
        data-popover="close"
        @click=${() => this._selectChartType(meta)}
      >
        <wa-icon name=${meta.icon} aria-hidden="true"></wa-icon>
        <span>${meta.label}</span>
      </wa-button>
    `
  }

  private _renderPanel() {
    const groups = this.data
    const currentChartType = this.value?.type

    return html`
      <div role="group">
        <h3 class="chart-type-header">${this.title}</h3>

        <div class="chart-type-scroll">
          ${groups.length > 0
            ? html`
                ${repeat(
                  groups,
                  (group) => group.key,
                  (group) => html`
                    <section class="chart-type-group">
                      <h4 class="chart-type-heading">${group.label}</h4>
                      <div class="chart-type-grid">
                        ${repeat(
                          group.items,
                          (item) => item.type,
                          (item) => this._renderItem(item, currentChartType),
                        )}
                      </div>
                    </section>
                  `,
                )}
              `
            : html`<p class="chart-type-empty">${translate('toolbarChartTypeEmpty')}</p>`}
        </div>
      </div>
    `
  }

  override render() {
    return html`
      <wa-button id="chart-type-trigger" class="chart-type-trigger truncate-label" appearance="outlined" size="xs" pill>
        ${this.value ? html`<wa-icon slot="start" name=${this.value.icon} aria-hidden="true"></wa-icon>` : null}
        ${this.value?.label ?? this.title}
      </wa-button>
      <wa-popover class="chart-type-popover" for="chart-type-trigger">${this._renderPanel()}</wa-popover>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-type': VBIChartType
  }
}
