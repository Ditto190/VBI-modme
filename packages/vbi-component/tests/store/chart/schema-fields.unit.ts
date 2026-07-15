import { describe, expect, it, vi } from '@stencil/vitest'
import { createChartBuilderStore } from 'src/store/chart/builder'
import { createChartSchemaFieldsStore } from 'src/store/chart/schema-fields'
import { createTestBuilder } from '../test-helpers'

describe('createChartSchemaFieldsStore', () => {
  it('should load schema fields, roles, and types asynchronously', async () => {
    const builder = createTestBuilder('schema-conn')
    const chartBuilder = createChartBuilderStore(builder)
    const schemaStore = createChartSchemaFieldsStore(chartBuilder)

    // Wait for async updateState() using vi.waitFor re-exported by @stencil/vitest
    await vi.waitFor(() => {
      expect(schemaStore.state.schemaFields.length).toBe(4)
      expect(schemaStore.state.fieldRoleMap.category).toBe('dimension')
      expect(schemaStore.state.fieldRoleMap.sales).toBe('measure')
      expect(schemaStore.state.fieldTypeMap.category).toBe('string')
      expect(schemaStore.state.fieldTypeMap.sales).toBe('number')
    })

    schemaStore.dispose()
    chartBuilder.dispose()
  })
})
