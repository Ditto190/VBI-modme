import { Component, Element, h, Host, Prop, Watch, State } from '@stencil/core'
import { type VBIChartBuilder } from '@visactor/vbi'
import { createVBIStore, provideVBIStore, type VBIStoreApi } from 'src/store/vbi-store'
import { getThemeCssVariables, type ThemeConfig } from './theme'
import { createVBIBuilder } from 'src/utils/chart/builder'
import { type VbiTheme } from 'src/constants/builder'

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

  @State() vbiTheme?: VbiTheme

  private store: VBIStoreApi = createVBIStore()
  private destroyCallback?: () => void
  private disposeProvider?: () => void

  connectedCallback() {
    this.disposeProvider = provideVBIStore(this.el, this.store)
  }

  componentWillLoad() {
    this.handleBuilderChange(this.builder)
  }

  disconnectedCallback() {
    this.disposeProvider?.()
    if (this.destroyCallback) {
      this.destroyCallback()
    }
  }

  @Watch('builder')
  handleBuilderChange(newBuilder?: VBIChartBuilder) {
    if (this.destroyCallback) {
      this.destroyCallback()
    }

    if (newBuilder) {
      this.destroyCallback = this.store.initialize(newBuilder)

      const { theme } = createVBIBuilder(newBuilder)
      this.vbiTheme = theme
    } else {
      this.vbiTheme = undefined
    }
  }

  render() {
    const themeVariables = getThemeCssVariables(this.theme, this.vbiTheme)
    return (
      <Host style={themeVariables}>
        <slot></slot>
      </Host>
    )
  }
}
