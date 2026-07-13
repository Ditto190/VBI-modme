import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../components/ui/button'
import { ChevronLeft, PanelLeftOpen, Pencil } from '../components/ui/icons'
import { Input } from '../components/ui/input'
import { Tooltip } from '../components/ui/tooltip'
import { cn } from '../lib/utils'
import type { ManageRouteRenameChrome } from './ManageRouteChrome'

const showSidebarButtonClassName =
  'absolute left-0 top-1/2 z-20 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[var(--vbi-border)] bg-[var(--vbi-bg)] text-[var(--vbi-text-muted)] shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out hover:-translate-x-[44%] hover:border-[var(--vbi-border-strong)] hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-primary)]/35'

const routeTitleGroupClassName = 'flex min-w-0 flex-1 items-center gap-2.5'

type ManageRouteHeaderProps = {
  actions?: ReactNode
  backLabel?: string
  rename?: ManageRouteRenameChrome
  sidebarHidden: boolean
  title: string
  onBack?: () => void
  onShowSidebar: () => void
}

export const ManageRouteHeader = ({
  actions,
  backLabel,
  onBack,
  onShowSidebar,
  rename,
  sidebarHidden,
  title,
}: ManageRouteHeaderProps) => {
  const [editing, setEditing] = useState(false)
  const [draftBeforeEdit, setDraftBeforeEdit] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const displayTitle = rename ? rename.value.trim() || rename.fallbackTitle : title
  const resolvedBackLabel = backLabel ?? 'Back'

  useEffect(() => {
    if (!editing) return

    inputRef.current?.focus()
    inputRef.current?.select()
  }, [editing])

  const startEditing = () => {
    if (!rename || editing) return

    setDraftBeforeEdit(rename.value)
    setEditing(true)
  }

  const commit = () => {
    if (!rename) return

    setEditing(false)
    void rename.onCommit()
  }

  return (
    <header className='relative flex h-11 shrink-0 items-center justify-between gap-3 [border-bottom:1px_solid_var(--vbi-border)] bg-[var(--vbi-secondary)] px-3 transition-colors duration-300 max-[720px]:h-[52px]'>
      <SidebarHandleLayer sidebarHidden={sidebarHidden} onShowSidebar={onShowSidebar} />
      <div className={cn(routeTitleGroupClassName, sidebarHidden)} data-manage-route-title-group=''>
        {onBack ? (
          <Button
            aria-label={resolvedBackLabel}
            className='h-7 min-w-fit cursor-pointer [border:1px_solid_var(--vbi-border)] bg-[var(--vbi-control)] px-2 text-xs text-[var(--vbi-text)] shadow-none'
            icon={<ChevronLeft className='h-3.5 w-3.5' />}
            size='sm'
            title={resolvedBackLabel}
            variant='ghost'
            onClick={onBack}
          >
            {resolvedBackLabel}
          </Button>
        ) : null}
        {displayTitle ? (
          <h1
            className='group m-0 inline-flex max-w-[min(640px,62vw)] min-w-0 items-center gap-1.5 text-[13px] font-semibold leading-none text-[var(--vbi-text)]'
            title={editing ? undefined : displayTitle}
            onDoubleClick={startEditing}
          >
            {rename && editing ? (
              <Input
                ref={inputRef}
                className='h-8 w-[min(520px,58vw)] px-2 text-[13px] font-semibold tracking-normal'
                value={rename.value}
                onBlur={commit}
                onChange={(event) => rename.onChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.currentTarget.blur()
                    return
                  }
                  if (event.key === 'Escape') {
                    rename.onChange(draftBeforeEdit)
                    setEditing(false)
                  }
                }}
              />
            ) : (
              <>
                <span className='min-w-0 truncate'>{displayTitle}</span>
                {rename ? (
                  <button
                    aria-label={rename.label}
                    className='inline-flex size-6 shrink-0 scale-95 cursor-pointer items-center justify-center rounded-md [border:1px_solid_var(--vbi-border)] bg-[var(--vbi-secondary)] text-[var(--vbi-text-muted)] opacity-0 transition duration-150 hover:border-[var(--vbi-border-strong)] hover:bg-[var(--vbi-control)] hover:text-[var(--vbi-text-strong)] hover:shadow-sm focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--vbi-focus)] group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100'
                    title={rename.label}
                    type='button'
                    onClick={startEditing}
                  >
                    <Pencil className='h-3.5 w-3.5' />
                  </button>
                ) : null}
              </>
            )}
          </h1>
        ) : null}
      </div>
      {actions ? <div className='flex shrink-0 items-center gap-1.5 max-[720px]:ml-auto'>{actions}</div> : null}
    </header>
  )
}

const SidebarHandleLayer = ({
  sidebarHidden,
  onShowSidebar,
}: {
  sidebarHidden: boolean
  onShowSidebar: () => void
}) => {
  if (!sidebarHidden) return null

  return (
    <Tooltip side='right' title='Show Sidebar'>
      <button
        aria-label='Show Sidebar'
        className={showSidebarButtonClassName}
        data-manage-header-sidebar-handle=''
        type='button'
        onClick={onShowSidebar}
      >
        <PanelLeftOpen className='h-4 w-4' />
      </button>
    </Tooltip>
  )
}
