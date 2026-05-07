# 9. Standard Practice Panel Component Quick Reference (Further Reading)

> This section is supplemental. Standard Practice is a complete UI implementation based on VBI + VBI-react. Understanding its structure helps AI understand how to operate the frontend panels.

## 9.1 Directory Structure

```
practices/standard/src/
├── App/
│   ├── App.tsx           # Main app entry. Manages layout, theme, and fullscreen mode.
│   └── components/
│       ├── ShelfPanel.tsx     # Four-row shelf panel: Dimensions/Measures/Where/Having.
│       ├── FilterRootOperatorToggle.tsx  # Filter root operator toggle: and/or.
│       └── ShelfRow.tsx       # Shelf row component.
├── components/
│   ├── Render/
│   │   └── VSeedRender.tsx   # VSeed renderer. Internal implementation; AI should not call it directly.
│   ├── Fields/
│   │   └── FieldList/index.tsx  # Left-side field list panel.
│   ├── Shelves/
│   │   ├── shelves/
│   │   │   ├── DimensionShelf.tsx  # Dimension shelf with draggable tags.
│   │   │   ├── MeasureShelf.tsx    # Measure shelf.
│   │   │   ├── WhereShelf.tsx      # WHERE filter shelf.
│   │   │   └── HavingShelf.tsx     # HAVING filter shelf.
│   │   ├── dnd/                   # DnD Kit drag-and-drop context.
│   │   │   ├── ShelfDndProvider.tsx
│   │   │   └── types.ts
│   │   ├── utils/
│   │   │   └── dimensionDateAggregateUtils.ts  # Date dimension aggregation utilities.
│   │   └── common/
│   │       ├── FieldShelf.tsx      # Shared shelf tag component.
│   │       └── openShelfRenameModal.tsx  # Rename modal.
│   └── Toolbar/               # Toolbar: undo/redo/theme toggle/fullscreen.
├── model/
│   ├── VBIStore.ts           # Zustand store: builder state + VSeed cache.
│   └── VBIStoreProvider.tsx  # React Context provider.
├── hooks/                    # React hooks: business hooks wrapped around vbi-react.
│   ├── useVBIBuilder.ts      # Global config: locale/theme/limit.
│   ├── useVBIDimensions.ts   # Dimension operations.
│   ├── useVBIMeasures.ts     # Measure operations.
│   ├── useVBIWhereFilter.ts  # WHERE filter.
│   ├── useVBIHavingFilter.ts  # HAVING filter.
│   ├── useVBISchemaFields.ts # Field list with role/type.
│   ├── useVBIUndoManager.ts  # Undo/Redo.
│   ├── useVBIStore.ts        # Store hook.
│   └── useVBIChartType.ts    # Chart type.
└── utils/
    ├── localConnector.ts      # Demo data source Connector + builder factory.
    └── fieldRole.ts          # Field role mapping.
```

## 9.2 Field Roles (`FieldRole`)

```ts
// practices/standard/src/utils/fieldRole.ts
type FieldRole = 'dimension' | 'measure'

// Infer role from field type automatically.
getFieldRoleBySchemaType('number') // -> 'measure'
getFieldRoleBySchemaType('string') // -> 'dimension'
getFieldRoleBySchemaType('date') // -> 'dimension'
```

## 9.3 Drag Fields onto Shelves

Field-to-shelf drag and drop is implemented with `@dnd-kit/core`:

```tsx
import { useDraggable } from '@dnd-kit/core'
import { createSchemaFieldDragId, type SchemaFieldDragData } from 'src/components/Shelves/dnd'

// Create a drag ID.
const dragId = createSchemaFieldDragId({
  field: 'category',
  role: 'dimension',
})

// Drag data format.
const dragData: SchemaFieldDragData = {
  kind: 'schema-field',
  payload: {
    field: 'category',
    type: 'string',
    role: 'dimension',
  },
  label: 'category',
}
```

## 9.4 Schema Field Type

```ts
// practices/standard/src/hooks/useVBISchemaFields.ts
interface VBISchemaField {
  name: string // Field name.
  type: string // 'string' | 'number' | 'date' | 'datetime' | 'timestamp' | 'boolean'
  role: FieldRole // 'dimension' | 'measure'
  isDate: boolean // Whether this is a date-like type.
}

// Usage.
const { schemaFields, fieldRoleMap, fieldTypeMap } = useVBISchemaFields(builder)
```

## 9.5 Date Dimension Aggregation Utilities

```ts
// src/components/Shelves/utils/dimensionDateAggregateUtils.ts
import {
  formatDimensionDateAggregate,
  getDefaultDimensionDateAggregate,
  getDimensionDateAggregateItems,
  isDateDimensionField,
  normalizeDimensionDateAggregate,
} from 'src/components/Shelves/utils/dimensionDateAggregateUtils'

// Get the default aggregation for date fields.
const defaultAgg = getDefaultDimensionDateAggregate()
// -> { func: 'toMonth' }

// Get all available date aggregation options.
const items = getDimensionDateAggregateItems()
// -> [{ func: 'toYear', label: 'Year' }, { func: 'toMonth', label: 'Month' }, ...]

// Format display text.
formatDimensionDateAggregate({ func: 'toQuarter' }) // -> 'Quarter'
```

## 9.6 Type Guards

Type guards exported from `@visactor/vbi` (`filter-guards.ts`) are used to determine node types in Where/Having condition trees:

```ts
import { isVBIFilter, isVBIWhereGroup, isVBIHavingFilter } from '@visactor/vbi';
import type { VBIWhereClause, VBIHavingClause } from '@visactor/vbi';

// Determine the type of a Where condition node.
const item: VBIWhereClause = /* ... */;
if (isVBIFilter(item)) {
  // item is a leaf filter node: VBIWhereFilter.
  console.log(item.field, item.op, item.value);
} else if (isVBIWhereGroup(item)) {
  // item is a nested group: VBIWhereGroup.
  console.log(item.op, item.conditions);
}

// Determine the type of a Having condition node.
const havingItem: VBIHavingClause = /* ... */;
if (isVBIHavingFilter(havingItem)) {
  // This is a leaf node with an aggregate property.
  console.log(havingItem.aggregate);
}
```

| Type guard                | Description                                                    | Source location    |
| ------------------------- | -------------------------------------------------------------- | ------------------ |
| `isVBIFilter(item)`       | Checks whether the item is a leaf filter node: VBIWhereFilter  | `filter-guards.ts` |
| `isVBIWhereGroup(item)`   | Checks whether the item is a nested Where group: VBIWhereGroup | `filter-guards.ts` |
| `isVBIHavingFilter(item)` | Checks whether the item is a HAVING leaf node: VBIHavingFilter | `filter-guards.ts` |
