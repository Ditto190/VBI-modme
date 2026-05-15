# TidyData

:::info Ý nghĩa
TidyData, thông qua nguyên tắc cốt lõi "biến là cột, quan sát là hàng", giảm đáng kể độ phức tạp của việc làm sạch dữ liệu, giúp chúng ta tập trung vào vấn đề kinh doanh thay vì chuyển đổi định dạng dữ liệu.
:::

## Bài báo

Tác giả bài báo là `Hadley Wickham`. Bài báo thảo luận về một module nhỏ trong xử lý dữ liệu, tức là sắp xếp dữ liệu, vì dataset gọn gàng dễ thao tác, mô hình hóa và trực quan hóa hơn, đồng thời có cấu trúc cụ thể.

Bài báo này rất đáng đọc. Xem: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)

## TidyData trong VSeed

Cấu hình `dataset` trong VSeed DSL là dataset theo định dạng `TidyData`.

Đặc trưng cốt lõi:
1. **Mỗi biến là một cột**: Giá trị biến được lưu trong cột riêng, ví dụ "tuổi", "giới tính".
2. **Mỗi quan sát là một hàng**: Tất cả giá trị biến của một đối tượng quan sát tạo thành một hàng, ví dụ thông tin tuổi và giới tính của một người.
3. **Mỗi đơn vị quan sát là một bảng**: Các loại đơn vị quan sát khác nhau, như người, thời gian, địa điểm, nên được lưu tách riêng.

Vì vậy, kết quả truy vấn `SQL` có thể được truyền trực tiếp vào cấu hình `dataset` của `VSeed` mà không cần xử lý dữ liệu bổ sung, từ đó nhanh chóng phân tích và trực quan hóa.
