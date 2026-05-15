# Ngữ cảnh phát triển Agent (VSeed)

Tài liệu này dành cho agent-code và contributor. Nó tóm tắt kiến trúc cốt lõi, luồng dữ liệu và cách mở rộng của subpackage VSeed để nhanh chóng xây dựng hiểu biết tổng quan khi phát triển tự động.

> Đây là "chỉ mục ngữ cảnh" được thiết kế cho Agent sử dụng. Để xem ghi chú kỹ thuật chi tiết hơn, tham khảo `packages/vseed/AGENTS.md`.

## 1. Mục tiêu và định vị

VSeed là một **Spec Builder** chuyển đổi `VSeed DSL` thành Spec có thể render của `VChart` / `VTable`, hỗ trợ khả năng tạo và chỉnh sửa chart một cách thông minh.

- Input: `VSeed DSL`
- Output: Spec `VChart` / `VTable`
- Luồng cốt lõi: `AdvancedPipeline` + `SpecPipeline`

## 2. Pipeline hai giai đoạn

1. **AdvancedPipeline**

- Input: `VSeed DSL`
- Output: `AdvancedVSeed` (trạng thái trung gian có thể serialize)
- Phụ trách: reshape dữ liệu, suy luận mặc định, mô hình hóa encoding, theme và style, cấu hình phân tích

2. **SpecPipeline**

- Input: `AdvancedVSeed`
- Output: Spec cuối cùng (không thể serialize, render trực tiếp)
- Phụ trách: ánh xạ trạng thái trung gian thành cấu hình VChart / VTable cụ thể

## 3. Entry point của Builder

- Dùng `Builder.from(vseed).build()` để tạo Spec
- `prepare()` thực thi dynamicFilter khi cần

Entry point source:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Reshape dữ liệu (cốt lõi)

- `foldMeasures`: Gấp nhiều measure thành một measure duy nhất và tạo `foldInfo`
- `unfoldDimensions`: Gộp dimension theo kênh encoding trực quan và tạo `unfoldInfo`
- `dataReshapeByEncoding`: Lệnh gọi kết hợp (fold + unfold)

Entry point source:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Mở rộng và đăng ký

- `registerAll()`: Đăng ký tất cả chart và theme
- `registerXxx()`: Đăng ký pipeline cho từng loại chart
- `updateAdvanced()` / `updateSpec()`: Chèn Pipe tùy chỉnh

Entry point source:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Nguyên tắc thiết kế Pipeline

- Pipe nên càng nguyên tử càng tốt, giảm if/else
- Kết hợp các luồng có điều kiện thông qua Adapter
- Loại chart được quyết định bởi tổ hợp Pipe

Tham khảo:
- `apps/website/docs/vi-VN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Ngữ cảnh đầy đủ hơn

- `packages/vseed/AGENTS.md`
- `apps/website/docs/vi-VN/vseed/development/architecture.md`
- `apps/website/docs/vi-VN/vseed/development/designPhilosophy/vseed.md`
