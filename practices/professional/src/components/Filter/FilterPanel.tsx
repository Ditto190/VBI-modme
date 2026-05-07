import { EmptyFilterRow } from './FilterCardParts'
import { FilterModal } from './FilterModal'
import { FilterPanelCard } from './FilterPanelCard'
import type { FilterField, FilterItem, RootOperator } from './filterTypes'
import { useFilterPanelModel } from './useFilterPanelModel'

export type { FilterField, FilterItem }

interface FilterPanelProps {
  activeFields?: string[]
  fields: FilterField[]
  filters: FilterItem[]
  rootOperator?: RootOperator
  onChange: (filters: FilterItem[]) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const FilterPanel = ({
  activeFields = [],
  fields,
  filters = [],
  rootOperator = 'and',
  onChange,
  onRootOperatorChange,
}: FilterPanelProps) => {
  const model = useFilterPanelModel({ activeFields, fields, filters, onChange })

  return (
    <>
      {filters.length === 0 && <EmptyFilterRow text={model.t('filtersTitle')} onAdd={model.openAdd} />}
      {filters.length > 0 && (
        <FilterPanelCard
          filters={filters}
          editLabel={model.t('filtersEdit')}
          removeLabel={model.t('filtersDelete')}
          rootOperator={rootOperator}
          title={model.t('filtersTitle')}
          onAdd={model.openAdd}
          onDelete={model.remove}
          onEdit={model.openEdit}
          onRootOperatorChange={onRootOperatorChange}
        />
      )}
      <FilterModal
        activeFields={activeFields}
        displayFields={model.displayFields}
        editingIndex={model.editingIndex}
        form={model.form}
        isZh={model.isZh}
        open={model.open}
        operator={model.operator}
        role={model.role}
        selectedField={model.selectedField}
        t={model.t}
        onCancel={model.close}
        onSubmit={() => void model.submit()}
      />
    </>
  )
}
