export const VScreenAnimationType = {
  growth: 'growth', // 生长
  load: 'load', // 加载
  moveIn: 'moveIn', // 移入
  highLight: 'highLight', // 分组高亮
  none: 'none', // 无动画
  ripple: 'ripple', // 涟漪
  breath: 'breath', // 呼吸
  reveal: 'reveal', // 显隐
  scale: 'scale', // 缩放
  radial: 'radial', // 径向
  enlarge: 'enlarge', // 改变尺寸
  relocate: 'relocate', // 改变中心
  wave: 'wave', // 波浪
  waveGrowth: 'waveGrowth', // 波浪生长
} as const

export type AnimationEffect = (typeof VScreenAnimationType)[keyof typeof VScreenAnimationType]

export type EffectConfig<E extends AnimationEffect> = {
  enable?: boolean
  effects?: E[]
  ease?: string
  duration?: number
  color?: string
}

export type AnimationEffectConfig = EffectConfig<AnimationEffect>
export type AtmosphereConfig<E extends AnimationEffect = never> = { effect?: E; ease?: string; color?: string }
export type LoopConfig<LE extends AnimationEffect, AE extends AnimationEffect = never> = {
  enable?: boolean
  interval?: number
  loop?: EffectConfig<LE>
  atmosphere?: AtmosphereConfig<AE>
}
export type AnimationLoopConfig = LoopConfig<AnimationEffect, AnimationEffect>

type AnimationParams<A, U, L> = {
  appear?: A
  update?: U
  loop?: L
}

export type BarLikeAppearConfig = EffectConfig<'growth'>
export type BarLikeUpdateConfig = EffectConfig<'growth' | 'moveIn'>
export type BarLikeLoopConfig = LoopConfig<'highLight' | 'growth' | 'moveIn' | 'none', 'ripple' | 'reveal' | 'breath'>

export type LineAreaAppearConfig = EffectConfig<'load' | 'growth'>
export type LineAreaUpdateConfig = EffectConfig<'growth'>
export type LineAreaLoopConfig = LoopConfig<'load' | 'growth' | 'none', 'ripple' | 'reveal' | 'breath'>

export type ScatterAppearConfig = EffectConfig<'growth' | 'scale'>
export type ScatterUpdateConfig = EffectConfig<'growth'>
export type ScatterLoopConfig = LoopConfig<'growth' | 'scale' | 'none', 'ripple' | 'reveal' | 'breath'>

export type PieLikeAppearConfig = EffectConfig<'radial' | 'scale'>
export type PieLikeUpdateConfig = EffectConfig<'radial'>
export type PieLikeLoopConfig = LoopConfig<'enlarge' | 'relocate'>

export type RadarAppearConfig = EffectConfig<'radial' | 'scale'>
export type RadarUpdateConfig = EffectConfig<'growth'>
export type RadarLoopConfig = {
  enable?: boolean
  interval?: number
  atmosphere?: AtmosphereConfig<'ripple' | 'reveal' | 'breath'>
}

// 堆叠/百分比/并列条、柱图
export type BarLikeAnimation = {
  enable?: boolean
  params?: AnimationParams<BarLikeAppearConfig, BarLikeUpdateConfig, BarLikeLoopConfig>
}

// 折线、面积、百分比面积
export type LineAreaAnimation = {
  enable?: boolean
  params?: AnimationParams<LineAreaAppearConfig, LineAreaUpdateConfig, LineAreaLoopConfig>
}

// 散点
export type ScatterAnimation = {
  enable?: boolean
  params?: AnimationParams<ScatterAppearConfig, ScatterUpdateConfig, ScatterLoopConfig>
}

// 饼、环、玫瑰
export type PieLikeAnimation = {
  enable?: boolean
  params?: AnimationParams<PieLikeAppearConfig, PieLikeUpdateConfig, PieLikeLoopConfig>
}

// 雷达
export type RadarAnimation = {
  enable?: boolean
  params?: AnimationParams<RadarAppearConfig, RadarUpdateConfig, RadarLoopConfig>
}

export type BarLikeChartType = 'bar' | 'barPercent' | 'barParallel' | 'column' | 'columnPercent' | 'columnParallel'
export type LineAreaChartType = 'line' | 'area' | 'areaPercent'
export type PieLikeChartType = 'pie' | 'donut' | 'rose' | 'roseParallel'
export type SupportedAnimationChartType = BarLikeChartType | LineAreaChartType | PieLikeChartType | 'scatter' | 'radar'

export type ChartAnimationByChartType<T extends SupportedAnimationChartType> = T extends BarLikeChartType
  ? BarLikeAnimation
  : T extends LineAreaChartType
    ? LineAreaAnimation
    : T extends PieLikeChartType
      ? PieLikeAnimation
      : T extends 'scatter'
        ? ScatterAnimation
        : RadarAnimation

export type ChartAnimation = BarLikeAnimation | LineAreaAnimation | ScatterAnimation | PieLikeAnimation | RadarAnimation

export type ChartAppearConfigByChartType<T extends SupportedAnimationChartType> = NonNullable<
  NonNullable<ChartAnimationByChartType<T>['params']>['appear']
>
export type ChartUpdateConfigByChartType<T extends SupportedAnimationChartType> = NonNullable<
  NonNullable<ChartAnimationByChartType<T>['params']>['update']
>
export type ChartLoopConfigByChartType<T extends SupportedAnimationChartType> = NonNullable<
  NonNullable<ChartAnimationByChartType<T>['params']>['loop']
>

export type BarAppearConfig = ChartAppearConfigByChartType<'bar'>
export type BarUpdateConfig = ChartUpdateConfigByChartType<'bar'>
export type BarLoopConfig = ChartLoopConfigByChartType<'bar'>
export type BarPercentAppearConfig = ChartAppearConfigByChartType<'barPercent'>
export type BarPercentUpdateConfig = ChartUpdateConfigByChartType<'barPercent'>
export type BarPercentLoopConfig = ChartLoopConfigByChartType<'barPercent'>
export type BarParallelAppearConfig = ChartAppearConfigByChartType<'barParallel'>
export type BarParallelUpdateConfig = ChartUpdateConfigByChartType<'barParallel'>
export type BarParallelLoopConfig = ChartLoopConfigByChartType<'barParallel'>
export type ColumnAppearConfig = ChartAppearConfigByChartType<'column'>
export type ColumnUpdateConfig = ChartUpdateConfigByChartType<'column'>
export type ColumnLoopConfig = ChartLoopConfigByChartType<'column'>
export type ColumnPercentAppearConfig = ChartAppearConfigByChartType<'columnPercent'>
export type ColumnPercentUpdateConfig = ChartUpdateConfigByChartType<'columnPercent'>
export type ColumnPercentLoopConfig = ChartLoopConfigByChartType<'columnPercent'>
export type ColumnParallelAppearConfig = ChartAppearConfigByChartType<'columnParallel'>
export type ColumnParallelUpdateConfig = ChartUpdateConfigByChartType<'columnParallel'>
export type ColumnParallelLoopConfig = ChartLoopConfigByChartType<'columnParallel'>
export type LineAppearConfig = ChartAppearConfigByChartType<'line'>
export type LineUpdateConfig = ChartUpdateConfigByChartType<'line'>
export type LineLoopConfig = ChartLoopConfigByChartType<'line'>
export type AreaAppearConfig = ChartAppearConfigByChartType<'area'>
export type AreaUpdateConfig = ChartUpdateConfigByChartType<'area'>
export type AreaLoopConfig = ChartLoopConfigByChartType<'area'>
export type AreaPercentAppearConfig = ChartAppearConfigByChartType<'areaPercent'>
export type AreaPercentUpdateConfig = ChartUpdateConfigByChartType<'areaPercent'>
export type AreaPercentLoopConfig = ChartLoopConfigByChartType<'areaPercent'>
export type PieAppearConfig = ChartAppearConfigByChartType<'pie'>
export type PieUpdateConfig = ChartUpdateConfigByChartType<'pie'>
export type PieLoopConfig = ChartLoopConfigByChartType<'pie'>
export type DonutAppearConfig = ChartAppearConfigByChartType<'donut'>
export type DonutUpdateConfig = ChartUpdateConfigByChartType<'donut'>
export type DonutLoopConfig = ChartLoopConfigByChartType<'donut'>
export type RoseAppearConfig = ChartAppearConfigByChartType<'rose'>
export type RoseUpdateConfig = ChartUpdateConfigByChartType<'rose'>
export type RoseLoopConfig = ChartLoopConfigByChartType<'rose'>
export type RoseParallelAppearConfig = ChartAppearConfigByChartType<'roseParallel'>
export type RoseParallelUpdateConfig = ChartUpdateConfigByChartType<'roseParallel'>
export type RoseParallelLoopConfig = ChartLoopConfigByChartType<'roseParallel'>
