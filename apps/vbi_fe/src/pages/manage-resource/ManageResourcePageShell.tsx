import { Button, Input, Space, Table, Typography } from 'antd';
import type { Key, ReactNode } from 'react';
import type { TableProps } from 'antd';
import type { ResourceItem } from '../../types';

type Props = {
  children?: ReactNode;
  columns: TableProps<ResourceItem>['columns'];
  createLabel: string;
  dataSource: ResourceItem[];
  onBatchDelete: () => void;
  onClearSelection: () => void;
  onCreate: () => void;
  onSearchTextChange: (value: string) => void;
  onSelectAllFiltered: () => void;
  rowSelection: TableProps<ResourceItem>['rowSelection'];
  searchText: string;
  selectedRowKeys: Key[];
  title: string;
};

export const ManageResourcePageShell = ({
  children,
  columns,
  createLabel,
  dataSource,
  onBatchDelete,
  onClearSelection,
  onCreate,
  onSearchTextChange,
  onSelectAllFiltered,
  rowSelection,
  searchText,
  selectedRowKeys,
  title,
}: Props) => (
  <div style={{ padding: 24 }}>
    <Space
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'start',
      }}
    >
      <Space orientation="vertical" size={8} style={{ flex: 1 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        <Input.Search
          allowClear
          placeholder="搜索名称或 ID"
          style={{ maxWidth: 360 }}
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </Space>
      <Space wrap>
        <Button onClick={onSelectAllFiltered}>全选筛选结果</Button>
        <Button onClick={onClearSelection} disabled={!selectedRowKeys.length}>
          取消选择
        </Button>
        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={onBatchDelete}
        >
          批量删除
        </Button>
        <Button type="primary" onClick={onCreate}>
          {createLabel}
        </Button>
      </Space>
    </Space>
    <Table
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
      rowSelection={rowSelection}
    />
    {children}
  </div>
);
