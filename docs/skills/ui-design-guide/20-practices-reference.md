# 20. UI 开发参考的 Practices

> 本文档记录开发 VBI UI 时可参考的 practices，以及每个 practice 提供的具体价值。仅包含当前仓库实际存在的 practices。

---

## 参考索引

### professional

- **位置**：`practices/professional/`
- **参考价值**：最完整、最可靠的参考实现，适合验证 hooks/API 实际行为
- **涵盖内容**：
  - 完整 hooks 实现（签名齐全）
  - `useVBISchemaFields` 返回 `fieldRoleMap` / `fieldTypeMap`
  - `useVBIWhereFilter` / `useVBIHavingFilter` 的 `replaceFilters`
  - `useVBIBuilder` 的 `theme` / `setTheme` / `limit` / `setLimit`
  - `useVBIChartType` 的 `availableChartTypes`
  - VSeedRender 错误处理（过滤条件兜底）
  - `localConnector.ts` 的本地数据连接与类型规范化

---

### standard

- **位置**：`practices/standard/`
- **参考价值**：标准化结构最完整，适合作为文档示例与模板基线
- **涵盖内容**：
  - 完整 UI 目录组织与组件分层
  - VBIStore + VBIStoreProvider 模板
  - hooks + Shelf/Toolbar 组件协作模式
  - `localConnector.ts` + `createDefaultBuilder()` 初始化路径

---

### streamlined

- **位置**：`practices/streamlined/`
- **参考价值**：最简 Connector 与数据流实现，便于快速理解主链路
- **涵盖内容**：
  - `demoConnector.ts`（`registerDemoConnector` + `defaultBuilder`）
  - 轻量 VBIStore（直接监听 `buildVSeed()`）
  - `vbi-filter-error` 事件同步模式
  - CSV URL 数据源接线（`type: 'csv', rawDataset: url`）

---

### standard-report

- **位置**：`practices/standard-report/`
- **参考价值**：报告类场景（非单图表工作台）布局与模块化组织参考
- **涵盖内容**：
  - `App/layout` / `App/hooks` 的页面化分层
  - 报告场景下的状态与布局拆分

---

### vbi-react-starter

- **位置**：`practices/vbi-react-starter/`
- **参考价值**：`@visactor/vbi-react` 官方包集成示例
- **涵盖内容**：
  - `useVBI` / `useVSeed` / `useDimensions` 等 package hooks 用法
  - `ChartRenderer` / `FieldPanel` / `BuilderLayout` 组件接线

---

## 按 API 分组的参考来源

| API / 功能                        | 主要参考            | 备选参考       |
| --------------------------------- | ------------------- | -------------- |
| Connector/bootstrap（CSV URL）    | `streamlined`       | -              |
| Connector/bootstrap（local data） | `standard`          | `professional` |
| VBIStore                          | `professional`      | `streamlined`  |
| VBIStoreProvider                  | `standard`          | -              |
| Hooks 签名（practice 版）         | `professional`      | `standard`     |
| VSeedRender                       | `professional`      | `standard`     |
| WHERE 过滤                        | `professional`      | `streamlined`  |
| HAVING 过滤                       | `professional`      | `standard`     |
| ChartTypeSelector                 | `standard`          | `professional` |
| FieldsPanel                       | `standard`          | `professional` |
| FilterPanel / HavingFilterPanel   | `professional`      | `standard`     |
| 主题切换                          | `standard`          | `professional` |
| i18n 国际化                       | `standard`          | `professional` |
| CSV 上传 + schema 推断            | `professional`      | `standard`     |
| Undo/Redo                         | `professional`      | `standard`     |
| `@visactor/vbi-react` hooks/组件  | `vbi-react-starter` | -              |

---

## 使用建议

### 新建 VBI UI 时

1. 以 `standard` 作为结构模板（目录、Provider、Store、组件分层）
2. 以 `professional` 作为逻辑参考（hooks 的完整行为和边界处理）
3. 以 `streamlined` 作为 Connector 最简参考（快速打通数据链路）
4. 如果明确要使用 `@visactor/vbi-react` 包，再参考 `vbi-react-starter`

### 不要混用的模式

- 将 `@visactor/vbi-react` hooks 与 practice 自有 hooks 混用
- 跨 practice 直接引用 `src/*` 组件或 hooks

### 关键原则

- **每个 practice 必须独立实现核心模块**，不能跨 practice 引用
- Connector 与 builder 初始化在目标 practice 的 bootstrap 模块中完成（文件名可不同）
- VSeedRender 必须由当前 practice 自己实现
- 除 `vbi-react-starter` 外，优先使用目标 practice 的 `src/hooks/`
