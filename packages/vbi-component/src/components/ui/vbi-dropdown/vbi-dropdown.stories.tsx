import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiDropdown } from './vbi-dropdown'

const meta: Meta<VbiDropdown> = {
  title: 'ui/VbiDropdown',
  component: VbiDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiDropdown>

export const Default: Story = {
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-dropdown {...props}>
          <vbi-button slot='trigger'>Open Dropdown</vbi-button>
          <div
            slot='content'
            style={{
              padding: '8px',
              border: '1px solid var(--color-base-300, #ccc)',
              borderRadius: 'var(--radius-box, 4px)',
              background: 'var(--color-base-100, #fff)',
              color: 'var(--color-base-content, #000)',
            }}
          >
            Dropdown Content
          </div>
        </vbi-dropdown>
      </vbi-config-provider>
    )
  },
}
