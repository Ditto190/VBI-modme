import type { VBIChartDSL } from '@visactor/vbi'
import type { MappedField, SchemaField } from 'src/types'

type RawMappedField = Omit<MappedField, 'isDate' | 'role'> & { role?: SchemaField['role'] }

export const getMappedFields = (dsl: VBIChartDSL, fields: SchemaField[]): MappedField[] => {
  const schemaByName = new Map(fields.map((field) => [field.name, field]))
  return [
    ...(dsl.dimensions as RawMappedField[]).map((item) => mapItem(item, 'dimension', schemaByName)),
    ...(dsl.measures as RawMappedField[]).map((item) => mapItem(item, 'measure', schemaByName)),
  ]
}

export const getFieldLabel = (item: Pick<MappedField, 'aggregate' | 'alias' | 'field'>) => {
  const base = item.alias || item.field
  const aggregate = item.aggregate?.func
  return aggregate ? `${aggregate}(${base})` : base
}

const mapItem = (
  item: RawMappedField,
  role: SchemaField['role'],
  schemaByName: Map<string, SchemaField>,
): MappedField => {
  const schemaField = schemaByName.get(item.field)
  return {
    ...item,
    field: item.field,
    id: item.id,
    isDate: schemaField?.isDate ?? false,
    role,
  }
}
