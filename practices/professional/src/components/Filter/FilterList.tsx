import { FilterChip, FilterChipList } from './FilterChip'
import type { FilterItem } from './filterTypes'
import { filterLabel } from './filterValue'

type FilterListProps = {
  editLabel: string
  filters: FilterItem[]
  removeLabel: string
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}

export const FilterList = (props: FilterListProps) => (
  <FilterChipList>
    {props.filters.map((item, index) => (
      <FilterChip
        editLabel={props.editLabel}
        key={`${item.field}-${item.operator}-${index}`}
        removeLabel={props.removeLabel}
        onDelete={() => props.onDelete(index)}
        onEdit={() => props.onEdit(index)}
      >
        <FilterChipContent item={item} />
      </FilterChip>
    ))}
  </FilterChipList>
)

const FilterChipContent = ({ item }: { item: FilterItem }) =>
  item.operator === 'between' ? (
    <span className='pro-filter-chip__full'>{filterLabel(item)}</span>
  ) : (
    <>
      <span className='pro-filter-chip__field'>{item.field}</span>
      <span className='pro-filter-chip__op'>{item.operator}</span>
      <span className='pro-filter-chip__value'>{formatValue(item.value)}</span>
    </>
  )

const formatValue = (value: unknown) => (Array.isArray(value) ? value.join(', ') : String(value))
