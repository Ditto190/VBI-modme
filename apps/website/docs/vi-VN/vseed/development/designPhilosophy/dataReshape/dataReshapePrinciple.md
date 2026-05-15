# Reshape dữ liệu - Nguyên lý

:::info Reshape dữ liệu
VSeed đề xuất một phương pháp reshape dimension phổ dụng nhằm tiếp tục hạ thấp ngưỡng sử dụng trực quan hóa dữ liệu.
:::

Reshape dữ liệu là quá trình chuyển dữ liệu từ một dạng cấu trúc sang một dạng cấu trúc khác. Cốt lõi là thay đổi cách tổ chức dữ liệu như hàng, cột, chỉ mục, phân cấp để phù hợp với các nhu cầu phân tích hoặc xử lý khác nhau, đồng thời giữ nguyên tính toàn vẹn của dữ liệu.

## Reshape dimension

Python và R đã có công cụ hỗ trợ reshape dimension:
1. Python Pandas cung cấp `pivot` và `melt` để reshape dữ liệu
2. R tidyverse cung cấp `pivot_longer` và `pivot_wider` để reshape dữ liệu

## Tăng dimension và giảm dimension

Tăng dimension và giảm dimension về mặt tinh thần phù hợp với tư tưởng của category theory (đối tượng, morphism và isomorphism), nhưng khi triển khai không tuân thủ nghiêm ngặt category theory.

Lưu ý đặc biệt:
1. Khi tăng dimension, thông tin "tên measure" và "giá trị measure" không tồn tại sẽ được tạo ra "từ hư không"
2. Khi giảm dimension, thông tin "tên measure" và "giá trị measure" đang tồn tại trong dữ liệu sẽ bị "loại bỏ"

Tăng dimension có thể chuyển đổi dữ liệu hoàn chỉnh, nhưng tên cột dimension có thể có giá trị rỗng, vì vậy hỗ trợ bổ sung thêm thông tin.
Giảm dimension sẽ làm mất nội dung thông tin, vì vậy cần lưu thêm thông tin chuyển đổi để đạt được chuyển đổi đẳng cấu đúng nghĩa; nếu không, thông tin chắc chắn sẽ bị mất.

![commonDataReshape](/images/commonDataReshape.png)

## Tăng và giảm dimension theo nhóm

Tương tự tăng và giảm thông thường, cũng có các tình huống thêm thông tin hoặc mất thông tin. Ngoài ra, việc đưa nhóm vào sẽ tạo ra nhiều dữ liệu rỗng hơn.

Ý nghĩa:
1. **Nhóm measure**: Dễ dàng xử lý dữ liệu chi tiết thông qua tăng dimension theo nhóm
2. **Truy vấn nhiều nhóm**: Nhiều câu SQL có thể dễ dàng lấy nhiều phần dữ liệu chi tiết, rồi hợp nhất thành một dữ liệu thông qua giảm dimension theo nhóm

![groupedDataReshape](/images/groupedDataReshape.png)

## Suy luận quy luật

### Tăng dimension

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Tăng dimension với nhiều measure sẽ làm số lượng measure trở thành 1. Một measure sau khi tăng dimension vẫn là 1.
2. Tăng dimension với nhiều dimension sẽ thêm một dimension. Ngay cả 0 dimension cũng sẽ thêm thành 1.
3. 0 dimension và 1 measure có thể tăng dimension lặp lại để nhận được bất kỳ số lượng dimension nào và 1 measure, từ đó một measure cũng có thể vẽ biểu đồ cột.
:::

### Giảm dimension

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Giảm dimension với nhiều measure: giá trị dimension và measure tạo thành tích Descartes, trở thành measure mới
2. Giảm dimension với nhiều dimension: nhiều giá trị dimension tạo thành tích Descartes, trở thành dimension mới
:::

## Ví dụ

#### 0 dimension, 1 measure
![0d1m](/images/0d1m.png)
#### 0 dimension, 3 measure
![0d3m](/images/0d3m.png)
#### 1 dimension, 1 measure
![1d1m](/images/1d1m.png)
#### 1 dimension, 2 measure
![1d2m](/images/1d2m.png)
#### 2 dimension, 1 measure
![2d1m](/images/2d1m.png)
#### 2 dimension, 2 measure
![2d2m](/images/2d2m.png)
