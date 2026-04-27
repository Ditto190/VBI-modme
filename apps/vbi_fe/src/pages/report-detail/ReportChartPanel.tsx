import { EditOutlined } from '@ant-design/icons';
import { APP as StandardAPP } from 'standard';
import { Spin } from 'antd';
import type { VBIChartBuilder } from '@visactor/vbi';
import { memo, useMemo } from 'react';
import { EditableSurface } from './EditableSurface';
import type { EditableSurfaceAction } from './EditableSurface';
import { useStandardAppProps } from '../../hooks/useStandardAppProps';
import { useTranslation } from '../../i18n';

type ReportChartPanelProps = {
  builder: VBIChartBuilder | null;
  onEdit: () => void;
};

export const ReportChartPanel = memo(
  ({ builder, onEdit }: ReportChartPanelProps) => {
    const standardAppProps = useStandardAppProps();
    const { t } = useTranslation();
    const actions = useMemo<EditableSurfaceAction[]>(
      () => [
        {
          ariaLabel: t('reportDetail.editChart'),
          icon: <EditOutlined />,
          onClick: onEdit,
        },
      ],
      [onEdit, t],
    );

    return (
      <div className="report-detail-slide-chart">
        <EditableSurface actions={actions}>
          {builder ? (
            <StandardAPP builder={builder} mode="view" {...standardAppProps} />
          ) : (
            <div className="report-detail-placeholder">
              <Spin />
            </div>
          )}
        </EditableSurface>
      </div>
    );
  },
);
