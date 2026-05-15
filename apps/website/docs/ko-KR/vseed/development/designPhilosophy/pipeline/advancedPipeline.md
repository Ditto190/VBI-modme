# advanced Pipeline

## advanced pipeline

`advanced pipeline`은 VSeed DSL을 입력으로 받아 advancedVSeed DSL을 출력합니다.

`advancedVSeed`는 그래픽 문법을 기반으로 설계된 데이터 구조로, 차트와 테이블을 통합적으로 설명하는 데 사용됩니다. 비즈니스와 차트 라이브러리를 연결하는 다리 역할을 합니다.


`advancedVSeed` 자체도 완전히 직렬화할 수 있습니다. 따라서 Node.js 환경에서 구성한 뒤 HTTP를 통해 spec pipeline으로 전송하고, 프런트엔드에서 차트를 렌더링할 수 있습니다.
