import { useEffect, useState } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'
import { ChevronDown, ChevronRight } from '../../components/ui/icons'
import { cn } from '../../lib/utils'

export const manageSidebarItemClassName =
  'group flex h-8 w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-2.5 text-left text-[13px] font-medium text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong data-[active=true]:bg-vbi-active-bg data-[active=true]:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-focus'

export const manageSidebarChildListClassName = 'grid gap-0.5 pl-6 pt-1 max-[720px]:pl-0'

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
    {icon ? (
      <span className='grid h-4 w-4 shrink-0 place-items-center text-vbi-text-muted transition-colors duration-150 group-hover:text-vbi-text-strong group-data-[active=true]:text-vbi-text-strong'>
        {icon}
      </span>
    ) : null}
    <span className='min-w-0 flex-1 truncate'>{children}</span>
    {trailing ? (
      <span className='grid h-4 w-4 shrink-0 place-items-center text-vbi-placeholder transition-colors duration-150 group-hover:text-vbi-text-muted group-data-[active=true]:text-vbi-text-muted'>
        {trailing}
      </span>
    ) : null}
  </button>
)

type ManageSidebarGroupRenderState = {
  expanded: boolean
}

type ManageSidebarGroupChildren = ReactNode | ((state: ManageSidebarGroupRenderState) => ReactNode)

type ManageSidebarGroupProps = {
  autoExpandWhen?: boolean
  children: ManageSidebarGroupChildren
  childrenClassName?: string
  className?: string
  contentClassName?: string
  defaultExpanded?: boolean
  icon: ReactNode
  label: string
}

export const ManageSidebarGroup = ({
  autoExpandWhen = false,
  children,
  childrenClassName,
  className,
  contentClassName,
  defaultExpanded = false,
  icon,
  label,
}: ManageSidebarGroupProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const renderedChildren = typeof children === 'function' ? children({ expanded }) : children

  useEffect(() => {
    if (autoExpandWhen) setExpanded(true)
  }, [autoExpandWhen])

  return (
    <Collapsible className={cn('grid gap-1', className)} open={expanded} onOpenChange={setExpanded}>
      <CollapsibleTrigger asChild>
        <ManageSidebarButton
          icon={icon}
          trailing={expanded ? <ChevronDown className='h-3.5 w-3.5' /> : <ChevronRight className='h-3.5 w-3.5' />}
        >
          {label}
        </ManageSidebarButton>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 data-[state=closed]:pointer-events-none motion-reduce:transition-none',
          contentClassName,
        )}
        aria-hidden={!expanded}
        forceMount
      >
        <div className={cn('min-h-0 overflow-hidden', childrenClassName)}>{renderedChildren}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
