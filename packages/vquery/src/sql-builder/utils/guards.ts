import { SelectItem } from '../../types/dsl/Select'

export const isSelectItem = <T>(item: keyof T | SelectItem<T>): item is SelectItem<T> => {
  return typeof item === 'object' && 'field' in item
}
