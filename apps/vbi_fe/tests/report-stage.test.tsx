import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';

rs.mock('../src/pages/report-detail/ReportChartPanel', () => ({
  ReportChartPanel: () => <div className="report-detail-slide-chart" />,
}));

rs.mock('../src/pages/report-detail/ReportInsightPanel', () => ({
  ReportInsightPanel: () => <div className="report-detail-slide-note" />,
}));

const { ReportStage } = await import('../src/pages/report-detail/ReportStage');

const noop = () => {};

test('report stage renders empty when page has no resources', () => {
  render(
    <ReportStage
      chartBuilder={null}
      hasChart={false}
      hasInsight={false}
      insightBuilder={null}
      insightId=""
      onEditChart={noop}
      onEditInsight={noop}
    />,
  );

  expect(screen.getByText('当前页面暂无图表和洞察')).toBeInTheDocument();
});

test('report stage places insight before chart when both resources exist', () => {
  const { container } = render(
    <ReportStage
      chartBuilder={null}
      hasChart
      hasInsight
      insightBuilder={null}
      insightId="insight-1"
      onEditChart={noop}
      onEditInsight={noop}
    />,
  );
  const sections = [
    ...container.querySelectorAll(
      '.report-detail-slide-note, .report-detail-slide-chart',
    ),
  ].map((node) => node.className);

  expect(sections).toEqual([
    'report-detail-slide-note',
    'report-detail-slide-chart',
  ]);
});

test('report stage renders insight-only pages without chart panel', () => {
  const { container } = render(
    <ReportStage
      chartBuilder={null}
      hasChart={false}
      hasInsight
      insightBuilder={null}
      insightId="insight-1"
      onEditChart={noop}
      onEditInsight={noop}
    />,
  );

  expect(container.querySelector('.report-detail-slide-note')).toBeTruthy();
  expect(container.querySelector('.report-detail-slide-chart')).toBeNull();
  expect(container.querySelector('.has-insight-only')).toBeTruthy();
});
