import type { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'

/** @description 延迟创建 VBIConnector 的工厂函数。 */
export type VBIConnectorFactory = () => Promise<VBIConnector>
/** @description 可注册到 VBI 实例的连接器值，支持直接传入连接器或异步工厂。 */
export type VBIConnectorLike = VBIConnector | VBIConnectorFactory

/** @description VBI 实例上的连接器命名空间。 */
export interface VBIConnectorNamespace {
  /** @description 注册连接器。 */
  register(id: VBIConnectorId, connector: VBIConnectorLike): void
  /** @description 获取连接器。 */
  get(id: VBIConnectorId): Promise<VBIConnector>
  /** @description 判断连接器是否已注册。 */
  has(id: VBIConnectorId): boolean
  /** @description 注销连接器。 */
  unregister(id: VBIConnectorId): boolean
}
