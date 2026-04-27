import { EditOutlined } from '@ant-design/icons';
import { APP as StandardAPP } from 'standard';
import { Spin } from 'antd';
import type { VBIChartBuilder } from '@visactor/vbi';
import { EditableSurface } from './EditableSurface';
import { useStandardAppProps } from '../../hooks/useStandardAppProps';
import { useTranslation } from '../../i18n';

type ReportChartPanelProps = {
  builder: VBIChartBuilder | null;
  onEdit: () => void;
};

export const ReportChartPanel = ({
  builder,
  onEdit,
}: ReportChartPanelProps) => {
  const standardAppProps = useStandardAppProps();
  const { t } = useTranslation();

  return (
    <div className="report-detail-slide-chart">
      <EditableSurface
        actions={[
          {
            ariaLabel: t('reportDetail.editChart'),
            icon: <EditOutlined />,
            onClick: onEdit,
          },
        ]}
      >
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
};
