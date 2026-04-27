// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../types/assets.d.ts" />

import content from './SKILL.md?raw'
import experimentDesign from './references/experiment-design.md?raw'
import validationRubric from './references/validation-rubric.md?raw'
import type { BuiltinSkill } from '../types.js'

export const hypothesisLoopSkill: BuiltinSkill = {
  content,
  description: 'Use when the task requires multiple hypotheses, batched experiments, and evidence-based validation.',
  name: 'hypothesis-loop',
  references: [
    {
      content: experimentDesign,
      description: 'How to turn a question into ranked hypotheses and experiment batches.',
      name: 'experiment-design',
    },
    {
      content: validationRubric,
      description: 'How to classify experiment outcomes and decide the next loop.',
      name: 'validation-rubric',
    },
  ],
}
