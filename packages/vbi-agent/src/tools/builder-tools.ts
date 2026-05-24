import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace } from '../types/index.js'
import { createChartBuilderTool } from './chart-builder-tool.js'
import { createInsightBuilderTool } from './insight-builder-tool.js'
import { createReportBuilderTool } from './report-builder-tool.js'

export { createChartBuilderTool } from './chart-builder-tool.js'
export { createInsightBuilderTool } from './insight-builder-tool.js'
export { createReportBuilderTool } from './report-builder-tool.js'

export const createBuilderTools = (workspace: VBIAgentWorkspace): AgentTool[] => [
  createChartBuilderTool(workspace),
  createInsightBuilderTool(workspace),
  createReportBuilderTool(workspace),
]
