import {
  getManageChartsSnapshot,
  useManageChartsStore,
} from '../stores/manage-charts.store';
import {
  getManageInsightsSnapshot,
  useManageInsightsStore,
} from '../stores/manage-insights.store';
import { getNavigationSnapshot } from '../stores/navigation.store';
import {
  getReportDetailSnapshot,
  useReportDetailStore,
} from '../stores/report-detail.store';
import { getReportsSnapshot, useReportsStore } from '../stores/reports.store';
import { getResourceSessionSummary } from '../stores/resource-session.store';

export const createDebugBridge = () => ({
  actions: {
    manageCharts: {
      create: () => useManageChartsStore.getState().create(),
      deleteSelected: () => useManageChartsStore.getState().deleteSelected(),
      load: () => useManageChartsStore.getState().load(),
      openDetail: (id: string) =>
        useManageChartsStore.getState().openDetail(id),
    },
    manageInsights: {
      create: () => useManageInsightsStore.getState().create(),
      deleteSelected: () => useManageInsightsStore.getState().deleteSelected(),
      load: () => useManageInsightsStore.getState().load(),
      openDetail: (id: string) =>
        useManageInsightsStore.getState().openDetail(id),
    },
    reportDetail: {
      addPage: () => useReportDetailStore.getState().addPage(),
      bootstrap: (reportId: string, userName: string) =>
        useReportDetailStore.getState().bootstrap(reportId, userName),
      openChartEditor: () => useReportDetailStore.getState().openChartEditor(),
      openInsightEditor: () =>
        useReportDetailStore.getState().openInsightEditor(),
      removePage: (pageId: string) =>
        useReportDetailStore.getState().removePage(pageId),
      selectPage: (pageId: string) =>
        useReportDetailStore.getState().selectPage(pageId),
      setInsightContent: (value: string) =>
        useReportDetailStore.getState().setInsightContent(value),
    },
    reports: {
      create: () => useReportsStore.getState().create(),
      load: () => useReportsStore.getState().load(),
      openReport: (id: string) => useReportsStore.getState().openReport(id),
      remove: (id: string) => useReportsStore.getState().remove(id),
      startRename: (id: string) => {
        const item = useReportsStore
          .getState()
          .items.find((record) => record.id === id);
        if (item) useReportsStore.getState().startRename(item);
      },
      confirmRename: () => useReportsStore.getState().confirmRename(),
    },
  },
  dump: () => ({
    manageCharts: getManageChartsSnapshot(),
    manageInsights: getManageInsightsSnapshot(),
    navigation: getNavigationSnapshot(),
    reportDetail: getReportDetailSnapshot(),
    reports: getReportsSnapshot(),
    resourceSessions: getResourceSessionSummary(),
  }),
  getState: (storeName: string) =>
    ({
      manageCharts: getManageChartsSnapshot(),
      manageInsights: getManageInsightsSnapshot(),
      navigation: getNavigationSnapshot(),
      reportDetail: getReportDetailSnapshot(),
      reports: getReportsSnapshot(),
      resourceSessions: getResourceSessionSummary(),
    })[storeName],
});
