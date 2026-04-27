// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../types/assets.d.ts" />

import content from './SKILL.md?raw'
import chartBuilder from './references/chart-builder.md?raw'
import insightBuilder from './references/insight-builder.md?raw'
import reportBuilder from './references/report-builder.md?raw'
import type { BuiltinSkill } from '../types.js'

export const vbiBuilderSkill: BuiltinSkill = {
  content,
  description: 'Use when writing or reviewing vbi_builder scripts for VBI Chart, Report, or Insight builders.',
  name: 'vbi-builder',
  references: [
    {
      content: chartBuilder,
      description: 'VBIChartBuilder operations for chart DSL, encodings, and filters.',
      name: 'chart-builder',
    },
    { content: reportBuilder, description: 'VBIReportBuilder page composition and snapshots.', name: 'report-builder' },
    {
      content: insightBuilder,
      description: 'VBIInsightBuilder content editing and runtime access.',
      name: 'insight-builder',
    },
  ],
}
