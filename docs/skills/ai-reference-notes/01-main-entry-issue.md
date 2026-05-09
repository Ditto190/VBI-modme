# 1. @visactor/vbi Main Entry Export Notes

## Important Note

**Each practice is an independent project** with its own connector/bootstrap module, such as `demoConnector.ts` or `localConnector.ts`. The notes below describe the general approach and apply to all practices.

## Current Status

The `@visactor/vbi` main entry now exports core runtime APIs, including `VBI`, `createVBI`, `VBIChartBuilder`, `registerConnector`, and `createEmptyChart`.

The following capabilities can be accessed directly through the main entry:

| Feature                              | Actual location                  | Notes                           |
| ------------------------------------ | -------------------------------- | ------------------------------- |
| `VBI` / `VBI.chart.create()`         | `src/vbi/create-vbi.ts`          | ✅ Exported from the main entry |
| `VBIChartBuilder`                    | `src/chart-builder/builder.ts`   | ✅ Exported from the main entry |
| `registerConnector` / `getConnector` | `src/chart-builder/connector.ts` | ✅ Exported from the main entry |
| `createEmptyChart`                   | `src/vbi/create-empty-chart.ts`  | ✅ Exported from the main entry |
| All DSL types, such as `VBIChartDSL` | `src/types/chartDSL/`            | ✅ Exported from the main entry |
| All Builder types                    | `src/types/builder/`             | ✅ Exported from the main entry |
| Type guards such as `isVBIFilter`    | `src/utils/filter-guards.ts`     | ✅ Exported from the main entry |

## Why Practice Code Is Still the Recommended Reference

Each practice's `tsconfig.json` configures:

```json
{
  "moduleResolution": "bundler",
  "paths": { "src/*": ["./src/*"] }
}
```

Each practice still implements its own connector/bootstrap module, default builder, and page initialization logic. Even when the main entry can be imported directly, AI should prefer the internal wrapper of the specific practice being edited instead of assuming every app shares the same wiring.

## Current @visactor/vseed Main Entry Status

The `@visactor/vseed` main entry (`src/index.ts`) already exports `Builder`, and exposes `isVChart` / `isPivotChart` / `isTable` / `isPivotTable` plus `VSeed`-related types through `pipeline/types`.

```ts
import { Builder, isVChart, isPivotChart, isTable, isPivotTable, type VSeed } from '@visactor/vseed'
```

## Correct Reference Pattern

Use the **target practice's** own connector/bootstrap module directly:

```ts
// Recommended: prefer the target practice's own bootstrap module.
import { createDefaultBuilder } from 'src/utils/localConnector'
const builder = createDefaultBuilder()

// The main entry API can also be used directly.
import { VBI } from '@visactor/vbi'
```

## Source Locations

| Feature                               | Source location                                 |
| ------------------------------------- | ----------------------------------------------- |
| Main entry                            | `packages/vbi/src/index.ts`                     |
| VBI.chart.create                      | `packages/vbi/src/vbi/create-vbi.ts`            |
| VBIChartBuilder                       | `packages/vbi/src/chart-builder/builder.ts`     |
| registerConnector                     | `packages/vbi/src/chart-builder/connector.ts`   |
| createEmptyChart                      | `packages/vbi/src/vbi/create-empty-chart.ts`    |
| filter-guards, exported by main entry | `packages/vbi/src/utils/filter-guards.ts`       |
| vseed main entry                      | `packages/vseed/src/index.ts`                   |
| VSeedBuilder                          | `packages/vseed/src/builder/builder/builder.ts` |
| isVChart and related helpers          | `packages/vseed/src/pipeline/utils/chatType.ts` |
