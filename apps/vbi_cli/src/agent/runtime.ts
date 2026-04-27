import { createAgentRuntime, createBuilderTools, createDeepSeekModelProvider, createToolKit } from '@visactor/vbi-agent'
import { createAgentConfig } from './config.js'
import { createCliProviderClient, createProviderWorkspace } from './provider.js'
import { createBashTool } from './tools/bash-tool.js'
import { createResourceTools } from './tools/resource-tools.js'
import type { AgentCommand } from '../parse.js'
import type { AgentRuntimeController, ModelProvider } from '@visactor/vbi-agent'

export const createCliAgentRuntime = (command: AgentCommand, model?: ModelProvider): AgentRuntimeController => {
  const agentConfig = createAgentConfig(command)
  const client = createCliProviderClient(agentConfig.provider.apiBaseUrl)
  const workspace = createProviderWorkspace({
    client,
    chartId: agentConfig.provider.chartId,
    reportId: agentConfig.provider.reportId,
  })
  return createAgentRuntime({
    model: model ?? createDeepSeekModelProvider(agentConfig.model),
    tool: createToolKit([
      createBashTool(agentConfig.runtime.cwd, agentConfig.runtime.timeoutMs),
      ...createBuilderTools(workspace),
      ...createResourceTools(client),
    ]),
  })
}
