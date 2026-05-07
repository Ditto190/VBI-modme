# 精简实践

`practices/streamlined` 的参考资料。它是 connector bootstrap、CSV URL 数据流
和轻量 workbench 行为的快速路径；当任务需要主 VBI pipeline，但不需要 standard
app 的完整框架时使用。

## 定位

Streamlined 是轻量 workflow APP：

- 中等源码面：约 57 个源码文件和一个聚焦测试文件。
- 像 `minimalist` 一样使用远程 CSV demo connector。
- 通过 `useInitializeVBI` 增加显式初始化。
- 使用三列 workbench：fields、config、chart workspace。
- `src/styles/**` 下有模块化样式。
- Hooks 保持最少：初始化和 fullscreen。

相比 `minimalist`，它有更清晰的 workflow panel 和更多可复用 action utility。
相比 `standard`，它有意省略 i18n 文件、CSV 上传、source switching 和完整 hook
suite。相比 `professional`，它是 slot/config 行为的简单实现，不是 business UI。

## 结构

- 入口：`src/index.tsx`、`src/App/App.tsx`。
- Workbench：`src/components/Workbench/EditorWorkbench.tsx`。
- 图表区：`src/components/Chart/**`。
- Config 和 fields：`src/components/Config/**`、`src/components/Fields/**`。
- Store：`src/model/VBIStore.ts`、`src/model/VBIStoreProvider.tsx`。
- Connector：`src/utils/demoConnector.ts`。
- 功能逻辑：`src/utils/*Actions.ts`、`dragDrop.ts`、`filterInput.ts`。
- 样式：`src/styles/app.css` import feature CSS files。

## 差异点

- Connector 注册 `demo`，并直接从公开 supermarket URL 创建 VQuery CSV dataset。
- Store 有显式 `initialize`、`initialized`、`schema`、`loading`、`vseed`，
  但没有缓存，也没有 source switching。
- `useFullscreen` 在浏览器 fullscreen 失败时包含 fallback fullscreen state。
- Config slots 由 `slotConfig.ts` 驱动；Builder mutation 位于
  `mappingActions.ts`、`fieldActions.ts`、`filterActions.ts`。
- `VSeedRender` 像 standard 一样包含 pivot chart legend filtering helper，
  但保持 rendering code 紧凑。

## 开发规则

- 不要从其他 practice import。
- Connector 行为集中在 `demoConnector.ts`。
- 保留 CSV URL 路径：`type: 'csv'`、`rawDataset: url`。
- 保持 `VBIStore` 简单：订阅 doc changes 并重建 VSeed。
- Mapping、filtering、drag/drop mutation 使用聚焦 utility。

## 验证

```bash
pnpm --filter streamlined run test
pnpm --filter streamlined run lint
pnpm --filter streamlined run typecheck
pnpm --filter streamlined run build
```
