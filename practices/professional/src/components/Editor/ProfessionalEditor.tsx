import type { VBIChartBuilder } from '@visactor/vbi'
import { useInitializeProfessional } from 'src/hooks'
import { EditorContent } from './EditorContent'
import { LoadingEditor } from './LoadingEditor'
import { useProfessionalEditorModel } from './useProfessionalEditorModel'

type ProfessionalEditorProps = {
  builder?: VBIChartBuilder
  mode: 'edit' | 'view'
}

export const ProfessionalEditor = ({ builder, mode }: ProfessionalEditorProps) => {
  useInitializeProfessional(builder)
  const model = useProfessionalEditorModel(mode)
  if (!model.initialized) return <LoadingEditor {...model.loading} />
  return <EditorContent {...model.content} />
}
