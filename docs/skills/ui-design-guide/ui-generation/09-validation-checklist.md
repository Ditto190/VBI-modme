# 09. 完整 UI 验证清单

生成或修改 VBI UI 后，按这个清单检查。

## 架构

- [ ] 没有跨 practice 导入 `src/*`。
- [ ] 当前 practice 自己实现了 `VSeedRender`。
- [ ] 当前 practice 自己实现或明确使用了自己的 store/provider。
- [ ] 只有 `vbi-react-starter` 类型的轻量集成才直接使用 `@visactor/vbi-react` components。
- [ ] Builder API 存在时，没有直接写 `builder.dsl`。

## 数据

- [ ] connector 已注册。
- [ ] `discoverSchema()` 能返回字段列表。
- [ ] `query()` 能接收并执行 `queryDSL`，不是直接返回原始 dataset。
- [ ] query 返回的 dataset 列名与 VBI/VSeed 的 dimension/measure 节点 `id` 对齐。
- [ ] 本地 JSON 数据是扁平对象。
- [ ] 切换数据源后清空旧 dimensions、measures、filters。
- [ ] schema 变化后字段面板刷新。

## React 状态

- [ ] store 保存 `builder`、`dsl`、`schema`、`loading`、`vseed`、`initialized`。
- [ ] 已监听 `builder.doc.on('update')`。
- [ ] 卸载时解绑 listener。
- [ ] 异步 `buildVSeed()` 返回前检查当前 builder 是否仍然有效。
- [ ] 空配置不调用无意义的 `buildVSeed()`。

## UI 功能

- [ ] 可以加载数据。
- [ ] 可以添加 dimension。
- [ ] 可以添加 measure。
- [ ] 可以切换 chart type。
- [ ] 可以修改 theme / locale / limit。
- [ ] 可以添加 WHERE filter。
- [ ] 可以添加 HAVING filter。
- [ ] 可以 undo / redo。
- [ ] 可以删除字段 token。
- [ ] 可以处理长字段名。
- [ ] Changing a measure aggregate updates DSL and rebuilds VSeed.
- [ ] `sum`, `avg`, `min`, `max`, `median`, and `count` do not all produce the
      same values on grouped raw data unless the selected dimension is unique-row
      grain.
- [ ] WHERE `in` / `not in` filters are stored as array values and are converted
      by VBI/VQuery, not hand-built SQL strings.
- [ ] HAVING filters include an aggregate and do not expose invalid aggregate
      choices for dimension fields.
- [ ] Filter editors do not close or clear drafts when an inner Select dropdown
      opens.

## 渲染

- [ ] `registerAll()` 来自 `@visactor/vseed`。
- [ ] `register.chartModule('vchart', VChart)` 已调用。
- [ ] `VSeedBuilder.from({ ...vseed, theme })` 使用当前 theme。
- [ ] `VSeedRender` 会在 cleanup 中 release 旧实例。
- [ ] VChart、ListTable、PivotTable、PivotChart 都有分流逻辑。
- [ ] 渲染失败不会导致整个 React app 崩溃。

## 视觉和交互

- [ ] chart workspace 高度稳定。
- [ ] loading / empty / error 不改变整体布局尺寸。
- [ ] 面板内部滚动，不撑开整个页面。
- [ ] dimensions 和 measures 有明确颜色区分。
- [ ] slot / shelf hover 不造成布局跳动。
- [ ] 明暗主题文字对比度正常。
- [ ] Antd theme 和 VSeed theme 一致。

## 验证命令

优先运行相关 scope 的命令：

```bash
pnpm --filter <practice-or-package> run typecheck
pnpm --filter <practice-or-package> run lint
pnpm --filter <practice-or-package> run test
```

仓库级变更再运行：

```bash
pnpm run lint:check
pnpm run typecheck
```
