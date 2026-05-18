# Thiết kế pipeline

:::info Vì sao dùng Pipeline?
1. Đây là lựa chọn của các tiền bối trong team.
2. Lợi thế của Pipeline là cho phép `VSeed` độc lập kiểm soát luồng thực thi của từng loại chart. Với thiết kế tốt, triển khai của mỗi loại chart vừa được tách rời vừa có thể tái sử dụng cục bộ, và mỗi loại chart có thể kiểm soát chính xác mọi chi tiết. Đây là điều Pipeline mang lại, và cũng là điều `VSeed` cần nhất.
3. So với lợi thế đó, các nhược điểm của mô hình Pipeline đều có thể tránh được trong lúc thiết kế. Chỉ cần giảm kích thước từng `Pipe` và giảm phụ thuộc giữa các `Pipe`, có thể tránh phần lớn nhược điểm của mô hình này.
4. Sau bốn thế hệ thiết kế và tối ưu Pipeline, đến VSeed đã là phiên bản thứ năm. Những hố cần gặp đều đã từng gặp.

:::

## Pipeline là gì?

Pipeline là một abstraction và thực hành kỹ thuật mạnh mẽ. Nó chia một tác vụ phức tạp thành một chuỗi các bước nhỏ được kết nối với nhau và thực thi theo thứ tự. Triết lý thiết kế và cách triển khai của nó chịu ảnh hưởng sâu sắc từ tư tưởng cốt lõi của functional programming (FP).

### Ưu điểm của Pipeline:
- Modular hóa: triển khai nguyên tử, rồi kết hợp các nguyên tử thành module.
- Tự động hóa: chỉ cần xác định input là có thể tự động nhận output, không cần quan tâm triển khai bên trong.
- Pure function: input xác định chắc chắn nhận được output mong đợi, đây là đặc trưng của pure function.
- Tính song song: tự nhiên hỗ trợ concurrency.
- Tái sử dụng: mọi module đều có thể được tái sử dụng.
- Dễ kiểm thử: về lý thuyết, mỗi module độc lập và có thể kiểm thử riêng để đảm bảo chất lượng.
- Dễ truy vết: input và output của từng giai đoạn rõ ràng, thuận tiện định vị vấn đề và theo dõi trạng thái quy trình.
- Có thể cache: về lý thuyết, output của một `Pipe` riêng lẻ có thể được cache riêng, tránh tính toán lặp lại và nâng cao hiệu suất.

### Nhược điểm của Pipeline:
- Phụ thuộc thứ tự: khi giữa các `Pipe` có phụ thuộc trước sau, chi phí hiểu sẽ tăng, vì cần hiểu giai đoạn trước mới hiểu được giai đoạn sau. Cần hiểu sâu toàn bộ quy trình mới có thể nhanh chóng định vị vấn đề.
- Chi phí debug: vì Pipeline thực thi theo thứ tự, một giai đoạn thất bại sẽ khiến toàn bộ Pipeline thất bại. Điều này làm debug khó hơn vì cần định vị giai đoạn lỗi và sửa nó.
- Vấn đề hiệu năng: vì Pipeline thực thi theo thứ tự, output của mỗi giai đoạn phải chờ giai đoạn trước hoàn thành. Điều này có thể gây vấn đề hiệu năng, đặc biệt khi một giai đoạn chạy lâu.
- Functional programming: cần hiểu các khái niệm mới nên có chi phí học. Vì vậy nguyên lý thiết kế và chi tiết triển khai cần được viết trong contribution guide để các developer khác dễ hiểu và sử dụng.

## Nên viết Pipeline trong VSeed như thế nào?

### Mẫu tổ hợp Pipe

Nhiều `Pipe` chức năng có thể được tổ hợp thành một `Pipe` chức năng lớn hơn, hoặc thành một Pipeline phức tạp hơn.

Trong VSeed, một Pipeline hoàn chỉnh tương ứng với triển khai của một loại chart. Bằng cách mô tả quan hệ tổ hợp giữa các `Pipe`, có thể tạo ra các loại chart khác nhau. Ở giai đoạn tổ hợp Pipeline, không cần quan tâm triển khai cụ thể của từng `pipe`.


#### Khác biệt tổ hợp

Ví dụ:

Line chart và area chart có thể tái sử dụng nhiều chức năng như label, legend, axis. Nhưng line chart không có style mark vùng, vì vậy pipeline giải quyết khác biệt này bằng cách tổ hợp các `Pipe` chức năng, toàn bộ quá trình không có câu lệnh `if`.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // Chỉ area chart có style mark vùng
  areaStyle,
]
```


### Mẫu adapter Pipe

Ngoài mẫu tổ hợp, việc xây dựng `Pipe` thường có điều kiện nhất định. Để đáp ứng tổ hợp `Pipe` dưới các điều kiện khác nhau, VSeed sử dụng rất nhiều adapter `Pipe`.

#### Điều kiện tổ hợp

Ví dụ:

Line chart có chức năng pivot. Khi không có pivot, chart được render bởi VChart và xuất VChart spec. Khi có pivot, chart được render bởi VTable và xuất VTable spec.

Pivot line chart về cơ bản cần tái sử dụng các chức năng cơ bản của line chart như label, legend, axis. Vì vậy cần dùng mẫu adapter để chuyển `Pipe` của line chart thành `Pipe` của pivot line chart.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
]

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Tóm lại, mỗi adapter chính là một `if else`. Điều kiện ẩn trong `pipe` có thể được abstract thành adapter, vì vậy `if else` được đưa lên tầng trên cùng. Nhờ đó Pipeline có quan hệ phụ thuộc rõ ràng hơn và chi phí bảo trì thấp hơn.

### Đơn vị cơ bản nhất của Pipeline: Pipe chức năng

VSeed kỳ vọng mọi loại chart đều lấy chức năng làm đơn vị cơ bản nhất, cung cấp khả năng tái sử dụng và mở rộng đủ tốt. Pipeline của một loại chart được xây dựng từ dưới lên. Mỗi `Pipe` chức năng nên là một module độc lập, có thể kiểm thử và có thể tái sử dụng.

Điểm quan trọng nhất là nên abstract khác biệt chức năng thành các `Pipe` khác nhau, tức là viết ít `if else` hơn, thay vì viết một `Pipe` lớn bao trùm mọi thứ.

#### Pipe chức năng phẳng

Ví dụ:

Bar chart, column chart, line chart, area chart và scatter chart đều có trục X và Y. Chúng tương tự nhưng hơi khác nhau. Nếu viết một `axes` pipe lớn bao trùm mọi thứ, có thể sẽ như sau:

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // Line chart, area chart và column chart có một trục rời rạc và một trục liên tục
    return xy(spec, context)
  }
  if (isScatter){
    // Scatter chart có hai trục liên tục
    return yy(spec, context)
  }
  if (isBar){
    // Bar chart có một trục rời rạc và một trục liên tục, nhưng hướng trục khác với line, area và column chart
    return yx(spec, context)
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Logic trên thực hiện việc chọn các sub-`pipe` chức năng khác nhau theo loại chart ngay trong một `Pipe` chức năng. Điều này gây ra hai vấn đề:
1. Các chức năng lặp lại bên trong `xy`, `yx`, `yy` nên được tái sử dụng thế nào? Rất nhiều subfunction tương tự nhưng khác nhau phải được gọi lặp lại trong các sub-`pipe` chức năng khác nhau. Quan hệ phụ thuộc dễ trở nên rối rắm và làm tăng chi phí bảo trì.
2. Khi sửa chức năng của line chart hoặc area chart, rất dễ bỏ sót bar chart vì logic đã phân nhánh. Do đó khi triển khai chức năng mới cần cân nhắc khác biệt.

Khi quy mô toàn bộ spec pipeline mở rộng đến vài trăm `pipe`, kiểu viết này sẽ mang lại chi phí bảo trì rất cao. Vì vậy chúng ta cần một cách đơn giản hơn để chọn các sub-`pipe` chức năng khác nhau theo loại chart.

Tiếp tục ví dụ trên, hãy abstract các khác biệt thành các `Pipe` khác nhau, đóng gói khác biệt ở độ hạt chức năng nhỏ hơn, rồi cuối cùng tổ hợp trực tiếp trong pipeline. Như vậy có thể tránh các vấn đề trên.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Trong ví dụ trên, không triển khai `axes` pipe mà trực tiếp tổ hợp bốn pipe `xBandAxis`, `yBandAxis`, `xLinearAxis`, `yLinearAxis`. Điều này tránh việc chọn sub-`pipe` chức năng khác nhau theo loại chart bên trong `axes` pipe, tránh phân nhánh theo loại chart, và giảm sử dụng `if else`.

Mọi nhánh khác biệt theo loại chart nên nằm phía trên Pipeline. Trừ khi bất khả kháng, bên trong Pipeline không cần chọn sub-`pipe` chức năng khác nhau theo loại chart.

Cách tổ hợp này phù hợp với triết lý thiết kế của VSeed: sử dụng tổ hợp `Pipe` chức năng phẳng hơn, thay vì dùng điều kiện `if else` để tạo một `Pipe` chức năng lớn bao trùm mọi thứ.
