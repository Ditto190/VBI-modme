export interface FilterItem {
  field: string
  operator: string
  value: unknown
}

export interface FilterField {
  name: string
  role: 'dimension' | 'measure'
}

export type RootOperator = 'and' | 'or'
