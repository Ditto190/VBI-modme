import { Component, Element, h, Host, Prop, Watch } from '@stencil/core'
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

  private destroyCallback?: () => void
  private chartStore?: ChartStore
  private disposeChartProvider?: () => void

  async componentWillLoad() {
    await this.handleBuilderChange(this.builder)
  }

  disconnectedCallback() {
    this.disposeChartProvider?.()
    this.destroyCallback?.()
  }

  @Watch('builder')
  async handleBuilderChange(newBuilder?: VBIChartBuilder) {
    this.destroyCallback?.()
    this.disposeChartProvider?.()

    const builder = newBuilder ?? (await createDefaultBuilder())
    builder.locale.setLocale('en-US')
    this.chartStore = createChartStore(builder)
    this.destroyCallback = this.chartStore.initialize(builder)
    this.disposeChartProvider = provideChartStore(this.el, this.chartStore)
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
