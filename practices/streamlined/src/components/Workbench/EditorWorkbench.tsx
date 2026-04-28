import { useVBIStore } from 'src/model'
import { ChartWorkspace } from 'src/components/Chart'
import { ConfigPanel } from 'src/components/Config'
import { addRecommendedField } from 'src/utils/fieldActions'
import { toSchemaField } from 'src/utils/fieldUtils'
import { FieldListPanel } from 'src/components/Fields'
import type { StreamLabels } from 'src/config/labels'

type EditorWorkbenchProps = {
  isFullscreen: boolean
  labels: StreamLabels
  onToggleFullscreen: () => void | Promise<void>
}

export const EditorWorkbench = ({ isFullscreen, labels, onToggleFullscreen }: EditorWorkbenchProps) => {
  const builder = useVBIStore((state) => state.builder)
  const dsl = useVBIStore((state) => state.dsl)
  const fields = useVBIStore((state) => state.schema).map(toSchemaField)

  return (
    <div className='stream-layout'>
      <FieldListPanel
        fields={fields}
        labels={labels}
        onAddField={(field) => addRecommendedField(builder, dsl, field)}
        sourceName={dsl.connectorId || 'demo'}
      />
      <ConfigPanel builder={builder} dsl={dsl} fields={fields} labels={labels} />
      <ChartWorkspace isFullscreen={isFullscreen} labels={labels} onToggleFullscreen={onToggleFullscreen} />
    </div>
  )
}
