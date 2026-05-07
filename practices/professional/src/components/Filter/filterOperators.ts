import type { FilterField } from './filterTypes'

export const getDimensionOperators = (isZh: boolean) => [
  { label: isZh ? '包含 (in)' : 'Includes (in)', value: 'in' },
  { label: isZh ? '不包含 (not in)' : 'Excludes (not in)', value: 'not in' },
]

export const getMeasureOperators = (isZh: boolean) => [
  { label: isZh ? '等于 (=)' : 'Equals (=)', value: '=' },
  { label: isZh ? '不等于 (!=)' : 'Not equal (!=)', value: '!=' },
  { label: isZh ? '大于 (>)' : 'Greater than (>)', value: '>' },
  { label: isZh ? '大于等于 (>=)' : 'Greater or equal (>=)', value: '>=' },
  { label: isZh ? '小于 (<)' : 'Less than (<)', value: '<' },
  { label: isZh ? '小于等于 (<=)' : 'Less or equal (<=)', value: '<=' },
  { label: isZh ? '范围 (between)' : 'Between', value: 'between' },
]

export const operatorsForRole = (role: FilterField['role'], isZh: boolean) =>
  role === 'measure' ? getMeasureOperators(isZh) : getDimensionOperators(isZh)

export const defaultOperatorForRole = (role: FilterField['role']) => (role === 'measure' ? '=' : 'in')
