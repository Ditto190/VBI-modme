import { VBI } from '@visactor/vbi'
import type { VBIProviderClient } from '@visactor/headless-bi-provider'
import type { VBIWorkspaceConnectorRegistration, VBIWorkspaceConnectors } from '@visactor/vbi-agent'

export type CliConnectorRegistry = VBIWorkspaceConnectors & {
  ensureKnownConnector(connectorId: string): Promise<void>
}

type DemoConnectorModule = {
  DEMO_CONNECTOR_ID: string
  demoConnector: VBIWorkspaceConnectorRegistration
}

export const getConnectorId = (dsl: unknown) => {
  const connectorId = getOptionalConnectorId(dsl)
  if (connectorId) return connectorId
  throw new Error('chart connectorId is required')
}

export const getOptionalConnectorId = (dsl: unknown) =>
  dsl && typeof dsl === 'object' && 'connectorId' in dsl && typeof dsl.connectorId === 'string' ? dsl.connectorId : null

const resolveId = (defaultId: string | undefined, id: string | undefined) => {
  const resolved = id ?? defaultId
  if (resolved) return resolved
  throw new Error('chart id is required. Use vbi_resource list first, then call chart.open(id).')
}

const hasSchemaConnector = async (id: string) => {
  try {
    const connector = await VBI.getConnector(id)
    return typeof connector.discoverSchema === 'function'
  } catch {
    return false
  }
}

const getKnownConnector = async (connectorId: string) => {
  const provider = (await import('@visactor/headless-bi-provider')) as unknown as DemoConnectorModule
  return connectorId === provider.DEMO_CONNECTOR_ID ? provider.demoConnector : null
}

export const createConnectorRegistry = (client: VBIProviderClient, defaultChartId?: string): CliConnectorRegistry => {
  const register = (id: string, connector: VBIWorkspaceConnectorRegistration) => {
    if (!connector) throw new Error('connector registration is required')
    VBI.registerConnector(id, connector as never)
    return id
  }
  const ensureKnownConnector = async (connectorId: string) => {
    if (await hasSchemaConnector(connectorId)) return
    const connector = await getKnownConnector(connectorId)
    if (connector) register(connectorId, connector)
  }
  const getChartConnectorId = async (chartId?: string) => {
    const builder = await client.chart(resolveId(defaultChartId, chartId)).open()
    const connectorId = getConnectorId(builder.build())
    await ensureKnownConnector(connectorId)
    return connectorId
  }
  return {
    ensureKnownConnector,
    getChartConnectorId,
    register,
    registerChart: async (chartId, connector) => register(await getChartConnectorId(chartId), connector),
  }
}
