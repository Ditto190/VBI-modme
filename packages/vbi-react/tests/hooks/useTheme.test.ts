import { act, renderHook } from '@testing-library/react'

import { useTheme } from '@visactor/vbi-react'

import { createTestBuilder } from '../utils/createTestBuilder'

describe('useTheme', () => {
  it('tracks and updates theme', () => {
    const builder = createTestBuilder()
    const { result } = renderHook(() => useTheme(builder))

    expect(result.current.theme).toBe('light')

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
  })
})
