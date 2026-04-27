import { createVBIProviderAgentKit } from '@visactor/headless-bi-provider'
import { createDeepSeekModelProvider, createVBIBuilderAgent } from '@visactor/vbi-agent'
import { createAgentConfig } from './config.js'
import { createBashTool } from './tools/bash-tool.js'
import { createResourceTools } from './tools/resource-tools.js'
import type { AgentCommand } from '../parse.js'
import type { AgentRuntimeController, ModelProvider } from '@visactor/vbi-agent'

const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

export const createCliAgentRuntime = (command: AgentCommand, model?: ModelProvider): AgentRuntimeController => {
  const agentConfig = createAgentConfig(command)
  const provider = createVBIProviderAgentKit({
    baseUrl: agentConfig.provider.apiBaseUrl,
    chartId: agentConfig.provider.chartId,
    reportId: agentConfig.provider.reportId,
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })
  return createVBIBuilderAgent({
    model: model ?? createDeepSeekModelProvider(agentConfig.model),
    tools: [
      createBashTool(agentConfig.runtime.cwd, agentConfig.runtime.timeoutMs),
      ...createResourceTools(provider.client),
    ],
    workspace: provider.workspace,
  })
}
