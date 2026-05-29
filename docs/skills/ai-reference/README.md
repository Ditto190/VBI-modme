# VBI AI Reference Documentation

> This documentation is written for AI agents. It helps you quickly write correct VBI code when users ask for chart-related changes.
> The core organization is "user intent -> code pattern", covering the full flow from initialization to rendering.

---

## Document Structure

| File                                                               | Content                                                    | Should AI use it?        |
| ------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------ |
| [01-core-concepts.md](./01-core-concepts.md)                       | Core concepts, data flow, and Yjs Doc structure            | ✅ Use                   |
| [02-quick-start.md](./02-quick-start.md)                           | Minimal runnable example based on the actual standard code | ✅ Use                   |
| [03-vbi-api.md](./03-vbi-api.md)                                   | Complete VBIChartBuilder API                               | ✅ Use                   |
| [04-common-patterns.md](./04-common-patterns.md)                   | Common intents -> code patterns at the Builder API layer   | ✅ Use                   |
| [05-react-integration.md](./05-react-integration.md)               | VBI-react hooks and how AI-triggered UI updates work       | ✅ Use                   |
| [07-connector.md](./07-connector.md)                               | Connector system reference                                 | 📖 Further reading       |
| [08-dsl-types.md](./08-dsl-types.md)                               | DSL type quick reference                                   | ✅ Use                   |
| [09-standard-practice.md](./09-standard-practice.md)               | Standard Practice panel component quick reference          | 📖 Further reading       |
| [10-feature-status.md](./10-feature-status.md)                     | Feature status table: what can and cannot be used          | ✅ Use                   |
| [../ai-reference-notes/README.md](../ai-reference-notes/README.md) | Key findings and maintenance notes                         | 📖 Maintenance reference |

---

## Core Data Flow

```
User interaction (drag/input)
  -> VBIChartBuilder (VBI spec; AI operates at this layer)
      | buildVSeed() runs internally
      |-> buildVQuery() (generates query DSL)
      |-> connector.query() (runs SQL and fetches data)
      `-> buildVSeedDSL() (assembles the intermediate VSeed artifact)
  -> VSeed (internal intermediate artifact)
  -> VSeedRender (implemented separately by each practice)
      | VSeedBuilder.from(vseed).build()
      v
  -> VChart / VTable Spec
  -> Browser rendering
```

**AI only needs to operate on VBIChartBuilder**. Data fetching and rendering after that are handled automatically by the framework. VSeed, VSeedBuilder, VChart, and VTable are invisible to AI and do not need to be understood. **Each practice implements VSeedRender independently**; it is not provided by any npm package.

---

## AI Chart Generation Flow

1. Configure the chart through Builder APIs such as `builder.dimensions.add()` and `builder.measures.add()`.
2. The Yjs document changes automatically and triggers the `doc.on('update')` event.
3. The target practice's own VBIStore listens for the change and calls `builder.buildVSeed()` to rebuild rendering data.
4. The target practice's own `VSeedRender` component automatically renders the new chart.

See [05-react-integration.md](./05-react-integration.md#how-ai-triggers-ui-updates).

---

## Import Quick Reference

```ts
// VBI types (@visactor/vbi)
import type {
  VBIChartBuilder,
  VBIChartDSL,
  VBIDimension,
  VBIMeasure,
  VBIWhereGroup,
  VBIHavingGroup,
} from '@visactor/vbi'

// Hooks used by standard/minimalist/streamlined/professional.
// They come from each practice's own hooks directory.
import {
  useVBIBuilder,
  useVBIChartType,
  useVBIDimensions,
  useVBIMeasures,
  useVBIWhereFilter,
  useVBIHavingFilter,
  useVBISchemaFields,
  useVBIUndoManager,
} from 'src/hooks' // Import inside the target practice, not from @visactor/vbi-react.

// Hooks used by vbi-react-starter, from the @visactor/vbi-react package.
import {
  useVBI,
  useVSeed,
  useDimensions,
  useMeasures,
  useWhereFilter,
  useHavingFilter,
  useChartType,
  useTheme,
} from '@visactor/vbi-react'

// Components used by vbi-react-starter.
import {
  BuilderLayout,
  ChartRenderer,
  ChartTypeSelector,
  FieldPanel,
  FilterPanel,
  ThemeSelector,
} from '@visactor/vbi-react/components'
```

> **About the @visactor/vbi main entry**: The current `@visactor/vbi` package main entry already exports core APIs such as `VBI`, `VBIChartBuilder`, `VBI.connectors`, and `createEmptyChart`. Even so, each practice still **implements its own** connector/bootstrap module, such as `demoConnector.ts` or `localConnector.ts`, to wrap connector registration and default builder initialization. When AI operates on a specific practice, it should still prefer that practice's own implementation. See [10-feature-status.md](./10-feature-status.md).

> **About the vbi-react package**: Only `vbi-react-starter` uses the hooks and components provided by `@visactor/vbi-react`. Other practices (minimalist/streamlined/professional/standard) **independently implement** their own hooks and model, and do not depend on `@visactor/vbi-react`.

---

## Documentation Conventions

- All **Builder API** examples are based on a `builder` instance of type `VBIChartBuilder`.
- **When AI operates on a practice**, import only from that practice's internal `src/` paths. Do not reference components across practices.
- **VSeedRender** is **implemented independently** by each practice and is not provided by any npm package.
- "✅ Available" means the feature is implemented in source code and covered by tests.
- "⚠️ Alternative available" means the feature exists but must be accessed through another path.
- "🔧 Can be added to vbi-react" means the feature has been implemented in a practice and can be moved into the vbi-react package.
