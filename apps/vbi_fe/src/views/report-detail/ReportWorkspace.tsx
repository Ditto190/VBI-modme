import { memo, useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { lazyComponent } from '../../components/LazyComponent'
import { Empty } from '../../components/ui/empty'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { PageSidebar } from './PageSidebar'
import { useReportStageScroll } from './useReportStageScroll'

const ReportStage = lazyComponent(
  () => import('./ReportStage').then((module) => ({ default: module.ReportStage })),
  <section className='flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable]'>
    <Spinner />
  </section>,
)

const reportShellClassName =
  'vbi-motion-presence grid h-full min-h-0 flex-1 grid-cols-[216px_minmax(0,1fr)] gap-2.5 py-2 pl-2.5 pr-3.5 max-[1100px]:grid-cols-[190px_minmax(0,1fr)] max-[1100px]:gap-2 max-[1100px]:p-2.5 max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:grid-rows-[auto_minmax(0,1fr)] max-[640px]:gap-2.5 max-[640px]:p-2.5'

const emptyStageClassName =
  'flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain scroll-smooth [contain:layout] [overflow-anchor:none] [scrollbar-gutter:stable]'

export const ReportWorkspace = memo(() => {
  const { t } = useTranslation()
  const { activePageId, pageSections, pages, reportId, setScrolledPage } = useApplication(
    (state) => ({
      activePageId: state.reportDetail.activePageId,
      pageSections: state.reportDetail.pageSections,
      pages: state.reportDetail.pages,
      reportId: state.reportDetail.reportId,
      setScrolledPage: state.reportDetail.setScrolledPage,
    }),
    { equality: applicationShallowEqual },
  )

  const pageIds = useMemo(() => pages.map((page) => page.id), [pages])

  const { setPageNode, stageRef } = useReportStageScroll({
    activePageId,
    pageIds,
    resetKey: reportId,
    setScrolledPage,
  })

  if (!pages.length) {
    return (
      <div className={reportShellClassName}>
        <PageSidebar pages={[]} />
        <div className={emptyStageClassName}>
          <Empty description={t('reportDetail.emptyReport')} />
        </div>
      </div>
    )
  }

  return (
    <div className={reportShellClassName}>
      <PageSidebar pages={pages} />
      <ReportStage
        activePageId={activePageId}
        onPageRef={setPageNode}
        pageSections={pageSections}
        stageRef={stageRef}
      />
    </div>
  )
})
