import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './analysis/sortLegendBySelf.json'
import config_1 from './annotation/annotationAreaColumn.json'
import config_2 from './annotation/annotationDifferenceLineNegativeStackTotal.json'
import config_3 from './annotation/annotationDifferenceLineNegativeValue.json'
import config_4 from './annotation/annotationDifferenceLineStackTotal.json'
import config_5 from './annotation/annotationDifferenceLineStackedElement.json'
import config_6 from './annotation/annotationDifferenceLineValue.json'
import config_7 from './annotation/annotationPointValue.json'
import config_8 from './annotationPoint/stack-columns.json'
import config_9 from './annotationPoint/value.json'
import config_10 from './axes/columnXAxis.json'
import config_11 from './axes/columnXAxisEnable.json'
import config_12 from './axes/columnYAxis.json'
import config_13 from './axes/columnYAxisEnable.json'
import config_14 from './backgroundColor/backgroundColor.json'
import config_15 from './chartType/minimal.json'
import config_16 from './chartType/simple.json'
import config_17 from './chartType/standard.json'
import config_18 from './color/columnParallelMultiMeasure.json'
import config_19 from './color/dimension.json'
import config_20 from './color/measure.json'
import config_21 from './combination/basic.json'
import config_22 from './combination/basicV2.json'
import config_23 from './dataset/onlyMeasures.json'
import config_24 from './feedback/sameAlias.json'
import config_25 from './format/autoFormat.json'
import config_26 from './format/fractionDigits.json'
import config_27 from './format/ratioAndSymbol.json'
import config_28 from './format/roundingMode.json'
import config_29 from './format/roundingPriority.json'
import config_30 from './format/significantDigits.json'
import config_31 from './format/suffixAndPrefix.json'
import config_32 from './format/thousandSeparator.json'
import config_33 from './format/type.json'
import config_34 from './interaction/interactionBrushEnable.json'
import config_35 from './interaction/interactionBrushKeepSelection.json'
import config_36 from './label/basic.json'
import config_37 from './label/enable.json'
import config_38 from './label/wrap.json'
import config_39 from './markStyle/barStyleValue.json'
import config_40 from './markStyle/selectorBarValue.json'
import config_41 from './measures/measureGroups.json'
import config_42 from './pivotGrid/pivotBasic.json'
import config_43 from './pivotGrid/pivotBasicV2.json'
import config_44 from './regressionLine/columnPolynomial.json'
import config_45 from './regressionLine/columnPolynomial_sync.json'
import config_46 from './regressionLine/columnPolynomial_with_shadow.json'
import config_47 from './regressionLine/minPoints_column_polynomialRegressionLine.json'
import config_48 from './sort/sortLegendBySelf.json'
import config_49 from './stackCornerRadius/stack-column.json'
import config_50 from './theme/dark.json'
import config_51 from './theme/light.json'
import config_52 from './tooltip/column.json'
import config_53 from './tooltip/enable.json'
import config_54 from './tooltip/same.json'

const cases = [
  { name: 'analysis/sortLegendBySelf', vseed: config_0 },
  { name: 'annotation/annotationAreaColumn', vseed: config_1 },
  { name: 'annotation/annotationDifferenceLineNegativeStackTotal', vseed: config_2 },
  { name: 'annotation/annotationDifferenceLineNegativeValue', vseed: config_3 },
  { name: 'annotation/annotationDifferenceLineStackTotal', vseed: config_4 },
  { name: 'annotation/annotationDifferenceLineStackedElement', vseed: config_5 },
  { name: 'annotation/annotationDifferenceLineValue', vseed: config_6 },
  { name: 'annotation/annotationPointValue', vseed: config_7 },
  { name: 'annotationPoint/stack-columns', vseed: config_8 },
  { name: 'annotationPoint/value', vseed: config_9 },
  { name: 'axes/columnXAxis', vseed: config_10 },
  { name: 'axes/columnXAxisEnable', vseed: config_11 },
  { name: 'axes/columnYAxis', vseed: config_12 },
  { name: 'axes/columnYAxisEnable', vseed: config_13 },
  { name: 'backgroundColor/backgroundColor', vseed: config_14 },
  { name: 'chartType/minimal', vseed: config_15 },
  { name: 'chartType/simple', vseed: config_16 },
  { name: 'chartType/standard', vseed: config_17 },
  { name: 'color/columnParallelMultiMeasure', vseed: config_18 },
  { name: 'color/dimension', vseed: config_19 },
  { name: 'color/measure', vseed: config_20 },
  { name: 'combination/basic', vseed: config_21 },
  { name: 'combination/basicV2', vseed: config_22 },
  { name: 'dataset/onlyMeasures', vseed: config_23 },
  { name: 'feedback/sameAlias', vseed: config_24 },
  { name: 'format/autoFormat', vseed: config_25 },
  { name: 'format/fractionDigits', vseed: config_26 },
  { name: 'format/ratioAndSymbol', vseed: config_27 },
  { name: 'format/roundingMode', vseed: config_28 },
  { name: 'format/roundingPriority', vseed: config_29 },
  { name: 'format/significantDigits', vseed: config_30 },
  { name: 'format/suffixAndPrefix', vseed: config_31 },
  { name: 'format/thousandSeparator', vseed: config_32 },
  { name: 'format/type', vseed: config_33 },
  { name: 'interaction/interactionBrushEnable', vseed: config_34 },
  { name: 'interaction/interactionBrushKeepSelection', vseed: config_35 },
  { name: 'label/basic', vseed: config_36 },
  { name: 'label/enable', vseed: config_37 },
  { name: 'label/wrap', vseed: config_38 },
  { name: 'markStyle/barStyleValue', vseed: config_39 },
  { name: 'markStyle/selectorBarValue', vseed: config_40 },
  { name: 'measures/measureGroups', vseed: config_41 },
  { name: 'pivotGrid/pivotBasic', vseed: config_42 },
  { name: 'pivotGrid/pivotBasicV2', vseed: config_43 },
  { name: 'regressionLine/columnPolynomial', vseed: config_44 },
  { name: 'regressionLine/columnPolynomial_sync', vseed: config_45 },
  { name: 'regressionLine/columnPolynomial_with_shadow', vseed: config_46 },
  { name: 'regressionLine/minPoints_column_polynomialRegressionLine', vseed: config_47 },
  { name: 'sort/sortLegendBySelf', vseed: config_48 },
  { name: 'stackCornerRadius/stack-column', vseed: config_49 },
  { name: 'theme/dark', vseed: config_50 },
  { name: 'theme/light', vseed: config_51 },
  { name: 'tooltip/column', vseed: config_52 },
  { name: 'tooltip/enable', vseed: config_53 },
  { name: 'tooltip/same', vseed: config_54 }
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
