import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './analysis/sortAxisByCustom.json'
import config_1 from './analysis/sortAxisByDimension.json'
import config_2 from './analysis/sortAxisByMeasure.json'
import config_3 from './analysis/sortByCustom.json'
import config_4 from './analysis/sortByDimension.json'
import config_5 from './analysis/sortByMeasure.json'
import config_6 from './analysis/sortLegendByColorItems.json'
import config_7 from './analysis/sortLegendByCustom.json'
import config_8 from './analysis/sortLegendByDimension.json'
import config_9 from './analysis/sortLegendByMeasure.json'
import config_10 from './annotation/annotationAreaLine.json'
import config_11 from './annotation/annotationAreaSelectorLine.json'
import config_12 from './annotation/annotationDifferenceLineMeasureFormat.json'
import config_13 from './annotation/annotationDifferenceLineSeries.json'
import config_14 from './annotation/annotationHorizontalLineSelector.json'
import config_15 from './annotation/annotationHorizontalLineSplitLine.json'
import config_16 from './annotation/annotationPointPartialDatum.json'
import config_17 from './annotation/annotationPointPartialValue.json'
import config_18 from './annotation/annotationVerticalLineSelector.json'
import config_19 from './annotationHorizontalLine/selector.json'
import config_20 from './annotationHorizontalLine/selector_sync.json'
import config_21 from './annotationPoint/line-multi-measure.json'
import config_22 from './annotationPoint/multi-lines.json'
import config_23 from './annotationVerticalLine/selector.json'
import config_24 from './annotationVerticalLine/selector_sync.json'
import config_25 from './axes/lineXAxis.json'
import config_26 from './axes/lineXAxisEnable.json'
import config_27 from './axes/lineYAxis.json'
import config_28 from './axes/lineYAxisEnable.json'
import config_29 from './axes/xAxisOff.json'
import config_30 from './axes/xAxisOn.json'
import config_31 from './axes/yAxisNull2undefined.json'
import config_32 from './axes/yAxisOff.json'
import config_33 from './axes/yAxisOn.json'
import config_34 from './chartType/minimal.json'
import config_35 from './chartType/pivotLine.json'
import config_36 from './chartType/simple.json'
import config_37 from './chartType/standard.json'
import config_38 from './color/color-encoding-repeat.json'
import config_39 from './color/color-encoding-with-measure.json'
import config_40 from './color/dimension.json'
import config_41 from './color/lineMultiMeasure.json'
import config_42 from './color/measure.json'
import config_43 from './combination/basic.json'
import config_44 from './combination/basicV2.json'
import config_45 from './crosshair/crosshairRect.json'
import config_46 from './crosshair/lineVerticalCrosshair.json'
import config_47 from './dataset/onlyMeasures.json'
import config_48 from './markStyle/areaStyleArray.json'
import config_49 from './markStyle/areaStyleDimensionCondition.json'
import config_50 from './markStyle/areaStyleMeasureCondition.json'
import config_51 from './markStyle/multiLineStyle.json'
import config_52 from './markStyle/multiPointStyle.json'
import config_53 from './markStyle/pointStyleArray.json'
import config_54 from './markStyle/pointStyleDimensionCondition.json'
import config_55 from './markStyle/selectorLineDimensionCondition.json'
import config_56 from './markStyle/selectorPointDimensionCondition.json'
import config_57 from './pivotGrid/pivotBasic.json'
import config_58 from './pivotGrid/pivotBasicV2.json'
import config_59 from './sort/sortLegendByDimension.json'
import config_60 from './sort/sortLegendByMeasure.json'
import config_61 from './theme/invalid_theme.json'

const cases = [
  { name: 'analysis/sortAxisByCustom', vseed: config_0 },
  { name: 'analysis/sortAxisByDimension', vseed: config_1 },
  { name: 'analysis/sortAxisByMeasure', vseed: config_2 },
  { name: 'analysis/sortByCustom', vseed: config_3 },
  { name: 'analysis/sortByDimension', vseed: config_4 },
  { name: 'analysis/sortByMeasure', vseed: config_5 },
  { name: 'analysis/sortLegendByColorItems', vseed: config_6 },
  { name: 'analysis/sortLegendByCustom', vseed: config_7 },
  { name: 'analysis/sortLegendByDimension', vseed: config_8 },
  { name: 'analysis/sortLegendByMeasure', vseed: config_9 },
  { name: 'annotation/annotationAreaLine', vseed: config_10 },
  { name: 'annotation/annotationAreaSelectorLine', vseed: config_11 },
  { name: 'annotation/annotationDifferenceLineMeasureFormat', vseed: config_12 },
  { name: 'annotation/annotationDifferenceLineSeries', vseed: config_13 },
  { name: 'annotation/annotationHorizontalLineSelector', vseed: config_14 },
  { name: 'annotation/annotationHorizontalLineSplitLine', vseed: config_15 },
  { name: 'annotation/annotationPointPartialDatum', vseed: config_16 },
  { name: 'annotation/annotationPointPartialValue', vseed: config_17 },
  { name: 'annotation/annotationVerticalLineSelector', vseed: config_18 },
  { name: 'annotationHorizontalLine/selector', vseed: config_19 },
  { name: 'annotationHorizontalLine/selector_sync', vseed: config_20 },
  { name: 'annotationPoint/line-multi-measure', vseed: config_21 },
  { name: 'annotationPoint/multi-lines', vseed: config_22 },
  { name: 'annotationVerticalLine/selector', vseed: config_23 },
  { name: 'annotationVerticalLine/selector_sync', vseed: config_24 },
  { name: 'axes/lineXAxis', vseed: config_25 },
  { name: 'axes/lineXAxisEnable', vseed: config_26 },
  { name: 'axes/lineYAxis', vseed: config_27 },
  { name: 'axes/lineYAxisEnable', vseed: config_28 },
  { name: 'axes/xAxisOff', vseed: config_29 },
  { name: 'axes/xAxisOn', vseed: config_30 },
  { name: 'axes/yAxisNull2undefined', vseed: config_31 },
  { name: 'axes/yAxisOff', vseed: config_32 },
  { name: 'axes/yAxisOn', vseed: config_33 },
  { name: 'chartType/minimal', vseed: config_34 },
  { name: 'chartType/pivotLine', vseed: config_35 },
  { name: 'chartType/simple', vseed: config_36 },
  { name: 'chartType/standard', vseed: config_37 },
  { name: 'color/color-encoding-repeat', vseed: config_38 },
  { name: 'color/color-encoding-with-measure', vseed: config_39 },
  { name: 'color/dimension', vseed: config_40 },
  { name: 'color/lineMultiMeasure', vseed: config_41 },
  { name: 'color/measure', vseed: config_42 },
  { name: 'combination/basic', vseed: config_43 },
  { name: 'combination/basicV2', vseed: config_44 },
  { name: 'crosshair/crosshairRect', vseed: config_45 },
  { name: 'crosshair/lineVerticalCrosshair', vseed: config_46 },
  { name: 'dataset/onlyMeasures', vseed: config_47 },
  { name: 'markStyle/areaStyleArray', vseed: config_48 },
  { name: 'markStyle/areaStyleDimensionCondition', vseed: config_49 },
  { name: 'markStyle/areaStyleMeasureCondition', vseed: config_50 },
  { name: 'markStyle/multiLineStyle', vseed: config_51 },
  { name: 'markStyle/multiPointStyle', vseed: config_52 },
  { name: 'markStyle/pointStyleArray', vseed: config_53 },
  { name: 'markStyle/pointStyleDimensionCondition', vseed: config_54 },
  { name: 'markStyle/selectorLineDimensionCondition', vseed: config_55 },
  { name: 'markStyle/selectorPointDimensionCondition', vseed: config_56 },
  { name: 'pivotGrid/pivotBasic', vseed: config_57 },
  { name: 'pivotGrid/pivotBasicV2', vseed: config_58 },
  { name: 'sort/sortLegendByDimension', vseed: config_59 },
  { name: 'sort/sortLegendByMeasure', vseed: config_60 },
  { name: 'theme/invalid_theme', vseed: config_61 }
]

describe('line', () => {
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
