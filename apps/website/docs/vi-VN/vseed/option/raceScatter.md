# RaceScatter

:::note{title=Mo ta}
Bieu do phan tan dong (Race Scatter Chart)

Phu hop de hien thi phan bo du lieu thay doi theo thoi gian; vi tri diem du lieu bieu thi hai gia tri chi so

Tinh huong su dung:

\- Phan tich dac trung phan bo du lieu trong khong gian hai chieu va hien thi su thay doi dong theo thoi gian

\- Hien thi su phat trien cua tuong quan giua nhieu bien theo thoi gian

\- Quan sat quy dao chuyen dong cua cac diem du lieu trong khong gian hai chieu

:::

:::note{title=Note}
Bieu do phan tan dong:

\- Truc X va truc Y deu la truc so (du lieu lien tuc), ho tro anh xa nhieu chi so

\- Ho tro dieu khien chieu thoi gian bang trinh phat de hien thi dong thay doi du lieu

\- Hien thi truc quan thay doi dong cua du lieu thong qua thay doi vi tri diem du lieu

:::


## chartType

**Type:** `"raceScatter"`

:::note{title=Mo ta}
Bieu do phan tan dong, phu hop de hien thi phan bo du lieu thay doi theo thoi gian

:::


## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Nguon du lieu, tap du lieu phu hop voi dac ta TidyData

:::


## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=Mo ta}
Chieu, dung de phan biet cac chuoi du lieu khac nhau va hien thi chu giai

:::


### id

**Type:** `string`

:::note{title=Mo ta}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Mo ta}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Mo ta}
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Mo ta}
Kenh anh xa chieu trong bieu do race scatter

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều tới kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều tới kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

\- player: hỗ trợ ánh xạ nhiều chiều vào kênh trình phát

:::


## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Mo ta}
Chi so, can it nhat 2 chi so lan luot anh xa toi truc X va truc Y

:::


### id

**Type:** `string`

:::note{title=Mo ta}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Biệt danh của measure, cho phép trùng lặp; nếu không đặt thì biệt danh mặc định là ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip.

Lưu ý: Để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat là false; nếu không autoFormat sẽ ghi đè cấu hình này.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Tỷ lệ định dạng số, không được bằng 0

:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Tỷ lệ định dạng số, không được bằng 0

:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### encoding

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Mo ta}
Kênh mà chỉ số được ánh xạ tới

\- xAxis: Measure mapped to the X-axis

\- yAxis: chỉ số được ánh xạ tới trục y

\- size: size mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mo ta}
Xây dựng nhóm measure dạng cây trong cấu hình measure phẳng. parentId trỏ tới ID của nhóm measure cha, dùng để xây dựng cây measure.

:::

:::tip{title=Tip}
Có hai cách cấu hình cây measure: Cách 1 là cấu hình trực tiếp cây measure bằng children; Cách 2 là cấu hình danh sách measure phẳng bằng parentId. Hai cách này không thể dùng đồng thời.

:::


## player

**Type:** `Player | undefined`

:::note{title=Mo ta}
Cau hinh trinh phat de chi dinh chieu thoi gian; cau hinh cot loi cua bieu do phan tan dong

Dieu khien tien do phat cua chieu thoi gian bang trinh phat de cap nhat du lieu dong



Cấu hình trình phát, dùng để chỉ định tên trường phát, bắt buộc là chiều

:::

:::warning{title=Warning}
Tính năng này không hỗ trợ các loại biểu đồ như table, pivotTable, dualAxis, histogram, boxPlot, và không hỗ trợ sử dụng khi bật tổ hợp chỉ số hoặc pivot hàng/cột

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title=Mo ta}
Số lượng phát tối đa; dữ liệu vượt quá số này sẽ bị cắt, đặt false nghĩa là không giới hạn

:::

### interval

**Type:** `number | undefined`

:::note{title=Mo ta}
Khoảng thời gian phát, đơn vị ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có tự động phát hay không

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có phát lặp hay không

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Mo ta}
Vị trí trình phát

:::

### railColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu track thanh tiến trình của trình phát

:::

### fontFamily

**Type:** `string | undefined`

:::note{title=Mo ta}
Phông chữ văn bản trình phát

:::

### fontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Cỡ chữ văn bản trình phát

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu tiến trình của thanh tiến trình trình phát

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu thanh trượt của thanh tiến trình trình phát

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền thanh trượt của thanh tiến trình trình phát

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu nút bắt đầu của trình phát

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu nút tạm dừng của trình phát

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu nút lùi của trình phát

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu nút tiến của trình phát

:::


## sort

**Type:** `Sort | undefined`

:::note{title=Mo ta}
Cau hinh sap xep de dieu khien thu tu gia tri chieu





:::

**Vi du**
\- order:'asc'
\- orderBy:'date'

\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Mo ta}
])

:::

**Vi du**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=Mo ta}
\- `__row_index` biểu thị số dòng của mục dữ liệu gốc, còn `field` biểu thị trường cần làm nổi bật.

:::


## page

**Type:** `Page | undefined`

:::note{title=Mo ta}
Cấu hình phân trang, dùng để xử lý trường hợp lượng dữ liệu lớn

:::


### field

**Type:** `string`

:::note{title=Mo ta}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều.

:::

### currentValue

**Type:** `string`

:::note{title=Mo ta}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại.

:::

**Vi du**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mo ta}
Cấu hình màu nền

:::


## size

**Type:** `number | number[] | undefined`

:::note{title=Mo ta}
Scatter chart measure size, used to define the size or size range of data points

\- If the size range is a number such as 10, the data point size is fixed at 10

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- Mutually exclusive with sizeRange; lower priority than size

:::


## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Mo ta}
Scatter chart measure size range, used to define the size range of data points,

\- If the size range is a two-item array such as [10, 40], the data point size ranges from 10 to 40

\- If the size range is a number such as 10, the data point size is fixed at 10

\- Mutually exclusive with sizeRange; higher priority than size

:::


## color

**Type:** `Color | undefined`

:::note{title=Mo ta}
Cấu hình màu, dùng để phân biệt các chiều hoặc chỉ số khác nhau

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}
Bảng màu rời rạc dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Vi du**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}
Bảng màu chuyển sắc tuyến tính dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Vi du**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mo ta}
Ánh xạ màu dùng để ánh xạ giá trị dữ liệu tới màu cụ thể.

:::

**Vi du**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị dương trong biểu đồ.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị âm trong biểu đồ.

:::


## label

**Type:** `Label | undefined`

:::note{title=Mo ta}
Cau hinh nhan de hien thi nhan du lieu tren diem du lieu

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}
Có bật chức năng nhãn hay không.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Nhãn có xuống dòng tiếp theo hay không.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Nhãn có hiển thị giá trị chỉ số hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Nhãn có hiển thị giá trị measure dưới dạng phần trăm hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Nhãn có hiển thị nhãn dimension hay không.

Hiển thị tất cả nhãn dimension.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Giá trị nhãn có được tự động định dạng hay không; khi autoFormat là true, cấu hình numFormat sẽ bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}
Cấu hình định dạng giá trị nhãn; được hợp nhất với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. Ưu tiên của numFormat thấp hơn autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Tỷ lệ định dạng số, không được bằng 0

:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu nền nhãn

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền nhãn

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu chữ của nhãn

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Màu chữ của nhãn có tự động đảo theo màu phần tử hay không.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có bật xử lý chồng lấn nhãn hay không.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
Chọn nhãn; điều kiện giữa các selector mặc định là OR.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Vi du**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title=Mo ta}
Cấu hình chú giải

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có bật tính năng chú giải hay không.

:::

**Vi du**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có bật viền chú giải hay không.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Vi du**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu chữ chú giải.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu biểu tượng phân trang.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu biểu tượng phân trang khi bị tắt/làm mờ.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Kích thước chữ chú giải.

:::

**Vi du**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu chữ chú giải.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
Độ đậm chữ chú giải.

:::

**Vi du**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}
Kiểu hình dạng của chú giải.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Vi du**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mo ta}
Vị trí chú giải

:::

**Vi du**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Số cột hoặc hàng tối đa khi có nhiều mục chú giải.

Nếu position nằm ngang (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize điều khiển số cột hiển thị.

Nếu position nằm dọc (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize điều khiển số hàng hiển thị.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Vi du**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mo ta}
Cấu hình tooltip, dùng để hiển thị thông tin chi tiết khi di chuột

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Cấu hình brush, dùng để hỗ trợ tương tác chọn vùng



\- `y`: Brush trục Y; chỉ chọn theo hướng trục Y, không giới hạn trên trục X.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Mo ta}
**Type:** `XLinearAxis | undefined`



**Type:** `boolean | undefined`









:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Mo ta}




**Type:** `number | boolean | undefined`

**Type:** `number | undefined`



:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"



Định nghĩa kiểu dáng của các điểm dữ liệu ngoài vùng chọn.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `boolean | undefined`

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Mo ta}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `boolean | undefined`

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Mo ta}
Cau hinh truc X, la truc so hien thi gia tri chi so thu nhat

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Tỷ lệ định dạng số, không được bằng 0

:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Mo ta}
Cau hinh truc Y, la truc so hien thi gia tri chi so thu hai

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::

### min

**Type:** `number | undefined`

:::note{title=Mo ta}
Đường trục width

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Mo ta}
Tick trục X

:::

### log

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có sử dụng trục logarit hay không, chỉ có hiệu lực với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title=Mo ta}
Hàm easing của hoạt ảnh.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Cấu hình trục Y (trục danh mục) dùng để định nghĩa trục Y, bao gồm vị trí, định dạng, kiểu dáng, v.v.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Mo ta}


:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}
Tỷ lệ định dạng số, không được bằng 0

:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number | undefined`

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `number[] | undefined`

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)

**Type:** `number | undefined`



#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**



**Type:** `boolean | undefined`

**Type:** `YBandAxis | undefined`

\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
value: 'tool'

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
\- orderBy:'date'

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `"asc" | "desc" | undefined`

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp chú giải; hỗ trợ sắp xếp theo dimension hoặc measure, cũng như thứ tự tùy chỉnh; mảng sort tuân theo thứ tự từ trái sang phải hoặc từ trên xuống dưới.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Mo ta}
sortLegend: {

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Mo ta}


:::


#### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### titleText

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Mo ta}
\- orderBy:'profit'

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Thứ tự sắp xếp tùy chỉnh; thứ tự này được áp dụng trực tiếp cho chú giải. Tăng dần theo trái-sang-phải hoặc trên-xuống-dưới; giảm dần theo phải-sang-trái hoặc dưới-lên-trên.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
  ])

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Mo ta}
Bao gồm các theme tích hợp `light` và `dark`. Có thể thêm theme tùy chỉnh qua `registerTheme`.

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}
Hỗ trợ kiểu toàn cục hoặc cấu hình kiểu có điều kiện.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Mo ta}


:::


#### duration

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `Selector | Selectors | undefined`

:::

#### easing

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Mo ta}
Cau hinh crosshair de hien thi vi tri chinh xac cua du lieu



Cau hinh duong crosshair, la loai cau hinh de hien thi duong crosshair (duong goi y) trong bieu do

:::


### visible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Co hien thi duong crosshair hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau duong crosshair

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nhan duong crosshair

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn của đường crosshair hay không

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau nen nhan duong crosshair

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Cấu hình chủ đề



Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Mo ta}
Cau hinh kieu diem du lieu, co the la mot kieu hoac dang mang, ho tro kieu toan cuc hoac co dieu kien

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.



**Type:** `string | undefined`



:::

**Vi du**
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

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Vi du**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}
Diem co hien thi hay khong

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Mo ta}
Kich thuoc diem



Kich thuoc diem

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau dau diem



Mau dau diem

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ mờ màu của điểm đánh dấu



Độ mờ màu của điểm đánh dấu

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Mau vien dau diem



Mau vien dau diem

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Do rong vien dau diem



Do rong vien dau diem

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Kieu vien dau diem



Kieu vien dau diem

:::

**Vi du**
solid

dashed

dotted




## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Mo ta}
Cấu hình điểm đánh dấu, dùng để thêm dấu tại các điểm dữ liệu cụ thể

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Mo ta}


:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### measureId

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}


:::

**Vi du**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**
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

:::note{title=Mo ta}


:::


##### field

**Type:** `string`

:::note{title=Mo ta}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Mo ta}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}




Cỡ chữ văn bản.

**Type:** `string | string[] | undefined`

**Ví dụ**

:::

**Vi du**
'right' Văn bản nằm bên trái điểm đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
**Ví dụ**









:::

**Vi du**
'top' Văn bản nằm phía dưới điểm đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### offsetY

**Type:** `number | undefined`

:::note{title=Mo ta}




Nền có hiển thị hay không.

:::

**Vi du**
true



### offsetX

**Type:** `number | undefined`

:::note{title=Mo ta}
Màu nền.

**Type:** `number | undefined`

**Ví dụ**

:::

**Vi du**
2




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Mo ta}
Đường đánh dấu số, đường đánh dấu dọc để đánh dấu giá trị trục X cụ thể

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
**Ví dụ**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**

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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
Các giá trị trường dimension đã chọn; hỗ trợ mảng.

:::

**Vi du**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.

Màu văn bản.

**Type:** `number | undefined`

**Ví dụ**

:::

**Vi du**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.









:::

**Vi du**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Vi du**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Vi du**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Vi du**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Mo ta}
Duong chu thich so, duong chu thich ngang danh dau mot gia tri truc Y cu the

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Mo ta}


:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Mo ta}
**Ví dụ**











:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"Lấy giá trị doanh số cao nhất làm tham chiếu cho đường đánh dấu"

"Tính doanh số trung bình cho đường đánh dấu"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value





**Type:** `boolean | undefined`

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**

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

:::note{title=Mo ta}


:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Mo ta}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Mo ta}
2





:::

**Vi du**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
left: Văn bản nằm bên phải vùng chú thích, mép trái căn với vùng.

center: Văn bản được căn giữa trong vùng chú thích.



**Ví dụ**



:::

**Vi du**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}
middle: Văn bản được căn giữa theo chiều dọc trong vùng chú thích.



màu nét nền

**Ví dụ**



:::

**Vi du**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

**Vi du**
true



### lineColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu viền vùng chú thích.

:::

**Vi du**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
Độ rộng viền vùng chú thích.

:::

**Vi du**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Mo ta}
Bán kính bo góc viền vùng chú thích.

:::

**Vi du**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Mo ta}
Kiểu gạch của viền vùng chú thích.

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}
0

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Mo ta}
Cấu hình vùng đánh dấu, dùng để làm nổi bật phạm vi dữ liệu cụ thể

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Mo ta}
Có bật chức năng liên kết dimension khi biểu đồ bật perspective hoặc khi các measure được gộp hay không.

:::


#### field

**Type:** `string`

:::note{title=Mo ta}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
Có hiển thị nhãn tương ứng với crosshair hay không.

**Type:** `number | undefined`



same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Mo ta}


:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Mo ta}
'red'

:::

**Vi du**
'Văn bản đánh dấu'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Mo ta}
2

:::

**Vi du**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=Mo ta}
4

:::

**Vi du**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
[2, 2]

:::

**Vi du**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=Mo ta}
0

:::

**Vi du**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Mo ta}
Cấu hình đường hồi quy đa thức, bao gồm bậc đa thức, kiểu đường hồi quy, v.v.

Nên đặt thành 'center' để đảm bảo văn bản nằm ở giữa vùng đánh dấu







:::

**Vi du**
'center' Văn bản nằm ở giữa vùng đánh dấu



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Mo ta}








Bậc của hồi quy đa thức

:::

**Vi du**
'top' Văn bản nằm phía dưới vùng đánh dấu



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu văn bản



Màu văn bản

:::

**Vi du**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**

:::

**Vi du**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}
**Ví dụ**



**Ví dụ**

:::

**Vi du**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Padding nền

:::

**Vi du**
4



### areaColor

**Type:** `string | undefined`

:::note{title=Mo ta}
Màu vùng đánh dấu

:::

**Vi du**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=Mo ta}
Lề của vùng đánh dấu

:::

**Vi du**
0




## locale

**Type:** `Locale | undefined`

:::note{title=Mo ta}
Cấu hình ngôn ngữ

:::

