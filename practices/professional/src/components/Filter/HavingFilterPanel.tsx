import { EmptyFilterRow } from './FilterCardParts'
import { HavingFilterModal } from './HavingFilterModal'
import { HavingFilterPanelCard } from './HavingFilterPanelCard'
import type { RootOperator } from './filterTypes'
import type { HavingField, HavingFilterItem } from './havingTypes'
import { useHavingFilterPanelModel } from './useHavingFilterPanelModel'

export type { HavingField, HavingFilterItem }

interface HavingFilterPanelProps {
  fields: HavingField[]
  filters: HavingFilterItem[]
  rootOperator?: RootOperator
  onChange: (filters: HavingFilterItem[]) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const HavingFilterPanel = ({
  fields,
  filters,
  rootOperator = 'and',
  onChange,
  onRootOperatorChange,
}: HavingFilterPanelProps) => {
  const model = useHavingFilterPanelModel({ fields, filters, onChange })

  return (
    <>
      {filters.length === 0 && <EmptyFilterRow text={model.title} onAdd={model.openAdd} />}
      {filters.length > 0 && (
        <HavingFilterPanelCard
          filters={filters}
          editText={model.isZh ? '编辑' : 'Edit'}
          removeText={model.isZh ? '删除' : 'Delete'}
          rootOperator={rootOperator}
          title={model.title}
          onAdd={model.openAdd}
          onDelete={model.remove}
          onEdit={model.openEdit}
          onRootOperatorChange={onRootOperatorChange}
        />
      )}
      <HavingFilterModal
        aggregateOptions={model.aggregateOptions}
        editingIndex={model.editingIndex}
        fields={fields}
        form={model.form}
        isZh={model.isZh}
        open={model.open}
        operator={model.operator}
        selectedAggregate={model.selectedAggregate}
        onCancel={model.close}
        onFieldChange={model.onFieldChange}
        onSubmit={() => void model.submit()}
      />
    </>
  )
}
