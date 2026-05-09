# 11. useVBISchemaFields — Field List

## Signature

```ts
const {
  schemaFields, // VBISchemaField[]; field list with role/type classification
  fieldRoleMap, // Record<string, FieldRole>; field name -> role mapping
  fieldTypeMap, // Record<string, string>; field name -> type mapping
} = useVBISchemaFields(builder)
```

## Source

`practices/standard/src/hooks/useVBISchemaFields.ts`

## VBISchemaField Type

```ts
export interface VBISchemaField {
  name: string // Field name, such as 'sales'
  type: string // Field type, such as 'number', 'string', or 'date'
  role: FieldRole // Field role: 'dimension' | 'measure' | 'unknown'
  isDate: boolean // Whether this is a date type
}
```

## Usage Examples

### Get and Render the Field List

```ts
const { schemaFields } = useVBISchemaFields(builder)

// Group by role for rendering
const dimensions = schemaFields.filter((f) => f.role === 'dimension')
const measures = schemaFields.filter((f) => f.role === 'measure')
```

### Quickly Look Up Field Roles

```ts
const { fieldRoleMap } = useVBISchemaFields(builder)

if (fieldRoleMap['sales'] === 'measure') {
  // sales is a measure field
}
```

### Quickly Look Up Field Types

```ts
const { fieldTypeMap } = useVBISchemaFields(builder)

console.log(fieldTypeMap['order_date']) // 'date'
console.log(fieldTypeMap['category']) // 'string'
console.log(fieldTypeMap['sales']) // 'number'
```

---

## Implementation Details

- Field data is fetched asynchronously through `builder.getSchema()`, which returns `DatasetColumn[]`.
- Field roles are inferred by `getFieldRoleBySchemaType(type)` from `src/utils/fieldRole.ts`.
- Date types are detected by `isDateSchemaType(type)`; a type name containing `date` is treated as a date.
- The async effect uses a `destroyed` flag to prevent state updates after component unmount.

---

## Field Role Inference Rules

| Field Type | Role        | Examples                           |
| ---------- | ----------- | ---------------------------------- |
| `number`   | `measure`   | `sales`, `profit`, `amount`        |
| `string`   | `dimension` | `category`, `city`, `product_name` |
| `date`     | `dimension` | `order_date`, `delivery_date`      |

---

## Notes

- `schemaFields` is fetched asynchronously and may be an empty array on the first render.
- `fieldRoleMap` and `fieldTypeMap` are derived from `schemaFields` for O(1) lookups.
- Field roles are only for UI grouping and do not constrain actual usage.
- Render this in the FieldsPanel component, paired with search and role filtering.
