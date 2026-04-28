import { createVBIProviderClient } from '../client'
import { createVBIProviderWorkspace } from './workspace'
import type { VBIProviderClient, VBIProviderClientOptions } from '../types'
import type { VBIProviderWorkspace } from './workspace'

export interface VBIProviderAgentKitOptions extends VBIProviderClientOptions {
  chartId?: string
  reportId?: string
}

export interface VBIProviderAgentKit {
  client: VBIProviderClient
  workspace: VBIProviderWorkspace
}

export const createVBIProviderAgentKit = ({
  chartId,
  reportId,
  ...clientOptions
}: VBIProviderAgentKitOptions): VBIProviderAgentKit => {
  const client = createVBIProviderClient(clientOptions)
  const workspace = createVBIProviderWorkspace({ chartId, client, reportId })
  return { client, workspace }
}
