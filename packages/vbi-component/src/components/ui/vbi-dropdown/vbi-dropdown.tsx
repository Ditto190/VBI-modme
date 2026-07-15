import { autoUpdate, computePosition, flip, offset as offsetMiddleware, shift, type Placement } from '@floating-ui/dom'
import { Component, Event, h, Host, Prop, State, Watch, type EventEmitter } from '@stencil/core'

export type DropdownPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

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
  private triggerEl?: HTMLElement
  private contentEl?: PopoverElement
  private hoverCloseTimer?: ReturnType<typeof setTimeout>
  private cleanupAutoUpdate?: () => void

  /** The position of the dropdown relative to its trigger. */
  @Prop() placement?: DropdownPlacement = 'bottom'

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

  @State() private currentPlacement: Placement = 'bottom'

  @Watch('placement')
  @Watch('offset')
  onConfigChange() {
    if (this.open || this.contentEl?.matches(':popover-open')) {
      this.updatePosition()
    }
  }

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
    this.stopAutoUpdate()
    this.contentEl?.removeEventListener('toggle', this.handlePopoverToggle)
  }

  private startAutoUpdate() {
    this.stopAutoUpdate()
    if (!this.triggerEl || !this.contentEl) return

    this.updatePosition()
    this.cleanupAutoUpdate = autoUpdate(this.triggerEl, this.contentEl, () => {
      this.updatePosition()
    })
  }

  private stopAutoUpdate() {
    this.cleanupAutoUpdate?.()
    this.cleanupAutoUpdate = undefined
  }

  private handlePopoverToggle = (e: Event) => {
    const isOpen = (e as PopoverToggleEvent).newState === 'open'

    if (isOpen) {
      this.startAutoUpdate()
    } else {
      this.stopAutoUpdate()
    }

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

  private updatePosition = async () => {
    if (!this.triggerEl || !this.contentEl) return

    const { x, y, placement } = await computePosition(this.triggerEl, this.contentEl, {
      placement: this.placement || 'bottom',
      strategy: 'fixed',
      middleware: [
        offsetMiddleware(this.offset),
        flip({
          fallbackAxisSideDirection: 'end',
        }),
        shift({ padding: 8 }),
      ],
    })

    this.currentPlacement = placement

    Object.assign(this.contentEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
  }

  render() {
    return (
      <Host
        class={{ 'dropdown-disabled': this.disabled }}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div class='dropdown-trigger' ref={(el) => (this.triggerEl = el)} onClick={() => this.handleTriggerClick()}>
          <slot name='trigger'></slot>
        </div>

        <div
          ref={(el) => (this.contentEl = el as PopoverElement)}
          popover={this.popoverMode}
          class='dropdown-content'
          data-placement={this.currentPlacement}
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <slot name='content'></slot>
        </div>
      </Host>
    )
  }
}
