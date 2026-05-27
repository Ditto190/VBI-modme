import { useCallback, useMemo, useState } from 'react'
import type { Key, ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import { CenteredState } from '../../components/ui/centered-state'
import { Checkbox } from '../../components/ui/checkbox'
import { Empty } from '../../components/ui/empty'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'
import type { ResourceItem } from '../../types'
import { ManageResourceToolbar } from './ManageResourceToolbar'
import type { ResourceColumn } from './resource-columns'

const pageSize = 8
const tableHeadClassName =
  'border-b border-[var(--vbi-row-border)] bg-[var(--vbi-table-head)] px-3 py-2.5 text-left align-middle text-[10px] font-semibold text-[var(--vbi-text-muted)]'
const tableCellClassName =
  'border-b border-[var(--vbi-row-border)] px-3 py-2.5 text-left align-middle text-xs text-[var(--vbi-text)]'

type Props = {
  children?: ReactNode
  columns: ResourceColumn[]
  createLabel: string
  dataSource: ResourceItem[]
  deleteTitle: string
  loading?: boolean
  onCreate: () => void
  onDeleteSelected: () => Promise<void>
  onSearchTextChange: (value: string) => void
  searchText: string
  selectedRowKeys: Key[]
  setSelectedRowKeys(selectedRowKeys: string[]): void
  title: string
}

export const ManageResourcePageShell = ({
  children,
  columns,
  createLabel,
  dataSource,
  deleteTitle,
  loading = false,
  onCreate,
  onDeleteSelected,
  onSearchTextChange,
  searchText,
  selectedRowKeys,
  setSelectedRowKeys,
  title,
}: Props) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const selectedIds = useMemo(() => new Set(selectedRowKeys.map(String)), [selectedRowKeys])
  const pageCount = Math.max(1, Math.ceil(dataSource.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visibleRows = useMemo(
    () => dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, dataSource],
  )
  const deleteSelected = useCallback(async () => {
    if (!selectedRowKeys.length) return
    await onDeleteSelected()
  }, [onDeleteSelected, selectedRowKeys.length])
  const setRowSelected = (id: string, selected: boolean) => {
    setSelectedRowKeys(selected ? [...new Set([...selectedIds, id])] : [...selectedIds].filter((key) => key !== id))
  }

  return (
    <section className='vbi-motion-presence mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1200px] min-w-0 flex-col gap-2 max-[720px]:min-h-0'>
      <header className='vbi-motion-soft-reveal flex min-h-8 w-full min-w-0 items-center justify-end gap-2.5 pb-2'>
        <h1 className='sr-only'>{title}</h1>
        <span className='text-xs text-[var(--vbi-text-muted)]'>
          {dataSource.length} {t('common.visible')}
        </span>
      </header>
      <ManageResourceToolbar
        createLabel={createLabel}
        deleteTitle={deleteTitle}
        onBatchDelete={deleteSelected}
        onCreate={onCreate}
        onSearchTextChange={(value) => {
          setPage(1)
          onSearchTextChange(value)
        }}
        searchText={searchText}
        selectedRowKeys={selectedRowKeys}
      />
      <div className='vbi-motion-panel w-full min-w-0 overflow-auto rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-secondary)] shadow-[var(--vbi-shadow)]'>
        {loading ? (
          <CenteredState>
            <Spinner />
          </CenteredState>
        ) : dataSource.length ? (
          <>
            <table className='w-full min-w-[720px] table-fixed border-collapse bg-[var(--vbi-secondary)]'>
              <thead>
                <tr>
                  <th className={cn('w-11', tableHeadClassName)} aria-label={t('common.selected')}>
                    <Checkbox
                      checked={visibleRows.length > 0 && visibleRows.every((row) => selectedIds.has(row.id))}
                      onChange={(event) => {
                        const nextIds = new Set(selectedIds)
                        visibleRows.forEach((row) => {
                          if (event.target.checked) nextIds.add(row.id)
                          else nextIds.delete(row.id)
                        })
                        setSelectedRowKeys([...nextIds])
                      }}
                    />
                  </th>
                  {columns.map((column) => (
                    <th className={cn(tableHeadClassName, column.className)} key={column.key}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, rowIndex) => (
                  <tr
                    className='vbi-motion-row group transition duration-150 ease-out hover:bg-[var(--vbi-hover-bg)] hover:shadow-[inset_2px_0_0_var(--vbi-primary)]'
                    key={row.id}
                    style={{ animationDelay: `${Math.min(rowIndex, 7) * 24}ms` }}
                  >
                    <td className={cn('w-11', tableCellClassName)}>
                      <Checkbox
                        checked={selectedIds.has(row.id)}
                        onChange={(event) => setRowSelected(row.id, event.target.checked)}
                      />
                    </td>
                    {columns.map((column) => {
                      const value = column.dataIndex ? row[column.dataIndex] : undefined
                      return (
                        <td className={cn(tableCellClassName, column.className)} key={column.key}>
                          {column.render ? column.render(value, row) : String(value ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex items-center justify-end gap-2 px-2.5 py-2 text-[11px] text-[var(--vbi-text-muted)]'>
              <Button disabled={currentPage <= 1} size='sm' onClick={() => setPage((value) => Math.max(1, value - 1))}>
                {t('common.previous')}
              </Button>
              <span>
                {currentPage} / {pageCount}
              </span>
              <Button
                disabled={currentPage >= pageCount}
                size='sm'
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              >
                {t('common.next')}
              </Button>
            </div>
          </>
        ) : (
          <CenteredState>
            <Empty description={t('common.noData')} />
          </CenteredState>
        )}
      </div>
      {children}
    </section>
  )
}
