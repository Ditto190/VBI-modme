# Tài liệu

:::info
Viết kiểu `TypeScript` cũng chính là gián tiếp viết tài liệu cho các tùy chọn cấu hình.
:::

Tài liệu của tất cả loại chart trong VSeed nằm trong thư mục [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType).

## Tự động build tài liệu

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Không chỉnh sửa trực tiếp nội dung tài liệu, vì nội dung này có thể bị ghi đè bất cứ lúc nào.

`build:docs` hoàn tất chỉ trong vài giây, nên không triển khai cập nhật tăng dần. Mỗi lần build tài liệu sẽ xóa toàn bộ tài liệu cũ và tạo tài liệu mới.

:::
