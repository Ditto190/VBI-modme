import type { ComponentProps } from 'react'
import { ChartWorkspace } from './ChartWorkspace'
import { EditorFrame } from './EditorFrame'
import { LeftDataPanel } from './LeftDataPanel'
import { ProfessionalDndProvider } from './dnd/ProfessionalDndProvider'

type EditorContentProps = {
  frame: Omit<ComponentProps<typeof EditorFrame>, 'children'>
  left: ComponentProps<typeof LeftDataPanel> | null
  workspace: ComponentProps<typeof ChartWorkspace>
}

export const EditorContent = ({ frame, left, workspace }: EditorContentProps) => (
  <EditorFrame {...frame}>
    <ProfessionalDndProvider builder={workspace.builder}>
      {left && <LeftDataPanel {...left} />}
      <ChartWorkspace {...workspace} />
    </ProfessionalDndProvider>
  </EditorFrame>
)
