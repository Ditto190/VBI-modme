# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Thực thi mã bộ lọc động theo cách bất đồng bộ. Gọi trước `build()` để thực thi `code` trong `dynamicFilter`. Đây là phương thức lũy đẳng; gọi nhiều lần sẽ không thực thi lặp lại.

### build

```ts
build<T = S>(): T
```

Sinh cấu hình biểu đồ cuối cùng (Spec). Đây là phương thức lõi được dùng phổ biến nhất. Nếu cấu hình chứa `dynamicFilter` code, cần gọi `prepare()` trước.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Chuyển đổi cấu hình tầng trung gian (AdvancedVSeed) thành Spec cuối cùng. Chỉ dùng khi bạn cần tùy chỉnh sâu cấu hình tầng trung gian.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Sinh cấu hình tầng trung gian (AdvancedVSeed), tức là template biểu đồ. Chi tiết hơn VSeed gốc và bộc lộ nhiều chi tiết biểu đồ hơn.

### getColorItems

```ts
getColorItems(): __type[]
```

Lấy thông tin các trường liên quan đến màu trong dữ liệu. Thường dùng để sinh chú giải biểu đồ hoặc UI bộ lọc màu.

### getColorIdMap

```ts
getColorIdMap(): Record
```

Lấy bảng ánh xạ chi tiết của trường màu. Key là ID màu, Value là thông tin chi tiết.

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Lấy ánh xạ từ `colorId` đến giá trị màu cuối cùng trong bản đồ màu rời rạc.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Phương thức nội bộ] Lấy pipeline xây dựng template cho loại biểu đồ được chỉ định, dùng để debug quá trình chuyển đổi từ VSeed sang AdvancedVSeed.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Phương thức nội bộ] Lấy pipeline xây dựng Spec cho loại biểu đồ được chỉ định, dùng để debug quá trình chuyển đổi từ AdvancedVSeed sang Spec.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Lấy cấu hình của theme được chỉ định. Nếu không truyền `themeKey`, mặc định trả về theme `'light'`.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Lấy tất cả cấu hình theme đã đăng ký.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Phương thức factory tĩnh để tạo instance Builder một cách thuận tiện.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Phương thức mở rộng] Đăng ký pipeline xây dựng template cho loại biểu đồ mới.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Phương thức mở rộng] Đăng ký pipeline xây dựng Spec cho loại biểu đồ mới.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Phương thức mở rộng] Sửa logic xây dựng template của biểu đồ hiện có, chèn Pipe tùy chỉnh để ảnh hưởng đến AdvancedVSeed được sinh ra.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Phương thức mở rộng] Sửa logic xây dựng Spec của biểu đồ hiện có, chèn Pipe tùy chỉnh để ảnh hưởng đến Spec cuối cùng được sinh ra.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Phương thức mở rộng] Đăng ký theme tùy chỉnh.

## Properties

### get locale

```ts
get locale()
```

Lấy locale mà Builder hiện tại đang sử dụng.

### get vseed

```ts
get vseed()
```

Lấy dữ liệu đầu vào VSeed hiện tại.

### set vseed

```ts
set vseed(value)
```

Cập nhật dữ liệu đầu vào VSeed. Sau khi cập nhật, trạng thái cache của `prepare()` sẽ bị xóa.

### get isPrepared

```ts
get isPrepared()
```

Lấy trạng thái `prepare()`.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Thiết lập trạng thái `prepare()`.

### get advancedVSeed

```ts
get advancedVSeed()
```

Lấy đối tượng cấu hình trung gian AdvancedVSeed hiện tại.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Thiết lập đối tượng cấu hình trung gian AdvancedVSeed. Thường dùng để cache hoặc tái sử dụng cấu hình trung gian đã có.

### get spec

```ts
get spec()
```

Lấy đối tượng Spec cuối cùng hiện đang được sinh ra.

### set spec

```ts
set spec(value)
```

Thiết lập đối tượng Spec. Thường dùng để cache.

### get performance

```ts
get performance()
```

Lấy thông tin thống kê hiệu năng trong quá trình build. Bao gồm thời gian của từng giai đoạn (đơn vị: ms).

### set performance

```ts
set performance(value)
```

Thiết lập thông tin thống kê hiệu năng.
