# BoxPlot

:::info{title=Khuyến nghị}
\- Cấu hình trường được khuyến nghị: `1` chỉ số, `1` chiều

\- Hỗ trợ reshape dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ hộp hỗ trợ các kênh trực quan sau:

`xAxis`  : kênh trục X, hỗ trợ `nhiều chiều`, ánh xạ lên trục X theo giá trị chiều

`yAxis`  : kênh trục Y, hỗ trợ `nhiều chỉ số`, ánh xạ lên trục Y theo giá trị chỉ số

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu theo chiều dùng để phân biệt chuỗi dữ liệu, màu theo chỉ số ánh xạ tuyến tính giá trị sang màu của mark

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi rê chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ hộp phù hợp để hiển thị phân bố dữ liệu. Trục X là trục danh mục (dữ liệu phân loại), trục Y là trục số (dữ liệu liên tục), và các hộp được sắp xếp theo chiều dọc.

Tình huống phù hợp:

\- Khi tên mục dữ liệu ngắn

\- Khi cần so sánh trực quan giá trị số giữa các danh mục khác nhau

\- Khi hiển thị xu hướng thay đổi của dữ liệu chuỗi thời gian

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 field số (chỉ số)

\- Chiều đầu tiên được đặt trên trục X. Các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

\- Tất cả chỉ số sẽ tự động được hợp nhất thành một chỉ số

Các tính năng bật mặc định:

\- Chú giải, trục, nhãn dữ liệu và tooltip được bật mặc định.

:::


## chartType

**Type:** `"boxPlot"`

:::note{title=Mô tả}
Biểu đồ hộp phù hợp để hiển thị phân bố dữ liệu. Trục X là trục danh mục (dữ liệu phân loại), trục Y là trục số (dữ liệu liên tục), và các hộp được sắp xếp theo chiều dọc.

:::

**Ví dụ**
'boxPlot'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset đã được tổng hợp và tuân theo chuẩn TidyData, dùng để xác định nguồn dữ liệu và cấu trúc của biểu đồ. Dataset do người dùng nhập không cần xử lý trước. VSeed có năng lực reshape dữ liệu mạnh mẽ và sẽ tự thực hiện reshape dữ liệu; dữ liệu biểu đồ hộp cuối cùng sẽ được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{category:'A', value:100}, {category:'B', value:200}]




## dimensions

**Type:** `BoxPlotDimension[] | undefined`

:::note{title=Mô tả}
Chiều đầu tiên của biểu đồ hộp được ánh xạ tới trục X. Các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: "category", alias: "Category"}]




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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- xAxis: hỗ trợ ánh xạ nhiều chiều vào trục X

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh label

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `BoxPlotMeasure[] | undefined`

:::note{title=Mô tả}
Tất cả chỉ số trong biểu đồ hộp tự động được gộp thành một chỉ số và ánh xạ tới trục Y. Khi có nhiều chỉ số, tên chỉ số được gộp với các chiều còn lại và hiển thị dưới dạng mục chú giải.

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

**Type:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- value: chỉ số tương ứng với các giá trị rời rạc, dùng để tính các giá trị thống kê để hiển thị biểu đồ hộp

\- q1: ánh xạ chỉ số cho giá trị thống kê phân vị thứ 25

\- q3: ánh xạ chỉ số cho giá trị thống kê phân vị thứ 75

\- min: ánh xạ chỉ số cho giá trị râu tối thiểu

\- max: ánh xạ chỉ số cho giá trị râu tối đa

\- meadian: ánh xạ chỉ số cho giá trị thống kê trung vị

\- outliers: ánh xạ chỉ số cho giá trị ngoại lệ

\- detail: chỉ số được ánh xạ tới kênh detail

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

Trong tình huống nhiều measure, không cần lo xung đột giá trị, vì mọi measure liên quan tới phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một measure đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị phần trăm của giá trị measure hay không

Trong tình huống nhiều measure, không cần lo xung đột giá trị, vì mọi measure liên quan tới phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một measure đại diện cho một điểm dữ liệu

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
Cấu hình bộ lọc động của biểu đồ

Triển khai lọc marker của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo



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
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật viền chú giải hay không..

:::

:::warning{title=Warning}
Giá trị của trường chiều, hỗ trợ mảng

:::

**Ví dụ**
Kết quả thực thi bộ lọc động (trường runtime)



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
legend font color



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}
Hình dạng chú giải
:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
Cỡ chữ chú giải



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải

:::

**Ví dụ**
legend font color



### maxSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
maxSize: 2




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
\- 1234.5678 chuyển đổi thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

**Ví dụ**
\- 1234.5678 chuyển đổi thành 1000, significantDigits:1
\- 1234.5678 chuyển đổi thành 1200, significantDigits:2
\- 1234.5678 chuyển đổi thành 1230, significantDigits:3
\- 1234.5678 chuyển đổi thành 1234, significantDigits:4
\- 1234.5678 chuyển đổi thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 chuyển đổi thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trên trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 chuyển đổi thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 chuyển đổi thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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


## sort

**Type:** `Sort | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp trục X; hỗ trợ sắp xếp theo chiều hoặc measure, cũng như thứ tự sắp xếp tùy chỉnh



Cấu hình sắp xếp trục phân loại; hỗ trợ sắp xếp theo chiều hoặc measure, cũng như thứ tự sắp xếp tùy chỉnh
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
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

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
\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, và `field` biểu thị field cần tô nổi bật.

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mô tả}
return _.map(filtered, item => ({



Cấu hình bộ lọc động của biểu đồ

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
or
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

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
Thứ tự sắp xếp tùy chỉnh. Thứ tự này được áp dụng trực tiếp cho chú giải. Thứ tự tăng dần đi từ trái sang phải hoặc từ trên xuống dưới; thứ tự giảm dần đi từ phải sang trái hoặc từ dưới lên trên.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme biểu đồ. Theme là cấu hình chức năng có mức ưu tiên thấp hơn, gồm các thiết lập chung cho mọi loại biểu đồ và các thiết lập dùng chung trong một nhóm biểu đồ. Theme tích hợp gồm light và dark, người dùng có thể tùy chỉnh theme qua Builder.



Toán tử



\- not in: Chọn các mục dữ liệu có giá trị field chiều KHÔNG nằm trong danh sách giá trị.

:::

**Ví dụ**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


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


## boxPlotStyle

**Type:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title=Mô tả}
Cấu hình style hộp của box plot, hỗ trợ áp dụng toàn cục hoặc ở cấp selector

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Data selector

Nếu cấu hình selector, sẽ cung cấp bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện.

If no selector is configured, the style applies globally.

:::

**Ví dụ**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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
Selector dữ liệu

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Trường chiều, ID của một mục chiều

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Toán tử

:::

### boxVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### boxColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

### boxColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Toán tử

:::

### boxBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### boxBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

### boxBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ viền phần tử box plot

:::

### boxCornerRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng

:::

### medianBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Median line color

:::

### whiskerBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Whisker line color

:::


## outlierStyle

**Type:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title=Mô tả}
Outlier style configuration, supports global or selector-level application

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Data selector

Nếu cấu hình selector, sẽ cung cấp bốn khả năng khớp dữ liệu: selector số, selector dữ liệu cục bộ, selector chiều có điều kiện và selector chỉ số có điều kiện.

If no selector is configured, the style applies globally.

:::

**Ví dụ**
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
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
Selector dữ liệu

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

Trường chiều, ID của một mục chiều

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Toán tử

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng

:::

**Ví dụ**
solid

dashed

dotted




## whiskers

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Cấu hình độ dài râu của box plot, hỗ trợ giá trị vô hướng và mảng có độ dài 2.

When the value is a scalar, whiskers * IQR is used to calculate the upper and lower bounds.

When the value is an array of length 2, whiskers[0] must be between [0, 0.25), representing the percentile for the lower bound;

whiskers[1] must be between (0.75, 1], representing the percentile for the upper bound.

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}
Cấu hình điểm chú thích, xác định vị trí, định dạng, kiểu dáng, v.v. của điểm chú thích dựa trên dữ liệu được chọn.

:::
### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Selector cho điểm chú thích, dùng để chọn điểm dữ liệu.

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
Giá trị trường chiều đã chọn; hỗ trợ mảng.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}
Chỉ định id measure mà điểm chú thích thuộc về. Trong kịch bản nhiều measure, có thể kết hợp với selector để định vị duy nhất điểm chú thích tương ứng với measure mục tiêu.

:::
### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)



Trường chiều, ID của một mục chiều

Toán tử



\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

Toán tử

\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value



\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



Lưu ý: không thể sử dụng selector và dynamicFilter đồng thời; dynamicFilter có mức ưu tiên cao hơn..



Giá trị của trường chiều, hỗ trợ mảng



Lọc các marker của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

:::

**Ví dụ**
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



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
Mã lọc JavaScript do AI tạo

\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- Phải trả về mảng tổ hợp chỉ số dòng và trường: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

Làm nổi bật trường sales cho các mục dữ liệu có sales lớn hơn 1000

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực

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

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều

:::

**Ví dụ**
\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

**Ví dụ**
\- Phải trả về mảng tổ hợp chỉ số dòng và trường: Array<{ __row_index: number, field: string }>



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Toán tử

:::

**Ví dụ**
\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value

:::

**Ví dụ**
Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
Cách căn chỉnh văn bản. Thông thường đặt là `right` để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Nên đặt là `right`, để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, cạnh phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, cạnh trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích, tâm văn bản căn với điểm chú thích
:::

**Ví dụ**
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



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
2

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
4

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
Khoảng lệch pixel của toàn bộ điểm chú thích theo hướng Y. Khi điểm chú thích ở phía trên biểu đồ (giá trị lớn), nên dùng giá trị dương; khi ở phía dưới (giá trị nhỏ), nên dùng giá trị âm.

Giá trị âm dịch toàn bộ lên trên; ví dụ \-10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, lên trên 10 pixel

Giá trị dương dịch toàn bộ xuống dưới; ví dụ 10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, xuống dưới 10 pixel

:::

**Ví dụ**
offsetY: 5, toàn bộ điểm chú thích dịch xuống dưới 5 pixel
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
Đường chú thích giá trị dimension, hiển thị theo chiều dọc. Có thể cấu hình vị trí, style và các thiết lập liên quan của đường chú thích.

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



Bán kính bo góc viền nền

Cấu hình vùng chú thích; định nghĩa các vùng chú thích trên biểu đồ dựa trên dữ liệu đã chọn, bao gồm vị trí, kiểu dáng, v.v.



Có bật chức năng chia đường chính thành hai đoạn hay không.

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

"Calculate the average sales for the annotation line"



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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Written during the prepare() phase; read-only at runtime.

:::

**Ví dụ**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
center: văn bản được căn giữa trong vùng chú thích; the center of the text aligns with the area.

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

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
Cách căn dọc văn bản. Thông thường không cần đặt

Khuyến nghị đặt là 'top' để toàn bộ văn bản hiển thị trong vùng nhìn thấy của biểu đồ

top: văn bản nằm phía dưới đường tham chiếu, mép trên của văn bản căn với điểm cuối của đường chú thích dọc

middle: văn bản nằm ở giữa đường tham chiếu

bottom: văn bản nằm phía trên đường tham chiếu, mép dưới của văn bản căn với điểm cuối của đường chú thích dọc

:::

**Ví dụ**
'top'
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hiển thị đường

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
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Ví dụ**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Bán kính bo góc viền vùng chú thích

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
2

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
4

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
4

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



Bán kính bo góc viền nền

Cấu hình vùng chú thích; định nghĩa các vùng chú thích trên biểu đồ dựa trên dữ liệu đã chọn, bao gồm vị trí, kiểu dáng, v.v.



Có bật chức năng chia đường chính thành hai đoạn hay không.

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

"Calculate the average sales for the annotation line"



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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Written during the prepare() phase; read-only at runtime.

:::

**Ví dụ**
'Annotation text'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
Vị trí văn bản



Vị trí nhãn của đường chú thích (vị trí tương đối so với đường).

:::

**Ví dụ**
'outsideEnd'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
center: văn bản được căn giữa trong vùng chú thích; the center of the text aligns with the area.

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Cách căn chỉnh văn bản. Thông thường không cần cấu hình

Nên đặt là `right`, để văn bản nằm bên trái đường chú thích

right: văn bản nằm bên trái đường tham chiếu, cạnh phải của văn bản căn với điểm cuối của đường chú thích ngang

left: văn bản nằm bên phải đường tham chiếu, cạnh trái của văn bản căn với điểm cuối của đường chú thích ngang

center: văn bản nằm ở giữa đường tham chiếu, tâm văn bản căn với điểm cuối của đường chú thích ngang
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
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
4



Mã lọc JavaScript do AI tạo

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
Hiển thị đường



Hiển thị đường

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
Bán kính bo góc viền vùng chú thích

:::

**Ví dụ**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mô tả}
Kiểu đường viền vùng chú thích

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chính ứng với phần nhỏ hơn giá trị chú thích

:::
## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
Cấu hình vùng chú thích, xác định vị trí, kiểu dáng, v.v. của vùng chú thích dựa trên dữ liệu được chọn.

:::
### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
Có bật chức năng liên kết chiều khi biểu đồ bật perspective hoặc khi các chỉ số được kết hợp hay không.

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
Giá trị trường chiều đã chọn; hỗ trợ mảng.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Written during the prepare() phase; read-only at runtime.

:::

**Ví dụ**
'Annotation text'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mô tả}
Vị trí văn bản

:::

**Ví dụ**
'top'
### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
center: văn bản được căn giữa trong vùng chú thích; the center of the text aligns with the area.

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

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
Cách căn chỉnh văn bản. Thông thường đặt là `right`; văn bản hiển thị ở giữa vùng chú thích để đảm bảo nằm trong vùng hiển thị của biểu đồ

Nên đặt là `center`, để văn bản nằm ở giữa vùng chú thích

right: văn bản nằm bên trái vùng chú thích, cạnh phải của văn bản căn với vùng chú thích

left: văn bản nằm bên phải vùng chú thích, cạnh trái của văn bản căn với vùng chú thích

center: văn bản nằm ở giữa vùng chú thích, tâm văn bản căn với vùng chú thích
:::

**Ví dụ**
'center' Text is in the middle of the annotation area



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Căn dọc văn bản. Thường đặt là top để văn bản xuất hiện ở phía dưới vùng chú thích và nằm trong vùng hiển thị của biểu đồ.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

top: text is at the bottom of the annotation area; the top edge of the text aligns with the annotation area

middle: text is centered in the annotation area; the center of the text aligns with the annotation area

Order of the polynomial regression

:::

**Ví dụ**
'top' Text is at the bottom of the annotation area



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
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
2



2

:::

**Ví dụ**
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
4

:::

**Ví dụ**
Giá trị của trường chiều, hỗ trợ mảng



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
Màu tô vùng chú thích

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
Toán tử

:::

**Ví dụ**
0




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


## boxMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Chiều rộng tối đa của box plot. Có thể đặt bằng giá trị pixel tuyệt đối hoặc phần trăm (ví dụ '10%').

:::


## boxGapInGroup

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Khoảng cách trong mỗi nhóm của box plot phân nhóm. Có thể đặt bằng giá trị pixel tuyệt đối hoặc phần trăm (ví dụ '10%').

:::
