import { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { VSeed } from '@visactor/vseed'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { createDefaultBuilder, initVBIConnector } from 'src/utils/localConnector'

type DestroyCallback = () => void
type SchemaColumn = { name: string; type: string }

export interface VBIStoreState {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  initialized: boolean
  loading: boolean
  schema: SchemaColumn[]
  vseed: VSeed | null
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
    builder: initialBuilder,
    dsl: readDsl(initialBuilder),
    initialized: false,
    loading: false,
    schema: [],
    vseed: null,
    initialize: (nextBuilder) => {
      const activeBuilder = nextBuilder ?? get().builder
      set({ builder: activeBuilder, dsl: readDsl(activeBuilder), initialized: true, loading: false, schema: [] })
      void syncSchema(activeBuilder, set, get)
      const dispose = bindBuilderEvents(activeBuilder, set, get)
      return () => {
        dispose()
        set({ initialized: false, loading: false, schema: [], vseed: null })
      }
    },
  }))
}

export const prepareProfessionalVBI = initVBIConnector
