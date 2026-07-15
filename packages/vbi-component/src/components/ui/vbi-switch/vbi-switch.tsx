import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'vbi-switch',
  styleUrl: 'vbi-switch.css',
  shadow: true,
})
export class VbiSwitch {
  /** Whether the switch is checked. */
  @Prop({ mutable: true }) checked: boolean = false

  /** Whether the switch is disabled. */
  @Prop() disabled: boolean = false

  /** The name of the component, used for form submission. */
  @Prop() name: string = ''

  /** The color theme of the switch. */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error' | 'neutral'

  /** The size of the switch. */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Emitted when the switch checked state changes. */
  @Event() vbiSwitchChange!: EventEmitter<boolean>

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    this.checked = target.checked
    this.vbiSwitchChange.emit(this.checked)
  }

  render() {
    return (
      <Host>
        <input
          type='checkbox'
          role='switch'
          name={this.name}
          class={{
            toggle: true,
            [`toggle-${this.color}`]: this.color !== undefined,
            [`toggle-${this.size}`]: this.size !== undefined,
          }}
          checked={this.checked}
          disabled={this.disabled}
          aria-checked={this.checked ? 'true' : 'false'}
          onChange={this.handleChange}
        />
      </Host>
    )
  }
}
