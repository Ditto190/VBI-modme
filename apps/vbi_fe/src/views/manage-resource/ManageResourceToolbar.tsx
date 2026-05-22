import type { Key } from 'react'
import { Button } from '../../components/ui/button'
import { Plus, Search, Trash2 } from '../../components/ui/icons'
import { Input } from '../../components/ui/input'
import { useTranslation } from '../../i18n'

type Props = {
  createLabel: string
  onBatchDelete: () => void
  onCreate: () => void
  onSearchTextChange: (value: string) => void
  searchText: string
  selectedRowKeys: Key[]
}

export const ManageResourceToolbar = ({
  createLabel,
  onBatchDelete,
  onCreate,
  onSearchTextChange,
  searchText,
  selectedRowKeys,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className='manage-toolbar'>
      <div className='manage-search'>
        <div className='manage-search-frame'>
          <Search className='manage-search-icon h-3.5 w-3.5' />
          <Input
            className='manage-search-input'
            placeholder={t('common.searchPlaceholder')}
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
          />
        </div>
      </div>
      <div className='manage-toolbar-actions'>
        {selectedRowKeys.length ? <span className='manage-selection-count'>{selectedRowKeys.length}</span> : null}
        <Button
          className='manage-batch-delete'
          icon={<Trash2 className='h-3.5 w-3.5' />}
          disabled={!selectedRowKeys.length}
          variant='secondary'
          onClick={onBatchDelete}
        >
          {t('common.delete')}
        </Button>
        <Button icon={<Plus className='h-3.5 w-3.5' />} variant='primary' onClick={onCreate}>
          {createLabel}
        </Button>
      </div>
    </div>
  )
}
