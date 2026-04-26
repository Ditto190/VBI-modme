#!/usr/bin/env node
import { config } from 'dotenv'
import { createAgentRuntime, createBuilderTools, createToolKit } from '@visactor/vbi-agent'
import { parseAgentCommand } from './parse.js'
import { createAgentConfig } from './agent/config.js'
import { createDeepSeekModelProvider } from './agent/model/deepseek-provider.js'
import { createCliProviderClient } from './agent/provider-client.js'
import { createProviderWorkspace } from './agent/provider-workspace.js'
import { createBashTool } from './agent/tools/bash-tool.js'
import { createResourceTools } from './agent/tools/resource-tools.js'
import { runAgentTui } from './agent/tui/run-agent-tui.js'

config({ path: '.env', quiet: true })

const command = parseAgentCommand(process.argv.slice(2))
const agentConfig = createAgentConfig(command)
const client = createCliProviderClient({ apiBaseUrl: agentConfig.provider.apiBaseUrl })
const workspace = createProviderWorkspace({
  client,
  chartId: agentConfig.provider.chartId,
  reportId: agentConfig.provider.reportId,
})
const runtime = createAgentRuntime({
  model: createDeepSeekModelProvider(agentConfig.model),
  tool: createToolKit([
    createBashTool(agentConfig.runtime.cwd, agentConfig.runtime.timeoutMs),
    ...createBuilderTools(workspace),
    ...createResourceTools(client),
  ]),
})

process.exitCode = await runAgentTui({ runtime, task: command.task })
