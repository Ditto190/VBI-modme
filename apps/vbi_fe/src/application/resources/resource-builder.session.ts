import type { HocuspocusProvider } from '@hocuspocus/provider'
import { getResourceHandle } from '../../services/resourceHandles'
import type { ResourceKind } from '../../types'
import type { BuilderByKind, BuilderSession } from './resource-builder.types'

export const createBuilderSession = <TKind extends ResourceKind>(
  kind: TKind,
  resourceId: string,
): BuilderSession<BuilderByKind[TKind]> => ({
  builder: null,
  handle: getResourceHandle(kind, resourceId) as unknown as BuilderSession<BuilderByKind[TKind]>['handle'],
  opening: null,
  provider: null,
  refs: 0,
  stopSync: null,
  version: 0,
})

export const setSessionRefs = <TBuilder>(
  session: BuilderSession<TBuilder>,
  refs: number,
): BuilderSession<TBuilder> => ({ ...session, refs })

export const setSessionOpening = <TBuilder>(
  session: BuilderSession<TBuilder>,
  opening: Promise<void> | null,
): BuilderSession<TBuilder> => ({ ...session, opening })

export const setConnectedSession = <TBuilder>(
  session: BuilderSession<TBuilder>,
  builder: TBuilder,
  provider: HocuspocusProvider | null,
  stopSync: (() => void) | null,
): BuilderSession<TBuilder> => ({
  ...session,
  builder,
  opening: null,
  provider,
  stopSync,
  version: 0,
})

export const resetSessionConnection = <TBuilder>(session: BuilderSession<TBuilder>): BuilderSession<TBuilder> => ({
  ...session,
  builder: null,
  opening: null,
  provider: null,
  stopSync: null,
  version: 0,
})

export const bumpSessionVersion = <TBuilder>(session: BuilderSession<TBuilder>): BuilderSession<TBuilder> => ({
  ...session,
  version: session.version + 1,
})
