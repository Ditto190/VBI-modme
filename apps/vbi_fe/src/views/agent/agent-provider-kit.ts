import {
  createVBIProviderAgentKit,
  type VBIProviderAgentKit,
  type VBIProviderAgentKitOptions,
} from '@visactor/headless-bi-provider'

type AgentProviderKitOptions = Pick<VBIProviderAgentKitOptions, 'baseUrl' | 'chartId' | 'insightId' | 'reportId'>

export const createAgentProviderKit = (options: AgentProviderKitOptions): VBIProviderAgentKit =>
  createVBIProviderAgentKit(options)
