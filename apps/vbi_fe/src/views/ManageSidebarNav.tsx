import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronDown, ChevronRight } from '../components/ui/icons'
import { cn } from '../lib/utils'

export const manageSidebarItemClassName =
  'group flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-transparent bg-transparent px-2.5 text-left text-[13px] font-medium text-[var(--vbi-text-muted)] transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] data-[active=true]:bg-[var(--vbi-active-bg)] data-[active=true]:text-[var(--vbi-text-strong)] data-[active=true]:shadow-[inset_2px_0_0_var(--vbi-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)]/35'

export const manageSidebarChildListClassName = 'grid gap-1 pl-3 pt-1 max-[720px]:pl-0'

type ManageSidebarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  icon?: ReactNode
  trailing?: ReactNode
}

export const ManageSidebarButton = ({
  active = false,
  children,
  className,
  icon,
  trailing,
  ...props
}: ManageSidebarButtonProps) => (
  <button className={cn(manageSidebarItemClassName, className)} data-active={active} type='button' {...props}>
    {icon ? <span className='grid h-4 w-4 shrink-0 place-items-center'>{icon}</span> : null}
    <span className='min-w-0 flex-1 truncate'>{children}</span>
    {trailing ? (
      <span className='grid h-4 w-4 shrink-0 place-items-center text-[var(--vbi-placeholder)]'>{trailing}</span>
    ) : null}
  </button>
)

type ManageSidebarGroupProps = {
  active?: boolean
  children: ReactNode
  childrenClassName?: string
  className?: string
  contentClassName?: string
  expanded: boolean
  icon: ReactNode
  label: string
  onToggle: () => void
}

export const ManageSidebarGroup = ({
  active = false,
  children,
  childrenClassName,
  className,
  contentClassName,
  expanded,
  icon,
  label,
  onToggle,
}: ManageSidebarGroupProps) => (
  <div className={cn('grid gap-1', className)}>
    <ManageSidebarButton
      active={active}
      aria-expanded={expanded}
      icon={icon}
      trailing={expanded ? <ChevronDown className='h-3.5 w-3.5' /> : <ChevronRight className='h-3.5 w-3.5' />}
      onClick={onToggle}
    >
      {label}
    </ManageSidebarButton>
    <div
      className={cn(
        'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out data-[expanded=true]:grid-rows-[1fr] data-[expanded=true]:opacity-100 data-[expanded=false]:pointer-events-none motion-reduce:transition-none',
        contentClassName,
      )}
      aria-hidden={!expanded}
      data-expanded={expanded}
    >
      <div className={cn('min-h-0 overflow-hidden', childrenClassName)}>{children}</div>
    </div>
  </div>
)
