import { APP as StandardAPP } from 'standard'
import { Drawer, Spin, Typography } from 'antd'
import { useStandardAppProps } from '../../hooks/useStandardAppProps'
import { useTranslation } from '../../i18n'
import { useChartBuilderModel, useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'

const chartEditorDrawerSize = 1440
const chartEditorDrawerStyles = {
  body: { overflow: 'hidden', padding: 0 },
  wrapper: { maxWidth: '92vw' },
}

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
      className="report-detail-chart-drawer"
      destroyOnHidden
      open={open}
      size={chartEditorDrawerSize}
      styles={chartEditorDrawerStyles}
      title={title}
      onClose={closeChartEditor}
    >
      <div className="report-detail-editor">
        {chartBuilder ? (
          <StandardAPP builder={chartBuilder} mode="edit" {...standardAppProps} />
        ) : (
          <div className="report-detail-placeholder">
            <Spin tip={t('reportDetail.connectingChartEditor')} />
            <Typography.Text type="secondary">{t('reportDetail.chartEditorReady')}</Typography.Text>
          </div>
        )}
      </div>
    </Drawer>
  )
}
