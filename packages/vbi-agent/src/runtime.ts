import { createActivityLog } from './activity-log.js'
import { formatToolCallDetail, formatToolCallSummary } from './activity-format.js'
import { createHistory } from './history.js'
import { extractText } from './model/stream.js'
import type { AgentRuntimeController, AgentToolKit, ModelProvider } from './types.js'

type RuntimeInput = { model: ModelProvider; tool: AgentToolKit }

export const createAgentRuntime = ({ model, tool }: RuntimeInput): AgentRuntimeController => {
  const activityLog = createActivityLog()
  const history = createHistory()
  let running: Promise<void> | null = null

  const loop = async () => {
    while (true) {
      const turn = await model.streamTurn({
        history,
        tools: tool.definitions(),
      })
      if (turn.outcome.type === 'final') {
        history.push(turn.assistant)
        activityLog.add('assistant', turn.outcome.content || extractText(turn.assistant) || '<empty response>')
        return
      }
      activityLog.add(
        'assistant',
        extractText(turn.assistant) || formatToolCallSummary(turn.outcome.calls),
        formatToolCallDetail(turn.outcome.calls),
      )
      history.push(turn.assistant)
      for (const call of turn.outcome.calls) {
        const result = await tool.execute(call)
        history.push({
          content: [
            {
              type: 'tool-result' as const,
              toolCallId: call.id,
              toolName: call.name,
              output: { type: 'text' as const, value: result.content },
            },
          ],
          role: 'tool',
        })
        activityLog.add('tool', result.summary, result.display ?? result.content)
      }
    }
  }

  return {
    getState: activityLog.getState,
    start: (userMessage?: string) => {
      const prompt = userMessage?.trim()
      if (!prompt) return running ?? Promise.resolve()
      if (running) return running
      activityLog.clearError()
      history.push({ content: prompt, role: 'user' })
      activityLog.add('user', prompt)
      running = loop()
        .catch(activityLog.setError)
        .finally(() => {
          running = null
        })
      return running
    },
    subscribe: activityLog.subscribe,
  }
}
