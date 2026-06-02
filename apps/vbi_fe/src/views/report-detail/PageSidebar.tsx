import { useMemo } from 'react'
import { applicationShallowEqual, useApplication } from '../../application'
import { Button } from '../../components/ui/button'
import { Plus } from '../../components/ui/icons'
import { useTranslation } from '../../i18n'
import type { ReportPage } from '../../types'
import { PageSidebarItem } from './PageSidebarItem'
import type { PageSidebarActions } from './PageSidebarItem'

type PageSidebarProps = {
  pages: ReportPage[]
}

export const PageSidebar = ({ pages }: PageSidebarProps) => {
  const { t } = useTranslation()
  const { activePageId, addChart, addInsight, addPage, busy, removeChart, removeInsight, removePage, selectPage } =
    useApplication(
      (state) => ({
        activePageId: state.reportDetail.activePageId,
        addChart: state.reportDetail.addChart,
        addInsight: state.reportDetail.addInsight,
        addPage: state.reportDetail.addPage,
        busy: state.reportDetail.pageActionBusy,
        removeChart: state.reportDetail.removeChart,
        removeInsight: state.reportDetail.removeInsight,
        removePage: state.reportDetail.removePage,
        selectPage: state.reportDetail.selectPage,
      }),
      { equality: applicationShallowEqual },
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
    <section className='vbi-motion-panel flex min-h-0 flex-col overflow-hidden rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] max-[900px]:flex-row max-[640px]:flex-col'>
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
