import { applicationShallowEqual, useApplication } from '../../../application'
import { Textarea } from '../../../components/ui/input'

type InsightResourceEditorProps = {
  placeholder: string
  selectedId: string
}

export const InsightResourceEditor = ({ placeholder, selectedId }: InsightResourceEditorProps) => {
  const insightSession = useApplication((state) => state.insight.editor.builders[selectedId], {
    equality: applicationShallowEqual,
  })
  const insightBuilder = insightSession?.builder ?? null
  void insightSession?.version
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
