type YArrayLike<T = unknown> = {
  delete: (index: number, length: number) => void
  get: (index: number) => T | undefined
  insert: (index: number, content: T[]) => void
}

const cloneYArrayItem = <T>(item: T): T => {
  if (item && typeof item === 'object' && 'clone' in item && typeof item.clone === 'function') {
    return item.clone() as T
  }
  return item
}

export const reorderYArrayByInsertIndex = <T>(params: {
  dragIndex: number
  insertIndex: number
  yArray: YArrayLike<T>
}) => {
  const { dragIndex, insertIndex, yArray } = params
  if (dragIndex < 0 || insertIndex < 0) return

  const draggedItem = yArray.get(dragIndex)
  if (!draggedItem) return
  const nextItem = cloneYArrayItem(draggedItem)

  const normalizedInsertIndex = dragIndex < insertIndex ? insertIndex - 1 : insertIndex
  if (normalizedInsertIndex === dragIndex) return

  yArray.delete(dragIndex, 1)
  yArray.insert(normalizedInsertIndex, [nextItem])
}
