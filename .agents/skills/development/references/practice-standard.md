# 标准实践

`practices/standard` 的参考资料。它是 VBI UI 示例的标准结构模板；当任务需要
可维护目录边界和最清晰的可复用实现模式时使用。

## 定位

Standard 是结构基线 APP：

- 当前源码面最大：约 100 个源码文件和较完整测试。
- `src/hooks/**` 下有完整 practice hook suite。
- 使用 `@dnd-kit` 做 shelf drag/drop。
- 通过 `localConnector.ts` 使用本地 JSON 数据，支持 CSV 上传和 schema 自定义。
- 有完整 `src/i18n/**`，覆盖 `zh-CN` 和 `en-US`。
- Store 提供 `switchSource`，用于替换当前 connector/data。

相比 `minimalist`，它展示同一组想法的可扩展版本。相比 `streamlined`，
它偏显式分层而不是快速路径。相比 `professional`，它是模板基线；除非任务要求，
不要加入 business-style overlay 或高密度交互 polish。

## 结构

- 入口：`src/index.tsx`、`src/App/App.tsx`。
- App shell：`src/App/**`。
- 可复用 UI：`src/components/**`。
- Shelves：`src/components/Shelves/**`。
- Hooks：`src/hooks/**`，由 `src/hooks/index.ts` 导出。
- Store：`src/model/VBIStore.ts`、`src/model/VBIStoreProvider.tsx`。
- Connector/data：`src/utils/localConnector.ts`、`dataset.ts`、`parseCsv.ts`、
  `supermarketSchema.ts`。
- i18n：`src/i18n/**`。

## 差异点

- App 初始化等待 `initVBIConnector()`，再调用 store `initialize(builder)`。
- Store 按 builder 和 DSL snapshot 缓存构建后的 VSeed，暴露 `switchSource`，
  并在 source 切换时保留 theme、locale、limit。
- `CSVModal` 是用户 CSV 导入和 schema 编辑的标准参考。
- `VSeedRender` 包含 pivot chart legend filtering helper，并用 console logging
  捕获 render failure。
- Date filter utility 使用 `dayjs`；日期行为必须有聚焦 utility 测试覆盖。
- Toolbar、shelves、filter panels、chart type selector、store provider、i18n
  是新增 practice UI 的优先结构参考。

## 开发规则

- 不要从其他 practice import。
- 保持 standard 作为标准示例；避免 professional-only 复杂度。
- Builder mutation 放在 hook 或聚焦 utility 中。
- 让 shelf 和 filter panel 保持轻薄；把纯 list、date、operator 逻辑抽到
  utility 并补测试。
- 可见文案必须同时更新 `zh-CN.json` 和 `en-US.json`。

## 验证

```bash
pnpm --filter standard run test
pnpm --filter standard run lint
pnpm --filter standard run typecheck
pnpm --filter standard run build
```
