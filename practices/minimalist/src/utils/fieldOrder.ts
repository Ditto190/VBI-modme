import type { VBIChartBuilder } from '@visactor/vbi'
import type { FieldRole } from 'src/types'

type YItem = { clone?: () => YItem; get: (key: string) => unknown }

type YArrayLike = {
  delete: (index: number, length: number) => void
  get: (index: number) => YItem | undefined
  insert: (index: number, content: YItem[]) => void
  length: number
  toArray: () => YItem[]
}

const cloneItem = (item: YItem) => {
  return item.clone ? item.clone() : item
}

const getYArray = (builder: VBIChartBuilder, role: FieldRole) => {
  return builder.dsl.get(role === 'measure' ? 'measures' : 'dimensions') as YArrayLike | undefined
}

export const reorderField = (builder: VBIChartBuilder, role: FieldRole, id: string, insertIndex: number) => {
  const yArray = getYArray(builder, role)
  if (!yArray || insertIndex < 0) return
  const dragIndex = yArray.toArray().findIndex((item) => item.get('id') === id)
  const dragged = yArray.get(dragIndex)
  if (!dragged) return
  const targetIndex = Math.min(insertIndex, yArray.length)
  const nextIndex = dragIndex < targetIndex ? targetIndex - 1 : targetIndex
  if (nextIndex === dragIndex) return
  const nextItem = cloneItem(dragged)
  builder.doc.transact(() => {
    yArray.delete(dragIndex, 1)
    yArray.insert(nextIndex, [nextItem])
  })
}
