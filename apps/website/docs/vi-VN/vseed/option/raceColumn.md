# RaceColumn

:::note{title=Mô tả}
Biểu đồ cột động (Race Column Chart)

Phù hợp để hiển thị thứ hạng dữ liệu thay đổi theo thời gian, các cột được sắp theo chiều dọc

Tình huống áp dụng:

\- Khi tên mục dữ liệu dài

\- Khi cần so sánh trực quan độ lớn giá trị của các danh mục khác nhau và hiển thị thứ hạng thay đổi theo thời gian

\- Hiển thị xu hướng thay đổi dữ liệu chuỗi thời gian và cập nhật động thứ tự cột

:::

:::note{title=Note}
Biểu đồ cột động:

\- Trục X là trục danh mục (dữ liệu phân loại), hiển thị giá trị chiều

\- Trục Y là trục số (dữ liệu liên tục), hiển thị giá trị chỉ số

\- Hỗ trợ điều khiển chiều thời gian thông qua trình phát để hiển thị động thay đổi dữ liệu

\- Các cột được sắp xếp động theo độ lớn giá trị trong quá trình hoạt ảnh

:::


## chartType

**Type:** `"raceColumn"`

:::note{title=Mô tả}
Biểu đồ cột động, phù hợp để hiển thị thứ hạng dữ liệu thay đổi theo thời gian

:::


## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu đã được tổng hợp và tuân theo chuẩn TidyData

:::

**Ví dụ**
[{category:'A', value:100, date: '2020'}, {category:'B', value:200, date: '2020'}]




## dimensions

**Type:** `RaceColumnDimension[] | undefined`

:::note{title=Mô tả}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.



Chiều đầu tiên ánh xạ vào player, chiều thứ hai ánh xạ vào trục X

:::


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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- xAxis: hỗ trợ ánh xạ nhiều chiều tới trục x

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều tới kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều tới kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

\- player: hỗ trợ ánh xạ nhiều chiều vào kênh trình phát

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số



Tất cả chỉ số của biểu đồ cột động tự động được hợp nhất thành một chỉ số và ánh xạ lên trục Y. Khi có nhiều chỉ số, tên chỉ số được kết hợp với các chiều còn lại và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
[{id: "value", alias: "Giá trị"}]




### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Biệt danh của measure, cho phép trùng lặp; nếu không đặt thì biệt danh mặc định là ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có mức ưu tiên cao nhất

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè.

Sau khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale.

Quy tắc định dạng: số thập phân, bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt.

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip.

Lưu ý: Để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat là false; nếu không autoFormat sẽ ghi đè cấu hình này.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingPriority của Intl.NumberFormat.

:::

**Ví dụ**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingMode của Intl.NumberFormat.

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Kiểu định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



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
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingPriority của Intl.NumberFormat.

:::

**Ví dụ**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingMode của Intl.NumberFormat.

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- yAxis: chỉ số được ánh xạ tới trục y

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Xây dựng nhóm measure dạng cây trong cấu hình measure phẳng. parentId trỏ tới ID của nhóm measure cha, dùng để xây dựng cây measure.

:::

:::tip{title=Tip}
Có hai cách cấu hình cây measure: Cách 1 là cấu hình trực tiếp cây measure bằng children; Cách 2 là cấu hình danh sách measure phẳng bằng parentId. Hai cách này không thể dùng đồng thời.

:::


## player

**Type:** `Player | undefined`

:::note{title=Mô tả}
Cấu hình trình phát, dùng để chỉ định chiều thời gian, là cấu hình cốt lõi của biểu đồ cột động

Điều khiển tiến trình phát của chiều thời gian thông qua trình phát để cập nhật dữ liệu và thay đổi thứ tự sắp xếp động



Cấu hình trình phát, dùng để chỉ định tên trường phát, bắt buộc là chiều

:::

:::warning{title=Warning}
Tính năng này không hỗ trợ các loại biểu đồ như table, pivotTable, dualAxis, histogram, boxPlot, và không hỗ trợ sử dụng khi bật tổ hợp chỉ số hoặc pivot hàng/cột

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Mô tả}
Số lượng phát tối đa; dữ liệu vượt quá số này sẽ bị cắt, đặt false nghĩa là không giới hạn

:::

### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng thời gian phát, đơn vị ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động phát hay không

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có phát lặp hay không

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Mô tả}
Vị trí trình phát

:::

### railColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu track thanh tiến trình của trình phát

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Mô tả}
Phông chữ văn bản trình phát

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ văn bản trình phát

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tiến trình của thanh tiến trình trình phát

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu thanh trượt của thanh tiến trình trình phát

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền thanh trượt của thanh tiến trình trình phát

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nút bắt đầu của trình phát

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nút tạm dừng của trình phát

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nút lùi của trình phát

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nút tiến của trình phát

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp, biểu đồ cột động thường cần sắp xếp động theo giá trị

Điều khiển cách sắp xếp cột trên trục X





:::

**Ví dụ**
Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn.

Cấu hình Bộ lọc động của biểu đồ.





### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
**Type:** `"in" | "not in" | undefined`

:::

**Ví dụ**
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).



### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**





### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, còn `field` biểu thị trường cần làm nổi bật.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang, dùng để xử lý trường hợp lượng dữ liệu lớn

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
Cấu hình màu nền

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Cấu hình màu, dùng để phân biệt các chiều hoặc chỉ số khác nhau

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
Cấu hình nhãn, dùng để hiển thị nhãn dữ liệu trên cột

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
Nhãn có hiển thị giá trị measure dưới dạng phần trăm hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị nhãn dimension hay không.

Hiển thị tất cả nhãn dimension.

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
Kiểu định dạng số, hỗ trợ: decimal, percent (%), permille (‰), ký hiệu khoa học.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mô tả}
Tỷ lệ định dạng số, không được là 0.

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Dấu phân tách hàng nghìn cho định dạng số.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mô tả}
Hậu tố định dạng số.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mô tả}
Tiền tố định dạng số.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số thập phân cho định dạng số, dùng minimumFractionDigits và maximumFractionDigits của Intl.NumberFormat trong trình duyệt; ưu tiên thấp hơn significantDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingPriority của Intl.NumberFormat.

:::

**Ví dụ**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và theo cùng quy tắc với roundingMode của Intl.NumberFormat.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Nhãn font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Nhãn font weight

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
Trường dimension; ID của một mục trong dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

Giống operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.



Khả năng cốt lõi:

\- Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý.

\- Sử dụng các hàm tiện ích tích hợp để thao tác dữ liệu.

\- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker).



Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback.



Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn.



Cấu hình Bộ lọc động của biểu đồ.



Lọc các marker của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
"To sang cac cot co doanh so lon hon 1000"

"To sang cot co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo.



\- Chỉ dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R).

\- Tham số đầu vào: data (mảng), mỗi mục chứa trường `__row_index` biểu thị số dòng.

\- Phải trả về một mảng kết hợp chỉ mục dòng và trường: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, còn `field` biểu thị trường cần làm nổi bật.

\- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng.

:::

**Ví dụ**
Highlight the `sales` field of data items where sales are greater than 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:
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

Highlight data items based on multiple filtering conditions:
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
Chiến lược fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường dimension; ID của một mục trong dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

Giống operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime).



Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime.

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
Cấu hình chú giải

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
Độ đậm chữ chú giải



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




### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mô tả}
Kiểu hình dạng của chú giải.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Ví dụ**
Brush



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải

:::

**Ví dụ**




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
Chế độ brush; định nghĩa có thể chọn một hay nhiều vùng.




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mô tả}
Cấu hình tooltip, dùng để hiển thị thông tin chi tiết khi di chuột

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Cấu hình brush, dùng để hỗ trợ tương tác chọn vùng



\- `y`: Brush trục Y; chỉ chọn theo hướng trục Y, không giới hạn trên trục X.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



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
Kiểu dáng cho dữ liệu KHÔNG được brush chọn.



Định nghĩa kiểu dáng của các điểm dữ liệu ngoài vùng chọn.

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
**Type:** `boolean | undefined`

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Mô tả}
Cấu hình trục X, là trục danh mục, hiển thị giá trị chiều, các cột được sắp theo chiều dọc

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Đường trục color

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Trục có hiển thị hay không.

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

**Type:** `string | undefined`

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
**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `boolean | undefined`

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
\- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)

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


:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


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
**Type:** `boolean | undefined`

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

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
Cấu hình trục Y, là trục số, hiển thị giá trị chỉ số

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

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
**Type:** `string | undefined`

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
**Type:** `{ duration?: number; easing?: string; } | undefined`

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


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `"asc" | "desc" | undefined`

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
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
sortLegend: {

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
**Type:** `string | undefined`

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


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mô tả}


:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Mô tả}
Cấu hình crosshair, dùng để hiển thị giá trị dữ liệu chính xác



selector = {

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

### rectColor

**Type:** `string | undefined`

:::note{title=Mô tả}
operator: 'between'

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string`

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
**Type:** `"in" | "not in" | undefined`

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
solid

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Cấu hình bo góc xếp chồng

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Cấu hình chiều rộng tối đa của hình chữ nhật

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Mô tả}
Cấu hình sắp xếp chú giải



Cấu hình bộ lọc động của biểu đồ: lọc các mark của biểu đồ (thanh, điểm, v.v.) bằng mã JavaScript do AI tạo.

:::

**Ví dụ**
);


Highlight data items based on multiple filtering conditions:




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mô tả}
])

:::

**Ví dụ**




### orderBy

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**

  __row_index: item.__row_index,



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mô tả}
  _.maxBy(group, item => item.profit / item.sales)

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Cấu hình chủ đề



Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Mô tả}
Cấu hình kiểu cột, có thể là một kiểu đơn hoặc dạng mảng

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.



**Type:** `string | undefined`



:::

**Ví dụ**
Màu nét primitive cột (hình chữ nhật)

**Type:** `number | undefined`

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`


Kết quả thực thi bộ lọc động (trường runtime)



**Type:** `string | undefined`
field: 'category',
operator: 'in',
value: 'tool'
}
**Type:** `string | undefined`
field: 'category',
operator: 'not in',
value: 'book'
}


**Type:** `string | undefined`
field: 'profit',
operator: '>=',
value: 100
}
**Type:** `string | undefined`
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


**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

**Type:** `Selector | Selectors | undefined`



:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Selector cho điểm chú thích, dùng để chọn điểm dữ liệu.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
- center: Văn bản căn giữa trên điểm.









Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường dimension nằm trong danh sách giá trị.

\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.





**Type:** `"in" | "not in" | undefined`













:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"To sang cac cot co doanh so lon hon 1000"

"To sang cot co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mô tả}












**Type:** `"row-with-field"`

:::

**Ví dụ**

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

"Highlight the bar with the highest profit margin in each region"
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
const grouped = _.groupBy(data, 'area');

:::


##### field

**Type:** `string`

:::note{title=Mô tả}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
_.map(filtered, item => [

{ __row_index: item.__row_index, field: 'sales' }

);

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Giá trị X cố định cho đường chú thích dọc. Nếu trục danh mục nằm theo hướng X, có thể nhập giá trị chiều; nếu trục số nằm theo hướng X, có thể dùng một giá trị số cụ thể.





**Type:** `ValueDynamicFilter | undefined`

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chỉ hỗ trợ trong môi trường trình duyệt (yêu cầu Web Worker).

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



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
Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
const avgSales = _.meanBy(data, 'sales');

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
'Văn bản chú thích'

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Màu văn bản.

:::

**Ví dụ**
'red'







### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
**Ví dụ**





:::

**Ví dụ**
Văn bản chú thích.

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}
Cấu hình điểm đánh dấu, dùng để thêm dấu tại các điểm dữ liệu cụ thể

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}


:::


#### field

**Type:** `string`

:::note{title=Mô tả}
**Type:** `number | undefined`

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
bottom: Văn bản nằm phía trên điểm chú thích, mép dưới căn với điểm.

Khuyến nghị đặt 'top' để văn bản hiển thị đầy đủ trong vùng hiển thị của biểu đồ.

**Ví dụ**

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}






true

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Màu nền.

:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
**Ví dụ**









Độ rộng viền nền.

Khả năng hiển thị đường.

**Ví dụ**









Bán kính bo góc viền nền.



**Ví dụ**





:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"To sang cac cot co doanh so lon hon 1000"

"To sang cot co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mô tả}








Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).

Giá trị dương dịch chuyển toàn bộ thành phần sang phải (ví dụ 10).

:::

**Ví dụ**
offsetX: 5 (toàn bộ thành phần dịch sang phải 5 pixel)
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
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường chú thích"

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}


Mã JavaScript lọc do AI tạo.

\- Chỉ dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R).

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




Lấy giá trị doanh số lớn nhất làm giá trị đường chú thích:

const maxSales = _.maxBy(data, 'sales')?.sales;

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).



);

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
Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime.

:::

**Ví dụ**
'Van ban chu thich'



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




Cỡ chữ văn bản.

**Type:** `string | string[] | undefined`

**Ví dụ**

:::

**Ví dụ**
'right' van ban nam ben trai diem chu thich



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
**Ví dụ**









:::

**Ví dụ**
'top' van ban nam o phia duoi diem chu thich



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




Nền có hiển thị hay không.

:::

**Ví dụ**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}
Màu nền.

**Type:** `number | undefined`

**Ví dụ**

:::

**Ví dụ**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}
Đường đánh dấu số, đường đánh dấu dọc để đánh dấu giá trị trục X cụ thể

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}




Bán kính bo góc viền nền.

Khả năng hiển thị đường.





:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Lay gia tri doanh so cao nhat lam tham chieu cho duong chu thich"

"Tinh doanh so trung binh cho duong chu thich"



#### code

**Type:** `string`

:::note{title=Mô tả}
**Type:** `string | number | (string | number)[] | undefined`











Bộ lọc động (thực thi mã do AI tạo)

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

**Type:** `string | undefined`
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


:::

**Ví dụ**
'Van ban chu thich'



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
'Văn bản chú thích'

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




Màu văn bản.

**Type:** `number | undefined`

**Ví dụ**

:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
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
**Ví dụ**

:::

**Ví dụ**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
top: Văn bản nằm dưới đường tham chiếu, mép trên căn với đường chú thích (ngang).

:::

**Ví dụ**




### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




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


:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**





## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mô tả}
Đường đánh dấu giá trị chiều, đường đánh dấu ngang để đánh dấu danh mục trục Y cụ thể

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mô tả}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mô tả}
**Ví dụ**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
"Lay gia tri doanh so cao nhat lam tham chieu cho duong chu thich"

"Tinh doanh so trung binh cho duong chu thich"



#### code

**Type:** `string`

:::note{title=Mô tả}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

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
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



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
'Van ban chu thich'



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


:::

**Ví dụ**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `number | undefined`



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `"left" | "right" | "center" | undefined`



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mô tả}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.



**Ví dụ**



:::

**Ví dụ**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.

bottom: Văn bản nằm ở đỉnh vùng chú thích, mép dưới căn với vùng.

màu nét nền

**Ví dụ**



:::

**Ví dụ**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
**Type:** `string | undefined`



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


:::

**Ví dụ**




### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**




### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}






:::

**Ví dụ**
0.5



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


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
Cấu hình vùng đánh dấu, dùng để làm nổi bật phạm vi dữ liệu cụ thể

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các measure được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mô tả}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}




Có hiển thị tooltip cho tất cả biểu đồ con tương ứng với dimension hay không.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`





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
'Van ban chu thich'



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
'center' van ban nam o giua vung chu thich



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mô tả}








Bậc của hồi quy đa thức

:::

**Ví dụ**
'top' van ban nam o phia duoi vung chu thich



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}


:::

**Ví dụ**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
**Type:** `string | undefined`

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
**Type:** `boolean | undefined`



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
Cấu hình liên kết chiều, hỗ trợ tương tác liên kết chiều giữa nhiều biểu đồ



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

**Type:** `Locale | undefined`

:::note{title=Mô tả}
Cấu hình ngôn ngữ

:::

