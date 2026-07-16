import { Component, Element, Event, h, Host, Prop, Watch, type EventEmitter } from '@stencil/core'
import { type VBIChartBuilder } from '@visactor/vbi'
import { createChartStore, type ChartStore } from 'src/store/chart'
import { provideChartStore } from 'src/store/context/chart-context'
import { createDefaultBuilder } from 'src/utils/data/localConnector'
import { getThemeCssVariables, type ThemeConfig } from './theme'

@Component({
  tag: 'vbi-config-provider',
  styleUrl: 'vbi-config-provider.css',
  shadow: false,
})
export class VbiConfigProvider {
  @Element() el!: HTMLElement

  /** Theme configuration containing mode ('light' | 'dark') and design tokens */
  @Prop() theme?: ThemeConfig

  /** VBI chart builder instance to initialize the store with */
  @Prop() builder?: VBIChartBuilder

  /** Emitted when the builder is changed internally */
  @Event() vbiBuilderChange!: EventEmitter<VBIChartBuilder>

  private destroyCallback?: () => void
  private chartStore?: ChartStore
  private disposeChartProvider?: () => void
  private unsubscribeBuilderChange?: () => void

  async componentWillLoad() {
    await this.handleBuilderChange(this.builder)
  }

  disconnectedCallback() {
    this.unsubscribeBuilderChange?.()
    this.disposeChartProvider?.()
    this.destroyCallback?.()
  }

  @Watch('builder')
  async handleBuilderChange(newBuilder?: VBIChartBuilder) {
    if (this.chartStore && newBuilder === this.chartStore.chartBuilder.builder) {
      return
    }

    this.destroyCallback?.()
    this.disposeChartProvider?.()
    this.unsubscribeBuilderChange?.()

    const builder = newBuilder ?? (await createDefaultBuilder())
    this.chartStore = createChartStore(builder)
    this.destroyCallback = this.chartStore.initialize(builder)
    this.disposeChartProvider = provideChartStore(this.el, this.chartStore)

    this.unsubscribeBuilderChange = this.chartStore.chartBuilder.onChange('builderChangeTrigger', () => {
      if (this.chartStore) {
        this.vbiBuilderChange.emit(this.chartStore.chartBuilder.builder)
      }
    })
  }

  render() {
    const vbiTheme = this.chartStore?.chartConfig.state.theme
    const themeVariables = getThemeCssVariables(this.theme, vbiTheme)
    return (
      <Host style={themeVariables}>
        <slot></slot>
      </Host>
    )
  }
}
