# Funnel

:::info{title=Khuyến nghị}
- Cấu hình trường khuyến nghị: `1` chỉ số, `1` chiều

\- Hỗ trợ reshape dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ encoding}
Biểu đồ phễu hỗ trợ các kênh trực quan sau:

`size`   : kênh kích thước, hỗ trợ `nhiều chỉ số`, ánh xạ giá trị chỉ số sang độ rộng phễu

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng khi cần hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`. Màu theo chiều dùng để phân biệt các chuỗi dữ liệu; màu theo chỉ số dùng để ánh xạ tuyến tính giá trị chỉ số sang màu đồ họa

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi di chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ phễu dùng để hiển thị quan hệ tỷ trọng của dữ liệu một chiều.

Kịch bản áp dụng:

Kịch bản áp dụng của biểu đồ phễu:

\- Phù hợp để phân tích các quy trình có nhiều bước liên tục, được chuẩn hóa, đồng thời hiển thị rõ lượng dữ liệu thất thoát hoặc chuyển đổi ở từng bước

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường số (chỉ số)

\- Tất cả các chiều sẽ được kết hợp với tên chỉ số (khi có nhiều chỉ số) thành một chiều và hiển thị như các mục chú giải

\- Tất cả chỉ số sẽ tự động được hợp nhất thành một chỉ số

Các tính năng bật mặc định:

\- Chú giải, nhãn dữ liệu, tooltip và tính toán tỷ trọng được bật mặc định

:::


## chartType

**Type:** `"funnel"`

:::note{title=Mô tả}
Biểu đồ phễu



Biểu đồ phễu hiển thị quan hệ tỷ trọng của dữ liệu một chiều.

:::

**Ví dụ**
'funnel'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu. Tập dữ liệu đã được tổng hợp và tuân theo đặc tả TidyData, dùng để định nghĩa nguồn dữ liệu và cấu trúc của biểu đồ. Tập dữ liệu do người dùng nhập không cần tiền xử lý; VSeed có năng lực reshape dữ liệu mạnh mẽ và sẽ tự động reshape dữ liệu. Dữ liệu của biểu đồ phễu cuối cùng sẽ được chuyển đổi thành 1 chiều và 1 chỉ số.

:::

**Ví dụ**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `PieDimension[] | undefined`

:::note{title=Mô tả}
Chiều



Trong biểu đồ phễu, tất cả các chiều sẽ được kết hợp với tên chỉ số (khi có nhiều chỉ số) thành một chiều và hiển thị như các mục chú giải.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `FunnelMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Trong biểu đồ phễu, tất cả chỉ số sẽ tự động được hợp nhất thành một chỉ số. Khi có nhiều chỉ số, tên chỉ số sẽ được kết hợp với các chiều còn lại và hiển thị như các mục chú giải.

:::

**Ví dụ**
[{id: 'value', alias: 'Tỷ trọng giá trị', format: 'percent'}]




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
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký pháp khoa học
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
Ký hiệu định dạng số, ví dụ % hoặc ‰
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
Số chữ số thập phân khi định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên thấp hơn significantDigits
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
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingMode của Intl.NumberFormat
:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký pháp khoa học
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
Ký hiệu định dạng số, ví dụ % hoặc ‰
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
Số chữ số thập phân khi định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên thấp hơn significantDigits
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
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingMode của Intl.NumberFormat
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "size" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- label: chỉ số được ánh xạ vào kênh nhãn

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ tới kênh label

\- tooltip: chỉ số được ánh xạ tới kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha và dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên trường dùng cho phân trang và phải là một chiều
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
Cấu hình màu chuyển sắc tuyến tính, dùng để định nghĩa bảng màu của biểu đồ

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu rời rạc, dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ
:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu gradient tuyến tính, dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ
:::

**Ví dụ**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mô tả}
Ánh xạ màu, dùng để ánh xạ giá trị dữ liệu tới màu cụ thể
:::

**Ví dụ**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm, dùng để định nghĩa màu cho giá trị dương trong biểu đồ
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm, dùng để định nghĩa màu cho giá trị âm trong biểu đồ
:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}
Cấu hình label dùng để định nghĩa label dữ liệu của biểu đồ, bao gồm vị trí, định dạng và kiểu dáng.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật nhãn hay không
:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có cho nhãn xuống dòng hay không
:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị giá trị chỉ số trên nhãn hay không

Trong tình huống có nhiều chỉ số, không cần lo các giá trị mâu thuẫn với nhau, vì mọi chỉ số liên quan đến việc vẽ đều được xử lý qua `foldMeasures` và gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: encoding.label có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến encoding.label
:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị phần trăm giá trị chỉ số trên nhãn hay không

Trong tình huống có nhiều chỉ số, không cần lo các giá trị mâu thuẫn với nhau, vì mọi chỉ số liên quan đến việc vẽ đều được xử lý qua `foldMeasures` và gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: encoding.label có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến encoding.label
:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn chiều hay không

Hiển thị tất cả nhãn chiều

Lưu ý: encoding.label có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến encoding.label
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động định dạng giá trị nhãn hay không. Khi autoFormat là true, cấu hình numFormat sẽ không có hiệu lực
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị nhãn. Cấu hình này được gộp với `format` trong `measure`; `format` trong `measure` có độ ưu tiên cao hơn. numFormat có độ ưu tiên thấp hơn autoFormat
:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký pháp khoa học
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
Ký hiệu định dạng số, ví dụ % hoặc ‰
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
Số chữ số thập phân khi định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên thấp hơn significantDigits
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
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingMode của Intl.NumberFormat
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
Màu viền chữ nhãn
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ nhãn
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động đảo màu chữ nhãn theo màu mark hay không
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chống chồng lấn nhãn hay không
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Bộ lọc nhãn. Mặc định quan hệ điều kiện giữa các selectors là OR
:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, là id của một mục trong dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value

giống operator
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu. Hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

Năng lực chính:

\- Hỗ trợ điều kiện lọc dữ liệu phức tạp tùy ý

\- Sử dụng hàm tiện ích tích hợp để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời. dynamicFilter có độ ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Dùng mã JavaScript do AI tạo để lọc các mark của biểu đồ (cột, điểm, v.v.)
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
\- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

\- Sử dụng hàm tiện ích tích hợp cho thao tác dữ liệu



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo

\- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

\- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

\- Phải trả về mảng tổ hợp chỉ mục dòng và trường: Array<{ __row_index: number, field: string }>

\- __row_index là số dòng của mục dữ liệu gốc, field là trường cần highlight

\- Cấm dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng
:::

**Ví dụ**
return _.map(filtered, item => ({
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

const maxItems = _.map(grouped, group =>
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

const profitRate = item.profit / item.sales;
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
Phương án fallback khi thực thi mã thất bại hoặc môi trường không hỗ trợ
:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, là id của một mục trong dimensions
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value
:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: chọn các mục dữ liệu có giá trị trường chiều không nằm trong value

giống operator
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu. Hỗ trợ mảng
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

Được ghi ở giai đoạn prepare(); chỉ đọc khi runtime
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
Cấu hình chú giải màu, dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng và các thiết lập khác.

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
Có bật chú giải hay không
:::

**Ví dụ**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải
:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải
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




Có bật chọn brush hay không

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật tooltip hay không
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}








Chế độ chọn brush: đơn hoặc nhiều

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chọn vùng bằng brush hay không
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
Loại brush

Định nghĩa hình dạng khung chọn và hướng chọn.

\- `rect`: chọn vùng hình chữ nhật, có thể chọn đồng thời theo cả trục X và trục Y

\- `polygon`: chọn vùng đa giác, vẽ đa giác tự do bằng cách nhấp nhiều điểm

\- `x`: chọn theo hướng trục X, chỉ chọn theo hướng X và không giới hạn hướng Y

\- `y`: chọn theo hướng trục Y, chỉ chọn theo hướng Y và không giới hạn hướng X
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Độ mờ of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xóa vùng brush sau khi chọn xong hay không
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Kiểu dữ liệu nằm trong vùng brush

Định nghĩa kiểu của các điểm dữ liệu được chọn
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ

Độ mờ của các điểm dữ liệu được chọn, phạm vi giá trị 0-1
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét viền
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét viền
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền
:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}




Selector dữ liệu. Nếu được cấu hình, cung cấp khả năng khớp theo giá trị số, một phần mục dữ liệu, chiều hoặc chỉ số. Nếu không đặt, kiểu dáng áp dụng toàn cục.



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

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



Cấu hình ngôn ngữ biểu đồ, hỗ trợ hai ngôn ngữ 'zh\-CN' và 'en\-US'; ngoài ra có thể gọi phương thức intl.setLocale('zh\-CN') để đặt ngôn ngữ

:::
