# Radar

:::info{title=Recommendation}
\- Recommended field configuration: `1` measure and `1` dimension

\- Supports data reshaping: at least `1` measure and `0` dimensions

:::

:::info{title=Encoding Mapping}
Radar charts support the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapped to the angle axis by dimension value

`radius` : Radius channel, supports `multiple measures`, mapped to the radius axis by measure value

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors distinguish data series, while measure colors linearly map measure values to graphic colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, shown when hovering over data points

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displayed as data labels on data points

:::

:::note{title=Description}
Radar chart, suitable for comparative analysis of multidimensional data, showing value distribution across dimensions through a multi-axis coordinate system

Tinh huong su dung:

\- Compare overall performance across multidimensional data

\- Evaluate multiple objects across multiple measures

\- Show multidimensional features of categorical data

:::

:::warning{title=Warning}
Data requirements:

\- At least one numeric field (measure)

\- The first dimension becomes the radar axes; other dimensions are compared as different series

\- Supports displaying multiple measures as separate series

Features enabled by default:

\- Legend, radar coordinate system, data labels, tooltip, and value scaling are enabled by default

:::


## chartType

**Type:** `"radar"`

:::note{title=Description}
Radar chart



Radar chart, showing multidimensional comparison through a multi-axis coordinate system

:::

**Example**
'radar'




## dataset

**Type:** `Record[]`

:::note{title=Description}
Tap du lieu



An aggregated dataset that conforms to the TidyData specification. It defines the chart data source and structure. User input does not need preprocessing because VSeed reshapes data automatically. Radar chart data is eventually converted to two dimensions and one measure.

:::

**Example**
[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=Description}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.



The first dimension of a radar chart is mapped to the angle axis; the remaining dimensions are merged with measure names when multiple measures exist and displayed as legend items.

:::

**Example**
[{id: 'category', alias: 'Category'}]




### id

**Type:** `string`

:::note{title=Description}
ID trường tương ứng với chiều

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Bí danh chiều

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Cấu hình định dạng ngày của chiều

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Độ chi tiết thời gian, quyết định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=Description}
Kênh mà chiều được ánh xạ tới

\- angle: supports mapping multiple dimensions to the angle channel

\- color: hỗ trợ ánh xạ nhiều chiều tới kênh màu

\- detail: hỗ trợ ánh xạ nhiều chiều tới kênh chi tiết

\- tooltip: hỗ trợ ánh xạ nhiều chiều tới kênh tooltip

\- label: hỗ trợ ánh xạ nhiều chiều tới kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới kênh hàng

\- column: hỗ trợ ánh xạ nhiều chiều tới kênh cột

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=Description}
Chỉ số



Radar chart measures are automatically merged into one measure and mapped to the radius axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

:::

**Example**
[{id: 'value', alias: 'Value'}]




### id

**Type:** `string`

:::note{title=Description}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Biệt danh của measure, cho phép trùng lặp; nếu không đặt thì biệt danh mặc định là ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
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

:::note{title=Description}
Định dạng số tùy chỉnh cho measure; tự động áp dụng cho nhãn và tooltip.

Lưu ý: Để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat là false; nếu không autoFormat sẽ ghi đè cấu hình này.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Tỷ lệ định dạng số, không được bằng 0

:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Tỷ lệ định dạng số, không được bằng 0

:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=Description}
Kênh mà chỉ số được ánh xạ tới

\- radius: radius mapped from the measure

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Xây dựng nhóm measure dạng cây trong cấu hình measure phẳng. parentId trỏ tới ID của nhóm measure cha, dùng để xây dựng cây measure.

:::

:::tip{title=Tip}
Có hai cách cấu hình cây measure: Cách 1 là cấu hình trực tiếp cây measure bằng children; Cách 2 là cấu hình danh sách measure phẳng bằng parentId. Hai cách này không thể dùng đồng thời.

:::


## page

**Type:** `Page | undefined`

:::note{title=Description}
Paging configuration, used to specify the paging field name; it must be a dimension

:::


### field

**Type:** `string`

:::note{title=Description}
Trường phân trang; chỉ định tên trường cho phân trang, phải là một chiều.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Giá trị phân trang hiện tại; chỉ định giá trị dùng để xác định trang hiện tại.

:::

**Example**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color



The background color can be a color string such as 'red' or 'blue', or hex, rgb, or rgba values such as '#ff0000' and 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=Description}
Mau



Color configuration, used to define chart color schemes including color lists, color mappings, and gradients.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Bảng màu rời rạc dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Example**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Bảng màu chuyển sắc tuyến tính dùng để định nghĩa màu của các phần tử khác nhau trong biểu đồ.

:::

**Example**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Ánh xạ màu dùng để ánh xạ giá trị dữ liệu tới màu cụ thể.

:::

**Example**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị dương trong biểu đồ.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Cấu hình màu dương/âm; định nghĩa màu cho giá trị âm trong biểu đồ.

:::


## label

**Type:** `Label | undefined`

:::note{title=Description}
Nhan



Label configuration, used to define data label position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}
Có bật chức năng nhãn hay không.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Nhãn có xuống dòng tiếp theo hay không.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Nhãn có hiển thị giá trị chỉ số hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Nhãn có hiển thị giá trị measure dưới dạng phần trăm hay không.

Trong kịch bản nhiều chỉ số, không cần lo giá trị mâu thuẫn vì tất cả chỉ số liên quan đến phần vẽ đều qua xử lý `foldMeasures` và được gộp thành một chỉ số đại diện cho một điểm dữ liệu.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Nhãn có hiển thị nhãn dimension hay không.

Hiển thị tất cả nhãn dimension.

Lưu ý: label trong encoding có ưu tiên cao hơn; cấu hình này không ảnh hưởng đến label trong encoding.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Giá trị nhãn có được tự động định dạng hay không; khi autoFormat là true, cấu hình numFormat sẽ bị bỏ qua.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Cấu hình định dạng giá trị nhãn; được hợp nhất với `format` trong `measure`, trong đó `format` của `measure` có ưu tiên cao hơn. Ưu tiên của numFormat thấp hơn autoFormat.

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Tỷ lệ định dạng số, không được bằng 0

:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### symbol

**Type:** `string | undefined`

:::note{title=Description}


:::

**Example**

Độ dài tối đa để giới hạn nhãn. Khi độ dài văn bản vượt quá giá trị này, văn bản bị rút gọn bằng dấu ba chấm và hiển thị khi hover (chỉ có hiệu lực với trục danh mục).



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**
Nhãn font weight


\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)




#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}

:::

**Example**





\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}


:::

**Example**

Đường trục width



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat của trình duyệt để định dạng, quy tắc giống roundingMode trong Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Chiều cao tối đa của hình chữ nhật; có thể là giá trị pixel hoặc chuỗi phần trăm.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Màu nền nhãn

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Màu viền nhãn

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Màu chữ của nhãn

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Màu chữ của nhãn có tự động đảo theo màu phần tử hay không.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Có bật xử lý chồng lấn nhãn hay không.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Chọn nhãn; điều kiện giữa các selector mặc định là OR.

:::


#### field

**Type:** `string`

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Description}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).


:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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

:::note{title=Description}
Chu giai



Legend configuration, used to define legend position, format, style, and related settings.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Có bật tính năng chú giải hay không.

:::

**Example**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Description}
Có bật viền chú giải hay không.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Example**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Màu chữ chú giải.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Màu biểu tượng phân trang.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Màu biểu tượng phân trang khi bị tắt/làm mờ.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Kích thước chữ chú giải.

:::

**Example**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Màu chữ chú giải.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Độ đậm chữ chú giải.

:::

**Example**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Kiểu hình dạng của chú giải.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Example**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Vị trí chú giải

:::

**Example**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Số cột hoặc hàng tối đa khi có nhiều mục chú giải.

Nếu position nằm ngang (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize điều khiển số cột hiển thị.

Nếu position nằm dọc (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize điều khiển số hàng hiển thị.

:::

:::warning{title=Warning}
Chỉ áp dụng cho chú giải rời rạc.

:::

**Example**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip



Tooltip configuration, used to define tooltip position, format, style, and related settings.

:::


### enable

**Type:** `false | true`

:::note{title=Description}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Chon bang brush



Brush selection configuration, used to enable or disable brush selection.



\- `y`: Brush trục Y; chỉ chọn theo hướng trục Y, không giới hạn trên trục X.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}












:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}








:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}


:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}






:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"



Định nghĩa kiểu dáng của các điểm dữ liệu ngoài vùng chọn.

:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Trục X, trục phân loại, cấu hình trục X; định nghĩa trục X của biểu đồ, bao gồm vị trí, định dạng, kiểu dáng, v.v.





:::


#### opacity

**Type:** `number | undefined`

:::note{title=Description}
\- 100000 được chuyển thành 10W, ratio:10000, symbol:"W"





:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}


:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}

:::


## animation

**Type:** `RadarAnimation | undefined`

:::note{title=Description}
Cau hinh hoat anh



Chart animation configuration; available effects are constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether radar chart animation is enabled

:::

### params

**Type:** `RadarAnimationParams | undefined`

:::note{title=Description}
Radar chart animation parameters

:::


#### appear

**Type:** `RadarAppearAnimation | undefined`

:::note{title=Description}
Radar chart appear animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title=Description}
Radar chart appear effects, supporting radial and scale animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### update

**Type:** `RadarUpdateAnimation | undefined`

:::note{title=Description}
Radar chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=Description}
Radar chart update effects, supporting grow animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the current animation stage is enabled

:::

##### ease

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration, in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title=Description}
Animation highlight or atmosphere color

:::

#### loop

**Type:** `RadarAnimationLoop | undefined`

:::note{title=Description}
Radar chart loop animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether loop animation is enabled

:::

##### interval

**Type:** `number | undefined`

:::note{title=Description}
Loop animation interval, in milliseconds

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=Description}
Radar chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title=Description}
Atmosphere animation color

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=Description}
Atmosphere animation effect, supporting ripple, visibility, and breathing effects

:::


## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a lower-priority functional configuration that includes common settings shared by all chart types and by a single chart type.



Two built-in themes are provided: light and dark. Users can customize themes through Builder.



Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.

:::

**Example**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Point mark style configuration, used to define point mark color, border, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Description}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).


:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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

:::note{title=Description}
Diem co hien thi hay khong

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Kich thuoc diem



Kich thuoc diem

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Mau dau diem



Mau dau diem

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Do trong suot mau dau diem



Do trong suot mau dau diem

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Mau vien dau diem



Mau vien dau diem

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Do rong vien dau diem



Do rong vien dau diem

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Kieu vien dau diem



Kieu vien dau diem

:::

**Example**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line mark style configuration, used to define line mark color, opacity, curve, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Description}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).


:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Doan duong co hien thi hay khong

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Doan duong co duoc lam muot hay khong

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Mau doan duong

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Do trong suot mau doan duong

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Do rong doan duong

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Kieu doan duong

:::

**Example**
`lineStyle: 'solid'`




## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Area mark style configuration, used to define area mark color, opacity, border, and related settings.

Supports global style or conditional style configuration

Bo loc du lieu




:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
- not in: Chọn các mục dữ liệu có giá trị trường chiều không nằm trong mảng `value`.






:::

**Example**
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

:::note{title=Description}


:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
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

:::note{title=Description}


:::

**Example**
"Tô sáng các thanh có doanh số lớn hơn 1000"

"Tô sáng thanh có tỷ suất lợi nhuận cao nhất trong mỗi khu vực"



#### code

**Type:** `string`

:::note{title=Description}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value



Độ lệch ngang của điểm chú thích theo pixel. Khi điểm nằm bên trái (đầu trục phân loại), khuyến nghị giá trị dương; khi nằm bên phải (cuối trục phân loại), khuyến nghị giá trị âm.

Giá trị âm dịch chuyển toàn bộ thành phần sang trái (ví dụ -10).


:::

**Example**
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

:::note{title=Description}


:::


##### field

**Type:** `string`

:::note{title=Description}


:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Có hiển thị nhãn tương ứng với crosshair hay không.




same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}


:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
\- not in: Chọn các mục dữ liệu có giá trị trường dimension KHÔNG nằm trong danh sách giá trị.



Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the area mark is visible



Whether the area mark is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Area mark color



Area mark color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Area mark color opacity



Area mark color opacity

:::


## locale

**Type:** `"zh-CN" | "en-US" | "ja-JP" | "de-DE" | "id-ID" | "fr-FR" | "ko-KR" | "vi-VN" | undefined`

:::note{title=Description}
Ngon ngu



Chart language configuration. Supports 'zh\-CN' and 'en\-US'. You can also call intl.setLocale('zh\-CN') to set the language.

:::
