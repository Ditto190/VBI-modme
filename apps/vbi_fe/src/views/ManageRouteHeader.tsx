import { PanelLeftOpen } from '../components/ui/icons'
import { Tooltip } from '../components/ui/tooltip'
import { cn } from '../lib/utils'

export const manageSidebarToggleButtonClassName =
  'grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md border border-transparent bg-transparent text-[var(--vbi-text-muted)] transition-[background-color,border-color,color,box-shadow] duration-150 ease-out hover:border-[var(--vbi-border)] hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-primary)]/35'

type ManageRouteHeaderProps = {
  sidebarHidden: boolean
  title: string
  onShowSidebar: () => void
}

export const ManageRouteHeader = ({ sidebarHidden, title, onShowSidebar }: ManageRouteHeaderProps) => (
  <header className='pointer-events-none absolute left-5 top-3 z-20 flex h-8 max-w-[calc(100%-40px)] items-center gap-2 max-[720px]:left-4'>
    {sidebarHidden ? (
      <Tooltip side='right' title='Show Sidebar'>
        <button
          aria-label='Show Sidebar'
          className={cn(
            manageSidebarToggleButtonClassName,
            'pointer-events-auto border-[var(--vbi-border)] bg-[var(--vbi-bg)] duration-300 shadow-[0_6px_18px_rgba(15,23,42,0.08)]',
          )}
          type='button'
          onClick={onShowSidebar}
        >
          <PanelLeftOpen className='h-4 w-4' />
        </button>
      </Tooltip>
    ) : null}
    {title ? (
      <span
        className='min-w-0 max-w-[min(520px,calc(100vw-120px))] truncate text-[13px] font-medium leading-8 text-[var(--vbi-text-muted)]'
        title={title}
      >
        {title}
      </span>
    ) : null}
  </header>
)
