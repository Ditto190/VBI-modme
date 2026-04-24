import process from 'node:process'
import { createAgentRuntime } from './agent/runtime.js'
import { createAgentConfig } from './agent/config.js'
import { createDeepSeekModelProvider } from './agent/model/deepseek-provider.js'
import { createTool } from './agent/tools/tool.js'
import { runAgentTui } from './agent/tui/run-agent-tui.js'
import type { AgentCommand } from './types.js'

const requireTty = () => {
  if (process.stdin.isTTY && process.stdout.isTTY) return
  throw new Error('agent mode requires an interactive TTY')
}

export const runAgentCommand = async (command: AgentCommand) => {
  requireTty()
  const config = createAgentConfig(command)
  const tool = createTool({ cwd: config.runtime.cwd, timeoutMs: config.runtime.timeoutMs })
  const runtime = createAgentRuntime({
    model: createDeepSeekModelProvider(config.model),
    tool,
  })
  return runAgentTui({ runtime, task: command.task })
}
