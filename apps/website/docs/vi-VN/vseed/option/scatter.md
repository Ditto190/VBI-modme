# Scatter

:::info{title=Khuyến nghị}
- Cấu hình trường đề xuất: `2` chỉ số và `1` chiều

- Hỗ trợ tái cấu trúc dữ liệu: ít nhất `1` chỉ số và `0` chiều

:::

:::info{title=Ánh xạ mã hóa}
Biểu đồ phân tán hỗ trợ các kênh trực quan sau:

`xAxis`  : kênh trục X, hỗ trợ `nhiều chỉ số`, ánh xạ tới trục X theo giá trị chỉ số

`yAxis`  : kênh trục Y, hỗ trợ `nhiều chỉ số`, ánh xạ tới trục Y theo giá trị chỉ số

`color`  : kênh màu, hỗ trợ `nhiều chiều` hoặc `một chỉ số`; màu theo chiều dùng để phân biệt các chuỗi dữ liệu, màu theo chỉ số dùng để ánh xạ tuyến tính giá trị chỉ số sang màu đồ họa

`tooltip`: kênh tooltip, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị khi di chuột lên điểm dữ liệu

`label`  : kênh nhãn, hỗ trợ `nhiều chiều` và `nhiều chỉ số`, hiển thị nhãn dữ liệu trên điểm dữ liệu

:::

:::note{title=Mô tả}
Biểu đồ phân tán phù hợp để hiển thị phân bố dữ liệu, vị trí điểm biểu thị giá trị dữ liệu

Tình huống sử dụng:

- Phân tích đặc trưng phân bố như xu hướng trung tâm, phạm vi phân bố và ngoại lệ

:::

:::warning{title=Warning}
Yêu cầu dữ liệu:

- Ít nhất hai trường số (chỉ số)

- Trường chỉ số đầu tiên được đặt trên trục X, các chỉ số còn lại được gộp và ánh xạ tới trục Y

- Tên chỉ số và tên chiều được gộp và hiển thị làm mục chú giải

Tính năng được bật mặc định:

- Chú giải, trục, marker điểm dữ liệu, tooltip và đường xu hướng được bật mặc định

:::


## chartType

**Type:** `"scatter"`

:::note{title=Mô tả}
Biểu đồ phân tán



Biểu đồ phân tán phù hợp để hiển thị phân bố dữ liệu, vị trí điểm biểu thị giá trị dữ liệu

:::

**Ví dụ**
'scatter'




## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Dataset

Dataset tuân thủ TidyData và đã được tổng hợp, dùng để định nghĩa nguồn dữ liệu và cấu trúc của biểu đồ. Dữ liệu người dùng nhập không cần xử lý thủ công; VSeed sẽ tự động reshape dữ liệu. Dữ liệu biểu đồ scatter cuối cùng được chuyển thành 2 chiều dữ liệu và 1 chỉ số.

:::

**Ví dụ**
[{month:'Tháng 1', value:100}, {month:'Tháng 2', value:150}, {month:'Tháng 3', value:120}]


## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=Mô tả}
Chiều



Chiều đầu tiên trong biểu đồ phân tán được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số khi có nhiều chỉ số và hiển thị làm mục chú giải

:::

**Ví dụ**
[{id: "month", alias: "Tháng"}]




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

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số của biểu đồ scatter

:::

**Ví dụ**
[
  {
    id: 'profit', alias: 'Lợi nhuận', encoding: 'xAxis'
  },
  {
    id: 'sales', alias: 'Doanh số', encoding: 'yAxis'
  }
]


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

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có ưu tiên cao nhất

Khi autoFormat=true, nó ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip

Lưu ý: để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

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
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

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
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

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
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

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
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- xAxis: chỉ số được ánh xạ tới trục X

\- yAxis: chỉ số được ánh xạ tới trục Y

\- size: kích thước được ánh xạ từ chỉ số

\- color: màu được ánh xạ từ chỉ số

\- label: nhãn được ánh xạ từ chỉ số

\- tooltip: tooltip được ánh xạ từ chỉ số

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mô tả}
Trong cấu hình measure phẳng, xây dựng nhóm measure dạng cây. parentId trỏ đến id của nhóm measure cha và được dùng để xây dựng cây measure

:::

:::tip{title=Tip}
Có hai cách cấu hình cây measure: cách 1 là cấu hình trực tiếp cây measure với children; cách 2 là cấu hình danh sách measure phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Phân trang



Cấu hình phân trang cho biểu đồ

:::


### field

**Type:** `string`

:::note{title=Mô tả}
Trường phân trang; chỉ định tên field dùng để phân trang và phải là một chiều

:::

### currentValue

**Type:** `string`

:::note{title=Mô tả}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại

:::

**Ví dụ**
'2023\-01\-01'




## size

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Kích thước chỉ số của biểu đồ phân tán, dùng để xác định kích thước hoặc khoảng kích thước của điểm dữ liệu

\- Nếu khoảng kích thước là một số như 10, kích thước điểm dữ liệu cố định là 10

\- Nếu khoảng kích thước là mảng hai phần tử như [10, 40], kích thước điểm dữ liệu nằm trong khoảng 10 đến 40

\- Loại trừ lẫn nhau với sizeRange; ưu tiên thấp hơn size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Mô tả}
Khoảng kích thước chỉ số của biểu đồ phân tán, dùng để xác định khoảng kích thước của điểm dữ liệu,

\- Nếu khoảng kích thước là mảng hai phần tử như [10, 40], kích thước điểm dữ liệu nằm trong khoảng 10 đến 40

\- Nếu khoảng kích thước là một số như 10, kích thước điểm dữ liệu cố định là 10

\- Loại trừ lẫn nhau với sizeRange; ưu tiên cao hơn size

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền biểu đồ



Màu nền có thể là chuỗi màu (ví dụ: 'red', 'blue'), hoặc giá trị hex, rgb, rgba (ví dụ: '#ff0000', 'rgba(255,0,0,0.5)')

:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Màu



Cấu hình màu dùng để xác định bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu và chuyển sắc màu.

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
Bảng màu chuyển sắc tuyến tính dùng để xác định màu của các phần tử khác nhau trong biểu đồ

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
Nhãn



Cấu hình label dùng để xác định label dữ liệu của biểu đồ, bao gồm vị trí, định dạng và kiểu.

:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng label hay không

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có xuống dòng tiếp theo hay không

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị giá trị measure hay không

Trong kịch bản nhiều measure, không cần lo xung đột giá trị, vì tất cả measure liên quan đến phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một measure đại diện cho một điểm dữ liệu

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị tỷ lệ phần trăm của giá trị measure hay không

Trong kịch bản nhiều measure, không cần lo xung đột giá trị, vì tất cả measure liên quan đến phần vẽ đều đi qua xử lý `foldMeasures` và được gộp thành một measure đại diện cho một điểm dữ liệu

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Label có hiển thị label chiều hay không

Hiển thị tất cả nhãn chiều

Lưu ý: label của encoding có mức ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label của encoding

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có ưu tiên cao nhất

Khi autoFormat=true, nó ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip

Lưu ý: để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

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
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

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
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ label

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mô tả}
Độ đậm chữ label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền label

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền label

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ label

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có tự động đảo màu chữ label theo màu của phần tử đồ họa hay không

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mô tả}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật tránh chồng lấp label hay không

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Lọc label; quan hệ mặc định giữa các selector là OR

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


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

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Lọc các mark của biểu đồ (vùng, điểm, v.v.) bằng mã JavaScript do AI tạo
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng kết hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


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



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
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
Chú giải

Cấu hình chú giải dùng để định nghĩa chú giải của biểu đồ, bao gồm vị trí, định dạng và kiểu hiển thị.
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
Có bật viền chú giải hay không.
:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ label

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng pager

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu biểu tượng pager bị vô hiệu hóa

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
Màu chữ chú giải

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
Chỉ có hiệu lực với chú giải rời rạc
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
Số cột hoặc hàng tối đa khi có nhiều mục chú giải





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

Cấu hình tooltip của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v.
:::


### enable

**Type:** `false | true`

:::note{title=Mô tả}
Có bật chức năng label hay không

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Mô tả}
Cấu hình brush của biểu đồ









:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật chọn brush hay không

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mô tả}
Loại brush

Xác định hình dạng và hướng chọn của brush

\- `rect`: chọn brush hình chữ nhật, có thể chọn đồng thời theo cả hướng trục X và trục Y

\- `polygon`: chọn brush đa giác, nhấp nhiều điểm để vẽ đa giác bất kỳ rồi chọn

\- `x`: chọn brush theo hướng trục X, chỉ chọn theo hướng trục X, hướng trục Y không bị giới hạn

\- `y`: chọn brush theo hướng trục Y, chỉ chọn theo hướng trục Y, hướng trục X không bị giới hạn
:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mô tả}
\- `multiple`: chế độ multiple, nhiều lựa chọn brush có thể cùng tồn tại đồng thời



Xác định chế độ chọn brush


\- `multiple`: chế độ chọn multiple; nhiều vùng brush có thể tồn tại cùng lúc

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có xóa vùng brush sau khi kết thúc chọn hay không

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
Độ mờ



Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét

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
Độ mờ



Độ mờ của điểm dữ liệu được chọn, phạm vi 0-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nét

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền
:::

## animation

**Type:** `ScatterAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoat anh



Cấu hình hoạt ảnh biểu đồ; các hiệu ứng có sẵn bị giới hạn bởi loại biểu đồ

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hoạt ảnh biểu đồ đường/vùng hay không

:::

### params

**Type:** `ScatterAnimationParams | undefined`

:::note{title=Mô tả}
Tham số hoạt ảnh biểu đồ phân tán

:::


#### appear

**Type:** `ScatterAppearAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh xuất hiện của biểu đồ phân tán

:::


##### effects

**Type:** `("growth" | "scale")[] | undefined`

:::note{title=Mô tả}
Hiệu ứng xuất hiện của biểu đồ phân tán, hỗ trợ hoạt ảnh grow và scale

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
Thời lượng hoạt ảnh tính bằng mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

#### update

**Type:** `ScatterUpdateAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh cập nhật của biểu đồ phân tán

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Mô tả}
Hiệu ứng cập nhật cho biểu đồ đường/vùng; hỗ trợ hoạt ảnh tăng trưởng

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
Thời lượng hoạt ảnh tính bằng mili giây

:::

##### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

#### loop

**Type:** `ScatterAnimationLoop | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh lặp của biểu đồ phân tán

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hoạt ảnh lặp hay không

:::

##### interval

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng thời gian hoạt ảnh lặp tính bằng mili giây

:::

##### loop

**Type:** `ScatterLoopAnimation | undefined`

:::note{title=Mô tả}
Cấu hình hoạt ảnh lặp của biểu đồ phân tán

:::


###### effects

**Type:** `ScatterLoopEffect[] | undefined`

:::note{title=Mô tả}
Hiệu ứng lặp của biểu đồ phân tán

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật giai đoạn hoạt ảnh hiện tại hay không

:::

###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh

:::

###### duration

**Type:** `number | undefined`

:::note{title=Mô tả}
Thời lượng hoạt ảnh tính bằng mili giây

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhấn hoặc màu bầu không khí của hoạt ảnh

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Mô tả}
Hoạt ảnh bầu không khí cho biểu đồ đường/vùng

:::


###### ease

**Type:** `string | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh bầu không khí

:::

###### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu của hoạt ảnh bầu không khí

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Mô tả}
Hiệu ứng hoạt ảnh bầu không khí; hỗ trợ hiệu ứng ripple, visibility và breathing

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Mô tả}
X-axis numeric-axis configuration, used to define the chart X-axis, including position, format, style, and related settings.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục hay không
:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục theo chiều đảo ngược hay không; chỉ có hiệu lực với trục số
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có buộc hiển thị giá trị 0 trên trục hay không; khi min và max đã được cấu hình, tùy chọn này không có hiệu lực. Chỉ áp dụng cho trục số.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có ưu tiên cao nhất

Khi autoFormat=true, nó ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip

Lưu ý: để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

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
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

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
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
Nhãn tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhãn
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ nhãn
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
Có hiển thị nhãn hay không
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường trục
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}
Tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tick có hướng vào trong hay không
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tick
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}
Tiêu đề trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản tiêu đề, mặc định theo cấu hình trường
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tiêu đề
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ tiêu đề
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ tiêu đề
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
selector = [{ profit: 100 }, { profit: 200 }]
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
Trục Y



Trục số. Cấu hình trục Y dùng để xác định vị trí, định dạng, kiểu và các thiết lập liên quan.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục hay không
:::

### min

**Type:** `number | undefined`

:::note{title=Mô tả}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mô tả}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mô tả}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục theo chiều đảo ngược hay không; chỉ có hiệu lực với trục số
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có buộc hiển thị giá trị 0 trên trục hay không; khi min và max đã được cấu hình, tùy chọn này không có hiệu lực. Chỉ áp dụng cho trục số.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Định dạng số tự động, bật mặc định, có ưu tiên cao nhất

Khi autoFormat=true, nó ghi đè toàn bộ cấu hình numFormat

Khi bật, nhãn dữ liệu và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị measure và locale

Quy tắc định dạng: số thập phân bật ký hiệu rút gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng triển khai Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale='zh-CN': 749740.264 → 74.45万

\- locale='en-US': 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip

Lưu ý: để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mô tả}
Loại định dạng số, hỗ trợ: number (thập phân), percent (%), permille (‰), ký hiệu khoa học

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
Số chữ số thập phân cho định dạng số, dùng Intl.NumberFormat minimumFractionDigits và maximumFractionDigits của trình duyệt; ưu tiên thấp hơn significantDigits

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
Chữ số có nghĩa cho định dạng số, dùng Intl.NumberFormat minimumSignificantDigits và maximumSignificantDigits của trình duyệt; ưu tiên cao hơn fractionDigits

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
Ưu tiên làm tròn cho định dạng số khi cả significantDigits và fractionDigits đều được đặt; dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingPriority của Intl.NumberFormat

:::

**Ví dụ**
\- 1234.5678 được chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 được chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn cho định dạng số, dùng Intl.NumberFormat của trình duyệt và tuân theo cùng quy tắc với roundingMode của Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mô tả}
Nhãn tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nhãn
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ nhãn
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ nhãn
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
Có hiển thị nhãn hay không
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường trục
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mô tả}
Tick trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tick có hướng vào trong hay không
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tick
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Kích thước tick
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mô tả}
Tiêu đề trục X
:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn hay không
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản tiêu đề, mặc định theo cấu hình trường
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu tiêu đề
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mô tả}
Cỡ chữ tiêu đề
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ đậm chữ tiêu đề
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
selector = [{ profit: 100 }, { profit: 200 }]
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


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Mô tả}
Đường gợi ý dọc

Đường gợi ý dọc hiển thị khi chuột di chuyển trên biểu đồ.

Cấu hình crosshair, dùng để hiển thị đường crosshair (đường gợi ý) trong biểu đồ.
:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị trục hay không
:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ label

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị nhãn của đường crosshair hay không

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu nền label

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Mô tả}
Theme của biểu đồ. Theme là cấu hình tính năng có độ ưu tiên thấp hơn, bao gồm cấu hình chung cho mọi loại biểu đồ và cấu hình dùng chung trong một nhóm biểu đồ.

Có sẵn hai theme tích hợp light và dark; người dùng có thể định nghĩa theme tùy chỉnh thông qua Builder.

Theme

Có hai theme tích hợp là light và dark; theme mới có thể được tùy chỉnh thông qua registerTheme.

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
Cấu hình kiểu mark điểm, dùng để xác định màu, viền và các thiết lập liên quan của mark điểm.

Hỗ trợ cấu hình kiểu toàn cục hoặc kiểu có điều kiện

Bộ lọc dữ liệu




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
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


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

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Lọc các mark của biểu đồ (vùng, điểm, v.v.) bằng mã JavaScript do AI tạo
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng kết hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


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



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
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
Điểm có hiển thị hay không

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
Màu dấu điểm



Màu dấu điểm

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ trong suốt màu dấu điểm



Độ trong suốt màu dấu điểm

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu viền dấu điểm



Màu viền dấu điểm

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng viền dấu điểm



Độ rộng viền dấu điểm

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu viền dấu điểm



Kiểu viền dấu điểm

:::

**Ví dụ**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mô tả}
Cấu hình điểm chú thích. Xác định các điểm chú thích của biểu đồ dựa trên dữ liệu đã chọn, bao gồm vị trí, định dạng, kiểu và các thiết lập liên quan.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mô tả}
Lọc label; quan hệ mặc định giữa các selector là OR

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### measureId

**Type:** `string | undefined`

:::note{title=Mô tả}
Chỉ định measure id mà điểm chú thích thuộc về. Trong kịch bản nhiều measure, có thể kết hợp với selector để định vị duy nhất điểm chú thích của measure mục tiêu.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mô tả}
Bộ lọc động (thực thi mã do AI tạo)

Triển khai logic lọc dữ liệu phức tạp bằng mã JavaScript do AI tạo.

Khả năng chính:

- Hỗ trợ mọi điều kiện lọc dữ liệu phức tạp

- Sử dụng các hàm tiện ích tích hợp cho thao tác dữ liệu

- Thực thi an toàn trong môi trường trình duyệt (sandbox Web Worker)

Yêu cầu môi trường: chỉ hỗ trợ môi trường trình duyệt; môi trường Node.js sẽ dùng fallback

Lưu ý: selector và dynamicFilter không thể dùng đồng thời; dynamicFilter có ưu tiên cao hơn

Cấu hình bộ lọc động của biểu đồ

Lọc các mark của biểu đồ (vùng, điểm, v.v.) bằng mã JavaScript do AI tạo
:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Mô tả}
Mã lọc JavaScript do AI tạo



- Chỉ được dùng các hàm tiện ích tích hợp (truy cập qua _ hoặc R)

- Tham số đầu vào: data (mảng), mỗi item chứa trường __row_index biểu thị số dòng

- Phải trả về mảng kết hợp chỉ số dòng và field: Array<{ __row_index: number, field: string }>

- __row_index biểu thị số dòng của mục dữ liệu gốc, field biểu thị trường cần làm nổi bật

- Không được dùng: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


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



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
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
'red'

:::

**Ví dụ**
'Văn bản đánh dấu'



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
Cách căn chỉnh văn bản. Thông thường đặt là right để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'right' để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, mép phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, mép trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích
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
'top' văn bản nằm phía dưới điểm chú thích
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
Màu văn bản

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




Nền có hiển thị hay không.

:::

**Ví dụ**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Mô tả}
Khoảng lệch pixel của toàn bộ điểm chú thích theo hướng X. Khi điểm chú thích ở bên trái biểu đồ (điểm bắt đầu trục danh mục), nên dùng giá trị dương; khi ở bên phải biểu đồ (điểm cuối trục danh mục), nên dùng giá trị âm.

Giá trị âm dịch toàn bộ sang trái; ví dụ -10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, sang trái 10 pixel

Giá trị dương dịch toàn bộ sang phải; ví dụ 10 sẽ dịch toàn bộ thành phần điểm chú thích, gồm văn bản và nền, sang phải 10 pixel

:::

**Ví dụ**
offsetX: 5, toàn bộ điểm chú thích dịch sang phải 5 pixel
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mô tả}
Đường chú thích giá trị chiều, hiển thị theo chiều dọc, có thể cấu hình vị trí và kiểu dáng

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

Tính động giá trị đường chú thích bằng mã JavaScript do AI tạo.

Phù hợp khi cần xác định động vị trí đường chú thích dựa trên dữ liệu, như giá trị trung bình, giá trị lớn nhất, phân vị hoặc đường nghiệp vụ.

Chỉ hỗ trợ môi trường trình duyệt (cần Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Mô tả}
\- Tham số đầu vào: data (mảng), trong đó mỗi mục có field __row_index biểu thị số dòng



\- __row_index biểu thị số dòng của mục dữ liệu gốc; field biểu thị field cần tô nổi bật






\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'Văn bản đánh dấu'



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
Cách căn chỉnh văn bản. Thông thường đặt là right để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'right' để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, mép phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, mép trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích
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
'top' văn bản nằm phía dưới điểm chú thích
### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Độ mờ màu vùng chú thích
:::

**Ví dụ**
true



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
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu doan đường

:::

**Ví dụ**
`lineStyle: 'solid'`




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
Màu văn bản

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
Đường chú thích dạng số, bao gồm đường trung bình, đường lớn nhất và đường nhỏ nhất. Hiển thị theo chiều ngang và có thể cấu hình theo vị trí, style. Dùng cấu hình này để vẽ các đường chú thích cho giá trị số như đường trung bình.

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

Tính động giá trị đường chú thích bằng mã JavaScript do AI tạo.

Phù hợp khi cần xác định động vị trí đường chú thích dựa trên dữ liệu, như giá trị trung bình, giá trị lớn nhất, phân vị hoặc đường nghiệp vụ.

Chỉ hỗ trợ môi trường trình duyệt (cần Web Worker).
:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mô tả}
Mô tả yêu cầu lọc của người dùng (ngôn ngữ tự nhiên)
:::

**Ví dụ**
"Highlight data items with sales greater than 1000"




#### code

**Type:** `string`

:::note{title=Mô tả}
\- Tham số đầu vào: data (mảng), trong đó mỗi mục có field __row_index biểu thị số dòng



\- __row_index biểu thị số dòng của mục dữ liệu gốc; field biểu thị field cần tô nổi bật






\- Cấm: eval, Function, thao tác bất đồng bộ, DOM API, yêu cầu mạng

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
Phương án fallback khi thực thi mã thất bại hoặc môi trường không được hỗ trợ
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mô tả}
Kết quả thực thi bộ lọc động (trường runtime)



Được ghi trong giai đoạn prepare(), chỉ đọc khi runtime
:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'Văn bản đánh dấu'



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
Cách căn chỉnh văn bản. Thông thường đặt là right để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'right' để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, mép phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, mép trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích
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
'top' văn bản nằm phía dưới điểm chú thích
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
Màu văn bản

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
Độ mờ màu vùng chú thích



Độ mờ màu vùng chú thích
:::

**Ví dụ**
true



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
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mô tả}
Kiểu doan đường

:::

**Ví dụ**
`lineStyle: 'solid'`




### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mô tả}
Kiểu gạch của viền vùng chú thích.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chính cho phần lớn hơn giá trị chú thích
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mô tả}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mô tả}
Vùng chú thích

Cấu hình vùng chú thích; dựa trên dữ liệu đã chọn để xác định vị trí và kiểu của vùng chú thích.
:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mô tả}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các measure được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mô tả}
Trường chiều, ID của một mục chiều
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mô tả}
giống operator

\- in: Chọn các mục dữ liệu có giá trị field chiều nằm trong giá trị đã chỉ định


giống operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mô tả}
Giá trị của trường chiều, hỗ trợ mảng
:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mô tả}
'red'

:::

**Ví dụ**
'Văn bản đánh dấu'



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
Cách căn chỉnh văn bản. Thông thường đặt là right để văn bản hiển thị bên trái điểm chú thích và nằm trong vùng hiển thị của biểu đồ

Khuyến nghị đặt là 'right' để văn bản nằm bên trái điểm chú thích

right: văn bản nằm bên trái điểm chú thích, mép phải của văn bản căn với điểm chú thích

left: văn bản nằm bên phải điểm chú thích, mép trái của văn bản căn với điểm chú thích

center: văn bản nằm ở giữa điểm chú thích

:::

**Ví dụ**
'right' văn bản nằm bên trái điểm chú thích
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
'top' văn bản nằm phía dưới điểm chú thích
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
Màu văn bản

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
Màu vùng đánh dấu

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
Lề của vùng đánh dấu

:::

**Ví dụ**
0




## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=Mô tả}
Duong hoi quy tuyen tinh



Cấu hình đường hồi quy tuyến tính, bao gồm kiểu đường và các thiết lập liên quan.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Đặt màu đường hồi quy. Nếu không đặt, màu chính của biểu đồ được dùng mặc định.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Đặt độ rộng đường hồi quy theo pixel. Giá trị mặc định là 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Đặt kiểu đường hồi quy, ví dụ solid hoặc dashed. Mặc định là solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Đặt văn bản nhãn đường hồi quy. Chuỗi rỗng nghĩa là không hiển thị nhãn.

:::

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
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị khoảng tin cậy hay không

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mô tả}
Thiết lập giá trị khoảng tin cậy. Mức tin cậy mặc định là 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot khoang tin cay

:::

**Ví dụ**
0.5



### shadowBlur

**Type:** `number | undefined`

:::note{title=Mô tả}
Graphic blur effect strength

:::

**Ví dụ**
0



### shadowColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu bóng của hình

:::

**Ví dụ**
'#FFFFFF4D'



### shadowOffsetX

**Type:** `number | undefined`

:::note{title=Mô tả}
Horizontal shadow offset distance

:::

**Ví dụ**
0



### shadowOffsetY

**Type:** `number | undefined`

:::note{title=Mô tả}
Vertical shadow offset distance

:::

**Ví dụ**
1




## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=Mô tả}
Mục cấu hình đường hồi quy có trọng số cục bộ



Cấu hình đường hồi quy có trọng số cục bộ, bao gồm kiểu đường và các thiết lập liên quan.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Đặt màu đường hồi quy. Nếu không đặt, màu chính của biểu đồ được dùng mặc định.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Đặt độ rộng đường hồi quy theo pixel. Giá trị mặc định là 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Đặt kiểu đường hồi quy, ví dụ solid hoặc dashed. Mặc định là solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Đặt văn bản nhãn đường hồi quy. Chuỗi rỗng nghĩa là không hiển thị nhãn.

:::

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
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị khoảng tin cậy hay không

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mô tả}
Thiết lập giá trị khoảng tin cậy. Mức tin cậy mặc định là 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot khoang tin cay

:::

**Ví dụ**
0.5




## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Mô tả}
Duong hoi quy da thuc



Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường và các thiết lập liên quan.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Đặt màu đường hồi quy. Nếu không đặt, màu chính của biểu đồ được dùng mặc định.

:::

### degree

**Type:** `number | undefined`

:::note{title=Mô tả}
Bậc hồi quy đa thức

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Đặt độ rộng đường hồi quy theo pixel. Giá trị mặc định là 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Đặt kiểu đường hồi quy, ví dụ solid hoặc dashed. Mặc định là solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Đặt văn bản nhãn đường hồi quy. Chuỗi rỗng nghĩa là không hiển thị nhãn.

:::

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
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị khoảng tin cậy hay không

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mô tả}
Thiết lập giá trị khoảng tin cậy. Mức tin cậy mặc định là 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot khoang tin cay

:::

**Ví dụ**
0.5




## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=Mô tả}
Duong hoi quy logistic



Cấu hình đường hồi quy logistic, bao gồm kiểu đường và các thiết lập liên quan.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật hay không

:::

### color

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu đường hồi quy

Đặt màu đường hồi quy. Nếu không đặt, màu chính của biểu đồ được dùng mặc định.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ rộng đường hồi quy

Đặt độ rộng đường hồi quy theo pixel. Giá trị mặc định là 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Mô tả}
Kiểu đường hồi quy

Đặt kiểu đường hồi quy, ví dụ solid hoặc dashed. Mặc định là solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Mô tả}
Văn bản nhãn đường hồi quy

Đặt văn bản nhãn đường hồi quy. Chuỗi rỗng nghĩa là không hiển thị nhãn.

:::

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
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mô tả}
0

:::

**Ví dụ**
400



### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có hiển thị khoảng tin cậy hay không

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Mô tả}
Thiết lập giá trị khoảng tin cậy. Mức tin cậy mặc định là 95%.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu khoang tin cay

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Do trong suot khoang tin cay

:::

**Ví dụ**
0.5




## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Mô tả}
Có bật liên kết chiều khi pivot hoặc nhóm chỉ số được bật trên biểu đồ hay không

Khi hover vào một giá trị chiều, làm nổi bật dữ liệu có cùng giá trị chiều trong các biểu đồ khác



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
Language



Cấu hình ngôn ngữ của biểu đồ. Hỗ trợ hai ngôn ngữ 'zh\-CN' và 'en\-US'; ngoài ra có thể gọi intl.setLocale('zh\-CN') để đặt ngôn ngữ

:::
