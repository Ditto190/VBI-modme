import {
  CheckSquareOutlined,
  DeleteOutlined,
  PlusOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import type { Key } from 'react';
import { useTranslation } from '../../i18n';

type Props = {
  createLabel: string;
  onBatchDelete: () => void;
  onClearSelection: () => void;
  onCreate: () => void;
  onSearchTextChange: (value: string) => void;
  onSelectAllFiltered: () => void;
  searchText: string;
  selectedRowKeys: Key[];
};

export const ManageResourceToolbar = ({
  createLabel,
  onBatchDelete,
  onClearSelection,
  onCreate,
  onSearchTextChange,
  onSelectAllFiltered,
  searchText,
  selectedRowKeys,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="manage-toolbar">
      <div className="manage-search">
        <Input.Search
          allowClear
          placeholder={t('common.searchPlaceholder')}
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </div>
      <Space wrap>
        <Button icon={<CheckSquareOutlined />} onClick={onSelectAllFiltered}>
          {t('common.selectFiltered')}
        </Button>
        <Button
          icon={<StopOutlined />}
          onClick={onClearSelection}
          disabled={!selectedRowKeys.length}
        >
          {t('common.clear')}
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          disabled={!selectedRowKeys.length}
          onClick={onBatchDelete}
        >
          {t('common.delete')}
        </Button>
        <Button icon={<PlusOutlined />} type="primary" onClick={onCreate}>
          {createLabel}
        </Button>
      </Space>
    </div>
  );
};
