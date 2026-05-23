import type { ResourceItem } from '../types'
import { matchesResourceSearch } from '../utils/resource-list'

type SetState<TState> = (partial: Partial<TState> | TState | ((state: TState) => Partial<TState> | TState)) => void

export type ResourceListState = {
  filteredItems: ResourceItem[]
  items: ResourceItem[]
  searchText: string
  selectedRowKeys: string[]
}

export type ResourceListActions = {
  clearSelection(): void
  selectAllFiltered(): void
  setSearchText(searchText: string): void
  setSelectedRowKeys(selectedRowKeys: string[]): void
}

type LoadableResourceListState = ResourceListState & {
  loading: boolean
}

export const createResourceListState = (): ResourceListState => ({
  filteredItems: [],
  items: [],
  searchText: '',
  selectedRowKeys: [],
})

const getFilteredItems = (items: ResourceItem[], searchText: string) =>
  items.filter((item) => matchesResourceSearch(item, searchText))

const setResourceItems = (state: ResourceListState, items: ResourceItem[]) => ({
  filteredItems: getFilteredItems(items, state.searchText),
  items,
})

const setResourceSearchText = (state: ResourceListState, searchText: string) => ({
  filteredItems: getFilteredItems(state.items, searchText),
  searchText,
})

const selectFilteredResourceIds = (state: ResourceListState) => ({
  selectedRowKeys: getFilteredItems(state.items, state.searchText).map((item) => item.id),
})

export const createResourceListActions = <TState extends ResourceListState>(
  set: SetState<TState>,
): ResourceListActions => ({
  clearSelection: () => set({ selectedRowKeys: [] } as unknown as Partial<TState>),
  selectAllFiltered: () => set((state) => selectFilteredResourceIds(state) as Partial<TState>),
  setSearchText: (searchText) => set((state) => setResourceSearchText(state, searchText) as Partial<TState>),
  setSelectedRowKeys: (selectedRowKeys) => set({ selectedRowKeys } as Partial<TState>),
})

export const loadResourceItems = async <TState extends LoadableResourceListState>(
  set: SetState<TState>,
  fetchItems: () => Promise<ResourceItem[]>,
) => {
  set({ loading: true } as Partial<TState>)
  try {
    const items = await fetchItems()
    set((state) => setResourceItems(state, items) as Partial<TState>)
  } finally {
    set({ loading: false } as Partial<TState>)
  }
}
