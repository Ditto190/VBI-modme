import { Empty } from 'antd';
import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi';
import { useTranslation } from '../../i18n';
import { ReportChartPanel } from './ReportChartPanel';
import { ReportInsightPanel } from './ReportInsightPanel';

type ReportStageProps = {
  chartBuilder: VBIChartBuilder | null;
  hasChart: boolean;
  hasInsight: boolean;
  insightBuilder: VBIInsightBuilder | null;
  insightId: string;
  onEditChart: () => void;
  onEditInsight: () => void;
};

export const ReportStage = ({
  chartBuilder,
  hasChart,
  hasInsight,
  insightBuilder,
  insightId,
  onEditChart,
  onEditInsight,
}: ReportStageProps) => {
  const { t } = useTranslation();
  const layoutClass =
    hasChart && hasInsight
      ? 'has-both'
      : hasInsight
        ? 'has-insight-only'
        : 'has-chart-only';

  if (!hasChart && !hasInsight) {
    return (
      <section className="report-detail-stage">
        <div className="report-detail-empty">
          <Empty
            description={t('reportDetail.emptyStage')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="report-detail-stage">
      <div className={`report-detail-slide ${layoutClass}`}>
        {hasInsight ? (
          <ReportInsightPanel
            builder={insightBuilder}
            insightId={insightId}
            onEdit={onEditInsight}
          />
        ) : null}
        {hasChart ? (
          <ReportChartPanel builder={chartBuilder} onEdit={onEditChart} />
        ) : null}
      </div>
    </section>
  );
};
