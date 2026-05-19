import type { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'

export type VBIConnectorFactory = () => Promise<VBIConnector>

export interface VBIConnectorNamespace {
  register: (id: VBIConnectorId, connector: VBIConnector | VBIConnectorFactory) => void
  get: (id: VBIConnectorId) => Promise<VBIConnector>
  has: (id: VBIConnectorId) => boolean
  unregister: (id: VBIConnectorId) => boolean
}
