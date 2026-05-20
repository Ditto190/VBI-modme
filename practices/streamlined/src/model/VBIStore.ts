import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { VSeed } from '@visactor/vseed'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { createDefaultBuilder } from 'src/utils/demoConnector'

type DestroyCallback = () => void
type SchemaColumn = { name: string; type: string }

export interface VBIStoreState {
  loading: boolean
  vseed: VSeed | null
  builder: VBIChartBuilder
  initialized: boolean
  schema: SchemaColumn[]

  dsl: VBIChartDSL

  initialize: (builder?: VBIChartBuilder) => DestroyCallback
}

export type VBIStoreApi = StoreApi<VBIStoreState>
type StoreGet = VBIStoreApi['getState']
type StoreSet = VBIStoreApi['setState']

const readDsl = (builder: VBIChartBuilder) => builder.dsl.toJSON() as VBIChartDSL

const syncSchema = async (builder: VBIChartBuilder, set: StoreSet, get: StoreGet) => {
  const schema = await builder.getSchema()
  if (get().builder === builder) set({ schema })
}

const bindBuilderEvents = (builder: VBIChartBuilder, set: StoreSet, get: StoreGet) => {
  const updateAll = async () => {
    if (get().builder !== builder) return
    const dsl = readDsl(builder)
    if (builder.isEmpty()) {
      set({ dsl, loading: false, vseed: null })
      return
    }
    set({ dsl, loading: true })
    try {
      set({ dsl: readDsl(builder), vseed: await builder.buildVSeed() })
    } catch (error) {
      console.error('VSeed Build Error:', error)
    } finally {
      if (get().builder === builder) set({ loading: false })
    }
  }

  builder.doc.on('update', updateAll)
  void updateAll()
  return () => builder.doc.off('update', updateAll)
}

export const createVBIStore = (builder?: VBIChartBuilder): VBIStoreApi => {
  const initialBuilder = builder ?? createDefaultBuilder()

  return createStore<VBIStoreState>((set, get) => ({
    loading: false,
    vseed: null,
    initialized: false,
    schema: [],
    builder: initialBuilder,
    dsl: readDsl(initialBuilder),

    initialize: (nextBuilder) => {
      const activeBuilder = nextBuilder ?? get().builder
      set({
        builder: activeBuilder,
        dsl: readDsl(activeBuilder),
        initialized: true,
        loading: false,
        schema: [],
        vseed: null,
      })
      void syncSchema(activeBuilder, set, get)
      const dispose = bindBuilderEvents(activeBuilder, set, get)
      return () => {
        dispose()
        set({ loading: false, schema: [], vseed: null, initialized: false })
      }
    },
  }))
}
