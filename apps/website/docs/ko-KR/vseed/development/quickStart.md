# 빠른 시작

## 환경 준비

[Node Download](https://nodejs.org/en/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)
> `package.json`에는 `packageManager`가 `pnpm@10.13.1`로 설정되어 있으며, `corepack`이 이 버전을 자동으로 설치합니다.
```bash title="pnpm"
corepack enable pnpm
```

pnpm 버전을 확인합니다. 예상 버전은 10.26.1입니다.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## 프로젝트 시작

문서 사이트를 시작하면 vseed를 동시에 개발하고 디버깅할 수 있습니다.
```bash title="개발"
pnpm install

pnpm dev
```

빌드
```bash title="빌드"
pnpm build
```

`rsdoctor`로 산출물을 분석합니다.
```bash title="분석"
pnpm build:rsdoctor
# or
pnpm dev:rsdoctor
```
