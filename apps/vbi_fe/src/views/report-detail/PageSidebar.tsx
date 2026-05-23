import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { Button } from '../../components/ui/button'
import { Plus } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'
import { useReportDetailStore } from '../../stores/report-detail.store'
import type { ReportPage } from '../../types'
import { PageSidebarItem } from './PageSidebarItem'
import type { PageSidebarActions } from './PageSidebarItem'

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
  const pageActions = useMemo<PageSidebarActions>(
    () => ({
      addChart,
      addInsight,
      removeChart,
      removeInsight,
      removePage,
      selectPage,
    }),
    [addChart, addInsight, removeChart, removeInsight, removePage, selectPage],
  )

  return (
    <section className='vbi-motion-panel flex min-h-0 flex-col overflow-hidden rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-surface-solid)] max-[900px]:flex-row max-[640px]:flex-col'>
      <div className='vbi-motion-stagger flex min-h-0 flex-1 flex-col gap-1 overflow-auto p-2 max-[900px]:flex-row max-[640px]:shrink-0 max-[640px]:pb-0'>
        {pages.map((page, index) => (
          <PageSidebarItem
            key={page.id}
            actions={pageActions}
            index={index}
            isActive={page.id === activePageId}
            page={page}
            pageCount={pages.length}
          />
        ))}
      </div>
      <div className='grid gap-1.5 border-t border-[var(--vbi-border)] p-2 max-[900px]:w-40 max-[900px]:shrink-0 max-[900px]:content-center max-[900px]:border-l max-[900px]:border-t-0 max-[640px]:w-auto max-[640px]:grid-cols-[minmax(0,1fr)] max-[640px]:border-l-0 max-[640px]:border-t'>
        <Button
          className='h-8 w-full font-medium max-[900px]:h-auto max-[900px]:min-h-9 max-[900px]:whitespace-normal max-[640px]:w-28'
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
