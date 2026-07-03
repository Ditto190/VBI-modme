import type { IconDefinition } from '@ant-design/icons-svg/lib/types'
import { Component, Event, h, Host, Prop, Watch, type EventEmitter } from '@stencil/core'
import { randomShortId } from 'src/utils/random'

export interface MenuItem {
  id?: string | number
  label?: string
  value?: string
  description?: string
  url?: string
  isTitle?: boolean
  disabled?: boolean
  isActive?: boolean
  badge?: string
  icon?: IconDefinition
  children?: MenuItem[]
}

@Component({
  tag: 'vbi-menu',
  styleUrl: 'vbi-menu.css',
  shadow: true,
})
export class VbiMenu {
  /** The size of the menu. Defaults to 'md' */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'

  /** The orientation variant of the menu. Defaults to 'vertical' */
  @Prop() variant: 'horizontal' | 'vertical' = 'vertical'

  /** Array of menu items to be rendered */
  @Prop({ mutable: true }) items: MenuItem[] = []

  /** Fired when a menu item is clicked */
  @Event() vbiMenuSelect!: EventEmitter<MenuItem>

  @Watch('items')
  watchItemsHandler(newValue: MenuItem[]) {
    this.ensureIds(newValue)
  }

  componentWillLoad() {
    this.ensureIds(this.items)
  }

  private ensureIds(items: MenuItem[]) {
    if (!items) return
    for (const item of items) {
      if (item.id === undefined) {
        item.id = `vbi-menu-item-${randomShortId()}`
      }
      if (item.children) {
        this.ensureIds(item.children)
      }
    }
  }

  private setActiveState(menuItems: MenuItem[], clickedItem: MenuItem) {
    if (!menuItems) return
    for (const item of menuItems) {
      item.isActive = item.id === clickedItem.id
      if (item.children) {
        this.setActiveState(item.children, clickedItem)
      }
    }
  }

  private handleItemClick = (item: MenuItem, e?: MouseEvent) => {
    if (item.disabled || item.isTitle) return

    if (e && item.url) {
      e.preventDefault()
    }

    if (item.value !== undefined) {
      this.setActiveState(this.items, item)
    }
    this.items = [...this.items]

    this.vbiMenuSelect.emit(item)
  }

  private renderItemContent(item: MenuItem) {
    return [
      item.icon && <vbi-icon icon={item.icon}></vbi-icon>,
      item.label,
      item.badge && <span class='badge'>{item.badge}</span>,
    ]
  }

  private renderMenuItems(menuItems: MenuItem[]) {
    if (!menuItems || menuItems.length === 0) return null

    return menuItems.map((item, index) => {
      const itemKey = item.label ?? `menu-item-${index}`

      if (item.isTitle) {
        return (
          <li key={itemKey} class='menu-title'>
            {item.label}
          </li>
        )
      }

      const liClasses = {
        'menu-disabled': !!item.disabled,
      }

      const anchorClasses = {
        'menu-active': !!item.isActive,
      }

      if (item.children && item.children.length > 0) {
        return (
          <li key={itemKey} class={liClasses}>
            <details>
              <summary class={anchorClasses} onClick={(e) => this.handleItemClick(item, e)}>
                {this.renderItemContent(item)}
              </summary>
              <ul>{this.renderMenuItems(item.children)}</ul>
            </details>
          </li>
        )
      }

      return (
        <li key={itemKey} class={liClasses}>
          {item.url ? (
            <a href={item.url} class={anchorClasses} onClick={(e) => this.handleItemClick(item, e)}>
              {this.renderItemContent(item)}
            </a>
          ) : (
            <span class={anchorClasses} onClick={(e) => this.handleItemClick(item, e)}>
              {this.renderItemContent(item)}
            </span>
          )}
        </li>
      )
    })
  }

  render() {
    return (
      <Host>
        <ul
          class={{
            menu: true,
            [`menu-${this.size}`]: !!this.size,
            [`menu-${this.variant}`]: !!this.variant,
          }}
        >
          {this.items && this.items.length > 0 ? this.renderMenuItems(this.items) : <slot></slot>}
        </ul>
      </Host>
    )
  }
}
