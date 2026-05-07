import { Card } from 'antd'
import { HavingFilterList } from './HavingFilterList'
import { FilterActions, FilterTitle } from './FilterCardParts'
import type { RootOperator } from './filterTypes'
import type { HavingFilterItem } from './havingTypes'

type HavingFilterPanelCardProps = {
  editText: string
  filters: HavingFilterItem[]
  removeText: string
  rootOperator: RootOperator
  title: string
  onAdd: () => void
  onDelete: (index: number) => void
  onEdit: (index: number) => void
  onRootOperatorChange?: (operator: RootOperator) => void
}

export const HavingFilterPanelCard = (props: HavingFilterPanelCardProps) => (
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
    <HavingFilterList
      filters={props.filters}
      editText={props.editText}
      removeText={props.removeText}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
    />
  </Card>
)
