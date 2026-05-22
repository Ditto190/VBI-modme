import { useEffect, useRef } from 'react'
import { Boxes, FileText, LineChart, PieChart, Presentation } from '../../components/ui/icons'
import type { ReportPage } from '../../types'
import { PageSidebarMenu } from './PageSidebarMenu'

type PageSidebarItemProps = {
  activePageId: string
  index: number
  page: ReportPage
  pageCount: number
  addChart: (pageId: string) => unknown
  addInsight: (pageId: string) => unknown
  removeChart: (pageId: string) => unknown
  removeInsight: (pageId: string) => unknown
  removePage: (pageId: string) => unknown
  selectPage: (pageId: string) => unknown
}

const pageIconTypes = [Boxes, LineChart, Presentation, PieChart, FileText]

export const PageSidebarItem = ({
  activePageId,
  index,
  page,
  pageCount,
  addChart,
  addInsight,
  removeChart,
  removeInsight,
  removePage,
  selectPage,
}: PageSidebarItemProps) => {
  const PageIcon = pageIconTypes[index % pageIconTypes.length]
  const itemRef = useRef<HTMLElement | null>(null)
  const isActive = page.id === activePageId

  useEffect(() => {
    if (!isActive) return
    itemRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [isActive])

  return (
    <article ref={itemRef} className={`report-detail-page-card${isActive ? ' is-active' : ''}`}>
      <button
        aria-current={isActive ? 'page' : undefined}
        className='report-detail-page-select'
        type='button'
        onClick={() => void selectPage(page.id)}
      >
        <span className='report-detail-page-icon'>
          <PageIcon className='h-4 w-4' />
        </span>
        <span className='report-detail-page-copy'>
          <span className='report-detail-page-index'>{String(index + 1).padStart(2, '0')}</span>
          <span className='report-detail-page-title'>{page.title}</span>
        </span>
      </button>
      <PageSidebarMenu
        addChart={addChart}
        addInsight={addInsight}
        hasChart={!!page.chartId}
        hasInsight={!!page.insightId}
        pageCount={pageCount}
        pageId={page.id}
        removeChart={removeChart}
        removeInsight={removeInsight}
        removePage={removePage}
      />
    </article>
  )
}
