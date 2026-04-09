import { Modal, message } from 'antd';
import type { Key } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ResourceItem } from '../../types';

export const matchesResourceSearch = (item: ResourceItem, query: string) => {
  const value = query.trim().toLowerCase();
  if (!value) return true;
  return [item.id, item.name ?? ''].some((field) =>
    field.toLowerCase().includes(value),
  );
};

export const useResourceList = (loadItems: () => Promise<ResourceItem[]>) => {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const reload = useCallback(async () => {
    try {
      setItems(await loadItems());
    } catch (error) {
      console.error(error);
    }
  }, [loadItems]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [reload]);

  const filteredItems = useMemo(
    () => items.filter((item) => matchesResourceSearch(item, searchText)),
    [items, searchText],
  );

  return {
    filteredItems,
    reload,
    searchText,
    selectedRowKeys,
    setSearchText,
    setSelectedRowKeys,
  };
};

type DeleteResourcesOptions = {
  deleteOne: (id: string) => Promise<unknown>;
  ids: string[];
  onSuccess?: (deletedIds: string[]) => void;
  reload: () => Promise<void>;
  resourceLabel: string;
};

export const deleteResources = async ({
  deleteOne,
  ids,
  onSuccess,
  reload,
  resourceLabel,
}: DeleteResourcesOptions) => {
  const results = await Promise.allSettled(ids.map((id) => deleteOne(id)));
  const failedCount = results.filter(
    (result) => result.status === 'rejected',
  ).length;
  const succeededIds = ids.filter(
    (_id, index) => results[index]?.status === 'fulfilled',
  );

  if (succeededIds.length > 0) {
    onSuccess?.(succeededIds);
    await reload();
  }

  if (failedCount === 0 && succeededIds.length > 0) {
    message.success(`已删除 ${succeededIds.length} 个 ${resourceLabel}`);
    return;
  }
  if (failedCount > 0 && succeededIds.length > 0) {
    message.warning(
      `已删除 ${succeededIds.length} 个 ${resourceLabel}，${failedCount} 个失败`,
    );
  }
};

type ConfirmBatchDeleteOptions = DeleteResourcesOptions & {
  title: string;
};

export const confirmBatchDelete = ({
  title,
  ...options
}: ConfirmBatchDeleteOptions) => {
  if (!options.ids.length) return;
  Modal.confirm({
    title,
    content: `确认删除选中的 ${options.ids.length} 个 ${options.resourceLabel} 吗？`,
    okText: '删除',
    okButtonProps: { danger: true },
    onOk: async () => {
      try {
        await deleteResources(options);
      } catch (error) {
        console.error(error);
      }
    },
  });
};
