# 1. @visactor/vbi 主入口导出说明

## 重要说明

**每个 practice 都是独立项目**，有自己的 connector/bootstrap 模块（如 `demoConnector.ts` 或 `localConnector.ts`）。下面的说明是通用方法，适用于所有 practice。

## 当前状态

`@visactor/vbi` 的主入口现在已经导出核心运行时 API，包括 `VBI`、`createVBI`、`VBIChartBuilder`、`registerConnector`、`createEmptyChart` 等。

以下能力可以直接通过主入口访问：

| 功能                                 | 实际位置                         | 说明            |
| ------------------------------------ | -------------------------------- | --------------- |
| `VBI` / `VBI.chart.create()`         | `src/vbi/create-vbi.ts`          | ✅ 主入口已导出 |
| `VBIChartBuilder`                    | `src/chart-builder/builder.ts`   | ✅ 主入口已导出 |
| `registerConnector` / `getConnector` | `src/chart-builder/connector.ts` | ✅ 主入口已导出 |
| `createEmptyChart`                   | `src/vbi/create-empty-chart.ts`  | ✅ 主入口已导出 |
| 所有 DSL 类型（`VBIChartDSL` 等）    | `src/types/chartDSL/`            | ✅ 主入口已导出 |
| 所有 Builder 类型                    | `src/types/builder/`             | ✅ 主入口已导出 |
| 类型守卫 `isVBIFilter` 等            | `src/utils/filter-guards.ts`     | ✅ 主入口已导出 |

## 为什么仍推荐参考 practice

每个 practice 的 `tsconfig.json` 配置了：

```json
{
  "moduleResolution": "bundler",
  "paths": { "src/*": ["./src/*"] }
}
```

每个 practice 仍然会实现自己的 connector/bootstrap 模块、默认 builder 和页面初始化逻辑。即使主入口已可直接导入，AI 在修改具体 practice 时仍应优先参考该 practice 内部封装，而不是假设所有应用共享同一套接线方式。

## @visactor/vseed 主入口现状

`@visactor/vseed` 的主入口（`src/index.ts`）已经导出 `Builder`，并通过 `pipeline/types` 暴露 `isVChart` / `isPivotChart` / `isTable` / `isPivotTable` 与 `VSeed` 相关类型。

```ts
import { Builder, isVChart, isPivotChart, isTable, isPivotTable, type VSeed } from '@visactor/vseed'
```

## 正确参考方式

直接使用**目标 practice** 自己的 connector/bootstrap 模块：

```ts
// 推荐：优先参考目标 practice 自己的 bootstrap 模块
import { createDefaultBuilder } from 'src/utils/localConnector'
const builder = createDefaultBuilder()

// 也可直接使用主入口 API
import { VBI } from '@visactor/vbi'
```

## 源码位置

| 功能                      | 源码位置                                        |
| ------------------------- | ----------------------------------------------- |
| 主入口                    | `packages/vbi/src/index.ts`                     |
| VBI.chart.create          | `packages/vbi/src/vbi/create-vbi.ts`            |
| VBIChartBuilder           | `packages/vbi/src/chart-builder/builder.ts`     |
| registerConnector         | `packages/vbi/src/chart-builder/connector.ts`   |
| createEmptyChart          | `packages/vbi/src/vbi/create-empty-chart.ts`    |
| filter-guards（主入口有） | `packages/vbi/src/utils/filter-guards.ts`       |
| vseed 主入口              | `packages/vseed/src/index.ts`                   |
| VSeedBuilder              | `packages/vseed/src/builder/builder/builder.ts` |
| isVChart 等               | `packages/vseed/src/pipeline/utils/chatType.ts` |
