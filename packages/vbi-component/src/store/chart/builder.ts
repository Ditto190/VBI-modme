import { createStore } from '@stencil/store'
import { VBI, type VBIChartBuilder, type VBIChartDSL } from '@visactor/vbi'
import { type DatasetColumn } from '@visactor/vquery'
import { Builder as VSeedBuilder, type VSeed } from '@visactor/vseed'
import { LocalConnector } from 'src/utils/data/localConnector'

export interface ChartBuilderState {
  loading: boolean
  vseed: VSeed | null
  dsl: VBIChartDSL
}

type DestroyCallback = () => void

export interface ChartBuilderStore {
  state: ChartBuilderState
  builder: VBIChartBuilder
  onChange: <Key extends keyof ChartBuilderState>(propName: Key, cb: (newValue: ChartBuilderState[Key]) => void) => void
  logState: () => void
  initialize: (nextBuilder?: VBIChartBuilder) => DestroyCallback
  switchSource: (connectorId: string, data?: any[], schema?: DatasetColumn[]) => void
}

type VSeedCacheEntry = {
  dslSnapshot: string
  vseed: VSeed | null
  pending?: Promise<VSeed | null>
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

const getDslState = (builder: VBIChartBuilder) => {
  const dsl = builder.dsl.toJSON() as VBIChartDSL
  return {
    dsl,
    snapshot: JSON.stringify(dsl),
  }
}

const loadVSeed = async (
  builder: VBIChartBuilder,
  dslSnapshot: string,
  vseedCache: WeakMap<VBIChartBuilder, VSeedCacheEntry>,
): Promise<VSeed | null> => {
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

export function createChartBuilderStore(builder: VBIChartBuilder): ChartBuilderStore {
  let _builder = builder
  let _dispose: DestroyCallback | null = null

  const vseedCache = new WeakMap<VBIChartBuilder, VSeedCacheEntry>()
  const connectors = new Map<string, LocalConnector>()

  const { state, onChange } = createStore<ChartBuilderState>({
    loading: false,
    vseed: null,
    dsl: _builder.dsl.toJSON() as VBIChartDSL,
  })

  const logState = () => {
    const { vseed } = state
    const { advancedVSeed, spec } = buildSelectedVSeedArtifacts(vseed)

    console.group('selected builder')
    console.info('builder', _builder)
    console.info('vbi', _builder.build())
    console.info('vquery', _builder.buildVQuery())
    console.info('vseed', vseed)
    console.info('advancedVSeed', advancedVSeed)
    console.info('spec', spec)
    console.groupEnd()
  }

  const bindEvent = (): DestroyCallback => {
    const builder = _builder

    const updateAll = async () => {
      if (_builder !== builder) {
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
        const newVSeed = await loadVSeed(builder, snapshot, vseedCache)
        const currentState = getDslState(builder)

        if (_builder !== builder || currentState.snapshot !== snapshot) {
          return
        }

        state.dsl = currentState.dsl
        state.vseed = newVSeed
      } catch (error) {
        console.error('VSeed Build Error:', error)
      } finally {
        if (_builder === builder) {
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
    // Dispose previous event binding before setting up new one
    _dispose?.()

    const builder = nextBuilder ?? _builder

    _builder = builder
    state.dsl = builder.dsl.toJSON() as VBIChartDSL
    state.loading = false
    state.vseed = null

    const dispose = bindEvent()
    _dispose = dispose

    return () => {
      dispose()
      _dispose = null
      state.loading = false
      state.vseed = null
    }
  }

  const switchSource = (connectorId: string, data?: any[], schema?: DatasetColumn[]) => {
    if (data && schema) {
      let connector = connectors.get(connectorId)
      if (!connector) {
        connector = new LocalConnector(connectorId)
        connector.register()
        connectors.set(connectorId, connector)
      }
      connector.setDataWithSchema(data, schema)
    }

    const theme = _builder.theme.getTheme()
    const locale = _builder.locale.getLocale()
    const limit = _builder.limit.getLimit()
    const nextBuilder = VBI.chart.create(VBI.chart.createEmpty(connectorId))

    nextBuilder.theme.setTheme(theme)
    nextBuilder.locale.setLocale(locale)
    if (limit) {
      nextBuilder.limit.setLimit(limit)
    }

    initialize(nextBuilder)
  }

  return {
    state,
    get builder() {
      return _builder
    },
    onChange,
    logState,
    initialize,
    switchSource,
  }
}
