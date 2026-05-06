# VSeed

`packages/vseed`、VSeed 示例、生成的 VSeed 官网页面、option 文档、
API 文档，以及 source-to-docs 生成流程的参考资料。

## 事实源

- 运行时和 lowering 代码：`packages/vseed/src/**`。
- 公开 DSL 类型：`packages/vseed/src/types/**`。
- 可运行示例：`packages/vseed/tests/examples/**`。
- 生成的示例测试：`packages/vseed/tests/examples/**/*.test.ts`。
- 生成的官网文档：`apps/website/docs/zh-CN/vseed/**`。
- API 文档生成器：`packages/vseed/scripts/build-api.mjs`。

不要先手改生成的 VSeed 文档或生成测试。先修改源类型、示例或生成器，再重新生成。

## 工作流

1. 修改拥有行为的源文件。
2. 用户可见 DSL 变化时，同步新增或更新示例。
3. 重新生成：

```bash
pnpm --filter @visactor/vseed g
```

4. 验证：

```bash
pnpm --filter @visactor/vseed run test
pnpm --filter @visactor/vseed run typecheck
pnpm --filter @visactor/vseed run lint
```

只改示例时，至少运行受影响的生成测试。

## 示例

示例 JSON 放在：

- `packages/vseed/tests/examples/chartType/<chartType>/*.json`
- `packages/vseed/tests/examples/features/<feature>/*.json`

每个示例必须包含：

- `name`
- `description`
- `vseed`

`build:examples` 会生成 MDX 到
`apps/website/docs/zh-CN/vseed/examples`。

`build:test` 会重新生成聚合测试，例如：

- `packages/vseed/tests/examples/chartType/chartType.test.ts`
- `packages/vseed/tests/examples/features/features.test.ts`

如果生成测试需要手动改 import，优先修复生成器。

## 类型与文档

编辑 `packages/vseed/src/types/chartType/**` 时：

- 尽量让 interface 名称和 chart 目录一致。
- 为公开 DSL 属性写有用的 JSDoc。
- 用户可见字段包含 `@description`、`@example` 和必要领域说明。
- 导出被引用的 property type，确保文档生成器能解析。
- 避免直接修改 `apps/website/docs/zh-CN/vseed/option/*.md`。

`build:docs` 从 TypeScript interface 生成 option 文档。

## 生成 Diff 检查

执行 `pnpm --filter @visactor/vseed g` 后，检查预期生成变更：

- `packages/vseed/tests/**/*.test.ts`
- `apps/website/docs/zh-CN/vseed/examples/**`
- `apps/website/docs/zh-CN/vseed/option/**`
- `build-api.mjs` 生成的 API 文档

如果生成器触碰已经 dirty 的无关文件，先识别原因并报告范围，不要盲目回滚。
