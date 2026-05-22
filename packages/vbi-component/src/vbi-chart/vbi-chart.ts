import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import { property } from 'lit/decorators.js'
import { html, type PropertyValues } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-chart.style'

type VBIChartCleanup = (() => void) | undefined

/**
 * Chart container for rendering VChart specifications.
 *
 * @tag vbi-chart
 *
 * @prop {ISpec | undefined} spec - VChart specification rendered inside the chart container.
 * @attr {string} empty - Empty state message shown when no spec is provided.
 */
@customElement('vbi-chart')
export class VBIChart extends VdashElement {
  static override styles = styles

  @property({ attribute: false }) accessor spec: ISpec | undefined = undefined
  @property({ type: String }) accessor empty = 'No data'
  private readonly chartContainerRef = createRef<HTMLDivElement>()
  private cleanup: VBIChartCleanup = undefined

  override disconnectedCallback(): void {
    this.cleanupRender()
    super.disconnectedCallback()
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('spec')) {
      return
    }
    this.renderChart()
  }

  private cleanupRender(): void {
    this.cleanup?.()
    this.cleanup = undefined
  }

  private renderChart(): void {
    this.cleanupRender()
    const container = this.chartContainerRef.value
    if (!container || !this.spec) {
      return
    }

    try {
      const vchart = new VChart(this.spec, { dom: container })
      vchart.renderSync()
      this.cleanup = () => vchart.release()
    } catch (error) {
      this.error(`VBI chart render error: ${String(error)}`)
    }
  }

  override render() {
    if (!this.spec) {
      return html`<div class="vbi-chart__empty" role="status">${this.empty}</div>`
    }

    return html`<div ${ref(this.chartContainerRef)} class="vbi-chart__container"></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart': VBIChart
  }
}
