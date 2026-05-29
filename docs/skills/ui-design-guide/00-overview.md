# UI Design Guide

> A complete reference for AI agents designing UI panels for the VBI project. For complete UI generation, start from [ui-generation/README.md](./ui-generation/README.md). Use **professional** and **standard** as the primary references, with **streamlined** and **minimalist** as supporting references. See [20-practices-reference.md](./20-practices-reference.md).

---

## Complete UI Generation

优先阅读这组中文文档。它们面向“agent 独立生成完整 VBI UI”的场景，比旧编号 API 文档更接近实际生成流程。

| File                                                                                           | Contents                                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [ui-generation/README.md](./ui-generation/README.md)                                           | 完整 UI 生成指南主入口和阅读顺序                              |
| [ui-generation/01-complete-flow.md](./ui-generation/01-complete-flow.md)                       | connector -> builder -> store -> UI -> VSeedRender 总流程     |
| [ui-generation/02-react-usage.md](./ui-generation/02-react-usage.md)                           | React 使用方式、practice hooks、vbi-react、Builder API 的边界 |
| [ui-generation/03-state-store.md](./ui-generation/03-state-store.md)                           | 完整 UI 推荐的 Zustand store 模型                             |
| [ui-generation/04-data-connector.md](./ui-generation/04-data-connector.md)                     | connector、schema、CSV/本地数据加载                           |
| [ui-generation/05-vseed-render.md](./ui-generation/05-vseed-render.md)                         | VSeedRender 实现规则和实例生命周期                            |
| [ui-generation/06-slot-encoding.md](./ui-generation/06-slot-encoding.md)                       | 图表类型敏感的 slot / encoding 设计                           |
| [ui-generation/07-component-patterns.md](./ui-generation/07-component-patterns.md)             | 字段面板、配置面板、筛选、toolbar、workspace 组件模式         |
| [ui-generation/08-visual-design.md](./ui-generation/08-visual-design.md)                       | VBI builder 的视觉设计规则                                    |
| [ui-generation/09-validation-checklist.md](./ui-generation/09-validation-checklist.md)         | 完整 UI 生成后的验证清单                                      |
| [ui-generation/10-builder-correctness.md](./ui-generation/10-builder-correctness.md)           | 避免生成不能绘图的坏 builder                                  |
| [ui-generation/templates/compact-template.md](./ui-generation/templates/compact-template.md)   | 紧凑模板，参考 `minimalist`                                   |
| [ui-generation/templates/standard-template.md](./ui-generation/templates/standard-template.md) | 标准模板，参考 `standard`                                     |
| [ui-generation/templates/product-template.md](./ui-generation/templates/product-template.md)   | 产品级模板，参考 `professional`                               |

---

## Document Structure

| File                                                               | Contents                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [01-folder-structure.md](./01-folder-structure.md)                 | Folder structure conventions, constraints, and checklist                                      |
| [02-dsl-types.md](./02-dsl-types.md)                               | DSL type quick reference (VBIChartDSL / VBIDimension / VBIMeasure, etc.)                      |
| [03-builder-api-summary.md](./03-builder-api-summary.md)           | Builder API quick reference (sub-builder method overview)                                     |
| [04-hooks-overview.md](./04-hooks-overview.md)                     | Hooks overview and import rules                                                               |
| [05-hooks-useVBIDimensions.md](./05-hooks-useVBIDimensions.md)     | useVBIDimensions — dimension management                                                       |
| [06-hooks-useVBIMeasures.md](./06-hooks-useVBIMeasures.md)         | useVBIMeasures — measure management                                                           |
| [07-hooks-useVBIWhereFilter.md](./07-hooks-useVBIWhereFilter.md)   | useVBIWhereFilter — WHERE filters                                                             |
| [08-hooks-useVBIHavingFilter.md](./08-hooks-useVBIHavingFilter.md) | useVBIHavingFilter — HAVING filters                                                           |
| [09-hooks-useVBIChartType.md](./09-hooks-useVBIChartType.md)       | useVBIChartType — chart type                                                                  |
| [10-hooks-useVBIBuilder.md](./10-hooks-useVBIBuilder.md)           | useVBIBuilder — locale/theme/limit                                                            |
| [11-hooks-useVBISchemaFields.md](./11-hooks-useVBISchemaFields.md) | useVBISchemaFields — field list                                                               |
| [12-hooks-useVBIUndoManager.md](./12-hooks-useVBIUndoManager.md)   | useVBIUndoManager — Undo/Redo                                                                 |
| [13-hooks-useVBIStore.md](./13-hooks-useVBIStore.md)               | useVBIStore — global state                                                                    |
| [14-vseed-render.md](./14-vseed-render.md)                         | VSeedRender implementation rules and complete code                                            |
| [15-vbi-store.md](./15-vbi-store.md)                               | VBIStore implementation rules and complete code                                               |
| [16-vbi-store-provider.md](./16-vbi-store-provider.md)             | VBIStoreProvider + useVBIStore hook                                                           |
| [17-demo-connector.md](./17-demo-connector.md)                     | Complete Connector/bootstrap module code (demoConnector/localConnector)                       |
| [18-component-patterns.md](./18-component-patterns.md)             | Core UI component patterns: Toolbar / FieldsPanel / ShelfPanel / ChartPanel                   |
| [19-ui-considerations.md](./19-ui-considerations.md)               | UI development notes: floating dropdowns, light mode, filter operators, Connector type rules  |
| [20-practices-reference.md](./20-practices-reference.md)           | Practice reference index and API-grouped reference sources                                    |
| [21-undocumented-apis.md](./21-undocumented-apis.md)               | Correct usage found by reading practice code: WHERE op+value rules, TidyDatum, replaceFilters |
| [22-ui-skill-update-plan.md](./22-ui-skill-update-plan.md)         | Draft plan for rewriting the skills into a complete UI generation guide                       |

---

## Core Principles

### Independence

Each practice is a fully independent project:

- **No cross-practice imports**: all `src/` paths are valid only inside the current practice.
- **Independent VSeedRender implementation**: each practice must implement its own copy and must not import another practice's version.
- **Independent hook wrappers**: each practice has its own hook set exported through `src/hooks/index.ts`.
- **Independent model management**: each practice has its own Zustand store.

### Data Flow

```
User action → Builder API → Yjs Doc update → VBIStore listener → buildVSeed() → VSeedRender rendering
```

AI agents only need to operate through the Builder API (`builder.dimensions.add`, etc.); everything downstream is automatic.

### Import Source Quick Reference

| What you need                              | Import source                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| VBI types (VBIDimension, etc.)             | `@visactor/vbi`                                                                    |
| VSeed / VSeedBuilder                       | `@visactor/vseed`                                                                  |
| vbi-react starter components               | `@visactor/vbi-react/components`                                                   |
| VChart rendering                           | `@visactor/vchart`                                                                 |
| VTable rendering                           | `@visactor/vtable`                                                                 |
| hooks (standard/minimalist/professional)   | `src/hooks/` (the current practice)                                                |
| hooks (vbi-react-starter)                  | `@visactor/vbi-react`                                                              |
| VBI core API (VBI / VBIChartBuilder, etc.) | Main `@visactor/vbi` entry point (often used with a bootstrap module in practices) |

---

## Source References

See [20-practices-reference.md](./20-practices-reference.md).

| Module                      | Recommended source location                                    |
| --------------------------- | -------------------------------------------------------------- |
| hooks (complete signatures) | `practices/professional/src/hooks/`                            |
| hooks (compact pattern)     | `practices/streamlined/src/hooks/`                             |
| VBIStore                    | `practices/professional/src/model/VBIStore.ts`                 |
| VBIStoreProvider            | `practices/standard/src/model/VBIStoreProvider.tsx`            |
| demoConnector (CSV URL)     | `practices/streamlined/src/utils/demoConnector.ts`             |
| localConnector (local data) | `practices/professional/src/utils/localConnector.ts`           |
| VSeedRender                 | `practices/professional/src/components/Render/VSeedRender.tsx` |
| Complete UI example         | `practices/standard/src/App/`                                  |
| vbi-react-starter           | `practices/vbi-react-starter/src/`                             |
