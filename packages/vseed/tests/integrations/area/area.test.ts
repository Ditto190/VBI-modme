import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './annotation/annotationDifferenceLineStackedElement.json'
import config_1 from './annotation/annotationHorizontalLineSplitArea.json'
import config_2 from './annotation/annotationHorizontalLineValue.json'
import config_3 from './annotation/annotationHorizontalLineYValue.json'
import config_4 from './annotation/annotationPointCondition.json'
import config_5 from './annotation/annotationPointOp.json'
import config_6 from './annotation/annotationVerticalLineValue.json'
import config_7 from './annotation/annotationVerticalLineXValue.json'
import config_8 from './annotationPoint/condition.json'
import config_9 from './annotationPoint/measure-id.json'
import config_10 from './axes/areaXAxis.json'
import config_11 from './axes/areaXAxisEnable.json'
import config_12 from './axes/areaYAxis.json'
import config_13 from './axes/areaYAxisEnable.json'
import config_14 from './chartType/minimal.json'
import config_15 from './chartType/simple.json'
import config_16 from './chartType/standard.json'
import config_17 from './color/dimension.json'
import config_18 from './color/measure.json'
import config_19 from './combination/basic.json'
import config_20 from './combination/basicV2.json'
import config_21 from './combination/number-parentId.json'
import config_22 from './dataset/onlyMeasures.json'
import config_23 from './markStyle/areaStyleParialDatum.json'
import config_24 from './markStyle/areaStyleValue.json'
import config_25 from './markStyle/lineStyleArray.json'
import config_26 from './markStyle/lineStyleDimensionCondition.json'
import config_27 from './markStyle/lineStyleValue.json'
import config_28 from './markStyle/multiAreaStyle.json'
import config_29 from './markStyle/pointStylePartialDatum.json'
import config_30 from './markStyle/pointStyleValue.json'
import config_31 from './markStyle/selectorAreaDimensionCondition.json'
import config_32 from './markStyle/selectorAreaValue.json'
import config_33 from './markStyle/selectorLinePartialDatum.json'
import config_34 from './markStyle/selectorLineValue.json'
import config_35 from './markStyle/selectorPointPartialDatum.json'
import config_36 from './markStyle/selectorPointValue.json'
import config_37 from './pivotGrid/pivotBasic.json'
import config_38 from './pivotGrid/pivotBasicV2.json'

const cases = [
  { name: 'annotation/annotationDifferenceLineStackedElement', vseed: config_0 },
  { name: 'annotation/annotationHorizontalLineSplitArea', vseed: config_1 },
  { name: 'annotation/annotationHorizontalLineValue', vseed: config_2 },
  { name: 'annotation/annotationHorizontalLineYValue', vseed: config_3 },
  { name: 'annotation/annotationPointCondition', vseed: config_4 },
  { name: 'annotation/annotationPointOp', vseed: config_5 },
  { name: 'annotation/annotationVerticalLineValue', vseed: config_6 },
  { name: 'annotation/annotationVerticalLineXValue', vseed: config_7 },
  { name: 'annotationPoint/condition', vseed: config_8 },
  { name: 'annotationPoint/measure-id', vseed: config_9 },
  { name: 'axes/areaXAxis', vseed: config_10 },
  { name: 'axes/areaXAxisEnable', vseed: config_11 },
  { name: 'axes/areaYAxis', vseed: config_12 },
  { name: 'axes/areaYAxisEnable', vseed: config_13 },
  { name: 'chartType/minimal', vseed: config_14 },
  { name: 'chartType/simple', vseed: config_15 },
  { name: 'chartType/standard', vseed: config_16 },
  { name: 'color/dimension', vseed: config_17 },
  { name: 'color/measure', vseed: config_18 },
  { name: 'combination/basic', vseed: config_19 },
  { name: 'combination/basicV2', vseed: config_20 },
  { name: 'combination/number-parentId', vseed: config_21 },
  { name: 'dataset/onlyMeasures', vseed: config_22 },
  { name: 'markStyle/areaStyleParialDatum', vseed: config_23 },
  { name: 'markStyle/areaStyleValue', vseed: config_24 },
  { name: 'markStyle/lineStyleArray', vseed: config_25 },
  { name: 'markStyle/lineStyleDimensionCondition', vseed: config_26 },
  { name: 'markStyle/lineStyleValue', vseed: config_27 },
  { name: 'markStyle/multiAreaStyle', vseed: config_28 },
  { name: 'markStyle/pointStylePartialDatum', vseed: config_29 },
  { name: 'markStyle/pointStyleValue', vseed: config_30 },
  { name: 'markStyle/selectorAreaDimensionCondition', vseed: config_31 },
  { name: 'markStyle/selectorAreaValue', vseed: config_32 },
  { name: 'markStyle/selectorLinePartialDatum', vseed: config_33 },
  { name: 'markStyle/selectorLineValue', vseed: config_34 },
  { name: 'markStyle/selectorPointPartialDatum', vseed: config_35 },
  { name: 'markStyle/selectorPointValue', vseed: config_36 },
  { name: 'pivotGrid/pivotBasic', vseed: config_37 },
  { name: 'pivotGrid/pivotBasicV2', vseed: config_38 }
]

describe('area', () => {
  cases.forEach(({ name, vseed }) => {
    test(name, () => {
      registerAll()
      const { vseed: vseedConfig } = vseed as { vseed: unknown }
      const builder = Builder.from(vseedConfig as VSeed)
      const advanced = builder.buildAdvanced()
      
      expect(advanced).toBeDefined()
      expect(advanced).not.toBeNull()
      
      const spec = builder.buildSpec(advanced!)
      
      expect(spec).toBeDefined()
      expect(spec).not.toBeNull()
      
      // Verify builder methods return valid results
      expect(builder.getColorIdMap()).toBeDefined()
      expect(builder.getColorItems()).toBeDefined()
      expect(Builder.getAdvancedPipeline(builder.vseed.chartType)).toBeDefined()
      expect(Builder.getSpecPipeline(builder.vseed.chartType)).toBeDefined()
      expect(Builder.getTheme(builder.vseed.theme)).toBeDefined()
      expect(Builder.getThemeMap()).toBeDefined()
    });
  });
});
