import { useCallback, useMemo, useState } from 'react'
import type { Key, ReactNode } from 'react'
import { Button } from '../../components/ui/button'
import { Empty } from '../../components/ui/empty'
import { Spinner } from '../../components/ui/spinner'
import { useTranslation } from '../../i18n'
import type { ResourceItem } from '../../types'
import { ManageResourceToolbar } from './ManageResourceToolbar'
import type { ResourceColumn } from './resource-columns'

const pageSize = 8

type Props = {
  children?: ReactNode
  columns: ResourceColumn[]
  createLabel: string
  dataSource: ResourceItem[]
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
    <section className='manage-page'>
      <header className='manage-page-header'>
        <h1 className='manage-title'>{title}</h1>
        <span className='manage-page-count'>
          {dataSource.length} {t('common.visible')}
        </span>
      </header>
      <ManageResourceToolbar
        createLabel={createLabel}
        onBatchDelete={deleteSelected}
        onCreate={onCreate}
        onSearchTextChange={(value) => {
          setPage(1)
          onSearchTextChange(value)
        }}
        searchText={searchText}
        selectedRowKeys={selectedRowKeys}
      />
      <div className='manage-table'>
        {loading ? (
          <div className='manage-table-loading'>
            <Spinner />
          </div>
        ) : dataSource.length ? (
          <>
            <table className='manage-data-table'>
              <thead>
                <tr>
                  <th aria-label={t('common.selected')}>
                    <input
                      checked={visibleRows.length > 0 && visibleRows.every((row) => selectedIds.has(row.id))}
                      type='checkbox'
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
                    <th className={column.className} key={column.key}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input
                        checked={selectedIds.has(row.id)}
                        type='checkbox'
                        onChange={(event) => setRowSelected(row.id, event.target.checked)}
                      />
                    </td>
                    {columns.map((column) => {
                      const value = column.dataIndex ? row[column.dataIndex] : undefined
                      return (
                        <td className={column.className} key={column.key}>
                          {column.render ? column.render(value, row) : String(value ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='manage-pagination'>
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
          <div className='manage-table-empty'>
            <Empty description={t('common.noData')} />
          </div>
        )}
      </div>
      {children}
    </section>
  )
}
