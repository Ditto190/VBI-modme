# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Menjalankan kode filter dinamis secara asinkron. Dipanggil sebelum `build()` untuk menjalankan `code` di dalam `dynamicFilter`. Ini adalah metode idempotent; pemanggilan berkali-kali tidak akan menjalankan ulang kode.

### build

```ts
build<T = S>(): T
```

Menghasilkan konfigurasi chart final (Spec). Ini adalah metode inti yang paling sering digunakan. Jika konfigurasi berisi `dynamicFilter` code, panggil `prepare()` terlebih dahulu.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Mengubah konfigurasi lapisan tengah (AdvancedVSeed) menjadi Spec final. Gunakan hanya ketika perlu melakukan kustomisasi mendalam pada konfigurasi lapisan tengah.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Menghasilkan konfigurasi lapisan tengah (AdvancedVSeed), yaitu template chart. Lebih detail daripada VSeed asli dan mengekspos lebih banyak detail chart.

### getColorItems

```ts
getColorItems(): __type[]
```

Mengambil informasi field yang terkait dengan warna dalam data. Sering digunakan untuk membuat legenda chart atau UI filter warna.

### getColorIdMap

```ts
getColorIdMap(): Record
```

Mengambil tabel pemetaan detail untuk field warna. Key adalah ID warna, Value adalah informasi detail.

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Mengambil pemetaan dari `colorId` ke nilai warna final dalam peta warna diskret.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Metode internal] Mengambil pipeline pembuatan template untuk tipe chart tertentu, digunakan untuk men-debug proses konversi dari VSeed ke AdvancedVSeed.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Metode internal] Mengambil pipeline pembuatan Spec untuk tipe chart tertentu, digunakan untuk men-debug proses konversi dari AdvancedVSeed ke Spec.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Mengambil konfigurasi tema tertentu. Jika `themeKey` tidak diberikan, secara default mengembalikan tema `'light'`.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Mengambil semua konfigurasi tema yang sudah terdaftar.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Metode factory statis untuk membuat instance Builder dengan mudah.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Metode ekstensi] Mendaftarkan pipeline pembuatan template untuk tipe chart baru.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Metode ekstensi] Mendaftarkan pipeline pembuatan Spec untuk tipe chart baru.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Metode ekstensi] Mengubah logika pembuatan template chart yang sudah ada, menyisipkan Pipe kustom untuk memengaruhi AdvancedVSeed yang dihasilkan.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Metode ekstensi] Mengubah logika pembuatan Spec chart yang sudah ada, menyisipkan Pipe kustom untuk memengaruhi Spec final yang dihasilkan.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Metode ekstensi] Mendaftarkan tema kustom.

## Properties

### get locale

```ts
get locale()
```

Mengambil locale yang digunakan Builder saat ini.

### get vseed

```ts
get vseed()
```

Mengambil data input VSeed saat ini.

### set vseed

```ts
set vseed(value)
```

Memperbarui data input VSeed. Setelah diperbarui, status cache dari `prepare()` akan dihapus.

### get isPrepared

```ts
get isPrepared()
```

Mengambil status `prepare()`.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Mengatur status `prepare()`.

### get advancedVSeed

```ts
get advancedVSeed()
```

Mengambil objek konfigurasi tengah AdvancedVSeed saat ini.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Mengatur objek konfigurasi tengah AdvancedVSeed. Biasanya digunakan untuk cache atau menggunakan ulang konfigurasi tengah yang sudah ada.

### get spec

```ts
get spec()
```

Mengambil objek Spec final yang saat ini dihasilkan.

### set spec

```ts
set spec(value)
```

Mengatur objek Spec. Biasanya digunakan untuk cache.

### get performance

```ts
get performance()
```

Mengambil informasi statistik performa selama proses build. Mencakup waktu tiap tahap (satuan: ms).

### set performance

```ts
set performance(value)
```

Mengatur informasi statistik performa.
