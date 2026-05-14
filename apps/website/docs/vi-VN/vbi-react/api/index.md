# Tổng quan API

Các export hiện tại của `@visactor/vbi-react` được chia thành hai phần:

| Module | Đường dẫn import | Nội dung |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Tất cả hooks/components đều xoay quanh `VBIChartBuilder` và không duy trì thêm nguồn trạng thái nghiệp vụ.
