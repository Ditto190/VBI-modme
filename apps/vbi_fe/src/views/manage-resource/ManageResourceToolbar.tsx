import type { Key } from 'react'
import { useRef } from 'react'
import { Button } from '../../components/ui/button'
import { ConfirmAction } from '../../components/ui/confirm-action'
import { Plus, Search, Trash2, X } from '../../components/ui/icons'
import { Input } from '../../components/ui/input'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'

type Props = {
  createLabel: string
  deleteTitle: string
  onBatchDelete: () => void
  onCreate: () => void
  onSearchTextChange: (value: string) => void
  searchText: string
  selectedRowKeys: Key[]
}

export const ManageResourceToolbar = ({
  createLabel,
  deleteTitle,
  onBatchDelete,
  onCreate,
  onSearchTextChange,
  searchText,
  selectedRowKeys,
}: Props) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const hasSearchText = searchText.trim().length > 0

  return (
    <div className='vbi-motion-soft-reveal vbi-motion-panel flex w-full min-w-0 max-w-full items-center justify-between gap-2 overflow-visible rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] p-2 max-[1100px]:flex-col max-[1100px]:items-start max-[720px]:justify-start'>
      <div
        className={cn(
          'group relative h-8 w-10 max-w-full min-w-10 flex-none origin-left rounded-md transition-[width] duration-500 ease-[var(--vbi-ease-spring)] focus-within:w-[clamp(220px,30vw,340px)] max-[720px]:focus-within:w-full',
          hasSearchText && 'w-[clamp(220px,30vw,340px)] max-[720px]:w-full',
        )}
      >
        <Search className='pointer-events-none absolute left-2.5 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vbi-text-soft)] transition duration-200 group-focus-within:text-[var(--vbi-text)]' />
        <Input
          ref={inputRef}
          aria-label={t('common.searchPlaceholder')}
          className={cn(
            'h-full rounded-md pl-8 pr-2.5 placeholder:text-transparent focus:placeholder:text-[var(--vbi-placeholder)]',
            hasSearchText && 'pr-8',
          )}
          placeholder={t('common.searchPlaceholder')}
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
        {hasSearchText ? (
          <button
            aria-label={t('common.clear')}
            className='absolute right-1.5 top-1/2 z-10 inline-flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-[var(--vbi-text-soft)] transition duration-150 hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--vbi-focus)]'
            type='button'
            onClick={() => {
              onSearchTextChange('')
              inputRef.current?.focus()
            }}
          >
            <X className='h-3 w-3' />
          </button>
        ) : null}
      </div>
      <div className='vbi-motion-stagger ml-auto flex min-w-0 flex-wrap items-center justify-end gap-1.5 max-[1100px]:w-full'>
        {selectedRowKeys.length ? (
          <span className='inline-flex h-6 min-w-6 animate-[vbi-subtle-pop_var(--vbi-motion)_var(--vbi-ease-pop)] items-center justify-center rounded-full border border-[var(--vbi-border)] text-[11px] font-semibold text-[var(--vbi-text-muted)]'>
            {selectedRowKeys.length}
          </span>
        ) : null}
        {selectedRowKeys.length ? (
          <ConfirmAction
            cancelLabel={t('common.cancel')}
            confirmLabel={t('common.delete')}
            message={deleteTitle}
            onConfirm={onBatchDelete}
          >
            <Button
              className='text-[var(--vbi-text-muted)] enabled:hover:border-[color-mix(in_srgb,var(--vbi-danger)_34%,var(--vbi-border))] enabled:hover:text-[var(--vbi-danger)]'
              icon={<Trash2 className='h-3.5 w-3.5' />}
              variant='secondary'
            >
              {t('common.delete')}
            </Button>
          </ConfirmAction>
        ) : (
          <Button
            className='text-[var(--vbi-text-muted)]'
            icon={<Trash2 className='h-3.5 w-3.5' />}
            disabled
            variant='secondary'
          >
            {t('common.delete')}
          </Button>
        )}
        <Button icon={<Plus className='h-3.5 w-3.5' />} variant='primary' onClick={onCreate}>
          {createLabel}
        </Button>
      </div>
    </div>
  )
}
