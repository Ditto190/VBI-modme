import { stackCornerRadius } from 'src/pipeline/spec/chart/pipes/stack/stackCornerRadius'
import type { AdvancedVSeed, SpecPipelineContext, VSeed } from 'src/types'

const createContext = (chartType = 'column'): SpecPipelineContext =>
  ({
    advancedVSeed: {
      config: {
        [chartType]: { stackCornerRadius: [4, 4, 0, 0] },
      },
    } as unknown as AdvancedVSeed,
    vseed: {
      chartType,
    } as unknown as VSeed,
  }) as SpecPipelineContext

describe('stackCornerRadius pipe', () => {
  it('should use root stackCornerRadius when no moveIn animation exists', () => {
    const result = stackCornerRadius({}, createContext()) as any

    expect(typeof result.stackCornerRadius).toBe('function')
    expect(result.bar?.style?.cornerRadius).toBeUndefined()
  })

  it('should put cornerRadius on bar mark when moveIn animation exists', () => {
    const spec = {
      animationNormal: {
        bar: [{ type: 'moveIn' }],
      },
    }
    const result = stackCornerRadius(spec, createContext()) as any

    expect(result.stackCornerRadius).toBeUndefined()
    expect(typeof result.bar.style.cornerRadius).toBe('function')
    expect(result.bar.style.cornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([
      4, 4, 0, 0,
    ])
  })

  it('should reverse negative stack corners in the moveIn fallback', () => {
    const spec = {
      animationUpdate: {
        bar: { type: 'moveIn' },
      },
    }
    const result = stackCornerRadius(spec, createContext()) as any

    expect(result.bar.style.cornerRadius(null, { __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toEqual([
      0, 0, 4, 4,
    ])
  })
})
