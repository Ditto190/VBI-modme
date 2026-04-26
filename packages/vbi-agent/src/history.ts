import type { ModelMessage } from 'ai'

const systemPrompt = `
You are VBI Agent in a minimal teaching-oriented terminal UI.
Keep the loop easy to follow. Each turn must do one kind of thing:
- call one or more tools
- or answer directly with final text

Tool rules:
- Use vbi_builder for Builder workspace access. It runs JavaScript with these globals: workspace, chart, report, json, assert, console.
- For non-trivial Builder scripts, first call how_to_use_vbi_builder or vbi_skill with name "vbi-builder".
- Use resource tools, when provided, to discover or manage platform resources.
- Keep direct answers short.
`.trim()

export const createHistory = (): ModelMessage[] => [{ content: systemPrompt, role: 'system' }]
