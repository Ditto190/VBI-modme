# Quy trình phát triển

## Khởi động dự án

```bash title="Khởi động dự án"
pnpm install && pnpm dev
```

## Hiểu yêu cầu và viết code

Đây là một quá trình phức tạp, nhưng thông thường gồm ba việc:
1. Làm rõ input: `vseed`
2. Làm rõ output: `vseed` chuyển thành `advancedVSeed`, hoặc `advancedVSeed` chuyển thành `spec`
3. Viết code để đảm bảo input mới có output đúng như mong đợi

:::tip
`playground` (`apps/website/docs/vi-VN/playground/index.mdx`) có thể dùng để debug và phát triển.
:::

## Tạo test case mới

Nếu cần, có thể cân nhắc tạo test case mới.

:::tip
Khi coverage giảm, cần tạo test case mới.
:::

Trong thư mục `packages/vseed/tests/*`, tạo một file `testName.json` mới và viết VSeed DSL vào đó.

Thực thi:

```bash title="Tạo test case"
pnpm build:canvasTest
```

## Chạy unit test và cập nhật coverage

```bash title="Chạy unit test và cập nhật coverage"
pnpm test:coverage
```

Đảm bảo ba việc:
1. Tất cả test đều pass
2. Thay đổi snapshot đúng như mong đợi
3. Coverage không giảm

> Thay đổi coverage sẽ được tự động cập nhật vào README.md

## Cập nhật tài liệu tùy chọn cấu hình

Nếu đã sửa định nghĩa TypeScript của loại chart, vui lòng cập nhật tài liệu tùy chọn cấu hình.

:::tip
Tất cả định nghĩa type dưới `packages/vseed/src/types/chartType` tương ứng với tài liệu tùy chọn cấu hình của từng chart. Nếu có thay đổi, hãy chắc chắn cập nhật.
:::

```bash title="Cập nhật tài liệu tùy chọn cấu hình"
pnpm build:docs
```

## Phát hành và gửi thay đổi

```bash title="Mô tả nội dung thay đổi"
pnpm changeset
```

Sau khi chạy lệnh `pnpm changeset`, làm theo prompt để thực hiện các thao tác sau:
1. Chọn package cần thay đổi; thông thường chỉ có `vseed`
2. Tuân theo semantic versioning và chọn loại thay đổi. Trong hầu hết trường hợp, nhấn Enter hai lần để bỏ qua `major` và `minor`, rồi chọn `patch`
3. Nhập mô tả thay đổi, ví dụ: `fix: chart render error caused by only one measure`

:::tip Khuyến nghị
Một chức năng hoặc Bugfix tương ứng với một `changeset` và một `commit`

Một `Pull Request` tương ứng với một `issue`

Một `Pull Request` chứa nhiều chức năng hoặc nhiều Bugfix tương ứng với nhiều `changeset` và nhiều `commit`
:::

## Commit

```bash title="Commit toàn bộ nội dung"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
