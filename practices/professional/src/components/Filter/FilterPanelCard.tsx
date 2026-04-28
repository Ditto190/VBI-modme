import { Card } from 'antd'
import { FilterList } from './FilterList'
import { FilterActions, FilterTitle } from './FilterCardParts'
import type { FilterItem, RootOperator } from './filterTypes'

type FilterPanelCardProps = {
  editLabel: string
  filters: FilterItem[]
  removeLabel: string
  rootOperator: RootOperator
  title: string
  onAdd: () => void
  onDelete: (index: number) => void
  onEdit: (index: number) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const FilterPanelCard = (props: FilterPanelCardProps) => (
  <Card
    className='pro-filter-card'
    size='small'
    title={<FilterTitle text={props.title} />}
    extra={
      <FilterActions
        rootOperator={props.rootOperator}
        onAdd={props.onAdd}
        onRootOperatorChange={props.onRootOperatorChange}
      />
    }
  >
    <FilterList
      filters={props.filters}
      editLabel={props.editLabel}
      removeLabel={props.removeLabel}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
    />
  </Card>
)
