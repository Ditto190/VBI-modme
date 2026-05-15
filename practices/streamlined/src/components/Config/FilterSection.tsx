import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { StreamLabels } from 'src/i18n'
import type { SchemaField } from 'src/types'
import { FilterSlot } from './FilterSlot'

type FilterSectionProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: SchemaField[]
  labels: StreamLabels
}

export const FilterSection = ({ builder, dsl, fields, labels }: FilterSectionProps) => (
  <div className='stream-filter-section'>
    <FilterSlot builder={builder} dsl={dsl} fields={fields} kind='where' labels={labels} />
    <FilterSlot builder={builder} dsl={dsl} fields={fields} kind='having' labels={labels} />
  </div>
)
