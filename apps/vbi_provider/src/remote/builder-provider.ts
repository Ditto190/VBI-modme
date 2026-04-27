import { closeRemoteBuilder, createRemoteBuilderState, openRemoteBuilder } from './collaboration'
import type * as Y from 'yjs'
import type {
  ProviderResource,
  RemoteBuilderState,
  RemoteSessionConnection,
  ResourceSnapshot,
  VBIProviderClientOptions,
} from '../types'

interface Buildable<TDSL> {
  build(): TDSL
}

interface BuilderApi<TSummary extends ProviderResource> {
  getSession(): Promise<RemoteSessionConnection>
  getSummary(): Promise<TSummary>
  remove(): Promise<TSummary>
}

interface BuilderCoreInput<TBuilder, TSummary extends ProviderResource, TApi extends BuilderApi<TSummary>> {
  config: VBIProviderClientOptions
  createApi(state: RemoteBuilderState<TBuilder>): TApi
  createBuilder(doc: Y.Doc): TBuilder
  resourceId?: string
}

export const createRemoteBuilderCore = <
  TBuilder extends Buildable<TDSL>,
  TDSL,
  TSummary extends ProviderResource,
  TApi extends BuilderApi<TSummary>,
>({
  config,
  createApi,
  createBuilder,
  resourceId,
}: BuilderCoreInput<TBuilder, TSummary, TApi>) => {
  const state = createRemoteBuilderState<TBuilder>(resourceId)
  const api = createApi(state)
  const getBuilder = () => openRemoteBuilder(config, state, api.getSession, createBuilder)
  const close = () => closeRemoteBuilder(state)
  const getCollaborationProvider = async () => {
    await getBuilder()
    return state.provider
  }
  const remove = async () => {
    const summary = await api.remove()
    await close()
    state.resourceId = null
    return summary
  }
  const getLocalDetail = async (): Promise<TSummary & { dsl: TDSL }> => ({
    ...(await api.getSummary()),
    dsl: (await getBuilder()).build(),
  })
  const getLocalSnapshot = async (): Promise<ResourceSnapshot<TDSL>> => ({
    resource: await api.getSummary(),
    dsl: (await getBuilder()).build(),
  })

  return {
    api,
    close,
    getBuilder,
    getCollaborationProvider,
    getLocalDetail,
    getLocalSnapshot,
    getResourceId: () => state.resourceId,
    remove,
    state,
  }
}
