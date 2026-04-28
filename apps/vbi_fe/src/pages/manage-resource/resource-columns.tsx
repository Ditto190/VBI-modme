import { Button, Popconfirm, Space } from 'antd'
import type { TableProps } from 'antd'
import { useMemo } from 'react'
import type { AppLocale, Translate } from '../../i18n'
import type { ResourceItem } from '../../types'

type ResourceColumnOptions = {
  deleteTitle: string
  fallbackName: string
  locale: AppLocale
  onEdit?: (id: string) => void | Promise<void>
  onOpen?: (id: string) => void
  onRemove: (id: string) => Promise<void>
  onRename?: (item: ResourceItem) => void
  t: Translate
}

export const createResourceColumns = ({
  deleteTitle,
  fallbackName,
  locale,
  onEdit,
  onOpen,
  onRemove,
  onRename,
  t,
}: ResourceColumnOptions): TableProps<ResourceItem>['columns'] => [
  {
    title: t('common.name'),
    dataIndex: 'name',
    key: 'name',
    render: (value: string | null) => value || fallbackName,
  },
  {
    title: t('common.updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (value: string) => new Date(value).toLocaleString(locale),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    render: (_: unknown, record: ResourceItem) => (
      <Space>
        {onOpen ? (
          <Button type='primary' onClick={() => onOpen(record.id)}>
            {t('common.open')}
          </Button>
        ) : null}
        {onEdit ? <Button onClick={() => onEdit(record.id)}>{t('common.edit')}</Button> : null}
        {onRename ? <Button onClick={() => onRename(record)}>{t('common.rename')}</Button> : null}
        <Popconfirm title={deleteTitle} onConfirm={() => onRemove(record.id)}>
          <Button danger>{t('common.delete')}</Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export const useResourceColumns = ({
  deleteTitle,
  fallbackName,
  locale,
  onEdit,
  onOpen,
  onRemove,
  onRename,
  t,
}: ResourceColumnOptions) =>
  useMemo(
    () =>
      createResourceColumns({
        deleteTitle,
        fallbackName,
        locale,
        onEdit,
        onOpen,
        onRemove,
        onRename,
        t,
      }),
    [deleteTitle, fallbackName, locale, onEdit, onOpen, onRemove, onRename, t],
  )
