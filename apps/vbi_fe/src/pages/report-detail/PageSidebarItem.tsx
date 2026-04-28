import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  FileTextOutlined,
  PieChartOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import { PageSidebarMenu } from './PageSidebarMenu'

type ReportPage = {
  chartId?: string
  id: string
  insightId?: string
  title: string
}

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

const pageIconTypes = [AppstoreOutlined, RiseOutlined, CodeSandboxOutlined, PieChartOutlined, FileTextOutlined]

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

  return (
    <article
      className={`report-detail-page-card${page.id === activePageId ? ' is-active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => void selectPage(page.id)}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        void selectPage(page.id)
      }}
    >
      <span className="report-detail-page-icon">
        <PageIcon />
      </span>
      <div className="report-detail-page-copy">
        <span className="report-detail-page-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="report-detail-page-title">{page.title}</div>
      </div>
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
