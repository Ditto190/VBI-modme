import { describe, expect, it } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartHavingFilterStore } from 'src/store/chart/having-filter'
import { createTestBuilder } from '../test-helpers'

describe('createChartHavingFilterStore', () => {
  it('should manage adding, updating, finding, and removing having filters and groups', () => {
    const builder = createTestBuilder('having-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const havingStore = createChartHavingFilterStore(chartBuilder)

    expect(havingStore.state.filters).toEqual([])

    havingStore.addFilter('profit', { func: 'sum' }, '>', 500)
    expect(havingStore.state.filters.length).toBe(1)

    const firstFilter = havingStore.state.filters[0] as any
    expect(firstFilter?.field).toBe('profit')
    expect(firstFilter?.aggregate).toEqual({ func: 'sum' })
    expect(firstFilter?.op).toBe('>')
    expect(firstFilter?.value).toBe(500)

    const filterId = firstFilter?.id ?? ''
    const foundNode = havingStore.findFilter(filterId)
    expect(foundNode).toBeDefined()

    havingStore.updateFilter(filterId, { aggregate: { func: 'avg' }, operator: '>=', value: 300 })
    expect((havingStore.state.filters[0] as any)?.aggregate).toEqual({ func: 'avg' })
    expect((havingStore.state.filters[0] as any)?.op).toBe('>=')
    expect((havingStore.state.filters[0] as any)?.value).toBe(300)

    havingStore.addGroup('or', (group) => {
      group.add('sales', (node: any) => {
        node.setAggregate({ func: 'max' })
        node.setOperator('<')
        node.setValue(1000)
      })
    })

    expect(havingStore.state.filters.length).toBe(2)
    const groupClause = havingStore.state.filters[1] as any
    expect(groupClause?.op).toBe('or')
    expect(groupClause?.conditions?.length).toBe(1)

    const groupId = groupClause?.id ?? ''
    const foundGroup = havingStore.findGroup(groupId)
    expect(foundGroup).toBeDefined()

    havingStore.updateGroup(groupId, { operator: 'and' })
    expect((havingStore.state.filters[1] as any)?.op).toBe('and')

    havingStore.addToGroup(groupId, 'sales', { func: 'min' }, '>', 50)
    expect((havingStore.state.filters[1] as any)?.conditions?.length).toBe(2)

    const nestedFilterId = (havingStore.state.filters[1] as any)?.conditions[0]?.id
    havingStore.removeFromGroup(groupId, nestedFilterId)
    expect((havingStore.state.filters[1] as any)?.conditions?.length).toBe(1)

    const flat = havingStore.flattenFilters()
    expect(flat.length).toBe(2)

    havingStore.removeFilter(filterId)
    expect(havingStore.state.filters.length).toBe(1)

    havingStore.clearFilters()
    expect(havingStore.state.filters.length).toBe(0)

    havingStore.dispose()
    chartBuilder.dispose()
  })
})
