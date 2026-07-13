import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset as offsetMiddleware,
  shift,
  type Placement,
} from '@floating-ui/dom'
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core'

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

@Component({
  tag: 'vbi-tooltip',
  styleUrl: 'vbi-tooltip.css',
  shadow: true,
})
export class VbiTooltip {
  @Element() el!: HTMLElement

  /** The text to display inside the tooltip */
  @Prop() text: string = ''

  /** The position of the tooltip relative to its target */
  @Prop() position: TooltipPosition = 'top'

  /** The semantic color theme of the tooltip */
  @Prop() color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

  /** Whether the tooltip is currently open/visible */
  @Prop({ mutable: true }) open: boolean = false

  /** The distance between the tooltip and its trigger (in pixels) */
  @Prop() offset: number = 8

  /** How the tooltip is triggered ('hover', 'click', or 'manual') */
  @Prop() trigger: 'hover' | 'click' | 'manual' = 'hover'

  /** Delay in milliseconds before showing the tooltip on hover */
  @Prop() enterDelay: number = 0

  /** Delay in milliseconds before hiding the tooltip on leave */
  @Prop() leaveDelay: number = 0

  @State() private isHovered: boolean = false
  @State() private isFocused: boolean = false
  @State() private currentPlacement: Placement = 'top'

  private triggerEl?: HTMLElement
  private floatingEl?: HTMLElement
  private arrowEl?: HTMLElement
  private cleanup?: () => void
  private enterTimer?: ReturnType<typeof setTimeout>
  private leaveTimer?: ReturnType<typeof setTimeout>

  private get isVisible(): boolean {
    return this.open || this.isHovered || this.isFocused
  }

  @Watch('position')
  @Watch('offset')
  onConfigChange() {
    if (this.isVisible) {
      this.updatePosition()
    }
  }

  @Watch('open')
  onOpenChange() {
    this.handleVisibilityChange()
  }

  componentDidLoad() {
    this.currentPlacement = this.position
    if (this.isVisible) {
      this.startPositionTracking()
    }
  }

  disconnectedCallback() {
    this.stopPositionTracking()
    if (this.enterTimer) clearTimeout(this.enterTimer)
    if (this.leaveTimer) clearTimeout(this.leaveTimer)
    document.removeEventListener('click', this.handleDocumentClick)
  }

  private startPositionTracking() {
    this.stopPositionTracking()
    if (!this.triggerEl || !this.floatingEl) return

    this.updatePosition()
    this.cleanup = autoUpdate(this.triggerEl, this.floatingEl, () => {
      this.updatePosition()
    })
  }

  private stopPositionTracking() {
    if (this.cleanup) {
      this.cleanup()
      this.cleanup = undefined
    }
  }

  private handleVisibilityChange() {
    if (this.isVisible) {
      this.startPositionTracking()
      if (this.trigger === 'click') {
        document.addEventListener('click', this.handleDocumentClick)
      }
    } else {
      this.stopPositionTracking()
      document.removeEventListener('click', this.handleDocumentClick)
    }
  }

  private setHovered(value: boolean) {
    if (this.isHovered === value) return
    this.isHovered = value
    this.handleVisibilityChange()
  }

  private setFocused(value: boolean) {
    if (this.isFocused === value) return
    this.isFocused = value
    this.handleVisibilityChange()
  }

  private handleMouseEnter = () => {
    if (this.trigger !== 'hover') return
    if (this.leaveTimer) clearTimeout(this.leaveTimer)
    if (this.enterDelay > 0) {
      this.enterTimer = setTimeout(() => this.setHovered(true), this.enterDelay)
    } else {
      this.setHovered(true)
    }
  }

  private handleMouseLeave = () => {
    if (this.trigger !== 'hover') return
    if (this.enterTimer) clearTimeout(this.enterTimer)
    if (this.leaveDelay > 0) {
      this.leaveTimer = setTimeout(() => this.setHovered(false), this.leaveDelay)
    } else {
      this.setHovered(false)
    }
  }

  private handleFocusIn = () => {
    if (this.trigger !== 'hover') return
    this.setFocused(true)
  }

  private handleFocusOut = () => {
    if (this.trigger !== 'hover') return
    this.setFocused(false)
  }

  private handleTriggerClick = (e: MouseEvent) => {
    if (this.trigger === 'click') {
      e.stopPropagation()
      this.open = !this.open
    }
  }

  private handleDocumentClick = (e: MouseEvent) => {
    if (this.trigger === 'click' && this.open) {
      if (!e.composedPath().includes(this.el)) {
        this.open = false
      }
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isVisible) {
      this.setHovered(false)
      this.setFocused(false)
      this.open = false
    }
  }

  private updatePosition = async () => {
    if (!this.triggerEl || !this.floatingEl) return

    const { x, y, placement, middlewareData } = await computePosition(this.triggerEl, this.floatingEl, {
      placement: this.position,
      strategy: 'absolute',
      middleware: [
        offsetMiddleware(this.offset),
        flip({
          fallbackAxisSideDirection: 'end',
        }),
        shift({ padding: 8 }),
        this.arrowEl ? arrow({ element: this.arrowEl, padding: 4 }) : undefined,
      ].filter(Boolean),
    })

    this.currentPlacement = placement

    Object.assign(this.floatingEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    if (middlewareData.arrow && this.arrowEl) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow
      const side = placement.split('-')[0]
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[side]!

      Object.assign(this.arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      })
    }
  }

  render() {
    return (
      <Host
        class={{
          [`tooltip-${this.position.split('-')[0]}`]: true,
          [`tooltip-${this.color}`]: !!this.color,
          'tooltip-open': this.isVisible,
        }}
        onKeyDown={this.handleKeyDown}
      >
        <div
          class='tooltip-trigger'
          ref={(el) => (this.triggerEl = el)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocusin={this.handleFocusIn}
          onFocusout={this.handleFocusOut}
          onClick={this.handleTriggerClick}
        >
          <slot></slot>
        </div>

        <div
          ref={(el) => (this.floatingEl = el)}
          class={{
            'tooltip-popup': true,
            'tooltip-visible': this.isVisible,
          }}
          role='tooltip'
          data-placement={this.currentPlacement || this.position}
        >
          <div class='tooltip-content'>
            {this.text}
            <slot name='content'></slot>
          </div>
          <div class='tooltip-arrow' ref={(el) => (this.arrowEl = el)}></div>
        </div>
      </Host>
    )
  }
}
