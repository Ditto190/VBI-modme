# 专业实践

`practices/professional` 的参考资料。它是最完整的业务化 practice，也是
真实 hook signature、edge case、drag/drop、生产级交互行为的主要参考。

## 定位

Professional 是高保真 APP：

- 源码面较广：约 110 个源码文件，包含 drag/drop model、field token menu、
  overlay、slot 行为等聚焦测试。
- 完整 hook suite，并额外提供 `useInitializeProfessional` 和
  `useProfessionalFields`。
- 使用 `@dnd-kit/core` 做自定义 drag/drop、overlay positioning、slot drop target。
- 通过 `professionalLocalData` 使用本地 JSON 数据。
- 有完整 `src/i18n/**`、theme config、slot config 和分段样式文件。
- 依赖 `@visactor/vbi-react`，但 practice 行为仍通过本地 hooks 和 model 实现。

相比 `standard`，它是更丰富的行为参考，不是更简单的模板。相比 `streamlined`，
它用有测试的 drag/drop model 和 editor model 替代直接 slot 逻辑。相比
`minimalist`，它位于复杂度阶梯的另一端。

## 结构

- 入口：`src/index.tsx`、`src/App.tsx`。
- Editor shell：`src/components/Editor/**`。
- Filters：`src/components/Filter/**`。
- Drag/drop：`src/components/Editor/dnd/**`。
- Hooks：`src/hooks/**`，由 `src/hooks/index.ts` 导出。
- Store：`src/model/VBIStore.ts`、`src/model/VBIStoreProvider.tsx`。
- Connector/data：`src/utils/localConnector.ts`、`localDataset.ts`、
  `parseCsv.ts`、`supermarketSchema.ts`。
- 样式：`src/App.css` import `src/styles/**`。

## 差异点

- `createDefaultBuilder()` 注册 connector，并立即设置默认 locale/theme/limit。
- 初始化委托给 `useInitializeProfessional`，它会先调用
  `prepareProfessionalVBI()`，再执行 store `initialize`。
- Editor state 通过 `useProfessionalEditorModel` 组装；shell 组件保持组合职责。
- Drag/drop 行为拆成 payload、target model、drop logic、overlay position、
  provider 文件，并为纯 decision logic 写测试。
- Filter 和 having filter UI 使用 modal/model 组合，不使用 standard 的 shelf panel
  风格。
- `VSeedRender` 委托给 `renderVSeed`，并通过 Ant Design `message.error` 报告
  render failure。

## 开发规则

- 不要从其他 practice import。
- 行为放在 hooks、models 或 utils；组件专注 view 和 interaction composition。
- 保留完整 hook signature 和 edge-case handling。
- Drag/drop model logic 尽量在 React 之外可测试。
- 可见文案同步更新两个 locale。
- 使用 `localConnector.ts` 作为本地数据和 schema normalization 边界。

## 验证

```bash
pnpm --filter professional run test
pnpm --filter professional run lint
pnpm --filter professional run typecheck
pnpm --filter professional run build
```
