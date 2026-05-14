# VBI React

`@visactor/vbi-react` là lớp adapter React của `@visactor/vbi`, chịu trách nhiệm kết nối `VBIChartBuilder` vào cây component React.

Các export hiện tại được chia thành hai lớp:

- Export gốc `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Export theo sub-path `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Định vị

- Bọc phần đăng ký trạng thái và kết xuất cho React 18+
- Dùng `VBIChartBuilder` làm Single Source of Truth (SSOT), không duy trì thêm bản sao trạng thái nghiệp vụ
- Phù hợp để xây dựng bảng cấu hình BI, khu vực xem trước biểu đồ và bảng debug DSL

## Cài đặt

Cài đặt trong dự án thông thường:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Khi phát triển nội bộ trong monorepo này, có thể dùng dependency workspace:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Bắt đầu nhanh

Ví dụ dưới đây minh họa vòng khép kín tối thiểu với `useVBI` + `useVSeed`:

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Điều hướng tài liệu

- [Tổng quan API](./api/index)
- [Ví dụ](./examples/index)
