# Quy trình kiểm thử

VSeed áp dụng quy trình phát triển hướng kiểm thử nghiêm ngặt. **Tất cả lệnh kiểm thử phải được chạy từ thư mục gốc của dự án.**

## Phân loại kiểm thử

### 1. Kiểm thử unit (Unit Tests)
- **Mục tiêu**: Kiểm thử các hàm tiện ích độc lập và logic node Pipeline.
- **Vị trí**: `packages/vseed/tests/unit`
- **Chạy**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Kiểm thử tích hợp (Integration Tests)
- **Mục tiêu**: Kiểm thử toàn bộ luồng tạo chart (VSeed Spec -> VChart Spec).
- **Cơ chế**: Theo hướng dữ liệu. Tự động tạo test case bằng cách đọc các file JSON trong `packages/vseed/tests/integrations` và so sánh snapshot.
- **Chạy**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Quy trình cốt lõi (Workflow)

### Bước 1: Chạy kiểm thử
Trong quá trình phát triển, hãy thường xuyên chạy các kiểm thử liên quan để xác minh logic.
```bash
# Chạy toàn bộ test
pnpm --filter=@visactor/vseed run test
```

### Bước 2: Xử lý thay đổi snapshot
Nếu thay đổi code khiến Spec đầu ra thay đổi (ví dụ sửa Bug hoặc thêm Feature):
1. Kiểm tra Diff trong output console và xác nhận thay đổi có đúng kỳ vọng không.
2. Nếu đúng kỳ vọng, chạy lệnh cập nhật:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Bước 3: Kiểm tra coverage
Trước khi commit code, nên kiểm tra coverage kiểm thử.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Lưu ý
- **Tự động tạo**: Các file `.test.ts` của kiểm thử tích hợp được tạo bởi script `g`, **không chỉnh sửa thủ công**.
- **Thêm test case**: Để thêm kiểm thử tích hợp, chỉ cần thêm file cấu hình JSON mới vào thư mục phân loại tương ứng trong `packages/vseed/tests/integrations`, sau đó chạy `pnpm run g`.
