import { VBI, type VBIConnector } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, demoConnector } from '../demo-connector'
import { resolveResourceId } from './id'
import type { VBIProviderClient } from '../types'

export type VBIProviderConnectorRegistration = VBIConnector | (() => Promise<VBIConnector>)

export type VBIProviderConnectorRegistry = {
  ensureKnownConnector(connectorId: string): Promise<void>
  getChartConnectorId(chartId?: string): Promise<string>
  register(id: string, connector: VBIProviderConnectorRegistration): string
  registerChart(chartId: string | undefined, connector: VBIProviderConnectorRegistration): Promise<string>
}

export const getOptionalConnectorId = (dsl: unknown) =>
  dsl && typeof dsl === 'object' && 'connectorId' in dsl && typeof dsl.connectorId === 'string' ? dsl.connectorId : null

const getConnectorId = (dsl: unknown) => {
  const connectorId = getOptionalConnectorId(dsl)
  if (connectorId) return connectorId
  throw new Error('chart connectorId is required')
}

const hasSchemaConnector = async (id: string) => {
  try {
    const connector = await VBI.getConnector(id)
    return typeof connector.discoverSchema === 'function'
  } catch {
    return false
  }
}

const getKnownConnector = (connectorId: string) => (connectorId === DEMO_CONNECTOR_ID ? demoConnector : null)

export const createVBIProviderConnectorRegistry = (
  client: VBIProviderClient,
  defaultChartId?: string,
): VBIProviderConnectorRegistry => {
  const register = (id: string, connector: VBIProviderConnectorRegistration) => {
    if (!connector) throw new Error('connector registration is required')
    VBI.registerConnector(id, connector as never)
    return id
  }
  const ensureKnownConnector = async (connectorId: string) => {
    if (await hasSchemaConnector(connectorId)) return
    const connector = getKnownConnector(connectorId)
    if (connector) register(connectorId, connector)
  }
  const getChartConnectorId = async (chartId?: string) => {
    const builder = await client.chart(resolveResourceId(defaultChartId, chartId, 'chart')).open()
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
