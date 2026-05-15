# Heatmap

:::info{title=Khuyến nghị}
- Cấu hình trường đề xuất: `1` chỉ số, `2` chiều

- Hỗ trợ Data Reshape: ít nhất `1` chỉ số, `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ Heatmap hỗ trợ các kênh trực quan sau:

`xAxis`      : kênh trục x, hỗ trợ `nhiều chiều`, được ánh xạ tới trục x theo giá trị chiều

`yAxis`      : kênh trục y, hỗ trợ `nhiều chiều`, được ánh xạ tới trục y theo giá trị chiều

`detail`     : kênh chi tiết, hỗ trợ `nhiều chiều`, dùng để hiển thị dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`      : kênh màu, hỗ trợ `một chỉ số`, ánh xạ giá trị chỉ số thành cường độ màu

`tooltip`    : kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi di chuột qua điểm dữ liệu

`label`      : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ Heatmap hiển thị phân bố và quan hệ cường độ của dữ liệu thông qua độ đậm màu trong ma trận hai chiều.

Tình huống áp dụng:

- Hiển thị mật độ và cường độ của dữ liệu hai chiều quy mô lớn

- Phân tích tương quan giữa danh mục và giá trị số

- So sánh chéo giữa chuỗi thời gian và danh mục

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

- Ít nhất 2 trường chiều, dùng để xác định hàng và cột của biểu đồ Heatmap

- Ít nhất 1 trường số, dùng để ánh xạ độ đậm màu

- Khi hỗ trợ nhiều chỉ số, thông thường chọn một chỉ số để ánh xạ màu

Tính năng được bật mặc định:

- Chú giải, trục, nhãn dữ liệu, tooltip và tỷ lệ số được bật mặc định.

:::


## chartType

**Type:** `"heatmap"`

:::note{title=Mô tả}
Biểu đồ Heatmap hiển thị phân bố và quan hệ cường độ của dữ liệu thông qua độ đậm màu trong ma trận hai chiều.

:::

**Ví dụ**
'heatmap'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset. Tập dữ liệu đã tổng hợp và tuân thủ đặc tả TidyData, dùng để định nghĩa nguồn và cấu trúc dữ liệu của biểu đồ. Dữ liệu người dùng nhập không cần tiền xử lý; VSeed có khả năng Data Reshape mạnh mẽ để tự động xử lý định dạng. Dữ liệu biểu đồ Heatmap cuối cùng được chuyển thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Mô tả}
Chiều. Với biểu đồ Heatmap, chiều đầu tiên thường được ánh xạ tới trục X, trong khi các chiều khác được gộp với tên chỉ số (nếu có nhiều chỉ số) để làm mục chú giải.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới:

- xAxis: hỗ trợ ánh xạ nhiều chiều tới trục x

- yAxis: hỗ trợ ánh xạ nhiều chiều tới trục y

- tooltip: hỗ trợ ánh xạ nhiều chiều tới kênh tooltip

- label: hỗ trợ ánh xạ nhiều chiều tới kênh nhãn

- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số. Các chỉ số của biểu đồ Heatmap tự động gộp thành một chỉ số và được ánh xạ tới thang màu. Nếu có nhiều chỉ số, tên của chúng sẽ gộp với các chiều khác để làm mục chú giải.

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
Định dạng số tự động, bật mặc định, có độ ưu tiên cao nhất.

Khi autoFormat=true, toàn bộ cấu hình numFormat sẽ bị ghi đè.

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale.

Quy tắc định dạng: số thập phân bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt.

Ví dụ:

- locale=zh-CN: 749740.264 → 74.45~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip.

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này.

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
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



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
- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1000 , significantDigits:1
- 1234.5678 được chuyển thành 1200 , significantDigits:2
- 1234.5678 được chuyển thành 1230 , significantDigits:3
- 1234.5678 được chuyển thành 1234 , significantDigits:4
- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode.

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
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



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
- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1000 , significantDigits:1
- 1234.5678 được chuyển thành 1200 , significantDigits:2
- 1234.5678 được chuyển thành 1230 , significantDigits:3
- 1234.5678 được chuyển thành 1234 , significantDigits:4
- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode.

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới:

- color: chỉ số được ánh xạ tới kênh màu

- label: chỉ số được ánh xạ tới kênh nhãn

- tooltip: chỉ số được ánh xạ tới kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Trong cấu hình chỉ số phẳng, xây dựng cấu trúc chỉ số dạng cây. parentId trỏ tới ID của nhóm chỉ số cha và dùng để xây dựng phân cấp.

:::

:::tip{title=Mẹo}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cung cấp danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang.

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
'2023-01-01'




## backgroundColor

**Type:** `BackgroundMàu`

:::note{title=Mô tả}
Màu nền biểu đồ.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::


## color

**Type:** `Màu | undefined`

:::note{title=Mô tả}
Cấu hình màu dùng để định nghĩa bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và gradient màu.

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

**Type:** `Nhãn | undefined`

:::note{title=Mô tả}
Cấu hình nhãn biểu đồ Heatmap. Dùng để định nghĩa nhãn dữ liệu; tự động bật đảo màu nhãn để đảm bảo dễ đọc trên màu nền.

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

Lưu ý: nhãn encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến nhãn encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị phần trăm giá trị chỉ số hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: nhãn encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến nhãn encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Nhãn có hiển thị tên chiều hay không.

Displays all dimension labels.

Lưu ý: nhãn encoding có độ ưu tiên cao hơn; cấu hình này không ảnh hưởng đến nhãn encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Giá trị nhãn có được tự động định dạng hay không. Khi autoFormat là true, cấu hình numFormat bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Cấu hình định dạng giá trị nhãn; được gộp với `format` trong `measure`, trong đó `format` của `measure` có độ ưu tiên cao hơn. numFormat có độ ưu tiên thấp hơn autoFormat.

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
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=Mô tả}
Ký hiệu định dạng số, ví dụ %, ‰

:::

**Ví dụ**
- 100000 được chuyển thành 10W , ratio:10000, symbol:"W"
- 100000 được chuyển thành 10K , ratio:1000, symbol:"K"



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
- 1234.5678 được chuyển thành 1235 , fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.6 , fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1230.568 , fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.56780 , fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Chữ số có nghĩa cho định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trong trình duyệt; ưu tiên cao hơn fractionDigits.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1000 , significantDigits:1
- 1234.5678 được chuyển thành 1200 , significantDigits:2
- 1234.5678 được chuyển thành 1230 , significantDigits:3
- 1234.5678 được chuyển thành 1234 , significantDigits:4
- 1234.5678 được chuyển thành 1234.6 , significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.57 , significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.568 , significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Ưu tiên làm tròn khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingPriority.

:::

**Ví dụ**
- 1234.5678 được chuyển thành 1230 , significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 được chuyển thành 1234.5678 , significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo quy tắc giống roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước chữ nhãn.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ nhãn.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền nhãn.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét viền (outline) của nhãn.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ nhãn.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Lọc nhãn; quan hệ điều kiện mặc định giữa các selector là OR.

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
ID trường chiều.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử:

- in: Chọn các mục dữ liệu có giá trị trường chiều nằm trong danh sách 'value'.

- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong danh sách 'value'.

Giống operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị chiều cần chọn; hỗ trợ mảng.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo).

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Khả năng cốt lõi:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp.

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu.

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker).

Yêu cầu: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Cấu hình bộ lọc động của biểu đồ.

Lọc các mark của biểu đồ (cột, điểm, v.v.) bằng mã JavaScript do AI tạo.

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên).

:::

**Ví dụ**
"Tô sáng các cột doanh số lớn hơn 1000."

"Tô sáng cột có biên lợi nhuận cao nhất trong từng khu vực."



#### code

**Type:** `string`

:::note{title=Mô tả}
Mã JavaScript lọc do AI tạo.

- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R).

- Tham số đầu vào: data (mảng); mỗi item bao gồm trường __row_index biểu thị số hàng.

- Phải trả về mảng kết hợp chỉ mục hàng và trường: Array<{ __row_index: number, field: string }>.

- __row_index represents the row number of the original data item, and field represents the field to be highlighted.

- Bị cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng.

:::

**Ví dụ**
Tô sáng trường 'sales' cho các mục dữ liệu có sales > 1000:
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Tô sáng các mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực:
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

Tô sáng các mục dữ liệu thỏa nhiều điều kiện lọc:
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
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ.

:::


##### field

**Type:** `string`

:::note{title=Mô tả}
Trường dimension, là id của một mục trong dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các data item có giá trị trường dimension nằm trong value

\- not in: chọn các data item có giá trị trường dimension không nằm trong value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
Toán tử

\- in: chọn các data item có giá trị trường dimension nằm trong value

\- not in: chọn các data item có giá trị trường dimension không nằm trong value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Chọn data item theo giá trị của trường dimension; hỗ trợ array.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime). Được ghi trong giai đoạn prepare(); chỉ đọc khi runtime.

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
Chú giải. Cấu hình chú giải màu cho biểu đồ Heatmap, dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng và kiểu dáng.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mô tả}
Vị trí chú giải.

:::

**Ví dụ**
position: 'rightTop'



### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Whether legend functionality is enabled.

:::

**Ví dụ**
enable: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước chữ chú giải.

:::

**Ví dụ**
labelFontSize: 10



### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ chú giải.

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
Cấu hình tooltip, dùng để định nghĩa tooltip của biểu đồ, bao gồm vị trí, định dạng và kiểu dáng.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng tooltip hay không.

:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Cấu hình brush, dùng để bật/tắt khả năng chọn vùng.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chọn vùng hay không.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
Loại brush. Xác định hình dạng và hướng của hộp chọn:

- `rect`: Chọn hình chữ nhật, cho phép chọn theo cả hướng X và Y.

- `polygon`: Chọn đa giác, cho phép vẽ hình bất kỳ bằng cách nhấp nhiều điểm.

- `x`: Chọn ngang, giới hạn chọn theo hướng trục X.

- `y`: Chọn dọc, giới hạn chọn theo hướng trục Y.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
Chế độ chọn, đơn hoặc nhiều. Xác định logic chọn:

- `single`: Chế độ chọn đơn, mỗi lần chỉ có thể tồn tại một hộp chọn.

- `multiple`: Chế độ chọn nhiều, nhiều hộp chọn có thể tồn tại đồng thời.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xóa hộp chọn sau khi kết thúc chọn vùng hay không.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Kiểu dáng cho dữ liệu trong vùng đã chọn.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ của điểm dữ liệu đã chọn, phạm vi 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét viền.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mô tả}
Kiểu dáng cho dữ liệu ngoài vùng đã chọn.

:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ của điểm dữ liệu ngoài vùng chọn, phạm vi 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét viền.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng nét viền.

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme biểu đồ. Theme là cấu hình có ưu tiên thấp hơn, chứa thiết lập chung dùng cho mọi loại biểu đồ và thiết lập riêng dùng trong một nhóm biểu đồ.

Theme sáng và tối được tích hợp; người dùng có thể định nghĩa theme tùy chỉnh thông qua Builder.

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
Locale. Cấu hình ngôn ngữ biểu đồ; hỗ trợ 'zh-CN' và 'en-US'. Hoặc gọi intl.setLocale('zh-CN') để đặt ngôn ngữ.

:::
