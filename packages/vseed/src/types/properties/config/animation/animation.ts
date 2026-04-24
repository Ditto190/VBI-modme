import { z } from 'zod'

const zAnimationEffect = z.enum([
  'growth',
  'load',
  'moveIn',
  'highLight',
  'none',
  'ripple',
  'breath',
  'reveal',
  'scale',
  'radial',
  'enlarge',
  'relocate',
  'wave',
  'waveGrowth',
])

const createEffectConfig = <T extends readonly [string, ...string[]]>(effects: T) =>
  z.object({
    enable: z.boolean().optional(),
    effects: z.array(z.enum(effects)).optional(),
    ease: z.string().optional(),
    duration: z.number().optional(),
    color: z.string().optional(),
  })

const zAtmoBase = z.object({
  ease: z.string().optional(),
  color: z.string().optional(),
  effect: zAnimationEffect.optional(),
})
const zPointAtmo = zAtmoBase.extend({ effect: z.enum(['ripple', 'reveal', 'breath']).optional() })
const zNoEffectAtmo = z.object({
  ease: z.string().optional(),
  color: z.string().optional(),
})

const zLoopBase = z.object({
  enable: z.boolean().optional(),
  interval: z.number().optional(),
})

export const zBarLikeAnimation = z.object({
  enable: z.boolean().optional(),
  params: z
    .object({
      appear: createEffectConfig(['growth']).optional(),
      update: createEffectConfig(['growth', 'moveIn']).optional(),
      loop: z
        .object({
          ...zLoopBase.shape,
          loop: createEffectConfig(['highLight', 'growth', 'moveIn', 'none']).optional(),
          atmo: zPointAtmo.optional(),
        })
        .optional(),
    })
    .optional(),
})

export const zLineAreaAnimation = z.object({
  enable: z.boolean().optional(),
  params: z
    .object({
      appear: createEffectConfig(['load', 'growth']).optional(),
      update: createEffectConfig(['growth']).optional(),
      loop: z
        .object({
          ...zLoopBase.shape,
          loop: createEffectConfig(['load', 'growth', 'none']).optional(),
          atmo: zPointAtmo.optional(),
        })
        .optional(),
    })
    .optional(),
})

export const zScatterAnimation = z.object({
  enable: z.boolean().optional(),
  params: z
    .object({
      appear: createEffectConfig(['growth', 'scale']).optional(),
      update: createEffectConfig(['growth']).optional(),
      loop: z
        .object({
          ...zLoopBase.shape,
          loop: createEffectConfig(['growth', 'scale', 'none']).optional(),
          atmo: zPointAtmo.optional(),
        })
        .optional(),
    })
    .optional(),
})

export const zPieLikeAnimation = z.object({
  enable: z.boolean().optional(),
  params: z
    .object({
      appear: createEffectConfig(['radial', 'scale']).optional(),
      update: createEffectConfig(['radial']).optional(),
      loop: z
        .object({
          ...zLoopBase.shape,
          loop: createEffectConfig(['enlarge', 'relocate']).optional(),
          atmo: zNoEffectAtmo.optional(),
        })
        .optional(),
    })
    .optional(),
})

export const zRadarAnimation = z.object({
  enable: z.boolean().optional(),
  params: z
    .object({
      appear: createEffectConfig(['radial', 'scale']).optional(),
      update: createEffectConfig(['growth']).optional(),
      loop: z
        .object({
          ...zLoopBase.shape,
          atmo: zPointAtmo.optional(),
        })
        .optional(),
    })
    .optional(),
})

export type BarLikeAnimation = z.infer<typeof zBarLikeAnimation>
export type LineAreaAnimation = z.infer<typeof zLineAreaAnimation>
export type ScatterAnimation = z.infer<typeof zScatterAnimation>
export type PieLikeAnimation = z.infer<typeof zPieLikeAnimation>
export type RadarAnimation = z.infer<typeof zRadarAnimation>
