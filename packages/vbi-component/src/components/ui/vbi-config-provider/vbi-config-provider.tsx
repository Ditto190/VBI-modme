import { Component, h, Host, Prop, Watch } from '@stencil/core'
import { type ThemeConfig } from './theme/theme.types'
import { getThemeCssVariables, setTheme } from './theme/theme.utils'

@Component({
  tag: 'vbi-config-provider',
  styleUrl: 'vbi-config-provider.css',
  shadow: false,
})
export class VbiConfigProvider {
  /** Theme configuration containing mode ('light' | 'dark') and design tokens */
  @Prop() theme?: ThemeConfig

  componentWillLoad() {
    this.handleThemePersistence()
  }

  @Watch('theme')
  handleThemePersistence() {
    if (this.theme?.mode) {
      setTheme(this.theme.mode)
    }
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
