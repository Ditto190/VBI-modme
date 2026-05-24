import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-chart-render.style'

type VBIChartRenderCleanup = (() => void) | undefined

/**
 * Chart container for rendering VChart specifications.
 *
 * @tag vbi-chart-render
 *
 * @prop {ISpec | undefined} spec - VChart specification rendered inside the chart container.
 */
@customElement('vbi-chart-render')
export class VBIChartRender extends VdashElement {
  static override styles = styles

  @property({ attribute: false }) accessor spec: ISpec | undefined = undefined
  private readonly chartContainerRef = createRef<HTMLDivElement>()
  private cleanup: VBIChartRenderCleanup = undefined

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
    return html`<div ${ref(this.chartContainerRef)}></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-render': VBIChartRender
  }
}
