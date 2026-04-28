import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useShallow } from 'zustand/shallow'
import { useTranslation } from '../../i18n'
import { useReportBuilderModel } from '../../models'
import { useReportDetailStore } from '../../stores/report-detail.store'
import { PageSidebarItem } from './PageSidebarItem'

const viewModeOptions = [
  { key: 'vertical', label: 'reportDetail.viewVertical' },
  { key: 'horizontal', label: 'reportDetail.viewHorizontal' },
] as const

export const PageSidebar = () => {
  const { t } = useTranslation()
  const {
    activePageId,
    addChart,
    addInsight,
    addPage,
    busy,
    removeChart,
    removeInsight,
    removePage,
    reportId,
    selectPage,
    setViewMode,
    viewMode,
  } = useReportDetailStore(
    useShallow((state) => ({
      activePageId: state.activePageId,
      addChart: state.addChart,
      addInsight: state.addInsight,
      addPage: state.addPage,
      busy: state.pageActionBusy,
      removeChart: state.removeChart,
      removeInsight: state.removeInsight,
      removePage: state.removePage,
      reportId: state.reportId,
      selectPage: state.selectPage,
      setViewMode: state.setViewMode,
      viewMode: state.viewMode,
    })),
  )

  const reportSession = useReportBuilderModel((state) => state.sessions[reportId])
  const pages = reportSession?.builder?.build().pages ?? []

  return (
    <section className="report-detail-filmstrip">
      <div className="report-detail-page-list">
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
      <div className="report-detail-filmstrip-actions">
        <div className="report-detail-filmstrip-mode">
          {viewModeOptions.map(({ key, label }) => (
            <Button
              key={key}
              className="report-detail-mode-btn"
              size="small"
              type={viewMode === key ? 'primary' : 'default'}
              onClick={() => setViewMode(key)}
            >
              {t(label)}
            </Button>
          ))}
        </div>
        <Button
          className="report-detail-page-create"
          icon={<PlusOutlined />}
          loading={busy}
          size="large"
          type="primary"
          variant="filled"
          onClick={() => void addPage()}
        >
          {t('reportDetail.newPage')}
        </Button>
      </div>
    </section>
  )
}
