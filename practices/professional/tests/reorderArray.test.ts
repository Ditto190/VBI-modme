import { expect, test } from '@rstest/core'
import { reorderYArrayByInsertIndex } from '../src/utils/reorderArray'

const createMockYArray = <T>(initial: T[]) => {
  const values = [...initial]
  return {
    values,
    yArray: {
      delete: (index: number, length: number) => values.splice(index, length),
      get: (index: number) => values[index],
      insert: (index: number, content: T[]) => values.splice(index, 0, ...content),
    },
  }
}

test('reorders y array by insert index in forward direction', () => {
  const { values, yArray } = createMockYArray(['a', 'b', 'c', 'd'])

  reorderYArrayByInsertIndex({ dragIndex: 0, insertIndex: 3, yArray })

  expect(values).toEqual(['b', 'c', 'a', 'd'])
})

test('reorders y array by insert index in backward direction', () => {
  const { values, yArray } = createMockYArray(['a', 'b', 'c', 'd'])

  reorderYArrayByInsertIndex({ dragIndex: 3, insertIndex: 1, yArray })

  expect(values).toEqual(['a', 'd', 'b', 'c'])
})

test('ignores no-op insert index', () => {
  const { values, yArray } = createMockYArray(['a', 'b', 'c'])

  reorderYArrayByInsertIndex({ dragIndex: 1, insertIndex: 2, yArray })

  expect(values).toEqual(['a', 'b', 'c'])
})

test('clones reorder item when clone api exists', () => {
  type CloneableItem = { clone: () => CloneableItem; id?: string }
  const createItem = (id: string): CloneableItem => ({
    clone: () => createItem(id),
    id,
  })
  const values = [createItem('amount'), createItem('profit')]
  const yArray = {
    delete: (index: number, length: number) => {
      const deleted = values.splice(index, length)
      deleted.forEach((item) => delete item.id)
    },
    get: (index: number) => values[index],
    insert: (index: number, content: (typeof values)[number][]) => values.splice(index, 0, ...content),
  }

  reorderYArrayByInsertIndex({ dragIndex: 0, insertIndex: 2, yArray })

  expect(values.map((item) => item.id)).toEqual(['profit', 'amount'])
})
