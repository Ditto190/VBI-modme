# Hooks cơ bản

Ví dụ này minh họa cách dùng kết hợp `useVBI` và `useVSeed`.

## Mô tả phụ thuộc

- Phụ thuộc gói: `@visactor/vbi-react`, `@visactor/vbi`, `@visactor/vseed`, `react`
- Ràng buộc đầu vào: cần một `VBIChartBuilder` đã khởi tạo và đã gắn connector khả dụng

## Đoạn mã

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>Thử lại: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## Hiệu quả mong đợi

- Khi builder thay đổi, `dsl` và `vseed` được cập nhật đồng bộ.
- Lần đầu tải hoặc trong lúc cập nhật sẽ hiển thị `Loading...`; khi thất bại có thể thử lại thủ công.
- Sau khi thành công, có thể thấy `chartType` hiện tại và VSeed JSON mới nhất.
