import { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type { VBIConnectorNamespace } from '../types'

export const createVBIConnectorNamespace = (): VBIConnectorNamespace => ({
  register: registerConnector,
  get: getConnector,
  has: (id) => connectorMap.has(id),
  unregister: (id) => connectorMap.delete(id),
})
