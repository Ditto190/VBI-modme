import * as Y from 'yjs'

const getCollectionLength = (value: unknown): number => {
  if (value instanceof Y.Array) {
    return value.length
  }

  if (Array.isArray(value)) {
    return value.length
  }

  return 0
}

export const isEmptyVBIDashboardDSL = (dsl: Y.Map<any>): boolean => {
  const widgetsLength = getCollectionLength(dsl.get('widgets'))
  return widgetsLength === 0
}
