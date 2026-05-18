# Rose

:::info{title=Khuyến nghị}
\- Cấu hình trường được khuyến nghị: `1` chỉ số, `1` chiều

\- Hỗ trợ tái cấu trúc dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ encoding}
Biểu đồ hoa hồng xếp chồng hỗ trợ các kênh trực quan sau:

`angle`  : kênh góc, hỗ trợ `nhiều chiều`, ánh xạ giá trị chiều vào trục góc

`radius` : kênh bán kính, hỗ trợ `nhiều chỉ số`, ánh xạ giá trị chỉ số vào trục bán kính

`detail` : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng để hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu chiều dùng để phân biệt các chuỗi dữ liệu, màu chỉ số dùng để ánh xạ tuyến tính giá trị chỉ số sang màu đồ họa

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi rê chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ hoa hồng xếp chồng phù hợp với các tình huống so sánh dữ liệu đa chiều, thể hiện độ lớn dữ liệu bằng độ dài cung và bán kính của các cung trong hệ tọa độ cực

Tình huống phù hợp:

\- So sánh phân bố của dữ liệu đa chiều

\- So sánh mức độ mạnh yếu của dữ liệu chu kỳ

\- Hiển thị đồng thời giá trị số và tỷ trọng của dữ liệu phân loại

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất 1 trường số (chỉ số)

\- Chiều đầu tiên được đặt trên trục góc; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị như mục chú giải

\- Tất cả chỉ số sẽ tự động được hợp nhất thành một chỉ số

Các tính năng bật mặc định:

\- Chú giải, hệ tọa độ cực, nhãn dữ liệu, tooltip và co giãn giá trị được bật mặc định

:::


## chartType

**Type:** `"rose"`

:::note{title=Mô tả}
Biểu đồ hoa hồng xếp chồng



Biểu đồ hoa hồng xếp chồng, hiển thị quan hệ so sánh dữ liệu đa chiều thông qua hệ tọa độ cực

:::

**Ví dụ**
'rose'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu



Tập dữ liệu đã tổng hợp theo đặc tả TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Tập dữ liệu người dùng nhập không cần xử lý thủ công; VSeed có khả năng tái cấu trúc dữ liệu mạnh mẽ và sẽ tự động tái cấu trúc dữ liệu. Dữ liệu biểu đồ hoa hồng cuối cùng được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Mô tả}
Chiều



Chiều đầu tiên của biểu đồ hoa hồng được ánh xạ vào trục góc; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị như mục chú giải.

:::

**Ví dụ**
[{id: 'category', alias: 'Category'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- angle: hỗ trợ ánh xạ nhiều chiều vào kênh góc

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh detail

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh label

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Các chỉ số trong biểu đồ hoa hồng tự động được gộp thành một chỉ số và ánh xạ vào trục bán kính. Khi có nhiều chỉ số, tên chỉ số được gộp với các chiều khác và hiển thị như mục chú giải.

:::

**Ví dụ**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng; nếu không đặt thì alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động định dạng số, bật mặc định và có độ ưu tiên cao nhất

Khi autoFormat=true, cấu hình này ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho label và tooltip

Lưu ý: Để dùng định dạng tùy chỉnh, phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

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
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
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
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký pháp khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

:::

**Ví dụ**
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- radius: chỉ số được ánh xạ vào kênh bán kính

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

**Type:** `PieLabel | undefined`

:::note{title=Mô tả}
Nhãn



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
Nhãn có hiển thị giá trị chỉ số hay không

Trong tình huống nhiều chỉ số, không cần lo xung đột giá trị, vì mọi chỉ số liên quan tới phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng tới label trong encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị phần trăm của giá trị chỉ số hay không

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
Loại định dạng số. Hỗ trợ số (thập phân), phần trăm (%), phần nghìn (‰) và ký pháp khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được bằng 0

:::

**Ví dụ**
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
\- 100000 được chuyển thành 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 chuyển thành 10万, ratio:10000, symbol:"万"
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
Trường chiều, là id của một mục trong dimensions
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều

Toán tử


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value


Toán tử

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

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng hàm tiện ích tích hợp để thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có độ ưu tiên cao hơn

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
"Làm nổi bật các cột có sales lớn hơn 1000"

"Làm nổi bật cột có tỷ suất profit cao nhất trong từng khu vực"


#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo

- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng tổ hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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

Làm nổi bật mục dữ liệu có tỷ suất profit cao nhất trong từng khu vực
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

Làm nổi bật các mục dữ liệu thỏa mãn nhiều điều kiện
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
Fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ

:::

##### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều dữ liệu, id của một mục trong dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: chọn các mục dữ liệu có giá trị trường chiều dữ liệu nằm trong value

- not in: chọn các mục dữ liệu có giá trị trường chiều dữ liệu không nằm trong value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

- in: chọn các mục dữ liệu có giá trị trường chiều dữ liệu nằm trong value

- not in: chọn các mục dữ liệu có giá trị trường chiều dữ liệu không nằm trong value

giống operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều dữ liệu trong mục dữ liệu; hỗ trợ mảng

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


### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Mô tả}
\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng







:::


## legend

**Type:** `Legend | undefined`

:::note{title=Mô tả}
Chú giải

Cấu hình chú giải dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng và kiểu hiển thị.
:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chú giải hay không
:::

**Ví dụ**
Làm nổi bật trường sales cho các mục dữ liệu có sales lớn hơn 1000



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật viền chú giải hay không
:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
Làm nổi bật mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Làm nổi bật mục dữ liệu bằng lọc nhiều điều kiện

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ chú giải
:::

**Ví dụ**
Toán tử



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải
:::

**Ví dụ**
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}
Hình dạng chú giải
:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
Toán tử



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải
:::

**Ví dụ**
\- in: Chọn mục dữ liệu có giá trị trường chiều nằm trong value



### maxSize

**Type:** `number | undefined`

:::note{title=Mô tả}
\- not in: Chọn mục dữ liệu có giá trị trường chiều không nằm trong value





:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Tooltip

Cấu hình tooltip dùng để định nghĩa tooltip của biểu đồ, bao gồm vị trí, định dạng và kiểu hiển thị.
:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật tooltip hay không
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime



\- `y`: chọn theo trục Y, chỉ giới hạn vùng chọn theo hướng trục Y trong khi trục X không bị ràng buộc

\- `rect`: chọn vùng hình chữ nhật, có thể chọn theo cả hướng trục X và trục Y

\- `polygon`: chọn brush đa giác, vẽ đa giác bất kỳ bằng cách nhấp nhiều điểm


\- `y`: chọn brush theo trục Y, chỉ bị ràng buộc theo hướng trục Y

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Chế độ chọn brush, chọn đơn hoặc chọn nhiều



Định nghĩa chế độ chọn bằng brush


Có bật chức năng chú giải hay không

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xoá vùng brush sau khi kết thúc chọn hay không

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



Độ mờ của các điểm dữ liệu được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Kiểu dữ liệu nằm ngoài vùng brush

Định nghĩa kiểu của các điểm dữ liệu không được chọn
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
legend font color



Độ mờ của các điểm dữ liệu không được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền
:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title=Mô tả}
Cỡ chữ chú giải



Cấu hình hoạt ảnh của biểu đồ; các hiệu ứng khả dụng phụ thuộc vào loại biểu đồ

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
legend font color

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh xuất hiện cho biểu đồ pie/donut/rose

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Mô tả}
Hiệu ứng xuất hiện cho biểu đồ pie/donut/rose, hỗ trợ hoạt ảnh hướng tâm và phóng tỷ lệ

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
Thời lượng hoạt ảnh, đơn vị mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu không khí của hoạt ảnh

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh cập nhật cho biểu đồ pie/donut/rose

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title=Mô tả}
Hiệu ứng cập nhật cho biểu đồ pie/donut/rose, hỗ trợ hoạt ảnh hướng tâm

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
Thời lượng hoạt ảnh, đơn vị mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Thông tin tooltip

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title=Mô tả}
Cấu hình tooltip của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chức năng tooltip hay không

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
Định nghĩa hình dạng và hướng của vùng chọn brush

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title=Mô tả}
\- `polygon`: chọn đa giác, cho phép vẽ đa giác bất kỳ bằng cách nhấp nhiều điểm

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title=Mô tả}
Chế độ chọn brush: đơn hoặc nhiều

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định nghĩa kiểu dáng của các điểm dữ liệu được chọn.

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
brushtype

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title=Mô tả}
\- `polygon`: chọn brush đa giác; nhấp nhiều điểm để vẽ đa giác bất kỳ làm vùng chọn

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
\- `x`: chỉ chọn brush theo hướng trục X; hướng trục Y không bị giới hạn

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
\- `y`: chọn brush theo hướng trục Y; không giới hạn theo hướng trục X

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Chủ đề của biểu đồ. Chủ đề là cấu hình chức năng có mức ưu tiên thấp hơn, bao gồm cấu hình chung dùng cho mọi loại biểu đồ và cấu hình riêng cho từng loại biểu đồ.



Có sẵn hai chủ đề light và dark; người dùng có thể tùy chỉnh chủ đề thông qua Builder.



Chủ đề



Có sẵn hai chủ đề light và dark; chủ đề mới có thể được tùy chỉnh bằng registerTheme.
:::

**Ví dụ**
Có xóa vùng brush sau khi kết thúc brush hay không

Độ mờ của điểm dữ liệu chưa được chọn, phạm vi 0-1

Định nghĩa kiểu dáng điểm dữ liệu được brush




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Kiểu cho mục dữ liệu chưa được chọn



Định nghĩa kiểu dáng điểm dữ liệu ngoài vùng chọn brush

:::
