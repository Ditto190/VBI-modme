import { create } from 'zustand';
import {
  createResource,
  listResources,
  removeResource,
  renameResource,
} from '../services/resourceApi';
import {
  releaseResourceSession,
  connectResourceSession,
} from './resource-session.store';
import type { ResourceItem } from '../types';

type ManageChartsState = {
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
  setCreateName(createName: string): void;
  setEditorName(editorName: string): void;
  setSearchText(searchText: string): void;
  setSelectedRowKeys(selectedRowKeys: string[]): void;
};

const getNextChartName = (name: string) => name.trim() || 'Untitled Chart';

export const useManageChartsStore = create<ManageChartsState>((set, get) => ({
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
    await releaseResourceSession('chart', selectedId);
    set({ editorName: '', selectedId: '' });
  },
  create: async () => {
    await createResource('chart', getNextChartName(get().createName));
    set({ createName: '', createOpen: false });
    await get().load();
  },
  deleteOne: async (id) => {
    await removeResource('chart', id);
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
    await Promise.all(ids.map((id) => removeResource('chart', id)));
    if (ids.includes(get().selectedId)) {
      await get().closeDetail();
    }
    set({ selectedRowKeys: [] });
    await get().load();
  },
  dispose: async () => {
    await releaseResourceSession('chart', get().selectedId);
    set({
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
      set({ items: await listResources('chart') });
    } finally {
      set({ loading: false });
    }
  },
  openCreate: () => set({ createOpen: true }),
  openDetail: async (id) => {
    const { items, selectedId, userName } = get();
    if (selectedId === id) return;
    if (selectedId && selectedId !== id) {
      await releaseResourceSession('chart', selectedId);
    }
    set({
      editorName:
        items.find((item) => item.id === id)?.name || 'Untitled Chart',
      selectedId: id,
    });
    await connectResourceSession('chart', id, userName);
  },
  renameSelected: async () => {
    const { editorName, items, selectedId } = get();
    if (!selectedId) return;
    const current = items.find((item) => item.id === selectedId);
    await renameResource(
      'chart',
      selectedId,
      getNextChartName(editorName || current?.name || ''),
    );
    await get().load();
  },
  selectAllFiltered: () =>
    set((state) => ({
      selectedRowKeys: state.items
        .filter((item) => {
          const query = state.searchText.trim().toLowerCase();
          if (!query) return true;
          return [item.id, item.name ?? ''].some((field) =>
            field.toLowerCase().includes(query),
          );
        })
        .map((item) => item.id),
    })),
  setCreateName: (createName) => set({ createName }),
  setEditorName: (editorName) => set({ editorName }),
  setSearchText: (searchText) => set({ searchText }),
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
}));

export const getManageChartsSnapshot = () => {
  const state = useManageChartsStore.getState();
  return {
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
