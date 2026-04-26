// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../types/assets.d.ts" />

import content from './SKILL.md?raw'
import chartBuilderApi from './references/chart-builder-api.md?raw'
import filters from './references/filters.md?raw'
import reportBuilderApi from './references/report-builder-api.md?raw'
import runtime from './references/runtime.md?raw'
import type { BuiltinSkill } from '../types.js'

export const vbiBuilderSkill: BuiltinSkill = {
  content,
  description: 'Use when writing or reviewing vbi_builder scripts that operate VBI Chart or Report builders.',
  name: 'vbi-builder',
  references: [
    { content: runtime, description: 'Script globals, opening resources, and result conventions.', name: 'runtime' },
    {
      content: chartBuilderApi,
      description: 'Chart Builder operations, encodings, and chart types.',
      name: 'chart-builder-api',
    },
    { content: filters, description: 'Where/having filter rules and operators.', name: 'filters' },
    { content: reportBuilderApi, description: 'Report Builder page operations.', name: 'report-builder-api' },
  ],
}
