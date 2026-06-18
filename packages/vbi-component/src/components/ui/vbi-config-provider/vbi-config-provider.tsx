import { Component, h, Host, Prop } from '@stencil/core'
import { type ThemeConfig } from './theme/theme.types'
import { getThemeCssVariables } from './theme/theme.utils'

@Component({
  tag: 'vbi-config-provider',
  styleUrl: 'vbi-config-provider.css',
  shadow: false,
})
export class VbiConfigProvider {
  /** Theme configuration containing mode ('light' | 'dark') and design tokens */
  @Prop() theme?: ThemeConfig

  render() {
    const themeVariables = getThemeCssVariables(this.theme)

    return (
      <Host style={themeVariables}>
        <slot></slot>
      </Host>
    )
  }
}
