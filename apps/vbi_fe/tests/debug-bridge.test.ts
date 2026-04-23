import { beforeEach, describe, expect, test } from '@rstest/core';
import { createDebugBridge } from '../src/debug/bridge';
import { useManageChartsStore } from '../src/stores/manage-charts.store';
import { useNavigationStore } from '../src/stores/navigation.store';
import { useReportDetailStore } from '../src/stores/report-detail.store';
import { useReportsStore } from '../src/stores/reports.store';

const initialChartsState = useManageChartsStore.getState();
const initialNavigationState = useNavigationStore.getState();
const initialReportDetailState = useReportDetailStore.getState();
const initialReportsState = useReportsStore.getState();

describe('debug bridge', () => {
  beforeEach(() => {
    useManageChartsStore.setState(initialChartsState, true);
    useNavigationStore.setState(initialNavigationState, true);
    useReportDetailStore.setState(initialReportDetailState, true);
    useReportsStore.setState(initialReportsState, true);
  });

  test('dump returns the current store snapshots', () => {
    const bridge = createDebugBridge();
    useNavigationStore.getState().setPathname('/reports');
    useReportsStore.setState({
      items: [
        {
          id: 'report-1',
          name: 'Sales Report',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      ],
    });

    const dump = bridge.dump();

    expect(dump.navigation).toEqual({ pathname: '/reports' });
    expect((dump.reports as { items: { id: string }[] }).items[0]?.id).toBe(
      'report-1',
    );
    expect(bridge.getState('resourceSessions')).toBeDefined();
  });
});
