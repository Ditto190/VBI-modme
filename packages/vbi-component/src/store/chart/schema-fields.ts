import { createStore } from '@stencil/store'
import { getFieldRoleBySchemaType, isDateSchemaType, type FieldRole } from 'src/utils/data/fieldRole'
import { type ChartBuilderStore } from './builder'

export interface VBISchemaField {
  name: string
  type: string
  role: FieldRole
  isDate: boolean
}

export interface ChartSchemaFieldsState {
  schemaFields: VBISchemaField[]
  fieldRoleMap: Record<string, FieldRole>
  fieldTypeMap: Record<string, string>
}

export interface ChartSchemaFieldsStore {
  state: ChartSchemaFieldsState
  onChange: <Key extends keyof ChartSchemaFieldsState>(
    propName: Key,
    cb: (newValue: ChartSchemaFieldsState[Key]) => void,
  ) => void
  dispose: () => void
}

export function createChartSchemaFieldsStore(chartBuilder: ChartBuilderStore): ChartSchemaFieldsStore {
  const {
    state,
    onChange,
    dispose: storeDispose,
  } = createStore<ChartSchemaFieldsState>({
    schemaFields: [],
    fieldRoleMap: {},
    fieldTypeMap: {},
  })

  let updateCount = 0

  const updateState = async () => {
    const builder = chartBuilder.builder
    if (builder) {
      const currentUpdateCount = ++updateCount
      try {
        const schema = await builder.getSchema()

        if (chartBuilder.builder !== builder || currentUpdateCount !== updateCount) {
          return
        }

        const schemaFields = schema.map((item) => ({
          name: item.name,
          type: item.type,
          role: getFieldRoleBySchemaType(item.type),
          isDate: isDateSchemaType(item.type),
        }))

        state.schemaFields = schemaFields
        state.fieldRoleMap = Object.fromEntries(schemaFields.map((item) => [item.name, item.role])) as Record<
          string,
          FieldRole
        >
        state.fieldTypeMap = Object.fromEntries(schemaFields.map((item) => [item.name, item.type])) as Record<
          string,
          string
        >
      } catch (e) {
        console.error('Failed to load schema', e)
      }
    } else {
      updateCount++
      state.schemaFields = []
      state.fieldRoleMap = {}
      state.fieldTypeMap = {}
    }
  }

  updateState()

  let currentBuilder = chartBuilder.builder

  const onDocUpdate = () => {
    updateState()
  }

  if (currentBuilder && currentBuilder.doc) {
    currentBuilder.doc.on('update', onDocUpdate)
  }

  chartBuilder.onChange('dsl', () => {
    if (currentBuilder !== chartBuilder.builder) {
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.off('update', onDocUpdate)
      }
      currentBuilder = chartBuilder.builder
      if (currentBuilder && currentBuilder.doc) {
        currentBuilder.doc.on('update', onDocUpdate)
      }
    }
    updateState()
  })

  const dispose = () => {
    if (currentBuilder && currentBuilder.doc) {
      currentBuilder.doc.off('update', onDocUpdate)
    }
    storeDispose()
  }

  return { state, onChange, dispose }
}
