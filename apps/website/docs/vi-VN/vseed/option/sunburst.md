# Sunburst

:::info{title=Ánh xạ mã hóa}
Biểu đồ sunburst hỗ trợ các kênh trực quan sau:

`color`: kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`

`label`: kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`

:::

:::note{title=Mô tả}
Biểu đồ sunburst dùng để hiển thị dữ liệu phân cấp, diện tích mỗi cung biểu thị độ lớn giá trị.

Tình huống phù hợp:

\- Hiển thị phân bố tỷ lệ phần trăm của dữ liệu phân cấp nhiều tầng

\- Nhấn mạnh quan hệ phân cấp và tỷ lệ

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Cần ít nhất 1 trường số để ánh xạ kích thước diện tích

\- Cần ít nhất 1 trường chiều để phân chia phân cấp

:::


## chartType

**Type:** `"sunburst"`

:::note{title=Mô tả}
Biểu đồ sunburst



Biểu đồ sunburst hiển thị quan hệ tỷ lệ của dữ liệu phân cấp.

:::

**Ví dụ**
'sunburst'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu



Tập dữ liệu đã tổng hợp theo đặc tả TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ.

:::

**Ví dụ**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title=Mô tả}
Chiều



Cấu hình chiều dùng để định nghĩa cấu trúc phân cấp của dữ liệu.

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
Độ hạt thời gian, quyết định độ chính xác khi hiển thị ngày

:::

### encoding

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- hierarchy: hỗ trợ ánh xạ nhiều chiều vào kênh phân cấp

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

:::

:::tip{title=Mẹo}
Chiều đầu tiên được ánh xạ trực tiếp vào kênh màu.

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Cấu hình chỉ số dùng để định nghĩa kích thước (diện tích) của các cung.

:::

**Ví dụ**
[{id: 'value', alias: 'Giá trị'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng lặp; nếu không đặt, alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có độ ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000 , significantDigits:1
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000 , significantDigits:1
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- size: chỉ số được ánh xạ vào kênh kích thước, dùng để hiển thị diện tích hoặc kích thước trong các biểu đồ như Treemap và Sunburst.

\- label: chỉ số được ánh xạ vào kênh nhãn

\- tooltip: chỉ số được ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha và dùng để xây dựng cây chỉ số

:::

:::tip{title=Mẹo}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang



Dùng để chỉ định tên trường phân trang; phải là một chiều

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



Màu nền có thể là chuỗi màu (ví dụ 'red', 'blue') hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Màu



Cấu hình màu dùng để định nghĩa bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và gradient màu.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu rời rạc dùng để định nghĩa màu của các thành phần khác nhau trong biểu đồ

:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu gradient tuyến tính dùng để định nghĩa màu của các thành phần khác nhau trong biểu đồ

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
Cấu hình màu dương/âm; định nghĩa màu cho giá trị dương trong biểu đồ

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị âm trong biểu đồ

:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}
Nhãn



Cấu hình nhãn dùng để định nghĩa nhãn dữ liệu biểu đồ, bao gồm vị trí, định dạng và kiểu.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng nhãn hay không

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có tự xuống dòng hay không

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị giá trị chỉ số hay không

Trong kịch bản nhiều chỉ số, không cần lo xung đột giá trị vì mọi chỉ số liên quan đến phần vẽ đều đi qua `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị tỷ lệ phần trăm của giá trị chỉ số hay không

Trong kịch bản nhiều chỉ số, không cần lo xung đột giá trị vì mọi chỉ số liên quan đến phần vẽ đều đi qua `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị nhãn chiều hay không

Hiển thị tất cả nhãn chiều

Lưu ý: label trong encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Giá trị nhãn có được định dạng tự động hay không; khi autoFormat là true, cấu hình numFormat bị bỏ qua

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị nhãn; được hợp nhất với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. Ưu tiên của numFormat thấp hơn autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1000 , significantDigits:1
\- 1234.5678 được chuyển thành 1200 , significantDigits:2
\- 1234.5678 được chuyển thành 1230 , significantDigits:3
\- 1234.5678 được chuyển thành 1234 , significantDigits:4
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Nhãn font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm phông chữ nhãn

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
NhãnfontMàu

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Màu chữ nhãn có tự đảo dựa trên màu phần tử đồ họa hay không

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng chống chồng lấp nhãn hay không

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Nhãn filtering; the default relationship between selectors is OR

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều; ID của một mục chiều cụ thể

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong giá trị được chỉ định

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong giá trị được chỉ định

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong giá trị được chỉ định

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong giá trị được chỉ định

giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều; hỗ trợ mảng

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

Khả năng cốt lõi:

\- Hỗ trợ điều kiện lọc dữ liệu phức tạp tùy ý

\- Sử dụng các hàm tiện ích tích hợp để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Triển khai lọc các mark của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
"Làm nổi bật các cột có doanh số lớn hơn 1000"

"Làm nổi bật cột có biên lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo

\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi mục có trường __row_index biểu thị số dòng

\- Phải trả về mảng các tổ hợp chỉ số dòng và trường: Array<{ __row_index: number, field: string }>

\- __row_index biểu thị số dòng của mục dữ liệu gốc; field biểu thị trường cần làm nổi bật

\- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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

Làm nổi bật các mục dữ liệu có biên lợi nhuận cao nhất trong mỗi khu vực
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

Làm nổi bật các mục dữ liệu được lọc bởi nhiều điều kiện
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
Trường chiều; ID của một mục chiều cụ thể

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong giá trị được chỉ định

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong giá trị được chỉ định

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong giá trị được chỉ định

\- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong giá trị được chỉ định

giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị trường chiều; hỗ trợ mảng

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


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Tooltip



Cấu hình tooltip dùng để định nghĩa tooltip của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật tooltip hay không

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Chủ đề của biểu đồ. Chủ đề là cấu hình chức năng có mức ưu tiên thấp hơn, bao gồm cấu hình chung dùng cho mọi loại biểu đồ và cấu hình riêng cho từng loại biểu đồ.

Có sẵn hai chủ đề light và dark; người dùng có thể tùy chỉnh chủ đề thông qua Builder.

Theme

Có sẵn hai chủ đề light và dark; chủ đề mới có thể được tùy chỉnh bằng registerTheme.

:::

**Ví dụ**
'dark'

'light'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Ngôn ngữ

Cấu hình ngôn ngữ biểu đồ; hỗ trợ 'zh-CN' và 'en-US'. Ngoài ra có thể gọi phương thức intl.setLocale('zh-CN') để chỉ định ngôn ngữ.

:::
