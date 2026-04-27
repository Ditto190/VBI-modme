#!/usr/bin/env node
import { render } from 'ink'
import { createElement } from 'react'
import { config } from 'dotenv'
import { createAgentRuntime, createBuilderTools, createDeepSeekModelProvider, createToolKit } from '@visactor/vbi-agent'
import { parseAgentCommand } from './parse.js'
import { createAgentConfig } from './agent/config.js'
import { createCliProviderClient, createProviderWorkspace } from './agent/provider.js'
import { createBashTool } from './agent/tools/bash-tool.js'
import { createResourceTools } from './agent/tools/resource-tools.js'
import { AgentApp } from './agent/tui/agent-app.js'

config({ path: '.env', quiet: true })

const command = parseAgentCommand(process.argv.slice(2))
const agentConfig = createAgentConfig(command)
const client = createCliProviderClient(agentConfig.provider.apiBaseUrl)
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

process.exitCode = await new Promise<number>((resolve) => {
  const instance = render(
    createElement(AgentApp, {
      onExit: (code: number) => (instance.unmount(), resolve(code)),
      runtime,
      task: command.task,
    }),
  )
})
