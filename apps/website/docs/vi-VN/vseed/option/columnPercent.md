# ColumnPercent

:::info{title=Khuyến nghị}
\- Cấu hình trường được khuyến nghị: `1` chỉ số, `2` chiều

\- Hỗ trợ reshape dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ cột phần trăm hỗ trợ các kênh trực quan sau:

`xAxis`  : kênh trục X, hỗ trợ `nhiều chiều`, ánh xạ giá trị chiều tới trục X

`yAxis`  : kênh trục Y, hỗ trợ `nhiều chỉ số`, ánh xạ giá trị chỉ số tới trục Y

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng để hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu của chiều dùng để phân biệt các chuỗi dữ liệu, còn màu của chỉ số dùng để ánh xạ tuyến tính giá trị chỉ số sang màu đồ họa

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi hover lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ cột phần trăm phù hợp để thể hiện quan hệ tỷ trọng giữa các danh mục. Trục Y hiển thị tỷ trọng dữ liệu dưới dạng phần trăm.

Tình huống phù hợp:

- So sánh tỷ trọng dữ liệu giữa các danh mục khác nhau

- Phân tích cơ cấu dữ liệu nhiều chiều

- Xu hướng thay đổi tỷ trọng theo chuỗi thời gian
:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

- Ít nhất 1 trường chỉ số

- Chiều đầu tiên được đặt trên trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

\- Tất cả chỉ số sẽ tự động được hợp nhất thành một chỉ số

Các tính năng bật mặc định:

- Chú giải, trục, nhãn phần trăm, tooltip và tính toán tỷ trọng được bật mặc định

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=Mô tả}
Biểu đồ cột phần trăm

Biểu đồ cột phần trăm, hiển thị tỷ trọng dữ liệu của từng danh mục dưới dạng phần trăm.
:::

**Ví dụ**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset đã được tổng hợp và tuân theo chuẩn TidyData, dùng để xác định nguồn dữ liệu và cấu trúc của biểu đồ. Dataset do người dùng nhập không cần xử lý trước. VSeed có năng lực reshape dữ liệu mạnh mẽ và sẽ tự thực hiện reshape dữ liệu; dữ liệu biểu đồ cột cuối cùng sẽ được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Mô tả}
Chiều đầu tiên của biểu đồ cột được ánh xạ vào trục X. Các chiều còn lại sẽ được gộp với tên chỉ số khi có nhiều chỉ số, rồi hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: "category", alias: "category"}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- xAxis: hỗ trợ ánh xạ nhiều chiều vào trục X

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh detail

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh label

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Mô tả}
Tất cả chỉ số của biểu đồ cột tự động được gộp thành một chỉ số và ánh xạ vào trục Y. Khi có nhiều chỉ số, tên chỉ số sẽ được gộp với các chiều khác và hiển thị như mục chú giải.

:::

**Ví dụ**
[{id: "value", alias: "Value"}]




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
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký pháp khoa học

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
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký pháp khoa học

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
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà measure được ánh xạ tới

\- yAxis: chỉ số được ánh xạ vào trục Y

\- detail: measure được ánh xạ vào kênh chi tiết

\- color: measure được ánh xạ tới kênh màu

\- label: measure ánh xạ vào kênh label

\- tooltip: measure ánh xạ vào kênh tooltip

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
Cấu hình phân trang, dùng để chỉ định tên trường phân trang; trường này phải là dimension.

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
Màu nền của biểu đồ. Màu nền có thể là chuỗi màu và mặc định là nền trong suốt, ví dụ 'red' hoặc 'blue'. Cũng hỗ trợ hex, rgb hoặc rgba như '#ff0000' và 'rgba(255,0,0,0.5)'.

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
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
 'sales': 'blue',
}
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
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký pháp khoa học

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
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ nhãn

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
Trường chiều, ID của một mục chiều

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

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
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
"Highlight bars whose sales are greater than 1000"

"Tô sáng cột có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng

\- Phải trả về mảng tổ hợp chỉ số dòng và trường: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

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

Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime
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
Cấu hình chú giải để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng và kiểu.

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
Có bật viền chú giải hay không..

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Ví dụ**
Độ đậm chữ chú giải



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Pagination icon disabled/grayed-out color.

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
legend font color

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
Applies only to discrete legends.

:::

**Ví dụ**
Brush



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
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Ví dụ**
Chế độ brush; xác định có thể chọn một hay nhiều vùng.




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mô tả}
Cấu hình tooltip để định nghĩa tooltip của biểu đồ, bao gồm vị trí, định dạng và kiểu.



Brush selection

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


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Mô tả}
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.



When autoHide is disabled, use sampling, configured on minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hoạt ảnh biểu đồ bar/column hay không

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Mô tả}
Bar/column chart animation parameters

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Mô tả}
Có hiển thị trục đảo chiều hay không; chỉ áp dụng cho trục số.

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mô tả}
Hiệu ứng vào của biểu đồ thanh/cột, hỗ trợ animation tăng trưởng

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học.

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0.

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Mô tả}
Bar/column chart update animation configuration

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Mô tả}
Hiệu ứng cập nhật của biểu đồ thanh/cột, hỗ trợ tăng trưởng và đi vào

:::
##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học.

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0.

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tick size

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1230, significantDigits:3

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
\- 100000 được chuyển thành 10万, ratio:10000, symbol:"万"

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học.

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không thể là 0.

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mô tả}
Bar/column chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
atmosphereanimationeasefunction

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
atmosphereanimationcolor

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mô tả}
Atmosphere animation effect; supports ripple, fade, and breathe

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Mô tả}
Cấu hình trục X dạng danh mục, dùng để xác định trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu và các thiết lập liên quan.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Màu đường trục

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh trục X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình trục số (trục Y), dùng để xác định trục Y của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Axis label auto-hide. If two labels overlap, with spacing smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Mô tả}
Axis label auto-hide gap. If the gap between two labels is smaller than autoHideGap, the overlapping label is hidden automatically. Only applies to category axes.

Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

When autoHide is disabled, use sampling and configure it through minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Axis label auto-rotation. When label width exceeds axis length, labels are rotated automatically. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Axis label auto-rotation angle range. Used when auto-rotation is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Axis label auto-limit. When label width exceeds axis length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Mô tả}
Maximum length for axis label auto-limit. When label text exceeds this length, overflow is shown with ellipsis and the full label is visible on hover. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp tùy chỉnh, được áp dụng trực tiếp cho trục danh mục

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Định dạng số cho trục số. Chỉ có hiệu lực với trục số. Ưu tiên thấp hơn `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ label

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn

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
Độ đậm chữ nhãn

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
Vạch chia trục X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp; có thể là 'asc' hoặc 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
sortLegend: {

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
Văn bản tiêu đề. Theo mặc định, giá trị này theo cấu hình trường.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường lưới

:::
### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh trục X

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

**Type:** `YLinearAxis | undefined`

:::note{title=Mô tả}
Cấu hình trục Y dạng trục số, dùng để xác định trục Y của biểu đồ, bao gồm vị trí, định dạng, kiểu và các thiết lập liên quan.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Màu đường trục

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
Cấu hình hoạt ảnh trục X

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình trục số (trục Y), dùng để xác định trục Y của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động định dạng label tick của trục số hay không. Chỉ áp dụng cho trục số. Khi autoFormat là true, numFormat bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số cho trục số. Chỉ áp dụng cho trục số và có mức ưu tiên thấp hơn autoFormat.

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi định dạng số nếu đồng thời đặt significantDigits và fractionDigits; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Định dạng số cho trục số. Chỉ có hiệu lực với trục số. Ưu tiên thấp hơn `autoFormat`.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode

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
Cỡ chữ nhãn

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}
Vạch chia trục X

:::
#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp; có thể là 'asc' hoặc 'desc'

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
sortLegend: {

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
Văn bản tiêu đề. Theo mặc định, giá trị này theo cấu hình trường.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Rectangle graphic element style

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}
Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
selector = 100

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường lưới

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
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.



Chủ đề biểu đồ. Theme là cấu hình có độ ưu tiên thấp hơn, bao gồm các thiết lập chung cho mọi loại biểu đồ và các thiết lập riêng cho từng loại. Theme tích hợp gồm 'light' và 'dark'; người dùng có thể tùy chỉnh theme thông qua Builder.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Chủ đề

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Có sẵn chủ đề sáng và tối; có thể tùy chỉnh chủ đề mới qua registerTheme.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn vùng chữ nhật của crosshair hay không

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- Supports arbitrarily complex data filtering conditions

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Bán kính bo góc cột xếp chồng

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Maximum column width. It can be a pixel value or a percentage string.

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp trục X; hỗ trợ sắp xếp theo chiều hoặc measure, cũng như thứ tự sắp xếp tùy chỉnh



Cấu hình sắp xếp trục phân loại; hỗ trợ sắp xếp theo chiều hoặc measure, cũng như thứ tự sắp xếp tùy chỉnh
:::

**Ví dụ**
ID trường chiều (`id` của một mục trong `dimensions`).
Cấu hình bộ lọc động của biểu đồ.
field: 'sales'
}
ID trường chiều (`id` của một mục trong `dimensions`).
Toán tử
}

const grouped = _.groupBy(data, 'area');
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value
Cấu hình bộ lọc động của biểu đồ.
Lưu ý: không thể sử dụng selector và dynamicFilter đồng thời; dynamicFilter có mức ưu tiên cao hơn.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

:::

**Ví dụ**
"Tô sáng cột có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}
Tô sáng mục dữ liệu có tỷ lệ lợi nhuận cao nhất trong từng khu vực

:::

**Ví dụ**
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value
\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, và `field` biểu thị field cần tô nổi bật.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mô tả}
return _.map(filtered, item => ({



Cấu hình bộ lọc động của biểu đồ

:::

**Ví dụ**
return _.map(filtered, item => ({
Cấu hình bộ lọc động của biểu đồ.
field: 'sales'
}
return _.map(filtered, item => ({
Toán tử
}

const grouped = _.groupBy(data, 'area');
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value
Cấu hình bộ lọc động của biểu đồ.
Lưu ý: không thể sử dụng selector và dynamicFilter đồng thời; dynamicFilter có mức ưu tiên cao hơn.




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

:::

**Ví dụ**
"Tô sáng cột có tỷ lệ lợi nhuận cao nhất trong từng khu vực"



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}
Tô sáng mục dữ liệu có tỷ lệ lợi nhuận cao nhất trong từng khu vực

:::

**Ví dụ**
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value
\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Custom sort order. The order is applied directly to the legend. Ascending order goes left-to-right or top-to-bottom; descending order goes right-to-left or bottom-to-top.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme biểu đồ. Theme là cấu hình chức năng có mức ưu tiên thấp hơn, gồm các thiết lập chung cho mọi loại biểu đồ và các thiết lập dùng chung trong một nhóm biểu đồ. Theme tích hợp gồm light và dark, người dùng có thể tùy chỉnh theme qua Builder.



Toán tử



\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

:::

**Ví dụ**
Toán tử

Highlight items meeting multiple filtering conditions

const filtered = _.filter(data, item => {




### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mô tả}
Kiểu mark hình chữ nhật cho biểu đồ cột, gồm màu, viền, bo góc, v.v.

Hỗ trợ kiểu toàn cục hoặc kiểu theo điều kiện

Bộ lọc dữ liệu

Nếu cấu hình selector, có bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện

Nếu không cấu hình selector, kiểu áp dụng toàn cục.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Bộ chọn dữ liệu

Nếu cấu hình selector, có bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện

Nếu không cấu hình selector, kiểu áp dụng toàn cục.

:::

**Ví dụ**
Selector số
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

Selector chỉ số có điều kiện
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
Trường chiều; id của một mục trong dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

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
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Phù hợp với Top N, phân tích thống kê, điều kiện phức tạp và các trường hợp khó biểu đạt bằng selector tĩnh.

Khả năng chính:

- Hỗ trợ điều kiện lọc dữ liệu phức tạp tùy ý

- Dùng hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ trình duyệt; môi trường Node.js dùng fallback.

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có độ ưu tiên cao hơn.

Cấu hình bộ lọc động của biểu đồ

Lọc mark của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
"Làm nổi bật cột có sales > 1000"

"Làm nổi bật cột có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"
#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng tổ hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index là số dòng của mục dữ liệu gốc, field là trường cần làm nổi bật

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Làm nổi bật trường sales của mục dữ liệu có sales lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật mục dữ liệu có tỷ suất lợi nhuận cao nhất trong mỗi khu vực
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
Trường chiều; id của một mục trong dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Giống operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều trong mục dữ liệu; hỗ trợ mảng

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare() và chỉ đọc khi runtime

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
Có hiển thị phần tử cột (hình chữ nhật) hay không

:::
### barColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu phần tử cột (hình chữ nhật)

:::
### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ trong suốt màu của phần tử cột (hình chữ nhật)

:::
### barBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền phần tử cột (hình chữ nhật)

:::
### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền phần tử cột (hình chữ nhật)

:::
### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu viền phần tử cột (hình chữ nhật)

:::

**Ví dụ**
solid

dashed

dotted
### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Bo góc phần tử cột (hình chữ nhật)

Độ trong suốt nét viền của phần tử cột (hình chữ nhật)

:::

**Ví dụ**
4

[0, 0, 10, 10]
### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}
Cấu hình điểm chú thích; dựa trên dữ liệu được chọn để định nghĩa vị trí, định dạng, kiểu, v.v.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Selector của điểm chú thích, dùng để chọn điểm dữ liệu.

:::
#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; id của một mục trong dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Giống operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều trong mục dữ liệu; hỗ trợ mảng

:::
### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}
Chỉ định id chỉ số mà điểm chú thích thuộc về. Trong trường hợp nhiều measure, có thể kết hợp với selector để định vị duy nhất điểm chú thích của chỉ số mục tiêu.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Phù hợp với Top N, phân tích thống kê, điều kiện phức tạp và các trường hợp khó biểu đạt bằng selector tĩnh.

Khả năng chính:

- Hỗ trợ điều kiện lọc dữ liệu phức tạp tùy ý

- Dùng hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ trình duyệt; môi trường Node.js dùng fallback.

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có độ ưu tiên cao hơn.

Cấu hình bộ lọc động của biểu đồ

Lọc mark của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo

:::
#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
"Làm nổi bật cột có sales > 1000"

"Làm nổi bật cột có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"
#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng tổ hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index là số dòng của mục dữ liệu gốc, field là trường cần làm nổi bật

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Làm nổi bật trường sales của mục dữ liệu có sales lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật mục dữ liệu có tỷ suất lợi nhuận cao nhất trong mỗi khu vực
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
Trường chiều; id của một mục trong dimensions

:::
##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::
##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Giống operator

:::
##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều trong mục dữ liệu; hỗ trợ mảng

:::
#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare() và chỉ đọc khi runtime

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
Nội dung văn bản

:::

**Ví dụ**
'Annotation text'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản

:::

**Ví dụ**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ văn bản

:::

**Ví dụ**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Căn chỉnh văn bản, thường không cần thiết lập

Khuyến nghị đặt right để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, mép phải căn với đường chú thích dọc

left: văn bản nằm bên phải đường tham chiếu, mép trái căn với đường chú thích dọc

center: văn bản nằm ở giữa đường tham chiếu

:::

**Ví dụ**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc của văn bản. Thường dùng top để văn bản hiển thị dưới điểm chú thích và nằm trong vùng biểu đồ nhìn thấy được

Khuyến nghị dùng top để hiển thị đầy đủ văn bản

top: văn bản nằm dưới điểm chú thích

middle: văn bản căn với tâm điểm chú thích

bottom: văn bản nằm trên điểm chú thích

:::

**Ví dụ**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nền hay không

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
Màu viền nền

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
Décalage Y en pixels de tout le point d’annotation. Valeur positive recommandée au-dessus du graphique, négative en dessous.

Une valeur négative déplace tout le composant vers le haut, par exemple -10 de 10 px

Une valeur positive le déplace vers le bas, par exemple 10 de 10 px

:::

**Ví dụ**
offsetY: 5
### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}
Décalage X en pixels de tout le point d’annotation. Valeur positive à gauche du graphique, négative à droite.

Une valeur négative déplace tout le composant vers la gauche, par exemple -10 de 10 px

Une valeur positive le déplace vers la droite, par exemple 10 de 10 px

:::

**Ví dụ**
offsetX: 5
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}
Configuration des lignes d’annotation verticales.

:::
### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}
Valeur X fixe pour la ligne verticale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Description du besoin de valeur dynamique (langage naturel)

:::

**Ví dụ**
"Obtenir la valeur maximale de sales comme référence de ligne d’annotation"

"Calculer la moyenne de sales pour la ligne d’annotation"
#### code

**Type:** `string`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare() và chỉ đọc khi runtime

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Nội dung văn bản

:::

**Ví dụ**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
Position du texte

Position du libellé de la ligne d’annotation par rapport à la ligne.

:::

**Ví dụ**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản

:::

**Ví dụ**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ văn bản

:::

**Ví dụ**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Căn chỉnh văn bản, thường không cần thiết lập

Khuyến nghị đặt right để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, mép phải căn với đường chú thích dọc

left: văn bản nằm bên phải đường tham chiếu, mép trái căn với đường chú thích dọc

center: văn bản nằm ở giữa đường tham chiếu

:::

**Ví dụ**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc của văn bản, thường không cần thiết lập

Khuyến nghị dùng top để toàn bộ văn bản nằm trong vùng biểu đồ nhìn thấy được

top: văn bản nằm dưới đường tham chiếu và căn với điểm cuối đường chú thích dọc

middle: văn bản nằm ở giữa đường tham chiếu

bottom: văn bản nằm trên đường tham chiếu

:::

**Ví dụ**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị đường hay không

:::

**Ví dụ**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường

:::

**Ví dụ**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường

:::

**Ví dụ**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu đường

:::

**Ví dụ**
'solid'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nền hay không

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
Màu viền nền

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
Configuration des lignes d’annotation horizontales.

:::
### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}
Valeur Y fixe pour la ligne horizontale; utilisez une valeur de dimension pour un axe catégoriel, une valeur numérique concrète pour un axe numérique

:::
### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::
#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

"Tính doanh số trung bình cho đường chú thích"



#### code

**Type:** `string`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Mã lọc JavaScript do AI tạo

- Chỉ được dùng hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng)

- Doit retourner une seule valeur number ou string: number | string

- Cas d’usage: valeurs dynamiques nécessaires aux lignes d’annotation (horizontales/verticales)

- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

:::

**Ví dụ**
Obtenir la valeur maximale de sales comme valeur de ligne d’annotation
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculer la moyenne pour la ligne d’annotation
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Obtenir un quantile comme ligne d’annotation
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculer une valeur cible selon une condition
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
Valeur fallback si l’exécution du code échoue ou si l’environnement n’est pas pris en charge

:::
#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare() và chỉ đọc khi runtime

:::
##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Nội dung văn bản

:::

**Ví dụ**
'Annotation text'
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
Position du texte

Position du libellé de la ligne d’annotation par rapport à la ligne.

:::

**Ví dụ**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản

:::

**Ví dụ**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ văn bản

:::

**Ví dụ**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Căn chỉnh văn bản, thường không cần thiết lập

Khuyến nghị đặt right để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, mép phải căn với đường chú thích dọc

left: văn bản nằm bên phải đường tham chiếu, mép trái căn với đường chú thích dọc

center: văn bản nằm ở giữa đường tham chiếu

:::

**Ví dụ**
'right'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc của văn bản, thường không cần thiết lập

Khuyến nghị dùng top để toàn bộ văn bản nằm trong vùng biểu đồ nhìn thấy được

top: văn bản nằm dưới đường tham chiếu và căn với đường chú thích ngang

middle: văn bản nằm ở giữa đường tham chiếu

bottom: văn bản nằm trên đường tham chiếu

:::

**Ví dụ**
'top'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nền hay không

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
Màu viền nền

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
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị đường hay không

:::

**Ví dụ**
true
### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường

:::

**Ví dụ**
'red'
### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường

:::

**Ví dụ**
2
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu đường

:::

**Ví dụ**
'solid'
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mô tả}
Configuration de ligne de séparation; les parties au-dessus et au-dessous de la valeur d’annotation peuvent utiliser des couleurs différentes.

:::
#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Couleur principale de la partie supérieure à la valeur d’annotation

:::
#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Couleur principale de la partie inférieure à la valeur d’annotation

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
Cấu hình vùng chú thích; dựa trên dữ liệu được chọn để định nghĩa vị trí và kiểu của vùng.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
Sélecteur de la zone d’annotation.

:::
#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; id của một mục trong dimensions

:::
#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::
#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Giống operator

:::
#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều trong mục dữ liệu; hỗ trợ mảng

:::
### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Nội dung văn bản

:::

**Ví dụ**
'Annotation text'
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mô tả}
Position du texte

:::

**Ví dụ**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu văn bản

:::

**Ví dụ**
'red'
### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản

:::

**Ví dụ**
12
### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ văn bản

:::

**Ví dụ**
400
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Căn chỉnh văn bản, thường không cần thiết lập

center: le texte est centré dans la zone d’annotation

left: le texte est à gauche dans la zone d’annotation

right: le texte est à droite dans la zone d’annotation

:::

**Ví dụ**
'center'
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc của văn bản, thường không cần thiết lập

top: le texte est en haut de la zone d’annotation

middle: le texte est au centre de la zone d’annotation

bottom: le texte est en bas de la zone d’annotation

:::

**Ví dụ**
'middle'
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nền hay không

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
Màu viền nền

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
### areaColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu vùng chú thích

:::

**Ví dụ**
'rgba(255,0,0,0.1)'
### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ trong suốt vùng chú thích

:::

**Ví dụ**
0.2
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
Bo góc viền vùng chú thích

:::

**Ví dụ**
4
### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Thiết lập nét đứt viền vùng chú thích

:::

**Ví dụ**
[4, 4]
### outerPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
Padding bên ngoài

:::

**Ví dụ**
8
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mô tả}
Khi biểu đồ bật chức năng pivot hoặc tổ hợp chỉ số, có bật chức năng liên kết dimension hay không.

Khi hover vào một giá trị dimension, dữ liệu có cùng giá trị dimension trong các biểu đồ khác sẽ được highlight liên kết.

Cấu hình liên kết dimension của biểu đồ pivot
:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật liên kết dimension của biểu đồ pivot hay không
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị thông tin Tooltip của các biểu đồ con tương ứng với tất cả dimension hay không
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
