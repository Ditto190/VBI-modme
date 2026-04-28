type YArrayLike<T> = {
  delete: (index: number, length: number) => void
  get: (index: number) => T | undefined
  insert: (index: number, content: T[]) => void
}

const cloneYArrayItem = <T>(item: T): T => {
  const candidate = item as { clone?: () => T }
  return candidate.clone ? candidate.clone() : item
}

export const reorderYArrayByInsertIndex = <T>(params: {
  dragIndex: number
  insertIndex: number
  yArray: YArrayLike<T>
}) => {
  const { dragIndex, insertIndex, yArray } = params
  const item = yArray.get(dragIndex)
  if (!item) return
  const nextItem = cloneYArrayItem(item)
  const normalizedIndex = dragIndex < insertIndex ? insertIndex - 1 : insertIndex
  if (normalizedIndex === dragIndex) return
  yArray.delete(dragIndex, 1)
  yArray.insert(normalizedIndex, [nextItem])
}
