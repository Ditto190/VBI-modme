# Các lệnh thường dùng

Để duy trì tính nhất quán của monorepo, **tất cả các lệnh phải được chạy từ thư mục gốc của dự án**.

## Lệnh cốt lõi (g)

`g` (Generator) là script hỗ trợ quan trọng nhất trong quá trình phát triển VSeed.

```bash
pnpm run g
```

**Mô tả**:
Lệnh này là sự kết hợp của `build:test`, `build:docs`, và `build:api`, được dùng để giữ tài nguyên của môi trường phát triển luôn đồng bộ:
1. **Tạo test cases**: Phân tích JSON Spec trong `tests/integrations` và tạo các file `.test.ts` tương ứng.
2. **Tạo tài liệu**: Phân tích các định nghĩa kiểu TypeScript và cập nhật tài liệu API trong `apps/website`.

**Khi dùng**:
- Sau khi sửa logic chart hoặc thêm một loại chart mới.
- Sau khi sửa các định nghĩa kiểu TypeScript.
- Trước khi commit code.

## Phát triển và build

### Khởi động môi trường phát triển
Khởi động đồng thời chế độ watch của VSeed và trang tài liệu.
```bash
pnpm run dev
```

### Build dự án
Build thư viện lõi VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Kiểm thử

### Chạy toàn bộ test
```bash
pnpm --filter=@visactor/vseed run test
```

### Chạy test unit
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Chạy test tích hợp
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Cập nhật snapshot test
Chạy lệnh này khi thay đổi code của bạn gây ra diff snapshot và đó là kết quả mong đợi:
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Chất lượng code

### Kiểm tra Lint
```bash
pnpm run lint
```

### Kiểm tra kiểu dữ liệu
```bash
pnpm run typecheck
```
