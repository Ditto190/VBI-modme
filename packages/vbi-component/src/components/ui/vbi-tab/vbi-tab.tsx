import type { IconDefinition } from '@ant-design/icons-svg/lib/types'
import { Component, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core'

export interface TabItem {
  id?: string | number
  label?: string
  value?: string | number
  disabled?: boolean
  active?: boolean
  icon?: IconDefinition
  className?: string
}

@Component({
  tag: 'vbi-tab',
  styleUrl: 'vbi-tab.css',
  shadow: true,
})
export class VbiTab {
  /** Array of tab items to be rendered */
  @Prop() items: TabItem[] = []

  /** Currently active tab value or ID */
  @Prop({ mutable: true }) value?: string | number

  /** Size of the tabs */
  @Prop() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Whether all tabs are disabled */
  @Prop() disabled: boolean = false

  /** Whether the tabs occupy the full width of their parent container */
  @Prop() block: boolean = false

  /** Emitted when a tab item is clicked */
  @Event() vbiTabChange!: EventEmitter<TabItem>

  private get parsedItems(): TabItem[] {
    return Array.isArray(this.items) ? this.items : []
  }

  @Watch('items')
  watchItemsHandler(newValue: TabItem[]) {
    if (this.value === undefined) {
      this.initDefaultValue(newValue)
    }
  }

  componentWillLoad() {
    this.initDefaultValue(this.items)
  }

  private getItemValue(item: TabItem, index: number): string | number {
    return item.value ?? item.id ?? item.label ?? `tab-${index}`
  }

  private initDefaultValue(items: TabItem[]) {
    if (!Array.isArray(items) || items.length === 0) return
    if (this.value === undefined) {
      const activeIndex = items.findIndex((item) => item.active)
      if (activeIndex !== -1) {
        this.value = this.getItemValue(items[activeIndex], activeIndex)
      } else {
        const firstEnabledIndex = items.findIndex((item) => !item.disabled)
        if (firstEnabledIndex !== -1) {
          this.value = this.getItemValue(items[firstEnabledIndex], firstEnabledIndex)
        }
      }
    }
  }

  private isItemActive(item: TabItem, index: number): boolean {
    if (this.value !== undefined && this.value !== null) {
      return String(this.value) === String(this.getItemValue(item, index))
    }
    return !!item.active
  }

  private handleTabClick = (item: TabItem, index: number, e?: MouseEvent) => {
    if (this.disabled || item.disabled) return

    if (e) {
      e.preventDefault()
    }

    const itemValue = this.getItemValue(item, index)
    this.value = itemValue
    this.vbiTabChange.emit(item)
  }

  private renderTabs() {
    return this.parsedItems.map((item, index) => {
      const isActive = this.isItemActive(item, index)
      const isDisabled = !!this.disabled || !!item.disabled
      const tabKey = String(this.getItemValue(item, index))

      return (
        <button
          key={`${tabKey}-btn`}
          type='button'
          role='tab'
          data-tab-index={index}
          class={{
            tab: true,
            'tab-active': isActive,
            'tab-disabled': isDisabled,
            [item.className!]: !!item.className,
          }}
          disabled={isDisabled}
          tabIndex={isActive ? 0 : -1}
          aria-selected={isActive ? 'true' : 'false'}
          onClick={(e) => this.handleTabClick(item, index, e)}
        >
          {item.icon && <vbi-icon icon={item.icon} style={{ marginRight: item.label ? '0.375rem' : '0' }}></vbi-icon>}
          {item.label && <span>{item.label}</span>}
        </button>
      )
    })
  }

  render() {
    const containerClasses = {
      tabs: true,
      [`tabs-${this.size}`]: this.size !== undefined,
      'tabs-block': this.block,
    }

    return (
      <Host>
        <div role='tablist' class={containerClasses}>
          {this.parsedItems.length > 0 ? this.renderTabs() : <slot></slot>}
        </div>
      </Host>
    )
  }
}
