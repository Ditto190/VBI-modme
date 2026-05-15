# 테스트 흐름

VSeed는 엄격한 테스트 주도 개발 흐름을 따릅니다. **모든 테스트 명령은 프로젝트 루트 디렉터리에서 실행해야 합니다.**

## 테스트 분류

### 1. 단위 테스트 (Unit Tests)
- **목표**: 독립적인 유틸리티 함수와 Pipeline 노드 로직을 테스트합니다.
- **위치**: `packages/vseed/tests/unit`
- **실행**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. 통합 테스트 (Integration Tests)
- **목표**: 전체 차트 생성 흐름(VSeed Spec -> VChart Spec)을 테스트합니다.
- **방식**: 데이터 기반입니다. `packages/vseed/tests/integrations` 아래의 JSON 파일을 읽어 테스트 케이스를 자동 생성하고 스냅샷을 비교합니다.
- **실행**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## 핵심 워크플로 (Workflow)

### 단계 1: 테스트 실행
개발 중에는 관련 테스트를 자주 실행해 로직을 검증합니다.
```bash
# 모든 테스트 실행
pnpm --filter=@visactor/vseed run test
```

### 단계 2: 스냅샷 변경 처리
코드 변경으로 출력 Spec이 달라진 경우(예: Bug 수정 또는 Feature 추가):
1. 콘솔 출력의 Diff를 확인하고 변경이 예상된 것인지 판단합니다.
2. 예상된 변경이라면 업데이트 명령을 실행합니다:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### 단계 3: 커버리지 확인
코드를 커밋하기 전에 테스트 커버리지를 확인하는 것을 권장합니다.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## 주의사항
- **자동 생성**: 통합 테스트의 `.test.ts` 파일은 `g` 스크립트로 생성되므로 **수동으로 수정하지 마세요**.
- **테스트 케이스 추가**: 통합 테스트를 추가하려면 `packages/vseed/tests/integrations` 아래의 해당 분류 디렉터리에 새 JSON 설정 파일을 추가한 뒤 `pnpm run g`를 실행하면 됩니다.
