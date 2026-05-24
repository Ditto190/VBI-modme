import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace } from '../types/index.js'
import { builderToolCommonRules, createScopedBuilderTool } from './builder-tool-common.js'

const reportBuilderDescription = [
  'Operate only a VBI report builder. Globals: `report` is the report workspace slot, `builder` is an alias of `report`, `workspace`, `json`, `assert`, and `console`.',
  builderToolCommonRules,
  'Open with `const b = await report.open(id?)`. Snapshot with `await report.snapshot(id?)`.',
  'Opened builder type: `VBIReportBuilder`. Top-level methods/properties from current source and API docs: `b.doc`, `b.dsl`, `b.undoManager`, `b.page`, `b.getUUID()`, `b.getChartBuilder(chartId)`, `b.getInsightBuilder(insightId)`, `b.build()`, `b.snapshot()`, `b.isEmpty()`, `b.applyUpdate(update, origin?)`, `b.encodeStateAsUpdate(targetStateVector?)`.',
  '`b.build()` returns `VBIReportDSL` with `uuid`, `pages`, and `version`. Each page has `id`, `title`, optional/default `chartId`, and optional/default `insightId`.',
  '`b.snapshot()` returns `VBIReportSnapshotDSL` containing `{ report, charts, insights }` and requires the report builder to have a resource registry; it throws `Report snapshot requires a resource registry` when unavailable.',
  '`b.page` is `ReportPageCollectionBuilder`: `add(title, callback?)`, `remove(pageId)`, `reorder(pageIds)`, `update(pageId, page => ...)`, `get(pageId)`. `add`, `remove`, `reorder`, and `update` return the parent report builder.',
  'A `ReportPageBuilder` supports `getId()`, `setTitle(title)`, `setChartId(chartRef)`, `setInsightId(insightRef)`, `toJSON()`, plus getters `page.chart` and `page.insight` when the report resource registry can resolve referenced builders. `setChartId` and `setInsightId` accept either a string id or a builder-like object with `getUUID()`.',
  'Use `b.getChartBuilder(chartId)` and `b.getInsightBuilder(insightId)` only for resources referenced through an injected registry; they may return `undefined`.',
  '`b.undoManager` supports `undo()`, `redo()`, `canUndo()`, `canRedo()`, and `clear(clearUndoStack?, clearRedoStack?)`.',
  'Example: `const b = await report.open("report-id"); b.page.add("Overview", p => { p.setChartId("chart-id"); p.setInsightId("insight-id"); }); return json({ report: b.build() });`',
].join('\n')

export const createReportBuilderTool = (workspace: VBIAgentWorkspace): AgentTool =>
  createScopedBuilderTool({
    description: reportBuilderDescription,
    label: 'VBI Report Builder',
    name: 'vbi_report_builder',
    slot: workspace.report,
    slotGlobal: 'report',
    workspace,
  })
