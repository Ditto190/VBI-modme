import { HocuspocusProvider, HocuspocusProviderWebsocket } from '@hocuspocus/provider'
import * as Y from 'yjs'
import type { RemoteBuilderState, RemoteSessionConnection, VBIProviderClientOptions } from '../types'
import { buildSocketUrl } from './socket-url'

export const createRemoteBuilderState = <TBuilder>(resourceId?: string): RemoteBuilderState<TBuilder> => ({
  builder: null,
  doc: null,
  opening: null,
  provider: null,
  resourceId: resourceId ?? null,
  websocketProvider: null,
})

export const requireRemoteResourceId = <TBuilder>(state: RemoteBuilderState<TBuilder>, label: string) => {
  if (state.resourceId) return state.resourceId
  throw new Error(`${label} provider is not bound to a resource id`)
}

const waitForSync = (provider: HocuspocusProvider, timeoutMs: number) =>
  new Promise<void>((resolve, reject) => {
    if (provider.synced) return resolve()
    const onSynced = ({ state }: { state: boolean }) => {
      if (!state) return
      provider.off('synced', onSynced)
      clearTimeout(timer)
      resolve()
    }
    const timer = setTimeout(() => {
      provider.off('synced', onSynced)
      reject(new Error(`Collaboration sync timeout after ${timeoutMs}ms`))
    }, timeoutMs)
    provider.on('synced', onSynced)
  })

export const closeRemoteBuilder = async <TBuilder>(state: RemoteBuilderState<TBuilder>) => {
  state.provider?.destroy()
  state.websocketProvider?.destroy()
  state.doc?.destroy()
  Object.assign(state, { builder: null, doc: null, opening: null, provider: null, websocketProvider: null })
}

export const openRemoteBuilder = async <TBuilder>(
  config: VBIProviderClientOptions,
  state: RemoteBuilderState<TBuilder>,
  loadSession: () => Promise<RemoteSessionConnection>,
  createBuilder: (doc: Y.Doc) => TBuilder,
) => {
  if (state.builder) return state.builder
  if (state.opening) return state.opening
  requireRemoteResourceId(state, 'resource')

  const opening = (async () => {
    const session = await loadSession()
    const doc = new Y.Doc()
    const websocketProvider = new HocuspocusProviderWebsocket({
      url: buildSocketUrl(session),
      ...(config.webSocketPolyfill ? { WebSocketPolyfill: config.webSocketPolyfill } : {}),
    })
    const provider = new HocuspocusProvider({ document: doc, name: session.roomName, websocketProvider })
    Object.assign(state, { doc, provider, websocketProvider })
    provider.attach()

    try {
      await waitForSync(provider, config.syncTimeoutMs ?? 10000)
      state.builder = createBuilder(doc)
      return state.builder
    } catch (error) {
      await closeRemoteBuilder(state)
      throw error
    }
  })()

  state.opening = opening
  try {
    return await opening
  } finally {
    if (state.opening === opening) state.opening = null
  }
}
