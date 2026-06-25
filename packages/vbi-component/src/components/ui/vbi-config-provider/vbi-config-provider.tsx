import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core'
import type { VBIChartBuilder } from '@visactor/vbi'
import { createVBIStore, provideVBIStore, type VBIStoreApi } from 'src/store/vbi-store'
import { getThemeCssVariables, setTheme, type ThemeConfig } from './theme'

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

  private store: VBIStoreApi = createVBIStore()
  private destroyCallback?: () => void
  private disposeProvider?: () => void

  connectedCallback() {
    this.disposeProvider = provideVBIStore(this.el, this.store)
  }

  componentWillLoad() {
    this.handleThemePersistence()
    this.handleBuilderChange(this.builder)
  }

  disconnectedCallback() {
    this.disposeProvider?.()
    if (this.destroyCallback) {
      this.destroyCallback()
    }
  }

  @Watch('theme')
  handleThemePersistence() {
    if (this.theme?.mode) {
      setTheme(this.theme.mode)
    }
  }

  @Watch('builder')
  handleBuilderChange(newBuilder?: VBIChartBuilder) {
    if (this.destroyCallback) {
      this.destroyCallback()
    }

    if (newBuilder) {
      this.destroyCallback = this.store.initialize(newBuilder)
    }
  }

  /** Returns the VBI store instance for child components */
  @Method()
  async getStore(): Promise<VBIStoreApi> {
    return this.store
  }

  render() {
    const themeVariables = getThemeCssVariables(this.theme)

    return (
      <Host style={themeVariables}>
        <slot></slot>
      </Host>
    )
  }
}
