# Script thường dùng

Để giữ monorepo nhất quán, **mọi script phải được chạy từ thư mục gốc của dự án**.

## Script cốt lõi (g)

```bash
pnpm run g
```
**Mô tả**: Script `g` của VQuery xử lý:
1. `build:test`: Biên dịch tài nguyên kiểm thử.
2. `build:docs`: Tạo tài liệu API.

## Phát triển và xây dựng

### Xây dựng
```bash
pnpm --filter=@visactor/vquery run build
```

## Kiểm thử

### Chạy kiểm thử
VQuery sử dụng Rstest để kiểm thử.
```bash
pnpm --filter=@visactor/vquery run test
```

### Cập nhật snapshot
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Độ bao phủ
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
