import dynamic from 'next/dynamic'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import { X } from '../../components/ui/icons'
import { Spinner } from '../../components/ui/spinner'
import { useStandardAppProps } from '../../hooks/useStandardAppProps'
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
  const standardAppProps = useStandardAppProps()
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
      <DrawerContent className='report-detail-chart-drawer ui-drawer-panel-wide' showHandle={false}>
        <DrawerHeader>
          <div>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('charts.editorTitle')}</DrawerDescription>
          </div>
          <DrawerClose className='ui-drawer-close' aria-label='Close'>
            <X className='h-4 w-4' />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody className='report-detail-chart-drawer-body'>
          <div className='report-detail-editor'>
            <StandardChartApp
              builder={chartBuilder}
              fallback={
                <div className='report-detail-placeholder'>
                  <Spinner label={t('reportDetail.connectingChartEditor')} />
                  <p className='text-sm text-[var(--vbi-text-muted)]'>{t('reportDetail.chartEditorReady')}</p>
                </div>
              }
              mode='edit'
              standardAppProps={standardAppProps}
            />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
