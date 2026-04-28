import type { HocuspocusProvider, HocuspocusProviderWebsocket } from '@hocuspocus/provider'
import type * as Y from 'yjs'

export interface RemoteSessionConnection {
  roomName: string
  websocketUrl: string
}

export interface RemoteBuilderState<TBuilder> {
  builder: TBuilder | null
  doc: Y.Doc | null
  opening: Promise<TBuilder> | null
  provider: HocuspocusProvider | null
  resourceId: string | null
  websocketProvider: HocuspocusProviderWebsocket | null
}
