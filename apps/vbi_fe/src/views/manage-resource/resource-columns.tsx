import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { AppLocale, Translate } from '../../i18n'
import { Button } from '../../components/ui/button'
import { ConfirmAction } from '../../components/ui/confirm-action'
import { Trash2 } from '../../components/ui/icons'
import type { ResourceItem } from '../../types'

export type ResourceColumn = {
  className?: string
  dataIndex?: keyof ResourceItem
  key: string
  render?: (value: unknown, record: ResourceItem) => ReactNode
  title: string
}

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

const createResourceColumns = ({
  deleteTitle,
  fallbackName,
  locale,
  onEdit,
  onOpen,
  onRemove,
  onRename,
  t,
}: ResourceColumnOptions): ResourceColumn[] => [
  {
    title: t('common.name'),
    dataIndex: 'name',
    key: 'name',
    render: (value) => (typeof value === 'string' && value ? value : fallbackName),
  },
  {
    title: t('common.updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    className: 'w-56',
    render: (value) => (typeof value === 'string' ? new Date(value).toLocaleString(locale) : ''),
  },
  {
    title: t('common.actions'),
    className: 'w-44 text-right',
    key: 'actions',
    render: (_, record) => (
      <div className='flex translate-x-0.5 flex-wrap justify-end gap-1.5 opacity-90 transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100'>
        {onOpen ? (
          <Button variant='primary' onClick={() => onOpen(record.id)}>
            {t('common.open')}
          </Button>
        ) : null}
        {onEdit ? <Button onClick={() => onEdit(record.id)}>{t('common.edit')}</Button> : null}
        {onRename ? <Button onClick={() => onRename(record)}>{t('common.rename')}</Button> : null}
        <ConfirmAction
          cancelLabel={t('common.cancel')}
          confirmLabel={t('common.delete')}
          message={deleteTitle}
          onConfirm={() => onRemove(record.id)}
        >
          <Button
            aria-label={t('common.delete')}
            className='text-[var(--vbi-text-soft)] hover:text-[var(--vbi-danger)]'
            size='icon'
            title={t('common.delete')}
            variant='ghost'
          >
            <Trash2 className='h-3.5 w-3.5' />
          </Button>
        </ConfirmAction>
      </div>
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
