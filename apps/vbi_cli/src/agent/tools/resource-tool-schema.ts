import { jsonSchema } from '@visactor/vbi-agent'

export const createVBIResourceInputSchema = () =>
  jsonSchema({
    additionalProperties: true,
    properties: {
      action: { type: 'string' },
      chartId: { type: 'string' },
      content: { type: 'string' },
      id: { type: 'string' },
      insightId: { type: 'string' },
      name: { type: 'string' },
      pageAction: { type: 'string' },
      pageId: { type: 'string' },
      pageIds: { items: { type: 'string' }, type: 'array' },
      resource: { enum: ['chart', 'insight', 'report'], type: 'string' },
      title: { type: 'string' },
    },
    required: ['action', 'resource'],
    type: 'object',
  })
