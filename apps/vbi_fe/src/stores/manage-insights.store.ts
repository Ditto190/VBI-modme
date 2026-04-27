import { create } from 'zustand';
import {
  createInsight,
  deleteInsight,
  fetchInsights,
  updateInsight,
} from '../services/insightApi';
import { tRuntime } from '../i18n';
import {
  connectResourceSession,
  releaseResourceSession,
} from './resource-session.store';
import type { ResourceItem } from '../types';
import { getFilteredResourceIds } from '../utils/resource-list';

type ManageInsightsState = {
  createContent: string;
  createName: string;
  createOpen: boolean;
  editorName: string;
  items: ResourceItem[];
  loading: boolean;
  searchText: string;
  selectedId: string;
  selectedRowKeys: string[];
  userName: string;
  bootstrap(userName: string): Promise<void>;
  clearSelection(): void;
  closeCreate(): void;
  closeDetail(): Promise<void>;
  create(): Promise<void>;
  deleteOne(id: string): Promise<void>;
  deleteSelected(): Promise<void>;
  dispose(): Promise<void>;
  load(): Promise<void>;
  openCreate(): void;
  openDetail(id: string): Promise<void>;
  renameSelected(): Promise<void>;
  selectAllFiltered(): void;
  setCreateContent(createContent: string): void;
  setCreateName(createName: string): void;
  setEditorName(editorName: string): void;
  setSearchText(searchText: string): void;
  setSelectedRowKeys(selectedRowKeys: string[]): void;
};

const getNextInsightName = (name: string) =>
  name.trim() || tRuntime('insights.untitled');

export const useManageInsightsStore = create<ManageInsightsState>(
  (set, get) => ({
    createContent: '',
    createName: '',
    createOpen: false,
    editorName: '',
    items: [],
    loading: false,
    searchText: '',
    selectedId: '',
    selectedRowKeys: [],
    userName: '',
    bootstrap: async (userName) => {
      set({ userName });
      await get().load();
    },
    clearSelection: () => set({ selectedRowKeys: [] }),
    closeCreate: () => set({ createOpen: false }),
    closeDetail: async () => {
      const { selectedId } = get();
      await releaseResourceSession('insight', selectedId);
      set({ editorName: '', selectedId: '' });
    },
    create: async () => {
      await createInsight({
        content: get().createContent,
        name: getNextInsightName(get().createName),
      });
      set({ createContent: '', createName: '', createOpen: false });
      await get().load();
    },
    deleteOne: async (id) => {
      await deleteInsight(id);
      if (get().selectedId === id) {
        await get().closeDetail();
      }
      set((state) => ({
        selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
      }));
      await get().load();
    },
    deleteSelected: async () => {
      const ids = [...get().selectedRowKeys];
      await Promise.all(ids.map((id) => deleteInsight(id)));
      if (ids.includes(get().selectedId)) {
        await get().closeDetail();
      }
      set({ selectedRowKeys: [] });
      await get().load();
    },
    dispose: async () => {
      await releaseResourceSession('insight', get().selectedId);
      set({
        createContent: '',
        createName: '',
        createOpen: false,
        editorName: '',
        searchText: '',
        selectedId: '',
        selectedRowKeys: [],
        userName: '',
      });
    },
    load: async () => {
      set({ loading: true });
      try {
        set({ items: await fetchInsights() });
      } finally {
        set({ loading: false });
      }
    },
    openCreate: () => set({ createOpen: true }),
    openDetail: async (id) => {
      const { items, selectedId, userName } = get();
      if (selectedId === id) return;
      if (selectedId && selectedId !== id) {
        await releaseResourceSession('insight', selectedId);
      }
      set({
        editorName:
          items.find((item) => item.id === id)?.name ||
          tRuntime('insights.untitled'),
        selectedId: id,
      });
      await connectResourceSession('insight', id, userName);
    },
    renameSelected: async () => {
      const { editorName, items, selectedId } = get();
      if (!selectedId) return;
      const current = items.find((item) => item.id === selectedId);
      await updateInsight(selectedId, {
        name: getNextInsightName(editorName || current?.name || ''),
      });
      await get().load();
    },
    selectAllFiltered: () =>
      set((state) => ({
        selectedRowKeys: getFilteredResourceIds(state.items, state.searchText),
      })),
    setCreateContent: (createContent) => set({ createContent }),
    setCreateName: (createName) => set({ createName }),
    setEditorName: (editorName) => set({ editorName }),
    setSearchText: (searchText) => set({ searchText }),
    setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
  }),
);

export const getManageInsightsSnapshot = () => {
  const state = useManageInsightsStore.getState();
  return {
    createContent: state.createContent,
    createName: state.createName,
    createOpen: state.createOpen,
    editorName: state.editorName,
    items: state.items,
    loading: state.loading,
    searchText: state.searchText,
    selectedId: state.selectedId,
    selectedRowKeys: state.selectedRowKeys,
  };
};
