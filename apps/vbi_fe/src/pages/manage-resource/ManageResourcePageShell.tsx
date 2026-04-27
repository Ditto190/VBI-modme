import { Table } from 'antd';
import type { TableProps } from 'antd';
import { useCallback, useMemo } from 'react';
import type { Key, ReactNode } from 'react';
import { useTranslation } from '../../i18n';
import type { ResourceItem } from '../../types';
import { ManageResourceToolbar } from './ManageResourceToolbar';

type Props = {
  children?: ReactNode;
  columns: TableProps<ResourceItem>['columns'];
  createLabel: string;
  dataSource: ResourceItem[];
  loading?: boolean;
  onClearSelection: () => void;
  onCreate: () => void;
  onDeleteSelected: () => Promise<void>;
  onSearchTextChange: (value: string) => void;
  onSelectAllFiltered: () => void;
  searchText: string;
  selectedRowKeys: Key[];
  setSelectedRowKeys(selectedRowKeys: string[]): void;
  title: string;
};

export const ManageResourcePageShell = ({
  children,
  columns,
  createLabel,
  dataSource,
  loading = false,
  onClearSelection,
  onCreate,
  onDeleteSelected,
  onSearchTextChange,
  onSelectAllFiltered,
  searchText,
  selectedRowKeys,
  setSelectedRowKeys,
  title,
}: Props) => {
  const { t } = useTranslation();
  const rowSelection = useMemo<TableProps<ResourceItem>['rowSelection']>(
    () => ({
      selectedRowKeys,
      onChange: (keys) => setSelectedRowKeys(keys.map(String)),
    }),
    [selectedRowKeys, setSelectedRowKeys],
  );
  const deleteSelected = useCallback(async () => {
    if (!selectedRowKeys.length) return;
    await onDeleteSelected();
  }, [onDeleteSelected, selectedRowKeys.length]);

  return (
    <section className="manage-page">
      <header className="manage-page-header">
        <h1 className="manage-title">{title}</h1>
        <div className="manage-stats">
          <div className="manage-stat">
            <div className="manage-stat-value">{dataSource.length}</div>
            <div className="manage-stat-label">{t('common.visible')}</div>
          </div>
          <div className="manage-stat">
            <div className="manage-stat-value">{selectedRowKeys.length}</div>
            <div className="manage-stat-label">{t('common.selected')}</div>
          </div>
        </div>
      </header>
      <ManageResourceToolbar
        createLabel={createLabel}
        onBatchDelete={deleteSelected}
        onClearSelection={onClearSelection}
        onCreate={onCreate}
        onSearchTextChange={onSearchTextChange}
        onSelectAllFiltered={onSelectAllFiltered}
        searchText={searchText}
        selectedRowKeys={selectedRowKeys}
      />
      <div className="manage-table">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          locale={{ emptyText: t('common.noData') }}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          rowSelection={rowSelection}
        />
      </div>
      {children}
    </section>
  );
};
