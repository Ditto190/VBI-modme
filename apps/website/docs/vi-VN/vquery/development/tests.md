# Quy trình kiểm thử

VQuery sử dụng framework `rstest` để kiểm thử. **Mọi lệnh phải được chạy từ thư mục gốc.**

## Cơ chế kiểm thử
Bộ kiểm thử của VQuery bao phủ:
- **Unit**: Hàm tiện ích và logic compiler.
- **Examples**: Toàn bộ luồng tạo SQL và truy vấn dữ liệu.

## Lệnh thường dùng

### Chạy toàn bộ kiểm thử
```bash
pnpm --filter=@visactor/vquery run test
```

### Cập nhật snapshot
Nếu thay đổi trong logic tạo SQL là đúng kỳ vọng, hãy cập nhật snapshot:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Báo cáo coverage
Tạo và xem coverage kiểm thử:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
