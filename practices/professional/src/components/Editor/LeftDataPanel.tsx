import { FieldBrowser } from './FieldBrowser'
import type { ProfessionalLabels } from 'src/config/labels'
import type { SchemaField } from 'src/types'

type LeftDataPanelProps = {
  fields: SchemaField[]
  labels: ProfessionalLabels
  onAddField: (field: SchemaField) => void
}

export const LeftDataPanel = (props: LeftDataPanelProps) => (
  <aside className='pro-left'>
    <FieldBrowser {...props} />
  </aside>
)
