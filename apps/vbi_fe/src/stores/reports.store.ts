import { create } from 'zustand';
import { tRuntime } from '../i18n';
import * as resourceApi from '../services/resourceApi';
import { useNavigationStore } from './navigation.store';
import type { ResourceItem } from '../types';
import { getFilteredResourceIds } from '../utils/resource-list';

type ReportsState = {
  createName: string;
  editing: ResourceItem | null;
  isCreateOpen: boolean;
  items: ResourceItem[];
  loading: boolean;
  renameValue: string;
  searchText: string;
  selectedRowKeys: string[];
  clearSelection(): void;
  closeCreate(): void;
  confirmRename(): Promise<void>;
  create(): Promise<void>;
  deleteSelected(): Promise<void>;
  load(): Promise<void>;
  openCreate(): void;
  openReport(id: string): void;
  remove(id: string): Promise<void>;
  selectAllFiltered(): void;
  setCreateName(createName: string): void;
  setRenameValue(renameValue: string): void;
  setSearchText(searchText: string): void;
  setSelectedRowKeys(selectedRowKeys: string[]): void;
  startRename(item: ResourceItem): void;
  stopRename(): void;
};

export const useReportsStore = create<ReportsState>((set, get) => ({
  createName: '',
  editing: null,
  isCreateOpen: false,
  items: [],
  loading: false,
  renameValue: '',
  searchText: '',
  selectedRowKeys: [],
  clearSelection: () => set({ selectedRowKeys: [] }),
  closeCreate: () => set({ isCreateOpen: false }),
  confirmRename: async () => {
    const { editing, renameValue } = get();
    if (!editing) return;
    await resourceApi.renameResource(
      'report',
      editing.id,
      renameValue.trim() || editing.name || tRuntime('reports.untitled'),
    );
    set({ editing: null, renameValue: '' });
    await get().load();
  },
  create: async () => {
    const createName = get().createName.trim();
    if (!createName) return;
    const report = await resourceApi.createResource('report', createName);
    set({ createName: '', isCreateOpen: false });
    await get().load();
    get().openReport(report.id);
  },
  deleteSelected: async () => {
    const ids = [...get().selectedRowKeys];
    await Promise.all(
      ids.map((id) => resourceApi.removeResource('report', id)),
    );
    set({ selectedRowKeys: [] });
    await get().load();
  },
  load: async () => {
    set({ loading: true });
    try {
      set({ items: await resourceApi.listResources('report') });
    } finally {
      set({ loading: false });
    }
  },
  openCreate: () => set({ isCreateOpen: true }),
  openReport: (id) => useNavigationStore.getState().openReport(id),
  remove: async (id) => {
    await resourceApi.removeResource('report', id);
    set((state) => ({
      selectedRowKeys: state.selectedRowKeys.filter((key) => key !== id),
    }));
    await get().load();
  },
  selectAllFiltered: () =>
    set((state) => ({
      selectedRowKeys: getFilteredResourceIds(state.items, state.searchText),
    })),
  setCreateName: (createName) => set({ createName }),
  setRenameValue: (renameValue) => set({ renameValue }),
  setSearchText: (searchText) => set({ searchText }),
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys }),
  startRename: (editing) => set({ editing, renameValue: editing.name || '' }),
  stopRename: () => set({ editing: null, renameValue: '' }),
}));
