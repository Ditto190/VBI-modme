# 자주 사용하는 스크립트

Monorepo의 일관성을 유지하기 위해 **모든 스크립트는 프로젝트 루트 디렉터리에서 실행해야 합니다**.

## 핵심 스크립트 (g)

`g`(Generator)는 VSeed 개발에서 가장 중요한 보조 스크립트입니다.

```bash
pnpm run g
```

**설명**:
이 명령은 `build:test`, `build:docs`, `build:api`를 조합한 것으로, 개발 환경 리소스를 동기화하는 데 사용합니다:
1. **테스트 케이스 생성**: `tests/integrations` 아래의 JSON Spec을 파싱하여 대응하는 `.test.ts` 파일을 생성합니다.
2. **문서 생성**: TypeScript 타입 정의를 파싱하고 `apps/website`의 API 문서를 업데이트합니다.

**사용 시점**:
- 차트 로직을 수정하거나 새 차트 유형을 추가한 후.
- TypeScript 타입 정의를 수정한 후.
- 코드를 커밋하기 전.

## 개발 및 빌드

### 개발 환경 시작
VSeed의 watch 모드와 문서 사이트를 동시에 실행합니다.
```bash
pnpm run dev
```

### 프로젝트 빌드
VSeed 핵심 라이브러리를 빌드합니다.
```bash
pnpm --filter=@visactor/vseed run build
```

## 테스트

### 모든 테스트 실행
```bash
pnpm --filter=@visactor/vseed run test
```

### 단위 테스트 실행
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### 통합 테스트 실행
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### 테스트 스냅샷 업데이트
코드 변경으로 인해 스냅샷 차이가 발생하고 그 차이가 의도된 경우 실행하세요:
```bash
pnpm --filter=@visactor/vseed run test:update
```

## 코드 품질

### Lint 검사
```bash
pnpm run lint
```

### 타입 검사
```bash
pnpm run typecheck
```
