import { createStore } from '@stencil/store'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { VBI } from '@visactor/vbi'
import { type DatasetColumn } from '@visactor/vquery'
import { Builder as VSeedBuilder, type VSeed } from '@visactor/vseed'
import { createDefaultBuilder, setLocalDataWithSchema } from 'src/utils/data/localConnector'

type DestroyCallback = () => void

export interface VBIStoreState {
  loading: boolean
  vseed: VSeed | null
  builder: VBIChartBuilder
  initialized: boolean
  dsl: VBIChartDSL
}

export interface VBIStoreApi {
  state: VBIStoreState
  initialize: (builder?: VBIChartBuilder) => DestroyCallback
  bindEvent: () => DestroyCallback
  logState: () => Promise<void>
  setDsl: (dsl: VBIChartDSL) => void
  setLoading: (loading: boolean) => void
  setVSeed: (vseed: VSeed | null) => void
  switchSource: (connectorId: string, data?: any[], schema?: DatasetColumn[]) => Promise<void>

  // Stencil store utilities
  onChange: (propName: keyof VBIStoreState, cb: (newValue: any) => void) => void
  reset: () => void
  dispose: () => void
}

type VSeedCacheEntry = {
  dslSnapshot: string
  vseed: VSeed | null
  pending?: Promise<VSeed | null>
}

const vseedCache = new WeakMap<VBIChartBuilder, VSeedCacheEntry>()

const getInitialBuilder = (builder?: VBIChartBuilder) => {
  return builder ?? createDefaultBuilder()
}

const getDslState = (builder: VBIChartBuilder) => {
  const dsl = builder.dsl.toJSON() as VBIChartDSL
  return {
    dsl,
    snapshot: JSON.stringify(dsl),
  }
}

const loadVSeed = async (builder: VBIChartBuilder, dslSnapshot: string): Promise<VSeed | null> => {
  const cached = vseedCache.get(builder)

  if (cached?.dslSnapshot === dslSnapshot) {
    if (cached.pending) {
      return cached.pending
    }
    return cached.vseed
  }

  const pending = builder
    .buildVSeed()
    .then((vseed) => {
      vseedCache.set(builder, { dslSnapshot, vseed })
      return vseed
    })
    .catch((error) => {
      vseedCache.delete(builder)
      throw error
    })

  vseedCache.set(builder, {
    dslSnapshot,
    vseed: cached?.vseed ?? null,
    pending,
  })

  return pending
}

const buildSelectedVSeedArtifacts = (vseed: VSeed | null) => {
  if (!vseed) {
    return {
      advancedVSeed: null,
      spec: null,
    }
  }

  const builder = VSeedBuilder.from(vseed)
  const spec = builder.build()
  return {
    advancedVSeed: builder.advancedVSeed,
    spec,
  }
}

export const createVBIStore = (initialBuilderInstance?: VBIChartBuilder): VBIStoreApi => {
  const initialBuilder = getInitialBuilder(initialBuilderInstance)

  const store = createStore<VBIStoreState>({
    loading: false,
    vseed: null,
    initialized: false,
    builder: initialBuilder,
    dsl: initialBuilder.dsl.toJSON() as VBIChartDSL,
  })

  const { state } = store

  // 2. Define actions that modify the proxy `state` directly
  const setLoading = (loading: boolean) => {
    state.loading = loading
  }

  const setVSeed = (vseed: VSeed | null) => {
    state.vseed = vseed
  }

  const setDsl = (dsl: VBIChartDSL) => {
    state.dsl = dsl
  }

  const logState = async () => {
    const { builder, vseed } = state
    const { advancedVSeed, spec } = buildSelectedVSeedArtifacts(vseed)

    console.group('selected builder')
    console.info('builder', builder)
    console.info('vbi', builder.build())
    console.info('vquery', builder.buildVQuery())
    console.info('vseed', vseed)
    console.info('advancedVSeed', advancedVSeed)
    console.info('spec', spec)
    console.groupEnd()
  }

  const bindEvent = (): DestroyCallback => {
    const builder = state.builder

    const updateAll = async () => {
      if (state.builder !== builder) {
        return
      }

      const { dsl, snapshot } = getDslState(builder)
      if (builder.isEmpty()) {
        vseedCache.set(builder, { dslSnapshot: snapshot, vseed: null })
        state.dsl = dsl
        state.loading = false
        state.vseed = null
        return
      }

      const cached = vseedCache.get(builder)
      if (cached?.dslSnapshot === snapshot && !cached.pending) {
        state.dsl = dsl
        state.loading = false
        state.vseed = cached.vseed
        return
      }

      state.dsl = dsl
      state.loading = true

      try {
        const newVSeed = await loadVSeed(builder, snapshot)
        const currentState = getDslState(builder)

        if (state.builder !== builder || currentState.snapshot !== snapshot) {
          return
        }

        state.dsl = currentState.dsl
        state.vseed = newVSeed
      } catch (error) {
        console.error('VSeed Build Error:', error)
      } finally {
        if (state.builder === builder) {
          state.loading = false
        }
      }
    }

    builder.doc.on('update', updateAll)
    void updateAll()

    return () => {
      builder.doc.off('update', updateAll)
    }
  }

  const initialize = (nextBuilder?: VBIChartBuilder): DestroyCallback => {
    const builder = nextBuilder ?? state.builder

    // Assign directly via Stencil proxy instead of set() function
    state.builder = builder
    state.dsl = builder.dsl.toJSON() as VBIChartDSL
    state.loading = false
    state.vseed = null
    state.initialized = true

    const dispose = bindEvent()

    return () => {
      dispose()
      state.loading = false
      state.vseed = null
      state.initialized = false
    }
  }

  const switchSource = async (connectorId: string, data?: any[], schema?: DatasetColumn[]) => {
    if (data && schema) {
      setLocalDataWithSchema(data, schema)
    }

    const builder = state.builder
    const theme = builder.theme.getTheme()
    const locale = builder.locale.getLocale()
    const limit = builder.limit.getLimit()

    const nextBuilder = VBI.chart.create(VBI.chart.createEmpty(connectorId))

    nextBuilder.theme.setTheme(theme)
    nextBuilder.locale.setLocale(locale)
    if (limit) {
      nextBuilder.limit.setLimit(limit)
    }

    initialize(nextBuilder)
  }

  // 3. Return State and Actions
  return {
    state,
    initialize,
    bindEvent,
    logState,
    setDsl,
    setLoading,
    setVSeed,
    switchSource,
    onChange: store.onChange,
    reset: store.reset,
    dispose: store.dispose,
  }
}
