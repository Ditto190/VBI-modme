# 极简实践

`practices/minimalist` 的参考资料。它是最小的独立 VBI app，适合需要紧凑、
可读实现的任务，而不是完整 demo。

## 定位

Minimalist 是低仪式感 APP：

- 当前源码面最小：约 30 个源码文件和一个聚焦测试文件。
- 唯一自定义 hook 是 `useFullscreen`。
- 使用原生 HTML drag/drop，不使用 `@dnd-kit`。
- 使用远程 CSV demo connector 和硬编码 schema。
- 没有 i18n 模块；label 放在 `src/config/labels.ts`。
- 不提供 CSV 上传、source switching、完整 hook suite 或复杂 modal。

相比 `streamlined`，它更扁平、更少 workflow。相比 `standard` 和
`professional`，它是学习样例，不是标准实现来源。

## 结构

- 入口：`src/index.tsx`、`src/App/App.tsx`。
- 编辑 UI：`src/components/EditMode.tsx`。
- UI panel：扁平放在 `src/components/**`。
- 状态：`src/model/VBIStore.ts`、`src/model/VBIStoreProvider.tsx`。
- 渲染：`src/components/Render/VSeedRender.tsx`。
- 启动：`src/utils/demoConnector.ts`。
- 字段/filter helper：`src/utils/fields.ts`、`src/utils/filter.ts`。

## 差异点

- Store 在 `createVBIStore` 中立即初始化，没有显式 `initialize` 生命周期。
- Connector 注册 `demo`，并从公开 supermarket URL 创建 VQuery CSV dataset。
- Drag payload 通过 `dataTransfer` 和 `src/utils/fields.ts` 中的内存 fallback 保存。
- `VSeedRender` 是最裸的 renderer：VChart、list table、pivot table、
  pivot chart；没有 legend filtering helper，也没有 Ant Design error message。
- view/edit mode 保留在 `AppContent`；edit mode 直接组合 toolbar、field panel、
  shelf panel、filter panel、chart body。

## 开发规则

- 不要从其他 practice import。
- 保持组件短小；只有渲染、状态、mutation 逻辑混在一起时才抽取。
- 使用 Builder API 作为 mutation 边界。
- 除非任务明确要求扩展 minimal sample，否则不要加入 standard/professional 功能。
- 优先使用本地 utility，不新增抽象层。

## 验证

```bash
pnpm --filter minimalist run test
pnpm --filter minimalist run lint
pnpm --filter minimalist run typecheck
pnpm --filter minimalist run build
```
