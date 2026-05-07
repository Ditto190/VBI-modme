import { isVBIHavingFilter, type VBIChartBuilder, type VBIHavingAggregate } from '@visactor/vbi'
import { FilterPanel, type FilterItem } from 'src/components/Filter/FilterPanel'
import { HavingFilterPanel } from 'src/components/Filter/HavingFilterPanel'
import { useVBIHavingFilter, useVBIWhereFilter } from 'src/hooks'
import type { SchemaField } from 'src/types'

type ChartFiltersProps = {
  builder: VBIChartBuilder
  fields: SchemaField[]
}

export const ChartFilters = ({ builder, fields }: ChartFiltersProps) => {
  const where = useVBIWhereFilter(builder)
  const having = useVBIHavingFilter(builder)
  const filterFields = fields.map(({ name, role }) => ({ name, role }))
  const activeFields = fields.map((field) => field.name)
  const whereFilters: FilterItem[] = where.flatFilters.map((filter) => ({
    field: filter.field,
    operator: filter.op,
    value: filter.value,
  }))
  const havingFilters = having.filters.filter(isVBIHavingFilter).map((filter) => ({
    aggregate: filter.aggregate,
    field: filter.field,
    operator: filter.op,
    value: filter.value,
  }))

  return (
    <div className='pro-chart-filters'>
      <FilterPanel
        activeFields={activeFields}
        fields={filterFields}
        filters={whereFilters}
        rootOperator={where.rootOperator}
        onChange={where.replaceFilters}
        onRootOperatorChange={where.setRootOperator}
      />
      <HavingFilterPanel
        fields={filterFields}
        filters={havingFilters}
        rootOperator={having.rootOperator}
        onChange={(filters) =>
          having.replaceFilters(
            filters.map((filter) => ({
              aggregate: filter.aggregate as VBIHavingAggregate,
              field: filter.field,
              operator: filter.operator,
              value: filter.value,
            })),
          )
        }
        onRootOperatorChange={having.setRootOperator}
      />
    </div>
  )
}
