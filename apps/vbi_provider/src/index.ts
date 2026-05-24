export { createVBIProviderClient } from './client'
export { createVBIProviderAgentAdapter } from './agent/adapter'
export { createVBIProviderAgentKit } from './agent/kit'
export { createVBIProviderResourceTools } from './agent/resource-tools'
export { createVBIProviderWorkspace } from './agent/workspace'
export { DEMO_CONNECTOR_ID, demoConnector, registerDemoConnector } from './demo-connector'
export type { VBIProviderAgentAdapter, VBIProviderAgentAdapterOptions } from './agent/adapter'
export type { VBIProviderConnectorRegistration, VBIProviderConnectorRegistry } from './agent/connector-registry'
export type { VBIProviderAgentKit, VBIProviderAgentKitOptions } from './agent/kit'
export type { VBIProviderAgentTool } from './agent/resource-tools'
export type { VBIProviderWorkspace, VBIProviderWorkspaceSlot } from './agent/workspace'
export type {
  ChartDetail,
  ChartProvider,
  ChartSummary,
  InsightCreateInput,
  InsightDetail,
  InsightProvider,
  InsightResponse,
  InsightSummary,
  ProviderResource,
  RemoteFetch,
  RemoteHeaders,
  RemoteHeadersFactory,
  ReportDetail,
  ReportPageInput,
  ReportProvider,
  ReportReference,
  ReportResponse,
  ReportSummary,
  ResourceCreateInput,
  ResourceSnapshot,
  VBIProviderClient,
  VBIProviderClientOptions,
} from './types'
