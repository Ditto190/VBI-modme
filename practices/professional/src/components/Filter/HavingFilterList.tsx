import { FilterChip, FilterChipList } from './FilterChip'
import type { HavingFilterItem } from './havingTypes'

type HavingFilterListProps = {
  editText: string
  filters: HavingFilterItem[]
  removeText: string
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}

export const HavingFilterList = (props: HavingFilterListProps) => (
  <FilterChipList>
    {props.filters.map((item, index) => (
      <FilterChip
        editLabel={props.editText}
        key={`${item.field}-${item.operator}-${index}`}
        removeLabel={props.removeText}
        onDelete={() => props.onDelete(index)}
        onEdit={() => props.onEdit(index)}
      >
        <span className='pro-filter-chip__field'>{`${item.aggregate.func}(${item.field})`}</span>
        <span className='pro-filter-chip__op'>{item.operator}</span>
        <span className='pro-filter-chip__value'>{formatHavingValue(item)}</span>
      </FilterChip>
    ))}
  </FilterChipList>
)

const formatHavingValue = (item: HavingFilterItem) =>
  item.operator === 'between' ? JSON.stringify(item.value) : String(item.value)
