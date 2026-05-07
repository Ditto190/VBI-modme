import { Segmented } from 'antd'
import type { RootOperator } from './filterTypes'

type RootOperatorControlProps = {
  value: RootOperator
  onChange?: (operator: RootOperator) => void
}

const options = [
  { label: 'AND', value: 'and' },
  { label: 'OR', value: 'or' },
] satisfies Array<{ label: string; value: RootOperator }>

export const RootOperatorControl = ({ value, onChange }: RootOperatorControlProps) => {
  if (!onChange) return null
  return (
    <Segmented<RootOperator>
      className='pro-root-operator'
      options={options}
      size='small'
      value={value}
      onChange={onChange}
    />
  )
}
