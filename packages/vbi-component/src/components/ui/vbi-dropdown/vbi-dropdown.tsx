import { Component, Event, type EventEmitter, h, Host, Prop, Watch } from '@stencil/core'
import { randomShortId } from 'src/utils/random'

type PopoverElement = HTMLElement & {
  togglePopover(): void
  showPopover(): void
  hidePopover(): void
}

type PopoverToggleEvent = Event & { newState: 'open' | 'closed' }

@Component({
  tag: 'vbi-dropdown',
  styleUrl: 'vbi-dropdown.css',
  shadow: true,
})
export class VbiDropdown {
  private dropdownId = `dropdown-anchor-${randomShortId()}`
  private contentEl?: PopoverElement
  private hoverCloseTimer?: ReturnType<typeof setTimeout>

  /** The position of the dropdown relative to its trigger. */
  @Prop() placement?: 'top' | 'bottom' | 'left' | 'right' = 'bottom'

  /** The interaction mode of the popover ('auto' closes on outside click, 'manual' does not). */
  @Prop() popoverMode: 'auto' | 'manual' = 'auto'

  /** How the dropdown is triggered. */
  @Prop() trigger: 'click' | 'hover' = 'click'

  /** The distance between the dropdown and its trigger (in pixels). */
  @Prop() offset: number = 8

  /** When true, the dropdown cannot be opened. */
  @Prop() disabled: boolean = false

  /** Controls the open state of the dropdown. */
  @Prop({ mutable: true }) open: boolean = false

  /** Emitted when the dropdown opens or closes. */
  @Event() vbiDropdownToggle!: EventEmitter<boolean>

  @Watch('open')
  onOpenChange(isOpen: boolean) {
    if (!this.contentEl) return

    const currentlyOpen = this.contentEl.matches(':popover-open')
    if (isOpen === currentlyOpen) return

    if (isOpen && !this.disabled) {
      this.contentEl.showPopover()
    } else {
      this.contentEl.hidePopover()
    }
  }

  componentDidLoad() {
    if (this.open && !this.disabled && this.contentEl) {
      this.contentEl.showPopover()
    }

    this.contentEl?.addEventListener('toggle', this.handlePopoverToggle)
  }

  disconnectedCallback() {
    clearTimeout(this.hoverCloseTimer)
    this.hoverCloseTimer = undefined
    this.contentEl?.removeEventListener('toggle', this.handlePopoverToggle)
  }

  private handlePopoverToggle = (e: Event) => {
    const isOpen = (e as PopoverToggleEvent).newState === 'open'
    if (this.open !== isOpen) {
      this.open = isOpen
      this.vbiDropdownToggle.emit(isOpen)
    }
  }

  private handleTriggerClick() {
    if (this.disabled || this.trigger !== 'click') return
    this.contentEl?.togglePopover()
  }

  private handleMouseEnter() {
    if (this.disabled || this.trigger !== 'hover') return
    clearTimeout(this.hoverCloseTimer)
    if (!this.contentEl?.matches(':popover-open')) {
      this.contentEl?.showPopover()
    }
  }

  private handleMouseLeave() {
    if (this.trigger !== 'hover') return
    this.hoverCloseTimer = setTimeout(() => {
      if (this.contentEl?.matches(':popover-open')) {
        this.contentEl.hidePopover()
      }
    }, 150)
  }

  render() {
    const hostStyle = {
      '--dropdown-anchor-id': `--${this.dropdownId}`,
      '--vbi-dropdown-offset': `${this.offset}px`,
    }

    return (
      <Host
        class={{
          [`placement-${this.placement}`]: true,
          'dropdown-disabled': this.disabled,
        }}
        style={hostStyle}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div class='dropdown-trigger' onClick={() => this.handleTriggerClick()}>
          <slot name='trigger'></slot>
        </div>

        <div ref={(el) => (this.contentEl = el as PopoverElement)} popover={this.popoverMode} class='dropdown-content'>
          <slot name='content'></slot>
        </div>
      </Host>
    )
  }
}
