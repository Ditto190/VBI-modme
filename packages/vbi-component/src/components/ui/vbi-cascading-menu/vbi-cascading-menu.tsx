import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'
import { Component, Event, h, Host, Prop, Watch, type EventEmitter } from '@stencil/core'
import { randomShortId } from 'src/utils/random'

export interface CascadingMenuItem {
  id?: string | number
  label?: string
  value?: string
  slot?: string
  disabled?: boolean
  isActive?: boolean
  children?: CascadingMenuItem[]
}

@Component({
  tag: 'vbi-cascading-menu',
  styleUrl: 'vbi-cascading-menu.css',
  shadow: true,
})
export class VbiCascadingMenu {
  /** The size of the menu. Defaults to 'md' */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'

  /** The orientation variant of the menu. Defaults to 'vertical' */
  @Prop() variant: 'horizontal' | 'vertical' = 'vertical'

  /** Array of menu items to be rendered */
  @Prop({ mutable: true }) items: CascadingMenuItem[] = []

  /** Fired when a menu item is clicked */
  @Event() vbiCascadingMenuSelect!: EventEmitter<CascadingMenuItem>

  private cleanupMap = new Map<HTMLElement, () => void>()
  private hideTimers = new Map<HTMLElement, ReturnType<typeof setTimeout>>()

  @Watch('items')
  watchItemsHandler(newValue: CascadingMenuItem[]) {
    this.ensureIds(newValue)
  }

  componentWillLoad() {
    this.ensureIds(this.items)
  }

  disconnectedCallback() {
    this.cleanupMap.forEach((cleanup) => cleanup())
    this.cleanupMap.clear()
    this.hideTimers.forEach((timer) => clearTimeout(timer))
    this.hideTimers.clear()
  }

  private ensureIds(items: CascadingMenuItem[]) {
    if (!items) return
    for (const item of items) {
      if (item.id === undefined) {
        item.id = `vbi-cascading-menu-item-${randomShortId()}`
      }
      if (item.children) {
        this.ensureIds(item.children)
      }
    }
  }

  private setActiveState(menuItems: CascadingMenuItem[], clickedItem: CascadingMenuItem) {
    if (!menuItems) return
    for (const item of menuItems) {
      item.isActive = item.id === clickedItem.id
      if (item.children) {
        this.setActiveState(item.children, clickedItem)
      }
    }
  }

  private handleItemClick = (item: CascadingMenuItem) => {
    if (item.disabled) return

    if (item.value !== undefined) {
      this.setActiveState(this.items, item)
    }
    this.items = [...this.items]
    this.vbiCascadingMenuSelect.emit(item)
  }

  private handleMouseEnter = (e: MouseEvent) => {
    const li = e.currentTarget as HTMLLIElement
    const trigger = li.children[0] as HTMLElement
    const floating = li.children[1] as HTMLElement
    if (!trigger || !floating) return

    // Cancel pending hide
    const pendingHide = this.hideTimers.get(li)
    if (pendingHide) {
      clearTimeout(pendingHide)
      this.hideTimers.delete(li)
    }

    // Show with animation
    floating.style.display = 'flex'
    requestAnimationFrame(() => {
      floating.style.opacity = '1'
      floating.style.scale = '1'
    })

    // Position with floating-ui
    if (!this.cleanupMap.has(li)) {
      const isRootLevel = li.parentElement?.classList.contains('cascading-menu')
      const placement: Placement = this.variant === 'horizontal' && isRootLevel ? 'bottom-start' : 'right-start'

      const cleanup = autoUpdate(trigger, floating, () => {
        computePosition(trigger, floating, {
          placement,
          strategy: 'absolute',
          middleware: [
            offset({ mainAxis: 10, crossAxis: -8 }),
            flip({ fallbackPlacements: ['left-start', 'bottom-start', 'top-start'] }),
            shift({ padding: 8 }),
          ],
        }).then(({ x, y, placement: finalPlacement }) => {
          const origin = finalPlacement.startsWith('left')
            ? 'top right'
            : finalPlacement.startsWith('right')
              ? 'top left'
              : finalPlacement.startsWith('top')
                ? 'bottom center'
                : 'top center'

          Object.assign(floating.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            transformOrigin: origin,
          })
        })
      })
      this.cleanupMap.set(li, cleanup)
    }
  }

  private handleMouseLeave = (e: MouseEvent) => {
    const li = e.currentTarget as HTMLLIElement
    const floating = li.children[1] as HTMLElement
    if (!floating) return

    // Animate out
    floating.style.opacity = '0'
    floating.style.scale = '0.95'

    // Stop position tracking
    const cleanup = this.cleanupMap.get(li)
    if (cleanup) {
      cleanup()
      this.cleanupMap.delete(li)
    }

    // Hide after transition ends
    this.hideTimers.set(
      li,
      setTimeout(() => {
        floating.style.display = 'none'
        this.hideTimers.delete(li)
      }, 200),
    )
  }

  private renderMenuItems(menuItems: CascadingMenuItem[]) {
    if (!menuItems?.length) return null

    return menuItems.map((item, index) => {
      const itemKey = item.label ?? `menu-item-${index}`
      const hasChildren = !!item.children?.length
      const activeClass = item.isActive ? 'cascading-menu-active' : ''

      const liClasses = {
        'cascading-menu-item': true,
        'cascading-menu-disabled': !!item.disabled,
        'has-children': hasChildren,
      }

      return (
        <li
          key={itemKey}
          class={liClasses}
          onMouseEnter={hasChildren ? this.handleMouseEnter : undefined}
          onMouseLeave={hasChildren ? this.handleMouseLeave : undefined}
        >
          <span
            class={`cascading-menu-content ${hasChildren ? 'has-submenu' : ''} ${activeClass}`}
            onClick={() => this.handleItemClick(item)}
          >
            {item.slot ? <slot name={item.slot}></slot> : item.label}
          </span>
          {hasChildren && <ul class='cascading-submenu'>{this.renderMenuItems(item.children!)}</ul>}
        </li>
      )
    })
  }

  render() {
    return (
      <Host>
        <ul
          class={{
            'cascading-menu': true,
            [`cascading-menu-${this.size}`]: !!this.size,
            [`cascading-menu-${this.variant}`]: !!this.variant,
          }}
        >
          {this.items?.length ? this.renderMenuItems(this.items) : <slot></slot>}
        </ul>
      </Host>
    )
  }
}
