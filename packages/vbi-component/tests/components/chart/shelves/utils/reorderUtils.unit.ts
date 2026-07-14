import { describe, expect, it } from '@stencil/vitest'
import {
  reorderYArray,
  reorderYArrayByInsertIndex,
  type YArrayLike,
} from 'src/components/chart/shelves/utils/reorderUtils'

const createMockYArray = <T>(initialItems: T[]) => {
  const items = [...initialItems]
  return {
    items,
    yArray: {
      get: (index: number) => items[index],
      delete: (index: number, length: number) => items.splice(index, length),
      insert: (index: number, content: T[]) => items.splice(index, 0, ...content),
    } satisfies YArrayLike<T>,
  }
}

describe('reorderYArray', () => {
  it('should not reorder when dragIndex or dropIndex is invalid or equal', () => {
    const { items, yArray } = createMockYArray(['A', 'B', 'C'])
    reorderYArray({ yArray, dragIndex: -1, dropIndex: 1 })
    reorderYArray({ yArray, dragIndex: 1, dropIndex: 1 })
    expect(items).toEqual(['A', 'B', 'C'])
  })

  it('should reorder items correctly when dragging forward', () => {
    const { items, yArray } = createMockYArray(['A', 'B', 'C', 'D'])
    reorderYArray({ yArray, dragIndex: 0, dropIndex: 3 })
    expect(items).toEqual(['B', 'C', 'A', 'D'])
  })

  it('should reorder items correctly when dragging backward', () => {
    const { items, yArray } = createMockYArray(['A', 'B', 'C', 'D'])
    reorderYArray({ yArray, dragIndex: 2, dropIndex: 0 })
    expect(items).toEqual(['C', 'A', 'B', 'D'])
  })
})

describe('reorderYArrayByInsertIndex', () => {
  it('should insert dragged item at the insert index correctly', () => {
    const { items, yArray } = createMockYArray(['A', 'B', 'C', 'D'])
    reorderYArrayByInsertIndex({ yArray, dragIndex: 3, insertIndex: 1 })
    expect(items).toEqual(['A', 'D', 'B', 'C'])
  })
})
