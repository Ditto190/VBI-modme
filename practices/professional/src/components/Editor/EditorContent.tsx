import type { ComponentProps } from 'react'
import { ChartWorkspace } from './ChartWorkspace'
import { EditorFrame } from './EditorFrame'
import { LeftDataPanel } from './LeftDataPanel'

type EditorContentProps = {
  frame: Omit<ComponentProps<typeof EditorFrame>, 'children'>
  left: ComponentProps<typeof LeftDataPanel> | null
  workspace: ComponentProps<typeof ChartWorkspace>
}

export const EditorContent = ({ frame, left, workspace }: EditorContentProps) => (
  <EditorFrame {...frame}>
    {left && <LeftDataPanel {...left} />}
    <ChartWorkspace {...workspace} />
  </EditorFrame>
)
