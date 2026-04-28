/**
 * @description 生成散点飞入动画，同时恢复透明度和尺寸。
 * @param duration 动画总时长，单位毫秒。
 * @param easing 缓动函数名称。
 * @param loop 是否循环播放。
 * @param startTime 循环时间线起始时间，单位毫秒。
 * @param delayAfter 单次动画结束后的等待时间，单位毫秒。
 * @returns 散点飞入动画配置。
 */
export const flyInScatter = (duration: number, easing?: string, loop = false, startTime = 0, delayAfter = 0) => {
  const half = duration / 2
  return [
    {
      loop,
      startTime,
      duration: half,
      easing,
      type: 'moveIn',
      delayAfter,
      options: { direction: 'y', orient: 'negative' },
      controlOptions: { immediatelyApply: false },
    },
    {
      loop,
      startTime,
      duration: half,
      easing,
      delayAfter,
      channel: { fillOpacity: { from: 0.5 }, size: { from: (...args: any[]) => args[1]?.attribute?.size } },
      controlOptions: { immediatelyApply: false },
    },
  ]
}

/**
 * @description 生成散点缩放进入动画，保持点中心不变并从 0 过渡到最终尺寸。
 * @param duration 动画时长，单位毫秒。
 * @param easing 缓动函数名称。
 * @param loop 是否循环播放。
 * @param startTime 循环时间线起始时间，单位毫秒。
 * @param delayAfter 单次动画结束后的等待时间，单位毫秒。
 * @returns 散点缩放动画配置。
 */
export const scaleInScatter = (duration: number, easing?: string, loop = false, startTime = 0, delayAfter = 0) => [
  {
    loop,
    startTime,
    duration,
    easing,
    delayAfter,
    channel: { size: { from: 0, to: (...args: any[]) => args[1]?.attribute?.size } },
    controlOptions: { immediatelyApply: false },
  },
]
