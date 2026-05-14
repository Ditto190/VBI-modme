# Chỉnh sửa điều kiện lọc

Ví dụ này minh họa các điểm vào mutation của `useWhereFilter` và `useHavingFilter`.

## Mô tả phụ thuộc

- Phụ thuộc package: `@visactor/vbi-react`, `@visactor/vbi`, `react`
- Ràng buộc đầu vào: `builder` cần chứa ít nhất các trường `region` và `sales` để minh họa thay đổi Where/Having

## Đoạn mã

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Thêm điều kiện Where
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Thêm điều kiện Having
      </button>
      <button onClick={clearWhereFilter}>Xóa Where</button>
      <button onClick={clearHavingFilter}>Xóa Having</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## Hiệu quả mong đợi

- Sau khi nhấn nút, điều kiện Where/Having lần lượt được thêm vào cây lọc của builder.
- Nút xóa sẽ lập tức loại bỏ điều kiện lọc tương ứng.
- JSON ở cuối trang có thể dùng để xác nhận cấu trúc DSL lọc hiện tại.
