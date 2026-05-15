# ColumnPercent

:::info{title=Khuyến nghị}
\- Cấu hình trường khuyến nghị: `1` measure, `2` dimension

\- Hỗ trợ Data Reshape: ít nhất `1` measure, `0` dimension

:::

:::info{title=Ánh xạ encoding}
Biểu đồ cột phần trăm hỗ trợ các kênh trực quan sau:

`xAxis`  : kênh trục x, hỗ trợ `nhiều chiều`, ánh xạ lên trục x theo giá trị chiều

`yAxis`  : kênh trục y, hỗ trợ `nhiều measure`, ánh xạ lên trục y theo giá trị measure

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng để hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một measure`; màu theo chiều dùng để phân biệt chuỗi dữ liệu, màu theo measure dùng để ánh xạ tuyến tính giá trị measure sang màu hình

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều measure`, hiển thị khi rê chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều measure`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ cột phần trăm phù hợp để hiển thị quan hệ tỷ trọng giữa các danh mục; trục Y hiển thị tỷ trọng dữ liệu dưới dạng phần trăm

Tình huống áp dụng:

\- So sánh tỷ trọng dữ liệu giữa các danh mục khác nhau

\- Phân tích cơ cấu dữ liệu đa chiều

\- Xu hướng thay đổi tỷ trọng theo chuỗi thời gian

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường chỉ số

\- Chiều đầu tiên sẽ được đặt trên trục X; các chiều còn lại sẽ được hợp nhất với tên chỉ số (khi có nhiều chỉ số) và hiển thị thành các mục chú giải.

\- Tất cả measure được tự động gộp thành một measure

Các tính năng được bật mặc định:

\- Mặc định bật chú giải, trục, nhãn phần trăm, tooltip và tính toán tỷ trọng

:::


## chartType

**Type:** `"columnPercent"`

:::note{title=Mô tả}
Biểu đồ cột phần trăm



Biểu đồ cột phần trăm, hiển thị quan hệ tỷ trọng dữ liệu của từng danh mục dưới dạng phần trăm

:::

**Ví dụ**
'columnPercent'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu đã tổng hợp và tuân thủ TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Người dùng không cần xử lý thủ công dữ liệu đầu vào; khả năng Data Reshape mạnh mẽ của VSeed sẽ tự động xử lý. Dữ liệu biểu đồ Area cuối cùng được reshape thành 2 chiều và 1 chỉ số.



Tập dữ liệu đã được tổng hợp và tuân theo chuẩn TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Tập dữ liệu người dùng nhập vào không cần xử lý thêm. VSeed có khả năng định hình lại dữ liệu mạnh mẽ và sẽ tự động thực hiện việc này. Dữ liệu của biểu đồ cột phần trăm cuối cùng sẽ được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{category:'A', value:30}, {category:'B', value:70}]




## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Mô tả}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.



**Ví dụ**

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- xAxis: hỗ trợ ánh xạ nhiều chiều tới trục x

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Các chỉ số của biểu đồ cột phần trăm sẽ tự động được hợp nhất thành một chỉ số và ánh xạ lên trục Y. Khi có nhiều chỉ số, tên chỉ số sẽ được kết hợp với các chiều còn lại và hiển thị dưới dạng mục chú giải.

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
Kiểu định dạng số, hỗ trợ: số (thập phân), phần trăm (%), phần nghìn (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
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
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"
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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- yAxis: chỉ số được ánh xạ tới trục y

\- detail: chỉ số được ánh xạ tới kênh chi tiết

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ vào kênh nhãn

\- tooltip: chỉ số được ánh xạ vào kênh tooltip

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


:::


### field

**Type:** `string`

:::note{title=Mô tả}


:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}


:::

**Ví dụ**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền của biểu đồ. Mặc định là nền trong suốt. Màu nền có thể là chuỗi màu (ví dụ 'red', 'blue') hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}


:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}


:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"




#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"




#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
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


:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}


:::


#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}






:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
































:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}














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


:::


##### field

**Type:** `string`

:::note{title=Mô tả}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}






:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}






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


:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

:::warning{title=Warning}


:::

**Ví dụ**




### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}


:::

:::warning{title=Warning}


:::

**Ví dụ**




### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### maxSize

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

:::warning{title=Warning}


:::

**Ví dụ**





## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=Mô tả}





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
Có bật chọn brush hay không

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}








Chế độ chọn brush: đơn hoặc nhiều

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Độ mờ of selected data points, range 0-1







:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=Mô tả}
Khoảng tự động ẩn nhãn trục; nếu khoảng cách giữa hai nhãn văn bản nhỏ hơn autoHideGap, nhãn chồng lấn sẽ tự động bị ẩn. Chỉ hiệu lực với trục phân loại.



Khi autoHide bị tắt, dùng sampling được cấu hình trên minGap

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=Mô tả}


:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=Mô tả}


:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mô tả}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=Mô tả}


:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=Mô tả}


:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=Mô tả}


:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=Mô tả}


:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=Mô tả}


:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mô tả}


:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mô tả}


:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Mô tả}

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Kiểu đường lưới

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Trục X animation configuration

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Mô tả}


Trục Y, trục số, cấu hình trục Y; định nghĩa trục Y của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.


:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Mô tả}


:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Nhãn vạch trục X

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}


:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mô tả}


:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}

:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}


:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**





#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

**Ví dụ**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}

:::

**Ví dụ**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Ví dụ**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}


:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Thứ tự sắp xếp tùy chỉnh, được áp dụng trực tiếp cho trục phân loại

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
  orderBy: 'profit',

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
or

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
sort order, optional values 'asc' or 'desc'

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mô tả}


:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mô tả}
selector = [{ profit: 100 }, { profit: 200 }]

:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
operator: 'not in',

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}
}

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mô tả}
Giải pháp fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.





:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
selector = {

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Toán tử

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Bo góc xếp chồng của biểu đồ cột song song

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mô tả}


:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mô tả}
Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo





:::

**Ví dụ**


}

Toán tử
}


\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mô tả}






:::

**Ví dụ**

Cấu hình bộ lọc động/hoạt ảnh của biểu đồ

}

Thực hiện lọc marker biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo
}



_.maxBy(group, item => item.profit / item.sales)





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

:::

**Ví dụ**
"Highlight the bar with the highest profit rate in each region"



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo

:::

**Ví dụ**

\- Tham số đầu vào: data (mảng), mỗi mục chứa trường __row_index biểu thị số dòng



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}


:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}




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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mô tả}
Kiểu phần tử hình chữ nhật, dùng để định nghĩa màu sắc, viền, bo góc, v.v. của phần tử hình chữ nhật trong biểu đồ.

Primitive cột (hình chữ nhật) có hiển thị hay không






:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}






:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)








field: 'category',
operator: 'in',
value: 'tool'
}

field: 'category',
operator: 'not in',
value: 'book'
}

**Ví dụ**

field: 'profit',
operator: '>=',
value: 100
}

field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}





:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}





4

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}




\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong value

\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value






\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



















:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}














:::

**Ví dụ**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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
field: 'sales'

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
return _.flatten(

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

const profitRate = item.profit / item.sales;

});

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}





);

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}




\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong value

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


:::

### barColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}




Kích thước chữ văn bản

:::

**Ví dụ**
12

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}


:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}


:::


#### field

**Type:** `string`

:::note{title=Mô tả}
'right' Text is on the left side of the annotation point.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc văn bản; thường đặt là 'top' để văn bản xuất hiện ở đáy điểm chú thích và nằm trong vùng hiển thị của biểu đồ.

Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở phía dưới điểm chú thích; mép trên của văn bản căn với điểm.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
'top' Text is at the bottom of the annotation point.






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}




Màu nét nền

true













'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Padding nền

:::

**Ví dụ**
"Tô sáng các cột có doanh số lớn hơn 1000"

"Tô sáng cột có tỷ suất lợi nhuận cao nhất trong từng khu vực"



#### code

**Type:** `string`

:::note{title=Mô tả}
Giá trị âm dịch chuyển toàn bộ thành phần lên trên; ví dụ -10 dịch văn bản và nền lên 10 pixel.





**Ví dụ**







:::

**Ví dụ**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```


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


:::


##### field

**Type:** `string`

:::note{title=Mô tả}

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}


**Ví dụ**



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}








:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
"Use the highest sales value as a mark line reference"

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Tính giá trị trung bình cho đường chú thích





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

:::

**Ví dụ**
'Văn bản chú thích'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}






Màu văn bản

'Văn bản chú thích'

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở đáy đường tham chiếu; mép trên căn với điểm cuối của đường chú thích (dọc).

middle: Văn bản được căn giữa trên đường tham chiếu; tâm căn với điểm cuối của đường chú thích (dọc).

bottom: Văn bản nằm ở đỉnh đường tham chiếu; mép dưới căn với điểm cuối của đường chú thích (dọc).



:::

**Ví dụ**
'top' văn bản nằm bên dưới điểm chú thích



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
top: Văn bản nằm dưới đường tham chiếu, mép trên căn với điểm cuối của đường chú thích (dọc).

:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
'right'

:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}

:::

**Ví dụ**




### offsetY

**Type:** `number | undefined`

:::note{title=Mô tả}

**Ví dụ**



:::

**Ví dụ**



### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}






:::

**Ví dụ**





## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Phù hợp với các tình huống cần xác định động vị trí đường chú thích dựa trên dữ liệu, như trung bình, lớn nhất, phân vị, đường nghiệp vụ, v.v.

:::

**Ví dụ**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

"Tính doanh số trung bình cho đường chú thích"



#### code

**Type:** `string`

:::note{title=Mô tả}






**Ví dụ**







:::

**Ví dụ**

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

**Ví dụ**
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
\- Tham số đầu vào: data (mảng).

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}




const maxSales = _.maxBy(data, 'sales')?.sales;

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime

:::

**Ví dụ**
'Văn bản chú thích'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
_.filter(data, item => item.year === 2024),

:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
const index = Math.floor(sorted.length * 0.75);

:::

**Ví dụ**



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}


Vị trí văn bản



Vị trí nhãn đường chú thích (vị trí tương đối của nhãn so với đường).



:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
**Ví dụ**

**Ví dụ**







:::

**Ví dụ**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

:::

**Ví dụ**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
center: Văn bản nằm ở giữa đường tham chiếu (ở cuối đường đánh dấu ngang).



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mô tả}
4

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}












:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

"Tính doanh số trung bình cho đường chú thích"



#### code

**Type:** `string`

:::note{title=Mô tả}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



'red'



:::

**Ví dụ**
\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```


```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```


```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

'solid'
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


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**
'Văn bản chú thích'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mô tả}
**Ví dụ**





:::

**Ví dụ**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mô tả}
center: Văn bản được căn giữa trong vùng chú thích; tâm văn bản căn với vùng.

:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Căn chỉnh dọc văn bản; thường đặt là 'top' để văn bản xuất hiện ở đáy vùng chú thích và nằm trong vùng hiển thị của biểu đồ.

:::

**Ví dụ**




### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}








màu nền

:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
màu nét nền



màu nét nền

**Ví dụ**

**Ví dụ**

:::

**Ví dụ**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
bán kính bo góc nền

:::

**Ví dụ**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
padding nền

:::

**Ví dụ**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Màu vùng chú thích



Màu vùng chú thích

:::

**Ví dụ**




### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::

**Ví dụ**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Ví dụ**



**Ví dụ**

:::

**Ví dụ**




### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




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


:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
4

:::


#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




Màu vùng chú thích

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
**Ví dụ**






:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'Văn bản chú thích'



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
'center' văn bản nằm giữa vùng chú thích



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}








Bậc của hồi quy đa thức

:::

**Ví dụ**
'top' văn bản nằm dưới vùng chú thích



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}

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
**Ví dụ**

:::

**Ví dụ**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**



**Ví dụ**

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


:::

**Ví dụ**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}


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




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mô tả}
Có bật liên kết chiều khi biểu đồ bật chức năng pivot hoặc tổ hợp chỉ số hay không

Khi hover vào một giá trị chiều, dữ liệu có cùng giá trị chiều trong các biểu đồ khác sẽ được liên kết và tô sáng



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
Cấu hình ngôn ngữ biểu đồ, hỗ trợ hai ngôn ngữ 'zh\-CN' và 'en\-US'; ngoài ra có thể gọi phương thức intl.setLocale('zh\-CN') để đặt ngôn ngữ

:::
