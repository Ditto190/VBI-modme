# BarParallel

:::info{title=Khuyến nghị}
\- Cấu hình trường khuyến nghị: `1` chỉ số và `2` chiều

\- Hỗ trợ reshape dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ thanh song song hỗ trợ các kênh trực quan sau:

`yAxis`  : kênh trục Y, hỗ trợ `nhiều chiều`, ánh xạ lên trục Y theo giá trị chiều

`xAxis`  : kênh trục X, hỗ trợ `nhiều chỉ số`, ánh xạ lên trục X theo giá trị chỉ số

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng để hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu theo chiều dùng để phân biệt chuỗi dữ liệu, màu theo chỉ số ánh xạ tuyến tính giá trị sang màu đồ họa

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi rê chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ thanh song song phù hợp cho kịch bản so sánh ngang nhiều chỉ số; nhiều thanh được sắp xếp song song để hiển thị các giá trị chỉ số khác nhau.

Kịch bản áp dụng:

- So sánh nhiều chỉ số khi tên danh mục dài.

- So sánh ngang hiển thị đồng thời xếp hạng và giá trị.

- Phân tích song song dữ liệu đa chiều.

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường chỉ số

\- Chiều đầu tiên sẽ được đặt trên trục Y. Các chiều còn lại sẽ được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

\- Tất cả chỉ số tự động được gộp thành một chỉ số.

Tính năng bật mặc định:

\- Chú giải, trục, nhãn dữ liệu và tooltip được bật mặc định.

:::


## chartType

**Type:** `"barParallel"`

:::note{title=Mô tả}
Biểu đồ thanh song song phù hợp để so sánh song song nhiều chỉ số theo chiều ngang.

:::

**Ví dụ**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Nguồn dữ liệu: dataset đã tổng hợp, tuân theo chuẩn TidyData, dùng để xác định nguồn và cấu trúc dữ liệu của biểu đồ. Người dùng không cần xử lý dataset trước vì VSeed có khả năng reshape dữ liệu mạnh và sẽ tự xử lý; dữ liệu biểu đồ thanh song song cuối cùng sẽ được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Mô tả}
Chiều: chiều đầu tiên được ánh xạ tới trục Y. Các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: 'category', alias: 'category'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- yAxis: hỗ trợ ánh xạ nhiều chiều vào trục Y

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh detail

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh label

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số: các chỉ số của biểu đồ thanh song song tự động được gộp thành một chỉ số và ánh xạ tới trục X. Khi có nhiều chỉ số, tên chỉ số được gộp với các chiều khác và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: 'value1', alias: 'measure1'}, {id: 'value2', alias: 'measure2'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, phải duy nhất

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng; nếu không đặt thì bí danh mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có ưu tiên cao nhất

Khi autoFormat=true, nó ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và ngôn ngữ

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- ngôn ngữ='zh-CN': 749740.264 → 74.45万

\- ngôn ngữ='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip

Lưu ý: để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- xAxis: chỉ số được ánh xạ tới trục X

\- detail: chỉ số được ánh xạ vào kênh chi tiết

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số ánh xạ vào kênh label

\- tooltip: chỉ số ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Trong cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ đến id của nhóm chỉ số cha và được dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: cách 1 là cấu hình trực tiếp cây chỉ số với children; cách 2 là cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Phân trang



Cấu hình phân trang cho biểu đồ

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên field dùng để phân trang và phải là một chiều

:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại

:::

**Ví dụ**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền biểu đồ. Mặc định là nền trong suốt. Màu nền có thể là chuỗi màu (ví dụ: 'red', 'blue'), hoặc giá trị hex, rgb, rgba (ví dụ: '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Cấu hình màu dùng để xác định bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và chuyển sắc màu.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu rời rạc dùng để xác định màu của các phần tử khác nhau trong biểu đồ

:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu chuyển sắc tuyến tính dùng để xác định màu của các phần tử khác nhau trong biểu đồ

:::

**Ví dụ**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mô tả}
Ánh xạ màu dùng để ánh xạ giá trị dữ liệu tới màu cụ thể

:::

**Ví dụ**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm; xác định màu cho giá trị dương trong biểu đồ

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm; xác định màu cho giá trị âm trong biểu đồ

:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}
Cấu hình nhãn dữ liệu biểu đồ, bao gồm vị trí, định dạng và kiểu.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng label hay không

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có xuống dòng tiếp theo hay không

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị giá trị chỉ số hay không

Trong kịch bản nhiều chỉ số, không cần lo xung đột giá trị, vì tất cả chỉ số liên quan đến phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị tỷ lệ phần trăm của giá trị chỉ số hay không

Trong kịch bản nhiều chỉ số, không cần lo xung đột giá trị, vì tất cả chỉ số liên quan đến phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị label chiều hay không

Hiển thị tất cả nhãn chiều

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động định dạng giá trị label hay không; khi autoFormat là true, cấu hình numFormat sẽ bị bỏ qua

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị label; được hợp nhất với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. numFormat có ưu tiên thấp hơn autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ label

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền label

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền label

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ label

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động đảo màu chữ label theo màu của phần tử đồ họa hay không

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật tránh chồng lấp label hay không

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Lọc label; quan hệ mặc định giữa các selector là OR

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Lọc các mark của biểu đồ (vùng, điểm, v.v.) bằng mã JavaScript do AI tạo
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Tô nổi bật các thanh có sales lớn hơn 1000"

"Tô nổi bật thanh có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

\- Phải trả về mảng kết hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

\- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Làm nổi bật trường sales của các mục dữ liệu có sales lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong mỗi khu vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Làm nổi bật các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Mô tả}
Cấu hình chú giải, dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng và kiểu dáng.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng chú giải hay không
:::

**Ví dụ**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật viền chú giải hay không.
:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Ví dụ**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng pager

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng pager bị vô hiệu hóa

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ chú giải
:::

**Ví dụ**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải
:::

**Ví dụ**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}
Hình dạng chú giải
:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Ví dụ**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải
:::

**Ví dụ**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Số cột hoặc hàng tối đa khi có nhiều mục chú giải





:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Ví dụ**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mô tả}
Khoảng đệm của vùng vẽ



Ánh xạ tới VChart region[0].padding, dành không gian cho các phần tử vượt ra ngoài vùng vẽ như annotation và label.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Cấu hình tooltip của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng tooltip hay không
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Cấu hình brush của biểu đồ









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chọn brush hay không

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
Loại brush

Xác định hình dạng và hướng chọn của brush

\- `rect`: chọn brush hình chữ nhật, có thể chọn đồng thời theo cả hướng trục X và trục Y

\- `polygon`: chọn brush đa giác, nhấp nhiều điểm để vẽ đa giác bất kỳ rồi chọn

\- `x`: chọn brush theo hướng trục X, chỉ chọn theo hướng trục X, hướng trục Y không bị giới hạn

\- `y`: chọn brush theo hướng trục Y, chỉ chọn theo hướng trục Y, hướng trục X không bị giới hạn
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
\- `multiple`: chế độ multiple, nhiều lựa chọn brush có thể cùng tồn tại đồng thời



Xác định chế độ chọn brush


\- `multiple`: chế độ chọn multiple; nhiều vùng brush có thể tồn tại cùng lúc

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xóa vùng brush sau khi kết thúc chọn hay không

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Độ mờ của điểm dữ liệu chưa được chọn, phạm vi 0-1



Định nghĩa kiểu dáng điểm dữ liệu được brush
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ



Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Trục X, trục danh mục, cấu hình trục X; xác định trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.



Định nghĩa kiểu dáng điểm dữ liệu ngoài vùng chọn brush
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ



Độ mờ của các điểm dữ liệu không được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền
:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh



Cấu hình hoạt ảnh biểu đồ; hiệu ứng khả dụng phụ thuộc vào loại biểu đồ

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật animation cho biểu đồ thanh/cột hay không

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Mô tả}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Mô tả}
Có hiển thị trục theo chiều ngược hay không; chỉ áp dụng cho trục số.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mô tả}
Label color

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn hoạt ảnh hiện tại hay không

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng hoạt ảnh tính bằng mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Mô tả}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Mô tả}
Hiệu ứng cập nhật biểu đồ bar/column, hỗ trợ hoạt ảnh tăng trưởng và di chuyển vào

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn hoạt ảnh hiện tại hay không

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng hoạt ảnh tính bằng mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hoạt ảnh lặp hay không

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng thời gian hoạt ảnh lặp tính bằng mili giây

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn hoạt ảnh hiện tại hay không

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng hoạt ảnh tính bằng mili giây

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mô tả}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh bầu không khí

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu của hoạt ảnh bầu không khí

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mô tả}
Hiệu ứng hoạt ảnh bầu không khí; hỗ trợ hiệu ứng ripple, visibility và breathing

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Mô tả}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục hay không
:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}
Axis line width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}
X-axis ticks

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có dùng trục logarit hay không; chỉ áp dụng cho trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}
Base of the logarithmic axis; only applies to numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động điều chỉnh khoảng tick của trục để label tick dễ đọc hơn hay không. Tùy chọn này bị tắt khi đã cấu hình min và max, và chỉ áp dụng cho trục số.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục theo chiều đảo ngược hay không; chỉ có hiệu lực với trục số
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có buộc hiển thị giá trị 0 trên trục hay không; khi min và max đã được cấu hình, tùy chọn này không có hiệu lực. Chỉ áp dụng cho trục số.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động định dạng label tick của trục số hay không. Chỉ áp dụng cho trục số. Khi autoFormat là true, numFormat bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số cho trục số. Chỉ áp dụng cho trục số và có độ ưu tiên thấp hơn autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký pháp khoa học

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thousands separator for numeric formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000, significantDigits:1
\- 1234.5678 được chuyển thành 1200, significantDigits:2
\- 1234.5678 được chuyển thành 1230, significantDigits:3
\- 1234.5678 được chuyển thành 1234, significantDigits:4
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
Nhãn tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhãn
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ nhãn
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}
Góc xoay nhãn
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Đường trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị đường trục hay không
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường trục
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường trục
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}
Tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tick hay không
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tick có hướng vào trong hay không
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tick
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}
Tiêu đề trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị tiêu đề hay không
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản tiêu đề, mặc định theo cấu hình trường
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tiêu đề
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ tiêu đề
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ tiêu đề
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}
}
:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Mô tả}
Y-axis category-axis configuration, used to define the chart Y-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục hay không
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục theo chiều đảo ngược hay không; chỉ có hiệu lực với trục số
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có buộc hiển thị giá trị 0 trên trục hay không; khi min và max đã được cấu hình, tùy chọn này không có hiệu lực. Chỉ áp dụng cho trục số.
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động ẩn nhãn trục. Nếu hai nhãn chồng lên nhau (khoảng cách nhỏ hơn autoHideGap), nhãn gây chồng lấn sẽ được tự động ẩn. Chỉ có hiệu lực với trục danh mục.
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng cách tự động ẩn nhãn trục. Nếu khoảng cách giữa hai nhãn văn bản nhỏ hơn autoHideGap, nhãn gây chồng lấn sẽ được tự động ẩn. Chỉ có hiệu lực với trục danh mục.

Khi autoHide bật, dùng autoHide, đặt tại autoHideSeparation

Khi autoHide tắt, dùng lấy mẫu sampling, đặt tại minGap
:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động xoay nhãn trục. Khi chiều rộng nhãn vượt quá chiều dài trục, nhãn sẽ tự động xoay. Chỉ có hiệu lực với trục danh mục.
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Khoảng góc tự động xoay nhãn trục. Khi tự động xoay bật, đây là khoảng góc xoay của nhãn. Chỉ có hiệu lực với trục danh mục.
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động giới hạn độ dài nhãn trục. Khi chiều rộng nhãn vượt quá chiều dài trục, phần vượt quá được hiển thị bằng dấu ba chấm và nhãn đầy đủ hiển thị khi hover. Chỉ có hiệu lực với trục danh mục.
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Mô tả}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
Nhãn tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhãn
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ label

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}
Góc xoay nhãn

:::
### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Đường trục X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
}
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}
order: 'asc',
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tick có hướng vào trong hay không
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc chỉ số, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}
Tiêu đề trục X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản tiêu đề, mặc định theo cấu hình trường
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]
:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
value: [100, 300]
:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}
}
:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mô tả}
selector = { profit: 100 }



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Toán tử

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mô tả}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị label vùng chữ nhật của crosshair hay không

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Bar chart stacked corner radius

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Triển khai lọc các mark của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo.

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Distance between rectangles in the same category. It can be a pixel value or a percentage string.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp trục Y; hỗ trợ sắp xếp theo chiều hoặc chỉ số, cũng như thứ tự sắp xếp tùy chỉnh



Cấu hình sắp xếp trục phân loại; hỗ trợ sắp xếp theo chiều hoặc chỉ số, cũng như thứ tự sắp xếp tùy chỉnh
:::

**Ví dụ**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
Cấu hình bộ lọc động của biểu đồ.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp, giá trị có thể là 'asc' hoặc 'desc'
:::

**Ví dụ**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}
Tô sáng mục dữ liệu có tỷ lệ lợi nhuận cao nhất trong từng khu vực
:::

**Ví dụ**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Thứ tự tùy chỉnh được áp dụng trực tiếp cho trục danh mục
:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp chú giải, hỗ trợ sắp xếp theo chiều hoặc chỉ số cũng như thứ tự tùy chỉnh

Cấu hình sắp xếp chú giải; mảng sắp xếp tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới
:::

**Ví dụ**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
Cấu hình bộ lọc động của biểu đồ.
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp, giá trị có thể là 'asc' hoặc 'desc'
:::

**Ví dụ**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}
Tô sáng mục dữ liệu có tỷ lệ lợi nhuận cao nhất trong từng khu vực
:::

**Ví dụ**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Thứ tự tùy chỉnh được áp dụng trực tiếp cho chú giải; tăng dần từ trái sang phải hoặc từ trên xuống dưới, giảm dần từ phải sang trái hoặc từ dưới lên trên
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme của biểu đồ. Theme là cấu hình chức năng có mức ưu tiên thấp hơn, bao gồm cấu hình chung cho tất cả loại biểu đồ và cấu hình dùng chung trong một nhóm loại biểu đồ. Có sẵn hai theme tích hợp light và dark; người dùng có thể tùy chỉnh theme thông qua Builder.

Theme

Có sẵn hai theme tích hợp light và dark; theme mới có thể được tùy chỉnh thông qua registerTheme.
:::

**Ví dụ**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mô tả}
Kiểu mark hình chữ nhật. Cấu hình kiểu biểu đồ thanh dùng để xác định màu thanh, viền, bo góc và các thiết lập liên quan.

Hỗ trợ kiểu toàn cục hoặc kiểu có điều kiện.

Bộ lọc dữ liệu

Nếu cấu hình selector, cung cấp bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện.

Nếu không cấu hình selector, kiểu được áp dụng toàn cục.
:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Bộ chọn dữ liệu



Nếu cấu hình selector, cung cấp bốn khả năng khớp dữ liệu: selector dạng số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector measure có điều kiện

Nếu không cấu hình selector, style có hiệu lực toàn cục.

:::

**Ví dụ**
Selector dạng số
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Selector dữ liệu cục bộ
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Selector chiều có điều kiện
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Selector measure có điều kiện
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}
#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, id của một mục trong dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value

Giống operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều trong mục dữ liệu; hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều



Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value



\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



Environment Requirements: Supports browser environment only; Node.js environment will use fallback.



Giá trị của trường chiều, hỗ trợ mảng



Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Phù hợp với các trường hợp selector tĩnh khó biểu đạt, chẳng hạn Top N, phân tích thống kê và điều kiện phức tạp.

:::

**Ví dụ**
"Tô nổi bật các thanh có sales lớn hơn 1000"

"Tô nổi bật thanh có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
\- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu



\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: Chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Triển khai lọc marker của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo

:::

**Ví dụ**
Tô nổi bật field `sales` của các mục dữ liệu có sales lớn hơn 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Tô nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực:
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Tô nổi bật mục dữ liệu dựa trên nhiều điều kiện lọc:
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng

\- Phải trả về mảng tổ hợp chỉ số dòng và trường: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

Làm nổi bật trường sales cho các mục dữ liệu có sales lớn hơn 1000

Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực

Làm nổi bật mục dữ liệu bằng lọc nhiều điều kiện

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### barColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ màu của phần tử bar (phần tử hình chữ nhật)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

**Ví dụ**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc của phần tử bar (phần tử hình chữ nhật)



Độ mờ stroke của phần tử bar (phần tử hình chữ nhật)

:::

**Ví dụ**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}
Cấu hình điểm chú thích. Xác định các điểm chú thích của biểu đồ dựa trên dữ liệu đã chọn, bao gồm vị trí, định dạng, kiểu và các thiết lập liên quan.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Selector điểm chú thích, dùng để chọn điểm dữ liệu.
:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}
Chỉ định chỉ số id mà điểm chú thích thuộc về. Trong kịch bản nhiều chỉ số, có thể kết hợp với selector để định vị duy nhất điểm chú thích của chỉ số mục tiêu.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Phù hợp với Top N, phân tích thống kê, điều kiện phức tạp và các tình huống khác khó biểu đạt bằng selector tĩnh.

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Lọc các mark của biểu đồ (vùng, điểm, v.v.) bằng mã JavaScript do AI tạo
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Tô nổi bật các thanh có sales lớn hơn 1000"

"Tô nổi bật thanh có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

\- Phải trả về mảng kết hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

\- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Làm nổi bật trường sales của các mục dữ liệu có sales lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong mỗi khu vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Làm nổi bật các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```


#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'annotationtext'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
[2, 2]

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cách căn chỉnh văn bản. Thông thường đặt là right để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'right' để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, mép phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, mép trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Cách căn dọc văn bản. Thông thường đặt là top để văn bản hiển thị phía dưới điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'top' để toàn bộ văn bản hiển thị trong vùng nhìn thấy của biểu đồ

top: văn bản nằm phía dưới điểm chú thích, mép trên của văn bản căn với điểm chú thích

middle: văn bản nằm ở giữa điểm chú thích

bottom: văn bản nằm phía trên điểm chú thích, mép dưới của văn bản căn với điểm chú thích

:::

**Ví dụ**
'top' văn bản nằm phía dưới điểm chú thích
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hiển thị nền

:::

**Ví dụ**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền
:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền nền

:::

**Ví dụ**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc viền nền

:::

**Ví dụ**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Mô tả}




Nền có hiển thị hay không.

:::

**Ví dụ**
offsetY: 5, moves the whole annotation point down by 5 pixels



### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng lệch pixel của toàn bộ điểm chú thích theo hướng X. Khi điểm chú thích ở bên trái biểu đồ (điểm bắt đầu trục danh mục), nên dùng giá trị dương; khi ở bên phải biểu đồ (điểm cuối trục danh mục), nên dùng giá trị âm.

Giá trị âm dịch toàn bộ sang trái; ví dụ \-10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, sang trái 10 pixel

Giá trị dương dịch toàn bộ sang phải; ví dụ 10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, sang phải 10 pixel

:::

**Ví dụ**
offsetX: 5, toàn bộ điểm chú thích dịch sang phải 5 pixel
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}
'red'

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}
);
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Tính động giá trị đường chú thích bằng mã JavaScript do AI tạo.

Phù hợp khi cần xác định động vị trí đường chú thích dựa trên dữ liệu, như giá trị trung bình, giá trị lớn nhất, phân vị hoặc đường nghiệp vụ.

Chỉ hỗ trợ môi trường trình duyệt (cần Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng)

\- Phải trả về một giá trị số hoặc chuỗi đơn: number | string

\- Trường hợp sử dụng: giá trị động cần cho đường chú thích (ngang hoặc dọc)

\- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Lấy giá trị sales lớn nhất làm giá trị đường chú thích
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Tính giá trị trung bình cho đường chú thích
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Lấy giá trị phân vị làm đường chú thích
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Tính giá trị mục tiêu theo điều kiện
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
[2, 2]

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cách căn chỉnh văn bản. Thông thường không cần đặt

Khuyến nghị đặt là 'right' để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, mép phải của văn bản căn với đường chú thích dọc

left: văn bản nằm bên phải đường tham chiếu, mép trái của văn bản căn với đường chú thích dọc

center: văn bản nằm ở giữa đường tham chiếu

:::

**Ví dụ**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.









:::

**Ví dụ**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Độ mờ màu vùng chú thích
:::

**Ví dụ**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền vùng chú thích.

:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền vùng chú thích.

:::

**Ví dụ**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Bán kính bo góc viền vùng chú thích.

:::

**Ví dụ**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hiển thị nền

:::

**Ví dụ**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền
:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền nền

:::

**Ví dụ**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc viền nền

:::

**Ví dụ**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mô tả}
Đường chú thích giá trị dimension, hiển thị theo chiều ngang. Có thể cấu hình vị trí, style và các thiết lập liên quan của đường chú thích.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}
Giá trị Y cố định dùng để chú thích đường ngang. Nếu trục danh mục nằm theo hướng Y, có thể nhập giá trị chiều; nếu trục số nằm theo hướng Y, có thể nhập giá trị số cụ thể.

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Tính động giá trị đường chú thích bằng mã JavaScript do AI tạo.

Phù hợp khi cần xác định động vị trí đường chú thích dựa trên dữ liệu, như giá trị trung bình, giá trị lớn nhất, phân vị hoặc đường nghiệp vụ.

Chỉ hỗ trợ môi trường trình duyệt (cần Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng)

\- Phải trả về một giá trị số hoặc chuỗi đơn: number | string

\- Trường hợp sử dụng: giá trị động cần cho đường chú thích (ngang hoặc dọc)

\- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Lấy giá trị sales lớn nhất làm giá trị đường chú thích
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Tính giá trị trung bình cho đường chú thích
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Lấy giá trị phân vị làm đường chú thích
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Tính giá trị mục tiêu theo điều kiện
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```


#### fallback

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'annotationtext'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
2





:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
[2, 2]

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cách căn chỉnh văn bản. Thông thường không cần đặt

Khuyến nghị đặt là 'right' để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, mép phải của văn bản căn với điểm cuối của đường chú thích ngang

left: văn bản nằm bên phải đường tham chiếu, mép trái của văn bản căn với điểm cuối của đường chú thích ngang

center: văn bản nằm ở giữa đường tham chiếu

:::

**Ví dụ**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Cách căn dọc văn bản. Thông thường không cần đặt

Khuyến nghị đặt là 'top' để toàn bộ văn bản hiển thị trong vùng nhìn thấy của biểu đồ

top: văn bản nằm phía dưới đường tham chiếu, mép trên của văn bản căn với đường chú thích ngang

middle: văn bản nằm ở giữa đường tham chiếu

bottom: văn bản nằm phía trên đường tham chiếu, mép dưới của văn bản căn với đường chú thích ngang

:::

**Ví dụ**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hiển thị nền

:::

**Ví dụ**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền
:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền nền



Độ rộng viền nền

:::

**Ví dụ**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc viền nền

:::

**Ví dụ**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Độ mờ màu vùng chú thích



Độ mờ màu vùng chú thích
:::

**Ví dụ**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền vùng chú thích.

:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền vùng chú thích.

:::

**Ví dụ**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Bán kính bo góc viền vùng chú thích.

:::

**Ví dụ**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mô tả}
Kiểu gạch của viền vùng chú thích.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chính cho phần lớn hơn giá trị chú thích
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
Cấu hình vùng chú thích. Dựa trên dữ liệu được chọn, định nghĩa các vùng chú thích của biểu đồ, bao gồm vị trí, kiểu dáng, v.v.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các chỉ số được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'annotationtext'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mô tả}
2

:::

**Ví dụ**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
[2, 2]

:::

**Ví dụ**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Nên đặt thành 'center' để đảm bảo văn bản nằm ở giữa vùng đánh dấu







:::

**Ví dụ**
'center': text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}








Bậc của hồi quy đa thức

:::

**Ví dụ**
'top': text is at the bottom of the annotation area



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hiển thị nền

:::

**Ví dụ**
true
### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền
:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản



Màu văn bản

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền nền

:::

**Ví dụ**
2
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc viền nền



Bo góc viền nền

:::

**Ví dụ**
4
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu vùng đánh dấu

:::

**Ví dụ**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ màu tô vùng chú thích
:::

**Ví dụ**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền vùng chú thích
:::

**Ví dụ**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền vùng chú thích
:::

**Ví dụ**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Bán kính bo góc viền vùng chú thích
:::

**Ví dụ**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường viền vùng chú thích
:::

**Ví dụ**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Lề của vùng đánh dấu

:::

**Ví dụ**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=Mô tả}
Difference annotation line configuration, used to bind two data anchors and display an absolute or percentage difference.

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=Mô tả}
Điểm neo bắt đầu của đường chú thích chênh lệch.

Cấu hình điểm neo chênh lệch, dùng để chọn dữ liệu liên kết với điểm bắt đầu hoặc điểm kết thúc.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Mô tả}
Selector điểm neo, cuối cùng phải định vị tới một điểm neo logic.
:::

**Ví dụ**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### end

**Type:** `DifferenceAnchor`

:::note{title=Mô tả}
Điểm neo kết thúc của đường chú thích chênh lệch.

Cấu hình điểm neo chênh lệch, dùng để chọn dữ liệu liên kết với điểm bắt đầu hoặc điểm kết thúc.
:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=Mô tả}
Selector điểm neo, cuối cùng phải định vị tới một điểm neo logic.
:::

**Ví dụ**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=Mô tả}
Loại giá trị chênh lệch.

- absolute: hiển thị chênh lệch tuyệt đối, tính bằng end - start

- percent: hiển thị chênh lệch phần trăm, tính bằng (end - start) / start
:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Text color.

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền văn bản.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường.
:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu đường.
:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mô tả}
Có bật liên kết chiều khi pivot hoặc nhóm chỉ số được bật trên biểu đồ hay không

Khi hover vào một giá trị chiều, làm nổi bật dữ liệu có cùng giá trị chiều trong các biểu đồ khác



Cấu hình liên kết chiều của biểu đồ pivot

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật liên kết chiều của biểu đồ pivot hay không

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị thông tin Tooltip của các biểu đồ con tương ứng với tất cả các chiều hay không

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Cấu hình ngôn ngữ biểu đồ. Hỗ trợ hai ngôn ngữ 'zh-CN' và 'en-US'. Ngoài ra có thể gọi intl.setLocale('zh-CN') để đặt ngôn ngữ
:::
