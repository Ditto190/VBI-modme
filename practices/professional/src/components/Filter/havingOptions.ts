import type { HavingAggregateFunc, HavingField } from './havingTypes'

const allAggregateOptions: Array<{ label: string; value: HavingAggregateFunc }> = [
  { label: 'Sum', value: 'sum' },
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'countDistinct' },
  { label: 'Average', value: 'avg' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Variance', value: 'variance' },
  { label: 'Variance Pop', value: 'variancePop' },
  { label: 'Std Dev', value: 'stddev' },
  { label: 'Median', value: 'median' },
  { label: 'Quantile', value: 'quantile' },
]

const dimensionAggregateOptions: Array<{ label: string; value: HavingAggregateFunc }> = [
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'countDistinct' },
]

export const operatorOptions = ['=', '!=', '>', '>=', '<', '<=', 'between'].map((value) => ({ label: value, value }))

export const aggregateOptionsForRole = (role?: HavingField['role']) =>
  role === 'dimension' ? dimensionAggregateOptions : allAggregateOptions
