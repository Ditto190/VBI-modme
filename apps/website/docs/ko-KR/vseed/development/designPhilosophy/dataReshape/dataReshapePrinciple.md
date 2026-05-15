# 데이터 재구성 - 원리

:::info 데이터 재구성
VSeed는 데이터 시각화의 진입 장벽을 더 낮추기 위해 범용적인 dimension 재구성 방법을 제안합니다.
:::

데이터 재구성은 데이터를 한 구조화된 형태에서 다른 구조화된 형태로 변환하는 과정입니다. 핵심은 데이터의 무결성을 유지하면서 행, 열, 인덱스, 계층 등 데이터의 조직 방식을 바꿔 서로 다른 분석 또는 처리 요구에 맞추는 것입니다.

## Dimension 재구성

Python과 R에는 이미 dimension 재구성을 지원하는 도구가 있습니다:
1. Python Pandas는 데이터 재구성을 위해 `pivot`과 `melt`를 제공합니다
2. R tidyverse는 데이터 재구성을 위해 `pivot_longer`와 `pivot_wider`를 제공합니다

## 승차원과 강차원

승차원과 강차원은 정신적으로 범주론의 사고(대상과 사상, 동형)에 부합하지만, 구현상 엄격하게 범주론을 따르지는 않습니다.

특별히 강조할 점:
1. 승차원 시 존재하지 않는 "measure name"과 "measure value" 정보를 "무에서" 생성합니다
2. 강차원 시 데이터에 존재하는 "measure name"과 "measure value" 정보를 "제거"합니다

승차원은 데이터를 완전하게 변환할 수 있지만, dimension 열 이름에 빈 값이 생길 수 있으므로 추가 정보 보완을 지원합니다.
강차원은 정보 내용을 잃기 때문에, 진정한 의미의 동형 변환을 달성하려면 추가 변환 정보를 저장해야 합니다. 그렇지 않으면 정보는 반드시 손실됩니다.

![commonDataReshape](/images/commonDataReshape.png)

## 그룹화된 승차원과 강차원

일반적인 승차원과 강차원처럼 정보가 추가되거나 손실되는 유사한 상황이 있습니다. 또한 그룹이 도입되면서 더 많은 빈 데이터가 생성됩니다.

작용 의미:
1. **measure 그룹화**: 그룹화된 승차원을 통해 명세 데이터를 쉽게 처리합니다
2. **다중 그룹 쿼리**: 여러 SQL로 여러 명세 데이터를 쉽게 가져올 수 있으며, 그룹화된 강차원 방식으로 하나의 데이터로 병합할 수 있습니다

![groupedDataReshape](/images/groupedDataReshape.png)

## 규칙 도출

### 승차원

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. 여러 measure를 승차원하면 measure 수가 1이 됩니다. 1개 measure를 승차원해도 measure는 여전히 1개입니다.
2. 여러 dimension을 승차원하면 dimension이 하나 더 늘어납니다. 0개 dimension도 1개가 됩니다.
3. 0개 dimension, 1개 measure는 반복적으로 승차원하여 임의 개수의 dimension과 1개 measure를 얻을 수 있습니다. 따라서 1개 measure로도 막대그래프를 그릴 수 있습니다.
:::

### 강차원

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. 여러 measure를 강차원하면 dimension 값과 measure가 데카르트 곱을 이루어 새로운 measure가 됩니다
2. 여러 dimension을 강차원하면 여러 dimension 값이 데카르트 곱을 이루어 새로운 dimension이 됩니다
:::

## 예시

#### 0개 dimension, 1개 measure
![0d1m](/images/0d1m.png)
#### 0개 dimension, 3개 measure
![0d3m](/images/0d3m.png)
#### 1개 dimension, 1개 measure
![1d1m](/images/1d1m.png)
#### 1개 dimension, 2개 measure
![1d2m](/images/1d2m.png)
#### 2개 dimension, 1개 measure
![2d1m](/images/2d1m.png)
#### 2개 dimension, 2개 measure
![2d2m](/images/2d2m.png)
