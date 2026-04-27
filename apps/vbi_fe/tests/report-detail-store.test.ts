import { beforeEach, describe, expect, rs, test } from '@rstest/core';

const connectResourceSession = rs.fn();
const releaseResourceSession = rs.fn();

rs.mock('../src/stores/resource-session.store', () => ({
  connectResourceSession,
  releaseResourceSession,
}));

const { useReportBuilderModel } = await import('../src/models');
const { getReportDetailSnapshot, useReportDetailStore } = await import(
  '../src/stores/report-detail.store'
);
const initialReportBuilderState = useReportBuilderModel.getState();
const initialReportDetailState = useReportDetailStore.getState();

const createReportBuilder = () => {
  const pages = [
    {
      chartId: 'chart-1',
      id: 'page-1',
      insightId: 'insight-1',
      title: 'Page 1',
    },
  ];

  return {
    build: () => ({
      pages,
    }),
    page: {
      update: (
        pageId: string,
        callback: (page: { setChartId(chartId: string): void }) => void,
      ) => {
        const page = pages.find((item) => item.id === pageId);
        if (!page) throw new Error(`Page ${pageId} not found`);
        callback({
          setChartId: (chartId: string) => {
            page.chartId = chartId;
          },
        });
      },
    },
  };
};

describe('report detail store', () => {
  beforeEach(() => {
    rs.clearAllMocks();
    releaseResourceSession.mockResolvedValue(undefined);
    useReportBuilderModel.setState(initialReportBuilderState, true);
    useReportDetailStore.setState(initialReportDetailState, true);
  });

  test('syncs insight id before chart connection settles', async () => {
    let resolveChart: () => void = () => {};
    connectResourceSession.mockImplementation((kind: string) =>
      kind === 'chart'
        ? new Promise<void>((resolve) => {
            resolveChart = resolve;
          })
        : Promise.resolve(),
    );
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    });
    useReportDetailStore.setState({
      activePageId: '',
      reportId: 'report-1',
      userName: 'user-1',
    });

    const sync = useReportDetailStore.getState().syncActivePage();
    expect(getReportDetailSnapshot().connectedChartId).toBe('chart-1');
    expect(getReportDetailSnapshot().connectedInsightId).toBe('insight-1');

    resolveChart();
    await sync;
  });

  test('does not reconnect unchanged active page resources', async () => {
    connectResourceSession.mockResolvedValue(undefined);
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: createReportBuilder(),
        },
      },
    });
    useReportDetailStore.setState({
      activePageId: '',
      reportId: 'report-1',
      userName: 'user-1',
    });

    await useReportDetailStore.getState().syncActivePage();
    await useReportDetailStore.getState().syncActivePage();

    expect(connectResourceSession).toHaveBeenCalledTimes(2);
    expect(releaseResourceSession).not.toHaveBeenCalled();
  });

  test('removes chart from active page and releases chart session', async () => {
    connectResourceSession.mockResolvedValue(undefined);
    const reportBuilder = createReportBuilder();
    useReportBuilderModel.setState({
      sessions: {
        'report-1': {
          builder: reportBuilder,
        },
      },
    });
    useReportDetailStore.setState({
      activePageId: 'page-1',
      chartEditorOpen: true,
      connectedChartId: 'chart-1',
      connectedInsightId: 'insight-1',
      reportId: 'report-1',
      userName: 'user-1',
    });

    await useReportDetailStore.getState().removeChart();

    expect(reportBuilder.build().pages[0].chartId).toBe('');
    expect(getReportDetailSnapshot().chartEditorOpen).toBe(false);
    expect(getReportDetailSnapshot().connectedChartId).toBe('');
    expect(releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1');
    expect(connectResourceSession).not.toHaveBeenCalled();
  });
});
