import { useEffect, useRef } from 'react'
import { Boxes, FileText, LineChart, PieChart, Presentation } from '../../components/ui/icons'
import { cn } from '../../lib/utils'
import type { ReportPage } from '../../types'
import { PageSidebarMenu } from './PageSidebarMenu'
import type { PageSidebarMenuActions } from './PageSidebarMenu'

export type PageSidebarActions = PageSidebarMenuActions & {
  selectPage: (pageId: string) => unknown
}

type PageSidebarItemProps = {
  actions: PageSidebarActions
  index: number
  isActive: boolean
  page: ReportPage
  pageCount: number
}

const pageIconTypes = [Boxes, LineChart, Presentation, PieChart, FileText]

export const PageSidebarItem = ({ actions, index, isActive, page, pageCount }: PageSidebarItemProps) => {
  const PageIcon = pageIconTypes[index % pageIconTypes.length]
  const itemRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return
    itemRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [isActive])

  return (
    <article
      ref={itemRef}
      className={cn(
        'group relative grid min-h-10 grid-cols-[minmax(0,1fr)_26px] items-center rounded-md border border-transparent bg-transparent transition duration-200 ease-out hover:bg-[var(--vbi-hover-bg)] focus-within:bg-[var(--vbi-hover-bg)] max-[1100px]:min-h-14 max-[1100px]:grid-cols-[minmax(0,1fr)_32px] max-[900px]:basis-40 max-[900px]:shrink-0 max-[640px]:min-h-14 max-[640px]:basis-32 max-[640px]:grid-cols-[minmax(0,1fr)_30px]',
        isActive
          ? 'border-[color-mix(in_srgb,var(--vbi-primary)_18%,transparent)] bg-[var(--vbi-active-bg)] shadow-[inset_2px_0_0_var(--vbi-primary)] hover:bg-[var(--vbi-active-bg)] focus-within:bg-[var(--vbi-active-bg)]'
          : 'hover:translate-x-0.5',
      )}
      data-active={isActive}
      data-motion-active={isActive}
    >
      <button
        aria-current={isActive ? 'page' : undefined}
        className='grid min-h-10 w-full min-w-0 cursor-pointer grid-cols-[20px_minmax(0,1fr)] items-center gap-2 rounded-l-md border-0 bg-transparent py-1.5 pl-2 pr-0.5 text-left text-inherit focus-visible:outline-none max-[1100px]:min-h-14 max-[1100px]:grid-cols-[28px_minmax(0,1fr)] max-[1100px]:py-2 max-[1100px]:pl-2.5 max-[640px]:grid-cols-[24px_minmax(0,1fr)] max-[640px]:pr-0'
        type='button'
        onClick={() => void actions.selectPage(page.id)}
      >
        <span
          className={cn(
            'grid h-5 w-5 place-items-center rounded text-[13px] text-[var(--vbi-text-soft)] transition duration-150 group-hover:scale-105 group-focus-within:scale-105 max-[1100px]:h-7 max-[1100px]:w-7 max-[1100px]:text-base max-[640px]:h-6 max-[640px]:w-6 max-[640px]:text-sm',
            isActive && 'bg-transparent text-[var(--vbi-active-text)]',
          )}
        >
          <PageIcon className='h-4 w-4' />
        </span>
        <span className='flex min-w-0 flex-col gap-0.5 max-[900px]:w-full'>
          <span className='text-[10px] font-semibold text-[var(--vbi-active-text)]'>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className='truncate text-xs font-medium leading-[1.35] text-[var(--vbi-text)]'>{page.title}</span>
        </span>
      </button>
      <PageSidebarMenu
        actions={actions}
        hasChart={!!page.chartId}
        hasInsight={!!page.insightId}
        isActive={isActive}
        pageCount={pageCount}
        pageId={page.id}
      />
    </article>
  )
}
