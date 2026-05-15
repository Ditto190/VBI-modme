# VSeed

:::info Tóm tắt một câu
Tiếp nhận nhu cầu kinh doanh linh hoạt ở phía trên, ràng buộc hình thức truy cập dữ liệu ở phía dưới, và điều phối dữ liệu thống nhất để biến phức tạp thành đơn giản.
:::

## VSeed là gì?

`VSeed` là công cụ trực quan hóa hướng tới phân tích dữ liệu. Nó tập trung cung cấp khả năng chuyển đổi dữ liệu có tính nhất quán cao giữa các loại chart khác nhau, đồng thời cung cấp một số chức năng sẵn dùng để đáp ứng nhu cầu phân tích dữ liệu nhẹ.

## Ưu điểm của VSeed là gì?

> Trước hết, nó thực sự dễ dùng; tiếp theo, nó thật sự linh hoạt; cuối cùng, VSeed có nhiều phần đóng gói, nên cần hiểu cách VSeed reshape dữ liệu để có thể sử dụng trọn vẹn.

1. Cách chuyển đổi loại chart trực quan nhất [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Pivot chart dễ dùng nhất [Demo](/vseed/guide/intro/pivotAndCombine)
3. Khả năng reshape dữ liệu mạnh mẽ, không cần xử lý dữ liệu thủ công; bất kỳ số lượng dimension, measure và bất kỳ loại chart nào cũng có thể tạo biểu đồ [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` hoàn toàn có thể serialize, nên hỗ trợ truyền `VSeed DSL` đa nền tảng [Demo](/vseed/guide/intro/crossPlatformRender)
5. Sẵn dùng: định dạng số, quốc tế hóa, theme sáng/tối, style thông dụng, v.v. [Demo](/vseed/guide/intro/internationalization)
6. Hiệu năng xử lý dữ liệu tốt, hỗ trợ xử lý dữ liệu ở phía `Node` và trực quan hóa ở phía `Web` [Demo](/vseed/guide/intro/separateBuild)

## Nhược điểm của VSeed là gì?

1. `VSeed` không chịu trách nhiệm tinh chỉnh từng chi tiết của một chart đơn lẻ. Những nhu cầu như vậy do `VChart`, `VTable` cung cấp. `VSeed` chỉ cung cấp khả năng chỉnh sửa `spec` linh hoạt; người dùng có thể tùy chỉnh từng chi tiết chart theo nhu cầu của mình.
2. Chỉ những dataset tuân thủ chuẩn `tidyData` mới có thể được `VSeed` trực quan hóa. Dataset không chuẩn sẽ không được `VSeed` chấp nhận.
3. Được xây dựng trên hệ sinh thái `VisActor`, nên người dùng cần hiểu các khái niệm cơ bản của `VChart` và `VTable`.

## Nguyên tắc của VSeed là gì?

1. `VSeed` phải hỗ trợ serialize.
2. `VSeed` không cần cung cấp quá nhiều khả năng cấu hình style, mà nên tập trung xử lý quan hệ giữa chart và dữ liệu.
3. `VSeed` nên đóng gói các chức năng phổ biến trong lĩnh vực phân tích, như định dạng số, quốc tế hóa, theme, style thông dụng và chức năng thông dụng, để có thể dùng ngay.
4. Các nhu cầu tùy chỉnh linh hoạt hơn nên do người dùng tự tùy chỉnh lần hai. Vì vậy VSeed chỉ cung cấp ra bên ngoài một Spec Builder để xây dựng spec của VChart và VTable.
   - Người dùng có thể linh hoạt kiểm soát VChart Instance và VTable Instance.
   - Người dùng có thể linh hoạt chỉnh sửa spec của VChart và VTable theo nhu cầu.

## Vì sao thiết kế VSeed?

1. `VChart` sẽ không bao giờ có thể chuyển liền mạch sang `VTable`, và ngược lại. Với nhu cầu như vậy, một lớp đóng gói trừu tượng phía trên là điều tất yếu.
2. Người dùng `VChart`, `VTable` phải tự xử lý dữ liệu. Công việc này vô tình bị lặp lại hàng trăm, hàng nghìn lần. `VSeed` muốn giảm độ phức tạp của xử lý dữ liệu trong các kịch bản thông dụng và giảm công việc lặp lại.
3. Ở một mức độ nhất định, nó có thể hạ thấp ngưỡng sử dụng `VChart` và `VTable`, ví dụ dùng `VTable` để render `PivotChart`.
4. `VSeed` cuối cùng có thể phát triển thành một submodule của `HeadlessBI`, dùng để xây dựng công cụ phân tích dữ liệu phổ thông.
