import { executeCliResourceAction } from './resource-actions.js'
import { stringifyJson } from './resource-input.js'
import { createVBIResourceInputSchema } from './resource-tool-schema.js'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'
import type { AgentTool } from '@visactor/vbi-agent'

export const createResourceTools = (client: VBIProviderClient): AgentTool[] => [
  {
    name: 'vbi_resource',
    descriptor: {
      description:
        'Manage VBI platform resources. Supports resource actions list/create/get/rename/remove/snapshot/references for chart, insight, and report. Also supports insight update and report page operations.',
      inputSchema: createVBIResourceInputSchema(),
      strict: false,
    },
    execute: async (input) => {
      const result = await executeCliResourceAction(client, input)
      return {
        content: stringifyJson(result),
        display: stringifyJson(result),
        summary: `vbi_resource ${input.resource}.${input.action} completed`,
      }
    },
  },
]
