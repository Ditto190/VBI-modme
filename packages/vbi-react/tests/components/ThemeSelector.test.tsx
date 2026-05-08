import { fireEvent, render } from '@testing-library/react'

import { ThemeSelector } from '@visactor/vbi-react/components'

import { createTestBuilder } from '../utils/createTestBuilder'

describe('ThemeSelector', () => {
  it('updates theme through the component UI', () => {
    const builder = createTestBuilder()
    const view = render(<ThemeSelector builder={builder} />)

    fireEvent.change(view.getByLabelText('Theme'), {
      target: { value: 'dark' },
    })

    expect(builder.build().theme).toBe('dark')
  })
})
