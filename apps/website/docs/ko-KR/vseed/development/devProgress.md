# 개발 흐름

## 프로젝트 시작

```bash title="프로젝트 시작"
pnpm install && pnpm dev
```

## 요구 사항을 이해하고 코드 작성

복잡한 과정이지만 일반적으로 세 가지입니다.
1. 입력을 명확히 합니다: `vseed`
2. 출력을 명확히 합니다: `vseed`를 `advancedVSeed`로 변환하거나, `advancedVSeed`를 `spec`으로 변환합니다
3. 코드를 작성해 새로운 입력이 기대한 출력을 갖도록 보장합니다

:::tip
`playground` (`apps/website/docs/ko-KR/playground/index.mdx`)는 디버깅과 개발에 사용할 수 있습니다.
:::

## 새 테스트 케이스 만들기

필요하다면 새 테스트 케이스 생성을 고려할 수 있습니다.

:::tip
커버리지가 낮아지면 새 테스트 케이스를 만들어야 합니다.
:::

`packages/vseed/tests/*` 디렉터리 아래에 새 `testName.json`을 만들고 VSeed DSL을 작성합니다.

실행:

```bash title="테스트 케이스 생성"
pnpm build:canvasTest
```

## 단위 테스트 실행 및 커버리지 업데이트

```bash title="단위 테스트 실행 및 커버리지 업데이트"
pnpm test:coverage
```

세 가지를 확인합니다.
1. 모든 테스트가 통과함
2. 스냅샷 변경이 기대에 부합함
3. 커버리지가 낮아지지 않음

> 커버리지 변화는 README.md에 자동으로 업데이트됩니다

## 설정 항목 문서 업데이트

차트 유형의 TypeScript 정의를 수정했다면 설정 항목 문서를 업데이트하세요.

:::tip
`packages/vseed/src/types/chartType` 아래의 모든 타입 정의는 각 차트의 설정 항목 문서에 대응합니다. 변경이 있다면 반드시 업데이트하세요.
:::

```bash title="설정 항목 문서 업데이트"
pnpm build:docs
```

## 릴리스와 제출

```bash title="변경 내용 설명"
pnpm changeset
```

`pnpm changeset` 명령을 실행한 뒤 프롬프트에 따라 다음 작업을 선택합니다.
1. 변경이 필요한 패키지를 선택합니다. 일반적으로는 `vseed`만 해당합니다
2. Semantic Versioning을 따르고 변경 유형을 선택합니다. 대부분의 경우 Enter를 두 번 눌러 `major`와 `minor`를 건너뛴 뒤 `patch`를 선택하면 됩니다
3. 변경 설명을 입력합니다. 예: `fix: chart render error caused by only one measure`

:::tip 권장
하나의 기능 또는 Bugfix는 하나의 `changeset`, 하나의 `commit`에 대응합니다

하나의 `Pull Request`는 하나의 `issue`에 대응합니다

하나의 `Pull Request`가 여러 기능 또는 여러 Bugfix를 포함하면 여러 `changeset`, 여러 `commit`에 대응합니다
:::

## Commit

```bash title="모든 내용 커밋"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
