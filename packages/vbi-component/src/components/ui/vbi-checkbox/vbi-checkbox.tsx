import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core'

@Component({
  tag: 'vbi-checkbox',
  styleUrl: 'vbi-checkbox.css',
  shadow: true,
})
export class VbiCheckbox {
  /** Whether the component is checked. */
  @Prop({ mutable: true }) checked: boolean = false

  /** Whether the checkbox is in an indeterminate state. */
  @Prop() indeterminate: boolean = false

  /** Whether the component is disabled. */
  @Prop() disabled: boolean = false

  /** The name of the component, used for form submission. */
  @Prop() name: string = ''

  /** The theme color of the component. */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

  /** The size of the component. */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  @Event() vbiCheckboxChange: EventEmitter<boolean>

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    this.checked = target.checked

    if (this.indeterminate) {
      this.indeterminate = false
    }

    this.vbiCheckboxChange.emit(this.checked)
  }

  render() {
    return (
      <Host>
        <input
          type='checkbox'
          name={this.name}
          checked={this.checked}
          disabled={this.disabled}
          indeterminate={this.indeterminate}
          onChange={this.handleChange}
          aria-checked={this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false'}
          class={{
            checkbox: true,
            [`checkbox-${this.color}`]: this.color !== undefined,
            [`checkbox-${this.size}`]: this.size !== undefined,
          }}
        />
      </Host>
    )
  }
}
