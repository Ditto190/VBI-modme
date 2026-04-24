#!/usr/bin/env node
import { config } from 'dotenv'
import { parseAgentCommand } from './parse.js'
import { createAgentConfig } from './agent/config.js'
import { createAgentRuntime } from './agent/runtime.js'
import { createDeepSeekModelProvider } from './agent/model/deepseek-provider.js'
import { createTool } from './agent/tools/tool.js'
import { runAgentTui } from './agent/tui/run-agent-tui.js'

config({ path: '.env', quiet: true })

const command = parseAgentCommand(process.argv.slice(2))
const agentConfig = createAgentConfig(command)
const runtime = createAgentRuntime({
  model: createDeepSeekModelProvider(agentConfig.model),
  tool: createTool({ cwd: agentConfig.runtime.cwd, timeoutMs: agentConfig.runtime.timeoutMs }),
})

process.exitCode = await runAgentTui({ runtime, task: command.task })
