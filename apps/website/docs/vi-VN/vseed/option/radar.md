# Radar

:::info{title=Khuyến nghị}
\- Cấu hình trường khuyến nghị: `1` chỉ số, `1` chiều

\- Hỗ trợ tái cấu trúc dữ liệu: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ radar hỗ trợ các kênh trực quan sau:

`angle`  : Kênh góc, hỗ trợ `nhiều chiều`, ánh xạ giá trị chiều vào trục góc

`radius` : Kênh bán kính, hỗ trợ `nhiều chỉ số`, ánh xạ giá trị chỉ số vào trục bán kính

`color`  : Kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu theo chiều dùng để phân biệt chuỗi dữ liệu, còn màu theo chỉ số ánh xạ tuyến tính giá trị chỉ số sang màu đồ họa

`tooltip`: Kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi di chuột lên điểm dữ liệu

`label`  : Kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị dưới dạng nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ radar phù hợp để phân tích so sánh dữ liệu đa chiều, hiển thị phân bố giá trị giữa các chiều thông qua hệ tọa độ đa trục

Tình huống sử dụng:

\- So sánh hiệu suất tổng hợp của dữ liệu đa chiều

\- Đánh giá hiệu suất của nhiều đối tượng trên nhiều chỉ số

\- Hiển thị đặc trưng đa chiều của dữ liệu phân loại

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

\- Ít nhất một trường số (chỉ số)

\- Chiều đầu tiên trở thành các trục của biểu đồ radar; các chiều khác được so sánh như các series khác nhau

\- Hỗ trợ hiển thị nhiều chỉ số dưới dạng các series riêng biệt

Tính năng bật mặc định:

\- Chú giải, hệ tọa độ radar, nhãn dữ liệu, tooltip và thu phóng giá trị được bật mặc định

:::


## chartType

**Type:** `"radar"`

:::note{title=Mô tả}
Biểu đồ radar



Biểu đồ radar, hiển thị quan hệ so sánh dữ liệu đa chiều thông qua hệ tọa độ đa trục

:::

**Ví dụ**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu



Tập dữ liệu đã tổng hợp, tuân theo chuẩn TidyData. Tập dữ liệu này định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Dữ liệu người dùng nhập vào không cần tiền xử lý vì VSeed tự động tái cấu trúc dữ liệu. Dữ liệu biểu đồ radar cuối cùng được chuyển thành hai chiều và một chỉ số.

:::

**Ví dụ**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Mô tả}
Chiều

Chiều đầu tiên của biểu đồ radar được ánh xạ tới trục góc; các chiều còn lại được gộp với tên chỉ số khi có nhiều chỉ số và hiển thị dưới dạng mục chú giải.

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
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- angle: hỗ trợ ánh xạ nhiều chiều vào kênh góc

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều tới kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều tới kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Các chỉ số của biểu đồ radar được tự động gộp thành một chỉ số và ánh xạ tới trục bán kính. Khi có nhiều chỉ số, tên chỉ số được gộp với các chiều còn lại và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Biệt danh của chỉ số, cho phép trùng lặp; nếu không đặt thì biệt danh mặc định là ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có mức ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè.

Sau khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale.

Quy tắc định dạng: số thập phân, bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt.

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip.

Lưu ý: Để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat là false; nếu không autoFormat sẽ ghi đè cấu hình này.

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
Chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi định dạng số, xử lý trường hợp đặt đồng thời significantDigits và fractionDigits. Dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc roundingPriority trong Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

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
Chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi định dạng số, xử lý trường hợp đặt đồng thời significantDigits và fractionDigits. Dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc roundingPriority trong Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- radius: radius được ánh xạ từ chỉ số

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ tới kênh nhãn

\- tooltip: chỉ số được ánh xạ tới kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Xây dựng nhóm chỉ số dạng cây trong cấu hình chỉ số phẳng. parentId trỏ tới ID của nhóm chỉ số cha, dùng để xây dựng cây chỉ số.

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 là cấu hình trực tiếp cây chỉ số bằng children; Cách 2 là cấu hình danh sách chỉ số phẳng bằng parentId. Hai cách này không thể dùng đồng thời.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Paging configuration, used to specify the paging field name; it must be a chiều

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều.

:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại.

:::

**Ví dụ**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền biểu đồ

Màu nền có thể là chuỗi màu như 'red' hoặc 'blue', hoặc giá trị hex, rgb hay rgba như '#ff0000' hoặc 'rgba(255,0,0,0.5)'.
:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Mau



Cấu hình màu, dùng để định nghĩa bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và chuyển sắc màu.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu rời rạc dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Ví dụ**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mô tả}
Bảng màu chuyển sắc tuyến tính dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Ví dụ**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mô tả}
Ánh xạ màu dùng để ánh xạ giá trị dữ liệu tới màu cụ thể.

:::

**Ví dụ**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị dương trong biểu đồ.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị âm trong biểu đồ.

:::


## label

**Type:** `Label | undefined`

:::note{title=Mô tả}
Nhan



Cấu hình nhãn, dùng để định nghĩa vị trí, định dạng, kiểu dáng và các thiết lập liên quan của nhãn dữ liệu.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng nhãn hay không.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có xuống dòng tiếp theo hay không.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị giá trị chỉ số hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị giá trị chỉ số dưới dạng phần trăm hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị nhãn chiều hay không.

Hiển thị tất cả nhãn chiều.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Giá trị nhãn có được tự động định dạng hay không; khi autoFormat là true, cấu hình numFormat sẽ bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị nhãn; được hợp nhất với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. Ưu tiên của numFormat thấp hơn autoFormat.

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
Chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
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
Độ ưu tiên làm tròn khi định dạng số, xử lý trường hợp đặt đồng thời significantDigits và fractionDigits. Dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc roundingPriority trong Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

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
Màu chữ của nhãn

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Màu chữ của nhãn có tự động đảo theo màu phần tử hay không.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật xử lý chồng lấn nhãn hay không.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Chọn nhãn; điều kiện giữa các selector mặc định là OR.

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, là id của một mục trong chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu; hỗ trợ mảng
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


## legend

**Type:** `Legend | undefined`

:::note{title=Mô tả}
Chu giai



Cấu hình chú giải, dùng để định nghĩa vị trí, định dạng, kiểu dáng và các thiết lập liên quan của chú giải.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật tính năng chú giải hay không.

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
Màu chữ chú giải.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng phân trang.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng phân trang khi bị tắt/làm mờ.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước chữ chú giải.

:::

**Ví dụ**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải.

:::

**Ví dụ**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}
Kiểu hình dạng của chú giải.

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
Số cột hoặc hàng tối đa khi có nhiều mục chú giải.

Nếu position nằm ngang (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize điều khiển số cột hiển thị.

Nếu position nằm dọc (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize điều khiển số hàng hiển thị.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Ví dụ**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Tooltip



Cấu hình tooltip, dùng để định nghĩa vị trí, định dạng, kiểu dáng và các thiết lập liên quan của tooltip.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng tooltip hay không
:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Chon bang brush



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Brush trục Y; chỉ chọn theo hướng trục Y, không giới hạn trên trục X.

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
Chế độ chọn vùng, chọn đơn hoặc chọn nhiều



Định nghĩa chế độ brush

\- `single`: Chế độ chọn đơn, mỗi lần chỉ có một khung brush

\- `multiple`: Chế độ chọn nhiều, có thể tồn tại nhiều khung brush cùng lúc
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
\-  100000 chuyển thành 10万, ratio:10000, symbol:"万"



Định nghĩa kiểu dáng của các điểm dữ liệu ngoài vùng chọn.

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
\-  100000 chuyển thành 10万, ratio:10000, symbol:"万"





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


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Mô tả}
Cau hinh hoat anh



Cấu hình animation của biểu đồ; các hiệu ứng khả dụng bị giới hạn theo loại biểu đồ

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật animation cho biểu đồ radar hay không

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Mô tả}
Tham số animation của biểu đồ radar

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Mô tả}
Cấu hình animation xuất hiện của biểu đồ radar

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Mô tả}
Hiệu ứng xuất hiện của biểu đồ radar, hỗ trợ animation hướng tâm và thu phóng

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn animation hiện tại hay không

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng animation, đơn vị mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu không khí của animation

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Mô tả}
Cấu hình animation cập nhật của biểu đồ radar

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mô tả}
Hiệu ứng cập nhật của biểu đồ radar, hỗ trợ animation tăng trưởng

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn animation hiện tại hay không

:::

##### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của animation

:::

##### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng animation, đơn vị mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu không khí của animation

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Mô tả}
Cấu hình animation lặp của biểu đồ radar

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật animation lặp hay không

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng cách animation lặp, đơn vị mili giây

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mô tả}
Biểu đồ radar atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của animation bầu không khí

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu animation bầu không khí

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mô tả}
Hiệu ứng animation bầu không khí, hỗ trợ hiệu ứng gợn sóng, hiển thị/ẩn và thở

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
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Mô tả}
Cấu hình style point mark, dùng để xác định màu, viền và các thiết lập liên quan của point mark.

Hỗ trợ cấu hình style toàn cục hoặc style có điều kiện

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Trường chiều, là id của một mục trong chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu; hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

Phù hợp với các tình huống khó biểu đạt bằng selector tĩnh, như Top N, phân tích thống kê và điều kiện phức tạp

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

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Diem co hien thi hay khong

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kich thuoc diem



Kich thuoc diem

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Mau dau diem



Mau dau diem

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot mau dau diem



Do trong suot mau dau diem

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Mau vien dau diem



Mau vien dau diem

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Do rong vien dau diem



Do rong vien dau diem

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kieu vien dau diem



Kieu vien dau diem

:::

**Ví dụ**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Mô tả}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Hỗ trợ cấu hình style toàn cục hoặc style có điều kiện

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Trường chiều, là id của một mục trong chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu; hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

Phù hợp với các tình huống khó biểu đạt bằng selector tĩnh, như Top N, phân tích thống kê và điều kiện phức tạp

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

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Doan duong co hien thi hay khong

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Doan duong co duoc lam muot hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Mau doan duong

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot mau doan duong

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Do rong doan duong

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kieu doan duong

:::

**Ví dụ**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Mô tả}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Hỗ trợ cấu hình style toàn cục hoặc style có điều kiện

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]


selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]


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
Trường chiều, là id của một mục trong chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.




giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn giá trị của trường chiều trong mục dữ liệu; hỗ trợ mảng
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo

Phù hợp với các tình huống khó biểu đạt bằng selector tĩnh, như Top N, phân tích thống kê và điều kiện phức tạp

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

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Phần tử vùng có hiển thị hay không



Phần tử vùng có hiển thị hay không

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Ngon ngu



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::
