import { Textarea } from '../../components/ui/input'
import { useInsightBuilderModel } from '../../models'

type InsightResourceEditorProps = {
  placeholder: string
  selectedId: string
}

export const InsightResourceEditor = ({ placeholder, selectedId }: InsightResourceEditorProps) => {
  const insightSession = useInsightBuilderModel((store) => store.sessions[selectedId])
  const insightBuilder = insightSession?.builder ?? null
  const content = insightBuilder?.build().content ?? ''

  return (
    <Textarea
      className='min-h-64'
      value={content}
      placeholder={placeholder}
      onChange={(event) => {
        insightBuilder?.setContent(event.target.value)
      }}
    />
  )
}
