import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from '../../i18n';
import { useReportBuilderModel } from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';
import { PageSidebarItem } from './PageSidebarItem';

export const PageSidebar = () => {
  const { t } = useTranslation();
  const activePageId = useReportDetailStore((state) => state.activePageId);
  const busy = useReportDetailStore((state) => state.pageActionBusy);
  const addPage = useReportDetailStore((state) => state.addPage);
  const addChart = useReportDetailStore((state) => state.addChart);
  const addInsight = useReportDetailStore((state) => state.addInsight);
  const removeChart = useReportDetailStore((state) => state.removeChart);
  const removeInsight = useReportDetailStore((state) => state.removeInsight);
  const removePage = useReportDetailStore((state) => state.removePage);
  const reportId = useReportDetailStore((state) => state.reportId);
  const selectPage = useReportDetailStore((state) => state.selectPage);
  const reportSession = useReportBuilderModel(
    (state) => state.sessions[reportId],
  );
  const pages = reportSession?.builder?.build().pages ?? [];

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
  );
};
