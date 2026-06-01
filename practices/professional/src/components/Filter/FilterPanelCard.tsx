import { Card, type CardProps } from 'antd'
import type { ComponentType } from 'react'
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
const AntCard = Card as unknown as ComponentType<CardProps>

export const FilterPanelCard = (props: FilterPanelCardProps) => (
  <AntCard
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
  </AntCard>
)
