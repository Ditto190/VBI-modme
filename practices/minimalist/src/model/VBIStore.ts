import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { VSeed } from '@visactor/vseed'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { createDefaultBuilder } from 'src/utils/demoConnector'

type SchemaColumn = { name: string; type: string }

export type VBIStoreState = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  loading: boolean
  schema: SchemaColumn[]
  vseed: VSeed | null
}

export type VBIStoreApi = StoreApi<VBIStoreState>
type StoreGet = VBIStoreApi['getState']
type StoreSet = VBIStoreApi['setState']

const readDsl = (builder: VBIChartBuilder) => builder.dsl.toJSON() as VBIChartDSL

const syncSchema = async (builder: VBIChartBuilder, set: StoreSet, get: StoreGet) => {
  const schema = await builder.getSchema()
  if (get().builder === builder) set({ schema })
}

const bindBuilder = (builder: VBIChartBuilder, set: StoreSet, get: StoreGet) => {
  const update = async () => {
    if (get().builder !== builder) return
    const dsl = readDsl(builder)
    if (builder.isEmpty()) {
      set({ dsl, loading: false, vseed: null })
      return
    }
    set({ dsl, loading: true })
    try {
      set({ dsl: readDsl(builder), vseed: await builder.buildVSeed() })
    } catch {
      if (get().builder === builder) set({ vseed: null })
    } finally {
      if (get().builder === builder) set({ loading: false })
    }
  }

  builder.doc.on('update', update)
  void update()
  return () => builder.doc.off('update', update)
}

export const createVBIStore = (builder?: VBIChartBuilder): VBIStoreApi => {
  const initialBuilder = builder ?? createDefaultBuilder()
  const store = createStore<VBIStoreState>(() => ({
    builder: initialBuilder,
    dsl: readDsl(initialBuilder),
    loading: false,
    schema: [],
    vseed: null,
  }))
  void syncSchema(initialBuilder, store.setState, store.getState)
  bindBuilder(initialBuilder, store.setState, store.getState)
  return store
}
