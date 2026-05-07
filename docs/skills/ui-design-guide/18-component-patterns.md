# 18. Component Design Patterns

## Directory Structure

Each practice independently implements a complete component set. A typical structure:

```
src/components/
├── Toolbar/           # Toolbar: chart type selector, undo/redo, locale, theme, data limit
│   ├── index.tsx      # Main Toolbar component
│   └── config.tsx      # Chart type metadata (groups + metas)
├── ChartType/         # Chart type selector
│   └── Selector.tsx   # Popover-embedded Grid
├── Fields/            # Field list
│   └── FieldList/
│       └── index.tsx  # Search + role filter + field item
├── Shelves/            # Configuration shelves
│   └── shelves/
│       ├── DimensionShelf.tsx   # Dimension shelf row + context menu (aggregate/encoding/sort/delete)
│       └── MeasureShelf.tsx      # Measure shelf row + context menu (aggregate/encoding/format/sort/delete)
└── Render/
    └── VSeedRender.tsx           # VSeed -> chart/table rendering
```

---

## Toolbar

**Responsibility**: global configuration entry point (chart type, undo/redo, row limit, locale, theme, fullscreen).

**Subcomponent split principle**:

| Component           | Responsibility                               |
| ------------------- | -------------------------------------------- |
| `ChartTypeSelector` | Chart type Popover selector                  |
| `Toolbar`           | Layout container (Flex + Divider separation) |

**Internal Toolbar pattern**:

```tsx
// Get builder with useVBIStore.
const builder = useVBIStore((state) => state.builder)

// Compose multiple hooks.
const { canUndo, canRedo, undo, redo } = useVBIUndoManager(builder)
const { locale, theme, limit, setLocale, setTheme, setLimit } = useVBIBuilder(builder)
```

**Styling convention**: use `theme.useToken()` to get Ant Design tokens and keep dark/light themes consistent.

---

## ChartTypeSelector — Chart Type Selector

**Responsibility**: display a grouped chart-type grid inside a Popover, with search and icons.

**Call chain**:

```
User clicks a chart type
  → useVBIChartType(builder).changeChartType(type)
  → builder.chartType.changeChartType(type)
  → Yjs doc updates
  → VSeedStore automatically rebuilds VSeed
  → VSeedRender re-renders
```

**Configuration metadata (`config.tsx`)**:

```ts
export interface ChartTypeMeta {
  type: string;           // 'column', 'pie', etc.
  group: ChartGroupKey;    // 'comparison', 'proportion', etc.
  labelKey: string;        // i18n key
  descriptionKey: string;  // i18n key
  icon: ReactNode;         // @ant-design/icons component
}

export const CHART_TYPE_METAS: ChartTypeMeta[] = [
  { type: 'column', group: 'comparison', labelKey: '...', icon: <BarChartOutlined /> },
  // ...
];
```

---

## FieldsPanel — Field Panel

**Responsibility**: show available fields and support role/type filtering, search, and click-to-add.

**Composition**: `FieldsPanel` → `FieldList` → `useVBISchemaFields(builder)` → `builder.getSchema()`

```tsx
const { schemaFields } = useVBISchemaFields(builder)

// Group by role.
const dimensionFields = schemaFields.filter((f) => f.role === 'dimension')
const measureFields = schemaFields.filter((f) => f.role === 'measure')
```

**Click a field to add it to a shelf**:

```tsx
// FieldList/index.tsx
onClick={() => {
  if (field.role === 'dimension') {
    addDimension(field.name);
  } else if (field.role === 'measure') {
    addMeasure(field.name);
  }
}}
```

---

## ShelfPanel — Configuration Shelf Panel

**Responsibility**: display and manage added dimension/measure/filter rows (ShelfRow).

**Four-row structure**:

| Row           | Component                      | Data                                   |
| ------------- | ------------------------------ | -------------------------------------- |
| Dimension row | `DimensionShelf`               | `useVBIDimensions(builder).dimensions` |
| Measure row   | `MeasureShelf`                 | `useVBIMeasures(builder).measures`     |
| WHERE row     | `WhereShelf` (if implemented)  | `useVBIWhereFilter(builder).filters`   |
| HAVING row    | `HavingShelf` (if implemented) | `useVBIHavingFilter(builder).filters`  |

---

## ShelfRow — Single Shelf Row

**Responsibility**: display one added field and support context-menu operations (aggregate/encoding/format/sort/delete).

**Context menu example (DimensionShelf)**:

```tsx
const items = [
  { key: 'encoding', label: 'Set encoding' },
  { key: 'aggregate', label: 'Date aggregation' },
  { key: 'sort', label: 'Sort' },
  { key: 'delete', danger: true, label: 'Delete' },
]

onClick: ({ key }) => {
  if (key === 'delete') {
    removeDimension(item.id)
  } else if (key === 'encoding') {
    // Open the encoding selection Popover.
  }
}
```

---

## ChartPanel — Chart Display Panel

**Responsibility**: wrap VSeedRender and handle loading/empty states.

```tsx
const vseed = useVBIStore((s) => s.vseed)
const loading = useVBIStore((s) => s.loading)

if (loading) return <Spin />
if (!vseed) return <Empty description='Add dimensions and measures' />
return <VSeedRender vseed={vseed} />
```

---

## Data Flow Between Components

```
VBIStoreProvider
  └── builder: VBIChartBuilder
        ├── Toolbar → useVBIBuilder(builder) / useVBIChartType(builder) / useVBIUndoManager(builder)
        ├── FieldsPanel → useVBISchemaFields(builder) + addDimension(builder.dimensions)
        ├── ShelfPanel → useVBIDimensions(builder) / useVBIMeasures(builder) / useVBIWhereFilter(builder)
        │     └── ShelfRow → updateDimension(builder.dimensions) / removeDimension(builder.dimensions)
        └── ChartPanel → useVBIStore(s => s.vseed) → VSeedRender
```

---

## Notes

- **Each practice implements** all components independently and does not import components from other practices.
- Standard way to get builder in components: `const builder = useVBIStore((s) => s.builder);`
- The `builder` parameter in hook callbacks can be `undefined`; hooks already guard this internally.
- Context menus use Antd `Dropdown` + `Menu` and are driven by the `items` configuration object.
- Component styles should prefer Ant Design tokens (`theme.useToken()`) to ensure theme consistency.
