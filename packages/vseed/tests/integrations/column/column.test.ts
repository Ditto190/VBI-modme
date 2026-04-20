import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './analysis/sortLegendBySelf.json'
import config_1 from './annotation/annotationAreaColumn.json'
import config_2 from './annotation/annotationPointValue.json'
import config_3 from './annotation/annotationDifferenceLineValue.json'
import config_4 from './annotation/annotationDifferenceLineStackTotal.json'
import config_5 from './annotation/annotationDifferenceLineNegativeValue.json'
import config_6 from './annotation/annotationDifferenceLineNegativeStackTotal.json'
import config_54 from './annotation/annotationDifferenceLineStackedElement.json'
import config_7 from './annotationPoint/stack-columns.json'
import config_8 from './annotationPoint/value.json'
import config_9 from './axes/columnXAxis.json'
import config_10 from './axes/columnXAxisEnable.json'
import config_11 from './axes/columnYAxis.json'
import config_12 from './axes/columnYAxisEnable.json'
import config_13 from './backgroundColor/backgroundColor.json'
import config_14 from './chartType/minimal.json'
import config_15 from './chartType/simple.json'
import config_16 from './chartType/standard.json'
import config_17 from './color/columnParallelMultiMeasure.json'
import config_18 from './color/dimension.json'
import config_19 from './color/measure.json'
import config_20 from './combination/basic.json'
import config_21 from './combination/basicV2.json'
import config_22 from './dataset/onlyMeasures.json'
import config_23 from './feedback/sameAlias.json'
import config_24 from './format/autoFormat.json'
import config_25 from './format/fractionDigits.json'
import config_26 from './format/ratioAndSymbol.json'
import config_27 from './format/roundingMode.json'
import config_28 from './format/roundingPriority.json'
import config_29 from './format/significantDigits.json'
import config_30 from './format/suffixAndPrefix.json'
import config_31 from './format/thousandSeparator.json'
import config_32 from './format/type.json'
import config_33 from './interaction/interactionBrushEnable.json'
import config_34 from './interaction/interactionBrushKeepSelection.json'
import config_35 from './label/basic.json'
import config_36 from './label/enable.json'
import config_37 from './label/wrap.json'
import config_38 from './markStyle/barStyleValue.json'
import config_39 from './markStyle/selectorBarValue.json'
import config_40 from './measures/measureGroups.json'
import config_41 from './pivotGrid/pivotBasic.json'
import config_42 from './pivotGrid/pivotBasicV2.json'
import config_43 from './regressionLine/columnPolynomial.json'
import config_44 from './regressionLine/columnPolynomial_sync.json'
import config_45 from './regressionLine/columnPolynomial_with_shadow.json'
import config_46 from './regressionLine/minPoints_column_polynomialRegressionLine.json'
import config_47 from './sort/sortLegendBySelf.json'
import config_48 from './stackCornerRadius/stack-column.json'
import config_49 from './theme/dark.json'
import config_50 from './theme/light.json'
import config_51 from './tooltip/column.json'
import config_52 from './tooltip/enable.json'
import config_53 from './tooltip/same.json'

const cases = [
  { name: 'analysis/sortLegendBySelf', vseed: config_0 },
  { name: 'annotation/annotationAreaColumn', vseed: config_1 },
  { name: 'annotation/annotationPointValue', vseed: config_2 },
  { name: 'annotation/annotationDifferenceLineValue', vseed: config_3 },
  { name: 'annotation/annotationDifferenceLineStackTotal', vseed: config_4 },
  { name: 'annotation/annotationDifferenceLineNegativeValue', vseed: config_5 },
  { name: 'annotation/annotationDifferenceLineNegativeStackTotal', vseed: config_6 },
  { name: 'annotation/annotationDifferenceLineStackedElement', vseed: config_54 },
  { name: 'annotationPoint/stack-columns', vseed: config_7 },
  { name: 'annotationPoint/value', vseed: config_8 },
  { name: 'axes/columnXAxis', vseed: config_9 },
  { name: 'axes/columnXAxisEnable', vseed: config_10 },
  { name: 'axes/columnYAxis', vseed: config_11 },
  { name: 'axes/columnYAxisEnable', vseed: config_12 },
  { name: 'backgroundColor/backgroundColor', vseed: config_13 },
  { name: 'chartType/minimal', vseed: config_14 },
  { name: 'chartType/simple', vseed: config_15 },
  { name: 'chartType/standard', vseed: config_16 },
  { name: 'color/columnParallelMultiMeasure', vseed: config_17 },
  { name: 'color/dimension', vseed: config_18 },
  { name: 'color/measure', vseed: config_19 },
  { name: 'combination/basic', vseed: config_20 },
  { name: 'combination/basicV2', vseed: config_21 },
  { name: 'dataset/onlyMeasures', vseed: config_22 },
  { name: 'feedback/sameAlias', vseed: config_23 },
  { name: 'format/autoFormat', vseed: config_24 },
  { name: 'format/fractionDigits', vseed: config_25 },
  { name: 'format/ratioAndSymbol', vseed: config_26 },
  { name: 'format/roundingMode', vseed: config_27 },
  { name: 'format/roundingPriority', vseed: config_28 },
  { name: 'format/significantDigits', vseed: config_29 },
  { name: 'format/suffixAndPrefix', vseed: config_30 },
  { name: 'format/thousandSeparator', vseed: config_31 },
  { name: 'format/type', vseed: config_32 },
  { name: 'interaction/interactionBrushEnable', vseed: config_33 },
  { name: 'interaction/interactionBrushKeepSelection', vseed: config_34 },
  { name: 'label/basic', vseed: config_35 },
  { name: 'label/enable', vseed: config_36 },
  { name: 'label/wrap', vseed: config_37 },
  { name: 'markStyle/barStyleValue', vseed: config_38 },
  { name: 'markStyle/selectorBarValue', vseed: config_39 },
  { name: 'measures/measureGroups', vseed: config_40 },
  { name: 'pivotGrid/pivotBasic', vseed: config_41 },
  { name: 'pivotGrid/pivotBasicV2', vseed: config_42 },
  { name: 'regressionLine/columnPolynomial', vseed: config_43 },
  { name: 'regressionLine/columnPolynomial_sync', vseed: config_44 },
  { name: 'regressionLine/columnPolynomial_with_shadow', vseed: config_45 },
  { name: 'regressionLine/minPoints_column_polynomialRegressionLine', vseed: config_46 },
  { name: 'sort/sortLegendBySelf', vseed: config_47 },
  { name: 'stackCornerRadius/stack-column', vseed: config_48 },
  { name: 'theme/dark', vseed: config_49 },
  { name: 'theme/light', vseed: config_50 },
  { name: 'tooltip/column', vseed: config_51 },
  { name: 'tooltip/enable', vseed: config_52 },
  { name: 'tooltip/same', vseed: config_53 }
]

describe('column', () => {
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
