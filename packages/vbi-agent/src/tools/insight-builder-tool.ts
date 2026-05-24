import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace } from '../types/index.js'
import { builderToolCommonRules, createScopedBuilderTool } from './builder-tool-common.js'

const insightBuilderDescription = [
  'Operate only a VBI insight builder. Globals: `insight` is the insight workspace slot, `builder` is an alias of `insight`, `workspace`, `json`, `assert`, and `console`.',
  builderToolCommonRules,
  'Open with `const b = await insight.open(id?)`. Snapshot with `await insight.snapshot(id?)`.',
  'Opened builder type: `VBIInsightBuilder`. It is intentionally small. Top-level methods/properties from current source and API docs: `b.doc`, `b.dsl`, `b.undoManager`, `b.getUUID()`, `b.setContent(content)`, `b.build()`, `b.isEmpty()`, `b.applyUpdate(update, origin?)`, `b.encodeStateAsUpdate(targetStateVector?)`.',
  '`b.build()` returns `VBIInsightDSL` with `uuid`, `content`, and `version`. Constructor defaults `content` to an empty string and `version` to `0` when missing.',
  'Use `b.setContent(markdownOrText)` for all insight content mutations. It returns the builder, so chaining is allowed. Do not mutate `b.dsl` directly unless there is no public builder method.',
  '`b.undoManager` supports `undo()`, `redo()`, `canUndo()`, `canRedo()`, and `clear(clearUndoStack?, clearRedoStack?)`.',
  'Example: `const b = await insight.open("insight-id"); b.setContent("Revenue increased in East region."); return json({ insight: b.build(), empty: b.isEmpty() });`',
].join('\n')

export const createInsightBuilderTool = (workspace: VBIAgentWorkspace): AgentTool =>
  createScopedBuilderTool({
    description: insightBuilderDescription,
    label: 'VBI Insight Builder',
    name: 'vbi_insight_builder',
    slot: workspace.insight,
    slotGlobal: 'insight',
    workspace,
  })
