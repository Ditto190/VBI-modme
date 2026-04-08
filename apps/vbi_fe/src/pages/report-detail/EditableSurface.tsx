import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ReactNode } from 'react';

export const EditableSurface = ({
  children,
  onEdit,
}: {
  children: ReactNode;
  onEdit: () => void;
}) => (
  <section className="report-detail-surface">
    <div className="report-detail-surface-body">{children}</div>
    <div className="report-detail-surface-toolbar">
      <Button
        aria-label="edit"
        className="report-detail-surface-edit"
        icon={<EditOutlined />}
        shape="circle"
        size="large"
        type="text"
        onClick={onEdit}
      />
    </div>
  </section>
);
