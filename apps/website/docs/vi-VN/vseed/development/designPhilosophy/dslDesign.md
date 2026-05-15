# Thiết kế DSL

:::info Ý nghĩa

VSeed là một DSL khai báo

- Thiết kế DSL là nghệ thuật biểu đạt vấn đề trong domain, có thể đơn giản hóa hiệu quả các vấn đề phức tạp.
- DSL giúp người quen thuộc với nó viết code tự nhiên như viết tiếng mẹ đẻ. Khi đã quen với VSeed, render chart sẽ đơn giản như viết ngôn ngữ tự nhiên.
- `VChart` và `VTable` cũng như vậy.


:::

:::tip

`DSL khai báo` tập trung vào "là gì" (What). Nó mô tả kết quả mong muốn hoặc trạng thái cuối cùng nên như thế nào, mà không quan tâm các bước cụ thể bên trong máy tính để đạt tới trạng thái đó.


`DSL mệnh lệnh` tập trung vào "làm thế nào" (How). Nó cung cấp một chuỗi chỉ dẫn rõ ràng, từng bước, để cho máy tính biết cách đạt tới trạng thái mục tiêu.
:::

## Đánh đổi của VSeed

1. Tập trung vào domain (Focus)

Hy sinh một phần tính phổ dụng để tập trung giải quyết vấn đề của domain cụ thể. Vì vậy, mục tiêu cốt lõi của VSeed không phải là đáp ứng sâu mọi nhu cầu của một loại chart đơn lẻ, mà là tập trung vào chuyển đổi dữ liệu trước khi xác định loại chart. Các chức năng còn lại như theme, tương tác, animation, v.v. được để cho bên sử dụng xử lý.

2. Mức độ trừu tượng (Abstraction Level)

`VSeed` cung cấp mức trừu tượng cao hơn, giúp người dùng tập trung giải quyết vấn đề thay vì quan tâm chi tiết triển khai tầng thấp. Điều này nâng cao hiệu suất phát triển. Ví dụ, để chuyển đổi loại chart, chỉ cần đổi một tham số mà không cần quan tâm chi tiết cách chuyển đổi.

3. Ràng buộc là lợi thế (Constraint is Advantage)

`VSeed` nhấn mạnh ràng buộc: nhận một `VSeed DSL` và xuất ra `spec` của `VTable` hoặc `VChart`. Điều này giúp người dùng kiểm soát linh hoạt hơn chức năng của từng chart. `VSeed` không phải là hộp đen.

Vì vậy, có thể đơn giản xem VSeed là một `Spec Builder`, không phá vỡ chức năng gốc của `VTable` hoặc `VChart`. Bất kỳ người dùng `VChart` hoặc `VTable` nào cũng có thể nhanh chóng tích hợp `VSeed` vào nền tảng hiện có.
