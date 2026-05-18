# Heatmap

:::info{title=Khuyến nghị}
\- Cấu hình trường được khuyến nghị: `1` chỉ số, `2` chiều

\- Hỗ trợ reshape dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ encoding}
Biểu đồ nhiệt hỗ trợ các kênh trực quan sau:

`xAxis`      : kênh trục X, hỗ trợ `nhiều chiều`, ánh xạ giá trị chiều lên trục X

`yAxis`      : kênh trục Y, hỗ trợ `nhiều chiều`, ánh xạ giá trị chiều lên trục Y

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng khi cần hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `một chỉ số`, ánh xạ giá trị chỉ số sang màu

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi di chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ nhiệt hiển thị phân bố và mức độ mạnh yếu của dữ liệu bằng độ đậm nhạt màu trong ma trận hai chiều.

Kịch bản áp dụng:

\- Hiển thị mật độ và cường độ của dữ liệu hai chiều quy mô lớn

\- Phân tích liên hệ giữa danh mục và giá trị số

\- So sánh chéo giữa chuỗi thời gian và danh mục

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 2 trường chiều để xác định hàng và cột của biểu đồ nhiệt

\- Ít nhất 1 trường số (chỉ số), dùng để ánh xạ độ đậm nhạt màu

\- Khi hỗ trợ nhiều chỉ số, thường chọn một chỉ số để ánh xạ màu

Các tính năng bật mặc định:

\- Chú giải, trục, nhãn dữ liệu, tooltip và co giãn giá trị số được bật mặc định

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Mô tả}
Biểu đồ nhiệt



Biểu đồ nhiệt hiển thị phân bố và mức độ mạnh yếu của dữ liệu bằng độ đậm nhạt màu trong ma trận hai chiều.

:::

**Ví dụ**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu



Tập dữ liệu đã được tổng hợp và tuân theo đặc tả TidyData, dùng để định nghĩa nguồn dữ liệu và cấu trúc của biểu đồ. Tập dữ liệu do người dùng nhập không cần xử lý thêm. VSeed có năng lực reshape dữ liệu mạnh mẽ và sẽ tự động reshape dữ liệu. Dữ liệu của biểu đồ nhiệt cuối cùng sẽ được chuyển đổi thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Mô tả}
Chiều



Trong biểu đồ nhiệt, chiều đầu tiên được ánh xạ vào trục góc; các chiều còn lại sẽ được kết hợp với tên chỉ số (khi có nhiều chỉ số) và hiển thị như các mục chú giải.

:::

**Ví dụ**
[{id: 'category', alias: 'Danh mục'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh của chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mô tả}
Độ hạt thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- xAxis: hỗ trợ ánh xạ nhiều chiều vào trục X

\- yAxis: hỗ trợ ánh xạ nhiều chiều vào trục Y

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh label

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Chỉ số của biểu đồ nhiệt sẽ tự động được hợp nhất thành một chỉ số và ánh xạ vào trục bán kính. Khi có nhiều chỉ số, tên chỉ số sẽ được kết hợp với các chiều còn lại và hiển thị như các mục chú giải.

:::

**Ví dụ**
[{id: 'value', alias: 'Giá trị'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh measure, cho phép trùng; nếu không đặt thì alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động định dạng số, bật mặc định và có độ ưu tiên cao nhất

Khi autoFormat=true, cấu hình này ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho label và tooltip

Lưu ý: Để dùng định dạng tùy chỉnh, phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

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
Tỷ lệ định dạng số, không thể là 0

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Hậu tố định dạng số

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

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
Tỷ lệ định dạng số, không được bằng 0

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Hậu tố định dạng số

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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trên trình duyệt; ưu tiên cao hơn fractionDigits

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số ánh xạ vào kênh label

\- tooltip: chỉ số ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha, dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 là cấu hình trực tiếp cây chỉ số với children; Cách 2 là cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều

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
Màu nền biểu đồ



Màu nền có thể là chuỗi màu (ví dụ 'red', 'blue'), hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Màu sắc



Cấu hình màu để xác định bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và gradient màu.

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
Bảng màu gradient tuyến tính dùng để xác định màu của các phần tử khác nhau trong biểu đồ

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
Cấu hình nhãn biểu đồ nhiệt, dùng để định nghĩa nhãn dữ liệu của biểu đồ. Tự động bật đảo màu nhãn để bảo đảm khả năng đọc.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng nhãn hay không

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có xuống dòng hay không

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị giá trị measure hay không

Trong tình huống nhiều chỉ số, không cần lo xung đột giá trị, vì mọi chỉ số liên quan tới phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị phần trăm của giá trị measure hay không

Trong tình huống nhiều chỉ số, không cần lo xung đột giá trị, vì mọi chỉ số liên quan tới phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị nhãn chiều hay không

Hiển thị tất cả nhãn chiều

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Giá trị nhãn có được tự động định dạng hay không; khi autoFormat là true, cấu hình numFormat bị bỏ qua

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị nhãn; được gộp với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. numFormat có ưu tiên thấp hơn autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

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
Tỷ lệ định dạng số, không được bằng 0

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trên trình duyệt; ưu tiên cao hơn fractionDigits

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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trên trình duyệt; ưu tiên cao hơn fractionDigits

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền nhãn

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền nhãn

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ nhãn

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động đảo màu chữ dựa trên màu phần tử hay không

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng chống chồng lấn nhãn hay không

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Lọc nhãn, quan hệ mặc định giữa các selector là Or

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; ID của một mục trong dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường dimension; hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo



Năng lực chính:

\- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

\- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)



Yêu cầu môi trường: Chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback



Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn



Cấu hình bộ lọc động của biểu đồ



Triển khai lọc marker của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations



#### code

**Type:** `string`

:::note{title=Mô tả}
Năng lực chính:



\- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

\- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: Chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

:::

**Ví dụ**
Làm nổi bật trường sales cho các mục dữ liệu có sales lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực
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

Làm nổi bật mục dữ liệu bằng lọc nhiều điều kiện
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
Fallback strategy when code execution fails or the environment is not supported.

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; ID của một mục trong dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường dimension; hỗ trợ mảng
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


## legend

**Type:** `ColorLegend | undefined`

:::note{title=Mô tả}
legend



Cấu hình chú giải màu của biểu đồ nhiệt, dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng và các thiết lập khác.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải

:::

**Ví dụ**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng chú giải hay không

:::

**Ví dụ**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
legend font color

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
legend font color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ chú giải

:::

**Ví dụ**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải

:::

**Ví dụ**
labelFontWeight: 400



### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Thông tin tooltip



Cấu hình tooltip của biểu đồ nhiệt, dùng để định nghĩa tooltip của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng và các thiết lập khác.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng tooltip hay không

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Định nghĩa hình dạng và hướng của vùng chọn brush



\- `polygon`: chọn đa giác, cho phép vẽ đa giác bất kỳ bằng cách nhấp nhiều điểm



Chế độ chọn brush: đơn hoặc nhiều

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định nghĩa kiểu dáng của các điểm dữ liệu được chọn.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
brushtype



Độ mờ

Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1

\- `polygon`: chọn brush đa giác; nhấp nhiều điểm để vẽ đa giác bất kỳ làm vùng chọn

\- `x`: chỉ chọn brush theo hướng trục X; hướng trục Y không bị giới hạn

\- `y`: chọn brush theo hướng trục Y; không giới hạn theo hướng trục X

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1



Kiểu cho mục dữ liệu chưa được chọn

Định nghĩa kiểu dáng điểm dữ liệu ngoài vùng brush đã chọn

\- `multiple`: chế độ chọn nhiều; có thể tồn tại nhiều vùng brush cùng lúc

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xóa vùng brush sau khi kết thúc brush hay không

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
Kiểu cho mục dữ liệu chưa được chọn



Định nghĩa kiểu dáng điểm dữ liệu ngoài vùng chọn brush

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình trục danh mục (trục X), dùng để xác định trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

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
Kiểu cho mục dữ liệu chưa được chọn



Độ mờ của điểm dữ liệu ngoài vùng chọn brush, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình trục danh mục (trục X), dùng để xác định trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme của biểu đồ. Theme là cấu hình chức năng có ưu tiên thấp, bao gồm cấu hình chung dùng cho tất cả loại biểu đồ và cấu hình biểu đồ dùng chung cho một loại biểu đồ.



Có sẵn chủ đề sáng và tối; người dùng có thể tùy chỉnh chủ đề qua Builder.



Chủ đề



Có sẵn chủ đề sáng và tối; có thể tùy chỉnh chủ đề mới qua registerTheme.

:::

**Ví dụ**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Ngôn ngữ



Cấu hình ngôn ngữ biểu đồ. Hỗ trợ 'zh-CN' và 'en-US'. Cũng có thể gọi intl.setLocale('zh-CN') để đặt ngôn ngữ.

:::
