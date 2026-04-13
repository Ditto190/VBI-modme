import { create } from 'zustand';
import { createInsight } from '../services/insightApi';
import { createResource } from '../services/resourceApi';
import { useInsightBuilderModel, useReportBuilderModel } from '../models';
import { resolveActivePageId } from '../pages/report-detail/page-state';
import {
  connectResourceSession,
  releaseResourceSession,
} from './resource-session.store';
import type { ReportPage } from '../types';

type ReportDetailState = {
  activePageId: string;
  chartEditorOpen: boolean;
  connectedChartId: string;
  connectedInsightId: string;
  insightEditorOpen: boolean;
  pageActionBusy: boolean;
  reportId: string;
  userName: string;
  addPage(): Promise<void>;
  bootstrap(reportId: string, userName: string): Promise<void>;
  closeChartEditor(): void;
  closeInsightEditor(): void;
  dispose(): Promise<void>;
  openChartEditor(): void;
  openInsightEditor(): void;
  removePage(pageId: string): Promise<void>;
  selectPage(pageId: string): Promise<void>;
  setInsightContent(value: string): void;
  syncActivePage(): Promise<void>;
};

const getReportPages = (reportId: string): ReportPage[] =>
  useReportBuilderModel.getState().sessions[reportId]?.builder?.build().pages ??
  [];

const getReportBuilder = (reportId: string) =>
  useReportBuilderModel.getState().sessions[reportId]?.builder;

const getInsightBuilder = (insightId: string) =>
  useInsightBuilderModel.getState().sessions[insightId]?.builder;

const getActivePage = (reportId: string, activePageId: string) =>
  getReportPages(reportId).find((page) => page.id === activePageId);

const getNextPageTitle = (pages: ReportPage[]) => `Page ${pages.length + 1}`;

const syncActiveResources = async (state: ReportDetailState) => {
  const activePage = getActivePage(state.reportId, state.activePageId);
  const nextChartId = activePage?.chartId ?? '';
  const nextInsightId = activePage?.insightId ?? '';
  if (state.connectedChartId && state.connectedChartId !== nextChartId) {
    await releaseResourceSession('chart', state.connectedChartId);
  }
  if (state.connectedInsightId && state.connectedInsightId !== nextInsightId) {
    await releaseResourceSession('insight', state.connectedInsightId);
  }
  if (nextChartId && nextChartId !== state.connectedChartId) {
    await connectResourceSession('chart', nextChartId, state.userName);
  }
  if (nextInsightId && nextInsightId !== state.connectedInsightId) {
    await connectResourceSession('insight', nextInsightId, state.userName);
  }
  useReportDetailStore.setState({
    connectedChartId: nextChartId,
    connectedInsightId: nextInsightId,
  });
};

export const useReportDetailStore = create<ReportDetailState>((set, get) => ({
  activePageId: '',
  chartEditorOpen: false,
  connectedChartId: '',
  connectedInsightId: '',
  insightEditorOpen: false,
  pageActionBusy: false,
  reportId: '',
  userName: '',
  addPage: async () => {
    const state = get();
    const reportBuilder = getReportBuilder(state.reportId);
    if (!reportBuilder) return;
    set({ pageActionBusy: true });
    try {
      const pages = getReportPages(state.reportId);
      const pageTitle = getNextPageTitle(pages);
      const chart = await createResource('chart', `${pageTitle} Chart`);
      const insight = await createInsight({
        content: '',
        name: `${pageTitle} Insight`,
      });
      let nextPageId = '';
      reportBuilder.page.add(
        pageTitle,
        (page: {
          getId(): string;
          setChartId(chartId: string): void;
          setInsightId(insightId: string): void;
        }) => {
          page.setChartId(chart.id);
          page.setInsightId(insight.id);
          nextPageId = page.getId();
        },
      );
      set({
        activePageId: nextPageId,
        chartEditorOpen: false,
        insightEditorOpen: false,
      });
      await get().syncActivePage();
    } finally {
      set({ pageActionBusy: false });
    }
  },
  bootstrap: async (reportId, userName) => {
    await get().dispose();
    if (!reportId) return;
    set({ reportId, userName });
    await connectResourceSession('report', reportId, userName);
    await get().syncActivePage();
  },
  closeChartEditor: () => set({ chartEditorOpen: false }),
  closeInsightEditor: () => set({ insightEditorOpen: false }),
  dispose: async () => {
    const state = get();
    await releaseResourceSession('chart', state.connectedChartId);
    await releaseResourceSession('insight', state.connectedInsightId);
    await releaseResourceSession('report', state.reportId);
    set({
      activePageId: '',
      chartEditorOpen: false,
      connectedChartId: '',
      connectedInsightId: '',
      insightEditorOpen: false,
      pageActionBusy: false,
      reportId: '',
      userName: '',
    });
  },
  openChartEditor: () => set({ chartEditorOpen: true }),
  openInsightEditor: () => set({ insightEditorOpen: true }),
  removePage: async (pageId) => {
    const reportBuilder = getReportBuilder(get().reportId);
    if (!reportBuilder) return;
    reportBuilder.page.remove(pageId);
    await get().syncActivePage();
  },
  selectPage: async (pageId) => {
    set({
      activePageId: pageId,
      chartEditorOpen: false,
      insightEditorOpen: false,
    });
    await get().syncActivePage();
  },
  setInsightContent: (value) => {
    getInsightBuilder(get().connectedInsightId)?.setContent(value);
  },
  syncActivePage: async () => {
    const state = get();
    const nextActivePageId = resolveActivePageId(
      getReportPages(state.reportId),
      state.activePageId,
    );
    set((current) => ({
      activePageId: nextActivePageId,
      chartEditorOpen:
        current.activePageId === nextActivePageId
          ? current.chartEditorOpen
          : false,
      insightEditorOpen:
        current.activePageId === nextActivePageId
          ? current.insightEditorOpen
          : false,
    }));
    await syncActiveResources({ ...get(), activePageId: nextActivePageId });
  },
}));

export const getReportDetailSnapshot = () => {
  const state = useReportDetailStore.getState();
  const activePage = getActivePage(state.reportId, state.activePageId);
  return {
    activePage,
    activePageId: state.activePageId,
    chartEditorOpen: state.chartEditorOpen,
    connectedChartId: state.connectedChartId,
    connectedInsightId: state.connectedInsightId,
    insightEditorOpen: state.insightEditorOpen,
    pageActionBusy: state.pageActionBusy,
    pages: getReportPages(state.reportId),
    reportId: state.reportId,
  };
};

export const getReportDetailView = () => {
  const state = useReportDetailStore.getState();
  const activePage = getActivePage(state.reportId, state.activePageId);
  const insightBuilder = getInsightBuilder(activePage?.insightId ?? '');
  return {
    activePage,
    insightContent: insightBuilder?.build().content?.trim() ?? '',
    pages: getReportPages(state.reportId),
  };
};
