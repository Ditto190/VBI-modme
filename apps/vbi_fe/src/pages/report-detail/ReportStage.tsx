import type { VBIChartBuilder } from '@visactor/vbi';
import { ReportChartSurface } from './ReportChartSurface';
import { ReportInsightSurface } from './ReportInsightSurface';

export const ReportStage = ({
  chartBuilder,
  insightContent,
  onOpenChartEditor,
  onOpenInsightEditor,
}: {
  chartBuilder: VBIChartBuilder | null;
  insightContent: string;
  onOpenChartEditor: () => void;
  onOpenInsightEditor: () => void;
}) => (
  <section className="report-detail-stage">
    <div className="report-detail-slide">
      <div className="report-detail-slide-chart">
        <ReportChartSurface builder={chartBuilder} onEdit={onOpenChartEditor} />
      </div>
      <div className="report-detail-slide-note">
        <ReportInsightSurface
          content={insightContent}
          onEdit={onOpenInsightEditor}
        />
      </div>
    </div>
  </section>
);
