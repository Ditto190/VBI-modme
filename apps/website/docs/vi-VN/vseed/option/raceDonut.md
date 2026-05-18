# RaceDonut

:::note{title=Mô tả}
Biểu đồ vòng động (Race Donut Chart)

Phù hợp để hiển thị mối quan hệ tỷ lệ của dữ liệu thay đổi theo thời gian, với vùng trống ở giữa để hiển thị thông tin tổng hợp

Tình huống sử dụng:

\- Cần hiển thị đồng thời dữ liệu tổng thể và sự thay đổi tỷ lệ của từng phần theo thời gian

\- Nhấn mạnh mối quan hệ giữa tổng thể và các phần của dữ liệu

\- Vùng trung tâm cần hiển thị chỉ số chính hoặc tiêu đề

:::

:::note{title=Note}
Biểu đồ vòng động:

\- Góc ánh xạ giá trị chỉ số, màu ánh xạ giá trị chiều

\- Hỗ trợ điều khiển chiều thời gian bằng trình phát để hiển thị động sự thay đổi tỷ lệ

\- So với biểu đồ tròn, vùng trung tâm để trống nên nhẹ hơn về mặt thị giác

:::


## chartType

**Type:** `"raceDonut"`

:::note{title=Mô tả}
Biểu đồ vòng động, phù hợp để hiển thị mối quan hệ tỷ lệ của dữ liệu thay đổi theo thời gian

:::


## dataset

**Type:** `Record[]`

:::note{title=Mô tả}
Tập dữ liệu

Tập dữ liệu đã được tổng hợp và tuân thủ đặc tả TidyData, dùng để định nghĩa nguồn dữ liệu và cấu trúc của biểu đồ. Dữ liệu do người dùng nhập không cần xử lý thêm; VSeed có năng lực reshape dữ liệu mạnh mẽ và sẽ tự động reshape dữ liệu. Dữ liệu của biểu đồ vòng cuối cùng sẽ được chuyển thành 1 chiều và 1 chỉ số.
:::

## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=Mô tả}
Chiều

:::


### id

**Type:** `string`

:::note{title=Mô tả}
ID field tương ứng với chiều
:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Alias chiều
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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Mô tả}
Kênh mà chiều được ánh xạ tới

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều vào kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều vào kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

\- player: hỗ trợ ánh xạ nhiều chiều vào kênh trình phát

:::


## measures

**Type:** `PieMeasure[] | undefined`

:::note{title=Mô tả}
Chỉ số

Tất cả chỉ số của biểu đồ vòng tự động được gộp thành một chỉ số và ánh xạ tới bán kính của biểu đồ tròn. Khi có nhiều chỉ số, tên chỉ số được gộp với các chiều còn lại và hiển thị dưới dạng mục chú giải.
:::

### id

**Type:** `string`

:::note{title=Mô tả}
ID chỉ số, không được trùng lặp
:::

### alias

**Type:** `string | undefined`

:::note{title=Mô tả}
Bí danh chỉ số, cho phép trùng lặp. Nếu không điền, alias sẽ dùng id
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Tự động định dạng số, bật mặc định và có độ ưu tiên cao nhất

Khi autoFormat=true, nó sẽ ghi đè mọi cấu hình numFormat

Khi bật, nhãn và tooltip của biểu đồ sẽ tự động chọn định dạng phù hợp theo giá trị chỉ số và locale

Quy tắc định dạng: số thập phân, bật compact notation, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, dùng Intl.NumberFormat của trình duyệt

Ví dụ:

\- locale=zh-CN: 749740.264 → 74.45万

\- locale=en-US: 749740.264 → 744.5K
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mô tả}
Định dạng số tùy chỉnh cho chỉ số, tự động áp dụng cho label và tooltip

Lưu ý: để dùng định dạng tùy chỉnh, phải đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này
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
\- 1234.5678 chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1000, significantDigits:1
\- 1234.5678 chuyển thành 1200, significantDigits:2
\- 1234.5678 chuyển thành 1230, significantDigits:3
\- 1234.5678 chuyển thành 1234, significantDigits:4
\- 1234.5678 chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
\- 1234.5678 chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1000, significantDigits:1
\- 1234.5678 chuyển thành 1200, significantDigits:2
\- 1234.5678 chuyển thành 1230, significantDigits:3
\- 1234.5678 chuyển thành 1234, significantDigits:4
\- 1234.5678 chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mô tả}
Chế độ làm tròn khi định dạng số, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingMode của Intl.NumberFormat
:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Mô tả}
Kênh mà chỉ số được ánh xạ tới

\- angle: góc mà chỉ số được ánh xạ tới

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
Cấu hình cây chỉ số có hai hình thức: cấu hình trực tiếp cây chỉ số có children, hoặc cấu hình danh sách chỉ số phẳng với parentId. Hai hình thức này không thể dùng đồng thời.
:::


## page

**Type:** `Page | undefined`

:::note{title=Mô tả}
Cấu hình phân trang, dùng để chỉ định tên trường phân trang và trường đó bắt buộc phải là chiều.
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




## player

**Type:** `Player | undefined`

:::note{title=Mô tả}
Cấu hình trình phát để chỉ định chiều thời gian; cấu hình cốt lõi của biểu đồ tròn động



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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mô tả}
Màu nền biểu đồ



Màu nền có thể là chuỗi màu (ví dụ 'red', 'blue') hoặc giá trị hex, rgb, rgba (ví dụ '#ff0000', 'rgba(255,0,0,0.5)')
:::


## color

**Type:** `Color | undefined`

:::note{title=Mô tả}
Màu sắc

Cấu hình màu dùng để xác định bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu, gradient màu, v.v.
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

**Type:** `PieLabel | undefined`

:::note{title=Mô tả}
Nhãn

Cấu hình nhãn dùng để định nghĩa nhãn dữ liệu của biểu đồ, bao gồm vị trí, định dạng và kiểu hiển thị.
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
\- 1234.5678 chuyển thành 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mô tả}
Số chữ số có nghĩa khi định dạng số, dùng minimumSignificantDigits và maximumSignificantDigits của Intl.NumberFormat trình duyệt. Có độ ưu tiên cao hơn fractionDigits
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1000, significantDigits:1
\- 1234.5678 chuyển thành 1200, significantDigits:2
\- 1234.5678 chuyển thành 1230, significantDigits:3
\- 1234.5678 chuyển thành 1234, significantDigits:4
\- 1234.5678 chuyển thành 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mô tả}
Độ ưu tiên làm tròn khi đồng thời đặt significantDigits và fractionDigits, dùng Intl.NumberFormat của trình duyệt với cùng quy tắc như roundingPriority của Intl.NumberFormat
:::

**Ví dụ**
\- 1234.5678 chuyển thành 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 chuyển thành 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



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
"Highlight các cột có doanh số lớn hơn 1000"

"Highlight cột có biên lợi nhuận cao nhất trong từng khu vực"



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
Highlight trường sales của các mục dữ liệu có doanh số lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight mục dữ liệu có biên lợi nhuận cao nhất trong từng khu vực
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

Highlight các mục dữ liệu thỏa nhiều điều kiện lọc
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

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Mô tả}
Cách bố trí nhãn, chỉ có hiệu lực với biểu đồ tròn và donut khi `labelPosition` là `outside`

\- arc: bố trí nhãn theo dạng cung

\- labelLine: căn hai đầu nhãn và kết nối phần tử hình quạt với nhãn bằng đường dẫn

\- edge: căn hai đầu nhãn, kết nối phần tử hình quạt với nhãn bằng đường dẫn và đặt gần hai mép biểu đồ
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
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mô tả}
Có bật viền chú giải hay không
:::

:::warning{title=Warning}
Chỉ có hiệu lực với chú giải rời rạc
:::

**Ví dụ**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu chữ chú giải
:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu icon phân trang
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mô tả}
Màu icon phân trang khi bị vô hiệu hóa
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
Số cột tối đa hoặc số hàng tối đa khi có nhiều mục chú giải

Nếu position theo hướng ngang (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize kiểm soát số cột hiển thị

Nếu position theo hướng dọc (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize kiểm soát số hàng hiển thị
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
Chọn vùng bằng brush

Cấu hình brush dùng để bật hoặc tắt khả năng chọn vùng bằng brush.

Cấu hình chọn vùng bằng brush của biểu đồ
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
Chế độ brush, chọn đơn hoặc chọn nhiều

Định nghĩa chế độ chọn.

\- `single`: chế độ chọn đơn, mỗi lần chỉ có một vùng chọn

\- `multiple`: chế độ chọn nhiều, có thể tồn tại nhiều vùng chọn cùng lúc
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
Kiểu dữ liệu nằm ngoài vùng brush

Định nghĩa kiểu của các điểm dữ liệu không được chọn
:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mô tả}
Độ mờ

Độ mờ của các điểm dữ liệu không được chọn, phạm vi giá trị 0-1
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
Chủ đề của biểu đồ. Chủ đề là cấu hình chức năng có độ ưu tiên thấp hơn, bao gồm cấu hình chung cho mọi loại biểu đồ và cấu hình dùng chung cho một loại biểu đồ

Có sẵn hai chủ đề light và dark. Người dùng có thể tùy chỉnh chủ đề qua Builder

Chủ đề

Có sẵn hai chủ đề light và dark. Chủ đề mới có thể được tùy chỉnh qua registerTheme.
:::

### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Mô tả}
Ngôn ngữ

Cấu hình ngôn ngữ biểu đồ. Hỗ trợ 'zh-CN' và 'en-US'; cũng có thể gọi intl.setLocale('zh-CN') để đặt ngôn ngữ
:::
