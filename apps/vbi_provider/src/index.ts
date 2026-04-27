export { createVBIProviderClient } from './client'
export { createVBIProviderAgentKit } from './agent/kit'
export { createVBIProviderWorkspace } from './agent/workspace'
export { DEMO_CONNECTOR_ID, demoConnector, registerDemoConnector } from './demo-connector'
export type { VBIProviderConnectorRegistration, VBIProviderConnectorRegistry } from './agent/connector-registry'
export type { VBIProviderAgentKit, VBIProviderAgentKitOptions } from './agent/kit'
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
  InsightUpdateInput,
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
