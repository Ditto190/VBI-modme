import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import type { ReportPage } from '../../services/types';

export const PageSidebar = ({
  activePageId,
  busy,
  pages,
  onAddPage,
  onChangePage,
  onDeletePage,
}: {
  activePageId: string;
  busy: boolean;
  pages: ReportPage[];
  onAddPage: () => void;
  onChangePage: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
}) => (
  <section className="report-detail-filmstrip">
    <div className="report-detail-page-list">
      {pages.map((page, index) => (
        <article
          key={page.id}
          className={`report-detail-page-card${page.id === activePageId ? ' is-active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => onChangePage(page.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onChangePage(page.id);
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
              onDeletePage(page.id);
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
        onClick={onAddPage}
      />
    </div>
  </section>
);
