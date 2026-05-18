# Thiết kế kiến trúc

VSeed là một trình tạo chart dựa trên cấu hình ngữ nghĩa, được thiết kế để kết nối ý định người dùng với các rendering engine bên dưới (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## Khái niệm cốt lõi

### 1. Kiến trúc Pipeline (Pipeline Architecture)
VSeed sử dụng mẫu pipeline để từng bước xây dựng Spec của chart. Toàn bộ quá trình được chia thành hai giai đoạn chính:

- **AdvancedPipeline**:
  - Đầu vào: đối tượng `VSeed` ban đầu.
  - Phụ trách: reshape dữ liệu (Data Reshape), áp dụng theme, suy luận cấu hình mặc định.
  - Đầu ra: `AdvancedVSeed` (template trạng thái trung gian).

- **SpecPipeline**:
  - Đầu vào: `AdvancedVSeed`.
  - Phụ trách: chuyển đổi template trạng thái trung gian thành các mục cấu hình VChart/VTable cụ thể.
  - Đầu ra: Spec cuối cùng có thể render.

### 2. Mẫu Builder
Lớp `VSeedBuilder` là bộ điều phối cốt lõi, chịu trách nhiệm quản lý Context, đăng ký plugin và thực thi pipeline.

### 3. Mở rộng bằng plugin (Extensibility)
Các năng lực cốt lõi của VSeed, chẳng hạn các loại chart được hỗ trợ, được triển khai hoàn toàn thông qua cơ chế đăng ký plugin.
- **Chart Type Registration**: Mỗi loại chart (ví dụ `bar`, `line`) là một plugin đã đăng ký.
- **Theme Registration**: Hỗ trợ đăng ký theme tùy chỉnh.
