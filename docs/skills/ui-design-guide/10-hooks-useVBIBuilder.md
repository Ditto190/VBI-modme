# 10. useVBIBuilder — Global Configuration (locale / theme / limit)

## Signature

```ts
const {
  locale, // DemoLocale; current locale ('zh-CN' | 'en-US')
  theme, // DemoTheme; current theme ('light' | 'dark')
  limit, // number; data row limit
  connectorId, // string; current Connector ID
  setLocale, // (locale: DemoLocale) => void
  setTheme, // (theme: DemoTheme) => void
  setLimit, // (limit: number) => void
} = useVBIBuilder(builder)
```

## Source

`practices/standard/src/hooks/useVBIBuilder.ts`

## Usage Examples

### Change Locale

```ts
setLocale('zh-CN') // Chinese
setLocale('en-US') // English
```

### Change Theme

```ts
setTheme('light') // Light theme
setTheme('dark') // Dark theme
```

### Set Data Limit

```ts
setLimit(500) // Return only 500 data rows
setLimit(1000) // Default limit
```

---

## Constant Definitions

`practices/standard/src/constants/builder.ts`

```ts
export const DEMO_DEFAULT_LOCALE = 'zh-CN'
export const DEMO_DEFAULT_THEME = 'light'
export const DEMO_DEFAULT_LIMIT = 1000
export const DEMO_MAX_LIMIT = 1000

export const DEMO_SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const
export const DEMO_SUPPORTED_THEMES = ['light', 'dark'] as const

export type DemoLocale = 'zh-CN' | 'en-US'
export type DemoTheme = 'light' | 'dark'
```

---

## Implementation Details

- State subscription uses `builder.doc.on('update', ...)` and synchronizes `locale`/`theme`/`limit` from the DSL via `builder.dsl.toJSON()`.
- `setLimit` calls `normalizeLimit()` internally, automatically rounding the value and enforcing a minimum of 1.
- `setLocale` / `setTheme` / `setLimit` call `builder.locale.setLocale()` / `builder.theme.setTheme()` / `builder.limit.setLimit()` respectively.
- Initial values are synchronized from the DSL JSON snapshot and fall back to constant defaults when no defaults exist.

---

## Notes

- `limit` affects the number of rows returned by the SQL query, not the number of rendered rows.
- Theme changes affect both the Toolbar and VSeed rendering output.
- Locale changes affect internationalized display such as number formatting and thousands separators.
