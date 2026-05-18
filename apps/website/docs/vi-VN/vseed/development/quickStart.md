# Bắt đầu nhanh

## Chuẩn bị môi trường

[Node Download](https://nodejs.org/en/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)
> `package.json` cấu hình `packageManager` là `pnpm@10.13.1`; `corepack` sẽ tự động cài đặt phiên bản này.
```bash title="pnpm"
corepack enable pnpm
```

Kiểm tra phiên bản pnpm. Phiên bản mong đợi là 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Khởi động dự án

Khởi động trang tài liệu, đồng thời có thể phát triển và debug vseed.
```bash title="Phát triển"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build
```

Phân tích sản phẩm build bằng `rsdoctor`.
```bash title="Phân tích"
pnpm build:rsdoctor
# or
pnpm dev:rsdoctor
```
