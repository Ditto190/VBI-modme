import { Component, Prop, Event, type EventEmitter, h } from '@stencil/core'

@Component({
  tag: 'vbi-input',
  styleUrl: 'vbi-input.css',
  shadow: true,
})
export class VbiInput {
  /** Type of the input element (text, password, email, number, date...) */
  @Prop() type: string = 'text'

  /** Value of the input element */
  @Prop({ mutable: true }) value?: string | number = ''

  /** Placeholder text */
  @Prop() placeholder?: string = ''

  /** Disabled state */
  @Prop() disabled: boolean = false

  /** Name attribute for form submission */
  @Prop() name?: string

  /** Read-only state (focusable but not editable) */
  @Prop({ attribute: 'readonly' }) readOnly: boolean = false

  /** Required field for form validation */
  @Prop() required: boolean = false

  /** Maximum character length */
  @Prop() maxlength?: number

  /** Minimum character length */
  @Prop() minlength?: number

  /** Minimum value for number or date input */
  @Prop() min?: number | string

  /** Maximum value for number or date input */
  @Prop() max?: number | string

  /** Step for number input */
  @Prop() step?: number | string

  /** Autocomplete hint for the browser */
  @Prop() autocomplete?: string

  /** Auto-focus the input on mount */
  @Prop() autofocus: boolean = false

  /** Primary color (primary, secondary, info, error...) */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'

  /** Display variant (e.g., ghost - transparent) */
  @Prop() variant?: 'ghost'

  /** Size of the input */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Event emitted when the user types */
  @Event() vbiInputValue!: EventEmitter<string>

  /** Event emitted when the user finishes typing and blurs (or presses Enter) */
  @Event() vbiInputChange!: EventEmitter<string>

  /** Event emitted when the input gains focus */
  @Event() vbiInputFocus!: EventEmitter<void>

  /** Event emitted when the input loses focus (blur) */
  @Event() vbiInputBlur!: EventEmitter<void>

  // Event handlers
  private handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement
    this.value = target.value
    this.vbiInputValue.emit(this.value)
  }

  private handleChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement
    this.value = target.value
    this.vbiInputChange.emit(this.value)
  }

  render() {
    return (
      <div
        class={{
          input: true,
          [`input-${this.color}`]: !!this.color,
          [`input-${this.variant}`]: !!this.variant,
          [`input-${this.size}`]: !!this.size,
        }}
      >
        <slot name='prefix'></slot>

        <input
          type={this.type}
          name={this.name}
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readOnly}
          required={this.required}
          maxlength={this.maxlength}
          minlength={this.minlength}
          autocomplete={this.autocomplete}
          autofocus={this.autofocus}
          onInput={this.handleInput}
          onChange={this.handleChange}
          onFocus={() => this.vbiInputFocus.emit()}
          onBlur={() => this.vbiInputBlur.emit()}
        />

        <slot name='suffix'></slot>
      </div>
    )
  }
}
