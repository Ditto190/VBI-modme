import { createStore } from '@stencil/store'
import {
  isVBIHavingFilter,
  isVBIHavingGroup,
  type VBIHavingAggregate,
  type VBIHavingClause,
  type VBIHavingFilter,
} from '@visactor/vbi'
import { type ChartBuilderStore } from './builder'

export type HavingFilterNodeLike = {
  setAggregate: (aggregate: VBIHavingAggregate) => unknown
  setOperator: (operator: string) => unknown
  setValue: (value: unknown) => unknown
  getId?: () => string
}

export type HavingFilterNodeMutator = (node: HavingFilterNodeLike) => void

export type HavingGroupLike = {
  setOperator: (operator: 'and' | 'or') => unknown
  add: (field: string, callback: (node: HavingFilterNodeLike) => void) => unknown
  remove: (idOrIndex: string | number) => unknown
}

export type HavingGroupMutator = (group: HavingGroupLike) => void

export interface ChartHavingFilterState {
  filters: VBIHavingClause[]
}

export interface ChartHavingFilterStore {
  state: ChartHavingFilterState
  onChange: <Key extends keyof ChartHavingFilterState>(
    propName: Key,
    cb: (newValue: ChartHavingFilterState[Key]) => void,
  ) => void
  dispose: () => void
  flattenFilters: () => VBIHavingFilter[]
  addFilter: (field: string, aggregate?: VBIHavingAggregate, operator?: string, value?: unknown) => void
  addGroup: (op: 'and' | 'or', callback?: HavingGroupMutator) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  updateFilter: (
    id: string,
    updates: {
      aggregate?: VBIHavingAggregate
      operator?: string
      value?: unknown
    },
  ) => void
  findFilter: (id: string) => HavingFilterNodeLike | undefined
  updateGroup: (id: string, updates: { operator?: 'and' | 'or' }) => void
  addToGroup: (
    groupId: string,
    field: string,
    aggregate?: VBIHavingAggregate,
    operator?: string,
    value?: unknown,
  ) => void
  removeFromGroup: (groupId: string, idOrIndex: string | number) => void
  findGroup: (id: string) => HavingGroupLike | undefined
}

const flattenHavingClauses = (items: VBIHavingClause[]): VBIHavingFilter[] => {
  const result: VBIHavingFilter[] = []

  const traverse = (clauses: VBIHavingClause[]) => {
    clauses.forEach((item) => {
      if (isVBIHavingFilter(item)) {
        result.push(item)
        return
      }

      if (isVBIHavingGroup(item)) {
        traverse(item.conditions)
      }
    })
  }

  traverse(items)
  return result
}

export function createChartHavingFilterStore(chartBuilder: ChartBuilderStore): ChartHavingFilterStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartHavingFilterState>({
    filters: [],
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder) {
      state.filters = (builder.havingFilter.toJSON().conditions as VBIHavingClause[]) ?? []
    } else {
      state.filters = []
    }
  }

  updateState()

  const addFilter = (field: string, aggregate?: VBIHavingAggregate, operator?: string, value?: unknown) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.add(field, (node) => {
          if (aggregate) {
            node.setAggregate(aggregate)
          }
          if (operator) {
            node.setOperator(operator)
          }
          if (value !== undefined) {
            node.setValue(value)
          }
        })
      })
    }
  }

  const addGroup = (op: 'and' | 'or', callback?: HavingGroupMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.addGroup(op, (group) => {
          callback?.(group as HavingGroupLike)
        })
      })
    }
  }

  const removeFilter = (id: string) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.remove(id)
      })
    }
  }

  const clearFilters = () => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.clear()
      })
    }
  }

  const updateFilter = (
    id: string,
    updates: {
      aggregate?: VBIHavingAggregate
      operator?: string
      value?: unknown
    },
  ) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.update(id, (node) => {
          if (updates.aggregate) {
            node.setAggregate(updates.aggregate)
          }
          if (updates.operator) {
            node.setOperator(updates.operator)
          }
          if (updates.value !== undefined) {
            node.setValue(updates.value)
          }
        })
      })
    }
  }

  const findFilter = (id: string): HavingFilterNodeLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      const result = builder.havingFilter.find((entry) => entry.getId() === id)
      if (result && 'setAggregate' in result && 'setValue' in result) {
        return result as HavingFilterNodeLike
      }
    }
    return undefined
  }

  const flattenFilters = (): VBIHavingFilter[] => {
    return flattenHavingClauses(state.filters)
  }

  const updateGroup = (id: string, updates: { operator?: 'and' | 'or' }) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.updateGroup(id, (group) => {
          if (updates.operator) {
            group.setOperator(updates.operator)
          }
        })
      })
    }
  }

  const addToGroup = (
    groupId: string,
    field: string,
    aggregate?: VBIHavingAggregate,
    operator?: string,
    value?: unknown,
  ) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.updateGroup(groupId, (group) => {
          group.add(field, (node) => {
            const filterNode = node as HavingFilterNodeLike
            if (aggregate) {
              filterNode.setAggregate(aggregate)
            }
            if (operator) {
              filterNode.setOperator(operator)
            }
            if (value !== undefined) {
              filterNode.setValue(value)
            }
          })
        })
      })
    }
  }

  const removeFromGroup = (groupId: string, idOrIndex: string | number) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.havingFilter.updateGroup(groupId, (group) => {
          group.remove(idOrIndex)
        })
      })
    }
  }

  const findGroup = (id: string): HavingGroupLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      const result = builder.havingFilter.find((entry) => entry.getId() === id)
      if (result && 'add' in result && 'remove' in result) {
        return result as HavingGroupLike
      }
    }
    return undefined
  }

  // Sync state
  let currentBuilder = chartBuilder.builder
  let unobserveHavingFilter = currentBuilder?.havingFilter
    ? currentBuilder.havingFilter.observe(updateState)
    : undefined

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      unobserveHavingFilter?.()
      currentBuilder = chartBuilder.builder
      unobserveHavingFilter = currentBuilder.havingFilter.observe(updateState)
      updateState()
    }
  })

  const dispose = () => {
    unobserveHavingFilter?.()
    unobserveHavingFilter = undefined
    storeDispose()
  }

  return {
    state,
    onChange,
    dispose,
    flattenFilters,
    addFilter,
    addGroup,
    removeFilter,
    clearFilters,
    updateFilter,
    findFilter,
    updateGroup,
    addToGroup,
    removeFromGroup,
    findGroup,
  }
}
