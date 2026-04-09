import { create } from 'zustand';
import {
  createResource,
  listResources,
  removeResource,
  renameResource,
} from '../services/resourceApi';
import { useNavigationStore } from './navigation.store';
import type { ResourceItem } from '../types';

type ReportsState = {
  createName: string;
  editing: ResourceItem | null;
  isCreateOpen: boolean;
  items: ResourceItem[];
  loading: boolean;
  renameValue: string;
  closeCreate(): void;
  confirmRename(): Promise<void>;
  create(): Promise<void>;
  load(): Promise<void>;
  openCreate(): void;
  openReport(id: string): void;
  remove(id: string): Promise<void>;
  setCreateName(createName: string): void;
  setRenameValue(renameValue: string): void;
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
  closeCreate: () => set({ isCreateOpen: false }),
  confirmRename: async () => {
    const { editing, renameValue } = get();
    if (!editing) return;
    await renameResource(
      'report',
      editing.id,
      renameValue.trim() || editing.name || 'Untitled Report',
    );
    set({ editing: null, renameValue: '' });
    await get().load();
  },
  create: async () => {
    const createName = get().createName.trim();
    if (!createName) return;
    const report = await createResource('report', createName);
    set({ createName: '', isCreateOpen: false });
    await get().load();
    get().openReport(report.id);
  },
  load: async () => {
    set({ loading: true });
    try {
      set({ items: await listResources('report') });
    } finally {
      set({ loading: false });
    }
  },
  openCreate: () => set({ isCreateOpen: true }),
  openReport: (id) => useNavigationStore.getState().openReport(id),
  remove: async (id) => {
    await removeResource('report', id);
    await get().load();
  },
  setCreateName: (createName) => set({ createName }),
  setRenameValue: (renameValue) => set({ renameValue }),
  startRename: (editing) => set({ editing, renameValue: editing.name || '' }),
  stopRename: () => set({ editing: null, renameValue: '' }),
}));

export const getReportsSnapshot = () => {
  const state = useReportsStore.getState();
  return {
    createName: state.createName,
    editingId: state.editing?.id ?? '',
    isCreateOpen: state.isCreateOpen,
    items: state.items,
    loading: state.loading,
    renameValue: state.renameValue,
  };
};
