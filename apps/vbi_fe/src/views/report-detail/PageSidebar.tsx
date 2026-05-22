import { useShallow } from 'zustand/shallow'
import { Button } from '../../components/ui/button'
import { Plus } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'
import { useReportDetailStore } from '../../stores/report-detail.store'
import type { ReportPage } from '../../types'
import { PageSidebarItem } from './PageSidebarItem'

type PageSidebarProps = {
  pages: ReportPage[]
}

export const PageSidebar = ({ pages }: PageSidebarProps) => {
  const { t } = useTranslation()
  const { activePageId, addChart, addInsight, addPage, busy, removeChart, removeInsight, removePage, selectPage } =
    useReportDetailStore(
      useShallow((state) => ({
        activePageId: state.activePageId,
        addChart: state.addChart,
        addInsight: state.addInsight,
        addPage: state.addPage,
        busy: state.pageActionBusy,
        removeChart: state.removeChart,
        removeInsight: state.removeInsight,
        removePage: state.removePage,
        selectPage: state.selectPage,
      })),
    )

  return (
    <section className='report-detail-filmstrip'>
      <div className='report-detail-page-list'>
        {pages.map((page, index) => (
          <PageSidebarItem
            key={page.id}
            activePageId={activePageId}
            index={index}
            page={page}
            pageCount={pages.length}
            addChart={addChart}
            addInsight={addInsight}
            removeChart={removeChart}
            removeInsight={removeInsight}
            removePage={removePage}
            selectPage={selectPage}
          />
        ))}
      </div>
      <div className='report-detail-filmstrip-actions'>
        <Button
          className='report-detail-page-create'
          icon={<Plus className='h-4 w-4' />}
          loading={busy}
          size='lg'
          variant='primary'
          onClick={() => void addPage()}
        >
          {t('reportDetail.newPage')}
        </Button>
      </div>
    </section>
  )
}
