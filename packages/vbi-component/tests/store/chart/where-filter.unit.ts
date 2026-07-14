import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartWhereFilterStore } from 'src/store/chart/where-filter'
import { createTestBuilder } from '../test-helpers'

describe('createChartWhereFilterStore', () => {
  it('should manage adding, updating, finding, and removing where filters and groups', () => {
    const builder = createTestBuilder('where-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const whereStore = createChartWhereFilterStore(chartBuilder)

    expect(whereStore.state.filters).toEqual([])

    whereStore.addFilter('sales', '>=', 100)
    expect(whereStore.state.filters.length).toBe(1)

    const firstFilter = whereStore.state.filters[0] as any
    expect(firstFilter?.field).toBe('sales')
    expect(firstFilter?.op).toBe('>=')
    expect(firstFilter?.value).toBe(100)

    const filterId = firstFilter?.id ?? ''
    const foundNode = whereStore.findFilter(filterId)
    expect(foundNode).toBeDefined()

    whereStore.updateFilter(filterId, { operator: '>', value: 200 })
    expect((whereStore.state.filters[0] as any)?.op).toBe('>')
    expect((whereStore.state.filters[0] as any)?.value).toBe(200)

    whereStore.addGroup('or', (group) => {
      group.add('region', (node: any) => {
        node.setOperator('=')
        node.setValue('North')
      })
    })

    expect(whereStore.state.filters.length).toBe(2)
    const groupClause = whereStore.state.filters[1] as any
    expect(groupClause?.op).toBe('or')
    expect(groupClause?.conditions?.length).toBe(1)

    const groupId = groupClause?.id ?? ''
    const foundGroup = whereStore.findGroup(groupId)
    expect(foundGroup).toBeDefined()

    whereStore.updateGroup(groupId, { operator: 'and' })
    expect((whereStore.state.filters[1] as any)?.op).toBe('and')

    whereStore.addToGroup(groupId, 'category', '=', 'A')
    expect((whereStore.state.filters[1] as any)?.conditions?.length).toBe(2)

    const nestedFilterId = (whereStore.state.filters[1] as any)?.conditions[0]?.id
    whereStore.removeFromGroup(groupId, nestedFilterId)
    expect((whereStore.state.filters[1] as any)?.conditions?.length).toBe(1)

    const flat = whereStore.flattenFilters()
    expect(flat.length).toBe(2) // 1 top-level filter + 1 inside group

    whereStore.removeFilter(filterId)
    expect(whereStore.state.filters.length).toBe(1)

    whereStore.clearFilters()
    expect(whereStore.state.filters.length).toBe(0)

    whereStore.dispose()
    chartBuilder.dispose()
  })
})
