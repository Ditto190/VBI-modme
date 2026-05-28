import { createVBIProviderAgentKit } from '@visactor/headless-bi-provider'
import { VBIAgent } from '@visactor/vbi-agent'
import { createAgentConfig } from './config.js'
import { createCliAgentProvider, type CliAgentProvider } from './provider.js'
import type { Agent } from '@visactor/vbi-agent'
import type { AgentCommand } from '../types/index.js'

const getWebSocketPolyfill = () => (typeof WebSocket === 'function' ? WebSocket : undefined)

export const createCliAgent = (command: AgentCommand, providerInput?: CliAgentProvider): Agent => {
  const agentConfig = createAgentConfig(command)
  const providerKit = createVBIProviderAgentKit({
    baseUrl: agentConfig.provider.apiBaseUrl,
    ...(getWebSocketPolyfill() ? { webSocketPolyfill: getWebSocketPolyfill() } : {}),
  })
  const provider = providerInput ?? createCliAgentProvider(agentConfig)
  return new VBIAgent(
    {
      getApiKey: provider.getApiKey,
      initialState: {
        model: provider.model,
      },
      streamFn: provider.streamFn,
    },
    providerKit.workspace,
  )
}
