# RaceDonut

:::note{title=Mo ta}
Bieu do vong dong (Race Donut Chart)

Phu hop de hien thi moi quan he ty le cua du lieu thay doi theo thoi gian, voi vung trong o giua de hien thi thong tin tong hop

Tinh huong su dung:

\- Can hien thi dong thoi du lieu tong the va su thay doi ty le cua tung phan theo thoi gian

\- Nhan manh moi quan he giua tong the va cac phan cua du lieu

\- Vung trung tam can hien thi chi so chinh hoac tieu de

:::

:::note{title=Note}
Bieu do vong dong:

\- Goc anh xa gia tri chi so, mau anh xa gia tri chieu

\- Ho tro dieu khien chieu thoi gian bang trinh phat de hien thi dong su thay doi ty le

\- So voi bieu do tron, vung trung tam de trong nen nhe hon ve mat thi giac

:::


## chartType

**Type:** `"raceDonut"`

:::note{title=Mo ta}
Bieu do vong dong, phu hop de hien thi moi quan he ty le cua du lieu thay doi theo thoi gian

:::


## dataset

**Type:** `Record[]`

:::note{title=Mo ta}
Nguồn dữ liệu

:::


## dimensions

**Type:** `RaceDonutDimension[] | undefined`

:::note{title=Mo ta}
Chiều đầu tiên được ánh xạ tới trục X; các chiều còn lại được gộp với tên chỉ số (khi có nhiều chỉ số) và hiển thị dưới dạng mục chú giải.

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
Độ hạt thời gian, quyết định độ chính xác khi hiển thị ngày

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Chỉ số

:::


### id

**Type:** `string`

:::note{title=Mo ta}
ID chỉ số, không được trùng lặp

:::

### alias

**Type:** `string | undefined`

:::note{title=Mo ta}
Bí danh chỉ số, cho phép trùng lặp; nếu không đặt, alias mặc định là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Mo ta}
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

:::note{title=Mo ta}
Định dạng số tùy chỉnh cho chỉ số; tự động áp dụng cho nhãn và tooltip

Lưu ý: để dùng định dạng tùy chỉnh, cần đặt rõ autoFormat=false; nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Mo ta}


:::

#### ratio

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


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


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "angle" | undefined`

:::note{title=Mo ta}
Kênh mà chỉ số được ánh xạ tới

\- angle: góc mà chỉ số được ánh xạ tới

\- color: chỉ số được ánh xạ tới kênh màu

\- label: chỉ số được ánh xạ vào kênh nhãn

\- tooltip: chỉ số được ánh xạ vào kênh tooltip

:::

### parentId

**Type:** `string | undefined`

:::note{title=Mo ta}
Ở dạng cấu hình chỉ số phẳng, xây dựng nhóm chỉ số dạng cây. parentId trỏ tới id của nhóm chỉ số cha và dùng để xây dựng cây chỉ số

:::

:::tip{title=Tip}
Có hai cách cấu hình cây chỉ số: Cách 1 cấu hình trực tiếp cây chỉ số với children; Cách 2 cấu hình danh sách chỉ số phẳng với parentId. Hai cách này không thể dùng đồng thời

:::


## page

**Type:** `Page | undefined`

:::note{title=Mo ta}


:::


### field

**Type:** `string`

:::note{title=Mo ta}


:::

### currentValue

**Type:** `string`

:::note{title=Mo ta}


:::

**Vi du**
'2023\-01\-01'




## player

**Type:** `Player | undefined`

:::note{title=Mo ta}
Cau hinh trinh phat de chi dinh chieu thoi gian; cau hinh cot loi cua bieu do vong dong



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


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::


## color

**Type:** `Color | undefined`

:::note{title=Mo ta}
Cấu hình màu

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Mo ta}


:::

**Vi du**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Mo ta}


:::

**Vi du**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::


## label

**Type:** `PieLabel | undefined`

:::note{title=Mo ta}
Cấu hình nhãn

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Mo ta}






:::

### showDimension

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


:::

**Vi du**





#### symbol

**Type:** `string | undefined`

:::note{title=Mo ta}
**Type:** `string | undefined`

:::

**Vi du**





#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

#### suffix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### prefix

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
**Type:** `{ duration?: number; easing?: string; } | undefined`

:::

**Vi du**


Hàm easing của hoạt ảnh






#### significantDigits

**Type:** `number | undefined`

:::note{title=Mo ta}
Cấu hình sắp xếp trục phân loại, hỗ trợ sắp xếp theo dimension hoặc measure, và thứ tự tùy chỉnh

:::

**Vi du**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}




#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'




#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Mo ta}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}
  orderBy: 'profit',

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}
or

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Mo ta}


:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Mo ta}


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
**Ví dụ**

**Type:** `number | undefined`



:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**

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




Màu nét nền













'red'











Bán kính bo góc nền

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

**Vi du**
"To sang cac muc du lieu co doanh so lon hon 1000"

"To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc"



#### code

**Type:** `string`

:::note{title=Mo ta}
Toán tử



\- not in: Chọn các mục dữ liệu có giá trị trường dimension không nằm trong value

**Ví dụ**





**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::

**Vi du**
To sang truong sales cua cac muc du lieu co doanh so lon hon 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

To sang muc du lieu co ty suat loi nhuan cao nhat trong moi khu vuc
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

To sang cac muc du lieu duoc loc theo nhieu dieu kien
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
**Ví dụ**

**Type:** `number | undefined`



:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Mo ta}
**Ví dụ**

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




Màu văn bản

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title=Mo ta}
Cách bố trí nhãn, chỉ có hiệu lực với biểu đồ tròn và donut khi `labelPosition` là `outside`

\- arc: bố trí nhãn theo dạng cung

\- labelLine: căn hai đầu nhãn và kết nối phần tử hình quạt với nhãn bằng đường dẫn

\- edge: căn hai đầu nhãn, kết nối phần tử hình quạt với nhãn bằng đường dẫn và đặt gần hai mép biểu đồ

:::


## legend

**Type:** `Legend | undefined`

:::note{title=Mo ta}
Cấu hình chú giải

:::


### enable

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

**Vi du**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Vi du**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=Mo ta}


:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Mo ta}


:::

**Vi du**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Mo ta}


:::

:::warning{title=Warning}


:::

**Vi du**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Mo ta}


:::

**Vi du**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=Mo ta}






:::

:::warning{title=Warning}


:::

**Vi du**
maxSize: 2




## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Mo ta}
Cấu hình tooltip

:::


### enable

**Type:** `false | true`

:::note{title=Mo ta}


:::


## brush

**Type:** `Brush | undefined`

:::note{title=Mo ta}
Cấu hình brush



Chế độ chọn brush: đơn hoặc nhiều

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
Độ mờ of selected data points, range 0-1



**Type:** `number | boolean | undefined`

**Type:** `string | undefined`



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


## theme

**Type:** `Theme | undefined`

:::note{title=Mo ta}
Cấu hình chủ đề



const maxItems = _.map(grouped, group =>



_.map(maxItems, item => [

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title=Mo ta}
Cấu hình ngôn ngữ

:::

