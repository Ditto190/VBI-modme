'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ReactElement, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type DropdownItem = {
  danger?: boolean
  disabled?: boolean
  icon?: ReactNode
  key: string
  label: ReactNode
  onSelect: () => void
}

const getDropdownPortalRoot = () => document.querySelector<HTMLElement>('[data-vbi-portal-root]') ?? document.body

export const DropdownMenu = ({
  closeOnSelect = true,
  items,
  menuClassName,
  placement = 'bottom-end',
  renderContent,
  renderItem,
  trigger,
}: {
  closeOnSelect?: boolean
  items: DropdownItem[]
  menuClassName?: string
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'
  renderContent?: (items: DropdownItem[]) => ReactNode
  renderItem?: (item: DropdownItem) => ReactElement
  trigger: ReactNode
}) => {
  const [side, align] = placement.split('-') as ['bottom' | 'top', 'end' | 'start']

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <span className='ui-dropdown relative inline-flex'>{trigger}</span>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal container={typeof document === 'undefined' ? undefined : getDropdownPortalRoot()}>
        <DropdownMenuPrimitive.Content
          align={align}
          className={cn(
            'ui-dropdown-menu z-[95] min-w-40 origin-top-right overflow-hidden rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] shadow-lg will-change-[transform,opacity] animate-[vbi-menu-pop_var(--vbi-motion)_var(--vbi-ease-spring)]',
            menuClassName,
          )}
          side={side}
          sideOffset={8}
        >
          {renderContent
            ? renderContent(items)
            : items.map((item) =>
                renderItem ? (
                  <DropdownMenuPrimitive.Item
                    asChild
                    key={item.key}
                    onSelect={(event) => !closeOnSelect && event.preventDefault()}
                  >
                    {renderItem(item)}
                  </DropdownMenuPrimitive.Item>
                ) : (
                  <DropdownMenuPrimitive.Item
                    key={item.key}
                    className={cn(
                      'ui-dropdown-item flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-2.5 py-2 text-left text-xs text-[var(--vbi-text)] transition duration-150 ease-out hover:translate-x-0.5 hover:bg-[var(--vbi-hover-bg)] active:translate-x-px active:scale-[0.99] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
                      item.danger && 'text-[var(--vbi-danger)]',
                    )}
                    disabled={item.disabled}
                    onSelect={(event) => {
                      if (!closeOnSelect) event.preventDefault()
                      item.onSelect()
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </DropdownMenuPrimitive.Item>
                ),
              )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
