import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useReportBuilderModel } from '../../models';
import { useReportDetailStore } from '../../stores/report-detail.store';

export const PageSidebar = () => {
  const activePageId = useReportDetailStore((state) => state.activePageId);
  const busy = useReportDetailStore((state) => state.pageActionBusy);
  const addPage = useReportDetailStore((state) => state.addPage);
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
          <article
            key={page.id}
            className={`report-detail-page-card${page.id === activePageId ? ' is-active' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => void selectPage(page.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                void selectPage(page.id);
              }
            }}
          >
            <span className="report-detail-page-index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="report-detail-page-title">{page.title}</div>
            <Popconfirm
              disabled={pages.length <= 1}
              title="删除当前页面"
              onConfirm={(event) => {
                event?.stopPropagation();
                return removePage(page.id);
              }}
            >
              <Button
                className="report-detail-page-delete"
                danger
                disabled={pages.length <= 1}
                icon={<DeleteOutlined />}
                shape="circle"
                size="small"
                type="text"
                onClick={(event) => event.stopPropagation()}
              />
            </Popconfirm>
          </article>
        ))}
      </div>
      <div className="report-detail-filmstrip-actions">
        <Button
          className="report-detail-page-create"
          icon={<PlusOutlined />}
          loading={busy}
          size="large"
          shape="circle"
          type="primary"
          variant="filled"
          onClick={() => void addPage()}
        />
      </div>
    </section>
  );
};
