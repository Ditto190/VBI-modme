# 자주 쓰는 스크립트

Monorepo의 일관성을 유지하기 위해 **모든 스크립트는 프로젝트 루트에서 실행해야 합니다**.

## 핵심 스크립트 (g)

```bash
pnpm run g
```
**설명**: VQuery의 `g` 스크립트는 다음을 처리합니다.
1. `build:test`: 테스트 리소스를 컴파일합니다.
2. `build:docs`: API 문서를 생성합니다.

## 개발과 빌드

### 빌드
```bash
pnpm --filter=@visactor/vquery run build
```

## 테스트

### 테스트 실행
VQuery는 Rstest로 테스트합니다.
```bash
pnpm --filter=@visactor/vquery run test
```

### 스냅샷 업데이트
```bash
pnpm --filter=@visactor/vquery run test:update
```

### 커버리지
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
