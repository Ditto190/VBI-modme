import { useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type DropdownItem = {
  danger?: boolean
  disabled?: boolean
  icon?: ReactNode
  key: string
  label: ReactNode
  onSelect: () => void
}

export const DropdownMenu = ({
  closeOnSelect = true,
  items,
  menuClassName,
  renderContent,
  renderItem,
  trigger,
}: {
  closeOnSelect?: boolean
  items: DropdownItem[]
  menuClassName?: string
  renderContent?: (items: DropdownItem[]) => ReactNode
  renderItem?: (item: DropdownItem) => ReactElement
  trigger: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', close)
    return () => window.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className='ui-dropdown' onClick={(event) => event.stopPropagation()}>
      <span onClick={() => setOpen((value) => !value)}>{trigger}</span>
      {open ? (
        <div className={cn('ui-dropdown-menu', menuClassName)} role='menu'>
          {renderContent
            ? renderContent(items)
            : items.map((item) =>
                renderItem ? (
                  <span
                    key={item.key}
                    onClick={() => {
                      if (closeOnSelect) setOpen(false)
                    }}
                  >
                    {renderItem(item)}
                  </span>
                ) : (
                  <button
                    key={item.key}
                    className={cn('ui-dropdown-item', item.danger && 'is-danger')}
                    disabled={item.disabled}
                    role='menuitem'
                    type='button'
                    onClick={() => {
                      if (closeOnSelect) setOpen(false)
                      item.onSelect()
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ),
              )}
        </div>
      ) : null}
    </div>
  )
}
