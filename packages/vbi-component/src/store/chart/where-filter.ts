import { createStore } from '@stencil/store'
import { isVBIFilter, isVBIWhereGroup, type VBIWhereClause, type VBIWhereFilter } from '@visactor/vbi'
import { type ChartBuilderStore } from './builder'

export type WhereNodeLike = {
  setOperator: (operator: string) => unknown
  setValue: (value: unknown) => unknown
  setField: (field: string) => unknown
  getId?: () => string
}

export type WhereNodeMutator = (node: WhereNodeLike) => void

export type WhereGroupLike = {
  setOperator: (operator: 'and' | 'or') => unknown
  add: (field: string, callback: (node: unknown) => void) => unknown
  remove: (idOrIndex: string | number) => unknown
}

export type WhereGroupMutator = (group: WhereGroupLike) => void

export interface ChartWhereFilterState {
  filters: VBIWhereClause[]
}

export interface ChartWhereFilterStore {
  state: ChartWhereFilterState
  onChange: <Key extends keyof ChartWhereFilterState>(
    propName: Key,
    cb: (newValue: ChartWhereFilterState[Key]) => void,
  ) => void
  dispose: () => void
  flattenFilters: () => VBIWhereFilter[]
  addFilter: (field: string, operator?: string, value?: unknown) => void
  addGroup: (op: 'and' | 'or', callback?: WhereGroupMutator) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  updateFilter: (id: string, updates: { operator?: string; value?: unknown }) => void
  findFilter: (id: string) => WhereNodeLike | undefined
  updateGroup: (id: string, updates: { operator?: 'and' | 'or' }) => void
  addToGroup: (groupId: string, field: string, operator?: string, value?: unknown) => void
  removeFromGroup: (groupId: string, idOrIndex: string | number) => void
  findGroup: (id: string) => WhereGroupLike | undefined
}

const flattenWhereClauses = (items: VBIWhereClause[]): VBIWhereFilter[] => {
  const result: VBIWhereFilter[] = []

  const traverse = (clauses: VBIWhereClause[]) => {
    clauses.forEach((item) => {
      if (isVBIFilter(item)) {
        result.push(item)
        return
      }

      if (isVBIWhereGroup(item)) {
        traverse(item.conditions)
      }
    })
  }

  traverse(items)
  return result
}

export function createChartWhereFilterStore(chartBuilder: ChartBuilderStore): ChartWhereFilterStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartWhereFilterState>({
    filters: [],
  })

  const updateState = () => {
    const builder = chartBuilder.builder
    if (builder) {
      state.filters = (builder.whereFilter.toJSON().conditions as VBIWhereClause[]) ?? []
    } else {
      state.filters = []
    }
  }

  updateState()

  const addFilter = (field: string, operator?: string, value?: unknown) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.add(field, (node) => {
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

  const addGroup = (op: 'and' | 'or', callback?: WhereGroupMutator) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.addGroup(op, (group) => {
          callback?.(group as WhereGroupLike)
        })
      })
    }
  }

  const removeFilter = (id: string) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.remove(id)
      })
    }
  }

  const clearFilters = () => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.clear()
      })
    }
  }

  const updateFilter = (id: string, updates: { operator?: string; value?: unknown }) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.update(id, (node) => {
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

  const findFilter = (id: string): WhereNodeLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      const result = builder.whereFilter.find((entry) => entry.getId() === id)
      if (result && 'setValue' in result && 'setField' in result) {
        return result as WhereNodeLike
      }
    }
    return undefined
  }

  const flattenFilters = (): VBIWhereFilter[] => {
    return flattenWhereClauses(state.filters)
  }

  const updateGroup = (id: string, updates: { operator?: 'and' | 'or' }) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.updateGroup(id, (group) => {
          if (updates.operator) {
            group.setOperator(updates.operator)
          }
        })
      })
    }
  }

  const addToGroup = (groupId: string, field: string, operator?: string, value?: unknown) => {
    const builder = chartBuilder.builder
    if (builder) {
      builder.doc.transact(() => {
        builder.whereFilter.updateGroup(groupId, (group) => {
          group.add(field, (node) => {
            const filterNode = node as WhereNodeLike
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
        builder.whereFilter.updateGroup(groupId, (group) => {
          group.remove(idOrIndex)
        })
      })
    }
  }

  const findGroup = (id: string): WhereGroupLike | undefined => {
    const builder = chartBuilder.builder
    if (builder) {
      const result = builder.whereFilter.find((entry) => entry.getId() === id)
      if (result && 'add' in result && 'remove' in result) {
        return result as WhereGroupLike
      }
    }
    return undefined
  }

  let currentBuilder = chartBuilder.builder

  const onDocUpdate = () => {
    updateState()
  }

  if (currentBuilder && currentBuilder.doc) {
    currentBuilder.doc.on('update', onDocUpdate)
  }

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.off('update', onDocUpdate)
      }
      currentBuilder = chartBuilder.builder
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.on('update', onDocUpdate)
      }
    }
    updateState()
  })

  const dispose = () => {
    if (currentBuilder && currentBuilder.doc) {
      currentBuilder.doc.off('update', onDocUpdate)
    }
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
