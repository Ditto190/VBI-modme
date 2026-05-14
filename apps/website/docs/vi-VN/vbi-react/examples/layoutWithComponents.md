# Bố cục bằng component

Ví dụ này minh họa `BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector`.

## Mô tả phụ thuộc

- Phụ thuộc package: `@visactor/vbi-react/components`, `@visactor/vbi`, `react`
- Ràng buộc đầu vào: `builder` nên có các trường dimension/measure khả dụng để `FieldPanel` minh họa thao tác thêm/xóa

## Đoạn mã

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: 'Khu vực', value: 'region' }]}
          measureOptions={[{ label: 'Doanh số', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## Hiệu quả mong đợi

- Phần trên có thể đổi loại biểu đồ, bên trái có thể thêm/xóa dimension/measure, vùng chính hiển thị bản xem trước DSL biểu đồ.
- Sau thao tác với trường, nội dung vùng chính tự động làm mới mà không cần kích hoạt thủ công.
- Khi build thất bại, `ChartRenderer` hiển thị lỗi mặc định và nút thử lại.
