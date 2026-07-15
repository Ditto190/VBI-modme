import { Component, Prop, h, Event, type EventEmitter } from '@stencil/core'

export interface SelectOption {
  label?: string
  value?: string | number
  disabled?: boolean
  selected?: boolean
}

@Component({
  tag: 'vbi-select',
  styleUrl: 'vbi-select.css',
  shadow: true,
})
export class VbiSelect {
  /** Current value of the select */
  @Prop({ mutable: true }) value?: string | number

  /** List of select options */
  @Prop() options?: SelectOption[]

  /** Placeholder text when no option is selected */
  @Prop() placeholder?: string

  /** Whether the select is disabled */
  @Prop() disabled: boolean = false

  /** Color variant of the select */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'ghost'

  /** Size of the select */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Emitted when the user changes the selected option */
  @Event() vbiSelectChange!: EventEmitter<string>

  private get parsedOptions(): SelectOption[] {
    return Array.isArray(this.options) ? this.options : []
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    this.value = target.value
    this.vbiSelectChange.emit(target.value)
  }

  private renderOption = (opt: SelectOption) => {
    const isSelected = this.value !== undefined ? String(this.value) === String(opt.value) : !!opt.selected

    return (
      <option value={opt.value} disabled={opt.disabled} selected={isSelected} key={opt.value ?? opt.label}>
        {opt.label}
      </option>
    )
  }

  render() {
    const opts = this.parsedOptions

    return (
      <select
        class={{
          select: true,
          [`select-${this.color}`]: !!this.color,
          [`select-${this.size}`]: !!this.size,
          'select-md': !this.size,
        }}
        disabled={this.disabled}
        aria-disabled={this.disabled ? 'true' : null}
        onChange={this.handleChange}
      >
        {this.placeholder && (
          <option disabled selected={this.value === undefined || this.value === ''} value=''>
            {this.placeholder}
          </option>
        )}
        {opts.length > 0 ? opts.map((opt) => this.renderOption(opt)) : <slot></slot>}
      </select>
    )
  }
}
