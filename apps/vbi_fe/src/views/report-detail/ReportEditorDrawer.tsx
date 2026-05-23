import dynamic from 'next/dynamic'
import { CenteredState } from '../../components/ui/centered-state'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { useChartBuilderModel, useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'

const StandardChartApp = dynamic(
  () => import('../../components/StandardChartApp').then((module) => module.StandardChartApp),
  {
    ssr: false,
  },
)

export const ReportEditorDrawer = () => {
  const { t } = useTranslation()
  const chartId = useReportDetailStore((state) => state.connectedChartId)
  const closeChartEditor = useReportDetailStore((state) => state.closeChartEditor)
  const open = useReportDetailStore((state) => state.chartEditorOpen)
  const reportId = useReportDetailStore((state) => state.reportId)
  const activePageId = useReportDetailStore((state) => state.activePageId)
  const chartBuilder = useChartBuilderModel((state) => state.sessions[chartId]?.builder ?? null)
  const reportSession = useReportBuilderModel((state) => state.sessions[reportId])
  const title =
    reportSession?.builder?.build().pages.find((page) => page.id === activePageId)?.title || t('charts.editorTitle')

  return (
    <Drawer
      open={open}
      direction='right'
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeChartEditor()
      }}
    >
      <DrawerContent
        className='report-detail-chart-drawer overflow-hidden border-l-[var(--vbi-border-strong)] bg-[var(--vbi-editor-bg)] data-[direction=right]:w-[min(calc(100vw_-_24px),1320px)] data-[direction=right]:max-w-none max-[1100px]:data-[direction=right]:w-[calc(100vw_-_12px)]'
        showHandle={false}
      >
        <DrawerHeader className='min-h-[50px] py-2.5 pl-3.5 pr-3'>
          <div>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('charts.editorTitle')}</DrawerDescription>
          </div>
          <DrawerCloseButton label={t('common.close')} />
        </DrawerHeader>
        <DrawerBody className='flex min-h-0 overflow-hidden bg-[var(--vbi-editor-bg)] p-0'>
          <div className='box-border flex h-full min-h-0 min-w-0 flex-1 overflow-hidden bg-[var(--vbi-editor-bg)] p-2.5'>
            <StandardChartApp
              builder={chartBuilder}
              fallback={
                <CenteredState minHeight='sm'>
                  <Spinner label={t('reportDetail.connectingChartEditor')} />
                  <p className='text-sm text-[var(--vbi-text-muted)]'>{t('reportDetail.chartEditorReady')}</p>
                </CenteredState>
              }
              mode='edit'
            />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
