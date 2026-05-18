# API 总览

`@visactor/vbi-react` 当前导出分为两部分：

| 模块 | 导入路径 | 内容 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useTheme`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`、`FilterPanel`、`ThemeSelector` |

所有 hooks/components 都围绕 `VBIChartBuilder` 工作，不额外维护业务状态源。

## 建议阅读顺序

1. 先看 [示例总览](../examples/index)，确定你是从 hooks 还是从组件进入。
2. 单个组件页已经内嵌 live demo，可以直接在对应 API 页面里操作。
3. 想看完整拼装方式时，再看 [vbi-react Starter](../examples/vbi-react-starter)。
