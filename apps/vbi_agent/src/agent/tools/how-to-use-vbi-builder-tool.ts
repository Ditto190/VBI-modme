import { howToUseVbiBuilderContent } from './how-to-use-vbi-builder-content.js'
import type { AgentTool } from '../types.js'

export const createHowToUseVbiBuilderTool = (): AgentTool => ({
  definition: {
    description:
      'Return a concise teaching guide for the vbi_builder tool: runtime globals, Chart/Report/Insight builder APIs, encodings and aggregates per chart type, filter semantics, and end-to-end examples. Call this once before writing vbi_builder scripts.',
    inputSchema: {
      additionalProperties: false,
      properties: {},
      type: 'object',
    },
    name: 'how_to_use_vbi_builder',
  },
  execute: async () => ({
    content: howToUseVbiBuilderContent,
    display: howToUseVbiBuilderContent,
    summary: 'vbi builder teaching guide returned',
  }),
})
